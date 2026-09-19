"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OrderList from '../components/OrderList';
import { useAccountData } from '../lib/account';

type Filter = 'all' | 'delivered' | 'pending';

export default function OrdersPage() {
  const { orders, ready } = useAccountData();
  const [filter, setFilter] = useState<Filter>('all');

  const shown = orders.filter((o) => filter === 'all' || o.status === filter);

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'delivered', label: 'Delivered', count: orders.filter((o) => o.status === 'delivered').length },
    { id: 'pending', label: 'Pending', count: orders.filter((o) => o.status === 'pending').length },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">Your order history on this device.</p>
          </div>

          <div className="flex gap-2 mb-6 bg-white rounded-xl p-2 shadow-md overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`flex-1 min-w-[110px] min-h-[44px] py-2.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                  filter === t.id ? 'bg-sky-700 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {t.label} ({t.count})
              </button>
            ))}
          </div>

          {ready && (
            <OrderList
              orders={shown}
              emptyText={
                filter === 'all'
                  ? "You haven't placed any orders on this device yet."
                  : 'No orders in this category.'
              }
            />
          )}

          <p className="mt-6 text-sm text-gray-500">
            <i className="fas fa-info-circle mr-2"></i>
            Orders are recorded when you start a checkout and are saved in this browser. Status changes you make here
            only update this history. Keys are sent to your email or WhatsApp after payment is confirmed. See{' '}
            <Link href="/profile" className="text-sky-700 font-semibold hover:underline">your profile</Link> to manage or
            export your data.
          </p>

          <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-headset text-3xl"></i>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-black mb-2">Need Help with Your Order?</h3>
                <p className="text-blue-100">Our support team is available 24/7 to assist you with any questions</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://wa.me/16019756129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  WhatsApp
                </a>
                <a
                  href="mailto:officialkeyshub@gmail.com"
                  className="px-6 py-3 bg-blue-800 text-white rounded-lg font-bold hover:bg-blue-900 transition-colors"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
