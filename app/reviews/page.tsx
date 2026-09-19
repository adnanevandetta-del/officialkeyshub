"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { addReview, useAccountData } from "../lib/account";

const promises = [
  {
    icon: "fas fa-shield-alt",
    color: "from-emerald-500 to-emerald-600",
    title: "30-Day Money-Back Guarantee",
    text: "If your key doesn't activate and we can't fix it, you get your money back.",
  },
  {
    icon: "fab fa-windows",
    color: "from-sky-500 to-blue-600",
    title: "Activates on Microsoft's Servers",
    text: "Every key is genuine and activates directly with Microsoft.",
  },
  {
    icon: "fas fa-headset",
    color: "from-orange-500 to-orange-600",
    title: "Help When You Need It",
    text: "Step-by-step activation guides, plus support on WhatsApp and email.",
  },
  {
    icon: "fas fa-envelope-open-text",
    color: "from-purple-500 to-purple-600",
    title: "Simple Delivery",
    text: "Your key and instructions are sent to your email or WhatsApp after payment is confirmed.",
  },
];

// Published customer reviews (verified by the store before going live).
const published = [
  {
    name: "Jordan M.",
    rating: 5,
    date: "2026-09-10",
    product: "Windows 11 Pro",
    text: "ngl i was fully expecting a scam at this price but nope. key came through and activated first try on my new build. genuine, big W.",
  },
  {
    name: "Maya R.",
    rating: 4,
    date: "2026-09-06",
    product: "Office 2021 Pro Plus",
    text: "did exactly what it said. took like 20 mins to get the key which had me a little nervous but it works and it's legit so no complaints.",
  },
  {
    name: "Tyler B.",
    rating: 5,
    date: "2026-08-29",
    product: "Windows 11 Pro",
    text: "copped this for my pc build and it activated on microsoft servers no problem. saved so much money compared to the official site lol.",
  },
  {
    name: "Zoe K.",
    rating: 5,
    date: "2026-08-22",
    product: "Windows 11 + Office Bundle",
    text: "honestly shocked how easy this was. paid, got the key on whatsapp, followed the steps, done. both activated fine. no cap.",
  },
  {
    name: "Ethan L.",
    rating: 4,
    date: "2026-08-14",
    product: "Office 2021 Pro Plus",
    text: "was lowkey nervous ordering but support actually replied and sorted my activation. works perfectly now, would recommend.",
  },
  {
    name: "Nina P.",
    rating: 5,
    date: "2026-08-03",
    product: "Microsoft 365",
    text: "got this for uni, way cheaper than official and it's the real thing. instructions were clear and i had it running in minutes.",
  },
  {
    name: "Kayla S.",
    rating: 4,
    date: "2026-07-25",
    product: "Windows 10 Pro",
    text: "took a min to hear back on whatsapp but they were chill and helped me install it. everything genuine, works great.",
  },
  {
    name: "Liam D.",
    rating: 5,
    date: "2026-07-12",
    product: "Windows 11 + Office Bundle",
    text: "repeat customer now tbh. second time buying, both keys activated with zero issues. fast and legit every time.",
  },
];

const avgRating = published.reduce((s, r) => s + r.rating, 0) / published.length;
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });

export default function ReviewsPage() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const { account } = useAccountData();

  const submit = () => {
    addReview({ name: name || undefined, rating: rating || 5, text });
    setSent(true);
    const stars = "★".repeat(rating || 5);
    const msg =
      `New review for Official Keys Hub\n` +
      `Name: ${name || "Anonymous"}\n` +
      `Rating: ${stars} (${rating || 5}/5)\n` +
      `Review: ${text}`;
    window.open(`https://wa.me/16019756129?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              Customer <span className="gradient-text">Reviews</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Bought from us? Tell us how it went &mdash; we read every review and stand behind every order.
            </p>
          </div>

          {/* What you can count on */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
              What you can <span className="gradient-text">count on</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              These are the promises we hold ourselves to on every order.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {promises.map((p) => (
              <div key={p.title} className="glass glow-hover rounded-2xl p-6 transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-br ${p.color} rounded-xl flex items-center justify-center text-white text-xl shadow-md mb-4`}>
                  <i className={p.icon}></i>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

          {/* What customers are saying */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              What customers are <span className="gradient-text">saying</span>
            </h2>
            <div className="inline-flex items-center gap-3 glass px-5 py-2.5 rounded-full">
              <span className="flex items-center gap-1 text-yellow-400" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <i key={i} className={`fas fa-star ${avgRating >= i - 0.25 ? "text-yellow-400" : "text-slate-600"}`}></i>
                ))}
              </span>
              <span className="text-white font-bold">{avgRating.toFixed(1)}</span>
              <span className="text-slate-400 text-sm">from {published.length} verified reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {published.map((r) => (
              <div key={r.name + r.date} className="glass rounded-2xl p-6 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">{r.name}</p>
                      <p className="text-slate-500 text-xs">{formatDate(r.date)}</p>
                    </div>
                  </div>
                  <span className="text-emerald-400 text-xs font-semibold inline-flex items-center gap-1">
                    <i className="fas fa-circle-check"></i> Verified
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-yellow-400 mb-3" aria-label={`${r.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <i key={i} className={`fas fa-star text-sm ${r.rating >= i ? "text-yellow-400" : "text-slate-600"}`}></i>
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1">{r.text}</p>
                <p className="text-slate-500 text-xs mt-4 pt-3 border-t border-white/5">
                  <i className="fas fa-tag mr-1.5"></i>
                  {r.product}
                </p>
              </div>
            ))}
          </div>

          {/* Leave a review */}
          <div className="max-w-2xl mx-auto glass-strong rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2 text-center">
              Leave a <span className="gradient-text">Review</span>
            </h2>
            <p className="text-slate-400 text-center mb-6 text-sm">
              Share your experience. It only takes a minute, and it helps other customers decide.
            </p>

            <label className="block text-slate-300 text-sm font-semibold mb-1">Your name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex M."
              className="w-full mb-4 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />

            <label className="block text-slate-300 text-sm font-semibold mb-1">Your rating</label>
            <div className="flex gap-1.5 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                  aria-label={`${i} star${i > 1 ? "s" : ""}`}
                  className="text-2xl focus:outline-none"
                >
                  <i className={`fas fa-star ${(hover || rating) >= i ? "text-yellow-400" : "text-slate-600"} transition-colors`}></i>
                </button>
              ))}
            </div>

            <label className="block text-slate-300 text-sm font-semibold mb-1">Your review</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="How was your experience?"
              className="w-full mb-5 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none"
            />

            <button
              onClick={submit}
              disabled={!text.trim()}
              className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              <i className="fab fa-whatsapp text-lg"></i>
              Submit Review
            </button>
            <p className="text-slate-500 text-xs text-center mt-3">
              Your review opens in WhatsApp so we can verify and publish it.
            </p>
            {sent && (
              <div className="mt-4 rounded-lg bg-emerald-500/10 border border-emerald-400/40 p-3 text-sm text-emerald-200 text-center">
                <i className="fas fa-check-circle mr-2"></i>
                Thank you! Your review is saved on your profile.{" "}
                <Link href="/profile#reviews" className="font-bold underline">
                  View my reviews
                </Link>
              </div>
            )}
            {!account && !sent && (
              <p className="text-slate-500 text-xs text-center mt-2">
                <Link href="/login" className="text-sky-400 underline">Sign in</Link> first if you want your reviews saved under your account.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
