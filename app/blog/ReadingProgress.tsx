"use client";

import { useEffect, useState } from "react";

// Thin bar under the navbar that fills as you read the article.
export default function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div aria-hidden className="fixed left-0 right-0 top-0 z-[250] h-1 bg-transparent">
      <div className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-[width] duration-150" style={{ width: `${pct}%` }} />
    </div>
  );
}
