"use client";

import { useState } from 'react';
import { useCart } from './CartContext';
import CartModal from './CartModal';

export default function CartButton() {
  const { cartCount } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowCart(true)}
        className="relative w-10 h-10 flex items-center justify-center bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
        title="Shopping Cart"
      >
        <i className="fas fa-shopping-cart text-lg"></i>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {cartCount}
          </span>
        )}
      </button>

      {showCart && <CartModal onClose={() => setShowCart(false)} />}
    </>
  );
}
