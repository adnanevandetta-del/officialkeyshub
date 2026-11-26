"use client";

import { useState } from "react";

export default function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    try {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the code is visible anyway
    }
  };
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-3 rounded-xl border-2 border-dashed border-[#f2c94c]/70 bg-[#f2c94c]/10 hover:bg-[#f2c94c]/15 px-5 py-3 transition-colors"
      aria-label={`Copy code ${code}`}
    >
      <span className="text-xs uppercase tracking-[0.14em] text-white/60">Code</span>
      <span className="bf-gold font-mono text-2xl font-extrabold tracking-wider">{code}</span>
      <span className="text-xs font-bold text-[#ffe9a8]">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
