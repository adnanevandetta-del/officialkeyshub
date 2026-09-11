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
      image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800&h=600&fit=crop&q=80",
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
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&q=80",
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
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
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
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80",
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
    <section className="relative w-full overflow-hidden bg-transparent md:bg-gradient-to-br md:from-slate-900 md:via-blue-950 md:to-slate-900 z-10">
      {/* Background Effects - Hidden on Mobile */}
      <div className="absolute inset-0 opacity-5 hidden md:block">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Left - Product Info (static) */}
          <div className="lg:col-span-5 space-y-4 z-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-500/30">
              <i className="fas fa-fire text-emerald-400"></i>
              <span className="text-emerald-400 text-sm font-bold uppercase">{currentProduct.badge}</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 leading-tight">
                {currentProduct.name}
              </h1>
              <p className="text-base md:text-lg text-white/80 font-semibold">
                {currentProduct.tagline}
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {currentProduct.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  <i className="fas fa-check text-emerald-400 text-sm"></i>
                  <span className="text-white text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Price & CTA */}
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-black text-emerald-400">
                    {currentProduct.price}
                  </span>
                  <span className="text-xl md:text-2xl text-white/40 line-through">
                    {currentProduct.originalPrice}
                  </span>
                </div>
                <p className="text-white/60 text-sm mt-1">One-time payment • Lifetime access</p>
              </div>

              <button
                onClick={() => {
                  setSelectedProduct(currentProduct);
                  setShowModal(true);
                }}
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black text-base md:text-lg rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2"
              >
                <i className="fas fa-shopping-cart"></i>
                Buy Now
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* Right - 3D Circular Carousel */}
          <div className="lg:col-span-7 relative" style={{ perspective: '1500px' }}>
            <div className="relative w-full h-[400px] md:h-[500px]">
              {/* Glow Effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
              </div>

              {/* Carousel Container */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {products.map((product, index) => {
                  // Calculate rotation angle for each product
                  const angle = ((index - currentIndex) * 360) / products.length;
                  const isActive = index === currentIndex;
                  const radius = 320;
                  
                  // Calculate distance from active position for scaling
                  const distanceFromActive = Math.abs(index - currentIndex);
                  const normalizedDistance = Math.min(distanceFromActive, products.length - distanceFromActive);
                  const scale = isActive ? 1.15 : Math.max(0.75, 1 - (normalizedDistance * 0.15));
                  const opacity = isActive ? 1 : Math.max(0.6, 1 - (normalizedDistance * 0.2));
                  
                  return (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        transform: `
                          rotateY(${angle}deg) 
                          translateZ(${radius}px)
                          scale(${scale})
                        `,
                        opacity: opacity,
                        zIndex: isActive ? 20 : Math.max(1, 10 - normalizedDistance),
                        transformStyle: 'preserve-3d',
                        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        filter: isActive ? 'brightness(1.1) saturate(1.1)' : 'brightness(0.9) saturate(0.9)',
                      }}
                    >
                      <div className={`relative rounded-2xl overflow-hidden shadow-2xl w-[280px] h-[360px] bg-slate-800 ${
                        isActive ? 'ring-4 ring-emerald-500/50 shadow-emerald-500/30' : ''
                      }`}>
                        <div className="relative h-full">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700"
                            style={{
                              transform: isActive ? 'scale(1.05)' : 'scale(1)',
                            }}
                            priority={index === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                          
                          {/* Animated Border Glow for Active */}
                          {isActive && (
                            <div className="absolute inset-0 rounded-2xl animate-pulse" style={{
                              boxShadow: '0 0 30px rgba(16, 185, 129, 0.6), inset 0 0 30px rgba(16, 185, 129, 0.3)'
                            }}></div>
                          )}
                        </div>
                        
                        {/* Discount Badge with Pulse */}
                        <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-500 ${
                          isActive ? 'scale-110 animate-bounce' : 'scale-100'
                        }`}>
                          <div className="text-center">
                            <p className="text-white text-xs font-bold">SAVE</p>
                            <p className="text-white text-xl font-black">
                              {Math.round((1 - parseFloat(product.price.replace("$", "")) / parseFloat(product.originalPrice.replace(/[$,]/g, ""))) * 100)}%
                            </p>
                          </div>
                        </div>

                        {/* Icon with Glow */}
                        <div className={`absolute bottom-4 left-4 w-14 h-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 transition-all duration-500 ${
                          isActive ? 'bg-white/20 scale-110' : ''
                        }`}>
                          <i className={`${product.icon} text-white text-2xl drop-shadow-lg`}></i>
                        </div>

                        {/* Product Name Overlay - Only Active */}
                        {isActive && (
                          <div className="absolute bottom-4 right-4 bg-gradient-to-r from-emerald-600 to-emerald-500 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg animate-fade-in border border-emerald-400/30">
                            <p className="text-white text-sm font-bold drop-shadow-md">{product.name}</p>
                          </div>
                        )}

                        {/* Shimmer Effect on Active */}
                        {isActive && (
                          <div className="absolute inset-0 overflow-hidden rounded-2xl">
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
            <div className="flex items-center justify-center gap-2 mt-6">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all ${
                    idx === currentIndex
                      ? 'w-10 h-2.5 bg-emerald-400'
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
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
                <p className="text-gray-700 text-lg">{selectedProduct.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border-2 border-emerald-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Special Price</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl md:text-5xl font-black text-emerald-600">{selectedProduct.price}</span>
                      <span className="text-2xl text-gray-400 line-through">{selectedProduct.originalPrice}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      <i className="fas fa-check-circle text-emerald-600 mr-1"></i>
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
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="fas fa-star text-yellow-500"></i>
                  What's Included
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedProduct.productFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-emerald-500 transition-colors">
                      <i className="fas fa-check-circle text-emerald-600 text-xl mt-0.5"></i>
                      <span className="text-gray-800 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Features */}
              <div className="mb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedProduct.features.map((feature, idx) => (
                  <div key={idx} className="bg-blue-50 p-3 rounded-lg text-center border border-blue-200">
                    <p className="text-blue-900 font-semibold text-sm">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center flex items-center justify-center gap-2">
                  <i className="fas fa-credit-card text-blue-600"></i>
                  Choose Your Payment Method
                </h3>
                
                <a
                  href={`mailto:digitalkeyhubllc@gmail.com?subject=PayPal Payment for ${selectedProduct.name}&body=Hi, I want to purchase ${selectedProduct.name} for ${selectedProduct.price} via PayPal.%0D%0A%0D%0AProduct: ${selectedProduct.name}%0D%0APrice: ${selectedProduct.price}`}
                  className="flex items-center justify-between p-5 bg-white border-2 border-blue-500 rounded-xl hover:bg-blue-50 transition-all shadow-md hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="fab fa-paypal text-blue-600 text-2xl"></i>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">PayPal</p>
                      <p className="text-gray-600 text-sm">Secure & Fast Payment</p>
                    </div>
                  </div>
                  <i className="fas fa-arrow-right text-blue-500 text-xl"></i>
                </a>

                <a
                  href={`mailto:digitalkeyhubllc@gmail.com?subject=USDT Payment for ${selectedProduct.name}&body=Hi, I want to purchase ${selectedProduct.name} for ${selectedProduct.price} via USDT.%0D%0A%0D%0AProduct: ${selectedProduct.name}%0D%0APrice: ${selectedProduct.price}`}
                  className="flex items-center justify-between p-5 bg-white border-2 border-green-500 rounded-xl hover:bg-green-50 transition-all shadow-md hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="fab fa-bitcoin text-green-600 text-2xl"></i>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">USDT (Crypto)</p>
                      <p className="text-gray-600 text-sm">Cryptocurrency Payment</p>
                    </div>
                  </div>
                  <i className="fas fa-arrow-right text-green-500 text-xl"></i>
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
              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 py-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-shield-alt text-emerald-600 text-xl"></i>
                  <span className="text-sm font-semibold">100% Secure</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-bolt text-yellow-500 text-xl"></i>
                  <span className="text-sm font-semibold">Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-headset text-blue-600 text-xl"></i>
                  <span className="text-sm font-semibold">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-undo text-green-600 text-xl"></i>
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

