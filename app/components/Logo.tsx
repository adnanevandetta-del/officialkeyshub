import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: LogoProps) {
  const sizes = {
    sm: { container: "h-10", text: "text-sm", subText: "text-[10px]", icon: "w-8 h-8" },
    md: { container: "h-14", text: "text-base", subText: "text-xs", icon: "w-11 h-11" },
    lg: { container: "h-20", text: "text-xl", subText: "text-sm", icon: "w-16 h-16" },
  };

  const currentSize = sizes[size];

  return (
    <Link href="/" className={`flex items-center gap-2 ${currentSize.container} group`}>
      {/* Futuristic Cyber Key Icon */}
      <div className={`relative ${currentSize.icon} flex-shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
          <defs>
            {/* Cyber Neon Gradients */}
            <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#0e7490', stopOpacity: 1 }} />
            </linearGradient>
            
            <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
            </linearGradient>

            <linearGradient id="hologram" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#67e8f9', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.3 }} />
            </linearGradient>

            {/* Neon Glow Filter */}
            <filter id="neonEffect">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Outer Glow Circle */}
          <circle cx="32" cy="35" r="26" fill="#06b6d4" opacity="0.15" filter="url(#neonEffect)">
            <animate attributeName="r" values="24;28;24" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite" />
          </circle>

          {/* Key Head - Hexagonal Tech Design */}
          <g filter="url(#neonEffect)">
            {/* Outer Hexagon */}
            <path 
              d="M 32 18 L 43 24 L 43 36 L 32 42 L 21 36 L 21 24 Z" 
              fill="url(#cyberGradient)"
              stroke="#67e8f9"
              strokeWidth="2"
            />
            
            {/* Inner Hexagon Circuit */}
            <path 
              d="M 32 23 L 39 27 L 39 33 L 32 37 L 25 33 L 25 27 Z" 
              fill="none"
              stroke="url(#hologram)"
              strokeWidth="1.5"
              opacity="0.8"
            />
            
            {/* Center Digital Core */}
            <circle cx="32" cy="30" r="6" fill="#0e7490" />
            <circle cx="32" cy="30" r="4" fill="#67e8f9" opacity="0.9">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </circle>
            
            {/* Circuit Lines */}
            <line x1="32" y1="18" x2="32" y2="25" stroke="#67e8f9" strokeWidth="1.5" opacity="0.7" />
            <line x1="32" y1="35" x2="32" y2="42" stroke="#67e8f9" strokeWidth="1.5" opacity="0.7" />
            <line x1="21" y1="30" x2="27" y2="30" stroke="#67e8f9" strokeWidth="1.5" opacity="0.7" />
            <line x1="37" y1="30" x2="43" y2="30" stroke="#67e8f9" strokeWidth="1.5" opacity="0.7" />
            
            {/* Corner Tech Details */}
            <circle cx="32" cy="18" r="1.5" fill="#67e8f9" />
            <circle cx="43" cy="24" r="1.5" fill="#10b981" />
            <circle cx="43" cy="36" r="1.5" fill="#67e8f9" />
            <circle cx="21" cy="24" r="1.5" fill="#10b981" />
          </g>

          {/* Futuristic Key Shaft */}
          <g filter="url(#neonEffect)">
            {/* Main Shaft with Tech Segments */}
            <rect x="43" y="27" width="45" height="6" rx="3" fill="url(#neonGlow)" />
            <rect x="43" y="27" width="45" height="2" rx="1" fill="#67e8f9" opacity="0.5" />
            
            {/* Digital Segments */}
            <rect x="48" y="26" width="4" height="8" rx="1.5" fill="#0e7490" opacity="0.9" />
            <rect x="58" y="26" width="4" height="8" rx="1.5" fill="#0e7490" opacity="0.9" />
            <rect x="68" y="26" width="4" height="8" rx="1.5" fill="#0e7490" opacity="0.9" />
            
            {/* Circuit Pattern */}
            <line x1="50" y1="30" x2="85" y2="30" stroke="#67e8f9" strokeWidth="0.8" opacity="0.6" strokeDasharray="3,2" />
            
            {/* Energy Pulse */}
            <circle cx="52" cy="30" r="1.2" fill="#67e8f9">
              <animate attributeName="cx" values="45;85;45" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Digital Key Teeth - Angular Futuristic */}
          <g filter="url(#neonEffect)">
            {/* Tooth 1 - Short */}
            <path d="M 74 33 L 78 33 L 78 42 L 76 44 L 74 42 Z" fill="url(#cyberGradient)" stroke="#67e8f9" strokeWidth="0.5" />
            <line x1="76" y1="33" x2="76" y2="42" stroke="#67e8f9" strokeWidth="0.8" opacity="0.6" />
            
            {/* Tooth 2 - Medium */}
            <path d="M 80 33 L 84 33 L 84 39 L 82 41 L 80 39 Z" fill="url(#cyberGradient)" stroke="#67e8f9" strokeWidth="0.5" />
            <line x1="82" y1="33" x2="82" y2="39" stroke="#67e8f9" strokeWidth="0.8" opacity="0.6" />
            
            {/* Tooth 3 - Tall */}
            <path d="M 86 33 L 90 33 L 90 47 L 88 49 L 86 47 Z" fill="url(#cyberGradient)" stroke="#67e8f9" strokeWidth="0.5" />
            <line x1="88" y1="33" x2="88" y2="47" stroke="#67e8f9" strokeWidth="0.8" opacity="0.6" />
            
            {/* Digital Node Indicators */}
            <circle cx="76" cy="42" r="1" fill="#10b981" />
            <circle cx="82" cy="39" r="1" fill="#10b981" />
            <circle cx="88" cy="47" r="1" fill="#10b981" />
          </g>

          {/* Floating Digital Particles */}
          <g opacity="0.8">
            <circle cx="26" cy="26" r="1.2" fill="#67e8f9">
              <animate attributeName="cy" values="26;22;26" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="38" cy="24" r="1" fill="#10b981">
              <animate attributeName="cy" values="24;20;24" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="22" cy="32" r="0.8" fill="#67e8f9">
              <animate attributeName="cx" values="22;24;22" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Scan Line Effect */}
          <rect x="20" y="18" width="72" height="1.5" fill="#67e8f9" opacity="0.4" rx="0.5">
            <animate attributeName="y" values="18;50;18" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.6;0" dur="4s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>

      {/* Text with Cyber Theme */}
      <div className="flex flex-col leading-tight">
        <span className={`font-black text-white ${currentSize.text} tracking-tight group-hover:text-cyan-300 transition-colors`}>
          Official Keys
        </span>
        <span className={`font-black text-cyan-400 ${currentSize.subText} tracking-wider text-center -mt-0.5 group-hover:text-cyan-300 transition-colors`}>
          HUB
        </span>
      </div>
    </Link>
  );
}
