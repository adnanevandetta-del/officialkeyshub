"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ProfileButton() {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // In real app, use auth context

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
        title="Account"
        aria-label="Account Menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-[210]"
            onClick={() => setShowMenu(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-72 md:w-80 bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden z-[220]"
            style={{
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            {isLoggedIn ? (
              <>
                {/* Logged In Menu */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                  <p className="font-bold text-lg">John Doe</p>
                  <p className="text-blue-100 text-sm">john.doe@email.com</p>
                </div>
                <div className="py-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    <i className="fas fa-user text-blue-600 w-5"></i>
                    <span className="text-gray-700 font-semibold">My Profile</span>
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    <i className="fas fa-shopping-bag text-blue-600 w-5"></i>
                    <span className="text-gray-700 font-semibold">My Orders</span>
                  </Link>
                  <Link
                    href="/licenses"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    <i className="fas fa-key text-blue-600 w-5"></i>
                    <span className="text-gray-700 font-semibold">My Licenses</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    <i className="fas fa-cog text-blue-600 w-5"></i>
                    <span className="text-gray-700 font-semibold">Settings</span>
                  </Link>
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        setShowMenu(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <i className="fas fa-sign-out-alt text-red-600 w-5"></i>
                      <span className="text-red-600 font-semibold">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Not Logged In Menu */}
                <div className="p-4">
                  <p className="text-gray-700 font-semibold mb-4">Welcome! Sign in to continue</p>
                  <Link
                    href="/login"
                    onClick={() => setShowMenu(false)}
                    className="block w-full py-3 bg-blue-600 text-white text-center font-bold rounded-lg hover:bg-blue-700 transition-colors mb-2"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setShowMenu(false)}
                    className="block w-full py-3 bg-gray-100 text-gray-700 text-center font-bold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <i className="fas fa-user-plus mr-2"></i>
                    Create Account
                  </Link>
                </div>
                <div className="border-t border-gray-200 py-2">
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    <i className="fas fa-box text-blue-600 w-5"></i>
                    <span className="text-gray-700 font-semibold">Track Order</span>
                  </Link>
                  <Link
                    href="/faq"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    <i className="fas fa-question-circle text-blue-600 w-5"></i>
                    <span className="text-gray-700 font-semibold">Help & FAQ</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
