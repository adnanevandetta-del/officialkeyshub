import Link from "next/link";
import { useId } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

// Brand mark: blue shield + white key, with an orange ring orbiting the
// shield (it passes behind the shield at the top and in front at the bottom).
// A bright spark travels along the ring (.okh-orbit-spark in globals.css;
// off for reduced-motion users). The browser-tab icon (app/icon.svg) is the
// same shield and key without the ring, which turns to noise at 16px.
export function LogoMark({ animated = true, className = "" }: { animated?: boolean; className?: string }) {
  // Unique ids per instance: the navbar renders a mobile and a desktop logo,
  // one of them display:none, and shared ids would point both at the hidden copy.
  const u = "okh" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const ring = (clip: string, spark: boolean) => (
    <g transform="rotate(-18 32 36)" clipPath={`url(#${u}${clip})`}>
      <ellipse cx="32" cy="36" rx="38" ry="11" fill="none" stroke={`url(#${u}Ring)`} strokeWidth="4.5" />
      {spark && (
        <ellipse
          className="okh-orbit-spark"
          cx="32"
          cy="36"
          rx="38"
          ry="11"
          fill="none"
          stroke="#fff6d6"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={100}
        />
      )}
    </g>
  );
  return (
    <svg viewBox="-8 0 80 66" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${u}Shield`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22a6f2" />
          <stop offset="0.5" stopColor="#1167e0" />
          <stop offset="1" stopColor="#0b3fa8" />
        </linearGradient>
        <linearGradient id={`${u}Inner`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b7ff0" />
          <stop offset="1" stopColor="#0a3592" />
        </linearGradient>
        <linearGradient id={`${u}Ring`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
        {/* In the ring's rotated space: top half = behind the shield, bottom half = in front. */}
        <clipPath id={`${u}Back`} clipPathUnits="userSpaceOnUse">
          <rect x="-20" y="-20" width="110" height="56.6" />
        </clipPath>
        {/* The halves overlap slightly so no hairline seam shows at the ring's ends. */}
        <clipPath id={`${u}Front`} clipPathUnits="userSpaceOnUse">
          <rect x="-20" y="35.4" width="110" height="60" />
        </clipPath>
      </defs>

      {ring("Back", animated)}
      <path d="M32 3 L57 12 V31 C57 48 45 58 32 63 C19 58 7 48 7 31 V12 Z" fill={`url(#${u}Shield)`} />
      <path
        d="M32 9 L51.5 16 V31 C51.5 44.5 42 52.5 32 56.5 C22 52.5 12.5 44.5 12.5 31 V16 Z"
        fill={`url(#${u}Inner)`}
      />
      <g fill="#ffffff">
        <path
          fillRule="evenodd"
          d="M24 14 a9.5 9.5 0 1 1 0 19 a9.5 9.5 0 1 1 0 -19 Z M24 19.2 a4.3 4.3 0 1 0 0 8.6 a4.3 4.3 0 1 0 0 -8.6 Z"
        />
        <path d="M29.6 30.4 L33 27 L47 41 L43.6 44.4 Z" />
        <path d="M38.5 35.5 L41.6 32.4 L45 35.8 L41.9 38.9 Z" />
        <path d="M42.8 39.8 L45.9 36.7 L48.6 39.4 L45.5 42.5 Z" />
      </g>
      {ring("Front", animated)}
    </svg>
  );
}

export default function Logo({ size = "md", animated = true }: LogoProps) {
  const sizes = {
    // sm (phones) scales down below 360px so it never touches the cart/profile icons
    sm: { container: "h-11", text: "text-[14px] min-[360px]:text-[17px] min-[390px]:text-[19px]", mark: "h-[30px] w-[36px] min-[360px]:h-9 min-[360px]:w-11 min-[390px]:h-10 min-[390px]:w-12", tag: "text-[6.5px] tracking-[0.1em] min-[360px]:text-[7px] min-[360px]:tracking-[0.2em]", line: false },
    md: { container: "h-12", text: "text-[24px]", mark: "h-11 w-[54px]", tag: "text-[8.5px] tracking-[0.12em]", line: true },
    lg: { container: "h-20", text: "text-[34px]", mark: "h-16 w-[78px]", tag: "text-[11px] tracking-[0.34em]", line: true },
  };
  const s = sizes[size];

  return (
    <Link href="/" aria-label="Official Keys Hub home" className={`flex items-center gap-1 ${s.container} group`}>
      <LogoMark
        animated={animated}
        className={`${s.mark} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
      />
      <span className="inline-flex flex-col leading-none">
        <span className={`okh-wordmark font-extrabold tracking-[-0.035em] text-[#0b1736] ${s.text}`}>
          OfficialKeys<span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Hub</span>
        </span>
        {/* One-idea tagline, centred under the name between two hairlines. */}
        <span className="mt-1 flex items-center gap-1.5">
          {s.line && <span className="h-px flex-1 bg-slate-300" aria-hidden="true" />}
          <span className={`okh-wordmark whitespace-nowrap font-semibold text-slate-500 ${s.tag} ${s.line ? "" : "mx-auto"}`}>
            GENUINE SOFTWARE KEYS
          </span>
          {s.line && <span className="h-px flex-1 bg-slate-300" aria-hidden="true" />}
        </span>
      </span>
    </Link>
  );
}
