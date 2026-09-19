"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OrderList from '../components/OrderList';
import { getStoredPromo, PROMO_PERCENT, type StoredPromo } from '../lib/promo';
import {
  useAccountData,
  saveAccount,
  signOut,
  deleteAllData,
  exportData,
  displayName,
  money,
} from '../lib/account';

type Tab = 'profile' | 'orders' | 'licenses' | 'settings';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ProfilePage() {
  const { account, orders, ready } = useAccountData();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [formError, setFormError] = useState('');
  const [saved, setSaved] = useState(false);
  const [promo, setPromo] = useState<StoredPromo | null>(null);
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Open the right tab from the URL hash (e.g. /profile#licenses).
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'orders' || hash === 'licenses' || hash === 'settings' || hash === 'profile') {
        setActiveTab(hash);
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  useEffect(() => {
    setPromo(getStoredPromo());
    if (account && !isEditing) {
      setForm({ name: account.name, email: account.email, phone: account.phone });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const copyPromo = () => {
    if (!promo) return;
    try {
      navigator.clipboard.writeText(promo.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — ignore
    }
  };

  const saveProfile = () => {
    if (!EMAIL_RE.test(form.email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    saveAccount(form);
    setPromo(getStoredPromo());
    setFormError('');
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const downloadData = () => {
    const blob = new Blob([exportData()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'officialkeyshub-my-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!ready) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] bg-gray-50" />
        <Footer />
      </>
    );
  }

  // Not signed in: nothing to show, so no made-up profile.
  if (!account) {
    return (
      <>
        <Navbar />
        <div className="min-h-[70vh] bg-gray-50 py-12 px-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-2xl">
              <i className="fas fa-user"></i>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">Sign in to see your profile</h1>
            <p className="text-gray-600 mb-6">
              Sign in with your email to see your account, your orders and your personal {PROMO_PERCENT}% off code.
            </p>
            <Link
              href="/login?next=/profile"
              className="block w-full min-h-[48px] py-3 bg-sky-700 text-white font-bold rounded-lg hover:bg-sky-800 transition-colors"
            >
              Sign In
            </Link>
            <Link href="/orders" className="inline-block mt-4 text-sm text-sky-700 font-semibold hover:underline">
              View my orders on this device
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const shownName = displayName(account);
  const initials = shownName
    .split(/[\s._-]+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const activeOrders = orders.filter((o) => o.status !== 'cancelled');
  const delivered = orders.filter((o) => o.status === 'delivered');
  const spent = delivered.reduce((sum, o) => sum + o.total, 0);
  const memberSince = new Date(account.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'profile', label: 'Profile', icon: 'fa-user' },
    { id: 'orders', label: 'Orders', icon: 'fa-shopping-bag' },
    { id: 'licenses', label: 'Licenses', icon: 'fa-key' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 md:py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
              <div className="w-[96px] h-[96px] md:w-[120px] md:h-[120px] rounded-full border-4 border-sky-600 bg-gradient-to-br from-sky-600 to-cyan-600 flex items-center justify-center text-white text-3xl md:text-4xl font-black select-none flex-shrink-0">
                {initials || <i className="fas fa-user"></i>}
              </div>

              <div className="flex-1 text-center md:text-left min-w-0">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 break-words">{shownName}</h1>
                <p className="text-gray-600 mb-2 flex items-center justify-center md:justify-start gap-2 break-all">
                  <i className="fas fa-envelope text-sky-700"></i>
                  {account.email}
                </p>
                <p className="text-sm text-gray-500">Member since {memberSince}</p>
              </div>

              <div className="flex gap-3 md:gap-4">
                <div className="text-center bg-sky-50 rounded-xl px-5 md:px-6 py-3 md:py-4">
                  <p className="text-2xl md:text-3xl font-black text-sky-700">{activeOrders.length}</p>
                  <p className="text-sm text-gray-600">Orders</p>
                </div>
                <div className="text-center bg-blue-50 rounded-xl px-5 md:px-6 py-3 md:py-4">
                  <p className="text-2xl md:text-3xl font-black text-blue-600">{money(spent)}</p>
                  <p className="text-sm text-gray-600">Delivered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Code Card */}
          {promo && (
            <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6 bg-gradient-to-r from-sky-700 via-sky-700 to-cyan-600 p-5 md:p-8">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-12 -left-6 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-6">
                <div className="text-white">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3">
                    <i className="fas fa-gift"></i>
                    YOUR EXCLUSIVE REWARD
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black mb-1">{PROMO_PERCENT}% OFF Your Next Order</h2>
                  <p className="text-white/80 text-sm">
                    Use this code at checkout. Tied to <span className="font-semibold break-all">{promo.email}</span>.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-xl px-4 md:px-5 py-3 border-2 border-dashed border-white/60 shadow-inner">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Promo Code</p>
                    <p className="text-xl md:text-2xl font-black text-sky-800 font-mono tracking-wider">{promo.code}</p>
                  </div>
                  <button
                    onClick={copyPromo}
                    className="h-14 px-5 bg-white text-sky-800 rounded-xl font-bold hover:bg-sky-50 transition-colors flex items-center gap-2"
                  >
                    <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex-1 min-h-[52px] px-4 md:px-6 py-3 font-bold whitespace-nowrap transition-colors ${
                    activeTab === t.id ? 'bg-sky-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className={`fas ${t.icon} mr-2`}></i>
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-4 md:p-6">
              {/* Profile */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
                    <h2 className="text-2xl font-black text-gray-900">Personal Information</h2>
                    <div className="flex items-center gap-3">
                      {saved && <span className="text-sm font-semibold text-emerald-600"><i className="fas fa-check mr-1"></i>Saved</span>}
                      <button
                        onClick={() => (isEditing ? saveProfile() : setIsEditing(true))}
                        className="min-h-[44px] px-6 py-2 bg-sky-700 text-white rounded-lg font-bold hover:bg-sky-800 transition-colors"
                      >
                        <i className={`fas fa-${isEditing ? 'save' : 'edit'} mr-2`}></i>
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        placeholder="Add your name"
                        disabled={!isEditing}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none disabled:bg-gray-50 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        disabled={!isEditing}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          setFormError('');
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none disabled:bg-gray-50 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        placeholder="Add your phone number"
                        disabled={!isEditing}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none disabled:bg-gray-50 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Member Since</label>
                      <input
                        type="text"
                        value={memberSince}
                        disabled
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-base"
                      />
                    </div>
                  </div>
                  {formError && <p className="text-sm text-red-600 mt-3">{formError}</p>}
                  {isEditing && (
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormError('');
                        setForm({ name: account.name, email: account.email, phone: account.phone });
                      }}
                      className="mt-4 text-sm text-gray-600 hover:text-gray-900 font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )}

              {/* Orders */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-6">Order History</h2>
                  <OrderList orders={orders} emptyText="You haven't placed any orders on this device yet." />
                </div>
              )}

              {/* Licenses */}
              {activeTab === 'licenses' && (
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">My Licenses</h2>
                  <p className="text-gray-600 mb-6">
                    Products from orders you marked as delivered. Keys are sent to your email or WhatsApp and are not
                    stored on this site.
                  </p>
                  {delivered.length === 0 ? (
                    <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-gray-200">
                      <i className="fas fa-key text-gray-300 text-5xl mb-3"></i>
                      <p className="text-gray-700 font-semibold mb-1">No delivered licenses yet</p>
                      <p className="text-gray-500 text-sm">
                        When you receive a key, open the order and tap &quot;I received my key&quot;.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {delivered.flatMap((o) =>
                        o.items.map((item, idx) => (
                          <div
                            key={`${o.id}-${idx}`}
                            className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4 md:p-5 border-2 border-sky-200 flex flex-col md:flex-row md:items-center justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <h3 className="text-lg font-black text-gray-900 break-words">{item.name}</h3>
                              <p className="text-sm text-gray-600">
                                <i className="fas fa-calendar mr-2 text-sky-700"></i>
                                Purchased {new Date(o.date).toLocaleDateString()} · Order {o.id}
                              </p>
                              <p className="text-sm text-gray-600">
                                <i className="fas fa-envelope mr-2 text-sky-700"></i>
                                Key sent to {o.email || account.email}
                              </p>
                            </div>
                            <a
                              href={`https://wa.me/16019756129?text=${encodeURIComponent(`Hi! I need help activating ${item.name} (order ${o.id})`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="min-h-[44px] inline-flex items-center justify-center px-5 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm"
                            >
                              <i className="fab fa-whatsapp mr-2"></i>
                              Activation help
                            </a>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Settings */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-gray-900">Account Settings</h2>

                  <div className="bg-gray-50 rounded-xl p-5 md:p-6 border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Your data</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Your profile and order history are saved in this browser on this device only. They are not on our
                      servers, so they won&apos;t appear on other devices or if you clear your browser data.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={downloadData}
                        className="min-h-[44px] px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
                      >
                        <i className="fas fa-download mr-2"></i>
                        Download My Data
                      </button>
                      <button
                        onClick={signOut}
                        className="min-h-[44px] px-6 py-2.5 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition-colors"
                      >
                        <i className="fas fa-sign-out-alt mr-2"></i>
                        Sign Out
                      </button>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-xl p-5 md:p-6 border-2 border-red-200">
                    <h3 className="text-lg font-bold text-red-900 mb-2">Delete my data</h3>
                    <p className="text-red-700 text-sm mb-4">
                      This removes your profile, promo code and order history from this device. It can&apos;t be undone.
                    </p>
                    {confirmDelete ? (
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => {
                            deleteAllData();
                            setConfirmDelete(false);
                          }}
                          className="min-h-[44px] px-6 py-2.5 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
                        >
                          <i className="fas fa-trash mr-2"></i>
                          Yes, delete everything
                        </button>
                        <button
                          onClick={() => setConfirmDelete(false)}
                          className="min-h-[44px] px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                        >
                          Keep my data
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(true)}
                        className="min-h-[44px] px-6 py-2.5 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
                      >
                        <i className="fas fa-trash mr-2"></i>
                        Delete My Data
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
