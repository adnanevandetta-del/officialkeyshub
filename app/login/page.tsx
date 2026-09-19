"use client";

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAccountData, saveAccount, signOut, displayName } from '../lib/account';
import { PROMO_PERCENT } from '../lib/promo';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { account, ready } = useAccountData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Only allow redirects to pages on this site.
  const next = params.get('next');
  const destination = next && next.startsWith('/') && !next.startsWith('//') ? next : '/profile';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    saveAccount({ name, email });
    router.push(destination);
  };

  if (!ready) return null;

  if (account) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl">
          <i className="fas fa-user-check"></i>
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-1">You&apos;re signed in</h1>
        <p className="text-gray-600 mb-6 break-all">
          {displayName(account)} · {account.email}
        </p>
        <div className="space-y-3">
          <Link
            href="/profile"
            className="block w-full min-h-[48px] py-3 bg-sky-700 text-white font-bold rounded-lg hover:bg-sky-800 transition-colors"
          >
            Go to My Profile
          </Link>
          <button
            onClick={signOut}
            className="w-full min-h-[44px] py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8" noValidate>
      <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">Sign in</h1>
      <p className="text-gray-600 mb-6">
        Enter your email to see your orders and get your personal <strong>{PROMO_PERCENT}% off</strong> code.
      </p>

      <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="login-name">Name (optional)</label>
      <input
        id="login-name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 mb-4 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none text-base"
      />

      <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="login-email">Email</label>
      <input
        id="login-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError('');
        }}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none text-base"
      />
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

      <button
        type="submit"
        className="w-full min-h-[48px] mt-6 py-3 bg-sky-700 text-white font-bold rounded-lg hover:bg-sky-800 transition-colors"
      >
        Continue
      </button>

      <p className="text-xs text-gray-500 mt-4">
        <i className="fas fa-lock mr-1"></i>
        No password needed. Your details and order history are saved in this browser on this device only — we
        don&apos;t store them on our servers.
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-[70vh] bg-gray-50 py-10 md:py-16 px-4">
        <div className="max-w-md mx-auto">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
}
