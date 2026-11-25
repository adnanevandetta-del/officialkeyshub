"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Box3D from "./Box3D";
import LineIcon from "./LineIcon";
import { PROMO_PERCENT } from "../lib/promo";

export interface BillboardProduct {
  name: string;
  short: string; // name on the box spine and the button
  slug: string;
  price: string;
  originalPrice: string;
  image: string;
  accent: string; // spine colour
}

const SWAP_MS = 4800;

// The homepage hero. Copy stays put; the best sellers stand on a 3D turntable
// that turns to the next one every few seconds (pauses on hover, dots to pick).
export default function HeroBillboard({ products }: { products: BillboardProduct[] }) {
  const n = products.length;
  const [k, setK] = useState(0); // total steps turned; never wraps, so the ring keeps spinning forward
  const [paused, setPaused] = useState(false);
  const i = ((k % n) + n) % n;
  const p = products[i];
  const step = 360 / n;
  const fromPrice = products
    .map((x) => x.price)
    .sort((a, b) => parseFloat(a.replace(/[^0-9.]/g, "")) - parseFloat(b.replace(/[^0-9.]/g, "")))[0];

  const go = (to: number) => setK((cur) => cur + ((to - (((cur % n) + n) % n) + n) % n));

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setK((cur) => cur + 1), SWAP_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="relative -mb-px overflow-hidden bg-[linear-gradient(180deg,#dcefff_0%,#eef7ff_45%,#ffffff_100%)]">
      {/* backdrop: soft light, Microsoft four-tile motif, fine grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="okh3d-drift absolute -top-40 left-[8%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(0,120,212,0.22),transparent)]" />
        <div className="okh3d-drift absolute top-20 right-[-10%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(80,170,255,0.28),transparent)] [animation-delay:-7s]" />
        <div
          aria-hidden
          className="absolute right-[-6%] top-[6%] hidden md:grid grid-cols-2 gap-5 opacity-[0.10] [transform:perspective(1200px)_rotateY(-24deg)_rotateX(8deg)]"
        >
          <span className="h-44 w-44 lg:h-56 lg:w-56 rounded-[18px] bg-[#f25022]" />
          <span className="h-44 w-44 lg:h-56 lg:w-56 rounded-[18px] bg-[#7fba00]" />
          <span className="h-44 w-44 lg:h-56 lg:w-56 rounded-[18px] bg-[#00a4ef]" />
          <span className="h-44 w-44 lg:h-56 lg:w-56 rounded-[18px] bg-[#ffb900]" />
        </div>
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(0,103,184,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,103,184,.07)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
        {/* 3D stage (first on phones) */}
        <div
          className="relative order-first lg:order-none h-[330px] sm:h-[410px] lg:h-[500px] flex items-center justify-center lg:col-start-2 lg:row-start-1"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <div className="absolute bottom-4 sm:bottom-8 h-16 w-[260px] sm:w-[380px] rounded-[50%] bg-gradient-to-b from-white to-[#e3f1ff] shadow-[0_22px_60px_-12px_rgba(0,103,184,0.45)] border border-white" />

          {/* turntable: every best seller stands on a ring that turns to bring the next one forward */}
          <div className="relative z-10 h-[360px] w-[260px] scale-[0.66] sm:scale-[0.82] lg:scale-100" style={{ perspective: 1600 }}>
            <div
              className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-[1100ms] [transition-timing-function:cubic-bezier(.65,0,.35,1)]"
              style={{ transform: `translateZ(-250px) rotateX(-7deg) rotateY(${-k * step}deg)` }}
            >
              {products.map((x, idx) => {
                // No opacity here: it would flatten the 3D box and show back faces through it.
                return (
                  <div
                    key={x.slug}
                    className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]"
                    style={{ transform: `rotateY(${idx * step}deg) translateZ(250px)` }}
                  >
                    <Box3D still front={x.image} title={x.short} accent={x.accent} width={232} height={320} depth={46} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* price chip */}
          <div className="okh3d-float absolute right-[2%] sm:right-[6%] top-[8%] z-20 rounded-2xl bg-white/90 backdrop-blur border border-[#d6e9fb] px-4 py-3 shadow-[0_15px_40px_-12px_rgba(0,103,184,0.45)] min-w-[128px]">
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-bold">One-time price</p>
            <p key={p.slug} className="text-2xl font-extrabold text-[#0b1f3a] leading-tight tabular-nums">{p.price}</p>
            <p className="text-[11px] text-slate-500">Retail {p.originalPrice}</p>
          </div>
          <div className="okh3d-float-slow absolute left-0 sm:left-[2%] bottom-[18%] z-20 hidden sm:flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-[#d6e9fb] pl-2 pr-4 py-2 shadow-[0_15px_40px_-12px_rgba(0,103,184,0.4)]">
            <span className="h-7 w-7 rounded-full bg-emerald-500/12 text-emerald-600 flex items-center justify-center"><LineIcon name="mail" className="h-4 w-4" /></span>
            <span className="text-sm font-semibold text-slate-800">Emailed after payment</span>
          </div>
          <div className="okh3d-float absolute right-0 bottom-[26%] z-20 hidden sm:flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-[#d6e9fb] pl-2 pr-4 py-2 shadow-[0_15px_40px_-12px_rgba(0,103,184,0.4)] [animation-delay:-3s]">
            <span className="h-7 w-7 rounded-full bg-[#0078d4]/12 text-[#0067b8] flex items-center justify-center"><LineIcon name="windows" className="h-3.5 w-3.5" /></span>
            <span className="text-sm font-semibold text-slate-800">Activates on Microsoft</span>
          </div>

          {/* which best seller is showing */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex gap-2" role="tablist" aria-label="Best sellers">
            {products.map((x, n) => (
              <button
                key={x.slug}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-label={x.name}
                onClick={() => go(n)}
                className={`h-2 rounded-full transition-all ${n === i ? "w-7 bg-[#0067b8]" : "w-2 bg-[#0067b8]/25 hover:bg-[#0067b8]/50"}`}
              />
            ))}
          </div>
        </div>

        {/* copy */}
        <div className="text-center lg:text-left lg:col-start-1 lg:row-start-1">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-[#cfe5fa] text-[#0b4a8a] text-[11px] font-bold uppercase tracking-[0.12em] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Genuine licenses · US-based store
          </span>
          <h1 className="mt-6 text-[2.5rem] leading-[1.05] sm:text-[3.6rem] xl:text-[4.2rem] font-extrabold tracking-[-0.035em] text-[#0b1f3a] [text-wrap:balance]">
            Genuine Windows &amp; Office keys
            <span className="block mt-1 bg-gradient-to-r from-[#0067b8] via-[#0078d4] to-[#2b9af3] bg-clip-text text-transparent pb-2">
              from {fromPrice}.
            </span>
          </h1>
          <p className="mt-5 text-[1.075rem] leading-relaxed text-slate-600 max-w-xl mx-auto lg:mx-0">
            Activate in minutes on Microsoft&apos;s own servers. Emailed after payment, pay once, and backed by a 30-day
            money-back guarantee.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <Link
              href={`/products/${p.slug}`}
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold shadow-[0_14px_34px_-10px_rgba(16,185,129,0.75)] transition-all hover:-translate-y-0.5"
            >
              Get {p.short} · {p.price}
              <LineIcon name="arrowRight" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products"
              className="px-6 py-4 rounded-2xl bg-white/80 backdrop-blur border border-[#cfe5fa] hover:border-[#0078d4] text-[#0b1f3a] font-bold shadow-sm transition-colors"
            >
              Browse all keys
            </Link>
          </div>

          <p className="mt-4 text-sm text-slate-600">
            New here?{" "}
            <Link href="/login" className="font-bold text-[#0067b8] underline decoration-[#0067b8]/30 underline-offset-4 hover:decoration-[#0067b8]">
              Get {PROMO_PERCENT}% off your first order
            </Link>{" "}
            with your email.
          </p>

          <div className="mt-7 grid grid-cols-3 max-w-lg mx-auto lg:mx-0 gap-2">
            {(
              [
                ["bolt", "Email delivery"],
                ["shieldCheck", "Activates on Microsoft"],
                ["refund", "30-day refund"],
              ] as const
            ).map(([ic, t]) => (
              <div key={t} className="rounded-2xl bg-white/75 backdrop-blur border border-white shadow-[0_8px_24px_-14px_rgba(0,103,184,0.5)] py-3 px-2 flex flex-col items-center text-center">
                <span className="h-8 w-8 rounded-xl bg-[#0078d4]/10 text-[#0067b8] flex items-center justify-center">
                  <LineIcon name={ic} className="h-[18px] w-[18px]" />
                </span>
                <p className="mt-1.5 text-xs text-slate-700 font-semibold leading-tight">{t}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-slate-500 font-medium">
            <LineIcon name="lock" className="inline h-3.5 w-3.5 -mt-0.5 mr-1 text-slate-500" /> Secure checkout · PayPal · Cards via PayPal · USDT
          </p>
        </div>
      </div>
    </section>
  );
}
