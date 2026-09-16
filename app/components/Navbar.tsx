"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import CartButton from "./CartButton";
import ProfileButton from "./ProfileButton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const productCategories = [
    { name: "Windows", icon: "fab fa-windows", href: "/#products", color: "text-blue-500", filter: "windows" },
    { name: "Office", icon: "fas fa-file-word", href: "/#products", color: "text-orange-500", filter: "office" },
    { name: "Server", icon: "fas fa-server", href: "/#products", color: "text-gray-600", filter: "server" },
    { name: "Visio & Project", icon: "fas fa-chart-line", href: "/#products", color: "text-teal-500", filter: "visio" },
    { name: "Visual Studio", icon: "fas fa-code", href: "/#products", color: "text-purple-500", filter: "visualstudio" },
    { name: "SQL Server", icon: "fas fa-database", href: "/#products", color: "text-blue-600", filter: "sql" },
    { name: "Security", icon: "fas fa-shield-alt", href: "/#products", color: "text-red-500", filter: "antivirus" },
  ];

  const handleCategoryClick = (filter: string) => {
    setIsProductsOpen(false);
    // Store the selected category and dispatch event
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedCategory', filter);
      
      // Dispatch event for Products component
      window.dispatchEvent(new CustomEvent('categoryChanged', { 
        detail: { category: filter } 
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
    <nav className="sticky top-0 left-0 right-0 z-[200] bg-[#0a0e1a] shadow-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between w-full">
          {/* Left: Hamburger Menu */}
          <div className="flex-shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none p-2"
            >
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Logo size="sm" />
          </div>

          {/* Right: Cart & Profile Icons */}
          <div className="flex items-center gap-2">
            <CartButton />
            <ProfileButton />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <div className="ml-2">
            <Logo size="sm" />
          </div>

          {/* Desktop Menu */}
          <div className="flex items-center gap-3">
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="text-white hover:text-emerald-400 font-semibold transition-colors text-sm flex items-center gap-1"
              >
                Products
                <i className={`fas fa-chevron-down text-xs transition-transform ${isProductsOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {/* Dropdown Menu */}
              {isProductsOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[300]"
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 border-b border-gray-200">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                      <i className="fas fa-box text-emerald-400"></i>
                      Product Categories
                    </h3>
                    <p className="text-slate-300 text-xs mt-1">Browse our software collection</p>
                  </div>
                  <div className="p-3 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {productCategories.map((category) => (
                        <button
                          key={category.filter}
                          onClick={() => {
                            handleCategoryClick(category.filter);
                            setIsProductsOpen(false);
                          }}
                          className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 hover:bg-emerald-50 hover:border-emerald-300 border border-gray-200 rounded-lg transition-all text-left group"
                        >
                          <i className={`${category.icon} ${category.color} text-lg group-hover:scale-110 transition-transform`}></i>
                          <span className="text-gray-900 text-sm font-semibold group-hover:text-emerald-700">{category.name}</span>
                        </button>
                      ))}
                    </div>
                    <Link
                      href="/#products"
                      onClick={() => {
                        setIsProductsOpen(false);
                        if (typeof window !== 'undefined') {
                          sessionStorage.setItem('selectedCategory', 'all');
                          window.dispatchEvent(new CustomEvent('categoryChanged', { detail: { category: 'all' } }));
                        }
                      }}
                      className="mt-3 w-full py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center font-bold rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <i className="fas fa-th"></i>
                      View All Products
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/partner-program"
              className="text-white hover:text-emerald-400 font-semibold transition-colors text-sm flex items-center gap-1"
            >
              <i className="fas fa-handshake"></i>
              Partner Program
            </Link>
            <Link
              href="/blog"
              className="text-white hover:text-emerald-400 font-semibold transition-colors text-sm"
            >
              Blog
            </Link>
            <Link
              href="/faq"
              className="text-white hover:text-emerald-400 font-semibold transition-colors text-sm"
            >
              FAQ
            </Link>
            <a
              href="https://wa.me/16019756129"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md text-sm"
            >
              <i className="fab fa-whatsapp mr-1"></i>
              Contact
            </a>
            
            {/* Cart & Profile Buttons - Icon Only */}
            <CartButton />
            <ProfileButton />
          </div>
        </div>


        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-slate-800 pt-3">
            <div className="flex flex-col gap-3">
              {/* Product Categories Section */}
              <div className="border-b border-slate-700 pb-3 mb-1">
                <p className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2 px-1">Product Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {productCategories.map((category) => (
                    <button
                      key={category.filter}
                      onClick={() => {
                        handleCategoryClick(category.filter);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700 rounded-lg transition-all text-left"
                    >
                      <i className={`${category.icon} ${category.color} text-sm`}></i>
                      <span className="text-white text-sm font-semibold">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Menu Items */}
              <Link
                href="/#products"
                className="text-white hover:text-emerald-400 font-semibold transition-colors text-sm flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-box text-emerald-400"></i>
                All Products
              </Link>
              <Link
                href="/partner-program"
                className="text-white hover:text-emerald-400 font-semibold transition-colors text-sm flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-handshake text-emerald-400"></i>
                Partner Program
              </Link>
              <Link
                href="/blog"
                className="text-white hover:text-emerald-400 font-semibold transition-colors text-sm flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-blog text-emerald-400"></i>
                Blog
              </Link>
              <Link
                href="/faq"
                className="text-white hover:text-emerald-400 font-semibold transition-colors text-sm flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-question-circle text-emerald-400"></i>
                FAQ
              </Link>
              <a
                href="https://wa.me/16019756129"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md text-center text-sm"
              >
                <i className="fab fa-whatsapp mr-1"></i>
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
