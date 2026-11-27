"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BF_CODE, BF_PERCENT } from "../lib/promo";

// Site-wide Black Friday bar. The root layout renders it while BF_ON is true
// (app/lib/promo.ts); set BF_ON to false to take the sale down. No end date.
// One line on every screen size. The code is blurred until it's tapped; the
// tap reveals it and copies it. The "Black Friday" label links to the deals page.
export default function BlackFridayBar() {
  const pathname = usePathname();
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (pathname?.startsWith("/admin") || pathname === "/black-friday") return null;

  const reveal = () => {
    setRevealed(true);
    try {
      navigator.clipboard.writeText(BF_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the code is visible now anyway
    }
  };

  return (
    <div className="relative z-[150] bf-bar text-white border-b border-[#f2c94c]/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-10 flex items-center justify-center gap-2.5 sm:gap-3 whitespace-nowrap text-[12px] sm:text-sm">
        <Link
          href="/black-friday"
          className="bf-gold font-extrabold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[10.5px] sm:text-xs hover:opacity-90"
        >
          Black Friday
        </Link>
        <span className="h-3.5 w-px bg-white/25" aria-hidden="true" />
        <span className="font-semibold">
          {BF_PERCENT}% off <span className="hidden min-[400px]:inline">every key</span>
        </span>
        <button
          onClick={reveal}
          className="inline-flex items-center gap-1.5 h-7 rounded-md border border-emerald-400/60 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 px-2.5 font-mono font-bold tracking-wide transition-colors"
          aria-label={revealed ? `Copy code ${BF_CODE}` : "Reveal and copy the discount code"}
        >
          <span
            className={`transition-[filter] duration-300 ${revealed ? "" : "blur-[4px] select-none"}`}
            aria-hidden={!revealed}
          >
            {BF_CODE}
          </span>
          <i
            className={`fas ${copied ? "fa-check" : revealed ? "fa-copy" : "fa-eye"} text-[10px]`}
            aria-hidden="true"
          ></i>
        </button>
      </div>
    </div>
  );
}
