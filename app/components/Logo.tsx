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

  // Shield + key: "genuine + secure" in one clear mark. Stays legible down to
  // favicon size and reads as an independent reseller (no Microsoft four-square).
  const Mark = (
    <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#173f82" />
        </linearGradient>
      </defs>

      {/* Shield */}
      <path
        d="M32 4 L54 12 V30 C54 46 44 55 32 60 C20 55 10 46 10 30 V12 Z"
        fill="url(#shieldGrad)"
      />
      <path
        d="M32 4 L54 12 V30 C54 46 44 55 32 60 C20 55 10 46 10 30 V12 Z"
        fill="none"
        stroke="#bcd4ff"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />

      {/* Key: head with orange core (ties to the "Hub" accent) + toothed shaft */}
      <circle cx="32" cy="26" r="8.5" fill="none" stroke="#fff" strokeWidth="4" />
      <circle cx="32" cy="26" r="3" fill="#f97316" />
      <rect x="30" y="30" width="4" height="18" rx="2" fill="#fff" />
      <rect x="34" y="40" width="7" height="4" rx="2" fill="#fff" />
      <rect x="34" y="46" width="5" height="4" rx="2" fill="#fff" />
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
