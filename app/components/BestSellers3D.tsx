import Image from "next/image";
import Link from "next/link";
import { getProductByName, savingsPercent } from "../lib/blogAds";
import { getProductBoxImage } from "../lib/productImage";
import TiltCard from "./TiltCard";

const BEST = [
  "Windows 11 Pro",
  "Office 2024 Professional Plus",
  "Windows 11 Pro + Office 2024 Pro Plus Bundle",
  "Windows 11 Home",
];

// Homepage best sellers: white cards that tilt in 3D toward the pointer.
export default function BestSellers3D() {
  const cards = BEST.map((n) => getProductByName(n)).filter(Boolean) as NonNullable<ReturnType<typeof getProductByName>>[];
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-sky-700 text-xs font-bold uppercase tracking-[0.14em]">Best sellers</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-1">The keys people buy most</h2>
        </div>
        <Link href="/products" className="hidden sm:inline text-sky-700 font-bold hover:text-sky-800">See all →</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((p) => (
          <TiltCard key={p.slug} className="rounded-3xl">
            <div className="h-full rounded-3xl bg-white border border-sky-100 shadow-[0_18px_40px_-22px_rgba(2,132,199,0.55)] p-5 flex flex-col">
              <div className="relative h-48 rounded-2xl bg-gradient-to-b from-sky-50 to-sky-100/60 flex items-center justify-center overflow-hidden">
                <div className="absolute bottom-3 h-5 w-28 rounded-[50%] bg-sky-900/15 blur-md" />
                <Image src={getProductBoxImage(p.name)} alt={`${p.name} box`} width={564} height={780} unoptimized className="relative h-40 w-auto drop-shadow-[0_14px_18px_rgba(2,40,80,0.25)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2" />
              </div>
              <p className="mt-4 font-bold text-slate-900 leading-snug min-h-[3rem]">{p.name}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">{p.price}</span>
                <span className="text-sm text-slate-400 line-through">{p.originalPrice}</span>
                {savingsPercent(p) > 0 && (
                  <span className="ml-auto px-2 py-0.5 rounded-md bg-yellow-400 text-gray-900 text-xs font-black">-{savingsPercent(p)}%</span>
                )}
              </div>
              <Link
                href={`/products/${p.slug}`}
                className="mt-4 text-center py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black transition-colors"
              >
                Buy now
              </Link>
            </div>
          </TiltCard>
        ))}
      </div>
      </div>
    </section>
  );
}
