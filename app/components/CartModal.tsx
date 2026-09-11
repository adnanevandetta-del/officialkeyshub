"use client";

import { useCart } from './CartContext';
import Image from 'next/image';
import Link from 'next/link';

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[500]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-[501] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black flex items-center gap-2">
                <i className="fas fa-shopping-cart"></i>
                Shopping Cart
              </h2>
              <p className="text-emerald-100 text-sm">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-shopping-cart text-gray-300 text-6xl mb-4"></i>
              <p className="text-gray-500 text-lg font-semibold mb-2">Your cart is empty</p>
              <p className="text-gray-400 text-sm mb-6">Add some products to get started!</p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-gray-50 rounded-xl p-4 border-2 border-gray-200"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{item.name}</h3>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-emerald-600 font-black text-lg">{item.price}</span>
                        <span className="text-gray-400 text-sm line-through">{item.originalPrice}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
                        >
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                        <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 bg-emerald-600 hover:bg-emerald-700 text-white rounded flex items-center justify-center"
                        >
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-500 hover:text-red-600"
                        >
                          <i className="fas fa-trash text-sm"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  <i className="fas fa-trash mr-2"></i>
                  Clear Cart
                </button>
              </div>

              {/* Footer */}
              <div className="border-t-2 border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 font-semibold">Subtotal:</span>
                  <span className="text-2xl font-black text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center font-black text-lg rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg mb-3"
                >
                  <i className="fas fa-lock mr-2"></i>
                  Proceed to Checkout
                </Link>

                <button
                  onClick={onClose}
                  className="w-full py-3 text-gray-600 hover:text-gray-800 font-semibold text-sm"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
