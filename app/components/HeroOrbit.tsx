"use client";

import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import ProductBox3D from "./ProductBox3D";
import type { BundleOffer, BundleItem } from "./HeroBillboard";

// Homepage billboard: the Windows 11 Pro + Office 2024 bundle on a lit deep-blue
// stage. Two real 3D boxes float and tilt toward the pointer, and the orange
// ring from the logo orbits through them with a bright spark. Motion stops for
// visitors who ask for reduced motion (see the CSS at the bottom).

const DARK: Record<string, string> = { "#0067b8": "#0b3f86", "#d83b01": "#a8300e" };

function Box({ item, w }: { item: BundleItem; w: number }) {
  return <ProductBox3D image={item.image} short={item.short} accent={item.accent} dark={DARK[item.accent] ?? "#0b3f86"} w={w} frontClassName="ho-front" />;
}

export default function HeroOrbit({ offer }: { offer: BundleOffer }) {
  const [win, office] = offer.items;
  const stage = useRef<HTMLDivElement>(null);
  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const el = stage.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 22}deg`);
    el.style.setProperty("--rx", `${(0.5 - (e.clientY - r.top) / r.height) * 14}deg`);
  };
  const reset = () => {
    stage.current?.style.setProperty("--ry", "0deg");
    stage.current?.style.setProperty("--rx", "0deg");
  };

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(60%_80%_at_72%_45%,#15408a,#0a1f4d_55%,#061230)] text-white">
      <style>{CSS}</style>
      <div className="relative max-w-7xl mx-auto px-4 pt-6 pb-12 lg:py-16 grid grid-cols-[minmax(0,1fr)] lg:grid-cols-2 gap-2 lg:gap-8 items-center">
        {/* copy */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <p className="text-sky-300 text-xs font-bold uppercase tracking-[0.18em]">Bundle · one PC · lifetime</p>
          <h1 className="okh-wordmark mt-3 text-[2.6rem] sm:text-5xl md:text-6xl font-extrabold tracking-[-0.035em] leading-[1.02]">
            {win.short}
            <span className="block text-[#ff7a3d]">+ {office.short}</span>
          </h1>
          <div className="mt-6 flex items-end gap-4 justify-center lg:justify-start">
            <span className="okh-wordmark text-5xl font-extrabold tabular-nums">{offer.price}</span>
            <span className="pb-1.5 text-sm text-white/60 text-left leading-tight">
              Separately {offer.separately}
              <br />
              <span className="font-bold text-emerald-400">You save {offer.save}</span>
            </span>
          </div>
          <div className="mt-7 flex justify-center lg:justify-start">
            <Link href={`/products/${offer.slug}`} className="ho-btn">
              Get the bundle <i className="fas fa-arrow-right text-sm" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 text-[13px] text-white/70">
            <span><i className="fas fa-envelope mr-1.5 text-sky-400" aria-hidden="true" />Emailed after payment</span>
            <span><i className="fas fa-rotate-left mr-1.5 text-sky-400" aria-hidden="true" />30-day money-back</span>
          </div>
        </div>

        {/* lit 3D stage (first on phones) */}
        <div ref={stage} onPointerMove={tilt} onPointerLeave={reset} className="ho-stage order-1 lg:order-2" aria-hidden="true">
          <div className="ho-backlight" />
          <div className="ho-beam" />
          <div className="ho-scene">
            <div className="ho-orbit"><span className="ho-spark" /></div>
            <div className="ho-win"><Box item={win} w={170} /></div>
            <div className="ho-office"><Box item={office} w={170} /></div>
            <div className="ho-chip ho-chip-1"><i className="fas fa-bolt text-amber-500 mr-1.5" />Emailed in minutes</div>
          </div>
          <div className="ho-shadow" />
          <div className="ho-pool" />
        </div>
      </div>
    </section>
  );
}

const CSS = `
/* The site caps every element at its parent's width (globals.css); the 3D scene
   hangs off a zero-width anchor, so lift that cap inside the stage. */
.ho-stage *{max-width:none}
.ho-stage{position:relative;height:440px;perspective:1200px;--rx:0deg;--ry:0deg}
.ho-scene{position:absolute;left:50%;top:48%;transform-style:preserve-3d;transform:rotateX(var(--rx)) rotateY(calc(var(--ry) - 14deg));transition:transform .35s ease-out}
.ho-box{position:relative;transform-style:preserve-3d}
.ho-front{box-shadow:inset 0 0 0 1px rgba(255,255,255,.55),0 0 34px rgba(56,160,255,.35)}
.ho-win,.ho-office{position:absolute;transform-style:preserve-3d}
.ho-win{left:-150px;top:-130px;transform:rotateY(18deg) translateZ(-20px);animation:ho-float 6s ease-in-out infinite}
.ho-office{left:-10px;top:-100px;transform:rotateY(-12deg) translateZ(60px);animation:ho-float 6s ease-in-out -3s infinite}
@keyframes ho-float{0%,100%{translate:0 0}50%{translate:0 -14px}}
.ho-orbit{position:absolute;left:-230px;top:-60px;width:460px;height:460px;margin-top:-140px;border-radius:50%;transform-style:preserve-3d;transform:rotateX(76deg) rotateY(-10deg);border:5px solid transparent;background:conic-gradient(from 0deg,#e3611f,#c0330f,#e3611f) border-box;-webkit-mask:linear-gradient(#000 0 0) padding-box exclude,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) padding-box exclude,linear-gradient(#000 0 0);filter:drop-shadow(0 0 6px rgba(255,120,40,.75)) drop-shadow(0 0 16px rgba(255,120,40,.35));animation:ho-orbit 9s linear infinite}
.ho-spark{position:absolute;left:50%;top:-8px;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:#fff6d6;box-shadow:0 0 18px 6px rgba(255,190,120,.9)}
@keyframes ho-orbit{from{transform:rotateX(76deg) rotateY(-10deg) rotateZ(0)}to{transform:rotateX(76deg) rotateY(-10deg) rotateZ(360deg)}}
.ho-chip{position:absolute;white-space:nowrap;background:rgba(255,255,255,.92);border:1px solid #dbeafe;border-radius:999px;padding:.45rem .8rem;font-size:12px;font-weight:700;color:#0b1f3a;box-shadow:0 14px 30px -14px rgba(2,40,80,.35)}
.ho-chip-1{transform:translate3d(-150px,-150px,90px)}
.ho-backlight{position:absolute;left:50%;top:46%;width:560px;height:560px;margin:-280px 0 0 -280px;border-radius:50%;background:radial-gradient(closest-side,rgba(70,165,255,.55),rgba(40,140,255,.18) 45%,transparent 72%);filter:blur(8px);animation:ho-breathe 5s ease-in-out infinite;pointer-events:none}
@keyframes ho-breathe{0%,100%{opacity:.8;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
.ho-beam{position:absolute;left:50%;top:-40px;width:440px;height:470px;margin-left:-220px;background:linear-gradient(180deg,rgba(190,225,255,.55),rgba(190,225,255,0) 80%);clip-path:polygon(40% 0,60% 0,100% 100%,0 100%);filter:blur(16px);opacity:.7;pointer-events:none}
.ho-shadow{position:absolute;left:50%;bottom:34px;width:340px;height:50px;margin-left:-170px;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.45),transparent);filter:blur(4px)}
.ho-pool{position:absolute;left:50%;bottom:22px;width:420px;height:70px;margin-left:-210px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,122,61,.4),rgba(40,140,255,.2) 55%,transparent);filter:blur(10px);pointer-events:none}
.ho-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.5rem;border-radius:.8rem;font-weight:800;color:#fff;background:linear-gradient(90deg,#10b981,#059669);box-shadow:0 12px 26px -12px rgba(5,150,105,.8);transition:transform .2s}
.ho-btn:hover{transform:translateY(-2px)}
/* Phones: less turn, ring kept inside the frame, lights centred on the boxes. */
@media (max-width:640px){
  .ho-stage{height:320px}
  .ho-scene{scale:.68;top:54%;transform:rotateX(var(--rx)) rotateY(calc(var(--ry) - 6deg))}
  .ho-orbit{scale:.84}
  .ho-backlight{width:330px;height:330px;margin:-165px 0 0 -165px;top:54%}
  .ho-beam{width:280px;height:330px;margin-left:-140px;top:-6px;opacity:.6}
  .ho-shadow{width:230px;margin-left:-115px;bottom:30px}
  .ho-pool{width:290px;height:56px;margin-left:-145px;bottom:20px}
  .ho-chip-1{transform:translate3d(-125px,-170px,90px)}
}
@media (prefers-reduced-motion: reduce){
  .ho-win,.ho-office,.ho-orbit,.ho-backlight{animation:none}
  .ho-spark{display:none}
  .ho-scene{transition:none}
}
`;
