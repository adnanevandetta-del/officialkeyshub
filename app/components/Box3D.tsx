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
      if (boxRef.current) boxRef.current.style.transform = "none";
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t = 0;
    let cur = { x: -8, y: -24 };
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
  const spine = `linear-gradient(180deg, ${accent} 0%, #0b1530 100%)`;

  return (
    <div className="relative" style={{ width, height, perspective: 1400 }}>
      {/* floor shadow */}
      <div
        className="absolute left-1/2 -bottom-10 h-10 rounded-[50%] bg-black/50 blur-2xl"
        style={{ width: width * 0.9, transform: "translateX(-50%)" }}
      />
      <div ref={boxRef} className="relative h-full w-full [transform-style:preserve-3d] will-change-transform">
        {/* front */}
        <div
          className={`${face} overflow-hidden rounded-[6px] shadow-[0_30px_80px_-20px_rgba(2,132,199,0.55)]`}
          style={{ width, height, transform: `translate(-50%,-50%) translateZ(${depth / 2}px)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={front} alt={`${title} box`} className="h-full w-full object-cover" draggable={false} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25" />
        </div>
        {/* back */}
        <div
          className={`${face} rounded-[6px] flex items-center justify-center`}
          style={{ width, height, background: "#0b1530", transform: `translate(-50%,-50%) rotateY(180deg) translateZ(${depth / 2}px)` }}
        >
          <span className="text-white/60 text-sm font-bold tracking-widest uppercase">Official Keys Hub</span>
        </div>
        {/* right spine */}
        <div
          className={`${face} flex items-center justify-center`}
          style={{ width: depth, height, background: spine, transform: `translate(-50%,-50%) rotateY(90deg) translateZ(${width / 2}px)` }}
        >
          <span className="text-white font-extrabold text-sm tracking-wide whitespace-nowrap [writing-mode:vertical-rl]">{title}</span>
        </div>
        {/* left spine */}
        <div
          className={`${face}`}
          style={{ width: depth, height, background: spine, filter: "brightness(0.7)", transform: `translate(-50%,-50%) rotateY(-90deg) translateZ(${width / 2}px)` }}
        />
        {/* top & bottom */}
        <div
          className={face}
          style={{ width, height: depth, background: "#e7ecf5", transform: `translate(-50%,-50%) rotateX(90deg) translateZ(${height / 2}px)` }}
        />
        <div
          className={face}
          style={{ width, height: depth, background: "#0b1530", transform: `translate(-50%,-50%) rotateX(-90deg) translateZ(${height / 2}px)` }}
        />
      </div>
    </div>
  );
}
