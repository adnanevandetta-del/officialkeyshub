"use client";

export default function CustomerReviews() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-3">Customer <span className="gradient-text">Reviews</span></h2>
          <p className="text-slate-400 text-lg">What our customers say about Official Keys Hub</p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10">
          {/* Review 1 */}
          <div className="glass glow-hover rounded-2xl p-8 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                ))}
                <i className="fas fa-star-half-alt text-yellow-400 text-lg"></i>
              </div>
              <span className="text-yellow-500 font-bold text-lg">4.5</span>
            </div>
            <p className="text-slate-300 mb-6 text-base leading-relaxed">
              "ngl i was lowkey scared this was a scam 😭 but my windows 11 pro key hit my inbox in like 10 mins and activated first try. saved me a fat $100, no complaints"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-600 to-sky-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                JR
              </div>
              <div>
                <p className="text-white font-semibold">Jordan R.</p>
                <p className="text-slate-400 text-sm">Verified Purchase</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="glass glow-hover rounded-2xl p-8 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                ))}
                <i className="far fa-star text-yellow-400 text-lg"></i>
              </div>
              <span className="text-yellow-500 font-bold text-lg">4.0</span>
            </div>
            <p className="text-slate-300 mb-6 text-base leading-relaxed">
              "needed office 2021 for uni and was NOT tryna pay full price lol. key worked instantly, got word excel powerpoint all of it. asked a question on whatsapp and they replied same day fr"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                SC
              </div>
              <div>
                <p className="text-white font-semibold">Sofia C.</p>
                <p className="text-slate-400 text-sm">Verified Purchase</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="glass glow-hover rounded-2xl p-8 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                ))}
                <i className="fas fa-star-half-alt text-yellow-400 text-lg"></i>
              </div>
              <span className="text-yellow-500 font-bold text-lg">4.5</span>
            </div>
            <p className="text-slate-300 mb-6 text-base leading-relaxed">
              "was skeptical bc the price felt too good to be true but grabbed a windows server 2022 key anyway. activated no problem, delivery was quick. would def cop again"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                DM
              </div>
              <div>
                <p className="text-white font-semibold">Dylan M.</p>
                <p className="text-slate-400 text-sm">Verified Purchase</p>
              </div>
            </div>
          </div>
        </div>

        {/* Review us badge */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 glass px-8 py-5 rounded-2xl">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#00b67a" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
              </svg>
              <span className="text-white font-bold text-lg">Trustpilot</span>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              Bought from us? We&rsquo;d love your honest review.
            </p>
            <a
              href="/reviews"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg whitespace-nowrap"
            >
              <i className="fas fa-star"></i>
              Review us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
