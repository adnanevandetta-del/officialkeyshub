"use client";

import { useCart } from './CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[500] transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-[501] overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 flex-shrink-0 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-shopping-cart text-emerald-400 text-lg"></i>
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
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-shopping-cart text-gray-300 text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-sm">
                Discover our products and add them to your cart to get started!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md"
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
                    className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 text-sm leading-tight pr-2 line-clamp-2">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 p-1"
                            aria-label="Remove item"
                          >
                            <i className="fas fa-trash text-sm"></i>
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-emerald-600 font-bold text-lg">{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-gray-400 text-xs line-through">{item.originalPrice}</span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <i className="fas fa-minus text-xs text-gray-600"></i>
                            </button>
                            <span className="w-10 text-center font-semibold text-gray-900 text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                              aria-label="Increase quantity"
                            >
                              <i className="fas fa-plus text-xs text-emerald-600"></i>
                            </button>
                          </div>
                          <span className="text-xs text-gray-500 ml-1">
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
          <div className="flex-shrink-0 border-t border-gray-200 bg-gray-50 p-5">
            {/* Subtotal */}
            <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">Subtotal</span>
                <span className="text-gray-900 font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">Tax</span>
                <span className="text-gray-900 font-semibold">Calculated at checkout</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="text-2xl font-black text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center font-bold text-base rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl mb-2"
            >
              <i className="fas fa-lock mr-2"></i>
              Secure Checkout
            </Link>

            <button
              onClick={onClose}
              className="w-full py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-semibold text-sm rounded-lg transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Continue Shopping
            </button>

            {/* Trust Badge */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                <i className="fas fa-shield-alt text-emerald-600"></i>
                <span>Secure payment & instant delivery</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
