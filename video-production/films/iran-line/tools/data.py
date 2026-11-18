"""Fetch and prepare every map asset for "The Line".

Region map (24E-80E, 12S-56N): AWS Terrain Tiles (terrarium, z6) + EOX Sentinel-2 cloudless 2016 (s2cloudless_3857, z7, CC BY 4.0).
Globe: EOX Sentinel-2 cloudless 2016, z4, reprojected to equirectangular.
The north-east corner (Central Asia / western China, lon > 69.5, lat > 31) is faded to dark and flattened:
China is kept out of the film (DIRECTOR.md section 13); the globe ending puts that area on the night side.

usage: $LIB/.venv/bin/python -I tools/data.py <project>
writes raw/ (tiles, manifest.jsonl) and assets/ (albedo.jpg, water.png, height.bin, meta.json, world.jpg)
"""
import sys, os, io, json, math, time, datetime, urllib.request
from concurrent.futures import ThreadPoolExecutor
import numpy as np
from PIL import Image
from scipy import ndimage

D = sys.argv[1]
RAW = os.path.join(D, 'raw'); OUT = os.path.join(D, 'assets')
os.makedirs(RAW, exist_ok=True); os.makedirs(OUT, exist_ok=True)
Image.MAX_IMAGE_PIXELS = None
W, S, E, N = 24.0, -12.0, 80.0, 56.0
ZI, ZT = 7, 6
UA = {'User-Agent': 'film-maker/1.0 (educational explainer)'}
LOG = open(os.path.join(RAW, 'manifest.jsonl'), 'a')
S2 = 'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg'
TER = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'


def get(url):
    for k in range(5):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120) as r:
                b = r.read()
            LOG.write(json.dumps({'url': url, 'bytes': len(b), 'date': datetime.date.today().isoformat()}) + '\n')
            return b
        except Exception:
            if k == 4: raise
            time.sleep(2 + 3 * k)


def tile_xy(lon, lat, z):
    n = 2 ** z
    return (lon + 180) / 360 * n, (1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n


def merc(lon, lat, z):
    n = 2 ** z * 256
    return (lon + 180) / 360 * n, (1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n


def mosaic(name, tmpl, z, ext, mode='RGB'):
    dst = os.path.join(RAW, f'{name}_z{z}.{ext}')
    x0, y0 = tile_xy(W, N, z); x1, y1 = tile_xy(E, S, z)
    tx0, ty0, tx1, ty1 = int(x0), int(y0), int(x1), int(y1)
    if not os.path.exists(dst):
        jobs = [(x, y) for y in range(ty0, ty1 + 1) for x in range(tx0, tx1 + 1)]
        im = Image.new(mode, ((tx1 - tx0 + 1) * 256, (ty1 - ty0 + 1) * 256))
        with ThreadPoolExecutor(8) as ex:
            for (x, y), b in ex.map(lambda j: (j, get(tmpl.format(z=z, x=j[0], y=j[1]))), jobs):
                im.paste(Image.open(io.BytesIO(b)).convert(mode), ((x - tx0) * 256, (y - ty0) * 256))
        im.save(dst, quality=95) if ext == 'jpg' else im.save(dst)
        print('fetched', name, len(jobs), 'tiles')
    return {'z': z, 'tx0': tx0, 'ty0': ty0}


si = mosaic('s2', S2, ZI, 'jpg')
ti = mosaic('terrain', TER, ZT, 'png')

# ---- region: crop imagery to the bbox, resample heights onto it ----
x0, y0 = merc(W, N, ZI); x1, y1 = merc(E, S, ZI)
img = Image.open(os.path.join(RAW, f's2_z{ZI}.jpg')).convert('RGB')
img = img.crop((int(x0 - si['tx0'] * 256), int(y0 - si['ty0'] * 256), int(x1 - si['tx0'] * 256), int(y1 - si['ty0'] * 256)))
IW, IH = img.size
REF = 30.0                                                     # reference latitude for the flat map's km scale
km_px = 40075.016686 * math.cos(math.radians(REF)) / (256 * 2 ** ZI)

tx0, ty0 = merc(W, N, ZT); tx1, ty1 = merc(E, S, ZT)
t = np.asarray(Image.open(os.path.join(RAW, f'terrain_z{ZT}.png')).convert('RGB'), np.float64)
h = t[..., 0] * 256 + t[..., 1] + t[..., 2] / 256 - 32768
ys = (np.arange(IH) + .5) / IH * (ty1 - ty0) + ty0 - ti['ty0'] * 256 - .5
xs = (np.arange(IW) + .5) / IW * (tx1 - tx0) + tx0 - ti['tx0'] * 256 - .5
X, Y = np.meshgrid(xs, ys)
hi = ndimage.map_coordinates(h, [Y, X], order=1, mode='nearest').astype(np.float32)

# lon/lat of every pixel (for the mask)
lon = W + (np.arange(IW) + .5) / IW * (E - W)
my = y0 + (np.arange(IH) + .5) / IH * (y1 - y0)
lat = np.degrees(np.arctan(np.sinh(math.pi * (1 - 2 * my / (2 ** ZI * 256)))))
LON, LAT = np.meshgrid(lon, lat)
# north-east corner faded out (Central Asia / western China): soft over ~2 degrees
sm = lambda x: (lambda c: c * c * (3 - 2 * c))(np.clip(x, 0, 1))
dist = np.hypot((LON - 78.0) * np.cos(np.radians(LAT)), LAT - 42.0)
mask = np.maximum(sm((11.0 - dist) / 4.5), sm((LON - 75.5) / 2.5) * sm((LAT - 27.0) / 3.0))
# every outer edge of the map fades to dark too, so no hard rectangle ever shows
edge = sm((LON - W) / 3.0) * sm((E - LON) / 3.0) * sm((LAT - S) / 3.0) * sm((N - LAT) / 3.0)
mask = 1 - (1 - mask) * edge

a = np.asarray(img, np.float32) / 255
r, g, b = a[..., 0], a[..., 1], a[..., 2]
lum = .3 * r + .59 * g + .11 * b
watery = (b > r + .015) & (lum < .42)
water = (hi <= 1.0) | (watery & (hi < 12))
water = ndimage.binary_opening(water, iterations=1)
water = ndimage.binary_closing(water, iterations=1)
lab, n = ndimage.label(water)
sizes = ndimage.sum(water, lab, range(1, n + 1))
keep = np.zeros(n + 1, bool); keep[1:] = sizes > 40
water = keep[lab]
land = ~water
hl = np.where(land, np.maximum(hi, 2.0), np.minimum(hi, -1.0))
dist_land = ndimage.distance_transform_edt(water) * km_px

# grade (as the style asks): warm land, a little less saturation, a little more contrast; sea shaded by real depth
lin = a ** 2.2
l = (lin * [.2126, .7152, .0722]).sum(-1, keepdims=True)
L = l + (lin - l) * .82
L = L * np.array([1.06, 1.0, .88])
L = np.clip(L * .9, 0, 1) ** 1.12 * 1.08
depth = np.clip(-hl, 0, 6000)
sh = np.exp(-depth / 60.0)
sh = np.maximum(sh, np.exp(-dist_land / 6.0) * .6)
deep = np.array([.008, .030, .066]); mid = np.array([.014, .055, .095]); teal = np.array([.03, .17, .19])
dd = np.clip(depth / 3000, 0, 1)[..., None]
sea = mid * (1 - dd) + deep * dd
s2sea = lin * np.array([.55, .95, 1.0])
shallow = .55 * teal + .45 * s2sea
sea = sea * (1 - sh[..., None] * .85) + shallow * (sh[..., None] * .85)
wm = ndimage.gaussian_filter(water.astype(np.float32), .6)[..., None]
alb = L * (1 - wm) + sea * wm
DARK = np.array([.010, .014, .020])
alb = alb * (1 - mask[..., None]) + DARK * mask[..., None]
Image.fromarray((np.clip(alb, 0, 1) ** (1 / 2.2) * 255 + .5).astype(np.uint8)).save(os.path.join(OUT, 'albedo.jpg'), quality=91)
Image.fromarray(((wm[..., 0] * (1 - mask)) * 255).astype(np.uint8)).resize((IW // 2, IH // 2), Image.LANCZOS).save(os.path.join(OUT, 'water.png'))
hl = hl * (1 - mask)
GW, GH = IW // 8, IH // 8
hg = np.asarray(Image.fromarray(hl.astype(np.float32)).resize((GW, GH), Image.BILINEAR), np.float32)
hg.astype('<f4').tofile(os.path.join(OUT, 'height.bin'))
meta = {'GW': GW, 'GH': GH, 'IW': IW, 'IH': IH, 'bbox': [W, S, E, N], 'z': ZI, 'merc': [x0, y0, x1, y1],
        'km_px': km_px, 'width_km': IW * km_px, 'height_km': IH * km_px, 'ref_lat': REF}
json.dump(meta, open(os.path.join(OUT, 'meta.json'), 'w'), indent=1)
print('region', meta)

# ---- globe: z4 world, equirectangular ----
Z = 4; n4 = 2 ** Z
src = os.path.join(RAW, f'world_s2_z{Z}.jpg')
if not os.path.exists(src):
    im = Image.new('RGB', (n4 * 256, n4 * 256))
    jobs = [(x, y) for y in range(n4) for x in range(n4)]
    with ThreadPoolExecutor(8) as ex:
        for (x, y), bb in ex.map(lambda j: (j, get(S2.format(z=Z, x=j[0], y=j[1]))), jobs):
            im.paste(Image.open(io.BytesIO(bb)).convert('RGB'), (x * 256, y * 256))
    im.save(src, quality=94)
m = np.asarray(Image.open(src).convert('RGB'), np.float32)
HH = WW = n4 * 256
OW, OH = 4096, 2048
glon = (np.arange(OW) + .5) / OW * 360 - 180
glat = 90 - (np.arange(OH) + .5) / OH * 180
latc = np.clip(glat, -85.05, 85.05)
GX = (glon + 180) / 360 * WW - .5
GY = (1 - np.log(np.tan(np.radians(latc)) + 1 / np.cos(np.radians(latc))) / math.pi) / 2 * HH - .5
XX, YY = np.meshgrid(GX, GY)
out = np.stack([ndimage.map_coordinates(m[..., c], [YY, XX], order=1, mode='nearest') for c in range(3)], -1)
aa = (out / 255) ** 2.2
ll = (aa * [.2126, .7152, .0722]).sum(-1, keepdims=True)
wtr = (aa[..., 2:3] > aa[..., 0:1] + .01) & (ll < .08)
aa = ll + (aa - ll) * .85
aa = aa * np.array([1.05, 1.0, .9])
aa = np.where(wtr, aa * .55 + np.array([.004, .014, .03]), aa)
aa = np.where(np.abs(glat)[:, None, None] > 84, np.array([.55, .58, .62]), aa)
Image.fromarray((np.clip(aa, 0, 1) ** (1 / 2.2) * 255 + .5).astype(np.uint8)).save(os.path.join(OUT, 'world.jpg'), quality=92)
print('world.jpg done')
