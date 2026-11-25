"use client";

import { useEffect, useRef } from "react";

// A real 3D product box built from CSS 3D transforms: front artwork, two
// spines, back and lids. It idles with a slow turn and leans toward the
// pointer. Respects prefers-reduced-motion.
export default function Box3D({
  front,
  title,
  accent = "#0284c7",
  width = 260,
  height = 360,
  depth = 54,
  still = false,
}: {
  front: string;
  title: string;
  accent?: string;
  width?: number;
  height?: number;
  depth?: number;
  /** Don't animate or follow the pointer (e.g. when a parent carousel moves the box). */
  still?: boolean;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (still) {
      // Settle smoothly (e.g. a box leaving the front of the carousel).
      if (boxRef.current) {
        boxRef.current.style.transition = "transform 0.9s cubic-bezier(.65,0,.35,1)";
        boxRef.current.style.transform = "none";
      }
      return;
    }
    if (boxRef.current) boxRef.current.style.transition = "none";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t = 0;
    let cur = { x: 0, y: 0 }; // eases into the idle turn, so a box arriving at the front doesn't jump
    const onMove = (e: PointerEvent) => {
      target.current = {
        x: ((e.clientY / window.innerHeight) - 0.5) * -18,
        y: ((e.clientX / window.innerWidth) - 0.5) * 46,
      };
    };
    const tick = () => {
      t += 0.006;
      const idleY = Math.sin(t) * 22 - 18;
      const idleX = Math.sin(t * 0.7) * 4 - 6;
      const goal = { x: idleX + target.current.x, y: idleY + target.current.y };
      cur = { x: cur.x + (goal.x - cur.x) * 0.06, y: cur.y + (goal.y - cur.y) * 0.06 };
      if (boxRef.current) {
        boxRef.current.style.transform = `rotateX(${cur.x}deg) rotateY(${cur.y}deg) translateY(${Math.sin(t * 1.3) * 6}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    if (reduce) {
      if (boxRef.current) boxRef.current.style.transform = "rotateX(-6deg) rotateY(-24deg)";
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [still]);

  const face = "absolute left-1/2 top-1/2 [backface-visibility:hidden]";
  const shade = (pct: number) => `color-mix(in srgb, ${accent} ${pct}%, black)`;
  const tint = (pct: number) => `color-mix(in srgb, ${accent} ${pct}%, white)`;
  const spine = `linear-gradient(90deg, ${tint(80)} 0%, ${accent} 40%, ${shade(72)} 100%)`;

  return (
    <div className="relative" style={{ width, height, perspective: 1400 }}>
      {/* floor shadow */}
      <div
        className="absolute left-1/2 -bottom-8 h-9 rounded-[50%] bg-[#0b1f3a]/35 blur-2xl"
        style={{ width: width * 0.85, transform: "translateX(-50%)" }}
      />
      <div ref={boxRef} className="relative h-full w-full [transform-style:preserve-3d] will-change-transform">
        {/* front: the box art, a soft gloss and a hairline edge */}
        <div
          className={`${face} overflow-hidden rounded-[5px] shadow-[0_30px_60px_-24px_rgba(11,31,58,0.45)]`}
          style={{ width, height, transform: `translate(-50%,-50%) translateZ(${depth / 2}px)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={front} alt={`${title} box`} className="h-full w-full object-cover" draggable={false} />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0)_36%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.12)_100%)]" />
          <div className="pointer-events-none absolute inset-0 rounded-[5px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]" />
        </div>
        {/* back */}
        <div
          className={`${face} rounded-[5px] flex items-center justify-center`}
          style={{ width, height, background: shade(55), transform: `translate(-50%,-50%) rotateY(180deg) translateZ(${depth / 2}px)` }}
        >
          <span className="text-white/60 text-sm font-bold tracking-widest uppercase">Official Keys Hub</span>
        </div>
        {/* right spine: four-tile mark and the product name */}
        <div
          className={`${face} flex flex-col items-center justify-start gap-3 py-4`}
          style={{ width: depth, height, background: spine, transform: `translate(-50%,-50%) rotateY(90deg) translateZ(${width / 2}px)` }}
        >
          <span className="grid grid-cols-2 gap-[2px]" aria-hidden>
            <i className="block h-[6px] w-[6px] bg-[#f25022]" />
            <i className="block h-[6px] w-[6px] bg-[#7fba00]" />
            <i className="block h-[6px] w-[6px] bg-[#00a4ef]" />
            <i className="block h-[6px] w-[6px] bg-[#ffb900]" />
          </span>
          <span className="text-white font-semibold text-[13px] tracking-[0.06em] whitespace-nowrap [writing-mode:vertical-rl]">{title}</span>
        </div>
        {/* left spine */}
        <div
          className={face}
          style={{ width: depth, height, background: shade(60), transform: `translate(-50%,-50%) rotateY(-90deg) translateZ(${width / 2}px)` }}
        />
        {/* top & bottom */}
        <div
          className={face}
          style={{ width, height: depth, background: "linear-gradient(180deg,#ffffff,#e6edf6)", transform: `translate(-50%,-50%) rotateX(90deg) translateZ(${height / 2}px)` }}
        />
        <div
          className={face}
          style={{ width, height: depth, background: shade(45), transform: `translate(-50%,-50%) rotateX(-90deg) translateZ(${height / 2}px)` }}
        />
      </div>
    </div>
  );
}
