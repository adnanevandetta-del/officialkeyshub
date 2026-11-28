import math, numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
RED=(226,45,45); WHITE=(246,247,250); NAVY=(9,14,28)
OCEAN=(14,24,46); LAND=(232,236,242); GRID=(255,255,255)
M = np.asarray(Image.open("world_merc.png").convert("RGB")).astype(np.float32)
MH, MW = M.shape[:2]
# land mask from satellite colours: ocean is dark and blue-dominant
r,g,b = M[...,0],M[...,1],M[...,2]; lum = 0.3*r+0.59*g+0.11*b
land = ((lum > 55) & ~((b > r + 8) & (lum < 120))) | (lum > 170)
landimg = Image.fromarray((land*255).astype(np.uint8)).filter(ImageFilter.MedianFilter(5)).filter(ImageFilter.GaussianBlur(1.2))
LM = np.asarray(landimg).astype(np.float32) / 255
def merc_xy(lat, lon):
    lat = np.clip(lat, -85, 85); s = np.sin(np.radians(lat))
    return (lon + 180) / 360 * MW, (0.5 - np.log((1 + s) / (1 - s)) / (4 * np.pi)) * MH
def ortho_inv(x, y, lat0, lon0):
    rho = np.sqrt(x*x + y*y); c = np.arcsin(np.clip(rho, 0, 1))
    p0, l0 = np.radians(lat0), np.radians(lon0)
    with np.errstate(invalid="ignore", divide="ignore"):
        lat = np.arcsin(np.cos(c)*np.sin(p0) + np.where(rho > 0, y*np.sin(c)*np.cos(p0)/rho, 0))
        lon = l0 + np.arctan2(x*np.sin(c), rho*np.cos(c)*np.cos(p0) - y*np.sin(c)*np.sin(p0))
    return np.degrees(lat), (np.degrees(lon) + 540) % 360 - 180
def ortho_fwd(lat, lon, lat0, lon0):
    p, l, p0, l0 = map(np.radians, (lat, lon, lat0, lon0))
    x = np.cos(p)*np.sin(l - l0); y = np.cos(p0)*np.sin(p) - np.sin(p0)*np.cos(p)*np.cos(l - l0)
    vis = np.sin(p0)*np.sin(p) + np.cos(p0)*np.cos(p)*np.cos(l - l0) > 0
    return x, y, vis
def anim_frames(size, seconds=4.0, fps=30):
    """Globe rotates in from the west, route draws itself, pin pops."""
    import math
    out = []
    for i in range(int(seconds * fps)):
        t = i / fps
        rot = 1 - (1 - min(1, t / 1.6)) ** 3                     # ease-out spin
        lon0 = -40 + 70 * rot
        prog = max(0.0, min(1.0, (t - 1.0) / 1.2)); prog = 1 - (1 - prog) ** 2
        p = max(0.0, (t - 2.2) / 0.35); pin = 0 if p <= 0 else (min(1.0, p) * (1 + 0.25 * math.sin(min(1.0, p) * math.pi)))
        out.append(globe(size, lon0=lon0, progress=prog if t >= 1.0 else 0.0, pin=pin))
    return out
def globe(size, lat0=24, lon0=30, route=((40.4, -3.7), (45.4, 9.2), (37.9, 23.7), (36.2, 37.2), (29.4, 47.9)), bg=None, ring=WHITE, progress=1.0, pin=1.0):
    SS = 3; S = size * SS; c = S / 2; R = S * 0.42
    yy, xx = np.mgrid[0:S, 0:S].astype(np.float32)
    X = (xx - c) / R; Y = -(yy - c) / R; inside = X*X + Y*Y <= 1
    lat, lon = ortho_inv(X, Y, lat0, lon0)
    mx, my = merc_xy(np.nan_to_num(lat), np.nan_to_num(lon))
    l = LM[np.clip(my.astype(int), 0, MH-1), np.clip(mx.astype(int), 0, MW-1)]
    shade = np.clip(0.80 + 0.25 * np.sqrt(np.clip(1 - X*X - Y*Y, 0, 1)), 0, 1)       # gentle sphere lighting
    col = (np.array(OCEAN)[None, None] * (1 - l[..., None]) + np.array(LAND)[None, None] * l[..., None]) * shade[..., None]
    img = np.zeros((S, S, 4), np.uint8); img[..., :3] = np.clip(col, 0, 255); img[..., 3] = inside * 255
    im = Image.fromarray(img, "RGBA")
    if bg is not None:
        base = Image.new("RGBA", (S, S), (0, 0, 0, 0)); bd = ImageDraw.Draw(base)
        if bg == "circle": bd.ellipse([0, 0, S, S], fill=NAVY + (255,))
        else: bd.rounded_rectangle([0, 0, S, S], int(S * 0.22), fill=NAVY + (255,))
        im = Image.alpha_composite(base, im)
    d = ImageDraw.Draw(im)
    # graticule (subtle)
    for la in range(-60, 61, 30):
        pts = [ortho_fwd(la, lo, lat0, lon0) for lo in range(-180, 181, 3)]
        seg = []
        for x, y, v in pts:
            if v: seg.append((c + x * R, c - y * R))
            elif len(seg) > 1: d.line(seg, fill=GRID + (45,), width=max(1, int(S * 0.004))); seg = []
            else: seg = []
        if len(seg) > 1: d.line(seg, fill=GRID + (45,), width=max(1, int(S * 0.004)))
    for lo in range(-180, 180, 30):
        seg = []
        for la in range(-90, 91, 3):
            x, y, v = ortho_fwd(la, lo, lat0, lon0)
            if v: seg.append((c + x * R, c - y * R))
            elif len(seg) > 1: d.line(seg, fill=GRID + (45,), width=max(1, int(S * 0.004))); seg = []
            else: seg = []
        if len(seg) > 1: d.line(seg, fill=GRID + (45,), width=max(1, int(S * 0.004)))
    # rim
    w = int(S * 0.03); d.ellipse([c - R - w/2, c - R - w/2, c + R + w/2, c + R + w/2], outline=ring + (255,), width=w)
    # traced route along great-circle legs, then the pin
    pts = []
    for (a1, b1), (a2, b2) in zip(route, route[1:]):
        for t in np.linspace(0, 1, 40):
            la = a1 + (a2 - a1) * t; lo = b1 + (b2 - b1) * t
            x, y, v = ortho_fwd(la, lo, lat0, lon0); pts.append((c + x * R, c - y * R))
    tw = int(S * 0.042)
    n = max(2, int(len(pts) * max(0.0, min(1.0, progress))))
    pts = pts[:n]
    def stroke(pp, width, col):
        d.line(pp, fill=col, width=width)
        for x, y in pp[::2] + [pp[-1]]: d.ellipse([x - width/2, y - width/2, x + width/2, y + width/2], fill=col)
    if len(pts) < 2 or progress <= 0: return im.resize((size, size), Image.LANCZOS)
    stroke(pts, int(tw * 1.7), NAVY + (255,))
    stroke(pts, tw, RED + (255,))
    if pin <= 0: return im.resize((size, size), Image.LANCZOS)
    px, py = pts[-1]; pr = tw * 1.6 * pin
    d.ellipse([px - pr - tw*0.5*pin, py - pr - tw*0.5*pin, px + pr + tw*0.5*pin, py + pr + tw*0.5*pin], fill=NAVY + (255,))
    d.ellipse([px - pr, py - pr, px + pr, py + pr], fill=RED + (255,), outline=WHITE + (255,), width=int(tw * 0.55))
    return im.resize((size, size), Image.LANCZOS)
if __name__ == "__main__":
    F = "/usr/share/fonts/opentype/inter/"; fnt = lambda n, s: ImageFont.truetype(F + n, s)
    W, H = 1500, 560; sh = Image.new("RGB", (W, H), NAVY); d = ImageDraw.Draw(sh)
    d.text((60, 36), "A · Traced Globe, with a real world map", font=fnt("Inter-Bold.otf", 36), fill=WHITE)
    g = globe(330); sh.paste(g, (50, 110), g)
    lk = globe(130); sh.paste(lk, (430, 120), lk)
    d.text((575, 132), "TRACED", font=fnt("InterDisplay-Black.otf", 60), fill=WHITE); d.text((575, 192), "WORLD", font=fnt("InterDisplay-Black.otf", 60), fill=RED)
    av = globe(230, bg="circle"); sh.paste(av, (430, 290), av)
    sm = globe(48, bg="circle"); sh.paste(sm, (700, 400), sm)
    d.text((760, 410), "actual avatar size", font=fnt("Inter-Medium.otf", 22), fill=(150, 165, 190))
    wm = globe(72); sh.paste(wm, (1080, 150), wm); d.text((1170, 172), "video watermark", font=fnt("Inter-Medium.otf", 22), fill=(150, 165, 190))
    sh.save("logo_A2.png")
    globe(1200).save("mark_A2.png"); globe(800, bg="circle").save("avatar_A2_800.png")
