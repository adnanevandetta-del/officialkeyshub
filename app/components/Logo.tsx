import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export default function Logo({ size = "md", animated = true }: LogoProps) {
  const sizes = {
    sm: { container: "h-12", text: "text-base", subText: "text-xs", icon: "w-10 h-10" },
    md: { container: "h-16", text: "text-lg", subText: "text-sm", icon: "w-12 h-12" },
    lg: { container: "h-24", text: "text-2xl", subText: "text-base", icon: "w-16 h-16" },
  };

  const currentSize = sizes[size];

  // Clean, professional Windows-tile mark in the site's emerald/cyan theme
  const WindowsMark = (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
      <defs>
        <linearGradient id="keysBrandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#34d399" }} />
          <stop offset="55%" style={{ stopColor: "#10b981" }} />
          <stop offset="100%" style={{ stopColor: "#06b6d4" }} />
        </linearGradient>
        <linearGradient id="keysBrandSheen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 0.35 }} />
          <stop offset="45%" style={{ stopColor: "#ffffff", stopOpacity: 0 }} />
        </linearGradient>
      </defs>

      {/* Rounded tile backdrop */}
      <rect x="14" y="14" width="72" height="72" rx="18" fill="url(#keysBrandGradient)" />
      <rect x="14" y="14" width="72" height="72" rx="18" fill="url(#keysBrandSheen)" />
      {animated && (
        <rect x="14" y="14" width="72" height="72" rx="18" fill="none" stroke="#67e8f9" strokeWidth="1.5" opacity="0.35">
          <animate attributeName="opacity" values="0.15;0.5;0.15" dur="3s" repeatCount="indefinite" />
        </rect>
      )}

      {/* Windows 4-pane logo, knocked out in white */}
      <g fill="#ffffff">
        <rect x="30" y="30" width="16" height="16" rx="2.5" />
        <rect x="54" y="30" width="16" height="16" rx="2.5" />
        <rect x="30" y="54" width="16" height="16" rx="2.5" />
        <rect x="54" y="54" width="16" height="16" rx="2.5" />
      </g>
    </svg>
  );

  return (
    <Link href="/" className={`flex items-center gap-3 ${currentSize.container} group`}>
      <div className={`relative ${currentSize.icon} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        {WindowsMark}
      </div>

      <div className="flex flex-col leading-tight">
        <span className={`font-black text-white ${currentSize.text} tracking-tight group-hover:text-emerald-300 transition-colors`}>
          Official Keys
        </span>
        <span className={`font-bold text-emerald-400 ${currentSize.subText} tracking-[0.35em] uppercase -mt-0.5 group-hover:text-cyan-300 transition-colors`}>
          Hub
        </span>
      </div>
    </Link>
  );
}
