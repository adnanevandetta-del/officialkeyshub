"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAccountData, signOut, displayName } from '../lib/account';

export default function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { account } = useAccountData();
  const isLoggedIn = !!account;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
        title="Account"
        aria-label="Account Menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[400]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="fixed md:absolute right-4 md:right-0 top-16 md:top-12 w-80 bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden z-[401]">
            {isLoggedIn ? (
              <>
                {/* Logged In Menu */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                  <p className="font-bold text-lg break-words">{displayName(account)}</p>
                  <p className="text-blue-100 text-sm break-all">{account?.email}</p>
                </div>
                <div className="py-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <i className="fas fa-user text-blue-600 w-5"></i>
                    <span className="text-gray-700 font-semibold">My Profile</span>
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <i className="fas fa-shopping-bag text-blue-600 w-5"></i>
                    <span className="text-gray-700 font-semibold">My Orders</span>
                  </Link>
                  <Link
                    href="/profile#licenses"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={() => { setIsOpen(false); setTimeout(() => window.dispatchEvent(new Event("hashchange")), 50); }}
                  >
                    <i className="fas fa-key text-blue-600 w-5"></i>
                    <span className="text-gray-700 font-semibold">My Licenses</span>
                  </Link>
                  <Link
                    href="/profile#settings"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={() => { setIsOpen(false); setTimeout(() => window.dispatchEvent(new Event("hashchange")), 50); }}
                  >
                    <i className="fas fa-cog text-blue-600 w-5"></i>
                    <span className="text-gray-700 font-semibold">Settings</span>
                  </Link>
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <button
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <i className="fas fa-sign-out-alt text-red-600 w-5"></i>
                      <span className="text-red-600 font-semibold">Sign Out</span>
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
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-3 bg-blue-600 text-white text-center font-bold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Sign In
                  </Link>
                </div>
                <div className="border-t border-gray-200 py-2">
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <i className="fas fa-history text-blue-600 w-5"></i>
                    <span className="text-gray-700 font-semibold">Order History</span>
                  </Link>
                  <Link
                    href="/faq"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
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
    </>
  );
}
