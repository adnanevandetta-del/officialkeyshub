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
    <nav className="sticky top-0 left-0 right-0 z-[200] bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-md shadow-md border-b border-slate-800">
      <div className="container mx-auto px-4 py-3">
        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between">
          {/* Left: Cart Icon */}
          <div className="flex items-center">
            <CartButton />
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Logo size="sm" />
          </div>

          {/* Right: Profile & Hamburger Menu - Increased gap to push profile far right */}
          <div className="flex items-center gap-8">
            <ProfileButton />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none p-2"
            >
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
            </button>
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
            <Link
              href="/#products"
              className="text-white hover:text-emerald-400 font-semibold transition-colors text-sm"
            >
              Products
            </Link>
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
