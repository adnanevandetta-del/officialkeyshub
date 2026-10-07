"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { canonicalProducts, categoryLabel } from "../lib/catalog";

type Result = {
  name: string;
  slug: string;
  price: string;
  category: string;
};

// Build the search index once — canonical products only (variants folded in)
// so the dropdown doesn't repeat the same product three times.
const INDEX: Result[] = canonicalProducts.map((p) => ({
  name: p.name,
  slug: p.slug,
  price: p.price,
  category: categoryLabel[p.category],
}));

function scoreMatch(name: string, q: string): number {
  const n = name.toLowerCase();
  if (n === q) return 0;
  if (n.startsWith(q)) return 1;
  if (n.includes(" " + q)) return 2;
  if (n.includes(q)) return 3;
  return 99;
}

export default function ProductSearch({
  variant = "desktop",
  onNavigate,
  autoFocus = false,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];
    return INDEX.map((r) => ({ r, s: scoreMatch(r.name, q) }))
      .filter((x) => x.s < 99)
      .sort((a, b) => a.s - b.s || a.r.name.length - b.r.name.length)
      .slice(0, 8)
      .map((x) => x.r);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => setActive(0), [query]);

  const go = (slug: string) => {
    setOpen(false);
    setQuery("");
    onNavigate?.();
    router.push(`/products/${slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) {
      if (e.key === "Enter" && query.trim()) {
        // No dropdown match — jump to the full product index.
        setOpen(false);
        onNavigate?.();
        router.push("/products");
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active].slug);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const widthClass = variant === "mobile" ? "w-full" : "w-44 lg:w-60";

  return (
    <div ref={boxRef} className={`relative ${variant === "mobile" ? "w-full" : ""}`}>
      <div className="relative">
        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search products…"
          aria-label="Search products"
          className={`${widthClass} bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#005A9E] focus:bg-white focus:ring-2 focus:ring-[#005A9E]/20 rounded-full pl-9 pr-8 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all`}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            <i className="fas fa-times text-xs"></i>
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 mt-2 min-w-full bg-white rounded-xl shadow-xl ring-1 ring-slate-200 overflow-hidden z-[400] py-1">
          {results.length > 0 ? (
            results.map((r, i) => (
              <button
                key={r.slug}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r.slug)}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors ${
                  i === active ? "bg-slate-100" : "hover:bg-slate-50"
                }`}
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-slate-900 truncate">
                    {r.name}
                  </span>
                  <span className="block text-[11px] text-slate-500">{r.category}</span>
                </span>
                <span className="text-sm font-bold text-slate-900 whitespace-nowrap">
                  {r.price}
                </span>
              </button>
            ))
          ) : (
            <div className="px-3 py-3 text-sm text-slate-500">
              No products match “{query.trim()}”.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
