"use client";

import { useState } from "react";
import Image from "next/image";
import { getProductImage } from "../lib/productImage";

interface Product {
  name: string;
  price: string;
  image: string;
  badge?: string;
}

interface Category {
  name: string;
  icon: string;
  count: number;
  gradient: string;
  filterId: string;
  products?: Product[];
}

export default function CategoryBar() {
  const [activeCategory, setActiveCategory] = useState<string>("All Products");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      name: "All Products",
      icon: "fas fa-fire",
      count: 80,
      gradient: "from-orange-500 via-red-500 to-pink-500",
      filterId: "all"
    },
    {
      name: "Windows",
      icon: "fab fa-windows",
      count: 14,
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      filterId: "windows",
      products: [
        { name: "Windows 11 Pro", price: "$19.99", image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=300&fit=crop&q=80" },
        { name: "Windows 11 Home", price: "$14.99", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop&q=80" },
        { name: "Windows 10 Pro", price: "$16.99", image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400&h=300&fit=crop&q=80" },
        { name: "Windows 10 Home", price: "$12.99", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop&q=80" },
      ]
    },
    {
      name: "Office",
      icon: "fas fa-file-word",
      count: 16,
      gradient: "from-orange-500 via-orange-600 to-red-600",
      filterId: "office",
      products: [
        { name: "Office 2021 Pro Plus", price: "$29.99", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop&q=80", badge: "Popular" },
        { name: "Office 2021 Home & Business", price: "$24.99", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop&q=80" },
        { name: "Office 2019 Pro Plus", price: "$25.99", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop&q=80" },
        { name: "Office 365 (1 Year)", price: "$39.99", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop&q=80" },
      ]
    },
    {
      name: "Server",
      icon: "fas fa-server",
      count: 12,
      gradient: "from-gray-600 via-gray-700 to-gray-800",
      filterId: "server",
      products: [
        { name: "Windows Server 2022 Standard", price: "$49.99", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop&q=80" },
        { name: "Windows Server 2019 Standard", price: "$44.99", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80" },
        { name: "Windows Server 2022 Datacenter", price: "$79.99", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop&q=80" },
      ]
    },
    {
      name: "Visio & Project",
      icon: "fas fa-chart-line",
      count: 12,
      gradient: "from-teal-500 via-emerald-500 to-green-600",
      filterId: "visio",
      products: [
        { name: "Visio Professional 2021", price: "$34.99", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80" },
        { name: "Project Professional 2021", price: "$34.99", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&q=80" },
        { name: "Visio Standard 2021", price: "$28.99", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop&q=80" },
      ]
    },
    {
      name: "Visual Studio",
      icon: "fas fa-code",
      count: 6,
      gradient: "from-purple-500 via-purple-600 to-indigo-600",
      filterId: "visualstudio",
      products: [
        { name: "Visual Studio 2022 Professional", price: "$39.99", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&q=80" },
        { name: "Visual Studio 2022 Enterprise", price: "$79.99", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&q=80" },
        { name: "Visual Studio 2019 Professional", price: "$34.99", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop&q=80" },
      ]
    },
    {
      name: "SQL Server",
      icon: "fas fa-database",
      count: 8,
      gradient: "from-blue-600 via-blue-700 to-slate-800",
      filterId: "sql",
      products: [
        { name: "SQL Server 2022 Standard", price: "$89.99", image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop&q=80" },
        { name: "SQL Server 2019 Standard", price: "$84.99", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&q=80" },
        { name: "SQL Server 2022 Enterprise", price: "$149.99", image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop&q=80", badge: "Enterprise" },
      ]
    },
    {
      name: "Security",
      icon: "fas fa-shield-alt",
      count: 7,
      gradient: "from-red-500 via-pink-500 to-rose-600",
      filterId: "antivirus",
      products: [
        { name: "Kaspersky Total Security", price: "$19.99", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop&q=80" },
        { name: "Norton 360 Deluxe", price: "$24.99", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&q=80" },
        { name: "Bitdefender Total Security", price: "$22.99", image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop&q=80" },
        { name: "McAfee Total Protection", price: "$21.99", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop&q=80" },
      ]
    }
  ];

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category.name);
    
    // Store the selected category in sessionStorage for Products component
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedCategory', category.filterId);
      
      // Dispatch custom event to notify Products component
      window.dispatchEvent(new CustomEvent('categoryChanged', { 
        detail: { category: category.filterId } 
      }));
      
      // Scroll to products section
      setTimeout(() => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="hidden md:block sticky top-0 z-[100] bg-[#0b1020] border-b border-emerald-500/40 shadow-xl overflow-hidden">
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-shimmer"></div>
      
      <div className="max-w-7xl mx-auto relative overflow-hidden">
        {/* Desktop: Normal Flex Wrap with Hover Dropdowns */}
        <div className="flex items-center justify-center gap-1.5 py-2 flex-wrap px-2 md:px-4">
          {/* Category Pills */}
          {categories.map((category) => {
            const isActive = activeCategory === category.name;
            
            return (
              <div 
                key={category.name}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-sm transition-all duration-300 whitespace-nowrap overflow-hidden ${
                    isActive 
                      ? "scale-105 shadow-2xl" 
                      : "hover:scale-105 bg-slate-800/50 hover:bg-slate-700/70"
                  }`}
                  style={{
                    boxShadow: isActive ? "0 8px 32px rgba(16, 185, 129, 0.6)" : undefined
                  }}
                >
                  {/* Animated gradient background for active */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} animate-gradient`}></div>
                  )}
                  
                  {/* Content */}
                  <div className="relative flex items-center gap-1.5">
                    <i className={`${category.icon} text-sm ${isActive ? "text-white animate-pulse" : "text-slate-400 group-hover:text-white"}`}></i>
                    <span className={`text-sm ${isActive ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                      {category.name}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded-full text-xs font-black ${
                      isActive 
                        ? "bg-white/30 text-white" 
                        : "bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white"
                    }`}>
                      {category.count}
                    </span>
                  </div>

                  {/* Glow effect */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-lg opacity-75 blur-xl bg-gradient-to-r from-emerald-400 to-blue-500"></div>
                  )}
                </button>

                {/* Dropdown Menu - Product Cards */}
                {hoveredCategory === category.name && category.products && category.products.length > 0 && (
                  <div
                    className="absolute top-full left-0 mt-2 w-[600px] max-w-none glass-strong rounded-xl shadow-2xl overflow-hidden z-[200] animate-fadeIn"
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <div className={`bg-gradient-to-r ${category.gradient} px-4 py-3`}>
                      <div className="flex items-center gap-2">
                        <i className={`${category.icon} text-white text-lg`}></i>
                        <h3 className="text-white font-bold text-sm">Popular {category.name}</h3>
                      </div>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
                      {category.products.map((product, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleCategoryClick(category)}
                          className="group bg-white/[0.04] border border-white/10 rounded-xl overflow-hidden hover:border-emerald-400/50 hover:bg-white/[0.07] transition-all duration-300 text-left"
                        >
                          <div className="relative h-32 overflow-hidden">
                            <Image
                              src={getProductImage(product.name)}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {product.badge && (
                              <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                {product.badge}
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <h4 className="text-slate-200 font-bold text-sm mb-1 group-hover:text-emerald-300 transition-colors line-clamp-2">
                              {product.name}
                            </h4>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-emerald-400 font-black text-lg">{product.price}</span>
                              <i className="fas fa-shopping-cart text-slate-500 group-hover:text-emerald-400 transition-colors"></i>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="bg-white/[0.03] px-4 py-3 border-t border-white/10">
                      <button
                        onClick={() => handleCategoryClick(category)}
                        className="text-emerald-400 hover:text-emerald-300 font-semibold text-sm flex items-center gap-2 w-full justify-center"
                      >
                        View All {category.count} {category.name}
                        <i className="fas fa-arrow-right text-xs"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); }
          50% { box-shadow: 0 0 40px rgba(239, 68, 68, 1); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        /* Infinite scroll animation for mobile */
        @keyframes scroll-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (max-width: 768px) {
          .animate-scroll-mobile {
            animation: scroll-mobile 30s linear infinite;
            will-change: transform;
          }
        }
      `}</style>
    </div>
  );
}
