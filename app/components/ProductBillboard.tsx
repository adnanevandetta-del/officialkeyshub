"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { paypalPaymentUrl } from "../lib/payment";
import { getProductImage } from "../lib/productImage";

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const products: BillboardProduct[] = [
    {
      name: "Windows 11 Pro",
      tagline: "Professional Edition",
      price: "$19.99",
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
      price: "$29.99",
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
      price: "$39.99",
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
      price: "$49.99",
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
          backgroundImage: 'linear-gradient(rgba(52, 211, 153, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(52, 211, 153, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-center">
          {/* Left - Product Info (static) */}
          <div className="lg:col-span-5 space-y-3 md:space-y-4 z-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-emerald-500/30">
              <i className="fas fa-fire text-emerald-400 text-sm"></i>
              <span className="text-emerald-400 text-xs md:text-sm font-bold uppercase">{currentProduct.badge}</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-1 md:mb-2 leading-tight">
                {currentProduct.name}
              </h1>
              <p className="text-sm md:text-lg text-white/80 font-semibold">
                {currentProduct.tagline}
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {currentProduct.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-1 md:gap-1.5 bg-white/5 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-white/10">
                  <i className="fas fa-check text-emerald-400 text-xs"></i>
                  <span className="text-white text-xs md:text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Price & CTA */}
            <div className="space-y-3 md:space-y-4">
              <div>
                <div className="flex items-baseline gap-2 md:gap-3">
                  <span className="text-3xl md:text-5xl font-black text-emerald-400">
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
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black text-sm md:text-lg rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                >
                  <i className="fas fa-shopping-cart text-sm md:text-base"></i>
                  Buy Now
                  <i className="fas fa-arrow-right text-sm md:text-base"></i>
                </button>

                {/* PayPal secure-checkout badge (compact, smaller than Buy Now) */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg self-center">
                  <i className="fab fa-paypal text-[#009CDE] text-base md:text-lg"></i>
                  <span className="text-white/55 text-[11px] leading-tight">
                    Secure checkout with{" "}
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">Pay</span><span className="text-[#009CDE]">Pal</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - 3D Circular Carousel */}
          <div className="lg:col-span-7 relative" style={{ perspective: '1200px' }}>
            <div className="relative w-full h-[190px] md:h-[500px]">
              {/* Ambient glow + orbit rings (futuristic backdrop) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-36 h-36 md:w-80 md:h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute w-[180px] h-[180px] md:w-[420px] md:h-[420px] rounded-full border border-emerald-400/10 animate-spin-slow"></div>
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
                      <div
                        className={`relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl w-[115px] h-[150px] md:w-[240px] md:h-[320px] bg-slate-800 ${
                          isActive ? "ring-2 md:ring-4 ring-emerald-500/60 shadow-emerald-500/30" : "ring-1 ring-white/10"
                        }`}
                      >
                        <div className="relative h-full">
                          <Image
                            src={getProductImage(product.name)}
                            alt={product.name}
                            fill
                            unoptimized
                            className="object-cover"
                            priority={index === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                          {isActive && (
                            <div
                              className="absolute inset-0 rounded-xl md:rounded-2xl"
                              style={{ boxShadow: "0 0 24px rgba(16,185,129,0.55), inset 0 0 24px rgba(16,185,129,0.25)" }}
                            ></div>
                          )}
                        </div>

                        {/* Shimmer sweep on active */}
                        {isActive && (
                          <div className="absolute inset-0 overflow-hidden rounded-xl md:rounded-2xl pointer-events-none">
                            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-4 md:mt-6">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all ${
                    idx === currentIndex
                      ? 'w-8 md:w-10 h-2 md:h-2.5 bg-emerald-400'
                      : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-white/30 hover:bg-white/50'
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={() => setShowModal(false)}>
          <div className="glass-strong rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header with Image */}
            <div className="relative">
              {/* Product Image */}
              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                <Image
                  src={getProductImage(selectedProduct.name)}
                  alt={selectedProduct.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                
                {/* Close Button */}
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center transition-colors z-10"
                >
                  <i className="fas fa-times text-white text-xl"></i>
                </button>

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg">
                  <p className="text-sm font-bold">
                    SAVE {Math.round((1 - parseFloat(selectedProduct.price.replace("$", "")) / parseFloat(selectedProduct.originalPrice.replace(/[$,]/g, ""))) * 100)}%
                  </p>
                </div>

                {/* Product Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                      <i className={`${selectedProduct.icon} text-white text-2xl`}></i>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-black text-white">{selectedProduct.name}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Price */}
              <div className="mb-6 flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl md:text-5xl font-black gradient-text">{selectedProduct.price}</span>
                <span className="text-2xl text-slate-500 line-through">{selectedProduct.originalPrice}</span>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
                  <i className="fas fa-credit-card text-cyan-400"></i>
                  Choose Your Payment Method
                </h3>
                
                <a
                  href={paypalPaymentUrl(selectedProduct.name, selectedProduct.price)}
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

                <a
                  href={`mailto:digitalkeyhubllc@gmail.com?subject=USDT Payment for ${selectedProduct.name}&body=Hi, I want to purchase ${selectedProduct.name} for ${selectedProduct.price} via USDT.%0D%0A%0D%0AProduct: ${selectedProduct.name}%0D%0APrice: ${selectedProduct.price}`}
                  className="flex items-center justify-between p-5 bg-white/[0.04] border border-green-400/40 rounded-xl hover:bg-green-500/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/15 rounded-lg flex items-center justify-center">
                      <i className="fab fa-bitcoin text-green-400 text-2xl"></i>
                    </div>
                    <div>
                      <p className="font-bold text-white">USDT (Crypto)</p>
                      <p className="text-slate-400 text-sm">Cryptocurrency Payment</p>
                    </div>
                  </div>
                  <i className="fas fa-arrow-right text-green-400 text-xl"></i>
                </a>

                <a
                  href={`https://wa.me/16019756129?text=Hi! I want to buy ${encodeURIComponent(selectedProduct.name)} for ${selectedProduct.price}`}
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

