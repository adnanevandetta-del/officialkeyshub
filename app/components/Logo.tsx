import Link from "next/link";
import { useId } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export default function Logo({ size = "md", animated = true }: LogoProps) {
  const sizes = {
    sm: { container: "h-10", text: "text-base", tagline: "text-[8px]", icon: "w-8 h-8", showTag: false },
    md: { container: "h-14", text: "text-xl", tagline: "text-[9px]", icon: "w-11 h-11", showTag: false },
    lg: { container: "h-20", text: "text-2xl", tagline: "text-[11px]", icon: "w-16 h-16", showTag: true },
  };

  const currentSize = sizes[size];
  // Unique gradient ids per instance: the navbar renders a mobile and a desktop
  // logo, one of them display:none, and a shared id would point both at the
  // hidden copy's gradients (which some browsers then fail to paint).
  const u = "okh" + useId().replace(/[^a-zA-Z0-9]/g, "");

  // Shield + key: "genuine + secure" in one clear mark. Stays legible down to
  // favicon size and reads as an independent reseller (no Microsoft four-square).
  // Same artwork as app/icon.svg — keep the two in sync.
  const bow = "M0 -11 A11 11 0 1 1 0 11 A11 11 0 1 1 0 -11 Z M0 -5.6 A5.6 5.6 0 1 0 0 5.6 A5.6 5.6 0 1 0 0 -5.6 Z";
  const bit = "M-2.5 13 H2.5 V22 H8.5 V26.4 H2.5 V28 H6.8 V32.4 H2.5 V34.5 Q2.5 36 1 36 H-1 Q-2.5 36 -2.5 34.5 Z";
  const keyShape = (
    <>
      <path fillRule="evenodd" d={bow} />
      <rect x="-4.6" y="9.5" width="9.2" height="4.4" rx="1.6" />
      <path d={bit} />
    </>
  );
  const Mark = (
    <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id={`${u}Shield`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f8ff7" />
          <stop offset="0.55" stopColor="#1d5fd6" />
          <stop offset="1" stopColor="#123a8a" />
        </linearGradient>
        <linearGradient id={`${u}Gloss`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${u}Key`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cfe0ff" />
        </linearGradient>
        <radialGradient id={`${u}Gem`} cx="0.38" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffb066" />
          <stop offset="0.6" stopColor="#f97316" />
          <stop offset="1" stopColor="#c2410c" />
        </radialGradient>
      </defs>

      {/* Shield: blue body, inner rim and top gloss */}
      <path d="M32 3 L57 12 V31 C57 48 45 58 32 63 C19 58 7 48 7 31 V12 Z" fill={`url(#${u}Shield)`} />
      <path
        d="M32 7.2 L53 14.8 V31 C53 45.5 43 54 32 58.6 C21 54 11 45.5 11 31 V14.8 Z"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.22"
        strokeWidth="1"
      />
      <path d="M32 3 L57 12 V24 C46 20 18 20 7 27 V12 Z" fill={`url(#${u}Gloss)`} />

      {/* Key: angled, ornate bow with an orange gem (ties to the "Hub" accent) */}
      <g transform="translate(32 33) rotate(-45) scale(0.9) translate(0 -12.5)">
        <g fill="#0a2a6b" opacity="0.35" transform="translate(1.6 1.6)">{keyShape}</g>
        <g fill={`url(#${u}Key)`}>{keyShape}</g>
        <circle r="3.6" fill={`url(#${u}Gem)`} />
        <circle cx="-1.1" cy="-1.2" r="1" fill="#ffffff" opacity="0.7" />
      </g>
    </svg>
  );

  return (
    <Link href="/" className={`flex items-center gap-2 ${currentSize.container} group`}>
      <div className={`relative ${currentSize.icon} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        {Mark}
      </div>

      <div className="flex flex-col leading-none">
        <span className={`font-math font-black tracking-tight ${currentSize.text}`}>
          <span className="text-white">OfficialKeys</span>
          <span className="text-orange-500">Hub</span>
        </span>
        {currentSize.showTag && (
          <span className={`font-math text-slate-400 font-semibold tracking-wide mt-1 ${currentSize.tagline}`}>
            Microsoft Keys • Fast • Safe • Trusted
          </span>
        )}
      </div>
    </Link>
  );
}
