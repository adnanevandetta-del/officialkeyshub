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
}

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

  const categories: { id: CategoryId; name: string; icon: string }[] = [
    { id: "bundles", name: "Bundles", icon: "fas fa-box-open" },
    { id: "windows", name: "Windows", icon: "fab fa-windows" },
    { id: "office", name: "Office", icon: "fas fa-file-word" },
    { id: "server", name: "Server", icon: "fas fa-server" },
    { id: "visio", name: "Visio", icon: "fas fa-project-diagram" },
    { id: "project", name: "Project", icon: "fas fa-tasks" },
    { id: "sql", name: "SQL Server", icon: "fas fa-database" },
    { id: "visualstudio", name: "Visual Studio", icon: "fas fa-code" },
    { id: "antivirus", name: "Security", icon: "fas fa-shield-alt" },
  ];

  const products = catalog;

  return (
    <section className="pt-16 pb-20 relative overflow-hidden bg-white" id="products">
      <div className="container mx-auto px-4 md:px-6">
        {/* Category Tabs — a normal swipeable row on phones (buttons gently float so it's
            clear the row moves), wrapped on larger screens. */}
        <div className="relative -mx-4 md:mx-0 mb-8 md:mb-12">
          <div
            ref={tabsRef}
            className="flex md:flex-wrap md:justify-center gap-2 md:gap-3 overflow-x-auto md:overflow-visible px-4 md:px-0 py-2 md:py-0 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category, i) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                style={{ animationDelay: `${i * 0.22}s` }}
                className={`okh-tab flex-shrink-0 snap-start whitespace-nowrap min-h-[44px] px-4 md:px-5 py-2.5 rounded-xl font-bold text-sm md:text-base transition-colors ${
                  category.id === "bundles" && activeCategory !== "bundles" ? "okh-bundle-tab" : ""
                } ${
                  activeCategory === category.id
                    ? "okh-tab-active"
                    : "glass text-slate-300 hover:text-white glow-hover"
                }`}
              >
                <i className={`${category.icon} mr-2`}></i>
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes okh-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
          @media (max-width: 767px) {
            .okh-tab { animation: okh-float 2.6s ease-in-out infinite; }
          }
          @media (prefers-reduced-motion: reduce) {
            .okh-tab { animation: none; }
          }
          .okh-tab-active {
            background: linear-gradient(135deg, #10b981, #059669) !important;
            border: 1px solid rgba(110,231,183,.6) !important;
            color: #fff !important;
            box-shadow: 0 0 16px rgba(16,185,129,.45);
          }
          .okh-bundle-tab {
            background: linear-gradient(135deg, rgba(249,115,22,.22), rgba(234,88,12,.12)) !important;
            border: 1px solid rgba(251,146,60,.75) !important;
            color: #fed7aa !important;
            box-shadow: 0 0 12px rgba(249,115,22,.25);
          }
          .okh-bundle-tab:hover { color: #fff !important; background: linear-gradient(135deg, rgba(249,115,22,.35), rgba(234,88,12,.2)) !important; box-shadow: 0 0 18px rgba(249,115,22,.5); }
        `}</style>

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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {(activeCategory === "all" 
            ? Object.values(products).flat()
            : products[activeCategory]
          ).map((product, index) => (
            <div
              key={index}
              className={`glass rounded-2xl overflow-hidden transition-all duration-300 flex flex-col relative glow-hover ${
                product.popular
                  ? "ring-1 ring-sky-500/50 glow-sky"
                  : ""
              }`}
            >
              {/* Product Image */}
              <Link href={`/products/${slugify(product.name)}`} className="relative h-48 sm:h-52 w-full overflow-hidden flex-shrink-0 border-b border-white/5 block bg-gradient-to-b from-slate-800/80 to-slate-900">
                <Image
                  src={getProductImage(product.name)}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-contain p-3 hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>

              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <div className="mb-3 md:mb-4 flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2 md:h-14 line-clamp-2">
                    <Link href={`/products/${slugify(product.name)}`} className="hover:text-sky-400 transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-slate-400 text-sm md:h-10 line-clamp-2">{product.description}</p>
                  <Link href={`/products/${slugify(product.name)}`} className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 text-xs font-semibold mt-1 py-2">
                    View details <i className="fas fa-arrow-right text-[10px]"></i>
                  </Link>
                </div>

                <div className="mb-3 md:mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">{product.price}</span>
                    {product.originalPrice && <span className="text-sm text-slate-500 line-through">{product.originalPrice}</span>}
                  </div>
                </div>

                {/* Phones: three compact feature pills instead of the tall checklist */}
                <ul className="flex md:hidden flex-wrap gap-1.5 mb-4">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-slate-300">
                      <i className="fas fa-check text-sky-500 text-[10px]"></i>
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>
                <ul className="hidden md:block space-y-2 mb-6 h-32 overflow-hidden">
                  {product.features.slice(0, 5).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <i className="fas fa-check text-sky-500 mt-1 flex-shrink-0"></i>
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 mt-auto">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedProduct(product);
                      setShowModal(true);
                    }}
                    className="w-full min-h-[48px] py-3 rounded-lg font-bold transition-all inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/50"
                    style={{
                      boxShadow: '0 0 20px rgba(37, 99, 235, 0.5), 0 4px 14px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    <span className="flex items-center gap-2">
                      Buy Now
                      <i className="fab fa-paypal text-2xl"></i>
                    </span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart({
                        id: product.name.toLowerCase().replace(/\s+/g, '-'),
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        image: getProductImage(product.name)
                      });
                      setShowCartPreview(true);
                      setTimeout(() => setShowCartPreview(false), 2000);
                    }}
                    className="w-full min-h-[44px] py-2.5 rounded-lg font-semibold transition-all inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal — kept short: price, how to pay, link to the full product page */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md" onClick={() => setShowModal(false)}>
          <div className="glass-strong rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-md w-full max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-sky-600 to-sky-700 px-5 py-4 rounded-t-2xl">
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
                  {selectedProduct.originalPrice && <span className="text-lg text-slate-500 line-through">{selectedProduct.originalPrice}</span>}
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
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
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
                    className="flex items-center justify-between min-h-[56px] px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all group shadow-lg"
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
