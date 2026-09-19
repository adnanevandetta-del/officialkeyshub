"use client";

import { useCart } from './CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getProductImage } from '../lib/productImage';

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mounted) return null;

  // Render into document.body so the fixed panel escapes the navbar's
  // backdrop-filter containing block (which otherwise clips it to nav height).
  return createPortal(
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity duration-300"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      />
      
      {/* Modal */}
      <div 
        className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-[#0a0d16] border-l border-white/10 shadow-2xl z-[9999] overflow-hidden flex flex-col"
        style={{ animation: 'slideInRight 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 flex-shrink-0 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-600/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-shopping-cart text-sky-500 text-lg"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <p className="text-slate-300 text-sm">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center transition-colors"
              aria-label="Close cart"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-shopping-cart text-slate-500 text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Your cart is empty</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-sm">
                Discover our products and add them to your cart to get started!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-sky-700 to-sky-800 text-white rounded-lg font-semibold hover:from-sky-800 hover:to-sky-800 transition-all shadow-md"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="p-5">
              {/* Cart Items */}
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white/[0.04] border border-white/10 rounded-xl p-4 hover:border-sky-500/40 hover:bg-white/[0.06] transition-all duration-200"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                        <Image
                          src={getProductImage(item.name)}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-white text-sm leading-tight pr-2 line-clamp-2">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-400 transition-colors flex-shrink-0 p-1"
                            aria-label="Remove item"
                          >
                            <i className="fas fa-trash text-sm"></i>
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sky-500 font-bold text-lg">{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-slate-500 text-xs line-through">{item.originalPrice}</span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors disabled:opacity-40"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <i className="fas fa-minus text-xs text-slate-300"></i>
                            </button>
                            <span className="w-10 text-center font-semibold text-white text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-sky-600/20 hover:bg-sky-600/30 flex items-center justify-center transition-colors"
                              aria-label="Increase quantity"
                            >
                              <i className="fas fa-plus text-xs text-sky-500"></i>
                            </button>
                          </div>
                          <span className="text-xs text-slate-400 ml-1">
                            ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              {cart.length > 1 && (
                <button
                  onClick={clearCart}
                  className="w-full py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold text-sm rounded-lg transition-colors"
                >
                  <i className="fas fa-trash-alt mr-2"></i>
                  Clear All Items
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer - Only show when cart has items */}
        {cart.length > 0 && (
          <div className="flex-shrink-0 border-t border-white/10 bg-white/[0.03] p-5">
            {/* Subtotal */}
            <div className="bg-white/[0.04] rounded-lg p-4 mb-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Subtotal</span>
                <span className="text-white font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Tax</span>
                <span className="text-white font-semibold">Calculated at checkout</span>
              </div>
              <div className="border-t border-white/10 pt-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-2xl font-black text-white">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full py-3.5 bg-gradient-to-r from-sky-700 to-sky-800 text-white text-center font-bold text-base rounded-lg hover:from-sky-800 hover:to-sky-800 transition-all shadow-lg hover:shadow-xl mb-2"
            >
              <i className="fas fa-lock mr-2"></i>
              Secure Checkout
            </Link>

            {/* Trust Badge */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                <i className="fas fa-shield-alt text-sky-700"></i>
                <span>Secure payment & instant delivery</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
