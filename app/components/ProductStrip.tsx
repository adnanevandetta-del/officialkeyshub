import Link from "next/link";
import Image from "next/image";
import { allProducts } from "../lib/catalog";
import { getProductBoxImage } from "../lib/productImage";

// Slim band of product thumbnails that sits directly under the fixed navbar on
// content pages, so the space below the logo isn't an empty white strip.
// Products are looked up in the catalog by name, so prices are always live.
export default function ProductStrip({ names, label }: { names: string[]; label: string }) {
  const items = names
    .map((n) => allProducts.find((p) => p.name === n))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  if (!items.length) return null;

  return (
    <div className="bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <p className="hidden md:block flex-shrink-0 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group flex flex-shrink-0 items-center gap-2.5 rounded-xl bg-white border border-slate-200 pl-1.5 pr-3 py-1.5 hover:border-blue-500 transition"
            >
              <Image
                src={getProductBoxImage(p.name)}
                alt=""
                width={30}
                height={42}
                unoptimized
                className="h-[42px] w-auto"
              />
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold text-slate-800 group-hover:text-blue-700 whitespace-nowrap">{p.name}</span>
                <span className="block text-xs font-bold text-slate-900">{p.price}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
