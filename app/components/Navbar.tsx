"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import CartButton from "./CartButton";
import ProfileButton from "./ProfileButton";
import ProductSearch from "./ProductSearch";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeskMenuOpen, setIsDeskMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    <nav className="font-math sticky top-0 left-0 right-0 z-[200] bg-[#0a0e1a] shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between w-full relative">
          {/* Left: Hamburger + Search icon */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => {
                setIsMenuOpen((v) => !v);
                setIsSearchOpen(false);
              }}
              className="text-white focus:outline-none p-2"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
            </button>
            <button
              onClick={() => {
                setIsSearchOpen((v) => !v);
                setIsMenuOpen(false);
              }}
              className="text-white focus:outline-none p-2"
              aria-label="Search products"
              aria-expanded={isSearchOpen}
            >
              <i className={`fas ${isSearchOpen ? "fa-times" : "fa-search"} text-xl`}></i>
            </button>
          </div>

          {/* Center: Logo — absolutely centered so the side icons don't push it off-center */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Logo size="sm" />
          </div>

          {/* Right: Cart & Profile Icons */}
          <div className="flex items-center gap-2">
            <CartButton />
            <ProfileButton />
          </div>
        </div>

        {/* Mobile slide-down search */}
        {isSearchOpen && (
          <div className="md:hidden mt-3 okh-search-slide">
            <ProductSearch
              variant="mobile"
              autoFocus
              onNavigate={() => setIsSearchOpen(false)}
            />
          </div>
        )}
        <style>{`
          @keyframes okhSearchSlide {
            from { opacity: 0; transform: translateY(-10px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .okh-search-slide { animation: okhSearchSlide .26s ease-out; }
          @media (prefers-reduced-motion: reduce) {
            .okh-search-slide { animation: none; }
          }
        `}</style>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between relative">
          {/* Logo — left edge aligns with the billboard content below */}
          <div>
            <Logo size="sm" />
          </div>


          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Partner Program stays visible */}
            <Link
              href="/partner-program"
              className="text-white hover:text-sky-500 font-semibold transition-colors text-sm flex items-center gap-1"
            >
              <i className="fas fa-handshake"></i>
              Partner Program
            </Link>

            {/* Cart & Profile Buttons - Icon Only */}
            <CartButton />
            <ProfileButton />

            {/* Product search — sits right beside the menu button */}
            <ProductSearch variant="desktop" />

            {/* Menu icon — moved to the far right (profile's old spot), holds Products / FAQ / Blog */}
            <div className="relative">
              <button
                onClick={() => setIsDeskMenuOpen((v) => !v)}
                onBlur={() => setTimeout(() => setIsDeskMenuOpen(false), 150)}
                className="text-white hover:text-sky-500 focus:outline-none p-2 flex items-center"
                aria-label="Open menu"
                aria-expanded={isDeskMenuOpen}
              >
                <i className={`fas ${isDeskMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
              </button>

              {isDeskMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 max-w-none bg-[#0b1020] rounded-xl shadow-2xl border border-sky-600/30 overflow-hidden z-[300] py-2">
                  <Link
                    href="/#products"
                    onClick={() => {
                      setIsDeskMenuOpen(false);
                      if (typeof window !== 'undefined') {
                        sessionStorage.setItem('selectedCategory', 'all');
                        window.dispatchEvent(new CustomEvent('categoryChanged', { detail: { category: 'all' } }));
                      }
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-slate-200 hover:bg-sky-600/10 hover:text-sky-400 transition-colors text-sm font-semibold"
                  >
                    <i className="fas fa-box text-sky-500 w-4"></i>
                    Products
                  </Link>
                  <Link
                    href="/faq"
                    onClick={() => setIsDeskMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-slate-200 hover:bg-sky-600/10 hover:text-sky-400 transition-colors text-sm font-semibold"
                  >
                    <i className="fas fa-question-circle text-sky-500 w-4"></i>
                    FAQ
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setIsDeskMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-slate-200 hover:bg-sky-600/10 hover:text-sky-400 transition-colors text-sm font-semibold"
                  >
                    <i className="fas fa-blog text-sky-500 w-4"></i>
                    Blog
                  </Link>
                  <Link
                    href="/activation-guide"
                    onClick={() => setIsDeskMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-slate-200 hover:bg-sky-600/10 hover:text-sky-400 transition-colors text-sm font-semibold"
                  >
                    <i className="fas fa-key text-sky-500 w-4"></i>
                    Activation Guide
                  </Link>
                  <a
                    href="https://wa.me/16019756129"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsDeskMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-slate-200 hover:bg-sky-600/10 hover:text-sky-400 transition-colors text-sm font-semibold"
                  >
                    <i className="fab fa-whatsapp text-sky-500 w-4"></i>
                    Contact Us
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-slate-800 pt-3">
            <div className="flex flex-col gap-3">
              {/* Product Categories Section */}
              <div className="border-b border-slate-700 pb-3 mb-1">
                <p className="text-sky-500 font-bold text-xs uppercase tracking-wider mb-2 px-1">Product Categories</p>
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
                className="text-white hover:text-sky-500 font-semibold transition-colors text-sm flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-box text-sky-500"></i>
                All Products
              </Link>
              <Link
                href="/partner-program"
                className="text-white hover:text-sky-500 font-semibold transition-colors text-sm flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-handshake text-sky-500"></i>
                Partner Program
              </Link>
              <Link
                href="/blog"
                className="text-white hover:text-sky-500 font-semibold transition-colors text-sm flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-blog text-sky-500"></i>
                Blog
              </Link>
              <Link
                href="/faq"
                className="text-white hover:text-sky-500 font-semibold transition-colors text-sm flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-question-circle text-sky-500"></i>
                FAQ
              </Link>
              <Link
                href="/activation-guide"
                className="text-white hover:text-sky-500 font-semibold transition-colors text-sm flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-key text-sky-500"></i>
                Activation Guide
              </Link>
              <a
                href="https://wa.me/16019756129"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-sky-500 font-semibold transition-colors text-sm flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fab fa-whatsapp text-sky-500"></i>
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
