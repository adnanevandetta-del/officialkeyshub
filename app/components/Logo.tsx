import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
}

export default function Logo({ size = "md", href = "/" }: LogoProps) {
  const sizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl"
  };

  const iconSizes = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-14 h-14",
    xl: "w-20 h-20"
  };

  const iconTextSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-xl"
  };

  return (
    <Link href={href} className="flex items-center gap-2.5 hover:opacity-90 transition-all group">
      {/* 3D Key Icon */}
      <div className="relative">
        <div 
          className={`${iconSizes[size]} bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-2xl group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-105 group-hover:rotate-12 relative overflow-hidden`}
          style={{
            boxShadow: '0 8px 20px rgba(16, 185, 129, 0.5), 0 4px 10px rgba(5, 150, 105, 0.3)',
            transform: 'perspective(1000px) rotateX(5deg) rotateY(-5deg)'
          }}
        >
          {/* 3D Key SVG with depth */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-3/5 h-3/5 relative z-10"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}
          >
            {/* Key head (circle with 3D effect) */}
            <circle 
              cx="17.5" 
              cy="6.5" 
              r="3.5" 
              fill="url(#keyGradient)"
              stroke="rgba(255,255,255,0.8)" 
              strokeWidth="0.5"
            />
            <circle 
              cx="17.5" 
              cy="6.5" 
              r="1.5" 
              fill="rgba(255,255,255,0.3)"
            />
            
            {/* Key shaft with 3D depth */}
            <path 
              d="M14.5 7.5L8 14L9.5 15.5L11 14L12 15L10.5 16.5L12 18L18 12" 
              fill="url(#keyGradient2)"
              stroke="rgba(255,255,255,0.8)" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* Key teeth */}
            <rect x="9" y="15.5" width="1" height="1.5" fill="rgba(255,255,255,0.9)" rx="0.3"/>
            <rect x="11" y="13.5" width="1" height="1.5" fill="rgba(255,255,255,0.9)" rx="0.3"/>
            
            {/* Gradients for 3D effect */}
            <defs>
              <linearGradient id="keyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.85)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.7)" />
              </linearGradient>
              <linearGradient id="keyGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.75)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Inner glow effect */}
          <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
          
          {/* 3D edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-xl"></div>
        </div>
        
        {/* Outer glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 via-emerald-500 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-300 -z-10"></div>
      </div>

      {/* Clean Text Logo */}
      <div className="flex flex-col leading-none items-center">
        <span className={`${sizeClasses[size]} font-bold text-white tracking-tight`}>
          Official Keys
        </span>
        <span className={`${iconTextSizes[size]} font-black text-emerald-400 tracking-wider`} style={{ fontWeight: 900 }}>
          HUB
        </span>
      </div>
    </Link>
  );
}
