import Link from "next/link";

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

  // Microsoft-style four tiles (darkened) + a modern key with an orbit swoosh.
  const Mark = (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="keyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2f6fd0" />
          <stop offset="100%" stopColor="#173f82" />
        </linearGradient>
        <linearGradient id="swooshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1f6fd0" />
          <stop offset="100%" stopColor="#123f80" />
        </linearGradient>
      </defs>

      {/* Four tiles — darkened Microsoft palette */}
      <g transform="rotate(-6 60 56)">
        <rect x="30" y="26" width="27" height="27" rx="4" fill="#B23A1A" />
        <rect x="63" y="26" width="27" height="27" rx="4" fill="#4F7A00" />
        <rect x="30" y="59" width="27" height="27" rx="4" fill="#0B6BA6" />
        <rect x="63" y="59" width="27" height="27" rx="4" fill="#C88A00" />
      </g>

      {/* Orbit swoosh */}
      <path d="M24 78 C 44 96, 86 92, 100 60" fill="none" stroke="url(#swooshGrad)" strokeWidth="6" strokeLinecap="round" />
      <path d="M96 44 C 100 40, 104 44, 102 50" fill="none" stroke="url(#swooshGrad)" strokeWidth="6" strokeLinecap="round" />

      {/* Modern key with a light outline so it reads over the tiles */}
      <g>
        <circle cx="60" cy="46" r="19" fill="#e8eefc" />
        <circle cx="60" cy="46" r="15.5" fill="url(#keyGrad)" />
        <circle cx="60" cy="41.5" r="5" fill="#e8eefc" />
        <path d="M67 57 L96 86 L96 96 L90 96 L90 90 L84 90 L84 84 L78 84 L72 78 L68 82 L58 72 Z" fill="#e8eefc" />
        <path d="M69 58 L94 83 L94 93 L91.5 93 L91.5 86.5 L85.5 86.5 L85.5 81 L79.5 81 L74 75.5 L69.5 79.5 L61 71 Z" fill="url(#keyGrad)" />
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
