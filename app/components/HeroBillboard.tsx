"use client";

import { useState } from "react";
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

// Homepage hero: the Windows 11 Pro + Office 2024 bundle as one 3D box (Windows on
// the front, Office on the back) that half-turns to show each, with the real
// saving vs buying separately (catalog prices) and one CTA.
export default function HeroBillboard({ offer }: { offer: BundleOffer }) {
  const [win, office] = offer.items;
  const [paused, setPaused] = useState(false);

  return (
    <section className="relative -mb-px overflow-hidden bg-[linear-gradient(180deg,#eef5fd_0%,#f6f9fe_55%,#ffffff_100%)]">
      {/* backdrop: one soft light, a faint Microsoft four-tile motif */}
      <div className="pointer-events-none absolute inset-0">
        <div className="okh3d-drift absolute top-0 right-[-6%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(0,120,212,0.16),transparent)]" />
        <div
          aria-hidden
          className="absolute right-[-5%] top-[10%] hidden md:grid grid-cols-2 gap-5 opacity-[0.06] [transform:perspective(1200px)_rotateY(-24deg)_rotateX(8deg)]"
        >
          <span className="h-44 w-44 lg:h-56 lg:w-56 rounded-[18px] bg-[#f25022]" />
          <span className="h-44 w-44 lg:h-56 lg:w-56 rounded-[18px] bg-[#7fba00]" />
          <span className="h-44 w-44 lg:h-56 lg:w-56 rounded-[18px] bg-[#00a4ef]" />
          <span className="h-44 w-44 lg:h-56 lg:w-56 rounded-[18px] bg-[#ffb900]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-20 lg:pt-20 lg:pb-28 grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 items-center">
        {/* 3D stage (first on phones) */}
        <div className="relative order-first lg:order-none h-[330px] sm:h-[420px] lg:h-[500px] flex items-center justify-center lg:col-start-2 lg:row-start-1">
          <div className="absolute bottom-6 sm:bottom-10 h-14 w-[280px] sm:w-[420px] rounded-[50%] bg-[radial-gradient(closest-side,rgba(0,103,184,0.18),transparent)]" />
          {/* one box: Windows 11 Pro on the front, Office 2024 on the back; it half-turns to show each */}
          <div
            className="relative z-10 scale-[0.74] sm:scale-[0.88] lg:scale-100"
            onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            <Box3D
              flip
              paused={paused}
              front={win.image}
              back={office.image}
              accent={win.accent}
              backAccent={office.accent}
              title={`${win.short} + ${office.short}`}
              width={262}
              height={363}
              depth={48}
            />
          </div>
        </div>

        {/* copy */}
        <div className="text-center lg:text-left lg:col-start-1 lg:row-start-1 max-w-xl mx-auto lg:mx-0">
          <p className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            <span className="grid grid-cols-2 gap-[2px]" aria-hidden>
              <i className="block h-[5px] w-[5px] bg-[#f25022]" />
              <i className="block h-[5px] w-[5px] bg-[#7fba00]" />
              <i className="block h-[5px] w-[5px] bg-[#00a4ef]" />
              <i className="block h-[5px] w-[5px] bg-[#ffb900]" />
            </span>
            Windows + Office bundle
          </p>

          <h1 className="mt-4 text-[2.6rem] leading-[1.03] sm:text-[3.5rem] xl:text-[4.1rem] font-semibold tracking-[-0.03em] text-slate-900 [text-wrap:balance]">
            {win.short}
            <span className="block text-emerald-600">&amp; {office.short}</span>
          </h1>

          <p className="mt-5 text-[1.07rem] leading-relaxed text-slate-600">
            Two licenses for one PC. Pay once, activate on Microsoft&apos;s servers, keep them.
          </p>

          {/* what's inside */}
          <ul className="mt-6 divide-y divide-slate-200/80 border-y border-slate-200/80 text-left">
            {offer.items.map((it) => (
              <li key={it.name} className="flex items-center gap-3 py-3">
                <span className="h-6 w-6 shrink-0 rounded-md flex items-center justify-center text-white" style={{ background: it.accent }}>
                  <LineIcon name={it.name.includes("Windows") ? "windows" : "doc"} className="h-3 w-3" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-medium text-slate-900">{it.name}</span>
                  <span className="block text-[13px] text-slate-500">{it.perks}</span>
                </span>
                <span className="text-[13px] text-slate-400 tabular-nums">{it.price}</span>
              </li>
            ))}
          </ul>

          {/* price */}
          <div className="mt-7 flex items-end justify-center lg:justify-start gap-4">
            <span className="text-[3rem] leading-none font-semibold tracking-[-0.03em] text-slate-900 tabular-nums">{offer.price}</span>
            <span className="pb-0.5 text-left text-[13px] leading-snug text-slate-500">
              One-time payment
              <span className="block whitespace-nowrap">
                Separately <span className="line-through">{offer.separately}</span>
              </span>
              <span className="block whitespace-nowrap font-semibold text-emerald-700">You save {offer.save}</span>
            </span>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row items-center gap-x-6 gap-y-4 justify-center lg:justify-start">
            <Link
              href={`/products/${offer.slug}`}
              className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-emerald-600 px-8 py-4 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(5,150,105,0.8)] transition-colors hover:bg-emerald-700"
            >
              Get the bundle
              <LineIcon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#products"
              onClick={openBundleBuilder}
              className="whitespace-nowrap text-[15px] font-medium text-slate-700 underline decoration-slate-300 underline-offset-[6px] hover:text-slate-900 hover:decoration-slate-500"
            >
              Or build your own bundle
            </Link>
          </div>

          {/* trust */}
          <ul className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[13px] text-slate-600">
            {(
              [
                ["bolt", "Emailed after payment"],
                ["shieldCheck", "Activates on Microsoft"],
                ["refund", "30-day money-back"],
              ] as const
            ).map(([ic, t]) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <LineIcon name={ic} className="h-4 w-4 text-[#0067b8]" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] text-slate-500">
            New customer?{" "}
            <Link href="/login" className="font-medium text-[#0067b8] hover:underline underline-offset-4">
              Get {PROMO_PERCENT}% off your first order
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
