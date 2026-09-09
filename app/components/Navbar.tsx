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
    <nav className="sticky top-0 left-0 right-0 z-50 bg-blue-900/95 backdrop-blur-md shadow-md border-b border-blue-700">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="ml-2">
            <Logo size="sm" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#products"
              className="text-white hover:text-blue-200 font-semibold transition-colors text-sm"
            >
              Products
            </Link>
            <Link
              href="/partner-program"
              className="text-white hover:text-blue-200 font-semibold transition-colors text-sm flex items-center gap-1"
            >
              <i className="fas fa-handshake"></i>
              Partner Program
            </Link>
            <Link
              href="/blog"
              className="text-white hover:text-blue-200 font-semibold transition-colors text-sm"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-blue-200 font-semibold transition-colors text-sm"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="text-white hover:text-blue-200 font-semibold transition-colors text-sm"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-blue-700 pt-3">
            <div className="flex flex-col gap-3">
              <Link
                href="/#products"
                className="text-white hover:text-blue-200 font-semibold transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/partner-program"
                className="text-white hover:text-blue-200 font-semibold transition-colors text-sm flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-handshake"></i>
                Partner Program
              </Link>
              <Link
                href="/blog"
                className="text-white hover:text-blue-200 font-semibold transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-blue-200 font-semibold transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/faq"
                className="text-white hover:text-blue-200 font-semibold transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
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
              
              {/* Mobile Cart & Profile */}
              <div className="flex gap-3 pt-2 border-t border-blue-700">
                <CartButton />
                <ProfileButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
