"use client";

export default function CustomerReviews() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Customer Reviews</h2>
          <p className="text-gray-600 text-lg">What our customers say about Official Keys Hub</p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10">
          {/* Review 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-emerald-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                ))}
                <i className="fas fa-star-half-alt text-yellow-400 text-lg"></i>
              </div>
              <span className="text-yellow-500 font-bold text-lg">4.5</span>
            </div>
            <p className="text-gray-700 mb-6 text-base leading-relaxed">
              "Bought a Windows 11 Pro key from officialkeyshub and it worked fine. Got it via email pretty quickly, maybe 10 minutes. Installation was straightforward with the guide they sent."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                JR
              </div>
              <div>
                <p className="text-gray-900 font-semibold">James Rodriguez</p>
                <p className="text-gray-500 text-sm">Verified Purchase</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-emerald-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                ))}
                <i className="far fa-star text-yellow-400 text-lg"></i>
              </div>
              <span className="text-yellow-500 font-bold text-lg">4.0</span>
            </div>
            <p className="text-gray-700 mb-6 text-base leading-relaxed">
              "Got Office 2021 from them. Price was reasonable compared to Microsoft's official price. Key activated without problems. Support answered my questions the same day via WhatsApp."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                SC
              </div>
              <div>
                <p className="text-gray-900 font-semibold">Sarah Chen</p>
                <p className="text-gray-500 text-sm">Verified Purchase</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-emerald-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                ))}
                <i className="fas fa-star-half-alt text-yellow-400 text-lg"></i>
              </div>
              <span className="text-yellow-500 font-bold text-lg">4.5</span>
            </div>
            <p className="text-gray-700 mb-6 text-base leading-relaxed">
              "Used officialkeyshub for Windows Server 2022 license. Delivery was fast and the key worked on first try. Good prices for genuine Microsoft products. Would buy again."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                DM
              </div>
              <div>
                <p className="text-gray-900 font-semibold">David Martinez</p>
                <p className="text-gray-500 text-sm">Verified Purchase</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Score Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-xl shadow-lg border border-gray-200">
            <i className="fas fa-star text-yellow-400 text-3xl"></i>
            <div className="text-left">
              <p className="text-gray-900 font-bold text-lg">Good 4.3 out of 5</p>
              <p className="text-gray-600">Based on 847 customer reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
