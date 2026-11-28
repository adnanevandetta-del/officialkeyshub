import json, math, subprocess, sys, os, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H, FPS = 1080, 1920, 30
F = "/usr/share/fonts/opentype/inter/"
def font(name, size): return ImageFont.truetype(F + name, size)
NAVY0, NAVY1 = (7, 12, 24), (16, 28, 52)
RED, WHITE, MUTED, GOLD = (232, 52, 52), (245, 247, 250), (196, 206, 222), (255, 196, 70)
ML, MR = 84, 170  # margins (right side leaves room for Shorts buttons)
DUR = {"hook": 5.0, "text": 5.6, "stat": 5.0, "outro": 3.6}
FADE = 0.35

def ease(x): x = max(0, min(1, x)); return 1 - (1 - x) ** 3

def wrap(draw, text, fnt, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=fnt) <= maxw: cur = t
        else: lines.append(cur); cur = w
    lines.append(cur); return lines

def base_bg():
    y = np.linspace(0, 1, H)[:, None]
    x = np.linspace(-1, 1, W)[None, :]
    g = np.stack([NAVY0[i] + (NAVY1[i] - NAVY0[i]) * (1 - abs(y - 0.45) * 1.6) for i in range(3)], -1)
    g = np.broadcast_to(g, (H, W, 3)).copy()
    vig = 1 - 0.45 * (x ** 2 * 0.6 + ((y - 0.5) * 2) ** 2 * 0.4)
    g *= vig[..., None]
    img = Image.fromarray(np.clip(g, 0, 255).astype(np.uint8)).convert("RGBA")
    ov = Image.new("RGBA", (W, H)); d = ImageDraw.Draw(ov)
    for gx in range(0, W, 90): d.line([(gx, 0), (gx, H)], fill=(120, 150, 200, 14))
    for gy in range(0, H, 90): d.line([(0, gy), (W, gy)], fill=(120, 150, 200, 14))
    return Image.alpha_composite(img, ov)

# a fixed "traced route" that draws itself across the frame for the whole video
rng = np.random.default_rng(7)
ROUTE = [(-40, 1250)]
for i in range(14):
    px, py = ROUTE[-1]
    ROUTE.append((px + rng.uniform(60, 110), py + rng.uniform(-120, 90)))
def route_upto(p):
    n = (len(ROUTE) - 1) * p; k = int(n)
    pts = ROUTE[:k + 1]
    if k < len(ROUTE) - 1:
        a, b = ROUTE[k], ROUTE[k + 1]; f = n - k
        pts = pts + [(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f)]
    return pts

def text_layer(d, xy, txt, fnt, rgb, a): d.text(xy, txt, font=fnt, fill=rgb + (int(255 * a),))

def draw_scene(d, sc, t, dur, story):
    a_out = 1 - ease((t - (dur - FADE)) / FADE) if t > dur - FADE else 1
    top = 470
    if sc["type"] == "hook":
        k = ease(t / 0.4) * a_out
        kf = font("Inter-Black.otf", 40); kw = d.textlength(sc["kicker"], font=kf)
        d.rounded_rectangle([ML, top, ML + kw + 48, top + 72], 10, fill=RED + (int(255 * k),))
        text_layer(d, (ML + 24, top + 12), sc["kicker"], kf, WHITE, k)
        hf = font("InterDisplay-Black.otf", 96)
        lines = wrap(d, sc["text"], hf, W - ML - MR)
        for i, ln in enumerate(lines):
            e = ease((t - 0.25 - i * 0.16) / 0.5) * a_out
            text_layer(d, (ML, top + 130 + i * 112 + (1 - e) * 40), ln, hf, WHITE, e)
    elif sc["type"] == "text":
        e = ease(t / 0.45) * a_out
        hs = 120
        while d.textlength(sc["head"], font=font("InterDisplay-Black.otf", hs)) > W - ML - MR: hs -= 4
        hf = font("InterDisplay-Black.otf", hs)
        text_layer(d, (ML, top + (1 - e) * 40), sc["head"], hf, GOLD, e)
        d.rectangle([ML, top + 165, ML + int(160 * e), top + 173], fill=RED + (int(255 * e),))
        bf = font("Inter-SemiBold.otf", 64)
        for i, ln in enumerate(wrap(d, sc["body"], bf, W - ML - MR)):
            e2 = ease((t - 0.35 - i * 0.12) / 0.5) * a_out
            text_layer(d, (ML, top + 230 + i * 86 + (1 - e2) * 30), ln, bf, WHITE, e2)
    elif sc["type"] == "stat":
        num = sc["num"]; digits = num.replace(",", "").rstrip("%")
        e = ease(t / 0.9)
        if digits.isdigit():
            v = int(round(int(digits) * e)); shown = f"{v:,}" if "," in num else str(v)
            shown += "%" if num.endswith("%") else ""
        else: shown = num
        size = 330 if len(num) <= 3 else 230
        nf = font("InterDisplay-Black.otf", size)
        sa = ease(t / 0.3) * a_out
        text_layer(d, (ML - 8, top - 30 + (1 - sa) * 50), shown, nf, WHITE, sa)
        ly = top + size + 10
        lf = font("Inter-ExtraBold.otf", 72)
        el = ease((t - 0.5) / 0.5) * a_out
        for i, ln in enumerate(wrap(d, sc["label"].upper(), lf, W - ML - MR)):
            text_layer(d, (ML, ly + i * 86 + (1 - el) * 30), ln, lf, RED, el)
        nl = len(wrap(d, sc["label"].upper(), lf, W - ML - MR))
        sf = font("Inter-Medium.otf", 54)
        for i, ln in enumerate(wrap(d, sc["sub"], sf, W - ML - MR)):
            es = ease((t - 0.85 - i * 0.1) / 0.5) * a_out
            text_layer(d, (ML, ly + nl * 86 + 40 + i * 72), ln, sf, MUTED, es)
    elif sc["type"] == "outro":
        e = ease(t / 0.5) * a_out
        lf = font("InterDisplay-Black.otf", 120)
        text_layer(d, (ML, top + 60 + (1 - e) * 40), "TRACED", lf, WHITE, e)
        text_layer(d, (ML, top + 190 + (1 - e) * 40), "WORLD", lf, RED, e)
        e2 = ease((t - 0.4) / 0.5) * a_out
        sf = font("Inter-SemiBold.otf", 60)
        text_layer(d, (ML, top + 380), "The world's news, traced", sf, MUTED, e2)
        text_layer(d, (ML, top + 460), "in under a minute.", sf, MUTED, e2)
        e3 = ease((t - 0.8) / 0.5) * a_out
        bf = font("Inter-Black.otf", 52); label = "FOLLOW FOR DAILY BRIEFS"
        bw = d.textlength(label, font=bf)
        d.rounded_rectangle([ML, top + 600, ML + bw + 80, top + 700], 50, fill=RED + (int(255 * e3),))
        text_layer(d, (ML + 40, top + 620), label, bf, WHITE, e3)

_MARK = Image.open('/tmp/claude-0/-home-user-officialkeyshub/39654c7a-130c-5f84-a31f-97fde0cd2dfe/scratchpad/logo/mark_64.png').convert('RGBA')
def chrome(d, story, T, total):
    # top brand bar
    lf = font("InterDisplay-Black.otf", 46)
    d._image.paste(_MARK, (ML - 6, 140), _MARK)
    d.text((ML + 68, 152), "TRACED WORLD", font=lf, fill=WHITE + (255,))
    df = font("Inter-SemiBold.otf", 36)
    dw = d.textlength(story["date"], font=df)
    d.text((W - ML - dw, 160), story["date"], font=df, fill=MUTED + (255,))
    d.line([(ML, 236), (W - ML, 236)], fill=(255, 255, 255, 40), width=2)
    tf = font("Inter-Black.otf", 34); tw = d.textlength(story["tag"], font=tf)
    d.rounded_rectangle([ML, 280, ML + tw + 40, 336], 28, outline=RED + (255,), width=3)
    d.text((ML + 20, 287), story["tag"], font=tf, fill=WHITE + (255,))
    # bottom: sources + progress (kept above the Shorts caption area)
    sf = font("Inter-Medium.otf", 32)
    d.text((ML, 1450), story["sources"], font=sf, fill=MUTED + (220,))
    d.rounded_rectangle([ML, 1515, W - ML, 1523], 4, fill=(255, 255, 255, 40))
    d.rounded_rectangle([ML, 1515, ML + int((W - 2 * ML) * T / total), 1523], 4, fill=RED + (255,))

def render_video(story, outdir, bg):
    scenes = story["scenes"]; durs = [DUR[s["type"]] for s in scenes]
    total = sum(durs); starts = np.cumsum([0] + durs[:-1])
    silent = os.path.join(outdir, story["id"] + "_v.mp4")
    p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
        "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-preset", "medium",
        "-crf", "18", "-pix_fmt", "yuv420p", silent], stdin=subprocess.PIPE)
    nframes = int(total * FPS); reader = None; cur_si = -1
    for fi in range(nframes):
        T = fi / FPS
        si = int(np.searchsorted(starts, T, side="right") - 1)
        t = T - starts[si]
        if si != cur_si:
            cur_si = si
            if reader: reader.close()
            reader = media_source(scenes[si].get("media"), durs[si])
        m = reader.frame(t) if reader else None
        frame = bg.copy() if m is None else Image.alpha_composite(m, SHADE)
        if m is not None and fi % 1 == 0: pass
        ov = Image.new("RGBA", (W, H)); d = ImageDraw.Draw(ov)
        pts = route_upto(min(1, T / total)) if m is None else []
        if len(pts) > 1:
            d.line(pts, fill=RED + (70,), width=5, joint="curve")
            hx, hy = pts[-1]; d.ellipse([hx - 10, hy - 10, hx + 10, hy + 10], fill=RED + (200,))
        for px, py in (ROUTE[1:-1:3] if m is None else []):
            d.ellipse([px - 5, py - 5, px + 5, py + 5], outline=(255, 255, 255, 40), width=2)
        frame = Image.alpha_composite(frame, ov)
        ov = Image.new("RGBA", (W, H)); d = ImageDraw.Draw(ov)
        chrome(d, story, T, total)
        draw_scene(d, scenes[si], t, durs[si], story)
        if reader: reader.decorate(d, t, durs[si])
        if m is not None:
            sh = ov.getchannel("A").resize((W // 4, H // 4)).filter(ImageFilter.GaussianBlur(3)).resize((W, H))
            shl = Image.new("RGBA", (W, H), (0, 0, 0, 0)); shl.putalpha(sh.point(lambda v: int(v * 0.75)))
            frame = Image.alpha_composite(frame, shl)
        frame = Image.alpha_composite(frame, ov)
        p.stdin.write(frame.convert("RGB").tobytes())
    if reader: reader.close()
    p.stdin.close(); p.wait()
    return silent, total, list(starts), scenes

CLIPS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "clips")
TILES = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tiles")
import glob, ssl, urllib.request
from concurrent.futures import ThreadPoolExecutor
def make_shade():
    a = np.zeros((H, 1), np.float32); y = np.linspace(0, 1, H)[:, None]
    a = 0.58 + 0.30 * np.clip(1 - y / 0.16, 0, 1) + 0.30 * np.clip((y - 0.62) / 0.2, 0, 1)
    a = np.clip(a, 0, 0.9)
    arr = np.zeros((H, W, 4), np.uint8); arr[..., :3] = (5, 9, 18); arr[..., 3] = (a * 255).astype(np.uint8)
    return Image.fromarray(arr, "RGBA")
SHADE = make_shade()

class Clip:
    def __init__(self, cid, ss, dur):
        f = glob.glob(os.path.join(CLIPS, cid + "-*.mp4"))[0]
        vf = (f"fps={FPS},scale={int(W*1.12)}:{int(H*1.12)}:force_original_aspect_ratio=increase,"
              f"crop={int(W*1.12)}:{int(H*1.12)},"
              f"scale=w='{int(W*1.12)}':h=-2,"
              "eq=contrast=1.10:saturation=0.82:brightness=-0.02,"
              "colorbalance=rs=-0.04:bs=0.05:rh=0.04:bh=-0.02,"
              f"zoompan=z='1+0.06*on/({dur}*{FPS})':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s={W}x{H}:fps={FPS}")
        self.p = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-stream_loop", "-1", "-ss", str(ss), "-i", f,
            "-t", str(dur + 0.5), "-vf", vf, "-f", "rawvideo", "-pix_fmt", "rgba", "-"], stdout=subprocess.PIPE)
        self.last = None; self.n = 0
    def frame(self, t):
        want = int(t * FPS) + 1
        while self.n < want:
            b = self.p.stdout.read(W * H * 4)
            if len(b) < W * H * 4: break
            arr = np.frombuffer(b, np.uint8).reshape(H, W, 4)
            mean = arr[::8, ::8, :3].mean()
            if mean > 62:
                arr = arr.copy(); arr[..., :3] = (arr[..., :3] * (62 / mean)).astype(np.uint8)
            self.last = Image.fromarray(arr, "RGBA"); self.n += 1
        return self.last
    def decorate(self, d, t, dur):
        f = font("Inter-SemiBold.otf", 28); txt = "ILLUSTRATIVE FOOTAGE"
        d.text((W - ML - d.textlength(txt, font=f), 296), txt, font=f, fill=(200, 210, 225, 200))
    def close(self):
        self.p.stdout.close(); self.p.kill(); self.p.wait()

CTX = ssl.create_default_context(cafile="/root/.ccr/ca-bundle.crt") if os.path.exists("/root/.ccr/ca-bundle.crt") else None
def tile(z, x, y):
    n = 2 ** z
    if y < 0 or y >= n: return None
    x %= n; p = os.path.join(TILES, f"{z}_{x}_{y}.jpg")
    if not os.path.exists(p):
        os.makedirs(TILES, exist_ok=True)
        u = f"https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg"
        for _ in range(3):
            try:
                data = urllib.request.urlopen(u, timeout=20, context=CTX).read(); open(p, "wb").write(data); break
            except Exception: pass
    try: return Image.open(p).convert("RGB")
    except Exception: return None
PY = 1225
def world_px(lat, lon, z):
    n = 256 * 2 ** z; s = math.sin(math.radians(lat))
    return (lon + 180) / 360 * n, (0.5 - math.log((1 + s) / (1 - s)) / (4 * math.pi)) * n
def mosaic(lat, lon, z):
    cx, cy = world_px(lat, lon, z); x0, y0 = cx - W / 2, cy - PY
    tx0, ty0, tx1, ty1 = int(x0 // 256), int(y0 // 256), int((x0 + W) // 256), int((y0 + H) // 256)
    coords = [(tx, ty) for tx in range(tx0, tx1 + 1) for ty in range(ty0, ty1 + 1)]
    with ThreadPoolExecutor(12) as ex: imgs = list(ex.map(lambda c: tile(z, *c), coords))
    out = Image.new("RGB", (W, H), (8, 14, 26))
    for (tx, ty), im in zip(coords, imgs):
        if im: out.paste(im, (int(tx * 256 - x0), int(ty * 256 - y0)))
    return out

class MapZoom:
    def __init__(self, spec, dur):
        self.lat, self.lon, self.z0, self.z1, self.label = spec; self.dur = dur
        self.levels = {z: mosaic(self.lat, self.lon, z) for z in range(int(self.z0), int(math.ceil(self.z1)) + 1)}
    def zoom(self, t):
        k = ease(min(1, t / (self.dur * 0.8)))
        k = k * k * (3 - 2 * k)
        return self.z0 + (self.z1 - self.z0) * k
    def frame(self, t):
        Z = self.zoom(t); L = min(int(Z), max(self.levels)); s = 2 ** (Z - L)
        im = self.levels[L]; cw, ch = W / s, H / s
        l, tp = W / 2 - (W / 2) / s, PY - PY / s
        crop = im.crop((l, tp, l + cw, tp + ch)).resize((W, H), Image.BILINEAR)
        arr = np.asarray(crop).astype(np.float32)
        arr = (arr - 128) * 1.12 + 128; arr[..., 2] *= 1.04
        return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).convert("RGBA")
    def decorate(self, d, t, dur):
        cx, cy = W / 2, PY
        # map scenes put the target lower-centre: draw pin and label there
        k = ease((t - 0.6) / 0.5)
        r = 16 + 40 * ((t * 1.2) % 1)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=RED + (int(220 * (1 - (t * 1.2) % 1) * k),), width=5)
        d.ellipse([cx - 14, cy - 14, cx + 14, cy + 14], fill=RED + (int(255 * k),), outline=WHITE + (int(255 * k),), width=4)
        f = font("Inter-Black.otf", 40); tw = d.textlength(self.label, font=f)
        bx = min(max(ML, cx - tw / 2 - 24), W - ML - tw - 48)
        d.rounded_rectangle([bx, cy + 44, bx + tw + 48, cy + 112], 12, fill=(8, 12, 22, int(225 * k)))
        d.text((bx + 24, cy + 54), self.label, font=f, fill=WHITE + (int(255 * k),))
        hf = font("Inter-Medium.otf", 26)
        d.text((ML, 1395), f"{abs(self.lat):.2f}°{'N' if self.lat >= 0 else 'S'}  {abs(self.lon):.2f}°E   ·   Satellite: Sentinel-2 cloudless by EOX (CC BY 4.0)", font=hf, fill=(200, 210, 225, 200))
        f2 = font("Inter-SemiBold.otf", 28); txt = "SATELLITE VIEW"
        d.text((W - ML - d.textlength(txt, font=f2), 296), txt, font=f2, fill=(200, 210, 225, 200))
    def close(self): pass

def media_source(m, dur):
    if not m: return None
    if "clip" in m: return Clip(m["clip"], m.get("ss", 0), dur)
    if "map" in m:
        sp = list(m["map"]); return MapZoom(sp, dur)

SR = 48000
def env_decay(n, tau): return np.exp(-np.arange(n) / (tau * SR))
def lowpass(x, k):
    c = np.cumsum(np.insert(x, 0, 0)); return (c[k:] - c[:-k]) / k
def sound(total, starts, scenes, path):
    n = int(total * SR); t = np.arange(n) / SR; out = np.zeros(n)
    # drone bed: A minor colour, slow swell
    for f, a in [(55, .5), (110, .35), (164.81, .18), (220, .12), (261.63, .07), (329.63, .05)]:
        out += a * np.sin(2 * np.pi * f * t + np.sin(2 * np.pi * 0.07 * t) * 0.8)
    out *= 0.12 * (0.75 + 0.25 * np.sin(2 * np.pi * 0.11 * t))
    # pulse: soft kick on each beat at 100 bpm, ticks on offbeats
    beat = 60 / 100
    noise = np.random.default_rng(1).standard_normal(n)
    for b in np.arange(0.0, total, beat):
        i = int(b * SR); m = min(n - i, int(0.4 * SR)); tt = np.arange(m) / SR
        out[i:i + m] += 0.32 * np.sin(2 * np.pi * (48 + 60 * np.exp(-tt * 30)) * tt) * env_decay(m, 0.12)
        j = int((b + beat / 2) * SR)
        if j < n:
            mm = min(n - j, int(0.05 * SR)); hp = noise[j:j + mm] - lowpass(np.pad(noise[j:j + mm], (2, 2), mode='edge'), 5)[:mm]
            out[j:j + mm] += 0.015 * hp * env_decay(mm, 0.012)
    # transitions: whoosh into each scene; impact on stats; sting at start
    for s, sc in zip(starts, scenes):
        i1 = int(s * SR); i0 = max(0, i1 - int(0.9 * SR)); tt = np.arange(i1 - i0) / SR   # soft tonal swell, no noise
        if len(tt) > 1:
            sw = (tt / tt[-1]) ** 2
            for fq in (440.0, 659.25, 880.0): out[i0:i1] += 0.05 * sw * np.sin(2 * np.pi * fq * tt)
        if sc["type"] == "stat":
            i = int(s * SR); m = min(n - i, int(1.2 * SR)); tt = np.arange(m) / SR
            out[i:i + m] += 0.5 * np.sin(2 * np.pi * (38 + 40 * np.exp(-tt * 12)) * tt) * env_decay(m, 0.35)
    m = int(1.6 * SR); tt = np.arange(m) / SR
    for f, a in [(880, .18), (1318.5, .12), (1760, .05)]:
        out[:m] += a * np.sin(2 * np.pi * f * tt) * env_decay(m, 0.4)
    fade = int(1.2 * SR); out[-fade:] *= np.linspace(1, 0, fade)
    out[:int(0.02 * SR)] *= np.linspace(0, 1, int(0.02 * SR))
    out /= np.max(np.abs(out)) + 1e-9
    st = np.stack([out, np.roll(out, 240)], -1) * 0.9   # tiny Haas widen
    with wave.open(path, "wb") as wf:
        wf.setnchannels(2); wf.setsampwidth(2); wf.setframerate(SR)
        wf.writeframes((st * 32767).astype(np.int16).tobytes())

if __name__ == "__main__":
    stories = json.load(open(sys.argv[1])); outdir = sys.argv[2]
    only = sys.argv[3] if len(sys.argv) > 3 else None
    bg = base_bg()
    for st in stories:
        if only and only not in st["id"]: continue
        silent, total, starts, scenes = render_video(st, outdir, bg)
        wav = os.path.join(outdir, st["id"] + ".wav"); sound(total, starts, scenes, wav)
        final = os.path.join(outdir, st["id"] + ".mp4")
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", silent, "-i", wav,
            "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
            "-ar", "48000", "-shortest", final], check=True)
        os.remove(silent); os.remove(wav); print("done", final, round(total, 1), "s")
