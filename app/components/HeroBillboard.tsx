"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Box3D from "./Box3D";
import LineIcon from "./LineIcon";
import { PROMO_PERCENT } from "../lib/promo";

export interface BundleItem {
  name: string;
  short: string;
  price: string;
  image: string;
  accent: string;
  perks: string;
}

export interface BundleOffer {
  slug: string;
  price: string;
  items: [BundleItem, BundleItem];
  separately: string; // the two items bought one by one
  save: string; // separately minus bundle price
}

// Opens the bundle builder inside the product grid (same event the navbar uses).
function openBundleBuilder() {
  try {
    sessionStorage.setItem("selectedCategory", "bundles");
  } catch {
    // storage blocked: the grid just opens on its default tab
  }
  window.dispatchEvent(new CustomEvent("categoryChanged", { detail: { category: "bundles" } }));
}

// Homepage hero as a bundle offer: Windows + Office shown together in 3D, the
// real saving against buying them separately (from catalog prices), one CTA.
export default function HeroBillboard({ offer }: { offer: BundleOffer }) {
  const [win, office] = offer.items;
  // Which of the two boxes is in front; they trade places every few seconds.
  const [front, setFront] = useState(1); // start with Office in front
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setFront((f) => 1 - f), 4500);
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

      <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-20 lg:pt-16 lg:pb-24 grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 items-center">
        {/* 3D stage: the two boxes together (first on phones) */}
        <div className="relative order-first lg:order-none h-[330px] sm:h-[420px] lg:h-[500px] flex items-center justify-center lg:col-start-2 lg:row-start-1">
          <div className="absolute bottom-6 sm:bottom-10 h-16 w-[300px] sm:w-[460px] rounded-[50%] bg-gradient-to-b from-white to-[#e3f1ff] shadow-[0_22px_60px_-12px_rgba(0,103,184,0.45)] border border-white" />

          {/* one box in front, the other waiting behind; they trade places in 3D */}
          <div
            className="relative z-10 h-[340px] w-[250px] scale-[0.7] sm:scale-[0.85] lg:scale-100"
            style={{ perspective: 1500 }}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            <div className="absolute inset-0 [transform-style:preserve-3d]">
              {offer.items.map((it, idx) => {
                const isFront = idx === front;
                return (
                  <div
                    key={it.name}
                    className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] transition-transform duration-[1000ms] [transition-timing-function:cubic-bezier(.65,0,.35,1)]"
                    style={{
                      transform: isFront
                        ? "translate3d(0,0,0) rotateY(0deg)"
                        : "translate3d(-150px,-34px,-280px) rotateY(16deg)",
                    }}
                  >
                    <Box3D still={!isFront} front={it.image} title={it.short} accent={it.accent} width={244} height={338} depth={44} />
                  </div>
                );
              })}
            </div>
            {/* the "+" that ties them together */}
            <span className="okh3d-float absolute -left-6 top-[38%] z-30 h-14 w-14 rounded-full bg-white border border-[#d6e9fb] shadow-[0_12px_30px_-8px_rgba(0,103,184,0.55)] flex items-center justify-center text-[#0067b8] text-3xl font-extrabold leading-none [transform:translateZ(200px)]">
              +
            </span>
          </div>

          {/* pick which box is in front */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 rounded-full bg-white/80 backdrop-blur border border-[#d6e9fb] p-1 shadow-sm" role="tablist" aria-label="Bundle items">
            {offer.items.map((it, idx) => (
              <button
                key={it.name}
                type="button"
                role="tab"
                aria-selected={idx === front}
                onClick={() => setFront(idx)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${idx === front ? "bg-[#0067b8] text-white" : "text-[#0b1f3a] hover:bg-[#0067b8]/10"}`}
              >
                {it.short}
              </button>
            ))}
          </div>

          {/* bundle price tag and the real saving */}
          <div className="okh3d-float absolute right-[2%] sm:right-[4%] top-[4%] z-30 rounded-2xl bg-white/95 backdrop-blur border border-[#d6e9fb] px-4 py-3 shadow-[0_15px_40px_-12px_rgba(0,103,184,0.45)]">
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-bold">Bundle price</p>
            <p className="text-2xl font-extrabold text-[#0b1f3a] leading-tight tabular-nums">{offer.price}</p>
            <p className="text-[11px] text-slate-500">
              Separately <span className="line-through">{offer.separately}</span>
            </p>
          </div>
          <span className="absolute left-[4%] sm:left-[8%] top-[8%] z-30 -rotate-6 rounded-xl bg-emerald-600 px-3 py-1.5 text-white text-sm font-extrabold shadow-[0_10px_24px_-8px_rgba(5,150,105,0.7)]">
            Save {offer.save}
          </span>
        </div>

        {/* copy */}
        <div className="text-center lg:text-left lg:col-start-1 lg:row-start-1">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0067b8] text-white text-[11px] font-bold uppercase tracking-[0.14em] shadow-[0_8px_20px_-8px_rgba(0,103,184,0.8)]">
            Bundle offer
          </span>
          <h1 className="mt-5 text-[2.4rem] leading-[1.06] sm:text-[3.4rem] xl:text-[4rem] font-extrabold tracking-[-0.035em] text-[#0b1f3a] [text-wrap:balance]">
            {win.short} + {office.short}
            <span className="block mt-1 text-[#0067b8]">together for {offer.price}.</span>
          </h1>

          {/* what's inside */}
          <ul className="mt-6 space-y-2.5 max-w-md mx-auto lg:mx-0 text-left">
            {offer.items.map((it) => (
              <li key={it.name} className="flex items-start gap-3 rounded-2xl bg-white/75 backdrop-blur border border-white px-4 py-3 shadow-[0_8px_24px_-16px_rgba(0,103,184,0.6)]">
                <span className="mt-0.5 h-7 w-7 shrink-0 rounded-lg flex items-center justify-center text-white" style={{ background: it.accent }}>
                  <LineIcon name={it.name.includes("Windows") ? "windows" : "doc"} className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-bold text-[#0b1f3a]">{it.name}</span>
                    <span className="text-sm text-slate-500 tabular-nums">{it.price}</span>
                  </span>
                  <span className="block text-xs text-slate-500 mt-0.5">{it.perks}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <Link
              href={`/products/${offer.slug}`}
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold shadow-[0_14px_34px_-10px_rgba(16,185,129,0.75)] transition-all hover:-translate-y-0.5"
            >
              Get the bundle · {offer.price}
              <LineIcon name="arrowRight" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#products"
              onClick={openBundleBuilder}
              className="px-6 py-4 rounded-2xl bg-white/80 backdrop-blur border border-[#cfe5fa] hover:border-[#0078d4] text-[#0b1f3a] font-bold shadow-sm transition-colors"
            >
              Build your own bundle
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
