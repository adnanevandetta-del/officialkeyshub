"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Order {
  id: string;
  date: string;
  status: 'completed' | 'processing' | 'pending';
  total: string;
  items: {
    name: string;
    price: string;
    quantity: number;
    license?: string;
  }[];
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'processing'>('all');

  // Mock orders data
  const orders: Order[] = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'completed',
      total: '$49.98',
      items: [
        { name: 'Windows 11 Pro', price: '$19.99', quantity: 1, license: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX' },
        { name: 'Office 2021 Pro Plus', price: '$29.99', quantity: 1, license: 'YYYYY-YYYYY-YYYYY-YYYYY-YYYYY' }
      ]
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'processing',
      total: '$39.99',
      items: [
        { name: 'Office 365 Personal', price: '$39.99', quantity: 1 }
      ]
    },
  ];

  const filteredOrders = orders.filter(order => 
    activeTab === 'all' || order.status === activeTab
  );

  const getStatusBadge = (status: string) => {
    const badges = {
      completed: 'bg-green-100 text-green-700 border-green-300',
      processing: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      pending: 'bg-gray-100 text-gray-700 border-gray-300'
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      completed: 'fa-check-circle',
      processing: 'fa-clock',
      pending: 'fa-hourglass-half'
    };
    return icons[status as keyof typeof icons] || icons.pending;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">View and manage your order history and licenses</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 bg-white rounded-xl p-2 shadow-md">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 min-w-[100px] py-3 rounded-lg font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 min-w-[100px] py-3 rounded-lg font-bold transition-all ${
                activeTab === 'completed'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab('processing')}
              className={`flex-1 min-w-[100px] py-3 rounded-lg font-bold transition-all ${
                activeTab === 'processing'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Processing
            </button>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <i className="fas fa-shopping-bag text-gray-300 text-6xl mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Found</h2>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet</p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border-2 border-gray-200 hover:border-emerald-500 transition-all">
                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Order ID</p>
                        <p className="font-bold text-gray-900">{order.id}</p>
                      </div>
                      <div className="hidden md:block w-px h-12 bg-gray-300"></div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Date</p>
                        <p className="font-bold text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusBadge(order.status)} flex items-center gap-2`}>
                        <i className={`fas ${getStatusIcon(order.status)}`}></i>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gray-50 p-4 rounded-lg">
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 mb-1">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right md:text-left md:w-32">
                          <p className="font-bold text-emerald-600">{item.price}</p>
                        </div>
                        {item.license && (
                          <div className="md:flex-1">
                            <div className="bg-white border-2 border-emerald-500 rounded-lg p-3">
                              <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                                <i className="fas fa-key text-emerald-600"></i>
                                License Key:
                              </p>
                              <p className="font-mono text-sm font-bold text-gray-900 break-all">{item.license}</p>
                              <button className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold mt-2 flex items-center gap-1">
                                <i className="fas fa-copy"></i>
                                Copy Key
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                      <p className="text-2xl font-black text-gray-900">{order.total}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm">
                        <i className="fas fa-download mr-2"></i>
                        Download Receipt
                      </button>
                      <a
                        href="https://wa.me/16019756129"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-sm"
                      >
                        <i className="fab fa-whatsapp mr-2"></i>
                        Get Support
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Help Section */}
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
              <div className="flex flex-wrap gap-3">
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
                  href="mailto:digitalkeyhubllc@gmail.com"
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
