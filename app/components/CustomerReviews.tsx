"use client";

export default function CustomerReviews() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Customer Reviews</h2>
          <p className="text-gray-600 text-lg">See what our customers say about us</p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10">
          {/* Review 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-emerald-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                ))}
              </div>
              <span className="text-yellow-500 font-bold text-lg">5.0</span>
            </div>
            <p className="text-gray-700 mb-6 text-base leading-relaxed">
              "Great service! The Windows 11 Pro key arrived quickly and worked perfectly on first try. 
              Customer support was helpful when I had questions. Would recommend!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                MK
              </div>
              <div>
                <p className="text-gray-900 font-semibold">Marcus Klein</p>
                <p className="text-gray-500 text-sm">Verified Purchase</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-emerald-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                ))}
              </div>
              <span className="text-yellow-500 font-bold text-lg">5.0</span>
            </div>
            <p className="text-gray-700 mb-6 text-base leading-relaxed">
              "Good prices for genuine Microsoft products. Purchased Office 2021 and activation was smooth. 
              Fast email delivery and clear instructions included."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                LH
              </div>
              <div>
                <p className="text-gray-900 font-semibold">Lisa Hansen</p>
                <p className="text-gray-500 text-sm">Verified Purchase</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-emerald-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                ))}
              </div>
              <span className="text-yellow-500 font-bold text-lg">5.0</span>
            </div>
            <p className="text-gray-700 mb-6 text-base leading-relaxed">
              "Needed Windows Server 2022 for work. Key was delivered within minutes and activated without issues. 
              Professional service and good value for money."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                TP
              </div>
              <div>
                <p className="text-gray-900 font-semibold">Thomas Peterson</p>
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
              <p className="text-gray-900 font-bold text-lg">Excellent 4.8 out of 5</p>
              <p className="text-gray-600">Based on 3,234 reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
