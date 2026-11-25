import Image from "next/image";
import Link from "next/link";
import { getProductByName } from "../lib/blogAds";
import { getProductBoxImage } from "../lib/productImage";
import LineIcon from "./LineIcon";
import TiltCard from "./TiltCard";

const BEST = [
  "Windows 11 Pro",
  "Office 2024 Professional Plus",
  "Windows 11 Pro + Office 2024 Pro Plus Bundle",
  "Windows 11 Home",
];

// Homepage best sellers: white cards that tilt in 3D toward the pointer.
// Prices are shown plainly with the retail price as a reference, no "-92%" badges.
export default function BestSellers3D() {
  const cards = BEST.map((n) => getProductByName(n)).filter(Boolean) as NonNullable<ReturnType<typeof getProductByName>>[];
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[#0067b8] text-xs font-bold uppercase tracking-[0.14em]">Best sellers</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.025em] text-[#0b1f3a] mt-1">The keys people buy most</h2>
          </div>
          <Link href="/products" className="hidden sm:inline-flex items-center gap-1.5 text-[#0067b8] font-bold hover:text-[#004e8c]">
            See all <LineIcon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((p) => (
            <TiltCard key={p.slug} className="rounded-3xl">
              <div className="h-full rounded-3xl bg-white border border-[#dcecfb] shadow-[0_18px_40px_-22px_rgba(0,103,184,0.5)] p-5 flex flex-col">
                <Link href={`/products/${p.slug}`} className="relative h-48 rounded-2xl bg-gradient-to-b from-[#f2f8ff] to-[#e3f1ff] flex items-center justify-center overflow-hidden" aria-label={p.name}>
                  <div className="absolute bottom-3 h-5 w-28 rounded-[50%] bg-[#0b1f3a]/15 blur-md" />
                  <Image src={getProductBoxImage(p.name)} alt={`${p.name} box`} width={564} height={780} unoptimized className="relative h-40 w-auto drop-shadow-[0_14px_18px_rgba(2,40,80,0.25)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2" />
                </Link>
                <p className="mt-4 font-bold text-[#0b1f3a] leading-snug min-h-[3rem]">{p.name}</p>
                <p className="text-xs text-slate-500 mt-1">{p.features.slice(0, 2).join(" · ")}</p>
                <div className="mt-auto pt-3 flex items-baseline justify-between gap-2">
                  <span className="text-2xl font-extrabold text-[#0b1f3a] tabular-nums">{p.price}</span>
                  <span className="text-xs text-slate-500">Retail {p.originalPrice}</span>
                </div>
                <Link
                  href={`/products/${p.slug}`}
                  className="mt-4 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold transition-colors"
                >
                  Buy now <LineIcon name="arrowRight" className="h-4 w-4" />
                </Link>
                <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                  <LineIcon name="mail" className="h-3.5 w-3.5" /> Emailed after payment
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
