"use client";

import { useEffect, useRef } from "react";

// A real 3D product box built from CSS 3D transforms: front artwork, two
// spines, back and lids. It sways gently and leans toward the pointer.
// With `back` + `flip`, the back face carries a second product and the box
// makes a smooth half-turn every few seconds to show the other side.
export default function Box3D({
  front,
  back,
  title,
  accent = "#0284c7",
  backAccent,
  width = 260,
  height = 360,
  depth = 54,
  still = false,
  flip = false,
  paused = false,
}: {
  front: string;
  /** Artwork for the back face (a second product). */
  back?: string;
  title: string;
  accent?: string;
  backAccent?: string;
  width?: number;
  height?: number;
  depth?: number;
  /** Don't animate or follow the pointer. */
  still?: boolean;
  /** Half-turn between front and back every few seconds. */
  flip?: boolean;
  /** Hold the current side (e.g. while the visitor hovers). */
  paused?: boolean;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    if (still) {
      if (boxRef.current) {
        boxRef.current.style.transition = "transform 0.9s cubic-bezier(.65,0,.35,1)";
        boxRef.current.style.transform = "none";
      }
      return;
    }
    if (boxRef.current) boxRef.current.style.transition = "none";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const HOLD = 3200; // ms showing one side
    const TURN = reduce ? 1800 : 1300; // ms for the half-turn (slower when motion is reduced)
    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    let raf = 0;
    let last = performance.now();
    let elapsed = 0; // only advances while not paused
    let cur = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.current = {
        x: ((e.clientY / window.innerHeight) - 0.5) * -14,
        y: ((e.clientX / window.innerWidth) - 0.5) * 30,
      };
    };
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!pausedRef.current) elapsed += dt;

      let turn = 0;
      if (flip) {
        const cycle = HOLD + TURN;
        const n = Math.floor(elapsed / cycle);
        const t = elapsed - n * cycle;
        turn = n * 180 + (t < HOLD ? 0 : ease((t - HOLD) / TURN) * 180);
      }
      const s = elapsed / 1000;
      const sway = reduce ? { x: -6, y: -18 } : { x: Math.sin(s * 0.42) * 3 - 6, y: Math.sin(s * 0.6) * 10 - 18 };
      const goal = { x: sway.x + (reduce ? 0 : target.current.x), y: sway.y + (reduce ? 0 : target.current.y) };
      cur = { x: cur.x + (goal.x - cur.x) * 0.06, y: cur.y + (goal.y - cur.y) * 0.06 };
      const lift = reduce ? 0 : Math.sin(s * 0.8) * 6;
      if (boxRef.current) {
        boxRef.current.style.transform = `translateY(${lift}px) rotateX(${cur.x}deg) rotateY(${cur.y + turn}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    if (!reduce) window.addEventListener("pointermove", onMove, { passive: true });
    if (reduce && !flip) {
      if (boxRef.current) boxRef.current.style.transform = "rotateX(-6deg) rotateY(-18deg)";
    } else {
      raf = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [still, flip]);

  const face = "absolute left-1/2 top-1/2 [backface-visibility:hidden]";
  const shadeOf = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, black)`;
  const tintOf = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, white)`;
  const spineOf = (c: string) => `linear-gradient(90deg, ${tintOf(c, 80)} 0%, ${c} 40%, ${shadeOf(c, 72)} 100%)`;
  const backC = backAccent ?? accent;

  const tiles = (
    <span className="grid grid-cols-2 gap-[2px]" aria-hidden>
      <i className="block h-[6px] w-[6px] bg-[#f25022]" />
      <i className="block h-[6px] w-[6px] bg-[#7fba00]" />
      <i className="block h-[6px] w-[6px] bg-[#00a4ef]" />
      <i className="block h-[6px] w-[6px] bg-[#ffb900]" />
    </span>
  );
  const art = (src: string, alt: string) => (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" draggable={false} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0)_36%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.12)_100%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[3px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]" />
    </>
  );

  return (
    <div className="relative" style={{ width, height, perspective: 1400 }}>
      {/* floor shadow */}
      <div
        className="absolute left-1/2 -bottom-8 h-9 rounded-[50%] bg-[#0b1f3a]/35 blur-2xl"
        style={{ width: width * 0.85, transform: "translateX(-50%)" }}
      />
      <div ref={boxRef} className="relative h-full w-full [transform-style:preserve-3d] will-change-transform">
        {/* front */}
        <div
          className={`${face} overflow-hidden rounded-[3px] shadow-[0_30px_60px_-24px_rgba(11,31,58,0.45)]`}
          style={{ width, height, transform: `translate(-50%,-50%) translateZ(${depth / 2}px)` }}
        >
          {art(front, `${title} box`)}
        </div>
        {/* back: a second product, or a plain branded back */}
        <div
          className={`${face} overflow-hidden rounded-[3px] flex items-center justify-center`}
          style={{ width, height, background: shadeOf(backC, 55), transform: `translate(-50%,-50%) rotateY(180deg) translateZ(${depth / 2}px)` }}
        >
          {back ? art(back, `${title} box, back`) : <span className="text-white/60 text-sm font-bold tracking-widest uppercase">Official Keys Hub</span>}
        </div>
        {/* right spine (front colour) */}
        <div
          className={`${face} flex flex-col items-center justify-start gap-3 py-4`}
          style={{ width: depth, height, background: spineOf(accent), transform: `translate(-50%,-50%) rotateY(90deg) translateZ(${width / 2}px)` }}
        >
          {tiles}
          <span className="text-white font-semibold text-[13px] tracking-[0.06em] whitespace-nowrap [writing-mode:vertical-rl]">{title}</span>
        </div>
        {/* left spine (back colour) */}
        <div
          className={`${face} flex flex-col items-center justify-start gap-3 py-4`}
          style={{ width: depth, height, background: back ? spineOf(backC) : shadeOf(accent, 60), transform: `translate(-50%,-50%) rotateY(-90deg) translateZ(${width / 2}px)` }}
        >
          {back && tiles}
          {back && <span className="text-white font-semibold text-[13px] tracking-[0.06em] whitespace-nowrap [writing-mode:vertical-rl]">{title}</span>}
        </div>
        {/* top & bottom */}
        <div
          className={face}
          style={{ width, height: depth, background: "linear-gradient(180deg,#ffffff,#e6edf6)", transform: `translate(-50%,-50%) rotateX(90deg) translateZ(${height / 2}px)` }}
        />
        <div
          className={face}
          style={{ width, height: depth, background: shadeOf(accent, 45), transform: `translate(-50%,-50%) rotateX(-90deg) translateZ(${height / 2}px)` }}
        />
      </div>
    </div>
  );
}
