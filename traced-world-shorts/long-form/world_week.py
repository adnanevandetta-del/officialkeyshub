import sys, os, json, re, math, subprocess, numpy as np, soundfile as sf
HERE = os.path.dirname(os.path.abspath(__file__)); TW = os.path.dirname(HERE)
sys.path.insert(0, TW); sys.path.insert(0, os.path.join(os.path.dirname(TW), "tts"))
_argv = sys.argv; sys.argv = [sys.argv[0]]
import render2 as R
import narrate as N
sys.argv = _argv
from PIL import Image, ImageDraw, ImageFont, ImageFilter
W, H, FPS = 1920, 1080, 30
R.W, R.H, R.PY = W, H, 600
F = "/usr/share/fonts/opentype/inter/"
def f(n, s): return ImageFont.truetype(F + n, s)
RED, WHITE, SOFT = (226, 48, 48), (246, 247, 250), (205, 212, 225)
PRE, POST, XF = 0.25, 0.45, 0.35
ease = R.ease

def shade():
    y = np.linspace(0, 1, H)[:, None]
    a = 0.12 + 0.30 * np.clip(1 - y / 0.18, 0, 1) + 0.62 * np.clip((y - 0.55) / 0.4, 0, 1)
    arr = np.zeros((H, W, 4), np.uint8); arr[..., :3] = (4, 7, 14); arr[..., 3] = (np.clip(a, 0, .85) * 255).astype(np.uint8)
    arr = np.broadcast_to(arr, (H, W, 4)).copy()
    x = np.linspace(0, 1, W)[None, :]
    left = 0.35 * np.clip(1 - x / 0.5, 0, 1)                          # helps stat numbers on the left
    ramp = np.clip((np.broadcast_to(y, (H, W)) - 0.25) / 0.3, 0, 1); ramp = ramp * ramp * (3 - 2 * ramp)
    arr[..., 3] = np.clip(arr[..., 3] + left * 255 * ramp, 0, 230).astype(np.uint8)
    return Image.fromarray(arr, "RGBA")
SH = shade()
_g = np.random.default_rng(9)
def _grain():
    n = (_g.standard_normal((H // 2, W // 2)) * 14 + 128).clip(0, 255).astype(np.uint8)
    im = Image.fromarray(n, "L").resize((W, H), Image.BILINEAR)
    g = Image.new("RGBA", (W, H), (128, 128, 128, 0)); g.putalpha(Image.eval(im, lambda v: abs(v - 128) // 3))
    return Image.merge("RGBA", (im, im, im, g.getchannel("A")))
GRAIN = [_grain() for _ in range(6)]

CBM = os.environ.get("CB_MANIFEST")
_cb = {}
if CBM:
    for e in json.load(open(CBM)): _cb[e["text"]] = e["file"]
def _trim(a, sr):
    env = np.convolve(np.abs(a), np.ones(240) / 240, mode="same"); idx = np.where(env > 0.012)[0]
    if len(idx) == 0: return a
    return a[max(0, idx[0] - int(0.03 * sr)): min(len(a), idx[-1] + int(0.08 * sr))]
def cb_say(s):
    a, sr = sf.read(_cb[s], dtype="float32")
    if a.ndim > 1: a = a.mean(1)
    if sr != 24000:
        import scipy.signal as ss; a = ss.resample_poly(a, 24000, sr).astype(np.float32); sr = 24000
    return _trim(a, sr), sr

def voice_track(d):
    """Generate VO per beat (sentence by sentence) -> beats with durations + caption cues."""
    st = N.voice(d["voice"]); lang = N.lang_for(d["voice"]); rng = np.random.default_rng(5)
    audio, cues, t = [], [], 0.0; sr = 24000
    for seg in d["segments"]:
        for b in seg["beats"]:
            b["start"] = t; chunk = [np.zeros(int(sr * PRE))]; tt = t + PRE
            sents = re.split(r"(?<=[.!?])\s+", b["vo"])
            for i, s in enumerate(sents):
                a, sr = cb_say(s) if CBM else N.say(s, st, d["speed"] * rng.uniform(0.985, 1.015), lang)
                cues.append((tt, tt + len(a) / sr, s)); chunk.append(a); tt += len(a) / sr
                if i < len(sents) - 1:
                    p = rng.uniform(0.5, 0.65); chunk.append(np.zeros(int(sr * p))); tt += p
            chunk.append(np.zeros(int(sr * POST))); tt += POST
            if b is seg["beats"][-1] and seg["tag"]: chunk.append(np.zeros(int(sr * 0.5))); tt += 0.5
            a = np.concatenate(chunk); audio.append(a); b["dur"] = len(a) / sr; t += b["dur"]
    return np.concatenate(audio).astype(np.float32), sr, cues, t

def srt(cues, path):
    def ts(x): h, m = divmod(int(x), 3600); m, s = divmod(m, 60); return f"{h:02}:{m:02}:{s:02},{int((x % 1) * 1000):03}"
    out, n = [], 1
    for a, b, s in cues:
        words = s.split(); parts = [s] if len(s) <= 80 else [" ".join(words[:len(words)//2]), " ".join(words[len(words)//2:])]
        span = (b - a) / len(parts)
        for i, p in enumerate(parts):
            out.append(f"{n}\n{ts(a + i*span)} --> {ts(a + (i+1)*span)}\n{p}\n"); n += 1
    open(path, "w").write("\n".join(out))

def txt(d, xy, s, fnt, rgb, a): d.text(xy, s, font=fnt, fill=rgb + (int(255 * max(0, min(1, a))),))

def overlay(d, b, seg, t, dur, data, kind):
    aout = 1 - ease((t - (dur - 0.3)) / 0.3)
    # brand (always, small)
    d.ellipse([72, 64, 92, 84], fill=RED + (235,))
    txt(d, (104, 54), "TRACED WORLD", f("InterDisplay-Black.otf", 32), WHITE, 0.95)
    if kind:
        lab = "SATELLITE VIEW" if kind == "map" else "ILLUSTRATIVE FOOTAGE"
        ff = f("Inter-SemiBold.otf", 22); txt(d, (W - 72 - d.textlength(lab, font=ff), 62), lab, ff, SOFT, 0.85)
    ov = b.get("ov", {}); typ = ov.get("t")
    if typ == "title":
        e = ease((t - 0.3) / 0.8) * aout
        txt(d, (96, 760 + (1 - e) * 20), data["title"], f("InterDisplay-Bold.otf", 84), WHITE, e)
        d.rectangle([96, 870, 96 + int(120 * e), 875], fill=RED + (int(255 * e),))
        txt(d, (96, 892), data["date"], f("Inter-Medium.otf", 38), SOFT, ease((t - 0.7) / 0.8) * aout)
    elif typ in ("lower", "stat"):
        e = ease((t - 0.25) / 0.55) * aout
        y0 = 830
        if typ == "stat":
            nf = f("InterDisplay-Black.otf", 230); num = ov["num"]; digits = num.replace(",", "").rstrip("%")
            k = ease((t - 0.15) / 1.0)
            shown = num if not digits.isdigit() else (f"{int(round(int(digits) * k)):,}" if "," in num else str(int(round(int(digits) * k)))) + ("%" if num.endswith("%") else "")
            txt(d, (90, 470 + (1 - e) * 30), shown, nf, WHITE, e)
            line = ov["label"]
        else: line = ov["text"]
        tag = ov.get("tag", seg["tag"])
        if tag:
            tf = f("Inter-Black.otf", 26); tw = d.textlength(tag, font=tf)
            d.rounded_rectangle([96, y0, 96 + tw + 36, y0 + 46], 6, fill=RED + (int(255 * e),))
            txt(d, (114, y0 + 8), tag, tf, WHITE, e)
        lf = f("Inter-Bold.otf", 52)
        txt(d, (96 + (1 - e) * -30, y0 + 64), line, lf, WHITE, e)
        if seg.get("src"):
            sf_ = f("Inter-Medium.otf", 24); txt(d, (96, y0 + 140), "Source: " + seg["src"], sf_, SOFT, e * 0.9)
    elif typ == "question":
        e = ease((t - 0.4) / 0.9) * aout
        qf = f("InterDisplay-Bold.otf", 78); q = ov["text"]
        lines = R.wrap(d, q, qf, 1300)
        for i, ln in enumerate(lines):
            txt(d, (96, 640 + i * 96 + (1 - e) * 20), ln, qf, WHITE, e)
        d.rectangle([96, 610, 96 + int(140 * e), 616], fill=RED + (int(255 * e),))
        txt(d, (96, 660 + len(lines) * 96), "Tell us in the comments", f("Inter-Medium.otf", 36), SOFT, ease((t - 1.2) / 0.8) * aout)
    elif typ == "outro":
        e = ease((t - 0.4) / 0.8)
        txt(d, (W/2 - 330, 400 + (1-e)*20), "TRACED WORLD", f("InterDisplay-Black.otf", 96), WHITE, e)
        txt(d, (W/2 - 240, 530), "Tracing the stories that shape our world", f("Inter-Medium.otf", 34), SOFT, ease((t-0.9)/0.8))
        e3 = ease((t - 1.6) / 0.6); bf = f("Inter-Black.otf", 40); lab = "SUBSCRIBE"; bw = d.textlength(lab, font=bf)
        d.rounded_rectangle([W/2 - bw/2 - 50, 640, W/2 + bw/2 + 50, 730], 45, fill=RED + (int(255*e3),))
        txt(d, (W/2 - bw/2, 660), lab, bf, WHITE, e3)

def map_pin(d, src, t):
    cx, cy = W / 2, R.PY; k = ease((t - 0.6) / 0.5); ph = (t * 1.1) % 1
    r = 14 + 38 * ph
    d.ellipse([cx-r, cy-r, cx+r, cy+r], outline=RED + (int(220*(1-ph)*k),), width=4)
    d.ellipse([cx-12, cy-12, cx+12, cy+12], fill=RED + (int(255*k),), outline=WHITE + (int(255*k),), width=3)
    lf = f("Inter-Black.otf", 30); tw = d.textlength(src.label, font=lf)
    d.rounded_rectangle([cx - tw/2 - 20, cy + 34, cx + tw/2 + 20, cy + 88], 10, fill=(6, 10, 20, int(220*k)))
    d.text((cx - tw/2, cy + 44), src.label, font=lf, fill=WHITE + (int(255*k),))
    cf = f("Inter-Medium.otf", 20)
    d.text((W - 72 - 520, 1030), "Satellite: Sentinel-2 cloudless by EOX (CC BY 4.0)", font=cf, fill=SOFT + (190,))

def render(d, total, out):
    p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
        "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", out], stdin=subprocess.PIPE)
    dark = Image.new("RGBA", (W, H), (8, 12, 22, 255)); prev_last = None
    for seg in d["segments"]:
        for b in seg["beats"]:
            dur = b["dur"]
            if "clip" in b: b["clips"] = [[b["clip"], b.get("ss", 0)]]
            kind = "map" if "map" in b else ("clip" if "clips" in b else None)
            shots = b.get("clips", [None]); seg_len = dur / len(shots); si = -1
            src = R.MapZoom(b["map"], dur) if kind == "map" else None
            n = int(round(dur * FPS)); last = None
            for i in range(n):
                t = i / FPS
                if kind == "clip" and min(int(t // seg_len), len(shots) - 1) != si:
                    if src: src.close()
                    si = min(int(t // seg_len), len(shots) - 1); s0 = si * seg_len
                    if si > 0: prev_last, cut_t = last, t
                    src = R.Clip(shots[si][0], shots[si][1], seg_len + 0.5)
                tl = t - (si * seg_len if kind == "clip" else 0)
                m = src.frame(tl) if src else None
                base = dark.copy() if m is None else Image.alpha_composite(m.convert("RGBA"), SH)
                lt = tl if kind == "clip" else t
                if prev_last is not None and lt < XF:
                    base = Image.blend(prev_last, base, ease(lt / XF))
                if m is not None:
                    base = Image.alpha_composite(base, GRAIN[i % len(GRAIN)])
                ov = Image.new("RGBA", (W, H)); dd = ImageDraw.Draw(ov)
                if kind == "map": map_pin(dd, src, t)
                overlay(dd, b, seg, t, dur, d, kind)
                sh = ov.getchannel("A").resize((W//4, H//4)).filter(ImageFilter.GaussianBlur(3)).resize((W, H))
                shl = Image.new("RGBA", (W, H), (0, 0, 0, 0)); shl.putalpha(sh.point(lambda v: int(v * 0.7)))
                fr = Image.alpha_composite(Image.alpha_composite(base, shl), ov)
                p.stdin.write(fr.convert("RGB").tobytes()); last = base
            prev_last = last
            if src: src.close()
            print("beat", round(b["start"], 1), b["vo"][:40], flush=True)
    p.stdin.close(); p.wait()

def music_bed(total, beat_starts, stat_starts, seg_starts, path):
    sr = 48000; n = int((total + 1) * sr); t = np.arange(n) / sr; out = np.zeros(n)
    hz = lambda m: 440 * 2 ** ((m - 69) / 12)
    prog = [[45, 52, 57, 60, 64], [41, 48, 53, 57, 60], [48, 55, 60, 64, 67], [43, 50, 55, 59, 62]]   # Am F C G
    CH = 8.0
    for k in range(int(total / CH) + 2):
        c = prog[k % 4]; a0 = int(k * CH * sr); L = int((CH + 3) * sr); a1 = min(n, a0 + L)
        if a0 >= n: break
        tt = np.arange(a1 - a0) / sr
        env = np.clip(tt / 2.5, 0, 1) * np.clip((CH + 3 - tt) / 3, 0, 1)
        for m in c:
            for det in (-0.08, 0.08):
                f0 = hz(m) * (1 + det / 100)
                out[a0:a1] += 0.05 * env * (np.sin(2 * np.pi * f0 * tt) + 0.25 * np.sin(4 * np.pi * f0 * tt))
        # plucked arpeggio, eighth notes at 75 bpm
        step = 60 / 75 / 2; arp = [c[2], c[3], c[4], c[3]]
        for j in range(int(CH / step)):
            s0 = a0 + int(j * step * sr); L2 = int(1.2 * sr); s1 = min(n, s0 + L2)
            if s0 >= n: break
            t2 = np.arange(s1 - s0) / sr; f0 = hz(arp[j % 4] + 12)
            out[s0:s1] += 0.035 * np.exp(-t2 * 4) * (np.sin(2 * np.pi * f0 * t2) + 0.3 * np.sin(4 * np.pi * f0 * t2) * np.exp(-t2 * 6))
    for s in stat_starts:   # soft low bloom under stat numbers
        a0 = int(s * sr); L = min(n - a0, int(1.6 * sr)); tt = np.arange(L) / sr
        out[a0:a0 + L] += 0.18 * np.sin(2 * np.pi * 49 * tt) * np.clip(tt / 0.05, 0, 1) * np.exp(-tt * 2.2)
    for s in seg_starts:    # gentle tonal swell into each new story (no noise)
        a1 = int(s * sr); L = int(1.2 * sr); a0 = max(0, a1 - L); tt = np.arange(a1 - a0) / sr
        sw = (tt / max(tt[-1], 1e-6)) ** 2 if len(tt) else tt
        for m in (69, 76, 81):
            out[a0:a1] += 0.04 * sw * np.sin(2 * np.pi * hz(m) * tt)
    fade = int(3 * sr); out[-fade:] *= np.linspace(1, 0, fade); out[:int(1.5 * sr)] *= np.linspace(0, 1, int(1.5 * sr))
    out /= np.max(np.abs(out)) + 1e-9
    st = np.stack([out, np.roll(out, 300)], -1) * 0.8
    sf.write(path, st[: int(total * sr)].astype(np.float32), sr)

if __name__ == "__main__":
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    d = json.load(open(os.path.join(HERE, "beats.json")))
    if len(sys.argv) > 2:   # preview: only the first N segments
        d["segments"] = d["segments"][:int(sys.argv[2])]
    a, sr, cues, total = voice_track(d)
    raw = os.path.join(out, "vo_raw.wav"); sf.write(raw, a, sr); vo = os.path.join(out, "vo.wav")
    if CBM:
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", raw, "-f", "lavfi", "-i", "anoisesrc=color=pink:amplitude=0.0012:r=24000",
            "-filter_complex", "[0:a]highpass=f=70,equalizer=f=170:t=q:w=1:g=1.5,deesser=i=0.3,acompressor=threshold=-20dB:ratio=2:attack=15:release=200:makeup=1.5,loudnorm=I=-16:TP=-1.5:LRA=7[v];[1:a]lowpass=f=5000,aresample=48000[n];[v][n]amix=inputs=2:duration=first:normalize=0[o]",
            "-map", "[o]", "-ar", "48000", vo], check=True)
    else: N.master(raw, vo)
    srt(cues, os.path.join(out, "The World This Week - captions.srt"))
    chap = []
    for s in d["segments"]:
        st = s["beats"][0]["start"]; chap.append(f"{int(st//60)}:{int(st%60):02} {s['chapter']}")
    open(os.path.join(out, "chapters.txt"), "w").write("\n".join(chap) + "\n")
    starts = [b["start"] for s in d["segments"] for b in s["beats"]]
    scenes = [{"type": "stat" if b.get("ov", {}).get("t") == "stat" else "text"} for s in d["segments"] for b in s["beats"]]
    bed = os.path.join(out, "bed.wav")
    stat_starts = [b["start"] + 0.15 for s in d["segments"] for b in s["beats"] if b.get("ov", {}).get("t") == "stat"]
    seg_starts = [s["beats"][0]["start"] for s in d["segments"][1:]]
    music_bed(total, starts, stat_starts, seg_starts, bed)
    silent = os.path.join(out, "video_silent.mp4"); render(d, total, silent)
    final = os.path.join(out, "The World This Week - 26 Nov 2026" + (" - PREVIEW" if len(sys.argv) > 2 else "") + ".mp4")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", silent, "-i", vo, "-i", bed, "-filter_complex",
        "[2:a]volume=-22dB,lowpass=f=7000[bed];[1:a]asplit[v1][v2];[bed][v2]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=600[duck];"
        "[v1][duck]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[aout]",
        "-map", "0:v", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", final], check=True)
    for x in (raw, silent, bed): os.remove(x)
    print("DONE", final, round(total, 1))
