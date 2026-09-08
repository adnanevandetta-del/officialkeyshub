"use client";

export default function TrustBadges() {
  return (
    <section className="py-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Payment Methods */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {/* PayPal */}
          <div 
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-blue-500 flex items-center justify-center w-36 h-24 group"
          >
            <i className="fab fa-paypal text-5xl transition-colors" style={{ color: '#0070BA' }}></i>
          </div>

          {/* USDT/Crypto */}
          <div 
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-green-500 flex items-center justify-center w-36 h-24 group"
          >
            <i className="fab fa-bitcoin text-5xl transition-colors" style={{ color: '#F7931A' }}></i>
          </div>

          {/* WhatsApp */}
          <div 
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-emerald-500 flex items-center justify-center w-36 h-24 group"
          >
            <i className="fab fa-whatsapp text-5xl transition-colors" style={{ color: '#25D366' }}></i>
          </div>

          {/* Credit Card */}
          <div 
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-purple-500 flex items-center justify-center w-36 h-24 group"
          >
            <i className="fas fa-credit-card text-5xl transition-colors" style={{ color: '#6366F1' }}></i>
          </div>
        </div>

        {/* Trust Text */}
        <div className="text-center mt-6">
          <p className="text-gray-600 font-semibold text-lg">
            <i className="fas fa-shield-alt text-emerald-600 mr-2"></i>
            Secure Payment Methods • Instant Delivery • 24/7 Support
          </p>
        </div>
      </div>
    </section>
  );
}
