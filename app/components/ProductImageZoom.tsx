"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";

// Product hero image with zoom: hover to magnify the area under the cursor
// (desktop), click or tap to open a fullscreen viewer with its own zoom toggle.
export default function ProductImageZoom({
  src,
  alt,
  badge,
}: {
  src: string;
  alt: string;
  badge?: string;
}) {
  const [hover, setHover] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [lbOrigin, setLbOrigin] = useState("50% 50%");

  const pct = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  };

  const close = useCallback(() => {
    setOpen(false);
    setZoomed(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={(e) => setOrigin(pct(e))}
        aria-label={`Zoom image: ${alt}`}
        className="group relative block w-full h-64 md:h-80 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 shadow-sm overflow-hidden cursor-zoom-in"
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          priority
          className="object-contain p-6 transition-transform duration-200 ease-out"
          style={{ transformOrigin: origin, transform: hover ? "scale(2)" : "scale(1)" }}
        />
        {badge && (
          <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow">
            {badge}
          </span>
        )}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white/90 border border-gray-200 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm group-hover:opacity-0 transition-opacity">
          <i className="fas fa-search-plus"></i> Click to zoom
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center"
          >
            <i className="fas fa-times"></i>
          </button>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setLbOrigin(pct(e));
              setZoomed((z) => !z);
            }}
            onMouseMove={(e) => zoomed && setLbOrigin(pct(e))}
            className={`relative w-full max-w-2xl h-[80vh] overflow-hidden rounded-2xl bg-white ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-contain p-6 transition-transform duration-200 ease-out select-none"
              style={{ transformOrigin: lbOrigin, transform: zoomed ? "scale(2.5)" : "scale(1)" }}
              draggable={false}
            />
          </div>
          <p className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm pointer-events-none">
            {zoomed ? "Move to pan · click to zoom out" : "Click image to zoom in · Esc to close"}
          </p>
        </div>
      )}
    </>
  );
}
