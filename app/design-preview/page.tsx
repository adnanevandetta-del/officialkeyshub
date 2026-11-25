import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { getProductByName, savingsPercent } from "../lib/blogAds";
import { getProductBoxImage } from "../lib/productImage";
import Box3D from "./Box3D";
import TiltCard from "./TiltCard";

// Design preview only (branch design/3d-preview). Not linked, not indexed.
export const metadata: Metadata = { title: "Design preview", robots: { index: false, follow: false } };

const BEST = [
  "Windows 11 Pro",
  "Office 2024 Professional Plus",
  "Windows 11 Pro + Office 2024 Pro Plus Bundle",
  "Windows 11 Home",
];

export default function DesignPreview() {
  const hero = getProductByName("Office 2024 Professional Plus")!;
  const win = getProductByName("Windows 11 Pro")!;
  const cards = BEST.map((n) => getProductByName(n)).filter(Boolean) as NonNullable<ReturnType<typeof getProductByName>>[];

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-[#05060b] text-[#e7ecf5] overflow-hidden">
        {/* HERO */}
        <section className="relative">
          {/* aurora + grid */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(2,132,199,0.35),transparent)]" />
            <div className="absolute top-40 -right-40 h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.14),transparent)]" />
            <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-24 lg:pt-24 grid lg:grid-cols-2 gap-14 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-600/15 border border-sky-600/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> New · Office 2024, supported to 2029
              </span>
              <h1 className="mt-6 text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.02] tracking-tight text-white">
                Genuine Microsoft keys.
                <span className="block bg-gradient-to-r from-sky-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                  Activated in minutes.
                </span>
              </h1>
              <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto lg:mx-0">
                Windows and Office licenses that activate on Microsoft&apos;s own servers. Emailed after payment, backed
                by a 30-day money-back guarantee.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link
                  href={`/products/${hero.slug}`}
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black shadow-[0_10px_40px_-10px_rgba(16,185,129,0.7)] transition-all hover:-translate-y-0.5"
                >
                  Get Office 2024 · {hero.price} <i className="fas fa-arrow-right" />
                </Link>
                <Link href="/products" className="px-6 py-4 rounded-xl border border-white/15 hover:border-sky-500/60 text-white font-bold transition-colors">
                  Browse all keys
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 max-w-md mx-auto lg:mx-0 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur">
                {[
                  ["fas fa-bolt", "Email delivery"],
                  ["fas fa-shield-halved", "Activates on Microsoft"],
                  ["fas fa-rotate-left", "30-day refund"],
                ].map(([i, t]) => (
                  <div key={t} className="py-4 px-2 text-center">
                    <i className={`${i} text-sky-400`} />
                    <p className="mt-1 text-xs text-slate-300 font-semibold">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D stage */}
            <div className="relative h-[460px] flex items-center justify-center">
              <div className="absolute bottom-6 h-24 w-[420px] rounded-[50%] bg-[radial-gradient(closest-side,rgba(2,132,199,0.45),transparent)]" />
              <div className="absolute left-[8%] top-[18%] scale-[0.62] opacity-80 blur-[0.5px]">
                <Box3D front={getProductBoxImage(win.name)} title={win.name} accent="#0369a1" />
              </div>
              <div className="relative z-10">
                <Box3D front={getProductBoxImage(hero.name)} title="Office 2024 Pro Plus" accent="#c2410c" />
              </div>
              <div className="absolute right-[4%] top-[12%] z-20 rounded-2xl border border-white/10 bg-[#0a0e1a]/80 backdrop-blur px-4 py-3 shadow-2xl">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">You pay</p>
                <p className="text-2xl font-black text-white">{hero.price}</p>
                <p className="text-xs text-white/40 line-through">{hero.originalPrice}</p>
              </div>
            </div>
          </div>
        </section>

        {/* BEST SELLERS */}
        <section className="relative max-w-7xl mx-auto px-4 pb-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sky-400 text-xs font-bold uppercase tracking-wider">Best sellers</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">The keys people buy most</h2>
            </div>
            <Link href="/products" className="hidden sm:inline text-sky-400 font-bold hover:text-sky-300">See all →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((p) => (
              <TiltCard key={p.slug} className="rounded-2xl">
                <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 flex flex-col">
                  <div className="relative h-44 flex items-center justify-center [transform:translateZ(40px)]">
                    <div className="absolute bottom-0 h-6 w-28 rounded-[50%] bg-sky-500/25 blur-xl" />
                    <Image src={getProductBoxImage(p.name)} alt={`${p.name} box`} width={564} height={780} unoptimized className="h-40 w-auto drop-shadow-2xl" />
                  </div>
                  <p className="mt-4 font-bold text-white leading-snug min-h-[3rem]">{p.name}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">{p.price}</span>
                    <span className="text-sm text-white/40 line-through">{p.originalPrice}</span>
                    {savingsPercent(p) > 0 && (
                      <span className="ml-auto px-2 py-0.5 rounded-md bg-yellow-400 text-gray-900 text-xs font-black">-{savingsPercent(p)}%</span>
                    )}
                  </div>
                  <Link
                    href={`/products/${p.slug}`}
                    className="mt-4 text-center py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black transition-colors"
                  >
                    Buy now
                  </Link>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
