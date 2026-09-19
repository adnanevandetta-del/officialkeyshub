"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { paypalPaymentUrl } from "../lib/payment";
import { recordQuickOrder, priceToNumber } from "../lib/account";
import UsdtPay from "./UsdtPay";
import { getProductImage, getProductBoxImage } from "../lib/productImage";

interface BillboardProduct {
  name: string;
  tagline: string;
  price: string;
  originalPrice: string;
  image: string;
  badge: string;
  icon: string;
  features: string[];
  description: string;
  productFeatures: string[];
}

export default function ProductBillboard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<BillboardProduct | null>(null);
  const [usdtOrderId, setUsdtOrderId] = useState<string | null>(null);
  useEffect(() => { setUsdtOrderId(null); }, [selectedProduct]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const products: BillboardProduct[] = [
    {
      name: "Windows 11 Pro",
      tagline: "Professional Edition",
      price: "$39.99",
      originalPrice: "$199.99",
      image: "/products/windows-11-pro.jpg",
      badge: "Best Seller",
      icon: "fab fa-windows",
      features: ["Remote Desktop", "BitLocker", "Hyper-V"],
      description: "Latest Windows OS with professional features",
      productFeatures: ["Lifetime License", "1 PC", "Instant Delivery", "24/7 Support", "Money Back Guarantee"],
    },
    {
      name: "Office 2021 Pro Plus",
      tagline: "Complete Productivity Suite",
      price: "$49.99",
      originalPrice: "$439.99",
      image: "/products/office-2021-professional-plus.jpg",
      badge: "Most Popular",
      icon: "fas fa-file-word",
      features: ["Word", "Excel", "PowerPoint"],
      description: "Complete Office suite with all applications",
      productFeatures: ["All Office Apps", "Lifetime License", "1 PC", "Instant Delivery", "Genuine Microsoft"],
    },
    {
      name: "Office 365 Personal",
      tagline: "Cloud-Powered",
      price: "$59.99",
      originalPrice: "$99.99",
      image: "/products/office-365-1-year.jpg",
      badge: "Featured",
      icon: "fas fa-cloud",
      features: ["1TB OneDrive", "5 Devices", "Always Updated"],
      description: "Cloud-based Office with 1TB storage",
      productFeatures: ["All Office Apps", "1TB Cloud", "5 Devices", "1 Year", "Premium Support"],
    },
    {
      name: "Windows Server 2022",
      tagline: "Enterprise Platform",
      price: "$69.99",
      originalPrice: "$1,069.00",
      image: "/products/windows-server-2022-standard.jpg",
      badge: "Enterprise",
      icon: "fas fa-server",
      features: ["Hyper-V", "Advanced Security", "Azure"],
      description: "Enterprise-grade server platform",
      productFeatures: ["2 VMs", "Hyper-V", "Lifetime License", "Enterprise Ready", "Instant Activation"],
    }
  ];

  // Auto-rotate every 4 seconds with smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[currentIndex];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950/60 via-blue-950/30 to-slate-950/60 z-10">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-[0.06] block">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(2, 132, 199, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(2, 132, 199, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-center">
          {/* Left - Product Info (static) — centered on mobile, left-aligned on desktop */}
          <div className="lg:col-span-5 space-y-3 md:space-y-4 z-20 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-sky-600/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-sky-600/30">
              <i className="fas fa-fire text-sky-500 text-sm"></i>
              <span className="text-sky-500 text-xs md:text-sm font-bold uppercase">{currentProduct.badge}</span>
            </div>

            {/* Title */}
            <div>
              {/* The page's single H1 is the site statement; the rotating product is an H2 */}
              <h1 className="text-[11px] md:text-sm font-bold uppercase tracking-[0.18em] text-sky-300/90 mb-1.5 md:mb-2">
                Genuine Microsoft Windows &amp; Office Licenses
              </h1>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-1 md:mb-2 leading-tight">
                {currentProduct.name}
              </h2>
              <p className="text-sm md:text-lg text-white/80 font-semibold">
                {currentProduct.tagline}
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 md:gap-2">
              {currentProduct.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-1 md:gap-1.5 bg-white/5 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-white/10">
                  <i className="fas fa-check text-sky-500 text-xs"></i>
                  <span className="text-white text-xs md:text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Price & CTA — desktop only (kept in the left column) */}
            <div className="hidden lg:block space-y-3 md:space-y-4">
              <div>
                <div className="flex items-baseline gap-2 md:gap-3">
                  <span className="text-3xl md:text-5xl font-black text-white">
                    {currentProduct.price}
                  </span>
                  <span className="text-lg md:text-2xl text-white/40 line-through">
                    {currentProduct.originalPrice}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedProduct(currentProduct);
                    setShowModal(true);
                  }}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black text-sm md:text-lg rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2"
                >
                  <i className="fas fa-shopping-cart text-sm md:text-base"></i>
                  Buy Now
                  <i className="fas fa-arrow-right text-sm md:text-base"></i>
                </button>

                {/* Secure payments we accept */}
                <div className="flex flex-col items-center sm:items-start gap-1.5 self-center">
                  <span className="text-white/45 text-[11px] font-medium flex items-center gap-1">
                    <i className="fas fa-lock text-[10px]"></i> Secure payments
                  </span>
                  <div className="flex items-center gap-2.5 text-white/75">
                    <i className="fab fa-cc-paypal text-xl" title="PayPal"></i>
                    <i className="fab fa-cc-visa text-xl" title="Visa"></i>
                    <i className="fab fa-cc-mastercard text-xl" title="Mastercard"></i>
                    <i className="fab fa-bitcoin text-xl" title="USDT / Crypto"></i>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right - 3D Circular Carousel */}
          <div className="lg:col-span-7 relative" style={{ perspective: '1200px' }}>
            <div className="relative w-full h-[190px] md:h-[500px]">
              {/* Ambient glow + orbit rings (futuristic backdrop) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-36 h-36 md:w-80 md:h-80 bg-sky-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute w-[180px] h-[180px] md:w-[420px] md:h-[420px] rounded-full border border-sky-500/10 animate-spin-slow"></div>
                <div className="absolute w-[130px] h-[130px] md:w-[300px] md:h-[300px] rounded-full border border-cyan-400/10 animate-spin-slow-rev"></div>
              </div>

              {/* Face-forward orbit — products stay visible and rotate around the ring */}
              <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                {products.map((product, index) => {
                  const n = products.length;
                  const rel = (((index - currentIndex) % n) + n) % n; // 0 = front
                  const theta = (rel / n) * Math.PI * 2;
                  const sx = Math.sin(theta); // -1 (left) .. 1 (right)
                  const dz = Math.cos(theta); // 1 (front) .. -1 (back)
                  const isActive = rel === 0;
                  const opacity = 0.4 + ((dz + 1) / 2) * 0.6;
                  const zIndex = Math.round((dz + 1) * 50) + (isActive ? 100 : 0);

                  return (
                    <div
                      key={index}
                      onClick={() => (isActive ? (setSelectedProduct(product), setShowModal(true)) : setCurrentIndex(index))}
                      className="absolute left-1/2 top-1/2 cursor-pointer transition-[transform,opacity,filter] duration-[900ms]"
                      style={{
                        // unitless multipliers consumed by the calc() transform below
                        ["--sx" as string]: sx.toFixed(4),
                        ["--dz" as string]: dz.toFixed(4),
                        transform:
                          "translate(-50%, -50%) " +
                          "translateX(calc(var(--sx) * clamp(68px, 20vw, 240px))) " +
                          "translateY(calc((1 - var(--dz)) * clamp(-6px, -2vw, -28px))) " +
                          "translateZ(calc(var(--dz) * clamp(30px, 8vw, 90px))) " +
                          "scale(calc(0.62 + (var(--dz) + 1) * 0.24))",
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                        opacity,
                        zIndex,
                        filter: isActive ? "saturate(1.1)" : "brightness(0.8) saturate(0.85)",
                      }}
                    >
                      {/* Just the box — no frame, background or overlay */}
                      <div
                        className="relative w-[118px] h-[156px] md:w-[246px] md:h-[326px] transition-[filter] duration-[900ms]"
                        style={{
                          filter: isActive
                            ? "drop-shadow(0 0 16px rgba(14,165,233,0.55)) drop-shadow(0 10px 14px rgba(0,0,0,0.45))"
                            : "drop-shadow(0 8px 12px rgba(0,0,0,0.5))",
                        }}
                      >
                        <Image
                          src={getProductBoxImage(product.name)}
                          alt={product.name}
                          fill
                          unoptimized
                          className="object-contain"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Swiping widget — mobile, futuristic glowing pills, directly under the product animation and above Buy Now */}
            <div className="flex lg:hidden items-center justify-center mt-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-sky-500/20 shadow-[0_0_18px_rgba(3,105,161,0.15)]">
                {products.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to product ${idx + 1}`}
                    className={`relative h-1.5 rounded-full transition-all duration-500 ease-out after:absolute after:-inset-x-2 after:-inset-y-3 after:content-[''] ${
                      idx === currentIndex
                        ? 'w-9 bg-gradient-to-r from-sky-500 to-cyan-400 shadow-[0_0_12px_rgba(3,105,161,0.9)]'
                        : 'w-1.5 bg-white/25 hover:bg-white/45'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Price + Buy Now + PayPal — mobile only, compact, below the product animation */}
            <div className="mt-4 flex lg:hidden flex-col items-center gap-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">
                  {currentProduct.price}
                </span>
                <span className="text-base text-white/40 line-through">
                  {currentProduct.originalPrice}
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedProduct(currentProduct);
                    setShowModal(true);
                  }}
                  className="px-7 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center gap-1.5"
                >
                  <i className="fas fa-shopping-cart text-xs"></i>
                  Buy Now
                </button>

                {/* Secure payments we accept */}
                <div className="flex items-center gap-2.5 text-white/75">
                  <i className="fab fa-cc-paypal text-lg" title="PayPal"></i>
                  <i className="fab fa-cc-visa text-lg" title="Visa"></i>
                  <i className="fab fa-cc-mastercard text-lg" title="Mastercard"></i>
                  <i className="fab fa-bitcoin text-lg" title="USDT / Crypto"></i>
                </div>
              </div>
            </div>

            {/* Navigation Dots — desktop */}
            <div className="hidden lg:flex items-center justify-center gap-2 mt-6">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all ${
                    idx === currentIndex
                      ? 'w-10 h-2.5 bg-sky-500'
                      : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'
                  } rounded-full`}
                  aria-label={`Go to product ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" onClick={() => setShowModal(false)}>
          <div className="glass-strong rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-slide-up" onClick={(e) => e.stopPropagation()}>
            {/* Header with Image — clean, centered product tile */}
            <div className="relative h-36 md:h-44 rounded-t-2xl bg-gradient-to-b from-slate-800/80 to-slate-900 flex items-center justify-center overflow-hidden">
              <Image
                src={getProductImage(selectedProduct.name)}
                alt={selectedProduct.name}
                fill
                unoptimized
                className="object-contain p-3"
              />
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-colors z-10"
                aria-label="Close"
              >
                <i className="fas fa-times text-white text-lg"></i>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-sky-600/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className={`${selectedProduct.icon} text-sky-400 text-xl`}></i>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white">{selectedProduct.name}</h2>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl md:text-5xl font-black text-white">{selectedProduct.price}</span>
                <span className="text-2xl text-slate-500 line-through">{selectedProduct.originalPrice}</span>
              </div>

              {/* Reassurance strip — keeps the buyer at ease */}
              <div className="mt-4 mb-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-300">
                <span className="flex items-center gap-1.5"><i className="fas fa-bolt text-sky-400"></i> Instant delivery</span>
                <span className="flex items-center gap-1.5"><i className="fas fa-shield-halved text-sky-400"></i> Genuine license</span>
                <span className="flex items-center gap-1.5"><i className="fas fa-rotate-left text-sky-400"></i> Money-back guarantee</span>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-slate-300 mb-3">Choose how to pay</h3>

                <a
                  href={paypalPaymentUrl(selectedProduct.name, selectedProduct.price)}
                  onClick={() => recordQuickOrder(selectedProduct.name, selectedProduct.price, "paypal")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 bg-white/[0.04] border border-blue-400/40 rounded-xl hover:bg-blue-500/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/15 rounded-lg flex items-center justify-center">
                      <i className="fab fa-paypal text-blue-400 text-2xl"></i>
                    </div>
                    <div>
                      <p className="font-bold text-white">PayPal</p>
                      <p className="text-slate-400 text-sm">Secure & Fast Payment</p>
                    </div>
                  </div>
                  <i className="fas fa-arrow-right text-blue-400 text-xl"></i>
                </a>

                {usdtOrderId ? (
                  <UsdtPay
                    orderId={usdtOrderId}
                    amount={priceToNumber(selectedProduct.price)}
                    itemName={selectedProduct.name}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setUsdtOrderId(recordQuickOrder(selectedProduct.name, selectedProduct.price, "usdt").id)}
                    className="w-full text-left flex items-center justify-between p-5 bg-white/[0.04] border border-green-400/40 rounded-xl hover:bg-green-500/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/15 rounded-lg flex items-center justify-center">
                        <i className="fab fa-bitcoin text-green-400 text-2xl"></i>
                      </div>
                      <div>
                        <p className="font-bold text-white">USDT (Crypto)</p>
                        <p className="text-slate-400 text-sm">Send crypto, then email the transaction screenshot</p>
                      </div>
                    </div>
                    <i className="fas fa-arrow-right text-green-400 text-xl"></i>
                  </button>
                )}

                <a
                  href={`https://wa.me/16019756129?text=Hi! I want to buy ${encodeURIComponent(selectedProduct.name)} for ${selectedProduct.price}`}
                  onClick={() => recordQuickOrder(selectedProduct.name, selectedProduct.price, "whatsapp")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <i className="fab fa-whatsapp text-white text-2xl"></i>
                    </div>
                    <div>
                      <p className="font-bold text-white">WhatsApp</p>
                      <p className="text-white/90 text-sm">Instant Support & Payment</p>
                    </div>
                  </div>
                  <i className="fas fa-arrow-right text-white text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

