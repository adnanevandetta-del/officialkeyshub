import sys, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance, ImageOps
sys.argv = [sys.argv[0]]
import render2 as R
W, H = 1080, 1920
F = "/usr/share/fonts/opentype/inter/"
def f(n, s): return ImageFont.truetype(F + n, s)
RED, YEL, WHITE = (232, 52, 52), (255, 210, 60), (255, 255, 255)

def cover(im):
    im = ImageOps.fit(im.convert("RGB"), (W, H), Image.LANCZOS, centering=(0.5, 0.45))
    im = ImageEnhance.Contrast(im).enhance(1.15); im = ImageEnhance.Color(im).enhance(0.9)
    return im

def shade(im):
    y = np.linspace(0, 1, H)[:, None]
    a = 0.25 + 0.55 * np.clip((y - 0.38) / 0.35, 0, 1) + 0.35 * np.clip(1 - y / 0.12, 0, 1)
    arr = np.asarray(im).astype(np.float32) * (1 - np.clip(a, 0, 0.85))[..., None]
    return Image.fromarray(arr.astype(np.uint8)).convert("RGBA")

def fit_font(d, text, maxw, start, name="InterDisplay-Black.otf"):
    s = start
    while d.textlength(text, font=f(name, s)) > maxw: s -= 4
    return f(name, s)

def make(bg, kicker, lines, sub, out, pin=None, note=""):
    im = shade(cover(bg)); W2 = W - 2 * 70
    txt = Image.new("RGBA", (W, H)); d = ImageDraw.Draw(txt)
    if pin:
        cx, cy = pin
        for r, a in [(70, 90), (46, 160)]: d.ellipse([cx-r, cy-r, cx+r, cy+r], outline=RED + (a,), width=8)
        d.ellipse([cx-22, cy-22, cx+22, cy+22], fill=RED + (255,), outline=WHITE + (255,), width=6)
    # brand
    _m = Image.open("/tmp/claude-0/-home-user-officialkeyshub/39654c7a-130c-5f84-a31f-97fde0cd2dfe/scratchpad/logo/mark_72.png").convert("RGBA"); txt.paste(_m, (62, 90), _m)
    d.text((146, 96), "TRACED WORLD", font=f("InterDisplay-Black.otf", 52), fill=WHITE + (255,))
    # hook block, bottom-centre-ish (above Shorts UI)
    y = 860
    kf = f("Inter-Black.otf", 54); kw = d.textlength(kicker, font=kf)
    d.rounded_rectangle([70, y, 70 + kw + 56, y + 92], 14, fill=RED + (255,))
    d.text((98, y + 14), kicker, font=kf, fill=WHITE + (255,)); y += 130
    for text, col in lines:
        hf = fit_font(d, text, W2, 210)
        bb = d.textbbox((0, 0), text, font=hf)
        d.text((70, y - bb[1]), text, font=hf, fill=col + (255,), stroke_width=6, stroke_fill=(0, 0, 0, 255))
        y += bb[3] - bb[1] + 30
    sf = f("Inter-ExtraBold.otf", 62)
    for ln in R.wrap(d, sub, sf, W2):
        d.text((70, y + 10), ln, font=sf, fill=WHITE + (255,), stroke_width=3, stroke_fill=(0, 0, 0, 255)); y += 80
    d.text((70, 1820), note, font=f("Inter-Medium.otf", 30), fill=(220, 225, 235, 200))
    sh = txt.getchannel("A").filter(ImageFilter.GaussianBlur(14))
    shl = Image.new("RGBA", (W, H), (0, 0, 0, 0)); shl.putalpha(sh.point(lambda v: int(v * 0.8)))
    im = Image.alpha_composite(Image.alpha_composite(im, shl), txt).convert("RGB")
    im.save(out, quality=90, optimize=True)

o = sys.stdin.readline().strip()
S = "thumbsrc/"
make(Image.open(S+"10386895.png"), "HOUTHIS CLAIM", [("SAUDI OIL", WHITE), ("GIANT HIT?", YEL)], "Strike claimed on the kingdom's biggest refinery", o+"/01-houthis-saudi-refinery - THUMBNAIL.jpg")
make(Image.open(S+"12734644.png"), "ONE NIGHT", [("87 MISSILES", YEL), ("& DRONES", WHITE)], "shot down in Russia's overnight barrage on Ukraine", o+"/02-russia-barrage-ukraine - THUMBNAIL.jpg")
make(Image.open(S+"8012093.png"), "NORTH-EAST SYRIA", [("ISIS STRIKES", WHITE), ("AGAIN", YEL)], "Deadly attack on a security building in Hassakeh", o+"/03-isis-attack-hassakeh - THUMBNAIL.jpg")
mz = R.MapZoom([31.45, 34.40, 10.5, 10.5, "GAZA"], 1.0)
make(mz.frame(5).convert("RGB"), "GAZA", [("8 KILLED", YEL), ("OVERNIGHT", WHITE)], "Is the ceasefire falling apart?", o+"/04-gaza-overnight-strikes - THUMBNAIL.jpg", note="")
make(Image.open(S+"4260694.png"), "DR CONGO", [("WORST EBOLA", WHITE), ("OUTBREAK", YEL)], "11,504 cases, the most Congo has ever recorded", o+"/05-ebola-congo-record - THUMBNAIL.jpg")
