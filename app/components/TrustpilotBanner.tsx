"use client";

export default function TrustpilotBanner() {
  return (
    <div className="bg-white border-b border-gray-200 py-1.5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-4">
          {/* Trustpilot Logo & Stars */}
          <div className="flex items-center gap-1.5">
            {/* Trustpilot Text Logo */}
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#00b67a"/>
              </svg>
              <span className="text-sm font-bold text-gray-800">Trustpilot</span>
            </div>
            
            {/* Star Rating - 4.5 stars */}
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4].map((star) => (
                <svg key={star} className="w-3 h-3" viewBox="0 0 24 24" fill="#00b67a" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              ))}
              {/* Half star */}
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="halfGrad">
                    <stop offset="50%" stopColor="#00b67a"/>
                    <stop offset="50%" stopColor="#ddd"/>
                  </linearGradient>
                </defs>
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#halfGrad)"/>
              </svg>
            </div>
          </div>

          {/* Rating Info */}
          <div className="flex items-center gap-1.5 text-gray-700">
            <span className="text-xs font-bold">4.5</span>
            <span className="text-gray-400 text-xs">|</span>
            <span className="text-xs">3,234 reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
}
