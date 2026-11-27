"use client";

import { useState } from 'react';
import { useCart } from './CartContext';
import CartModal from './CartModal';

export default function CartButton() {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative w-10 h-10 flex items-center justify-center bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-[0_6px_16px_-6px_rgba(5,150,105,0.6)]"
        title="Shopping Cart"
        aria-label="Shopping Cart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#e3611f] text-white text-[11px] font-bold rounded-full ring-2 ring-white flex items-center justify-center tabular-nums">
            {cartCount}
          </span>
        )}
      </button>

      {isOpen && <CartModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
