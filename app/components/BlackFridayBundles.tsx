"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductByName } from "../lib/blogAds";
import { getProductBoxImage } from "../lib/productImage";
import { BF_CODE, BF_PERCENT, bfPrice, blackFridayActive } from "../lib/promo";
import { toNumber } from "../lib/upsell";

// The three Windows + Office bundles with their honest "bought separately"
// price (the two keys at our own prices). Shown only while the sale is on
// (BF_ON in app/lib/promo.ts).
const BUNDLES: { name: string; parts: [string, string]; title: string; tag?: string }[] = [
  {
    name: "Windows 11 Pro + Office 2021 Pro Plus Bundle",
    parts: ["Windows 11 Pro", "Office 2021 Professional Plus"],
    title: "Windows 11 Pro + Office 2021",
    tag: "Most popular",
  },
  {
    name: "Windows 11 Pro + Office 2024 Pro Plus Bundle",
    parts: ["Windows 11 Pro", "Office 2024 Professional Plus"],
    title: "Windows 11 Pro + Office 2024",
    tag: "Newest Office",
  },
  {
    name: "Windows 10 Pro + Office 2021 Pro Plus Bundle",
    parts: ["Windows 10 Pro", "Office 2021 Professional Plus"],
    title: "Windows 10 Pro + Office 2021",
  },
];

const money = (n: number) => `$${n.toFixed(2)}`;

export default function BlackFridayBundles({ heading = true }: { heading?: boolean }) {
  const [active, setActive] = useState(true);
  useEffect(() => setActive(blackFridayActive()), []);
  if (!active) return null;

  const rows = BUNDLES.map((b) => {
    const p = getProductByName(b.name);
    const a = getProductByName(b.parts[0]);
    const c = getProductByName(b.parts[1]);
    if (!p || !a || !c) return null;
    // Both sides at sale prices, so the saving is what the bundle really adds.
    const separately = toNumber(bfPrice(a.price)) + toNumber(bfPrice(c.price));
    const sale = toNumber(bfPrice(p.price));
    return { ...b, p, separately, sale, save: separately - sale };
  }).filter((r): r is NonNullable<typeof r> => r !== null);

  return (
    <section className="relative overflow-hidden bg-[#07090f] text-white border-y border-[#f2c94c]/25">
      <div
        className="absolute inset-0 [background:radial-gradient(50%_70%_at_90%_10%,rgba(242,201,76,0.16),transparent_60%),radial-gradient(45%_60%_at_0%_100%,rgba(2,132,199,0.25),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
        {heading && (
          <div className="text-center mb-6 md:mb-10">
            <p className="bf-gold inline-block text-xs font-extrabold uppercase tracking-[0.24em]">Black Friday bundles</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-[-0.025em]">
              Windows + Office together, <span className="bf-gold">the best value</span>
            </h2>
            <p className="mt-3 text-white/70 max-w-2xl mx-auto">
              Both keys for one PC, emailed after payment. Cheaper than buying them one by one, and {BF_CODE} takes another {BF_PERCENT}% off.
            </p>
            <Link href="/black-friday" className="mt-3 inline-block text-sm font-bold text-sky-500 hover:text-sky-400 hover:underline">
              See all Black Friday &amp; Cyber Monday deals →
            </Link>
          </div>
        )}
        {/* Phones: swipeable row (next card peeks in). md+: three columns. */}
        <div className="-mx-4 px-4 py-3 flex gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:py-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {rows.map((r) => (
            <div
              key={r.name}
              className={`w-[84%] flex-shrink-0 snap-center md:w-auto rounded-3xl bg-white text-[#0b1f3a] p-5 md:p-6 flex flex-col ${
                r.tag === "Most popular"
                  ? "ring-2 ring-[#f2c94c]/80 shadow-[0_30px_70px_-25px_rgba(242,201,76,0.5)]"
                  : "ring-1 ring-white/10"
              }`}
            >
              <div className="flex items-center justify-between min-h-[1.5rem]">
                {r.tag ? (
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8a6400]">{r.tag}</span>
                ) : (
                  <span />
                )}
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5">
                  Save {money(r.save)}
                </span>
              </div>
              <Link
                href={`/products/${r.p.slug}`}
                className="mt-3 h-40 rounded-2xl bg-gradient-to-b from-[#f2f8ff] to-[#e3f1ff] flex items-center justify-center"
                aria-label={r.name}
              >
                <Image
                  src={getProductBoxImage(r.name)}
                  alt={`${r.name} box`}
                  width={564}
                  height={780}
                  unoptimized
                  className="h-32 w-auto drop-shadow-[0_14px_18px_rgba(2,40,80,0.25)]"
                />
              </Link>
              <p className="mt-4 font-extrabold text-lg leading-snug">{r.title}</p>
              <p className="text-xs text-slate-500 mt-1">One PC · lifetime license · both keys emailed</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tabular-nums">{money(r.sale)}</span>
                <span className="text-sm text-slate-400 line-through tabular-nums">{r.p.price}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                with {BF_CODE} · {money(r.separately)} if bought separately
              </p>
              <Link
                href={`/products/${r.p.slug}`}
                className="mt-5 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold transition-colors"
              >
                Buy now <i className="fas fa-arrow-right text-sm" aria-hidden="true"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
