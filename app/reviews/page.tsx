"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Review = {
  name: string;
  initials: string;
  color: string;
  rating: number;
  text: string;
};

const reviews: Review[] = [
  {
    name: "Jordan R.",
    initials: "JR",
    color: "from-sky-600 to-sky-700",
    rating: 4.5,
    text: "ngl i was lowkey scared this was a scam 😭 but my windows 11 pro key hit my inbox in like 10 mins and activated first try. saved me a fat $100, no complaints",
  },
  {
    name: "Sofia C.",
    initials: "SC",
    color: "from-blue-500 to-blue-600",
    rating: 4,
    text: "needed office 2021 for uni and was NOT tryna pay full price lol. key worked instantly, got word excel powerpoint all of it. asked a question on whatsapp and they replied same day fr",
  },
  {
    name: "Dylan M.",
    initials: "DM",
    color: "from-purple-500 to-purple-600",
    rating: 4.5,
    text: "was skeptical bc the price felt too good to be true but grabbed a windows server 2022 key anyway. activated no problem, delivery was quick. would def cop again",
  },
  {
    name: "Kayla T.",
    initials: "KT",
    color: "from-emerald-500 to-emerald-600",
    rating: 5,
    text: "honestly didn't expect much but my office 365 was set up in minutes. clutch for my group projects 🙌 support was actually helpful too",
  },
  {
    name: "Marcus B.",
    initials: "MB",
    color: "from-cyan-500 to-cyan-600",
    rating: 4,
    text: "took me a sec to figure out the activation ngl but their guide + whatsapp support carried me. windows 11 running smooth now, no regrets",
  },
  {
    name: "Aisha K.",
    initials: "AK",
    color: "from-pink-500 to-pink-600",
    rating: 5,
    text: "cheapest genuine key i could find and it actually worked?? still shook. 10/10 would recommend to my broke friends lol",
  },
];

function Stars({ rating, size = "text-lg" }: { rating: number; size?: string }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <i
            key={i}
            className={`${half ? "fas fa-star-half-alt" : filled ? "fas fa-star" : "far fa-star"} text-yellow-400 ${size}`}
          ></i>
        );
      })}
    </div>
  );
}

export default function ReviewsPage() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");

  const submit = () => {
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
            <div className="inline-flex items-center gap-2 mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#00b67a" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
              </svg>
              <span className="text-white font-bold text-lg">Trustpilot</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              Customer <span className="gradient-text">Reviews</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Real words from real customers — and a spot to share yours. Bought from us? We&rsquo;d love your honest review.
            </p>
          </div>

          {/* Reviews grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reviews.map((r) => (
              <div key={r.name} className="glass glow-hover rounded-2xl p-7 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Stars rating={r.rating} />
                  <span className="text-yellow-500 font-bold">{r.rating.toFixed(1)}</span>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 bg-gradient-to-br ${r.color} rounded-full flex items-center justify-center text-white font-bold shadow-md`}>
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{r.name}</p>
                    <p className="text-slate-400 text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Leave a review */}
          <div className="max-w-2xl mx-auto glass-strong rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2 text-center">
              Leave a <span className="gradient-text">Review</span>
            </h2>
            <p className="text-slate-400 text-center mb-6 text-sm">
              Share your experience and we&rsquo;ll add it here. It only takes a sec.
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
