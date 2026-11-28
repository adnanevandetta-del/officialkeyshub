"""2 s intro sting frames (1920x1080): route sweeps, pin pops, wordmark snaps in, quick fade to the story."""
import os, numpy as np
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); W, H = 1920, 1080
F = "/usr/share/fonts/opentype/inter/"; fnt = lambda n, s: ImageFont.truetype(F + n, s)
RED, WHITE, SOFT = (226, 45, 45), (246, 247, 250), (200, 210, 225)
ease = lambda x: 1 - (1 - max(0, min(1, x))) ** 3
def frames(w=W, h=H, scale=1.0):
    bg = Image.open(os.path.join(HERE, "bg_map_1920.png")).convert("RGBA")
    if (w, h) != (W, H):  # vertical: crop centre of the map
        bg = bg.resize((int(1920 * h / 1080), h)).crop((int((1920 * h / 1080 - w) / 2), 0, int((1920 * h / 1080 - w) / 2) + w, h))
    out = []
    for i in range(60):
        t = i / 30; fr = bg.copy(); g = Image.open(os.path.join(HERE, "sting300", f"{i:03d}.png")).convert("RGBA")
        if scale != 1.0: g = g.resize((int(g.width * scale), int(g.height * scale)), Image.LANCZOS)
        lay = Image.new("RGBA", (w, h), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
        e = ease((t - 0.45) / 0.35); big = fnt("InterDisplay-Black.otf", int(120 * scale))
        if w > h:
            tw_ = d.textlength("TRACED", font=big); gap = int(40 * scale); grp = g.width + gap + tw_
            gx = int((w - grp) / 2); gy = int(h / 2 - g.height / 2); tx = gx + g.width + gap
            fr.paste(g, (gx, gy), g)
            lh = int(118 * scale); ty = int(h / 2 - lh - 8 * scale)
            d.text((tx + (1 - e) * 40, ty), "TRACED", font=big, fill=WHITE + (int(255 * e),))
            d.text((tx + (1 - e) * 40, ty + lh), "WORLD", font=big, fill=RED + (int(255 * e),))
        else:
            fr.paste(g, (int(w / 2 - g.width / 2), 560), g)
            for word, col, yy in (("TRACED", WHITE, 1000), ("WORLD", RED, 1000 + int(130 * scale))):
                d.text((w / 2 - d.textlength(word, font=big) / 2, yy + (1 - e) * 20), word, font=big, fill=col + (int(255 * e),))
        fr = Image.alpha_composite(fr, lay)
        out.append(fr)
    return out
