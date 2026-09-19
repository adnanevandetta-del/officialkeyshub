"use client";

import { useCart } from '../components/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { validatePromoCode, getStoredPromo } from '../lib/promo';
import { paypalPaymentUrl } from '../lib/payment';
import { getProductImage } from '../lib/productImage';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'usdt' | 'whatsapp' | null>(null);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPercent, setAppliedPercent] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
  });

  // Pre-fill with the customer's generated code if they have one.
  useEffect(() => {
    const stored = getStoredPromo();
    if (stored) setPromoInput(stored.code);
  }, []);

  const discountAmount = (cartTotal * appliedPercent) / 100;
  const discountedTotal = cartTotal - discountAmount;

  const applyPromo = () => {
    const percent = validatePromoCode(promoInput);
    if (percent > 0) {
      setAppliedPercent(percent);
      setAppliedCode(promoInput.trim().toUpperCase());
      setPromoError('');
    } else {
      setAppliedPercent(0);
      setAppliedCode('');
      setPromoError('Invalid promo code. Log in with your email to get a valid 30% code.');
    }
  };

  const removePromo = () => {
    setAppliedPercent(0);
    setAppliedCode('');
    setPromoError('');
  };

  const handleCheckout = () => {
    const orderDetails = cart.map(item => `${item.quantity}x ${item.name} - ${item.price}`).join('%0D%0A');
    const promoLine = appliedPercent > 0
      ? `%0D%0APromo Code: ${appliedCode} (-${appliedPercent}%25, -$${discountAmount.toFixed(2)})`
      : '';
    const total = discountedTotal.toFixed(2);

    if (paymentMethod === 'whatsapp') {
      const whatsappMessage = `Hi! I want to complete my order:%0D%0A%0D%0A${orderDetails}${promoLine}%0D%0A%0D%0ATotal: $${total}%0D%0A%0D%0ADelivery Email: ${formData.email}`;
      window.open(`https://wa.me/16019756129?text=${whatsappMessage}`, '_blank');
    } else if (paymentMethod === 'paypal') {
      // Pay the store's PayPal account (officialkeyshub@gmail.com) directly.
      const itemName = cart.map((i) => `${i.quantity}x ${i.name}`).join(', ');
      window.location.href = paypalPaymentUrl(`Official Keys Hub — ${itemName}`, discountedTotal, formData.email);
    } else if (paymentMethod === 'usdt') {
      const emailSubject = `Order Request - USDT Payment`;
      const emailBody = `Hi, I want to complete my order via USDT:%0D%0A%0D%0A${orderDetails}${promoLine}%0D%0A%0D%0ATotal: $${total}%0D%0A%0D%0ADelivery Email: ${formData.email}`;
      window.location.href = `mailto:officialkeyshub@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      // Note: order/support email standardized to officialkeyshub@gmail.com
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <i className="fas fa-shopping-cart text-gray-300 text-8xl mb-6"></i>
            <h1 className="text-3xl font-black text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-sky-700 text-white font-bold rounded-lg hover:bg-sky-800 transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your order and get your keys instantly</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Email */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <i className="fas fa-envelope text-sky-700"></i>
                  Delivery Email
                </h2>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-600 focus:outline-none"
                    placeholder="john.doe@example.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">Your license keys will be delivered to this email</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <i className="fas fa-credit-card text-sky-700"></i>
                  Payment Method
                </h2>
                <div className="space-y-4">
                  {/* PayPal */}
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`w-full p-5 rounded-xl border-2 transition-all flex items-center justify-between ${
                      paymentMethod === 'paypal'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <i className="fab fa-paypal text-blue-600 text-3xl"></i>
                      <div className="text-left">
                        <p className="font-bold text-gray-900">PayPal</p>
                        <p className="text-sm text-gray-600">Secure payment via PayPal</p>
                      </div>
                    </div>
                    {paymentMethod === 'paypal' && (
                      <i className="fas fa-check-circle text-blue-600 text-2xl"></i>
                    )}
                  </button>

                  {/* USDT */}
                  <button
                    onClick={() => setPaymentMethod('usdt')}
                    className={`w-full p-5 rounded-xl border-2 transition-all flex items-center justify-between ${
                      paymentMethod === 'usdt'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <i className="fab fa-bitcoin text-green-600 text-3xl"></i>
                      <div className="text-left">
                        <p className="font-bold text-gray-900">USDT (Cryptocurrency)</p>
                        <p className="text-sm text-gray-600">Pay with crypto (USDT)</p>
                      </div>
                    </div>
                    {paymentMethod === 'usdt' && (
                      <i className="fas fa-check-circle text-green-600 text-2xl"></i>
                    )}
                  </button>

                  {/* WhatsApp */}
                  <button
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`w-full p-5 rounded-xl border-2 transition-all flex items-center justify-between ${
                      paymentMethod === 'whatsapp'
                        ? 'border-sky-600 bg-sky-50'
                        : 'border-gray-200 hover:border-sky-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <i className="fab fa-whatsapp text-sky-700 text-3xl"></i>
                      <div className="text-left">
                        <p className="font-bold text-gray-900">WhatsApp</p>
                        <p className="text-sm text-gray-600">Chat & pay via WhatsApp</p>
                      </div>
                    </div>
                    {paymentMethod === 'whatsapp' && (
                      <i className="fas fa-check-circle text-sky-700 text-2xl"></i>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-200">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image src={getProductImage(item.name)} alt={item.name} fill unoptimized className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sky-700 font-bold">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code */}
                <div className="border-t-2 border-gray-200 pt-4 mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <i className="fas fa-gift text-sky-700 mr-1"></i>
                    Promo Code
                  </label>
                  {appliedPercent > 0 ? (
                    <div className="flex items-center justify-between bg-sky-50 border-2 border-sky-200 rounded-lg px-4 py-3">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-check-circle text-sky-700"></i>
                        <div>
                          <p className="font-bold text-sky-800 font-mono text-sm">{appliedCode}</p>
                          <p className="text-xs text-sky-700">{appliedPercent}% discount applied</p>
                        </div>
                      </div>
                      <button
                        onClick={removePromo}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove promo code"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="KEYS30-XXXX"
                          className="flex-1 min-w-0 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-600 focus:outline-none font-mono uppercase"
                        />
                        <button
                          onClick={applyPromo}
                          className="px-5 py-3 bg-sky-700 text-white rounded-lg font-bold hover:bg-sky-800 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError ? (
                        <p className="text-xs text-red-500 mt-2">{promoError}</p>
                      ) : (
                        <p className="text-xs text-gray-500 mt-2">
                          No code?{' '}
                          <Link href="/login" className="text-sky-700 font-semibold hover:underline">
                            Log in with your email
                          </Link>{' '}
                          to get 30% off.
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Total */}
                <div className="border-t-2 border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                  </div>
                  {appliedPercent > 0 && (
                    <div className="flex justify-between items-center mb-2 text-sky-700">
                      <span>Discount ({appliedPercent}%):</span>
                      <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xl font-black">
                    <span>Total:</span>
                    <span className="text-sky-700">${discountedTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={!paymentMethod || !formData.email}
                  className={`w-full py-4 rounded-xl font-black text-lg transition-all ${
                    paymentMethod && formData.email
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <i className="fas fa-lock mr-2"></i>
                  Complete Order
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
                    <div className="flex flex-col items-center">
                      <i className="fas fa-shield-alt text-sky-700 text-xl mb-1"></i>
                      <span>Secure</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <i className="fas fa-bolt text-yellow-500 text-xl mb-1"></i>
                      <span>Instant</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <i className="fas fa-undo text-blue-600 text-xl mb-1"></i>
                      <span>Refund</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
