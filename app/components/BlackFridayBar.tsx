"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BF_CODE, BF_PERCENT } from "../lib/promo";

// Site-wide Black Friday bar. The root layout renders it while BF_ON is true
// (app/lib/promo.ts); set BF_ON to false to take the sale down.
export default function BlackFridayBar() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  if (pathname?.startsWith("/admin") || pathname === "/black-friday") return null;

  const copy = () => {
    try {
      navigator.clipboard.writeText(BF_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the code is visible anyway
    }
  };

  return (
    <div className="relative z-[150] bf-bar text-white border-b border-[#f2c94c]/30">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xs sm:text-sm">
        <span className="bf-gold font-extrabold uppercase tracking-[0.18em] text-[11px] sm:text-xs">
          Black Friday
        </span>
        <span className="hidden sm:inline h-3.5 w-px bg-white/25" aria-hidden="true" />
        <span className="font-semibold">
          {BF_PERCENT}% off every key with code
        </span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#f2c94c]/60 bg-[#f2c94c]/10 hover:bg-[#f2c94c]/20 text-[#ffe9a8] px-2.5 py-1 sm:py-0.5 font-mono font-bold tracking-wide transition-colors"
          aria-label={`Copy code ${BF_CODE}`}
        >
          {BF_CODE}
          <i className={`fas ${copied ? "fa-check" : "fa-copy"} text-[10px]`} aria-hidden="true"></i>
        </button>
        <Link
          href="/black-friday"
          className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300"
        >
          See the deals <i className="fas fa-arrow-right text-[10px]" aria-hidden="true"></i>
        </Link>
      </div>
    </div>
  );
}
