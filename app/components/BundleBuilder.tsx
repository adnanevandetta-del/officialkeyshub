"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "./CartContext";
import { catalog, slugify } from "../lib/catalog";
import type { CatalogCategory, CatalogProduct } from "../lib/catalog";
import { getProductImage, getProductBoxImage } from "../lib/productImage";

// Build-your-own bundle: pick 2–3 products, $5 off each product picked.
const DISCOUNT_PER_ITEM = 5;
const MAX_ITEMS = 3;
const MIN_ITEMS = 2;

type PickableCategory = Exclude<CatalogCategory, "bundles">;

const CATEGORY_LABELS: { id: PickableCategory; label: string }[] = [
  { id: "windows", label: "Windows" },
  { id: "office", label: "Office" },
  { id: "server", label: "Server" },
  { id: "visio", label: "Visio" },
  { id: "project", label: "Project" },
  { id: "sql", label: "SQL Server" },
  { id: "visualstudio", label: "Visual Studio" },
  { id: "antivirus", label: "Security" },
];

const toNumber = (price: string) => parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
const money = (n: number) => `$${n.toFixed(2)}`;

interface Props {
  onBuyNow: (product: CatalogProduct) => void;
  onAdded: () => void;
}

export default function BundleBuilder({ onBuyNow, onAdded }: Props) {
  const { addToCart } = useCart();
  const [category, setCategory] = useState<PickableCategory>("windows");
  const [selected, setSelected] = useState<string[]>([]);

  // name -> product, across every non-bundle category
  const byName = useMemo(() => {
    const map = new Map<string, CatalogProduct>();
    CATEGORY_LABELS.forEach(({ id }) => catalog[id].forEach((p) => map.set(p.name, p)));
    return map;
  }, []);

  const items = selected.map((n) => byName.get(n)).filter(Boolean) as CatalogProduct[];
  const count = items.length;
  const isFull = count >= MAX_ITEMS;
  const qualifies = count >= MIN_ITEMS;

  const subtotal = items.reduce((sum, p) => sum + toNumber(p.price), 0);
  const discount = qualifies ? count * DISCOUNT_PER_ITEM : 0;
  const total = Math.max(0, subtotal - discount);

  const toggle = (name: string) => {
    setSelected((prev) => {
      if (prev.includes(name)) return prev.filter((n) => n !== name);
      if (prev.length >= MAX_ITEMS) return prev;
      return [...prev, name];
    });
  };

  const bundleName = `Custom Bundle: ${items.map((p) => p.name).join(" + ")}`;

  const handleAdd = () => {
    if (!qualifies) return;
    addToCart({
      id: `custom-bundle-${items.map((p) => slugify(p.name)).join("+")}`,
      name: bundleName,
      price: money(total),
      originalPrice: money(subtotal),
      image: getProductImage("Custom Bundle"),
    });
    onAdded();
  };

  const handleBuyNow = () => {
    if (!qualifies) return;
    onBuyNow({
      name: bundleName,
      description: `Your custom bundle of ${count} genuine licenses — ${money(DISCOUNT_PER_ITEM)} off each product`,
      price: money(total),
      originalPrice: money(subtotal),
      features: [
        ...items.map((p) => `${p.name} — ${p.price}`),
        `Bundle savings: ${money(discount)}`,
        "Instant Delivery",
      ],
      popular: false,
      image: "",
      badge: "Custom Bundle",
    });
  };

  const list = catalog[category];

  return (
    <div className="max-w-7xl mx-auto mb-8 md:mb-10">
      <div className="glass rounded-2xl ring-1 ring-emerald-500/40 overflow-hidden">
        {/* Header */}
        <div className="px-4 md:px-6 py-4 md:py-5 bg-gradient-to-r from-emerald-700/40 via-emerald-600/20 to-transparent border-b border-white/10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-xs font-bold text-emerald-300">
              <i className="fas fa-wand-magic-sparkles"></i> BUILD YOUR OWN
            </span>
            <span className="inline-flex items-center rounded-full bg-orange-500/15 border border-orange-400/40 px-3 py-1 text-xs font-bold text-orange-300">
              Save {money(DISCOUNT_PER_ITEM)} on every product
            </span>
          </div>
          <h2 className="mt-2 text-xl md:text-2xl font-black text-white">Create Your Own Bundle</h2>
          <p className="text-sm text-slate-300 mt-1">
            Pick {MIN_ITEMS} to {MAX_ITEMS} products from any category. You get {money(DISCOUNT_PER_ITEM)} off for each product you add
            {" "}— up to {money(DISCOUNT_PER_ITEM * MAX_ITEMS)} off in total.
          </p>
        </div>

        <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          {/* Picker */}
          <div className="lg:col-span-2 min-w-0">
            {/* Category chips */}
            <div className="flex gap-2 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-2 mb-3 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap">
              {CATEGORY_LABELS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`flex-shrink-0 snap-start whitespace-nowrap min-h-[40px] px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    category === c.id ? "btn-primary" : "glass text-slate-300 hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-2 text-xs text-slate-400">
              <span>
                {list.length} products · tap to add
              </span>
              <span className={isFull ? "text-emerald-300 font-semibold" : ""}>
                {count}/{MAX_ITEMS} selected{isFull ? " — max reached" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[26rem] overflow-y-auto pr-1">
              {list.map((p) => {
                const isSel = selected.includes(p.name);
                const disabled = !isSel && isFull;
                return (
                  <button
                    key={p.name}
                    type="button"
                    aria-pressed={isSel}
                    disabled={disabled}
                    onClick={() => toggle(p.name)}
                    className={`text-left flex items-center gap-3 rounded-xl p-2.5 min-h-[64px] border transition-all ${
                      isSel
                        ? "border-emerald-400 bg-emerald-500/10"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                    } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    <div className="relative w-10 h-14 flex-shrink-0">
                      <Image src={getProductBoxImage(p.name)} alt="" fill unoptimized className="object-contain" sizes="40px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white line-clamp-2 leading-snug">{p.name}</p>
                      <p className="text-sm text-slate-300 mt-0.5">
                        <span className="font-bold text-white">{p.price}</span>
                        {isSel && qualifies ? (
                          <span className="ml-2 text-emerald-300 font-semibold">
                            → {money(Math.max(0, toNumber(p.price) - DISCOUNT_PER_ITEM))}
                          </span>
                        ) : null}
                      </p>
                    </div>
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs ${
                        isSel ? "bg-emerald-500 border-emerald-400 text-white" : "border-white/30 text-transparent"
                      }`}
                    >
                      <i className="fas fa-check"></i>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-slate-950/50 border border-white/10 p-4 lg:sticky lg:top-24">
              <h3 className="text-lg font-bold text-white mb-3">Your Bundle</h3>

              <div className="space-y-2 mb-4">
                {Array.from({ length: MAX_ITEMS }).map((_, i) => {
                  const p = items[i];
                  return p ? (
                    <div key={p.name} className="flex items-center gap-2 rounded-lg bg-white/[0.05] border border-emerald-400/30 p-2">
                      <div className="relative w-8 h-11 flex-shrink-0">
                        <Image src={getProductBoxImage(p.name)} alt="" fill unoptimized className="object-contain" sizes="32px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-white line-clamp-2 leading-snug">{p.name}</p>
                        <p className="text-xs text-slate-400">
                          <span className={qualifies ? "line-through mr-1" : ""}>{p.price}</span>
                          {qualifies ? (
                            <span className="text-emerald-300 font-semibold">
                              {money(Math.max(0, toNumber(p.price) - DISCOUNT_PER_ITEM))}
                            </span>
                          ) : null}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggle(p.name)}
                        aria-label={`Remove ${p.name}`}
                        className="flex-shrink-0 w-9 h-9 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ) : (
                    <div
                      key={`empty-${i}`}
                      className="flex items-center justify-center h-[60px] rounded-lg border border-dashed border-white/20 text-xs text-slate-500"
                    >
                      Product {i + 1}{i < MIN_ITEMS ? "" : " (optional)"}
                    </div>
                  );
                })}
              </div>

              <div className="space-y-1.5 text-sm border-t border-white/10 pt-3">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span>{money(subtotal)}</span>
                </div>
                <div className={`flex justify-between ${qualifies ? "text-emerald-300 font-semibold" : "text-slate-500"}`}>
                  <span>
                    Bundle discount{qualifies ? ` (${count} × ${money(DISCOUNT_PER_ITEM)})` : ""}
                  </span>
                  <span>-{money(discount)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-2xl font-black text-white">{money(total)}</span>
                </div>
              </div>

              {!qualifies ? (
                <p className="mt-3 text-xs text-orange-300">
                  {count === 0
                    ? `Choose at least ${MIN_ITEMS} products to unlock your ${money(DISCOUNT_PER_ITEM)}-per-product discount.`
                    : `Add ${MIN_ITEMS - count} more product to unlock your discount.`}
                </p>
              ) : (
                <p className="mt-3 text-xs text-emerald-300">
                  You&apos;re saving {money(discount)} on this bundle{count < MAX_ITEMS ? ` — add one more to save ${money(DISCOUNT_PER_ITEM)} extra` : ""}.
                </p>
              )}

              <div className="space-y-2 mt-4">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={!qualifies}
                  className="w-full min-h-[48px] py-3 rounded-lg font-bold inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Buy Bundle Now <i className="fab fa-paypal text-2xl"></i>
                </button>
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!qualifies}
                  className="w-full min-h-[44px] py-2.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <i className="fas fa-cart-plus"></i> Add Bundle to Cart
                </button>
                {count > 0 ? (
                  <button
                    type="button"
                    onClick={() => setSelected([])}
                    className="w-full min-h-[40px] text-xs text-slate-400 hover:text-white"
                  >
                    Clear selection
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
