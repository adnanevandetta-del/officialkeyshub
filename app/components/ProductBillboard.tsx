"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
      image: "/products/windows.svg",
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
      image: "/products/office.svg",
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
      image: "/products/office365.svg",
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
      image: "/products/server.svg",
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
  const discount = Math.round((1 - parseFloat(currentProduct.price.replace("$", "")) / parseFloat(currentProduct.originalPrice.replace(/[$,]/g, ""))) * 100);

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
                <p className="text-white/60 text-xs md:text-sm mt-1">One-time payment • Lifetime access</p>
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

                {/* PayPal secure-checkout badge */}
                <div className="flex items-center justify-center gap-2 px-4 py-2.5 md:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                  <i className="fab fa-paypal text-[#00457C] text-xl md:text-2xl"></i>
                  <div className="flex flex-col leading-tight">
                    <span className="text-white/50 text-[10px] md:text-xs">Secure checkout with</span>
                    <span className="font-bold text-sm md:text-base">
                      <span className="text-[#003087]">Pay</span><span className="text-[#009CDE]">Pal</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - 3D Circular Carousel */}
          <div className="lg:col-span-7 relative" style={{ perspective: '1200px' }}>
            <div className="relative w-full h-[280px] md:h-[500px]">
              {/* Glow Effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 md:w-80 md:h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
              </div>

              {/* Carousel Container */}
              <div 
                className="absolute inset-0 flex items-center justify-center md-carousel"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {products.map((product, index) => {
                  // Calculate rotation angle for each product
                  const angle = ((index - currentIndex) * 360) / products.length;
                  const isActive = index === currentIndex;
                  // Use 180px for mobile via CSS, 320px for desktop
                  const radiusMobile = 180;
                  const radiusDesktop = 320;
                  
                  // Calculate distance from active position for scaling
                  const distanceFromActive = Math.abs(index - currentIndex);
                  const normalizedDistance = Math.min(distanceFromActive, products.length - distanceFromActive);
                  const scale = isActive ? 1 : Math.max(0.7, 1 - (normalizedDistance * 0.15));
                  const opacity = isActive ? 1 : Math.max(0.5, 1 - (normalizedDistance * 0.25));
                  
                  return (
                    <div
                      key={index}
                      className="absolute carousel-item"
                      style={{
                        transform: `
                          rotateY(${angle}deg) 
                          translateZ(${radiusMobile}px)
                          scale(${scale})
                        `,
                        opacity: opacity,
                        zIndex: isActive ? 20 : Math.max(1, 10 - normalizedDistance),
                        transformStyle: 'preserve-3d',
                        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        filter: isActive ? 'brightness(1.1) saturate(1.1)' : 'brightness(0.85) saturate(0.85)',
                      }}
                      data-angle={angle}
                      data-radius-desktop={radiusDesktop}
                    >
                      <div className={`relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl w-[180px] h-[240px] md:w-[280px] md:h-[360px] bg-slate-800 ${
                        isActive ? 'ring-2 md:ring-4 ring-emerald-500/50 shadow-emerald-500/30' : ''
                      }`}>
                        <div className="relative h-full">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover object-top transition-transform duration-700"
                            style={{
                              transform: isActive ? 'scale(1.05)' : 'scale(1)',
                            }}
                            priority={index === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                          
                          {/* Animated Border Glow for Active */}
                          {isActive && (
                            <div className="absolute inset-0 rounded-xl md:rounded-2xl animate-pulse" style={{
                              boxShadow: '0 0 20px rgba(16, 185, 129, 0.6), inset 0 0 20px rgba(16, 185, 129, 0.3)'
                            }}></div>
                          )}
                        </div>
                        
                        {/* Discount Badge with Pulse */}
                        <div className={`absolute top-2 md:top-4 right-2 md:right-4 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-500 ${
                          isActive ? 'scale-110 animate-bounce' : 'scale-100'
                        }`}>
                          <div className="text-center">
                            <p className="text-white text-[8px] md:text-xs font-bold">SAVE</p>
                            <p className="text-white text-base md:text-xl font-black">
                              {Math.round((1 - parseFloat(product.price.replace("$", "")) / parseFloat(product.originalPrice.replace(/[$,]/g, ""))) * 100)}%
                            </p>
                          </div>
                        </div>

                        {/* Icon with Glow */}
                        <div className={`absolute bottom-2 md:bottom-4 left-2 md:left-4 w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl flex items-center justify-center border border-white/20 transition-all duration-500 ${
                          isActive ? 'bg-white/20 scale-110' : ''
                        }`}>
                          <i className={`${product.icon} text-white text-lg md:text-2xl drop-shadow-lg`}></i>
                        </div>

                        {/* Product Name Overlay - Only Active */}
                        {isActive && (
                          <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-gradient-to-r from-emerald-600 to-emerald-500 backdrop-blur-md px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl shadow-lg animate-fade-in border border-emerald-400/30">
                            <p className="text-white text-xs md:text-sm font-bold drop-shadow-md">{product.name}</p>
                          </div>
                        )}

                        {/* Shimmer Effect on Active */}
                        {isActive && (
                          <div className="absolute inset-0 overflow-hidden rounded-xl md:rounded-2xl">
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
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
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
                      <div className="inline-block bg-emerald-500/90 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
                        <span className="text-white text-xs font-bold uppercase">{selectedProduct.badge}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-white">{selectedProduct.name}</h2>
                      <p className="text-white/90 font-medium">{selectedProduct.tagline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Product Description */}
              <div className="mb-6">
                <p className="text-slate-300 text-lg">{selectedProduct.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6 bg-emerald-500/10 rounded-xl p-6 border border-emerald-400/30">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-slate-400 text-sm font-semibold mb-1">Special Price</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl md:text-5xl font-black gradient-text">{selectedProduct.price}</span>
                      <span className="text-2xl text-slate-500 line-through">{selectedProduct.originalPrice}</span>
                    </div>
                    <p className="text-slate-400 text-sm mt-2">
                      <i className="fas fa-check-circle text-emerald-400 mr-1"></i>
                      One-time payment • Lifetime access
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                      <p className="text-xs font-bold">YOU SAVE</p>
                      <p className="text-3xl font-black">
                        ${(parseFloat(selectedProduct.originalPrice.replace(/[$,]/g, "")) - parseFloat(selectedProduct.price.replace("$", ""))).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-star text-yellow-400"></i>
                  What's Included
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedProduct.productFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white/[0.04] p-4 rounded-lg border border-white/10 hover:border-emerald-400/40 transition-colors">
                      <i className="fas fa-check-circle text-emerald-400 text-xl mt-0.5"></i>
                      <span className="text-slate-200 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Features */}
              <div className="mb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedProduct.features.map((feature, idx) => (
                  <div key={idx} className="bg-blue-500/10 p-3 rounded-lg text-center border border-blue-400/30">
                    <p className="text-blue-200 font-semibold text-sm">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
                  <i className="fas fa-credit-card text-cyan-400"></i>
                  Choose Your Payment Method
                </h3>
                
                <a
                  href={`mailto:digitalkeyhubllc@gmail.com?subject=PayPal Payment for ${selectedProduct.name}&body=Hi, I want to purchase ${selectedProduct.name} for ${selectedProduct.price} via PayPal.%0D%0A%0D%0AProduct: ${selectedProduct.name}%0D%0APrice: ${selectedProduct.price}`}
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

              {/* Trust Badges */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 py-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-slate-300">
                  <i className="fas fa-shield-alt text-emerald-400 text-xl"></i>
                  <span className="text-sm font-semibold">100% Secure</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <i className="fas fa-bolt text-yellow-400 text-xl"></i>
                  <span className="text-sm font-semibold">Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <i className="fas fa-headset text-cyan-400 text-xl"></i>
                  <span className="text-sm font-semibold">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <i className="fas fa-undo text-green-400 text-xl"></i>
                  <span className="text-sm font-semibold">Money Back</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

