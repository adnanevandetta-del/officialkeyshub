import Link from "next/link";
import { getProductByName } from "../lib/blogAds";
import { getProductBoxImage } from "../lib/productImage";
import Box3D from "./Box3D";

// Homepage hero: light-blue stage with a 3D Office 2024 box (Windows 11 behind),
// floating price/trust chips, and the site's single H1. Animations live in
// globals.css (.okh3d-float / .okh3d-drift) and stop for reduced-motion users.
export default function Hero3D() {
  const hero = getProductByName("Office 2024 Professional Plus");
  const win = getProductByName("Windows 11 Pro");
  if (!hero || !win) return null;
  return (
    <section className="relative -mb-px bg-gradient-to-b from-sky-100 via-sky-50 to-white">
      {/* soft light, orbs, fine grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="okh3d-drift absolute -top-32 left-[12%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.35),transparent)]" />
        <div className="okh3d-drift absolute top-24 right-[-8%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(2,132,199,0.22),transparent)] [animation-delay:-6s]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.10),transparent)]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(2,132,199,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(2,132,199,.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
      <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
        {/* 3D stage: first on phones so the box is seen right away */}
        <div className="relative order-first lg:order-none h-[320px] sm:h-[400px] lg:h-[500px] flex items-center justify-center lg:col-start-2 lg:row-start-1">
          {/* glowing pedestal */}
          <div className="absolute bottom-4 sm:bottom-8 h-16 w-[260px] sm:w-[380px] rounded-[50%] bg-gradient-to-b from-white to-sky-100 shadow-[0_20px_60px_-10px_rgba(2,132,199,0.45)] border border-white" />
          <div className="absolute left-[4%] sm:left-[10%] top-[16%] scale-[0.42] sm:scale-[0.58] origin-top-left opacity-90">
            <Box3D front={getProductBoxImage(win.name)} title={win.name} accent="#0369a1" />
          </div>
          <div className="relative z-10 scale-[0.72] sm:scale-90 lg:scale-100">
            <Box3D front={getProductBoxImage(hero.name)} title="Office 2024 Pro Plus" accent="#ea580c" />
          </div>

          {/* floating chips */}
          <div className="okh3d-float absolute right-[2%] sm:right-[6%] top-[8%] z-20 rounded-2xl bg-white/90 backdrop-blur border border-sky-100 px-4 py-3 shadow-[0_15px_40px_-12px_rgba(2,132,199,0.45)]">
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-bold">You pay</p>
            <p className="text-2xl font-black text-slate-900 leading-tight">{hero.price}</p>
            <p className="text-xs text-slate-400 line-through">{hero.originalPrice}</p>
          </div>
          <div className="okh3d-float-slow absolute left-[0%] sm:left-[2%] bottom-[18%] z-20 hidden sm:flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-sky-100 pl-2 pr-4 py-2 shadow-[0_15px_40px_-12px_rgba(2,132,199,0.4)]">
            <span className="h-7 w-7 rounded-full bg-emerald-500/15 flex items-center justify-center"><i className="fas fa-envelope text-emerald-600 text-xs" /></span>
            <span className="text-sm font-bold text-slate-800">Emailed after payment</span>
          </div>
          <div className="okh3d-float absolute right-[0%] bottom-[26%] z-20 hidden sm:flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-sky-100 pl-2 pr-4 py-2 shadow-[0_15px_40px_-12px_rgba(2,132,199,0.4)] [animation-delay:-3s]">
            <span className="h-7 w-7 rounded-full bg-sky-500/15 flex items-center justify-center"><i className="fab fa-windows text-sky-700 text-xs" /></span>
            <span className="text-sm font-bold text-slate-800">Activates on Microsoft</span>
          </div>
        </div>

        {/* copy */}
        <div className="text-center lg:text-left lg:col-start-1 lg:row-start-1">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> New · Office 2024, supported to 2029
          </span>
          <h1 className="mt-6 text-[2.6rem] leading-[1.04] sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900">
            Genuine Microsoft keys.
            <span className="block bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent pb-2">
              Activated in minutes.
            </span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
            Windows and Office licenses that activate on Microsoft&apos;s own servers. Emailed after payment, backed
            by a 30-day money-back guarantee.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <Link
              href={`/products/${hero.slug}`}
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black shadow-[0_14px_34px_-10px_rgba(16,185,129,0.75)] transition-all hover:-translate-y-0.5"
            >
              Get Office 2024 · {hero.price}
              <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products"
              className="px-6 py-4 rounded-2xl bg-white/80 backdrop-blur border border-sky-200 hover:border-sky-500 text-slate-900 font-bold shadow-sm transition-colors"
            >
              Browse all keys
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-3 max-w-lg mx-auto lg:mx-0 gap-2">
            {[
              ["fas fa-bolt", "Email delivery"],
              ["fas fa-shield-halved", "Activates on Microsoft"],
              ["fas fa-rotate-left", "30-day refund"],
            ].map(([i, t]) => (
              <div key={t} className="rounded-2xl bg-white/70 backdrop-blur border border-white shadow-[0_8px_24px_-14px_rgba(2,132,199,0.5)] py-3 px-2 text-center">
                <i className={`${i} text-sky-600`} />
                <p className="mt-1 text-xs text-slate-700 font-semibold leading-tight">{t}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-slate-500 font-medium">
            <i className="fab fa-paypal mr-1 text-[#009CDE]" /> PayPal · Cards via PayPal · USDT
          </p>
        </div>
      </div>
    </section>
  );
}
