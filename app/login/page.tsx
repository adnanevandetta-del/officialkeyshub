"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { savePromoForEmail } from '../lib/promo';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate with a backend.
    // Generate the customer's personal 20% promo code from their email.
    if (formData.email) {
      savePromoForEmail(formData.email);
    }
    // Both login and sign up land on the profile, where the code is shown.
    router.push('/profile');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-600 to-sky-700 rounded-full mb-4 shadow-lg">
              <i className="fas fa-user-circle text-white text-3xl"></i>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to access your orders and licenses' : 'Join us to get genuine Microsoft keys'}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-800 px-4 py-2 rounded-full text-sm font-bold">
              <i className="fas fa-gift"></i>
              Log in with your email to unlock your 30% OFF code
            </div>
          </div>

          {/* Login/Register Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                  isLogin
                    ? 'bg-white text-sky-700 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                  !isLogin
                    ? 'bg-white text-sky-700 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name (Register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-600 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-600 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-600 focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Confirm Password (Register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-600 focus:outline-none transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              {/* Forgot Password (Login only) */}
              {isLogin && (
                <div className="flex justify-end">
                  <a
                    href="https://wa.me/16019756129?text=Hi%2C%20I%20need%20help%20recovering%20my%20account%20password."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sky-700 hover:text-sky-800 font-semibold"
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-sky-700 to-sky-800 text-white font-black text-lg rounded-xl hover:from-sky-800 hover:to-sky-800 transition-all shadow-lg hover:shadow-xl"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-semibold">OR</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <i className="fab fa-google text-red-500 text-xl"></i>
                Continue with Google
              </button>
              <button className="w-full py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <i className="fab fa-facebook text-blue-600 text-xl"></i>
                Continue with Facebook
              </button>
            </div>

            {/* Guest Checkout */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 text-sm mb-3">Don't want to create an account?</p>
              <Link
                href="/checkout"
                className="inline-block text-sky-700 hover:text-sky-800 font-bold text-sm"
              >
                Continue as Guest →
              </Link>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border-2 border-gray-200 text-center">
              <i className="fas fa-key text-sky-700 text-2xl mb-2"></i>
              <p className="text-xs font-semibold text-gray-700">Access Your Licenses</p>
            </div>
            <div className="bg-white rounded-xl p-4 border-2 border-gray-200 text-center">
              <i className="fas fa-history text-blue-600 text-2xl mb-2"></i>
              <p className="text-xs font-semibold text-gray-700">Order History</p>
            </div>
            <div className="bg-white rounded-xl p-4 border-2 border-gray-200 text-center">
              <i className="fas fa-headset text-purple-600 text-2xl mb-2"></i>
              <p className="text-xs font-semibold text-gray-700">Priority Support</p>
            </div>
            <div className="bg-white rounded-xl p-4 border-2 border-sky-400 text-center ring-1 ring-sky-200">
              <i className="fas fa-percent text-sky-700 text-2xl mb-2"></i>
              <p className="text-xs font-semibold text-gray-700">30% Off Promo Code</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
