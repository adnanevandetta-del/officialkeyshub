"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'licenses' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data - replace with actual auth
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&size=200&background=059669&color=fff',
    memberSince: 'January 2024',
    totalOrders: 12,
    totalSpent: 456.88
  });

  // Mock orders data
  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-03-15',
      product: 'Windows 11 Pro',
      price: '$19.99',
      status: 'Delivered',
      statusColor: 'emerald'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-03-10',
      product: 'Office 2021 Professional Plus',
      price: '$29.99',
      status: 'Delivered',
      statusColor: 'emerald'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-03-05',
      product: 'Windows 10 Pro',
      price: '$16.99',
      status: 'Delivered',
      statusColor: 'emerald'
    }
  ];

  // Mock licenses data
  const licenses = [
    {
      id: 1,
      product: 'Windows 11 Pro',
      key: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
      purchaseDate: '2024-03-15',
      status: 'Active',
      expiryDate: 'Lifetime'
    },
    {
      id: 2,
      product: 'Office 2021 Professional Plus',
      key: 'YYYYY-YYYYY-YYYYY-YYYYY-YYYYY',
      purchaseDate: '2024-03-10',
      status: 'Active',
      expiryDate: 'Lifetime'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with User Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <Image
                src={userData.avatar}
                alt={userData.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-emerald-500"
              />
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 shadow-lg">
                <i className="fas fa-camera"></i>
              </button>
            </div>

            {/* User Details */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-black text-gray-900 mb-2">{userData.name}</h1>
              <p className="text-gray-600 mb-2 flex items-center justify-center md:justify-start gap-2">
                <i className="fas fa-envelope text-emerald-600"></i>
                {userData.email}
              </p>
              <p className="text-sm text-gray-500">Member since {userData.memberSince}</p>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              <div className="text-center bg-emerald-50 rounded-xl px-6 py-4">
                <p className="text-3xl font-black text-emerald-600">{userData.totalOrders}</p>
                <p className="text-sm text-gray-600">Orders</p>
              </div>
              <div className="text-center bg-blue-50 rounded-xl px-6 py-4">
                <p className="text-3xl font-black text-blue-600">${userData.totalSpent}</p>
                <p className="text-sm text-gray-600">Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-4 font-bold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="fas fa-user mr-2"></i>
              Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 px-6 py-4 font-bold transition-colors ${
                activeTab === 'orders'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              Orders
            </button>
            <button
              onClick={() => setActiveTab('licenses')}
              className={`flex-1 px-6 py-4 font-bold transition-colors ${
                activeTab === 'licenses'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="fas fa-key mr-2"></i>
              Licenses
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-6 py-4 font-bold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="fas fa-cog mr-2"></i>
              Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-gray-900">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors"
                  >
                    <i className={`fas fa-${isEditing ? 'save' : 'edit'} mr-2`}></i>
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={userData.name}
                      disabled={!isEditing}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={userData.email}
                      disabled={!isEditing}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={userData.phone}
                      disabled={!isEditing}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Member Since</label>
                    <input
                      type="text"
                      value={userData.memberSince}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Change Password</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
                        <input
                          type="password"
                          placeholder="Enter current password"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-6">Order History</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-emerald-500 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-black text-gray-900">{order.id}</span>
                            <span className={`px-3 py-1 bg-${order.statusColor}-100 text-${order.statusColor}-700 rounded-full text-sm font-bold`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-gray-700 font-semibold mb-1">{order.product}</p>
                          <p className="text-sm text-gray-500">Ordered on {order.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-black text-emerald-600">{order.price}</span>
                          <Link
                            href={`/orders/${order.id}`}
                            className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Licenses Tab */}
            {activeTab === 'licenses' && (
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-6">My Licenses</h2>
                <div className="space-y-4">
                  {licenses.map((license) => (
                    <div key={license.id} className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border-2 border-emerald-200">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-black text-gray-900 mb-2">{license.product}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <code className="bg-white px-4 py-2 rounded-lg font-mono text-sm border-2 border-gray-200">
                              {license.key}
                            </code>
                            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors">
                              <i className="fas fa-copy"></i>
                            </button>
                          </div>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span><i className="fas fa-calendar mr-2 text-emerald-600"></i>Purchased: {license.purchaseDate}</span>
                            <span><i className="fas fa-infinity mr-2 text-blue-600"></i>{license.expiryDate}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                            <i className="fas fa-download mr-2"></i>
                            Download
                          </button>
                          <Link
                            href="/activation-guide"
                            className="px-6 py-2 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition-colors text-center"
                          >
                            <i className="fas fa-book mr-2"></i>
                            Guide
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Account Settings</h2>

                {/* Email Notifications */}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-emerald-600" />
                      <span className="text-gray-700">Order confirmations and updates</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-emerald-600" />
                      <span className="text-gray-700">Promotional offers and deals</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-emerald-600" />
                      <span className="text-gray-700">Newsletter and updates</span>
                    </label>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Privacy & Security</h3>
                  <div className="space-y-3">
                    <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                      <i className="fas fa-shield-alt mr-2"></i>
                      Enable Two-Factor Authentication
                    </button>
                    <button className="w-full md:w-auto px-6 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition-colors ml-0 md:ml-3">
                      <i className="fas fa-download mr-2"></i>
                      Download My Data
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                  <h3 className="text-lg font-bold text-red-900 mb-4">Danger Zone</h3>
                  <p className="text-red-700 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors">
                    <i className="fas fa-trash mr-2"></i>
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
