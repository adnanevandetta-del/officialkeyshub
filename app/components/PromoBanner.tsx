"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredPromo, PROMO_PERCENT, type StoredPromo } from "../lib/promo";

export default function PromoBanner() {
  const [promo, setPromo] = useState<StoredPromo | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPromo(getStoredPromo());
  }, []);

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

  return (
    <div className="relative z-[150] bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-600 text-white">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm font-semibold">
          <i className="fas fa-gift text-white/90"></i>
          <span className="font-black uppercase tracking-wide">{PROMO_PERCENT}% OFF Your First Order</span>

          {promo ? (
            <>
              <span className="hidden sm:inline text-white/80">— your code:</span>
              <button
                onClick={copyPromo}
                className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 transition-colors px-2.5 py-0.5 rounded-md font-mono font-bold tracking-wide"
              >
                {promo.code}
                <i className={`fas ${copied ? "fa-check" : "fa-copy"} text-xs`}></i>
              </button>
            </>
          ) : (
            <>
              <span className="text-white/85">— Log in to get your code</span>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 bg-white text-sky-700 px-3 py-0.5 rounded-md font-bold hover:bg-sky-50 transition-colors"
              >
                Get {PROMO_PERCENT}% Code
                <i className="fas fa-arrow-right text-xs"></i>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
