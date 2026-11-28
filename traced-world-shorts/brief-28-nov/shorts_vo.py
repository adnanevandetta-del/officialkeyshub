"""Vertical narrated Shorts in the Traced World style. usage: CB_MANIFEST=... python3 shorts_vo.py shorts.json outdir [id]"""
import os, sys, json, subprocess, numpy as np
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
argv = sys.argv; sys.argv = [argv[0]]
import world_week as WW
sys.argv = argv
R = WW.R; f = WW.f; txt = WW.txt; ease = WW.ease; RED, WHITE, SOFT = WW.RED, WW.WHITE, WW.SOFT
YEL = (255, 210, 60)
W, H = 1080, 1920; WW.W, WW.H = W, H; R.W, R.H, R.PY = W, H, 1000
ML, MR = 72, 170
def shade():
    y = np.linspace(0, 1, H)[:, None]
    a = 0.42 + 0.35 * np.clip(1 - y / 0.15, 0, 1) + 0.45 * np.clip((y - 0.55) / 0.25, 0, 1)
    arr = np.zeros((H, W, 4), np.uint8); arr[..., :3] = (4, 7, 14); arr[..., 3] = (np.clip(a, 0, .88) * 255).astype(np.uint8)
    return Image.fromarray(np.broadcast_to(arr, (H, W, 4)).copy(), "RGBA")
WW.SH = shade()
WW.GRAIN = [g.resize((W, H)) for g in WW.GRAIN[:4]]
def overlay(d, b, seg, t, dur, data, kind):
    aout = 1 - ease((t - (dur - 0.3)) / 0.3)
    d.ellipse([ML, 160, ML + 26, 186], fill=RED + (235,))
    txt(d, (ML + 42, 144), "TRACED WORLD", f("InterDisplay-Black.otf", 46), WHITE, 0.95)
    if kind:
        lab = "SATELLITE VIEW" if kind == "map" else "ILLUSTRATIVE FOOTAGE"; ff = f("Inter-SemiBold.otf", 26)
        txt(d, (W - ML - d.textlength(lab, font=ff), 156), lab, ff, SOFT, 0.85)
    ov = b.get("ov", {}); typ = ov.get("t"); y0 = 1150; wmax = W - ML - MR
    if typ == "hook":
        e = ease((t - 0.15) / 0.5) * aout
        kf = f("Inter-Black.otf", 40); kw = d.textlength(ov["kicker"], font=kf)
        d.rounded_rectangle([ML, 520, ML + kw + 48, 590], 10, fill=RED + (int(255 * e),)); txt(d, (ML + 24, 532), ov["kicker"], kf, WHITE, e)
        for i, (s, c) in enumerate([(ov["l1"], WHITE), (ov["l2"], YEL)]):
            sz = 120
            while d.textlength(s, font=f("InterDisplay-Black.otf", sz)) > W - 2 * ML: sz -= 4
            ei = ease((t - 0.3 - i * 0.18) / 0.5) * aout
            txt(d, (ML, 620 + i * 140 + (1 - ei) * 30), s, f("InterDisplay-Black.otf", sz), c, ei)
    elif typ in ("lower", "stat"):
        e = ease((t - 0.25) / 0.55) * aout
        if typ == "stat":
            num = ov["num"]; digits = num.replace(",", "").replace("+", "").rstrip("%"); k = ease((t - 0.15) / 1.0)
            shown = num if not digits.isdigit() else str(int(round(int(digits) * k))) + ("+" if "+" in num else "") + ("%" if num.endswith("%") else "")
            nf = f("InterDisplay-Black.otf", 300 if len(num) <= 3 else 240)
            txt(d, (ML - 8, 720 + (1 - e) * 40), shown, nf, WHITE, e); line = ov["label"]
        else: line = ov["text"]
        tag = ov.get("tag", seg["tag"])
        if tag:
            tf = f("Inter-Black.otf", 32); tw = d.textlength(tag, font=tf)
            d.rounded_rectangle([ML, y0, ML + tw + 40, y0 + 56], 8, fill=RED + (int(255 * e),)); txt(d, (ML + 20, y0 + 10), tag, tf, WHITE, e)
        lf = f("Inter-Bold.otf", 58); lines = R.wrap(d, line, lf, wmax)
        for i, ln in enumerate(lines): txt(d, (ML, y0 + 80 + i * 72), ln, lf, WHITE, e)
        txt(d, (ML, y0 + 96 + len(lines) * 72), "Source: " + seg.get("src", ""), f("Inter-Medium.otf", 28), SOFT, e * 0.9)
    elif typ == "question":
        e = ease((t - 0.4) / 0.9) * aout; qf = f("InterDisplay-Bold.otf", 92); lines = R.wrap(d, ov["text"], qf, W - 2 * ML)
        d.rectangle([ML, 660, ML + int(150 * e), 668], fill=RED + (int(255 * e),))
        for i, ln in enumerate(lines): txt(d, (ML, 700 + i * 112 + (1 - e) * 20), ln, qf, WHITE, e)
        txt(d, (ML, 730 + len(lines) * 112), "Tell us in the comments", f("Inter-Medium.otf", 44), SOFT, ease((t - 1.2) / 0.8) * aout)
    elif typ == "outro":
        e = ease((t - 0.3) / 0.7)
        txt(d, (ML, 700 + (1 - e) * 20), "TRACED", f("InterDisplay-Black.otf", 140), WHITE, e)
        txt(d, (ML, 850 + (1 - e) * 20), "WORLD", f("InterDisplay-Black.otf", 140), RED, e)
        e3 = ease((t - 0.9) / 0.5); bf = f("Inter-Black.otf", 52); lab = "FOLLOW FOR MORE"; bw = d.textlength(lab, font=bf)
        d.rounded_rectangle([ML, 1060, ML + bw + 90, 1160], 50, fill=RED + (int(255 * e3),)); txt(d, (ML + 45, 1080), lab, bf, WHITE, e3)
    # progress bar (Shorts identity)
    T = b["start"] + t; d.rounded_rectangle([ML, 1515, W - ML, 1523], 4, fill=(255, 255, 255, 40))
    d.rounded_rectangle([ML, 1515, ML + int((W - 2 * ML) * min(1, T / data["_total"])), 1523], 4, fill=RED + (255,))
def map_pin(d, src, t):
    cx, cy = W / 2, R.PY; k = ease((t - 0.6) / 0.5); ph = (t * 1.1) % 1; r = 16 + 42 * ph
    d.ellipse([cx-r, cy-r, cx+r, cy+r], outline=RED + (int(220*(1-ph)*k),), width=5)
    d.ellipse([cx-14, cy-14, cx+14, cy+14], fill=RED + (int(255*k),), outline=WHITE + (int(255*k),), width=4)
    lf = f("Inter-Black.otf", 36); tw = d.textlength(src.label, font=lf)
    d.rounded_rectangle([cx - tw/2 - 22, cy + 40, cx + tw/2 + 22, cy + 104], 12, fill=(6, 10, 20, int(220*k)))
    d.text((cx - tw/2, cy + 50), src.label, font=lf, fill=WHITE + (int(255*k),))
    d.text((ML, 1460), "Satellite: Sentinel-2 cloudless by EOX (CC BY 4.0)", font=f("Inter-Medium.otf", 24), fill=SOFT + (190,))
WW.overlay = overlay; WW.map_pin = map_pin
shorts = json.load(open(sys.argv[1])); out = sys.argv[2]; only = sys.argv[3] if len(sys.argv) > 3 else None
os.makedirs(out, exist_ok=True)
import soundfile as sf
for d in shorts:
    if only and only not in d["id"]: continue
    a, sr, cues, total = WW.voice_track(d); d["_total"] = total
    raw = os.path.join(out, "vo_raw.wav"); sf.write(raw, a, sr); vo = os.path.join(out, "vo.wav")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", raw, "-af", "highpass=f=70,equalizer=f=170:t=q:w=1:g=1.5,deesser=i=0.3,acompressor=threshold=-20dB:ratio=2:attack=15:release=200:makeup=1.5,loudnorm=I=-16:TP=-1.5:LRA=7", "-ar", "48000", vo], check=True)
    WW.srt(cues, os.path.join(out, d["id"] + " - captions.srt"))
    starts = [b["start"] for s in d["segments"] for b in s["beats"]]
    stat_starts = [b["start"] + 0.15 for s in d["segments"] for b in s["beats"] if b.get("ov", {}).get("t") == "stat"]
    bed = os.path.join(out, "bed.wav"); WW.music_bed(total, starts, stat_starts, [], bed)
    silent = os.path.join(out, "silent.mp4"); WW.render(d, total, silent)
    final = os.path.join(out, d["id"] + ".mp4")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", silent, "-i", vo, "-i", bed, "-filter_complex",
        "[2:a]volume=-20dB,lowpass=f=7000[bed];[1:a]asplit[v1][v2];[bed][v2]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=600[duck];"
        "[v1][duck]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[aout]",
        "-map", "0:v", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", final], check=True)
    for x in (raw, vo, bed, silent): os.remove(x)
    print("DONE", final, round(total, 1), flush=True)
