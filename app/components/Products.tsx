"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from './CartContext';
import { getProductImage } from '../lib/productImage';
import Link from 'next/link';
import { catalog, slugify } from '../lib/catalog';
import { paypalPaymentUrl } from '../lib/payment';

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
      
      // Add Product Schema for SEO
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "Product",
            "name": "Windows 11 Pro",
            "description": "Latest Windows OS with professional features",
            "image": "https://images.unsplash.com/photo-1629654297299-c8506221ca97",
            "brand": { "@type": "Brand", "name": "Microsoft" },
            "offers": {
              "@type": "Offer",
              "price": "38.99",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2027-12-31"
            }
          },
          {
            "@type": "Product",
            "name": "Office 2021 Professional Plus",
            "description": "Complete Office suite with all applications",
            "image": "https://images.unsplash.com/photo-1586281380349-632531db7ed4",
            "brand": { "@type": "Brand", "name": "Microsoft" },
            "offers": {
              "@type": "Offer",
              "price": "48.99",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2027-12-31"
            }
          }
        ]
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(productSchema);
      document.head.appendChild(script);
      
      return () => {
        window.removeEventListener('categoryChanged', handleCategoryChange as EventListener);
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
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
    <section className="pt-16 pb-20 relative overflow-hidden bg-gradient-to-br from-slate-950/60 via-blue-950/30 to-slate-950/60" id="products">
      <div className="container mx-auto px-4 md:px-6">
        {/* Category Tabs — swipeable single row on phones, wrapped on larger screens */}
        <div className="flex md:flex-wrap md:justify-center gap-2 md:gap-3 mb-8 md:mb-12 overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-shrink-0 snap-start whitespace-nowrap min-h-[44px] px-4 md:px-5 py-2.5 rounded-xl font-bold text-sm md:text-base transition-all transform hover:scale-105 ${
                activeCategory === category.id
                  ? "btn-primary"
                  : "glass text-slate-300 hover:text-white glow-hover"
              }`}
            >
              <i className={`${category.icon} mr-2`}></i>
              {category.name}
            </button>
          ))}
        </div>

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
              <Link href={`/products/${slugify(product.name)}`} className="relative h-48 sm:h-52 w-full overflow-hidden flex-shrink-0 border-b border-white/5 block">
                <Image
                  src={getProductImage(product.name)}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-cover hover:scale-105 transition-transform duration-500"
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
                    <span className="text-sm text-slate-500 line-through">{product.originalPrice}</span>
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

      {/* Payment Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={() => setShowModal(false)}>
          <div className="glass-strong rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-sky-600 to-sky-700 p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-white mb-2">{selectedProduct.name}</h2>
                  <p className="text-sky-50">{selectedProduct.description}</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="ml-4 text-white hover:text-sky-100 transition-colors"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6">
              {/* Product Image — clean, centered tile */}
              <div className="mb-6 relative h-32 w-full rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-800/80 to-slate-900 flex items-center justify-center">
                <Image
                  src={getProductImage(selectedProduct.name)}
                  alt={selectedProduct.name}
                  fill
                  unoptimized
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Price */}
              <div className="mb-6 bg-sky-600/10 rounded-xl p-4 border border-sky-500/30">
                <div className="flex items-baseline gap-3 justify-center">
                  <span className="text-4xl font-black text-white">{selectedProduct.price}</span>
                  <span className="text-xl text-slate-500 line-through">{selectedProduct.originalPrice}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  {selectedProduct.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                      <i className="fas fa-check-circle text-sky-500 mt-1 flex-shrink-0"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-4 text-center">Choose Payment Method</h3>
                <div className="grid grid-cols-1 gap-3">
                  {/* PayPal Button */}
                  <div className="p-4 bg-blue-500/10 border border-blue-400/40 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <i className="fab fa-paypal text-white text-2xl"></i>
                      </div>
                      <div>
                        <p className="font-bold text-white">Pay with PayPal</p>
                        <p className="text-sm text-slate-400">Secure checkout • Buyer protection</p>
                      </div>
                    </div>
                    <a
                      href={paypalPaymentUrl(selectedProduct.name, selectedProduct.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
                    >
                      Pay {selectedProduct.price} with PayPal
                    </a>
                    <p className="text-xs text-slate-400 mt-2 text-center">
                      We'll send secure PayPal payment details and your key by email
                    </p>
                  </div>

                  {/* USDT */}
                  <a
                    href={`mailto:digitalkeyhubllc@gmail.com?subject=USDT Payment for ${selectedProduct.name}&body=Hi, I want to purchase ${selectedProduct.name} for ${selectedProduct.price} via USDT.`}
                    className="flex items-center justify-between p-4 bg-white/[0.04] border border-green-400/40 rounded-xl hover:bg-green-500/10 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500/15 rounded-lg flex items-center justify-center group-hover:bg-green-500/25 transition-colors">
                        <i className="fab fa-bitcoin text-green-400 text-2xl"></i>
                      </div>
                      <div>
                        <p className="font-bold text-white">Pay with USDT</p>
                        <p className="text-sm text-slate-400">Cryptocurrency payment</p>
                      </div>
                    </div>
                    <i className="fas fa-arrow-right text-green-400 group-hover:translate-x-1 transition-transform"></i>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/16019756129?text=Hi! I want to buy ${selectedProduct.name} for ${selectedProduct.price}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all group shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <i className="fab fa-whatsapp text-white text-2xl"></i>
                      </div>
                      <div>
                        <p className="font-bold text-white">Chat on WhatsApp</p>
                        <p className="text-sm text-sky-100">Get instant support</p>
                      </div>
                    </div>
                    <i className="fas fa-arrow-right text-white group-hover:translate-x-1 transition-transform"></i>
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <i className="fas fa-shield-alt text-sky-500"></i>
                  <span>100% Genuine</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <i className="fas fa-shipping-fast text-sky-500"></i>
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <i className="fas fa-headset text-sky-500"></i>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <i className="fas fa-undo text-sky-500"></i>
                  <span>Money Back</span>
                </div>
              </div>

              {/* Product Description & Positivity */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <i className="fas fa-info-circle text-sky-500"></i>
                    About This Product
                  </h4>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {selectedProduct.description}. This is a genuine Microsoft product that comes with full support and lifetime validity.
                    Perfect for professionals, students, and businesses looking for reliable software solutions.
                  </p>
                  <div className="flex items-start gap-3 bg-black/20 rounded-lg p-4 border-l-4 border-sky-500">
                    <i className="fas fa-check-circle text-sky-500 text-xl mt-1"></i>
                    <div>
                      <p className="font-semibold text-white mb-1">Why Choose Us?</p>
                      <p className="text-sm text-slate-400">
                        Join thousands of satisfied customers who trust us for authentic Microsoft licenses. 
                        We provide instant delivery, genuine product keys, and dedicated 24/7 support to ensure your complete satisfaction. 
                        Every purchase is backed by our money-back guarantee!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
