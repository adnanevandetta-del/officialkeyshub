"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from './CartContext';
import { getProductImage, getProductBoxImage } from '../lib/productImage';
import Link from 'next/link';
import { catalog, slugify } from '../lib/catalog';
import { paypalPaymentUrl } from '../lib/payment';
import BundleBuilder from './BundleBuilder';
import { recordQuickOrder, priceToNumber } from '../lib/account';
import UsdtPay from './UsdtPay';

type CategoryId = "all" | "bundles" | "windows" | "office" | "server" | "visio" | "project" | "sql" | "visualstudio" | "antivirus";

interface Product {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  features: string[];
  popular: boolean;
  image: string;
  badge?: string;
  outOfStock?: boolean;
}

// "$47" -> "$47.00", so every card shows prices the same way.
const money = (p: string) => {
  const n = parseFloat(p.replace(/[^0-9.]/g, ""));
  return isFinite(n) ? "$" + n.toFixed(2) : p;
};

export default function Products() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("windows");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [usdtOrderId, setUsdtOrderId] = useState<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Close the USDT instructions whenever the payment window changes.
  useEffect(() => {
    setUsdtOrderId(null);
  }, [selectedProduct, showModal]);

  // Category row (phones): every so often nudge the row sideways so visitors can
  // see there are more categories to swipe to. Stops as soon as they touch it.
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let stopped = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const stop = () => { stopped = true; el.style.scrollSnapType = ''; };
    ['pointerdown', 'touchstart', 'wheel'].forEach((ev) => el.addEventListener(ev, stop, { passive: true }));
    const nudge = () => {
      if (stopped || el.scrollWidth <= el.clientWidth + 8 || el.scrollLeft > 20) return;
      el.style.scrollSnapType = 'none'; // snapping would pull the row straight back
      el.scrollTo({ left: 120, behavior: 'smooth' });
      timers.push(setTimeout(() => { if (!stopped) el.scrollTo({ left: 0, behavior: 'smooth' }); }, 1100));
      timers.push(setTimeout(() => { if (!stopped) el.style.scrollSnapType = ''; }, 2300));
    };
    const interval = setInterval(nudge, 6000);
    timers.push(setTimeout(nudge, 1500));
    return () => {
      ['pointerdown', 'touchstart', 'wheel'].forEach((ev) => el.removeEventListener(ev, stop));
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Check if URL has #products-all to show all products
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for URL hash
      if (window.location.hash === '#products-all') {
        setActiveCategory("all");
      }
      
      // Check for selected category from navbar dropdown or CategoryBar
      const savedCategory = sessionStorage.getItem('selectedCategory');
      if (savedCategory) {
        setActiveCategory(savedCategory as CategoryId);
      }

      // Listen for category changes from CategoryBar
      const handleCategoryChange = (event: CustomEvent) => {
        const category = event.detail.category;
        setActiveCategory(category as CategoryId);
      };

      window.addEventListener('categoryChanged', handleCategoryChange as EventListener);
      
      return () => {
        window.removeEventListener('categoryChanged', handleCategoryChange as EventListener);
      };
    }
  }, []);

  const categories: { id: CategoryId; name: string; icon: string; color: string }[] = [
    { id: "windows", name: "Windows", icon: "fab fa-windows", color: "#0284c7" },
    { id: "office", name: "Office", icon: "fas fa-file-word", color: "#ea580c" },
    { id: "server", name: "Server", icon: "fas fa-server", color: "#475569" },
    { id: "visio", name: "Visio", icon: "fas fa-project-diagram", color: "#0d9488" },
    { id: "project", name: "Project", icon: "fas fa-tasks", color: "#4f46e5" },
    { id: "sql", name: "SQL Server", icon: "fas fa-database", color: "#1d4ed8" },
    { id: "visualstudio", name: "Visual Studio", icon: "fas fa-code", color: "#7c3aed" },
    { id: "antivirus", name: "Security", icon: "fas fa-shield-alt", color: "#dc2626" },
  ];

  // Show products in a fresh random order on every visit. We start from the
  // catalog order (so server and first client render match — no hydration
  // mismatch) and shuffle once after mount.
  const [products, setProducts] = useState(catalog);
  useEffect(() => {
    const shuffle = <T,>(arr: T[]): T[] => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };
    // Legacy versions (Windows 7/8.1, 2010–2016 editions) always go last, so a
    // category never opens on an out-of-support product.
    const legacy = (name: string) => /Windows (7|8\.1)\b|\b201[0-6]\b/.test(name);
    const next = {} as typeof catalog;
    (Object.keys(catalog) as (keyof typeof catalog)[]).forEach((k) => {
      const mixed = shuffle(catalog[k]);
      // Popular picks first, then the rest shuffled, then legacy versions.
      const rank = (p: (typeof mixed)[number]) => (p.popular ? 0 : legacy(p.name) ? 2 : 1);
      next[k] = [...mixed].sort((a, b) => rank(a) - rank(b));
    });
    setProducts(next);
  }, []);

  return (
    <section className="pt-14 pb-20 relative overflow-hidden bg-white" id="products">
      <div className="container mx-auto px-4 md:px-6">
        {/* Category Tabs — a normal swipeable row on phones (buttons gently float so it's
            clear the row moves), wrapped on larger screens. Solid per-category colors. */}
        <div className="relative -mx-4 md:mx-0 mb-8 md:mb-12">
          <div
            ref={tabsRef}
            className="flex md:flex-wrap md:justify-center gap-2 md:gap-3 overflow-x-auto md:overflow-visible px-4 md:px-0 py-2 md:py-0 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category, i) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                style={{ ["--tab" as string]: category.color, animationDelay: `${i * 0.22}s` } as React.CSSProperties}
                className={`okh-cat okh-cat-float flex-shrink-0 snap-start whitespace-nowrap min-h-[44px] px-4 md:px-5 py-2.5 rounded-xl font-bold text-sm md:text-base transition-all ${
                  activeCategory === category.id ? "okh-cat-active" : ""
                }`}
              >
                <i className={`${category.icon} mr-2`}></i>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Build-your-own bundle */}
        {activeCategory === "bundles" && (
          <BundleBuilder
            onBuyNow={(bundle) => {
              setSelectedProduct(bundle);
              setShowModal(true);
            }}
            onAdded={() => {
              setShowCartPreview(true);
              setTimeout(() => setShowCartPreview(false), 2000);
            }}
          />
        )}

        {/* Products Grid — clean white cards (same look as Best sellers):
            two per row on phones, up to four on desktop. */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
          {(activeCategory === "all"
            ? Object.values(products).flat()
            : products[activeCategory]
          ).map((product) => {
            const href = `/products/${slugify(product.name)}`;
            const spec = product.features.filter((f) => f !== "Instant Delivery").slice(0, 2).join(" · ");
            return (
              <div
                key={product.name}
                className={`group relative flex flex-col rounded-2xl sm:rounded-3xl bg-white border p-2.5 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(0,103,184,0.55)] ${
                  product.popular
                    ? "border-[#0067b8]/40 shadow-[0_18px_40px_-24px_rgba(0,103,184,0.6)]"
                    : "border-[#dcecfb] shadow-[0_14px_32px_-26px_rgba(0,103,184,0.45)]"
                }`}
              >
                {(product.popular || product.badge) && !product.outOfStock && (
                  <span className="absolute left-3.5 top-3.5 sm:left-5 sm:top-5 z-10 rounded-full bg-[#0067b8] px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-white">
                    {product.popular ? "Popular" : product.badge}
                  </span>
                )}

                {/* Product box on a soft blue panel */}
                <Link
                  href={href}
                  aria-label={product.name}
                  className="relative block h-32 sm:h-44 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#f2f8ff] to-[#e3f1ff] overflow-hidden flex-shrink-0"
                >
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 h-4 w-20 rounded-[50%] bg-[#0b1f3a]/15 blur-md" aria-hidden="true" />
                  <Image
                    src={getProductBoxImage(product.name)}
                    alt={`${product.name} box`}
                    fill
                    unoptimized
                    className={`object-contain p-3 sm:p-4 drop-shadow-[0_12px_16px_rgba(2,40,80,0.22)] transition-transform duration-500 group-hover:scale-[1.05] ${product.outOfStock ? "opacity-40 grayscale" : ""}`}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  {product.outOfStock && (
                    <span className="absolute inset-x-0 bottom-3 mx-auto w-fit rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold text-white">
                      Out of stock
                    </span>
                  )}
                </Link>

                <div className="flex flex-1 flex-col px-0.5 sm:px-1 pt-3 sm:pt-4">
                  <h3 className="text-[13px] sm:text-base font-bold leading-snug text-[#0b1f3a] line-clamp-2 min-h-[2.4em] sm:min-h-[2.6em]">
                    <Link href={href} className="hover:text-[#0067b8] transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  {spec && (
                    <p className="mt-1 text-[11px] sm:text-xs text-slate-500 line-clamp-1">{spec}</p>
                  )}

                  <div className="mt-auto pt-3 flex items-baseline justify-between gap-2">
                    <span className="text-lg sm:text-2xl font-extrabold tabular-nums text-[#0b1f3a]">{money(product.price)}</span>
                    {product.originalPrice && (
                      <span className="hidden sm:inline text-xs text-slate-500" title="Microsoft retail price (MSRP)">
                        Retail <span className="line-through">{product.originalPrice}</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (product.outOfStock) return;
                        setSelectedProduct(product);
                        setShowModal(true);
                      }}
                      disabled={product.outOfStock}
                      className={`flex-1 min-h-[42px] sm:min-h-[46px] rounded-xl text-sm sm:text-[15px] font-extrabold inline-flex items-center justify-center gap-1.5 transition-colors ${
                        product.outOfStock
                          ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                      }`}
                    >
                      {product.outOfStock ? "Sold out" : "Buy now"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (product.outOfStock) return;
                        addToCart({
                          id: product.name.toLowerCase().replace(/\s+/g, "-"),
                          name: product.name,
                          price: product.price,
                          originalPrice: product.originalPrice,
                          image: getProductImage(product.name),
                        });
                        setShowCartPreview(true);
                        setTimeout(() => setShowCartPreview(false), 2000);
                      }}
                      disabled={product.outOfStock}
                      aria-label={`Add ${product.name} to cart`}
                      title="Add to cart"
                      className="flex-shrink-0 w-[42px] sm:w-[46px] min-h-[42px] sm:min-h-[46px] rounded-xl border border-emerald-500/40 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 inline-flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <i className="fas fa-cart-plus text-[15px]" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Modal — kept short: price, how to pay, link to the full product page */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md" onClick={() => setShowModal(false)}>
          <div className="glass-strong rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-md w-full max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#005A9E] px-5 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center gap-3">
                <div className="relative w-11 h-14 flex-shrink-0">
                  <Image
                    src={getProductBoxImage(selectedProduct.name)}
                    alt=""
                    fill
                    unoptimized
                    className="object-contain drop-shadow-md"
                    sizes="44px"
                  />
                </div>
                <h2 className="flex-1 text-lg md:text-xl font-black text-white leading-snug">{selectedProduct.name}</h2>
                <button
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                  className="flex-shrink-0 w-9 h-9 -mr-2 flex items-center justify-center text-white hover:text-sky-100 transition-colors"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Price */}
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-white">{selectedProduct.price}</span>
                  {selectedProduct.originalPrice && <span className="text-lg text-slate-500" title="Official retail price (MSRP)"><span className="mr-1 text-[0.65em] font-semibold uppercase tracking-wide">MSRP</span><span className="line-through">{selectedProduct.originalPrice}</span></span>}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5"><i className="fas fa-bolt text-sky-400"></i> Instant delivery</span>
                  <span className="flex items-center gap-1.5"><i className="fas fa-shield-halved text-sky-400"></i> Genuine license</span>
                  <span className="flex items-center gap-1.5"><i className="fas fa-rotate-left text-sky-400"></i> Money-back guarantee</span>
                </div>
              </div>

              {/* Custom bundles have no product page, so list what is in them */}
              {selectedProduct.name.startsWith('Custom Bundle') && (
                <ul className="space-y-1.5 rounded-xl bg-white/[0.04] border border-white/10 p-3">
                  {selectedProduct.features
                    .filter((f) => f !== 'Instant Delivery')
                    .map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white">
                        <i className="fas fa-check text-sky-500 mt-1 text-xs flex-shrink-0"></i>
                        <span>{f}</span>
                      </li>
                    ))}
                </ul>
              )}

              {/* Payment Methods */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-2">Choose how to pay</h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {/* PayPal */}
                  <a
                    href={paypalPaymentUrl(selectedProduct.name, selectedProduct.price)}
                    onClick={() => recordQuickOrder(selectedProduct.name, selectedProduct.price, 'paypal')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 min-h-[56px] px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg"
                  >
                    <i className="fab fa-paypal text-2xl"></i>
                    Pay {selectedProduct.price} with PayPal
                  </a>

                  {/* USDT — send directly to the store wallet, then email proof */}
                  {usdtOrderId ? (
                    <UsdtPay
                      orderId={usdtOrderId}
                      amount={priceToNumber(selectedProduct.price)}
                      itemName={selectedProduct.name}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setUsdtOrderId(recordQuickOrder(selectedProduct.name, selectedProduct.price, 'usdt').id)
                      }
                      className="flex items-center justify-between min-h-[56px] px-4 py-3 bg-white/[0.04] border border-green-400/40 rounded-xl hover:bg-green-500/10 transition-all group text-left w-full"
                    >
                      <div className="flex items-center gap-3">
                        <i className="fab fa-bitcoin text-green-400 text-2xl"></i>
                        <div>
                          <p className="font-bold text-white leading-tight">Pay with USDT</p>
                          <p className="text-xs text-slate-400">Send crypto, then email the screenshot</p>
                        </div>
                      </div>
                      <i className="fas fa-arrow-right text-green-400 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                  )}

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/16019756129?text=Hi! I want to buy ${selectedProduct.name} for ${selectedProduct.price}`}
                    onClick={() => recordQuickOrder(selectedProduct.name, selectedProduct.price, 'whatsapp')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between min-h-[56px] px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all group shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <i className="fab fa-whatsapp text-2xl"></i>
                      <div>
                        <p className="font-bold leading-tight">Chat on WhatsApp</p>
                        <p className="text-xs text-white/90">Instant support &amp; payment</p>
                      </div>
                    </div>
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </a>
                </div>
                <p className="text-xs text-slate-400 mt-3 text-center">Your key is sent to your email after payment.</p>
              </div>

              {/* Everything else lives on the product page */}
              {!selectedProduct.name.startsWith('Custom Bundle') && (
                <Link
                  href={`/products/${slugify(selectedProduct.name)}`}
                  onClick={() => setShowModal(false)}
                  className="flex items-center justify-center gap-2 min-h-[44px] pt-3 border-t border-white/10 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                >
                  See full details, features &amp; FAQ <i className="fas fa-arrow-right text-xs"></i>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Added Notification */}
      {showCartPreview && (
        <div className="fixed top-20 right-4 z-[10000] animate-slide-in-right">
          <div className="glass-strong rounded-xl shadow-2xl border border-sky-500/50 glow-sky p-4 min-w-[300px]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center">
                <i className="fas fa-check text-white text-xl"></i>
              </div>
              <div className="flex-1">
                <p className="font-bold text-white">Added to Cart!</p>
                <p className="text-sm text-slate-400">Item successfully added</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
