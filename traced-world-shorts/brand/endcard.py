"""8 s animated Traced World end card (1920x1080) with room for YouTube end-screen elements."""
import os, sys, subprocess, numpy as np, soundfile as sf
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); W, H, FPS, DUR = 1920, 1080, 30, 8.0
F = "/usr/share/fonts/opentype/inter/"; fnt = lambda n, s: ImageFont.truetype(F + n, s)
RED, WHITE, SOFT, NAVY = (226, 45, 45), (246, 247, 250), (200, 210, 225), (9, 14, 28)
ease = lambda x: 1 - (1 - max(0, min(1, x))) ** 3
bg = Image.open(os.path.join(HERE, "bg_map_1920.png")).convert("RGBA")
anim = [Image.open(os.path.join(HERE, "anim360", f"{i:03d}.png")).convert("RGBA") for i in range(120)]
out = sys.argv[1]
p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
    "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", out + ".v.mp4"], stdin=subprocess.PIPE)
for i in range(int(DUR * FPS)):
    t = i / FPS; fr = bg.copy(); g = anim[min(119, i)]; fr.paste(g, (140, 120), g)
    lay = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
    e = ease((t - 1.6) / 0.7)
    d.text((560, 170 + (1 - e) * 20), "TRACED", font=fnt("InterDisplay-Black.otf", 140), fill=WHITE + (int(255 * e),))
    d.text((560, 310 + (1 - e) * 20), "WORLD", font=fnt("InterDisplay-Black.otf", 140), fill=RED + (int(255 * e),))
    e2 = ease((t - 2.4) / 0.7)
    d.text((566, 480), "The world's news, traced.", font=fnt("Inter-SemiBold.otf", 46), fill=SOFT + (int(255 * e2),))
    e3 = ease((t - 3.0) / 0.6)
    d.text((140, 640), "WATCH NEXT", font=fnt("Inter-Black.otf", 34), fill=SOFT + (int(220 * e3),))
    d.rectangle([140, 690, 140 + int(180 * e3), 696], fill=RED + (int(255 * e3),))
    fr = Image.alpha_composite(fr, lay).convert("RGB"); p.stdin.write(fr.tobytes())
p.stdin.close(); p.wait()
# audio: soft chord swell + gentle ping when the pin drops
sr = 48000; n = int(DUR * sr); t = np.arange(n) / sr; a = np.zeros(n)
hz = lambda m: 440 * 2 ** ((m - 69) / 12)
env = np.clip(t / 1.5, 0, 1) * np.clip((DUR - t) / 2.5, 0, 1)
for m in (45, 52, 57, 60, 64):
    for det in (-0.1, 0.1): a += 0.06 * env * np.sin(2 * np.pi * hz(m) * (1 + det / 100) * t)
i0 = int(2.25 * sr); tt = t[: n - i0]
for m, g_ in ((81, 0.22), (88, 0.12)): a[i0:] += g_ * np.sin(2 * np.pi * hz(m) * tt) * np.exp(-tt * 2.5)
a /= np.max(np.abs(a)); st = np.stack([a, np.roll(a, 300)], -1) * 0.8; sf.write(out + ".wav", st.astype(np.float32), sr)
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", out + ".v.mp4", "-i", out + ".wav", "-af", "loudnorm=I=-20:TP=-2",
    "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2", "-shortest", out], check=True)
os.remove(out + ".v.mp4"); os.remove(out + ".wav"); print("endcard", out)
