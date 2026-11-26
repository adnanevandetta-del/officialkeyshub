"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "../components/CartContext";
import { trackEvent } from "../lib/analytics";

const WHATSAPP = "https://wa.me/16019756129";
const SUPPORT_EMAIL = "officialkeyshub@gmail.com";

export default function ThankYouContent() {
  const params = useSearchParams();
  const cancelled = params.get("cancelled") === "1";
  const item = params.get("item") ?? "";
  const amount = parseFloat(params.get("amount") ?? "") || 0;
  const { clearCart } = useCart();

  useEffect(() => {
    if (cancelled) {
      trackEvent("paypal_cancelled");
      return;
    }
    clearCart();
    // Report the purchase once per return (refreshing the page must not double count).
    const key = `oh_purchase_${item}_${amount}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {}
    trackEvent("purchase", {
      currency: "USD",
      value: amount,
      transaction_id: params.get("tx") ?? undefined,
      items: item ? [{ item_name: item, price: amount, quantity: 1 }] : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelled]);

  if (cancelled) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl">
          <i className="fas fa-circle-pause"></i>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Payment not completed</h1>
        <p className="text-gray-600 mb-8">
          You left PayPal before paying, so nothing was charged. Had a problem at checkout? Message us and
          we&apos;ll help you finish your order — or pay with USDT or WhatsApp instead.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products" className="px-6 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors">
            Back to products
          </Link>
          <a
            href={`${WHATSAPP}?text=${encodeURIComponent("Hi! I had trouble paying with PayPal. Can you help?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <i className="fab fa-whatsapp text-[#25D366] mr-2"></i>Get help on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-10">
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl">
          <i className="fas fa-check"></i>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          Thank you — <span className="gradient-text">payment received</span>
        </h1>
        {item && (
          <p className="text-gray-700 font-semibold">
            {item}
            {amount > 0 && <span className="text-gray-500 font-normal"> · ${amount.toFixed(2)}</span>}
          </p>
        )}
      </div>

      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">What happens next</h2>
        <ol className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sky-600 text-white text-sm font-bold flex items-center justify-center">1</span>
            <span>We confirm your PayPal payment (PayPal also emails you a receipt).</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sky-600 text-white text-sm font-bold flex items-center justify-center">2</span>
            <span>
              Your license key and activation steps are sent to <strong>your PayPal email</strong> (or the delivery
              email you entered at checkout), usually within minutes.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sky-600 text-white text-sm font-bold flex items-center justify-center">3</span>
            <span>
              Activate it with our <Link href="/activation-guide" className="text-sky-700 font-semibold hover:underline">step-by-step activation guide</Link>.
            </span>
          </li>
        </ol>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Nothing after 30 minutes? Check your spam folder, then contact us with your PayPal transaction ID — we&apos;ll
        sort it out fast.
      </p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center text-xl mx-auto sm:mx-0">
          <i className="fas fa-star"></i>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="font-bold text-gray-900">Once your key is activated, tell others how it went</p>
          <p className="text-sm text-gray-600">
            We&apos;re a new store and only publish real reviews from real orders. An honest review, good or bad,
            takes a minute and helps other buyers decide.
          </p>
        </div>
        <Link
          href="/reviews"
          className="flex-shrink-0 text-center px-5 py-3 rounded-xl font-bold text-white bg-sky-700 hover:bg-sky-800 transition-colors"
        >
          Leave a review
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`${WHATSAPP}?text=${encodeURIComponent(`Hi! I just paid with PayPal for ${item || "a key"}. Can you confirm my order?`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center px-6 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
        >
          <i className="fab fa-whatsapp mr-2"></i>Message us on WhatsApp
        </a>
        <a
          href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("PayPal order: " + (item || "license key"))}`}
          className="flex-1 text-center px-6 py-3 rounded-xl font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <i className="fas fa-envelope mr-2"></i>Email support
        </a>
      </div>
    </div>
  );
}
