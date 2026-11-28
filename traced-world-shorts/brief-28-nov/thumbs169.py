"""16:9 long-video thumbnails in the Traced World identity (globe mark, red kicker, white+yellow hook)."""
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance, ImageOps
W,H=1280,720; F="/usr/share/fonts/opentype/inter/"; f=lambda n,s: ImageFont.truetype(F+n,s)
RED,YEL,WHITE=(232,52,52),(255,210,60),(255,255,255)
MARK="/tmp/claude-0/-home-user-officialkeyshub/39654c7a-130c-5f84-a31f-97fde0cd2dfe/scratchpad/logo/mark_48.png"
def make(bg,cx,kicker,lines,size,sub,out,ky=170):
    im=ImageOps.fit(Image.open(bg).convert("RGB"),(W,H),Image.LANCZOS,centering=(cx,0.5))
    im=ImageEnhance.Contrast(im).enhance(1.2)
    x=np.linspace(0,1,W)[None,:]; a=np.clip(0.88-0.95*x,0.12,0.88)
    im=Image.fromarray((np.asarray(im).astype(np.float32)*(1-a)[...,None]).astype(np.uint8)).convert("RGBA")
    t=Image.new("RGBA",(W,H)); d=ImageDraw.Draw(t)
    m=Image.open(MARK).convert("RGBA"); t.paste(m,(42,32),m)
    d.text((100,36),"TRACED WORLD",font=f("InterDisplay-Black.otf",36),fill=WHITE+(255,))
    kf=f("Inter-Black.otf",34); d.rounded_rectangle([48,ky,48+d.textlength(kicker,font=kf)+40,ky+56],10,fill=RED+(255,)); d.text((68,ky+8),kicker,font=kf,fill=WHITE+(255,))
    y=ky+80
    for s,c in lines:
        hf=f("InterDisplay-Black.otf",size); bb=d.textbbox((0,0),s,font=hf)
        d.text((44,y-bb[1]),s,font=hf,fill=c+(255,),stroke_width=5,stroke_fill=(0,0,0,255)); y+=bb[3]-bb[1]+22
    d.text((50,y+16),sub,font=f("Inter-ExtraBold.otf",46),fill=WHITE+(255,),stroke_width=3,stroke_fill=(0,0,0,255))
    sh=t.getchannel("A").filter(ImageFilter.GaussianBlur(10)); shl=Image.new("RGBA",(W,H),(0,0,0,0)); shl.putalpha(sh.point(lambda v:int(v*0.8)))
    Image.alpha_composite(Image.alpha_composite(im,shl),t).convert("RGB").save(out,quality=92)
make("thumbsrc/kuwait.png",0.35,"KUWAIT DRONE STRIKE",[("WHO REALLY",WHITE),("DID IT?",YEL)],150,"2 Italians killed · Iran says 'false flag'","week/final/The World This Week - THUMBNAIL.jpg",ky=150)
make("thumbsrc/hacker.png",0.7,"REPORTED BREACH",[("HACKERS INSIDE",WHITE),("US AIR FORCE?",YEL)],118,"Who did it, and what did they take?","brief/Traced World Brief - THUMBNAIL.jpg")
