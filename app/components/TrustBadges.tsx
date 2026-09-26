"use client";

export default function TrustBadges() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Payment Methods */}
        <div className="flex flex-wrap items-center justify-center gap-5 md:gap-7">
          {/* PayPal */}
          <div className="glass glow-hover rounded-xl flex items-center justify-center w-32 h-20 md:w-36 md:h-24">
            <i className="fab fa-cc-paypal text-4xl md:text-5xl drop-shadow" style={{ color: '#0070ba' }}></i>
          </div>

          {/* USDT/Crypto */}
          <div className="glass glow-hover rounded-xl flex items-center justify-center w-32 h-20 md:w-36 md:h-24">
            <i className="fab fa-bitcoin text-4xl md:text-5xl drop-shadow" style={{ color: '#f7931a' }}></i>
          </div>

          {/* WhatsApp */}
          <div className="glass glow-hover rounded-xl flex items-center justify-center w-32 h-20 md:w-36 md:h-24">
            <i className="fab fa-whatsapp text-4xl md:text-5xl drop-shadow" style={{ color: '#25D366' }}></i>
          </div>

          {/* Cards */}
          <div className="glass glow-hover rounded-xl flex items-center justify-center gap-3 w-32 h-20 md:w-36 md:h-24">
            <i className="fab fa-cc-visa text-3xl md:text-4xl drop-shadow" style={{ color: '#1a4fd6' }}></i>
            <i className="fab fa-cc-mastercard text-3xl md:text-4xl drop-shadow" style={{ color: '#eb001b' }}></i>
          </div>
        </div>

        {/* Trust Text */}
        <div className="text-center mt-6">
          <p className="text-slate-300 font-semibold text-base md:text-lg">
            <i className="fas fa-shield-alt text-sky-500 mr-2"></i>
            Secure Payment Methods • Instant Delivery • 24/7 Support
          </p>
        </div>
      </div>
    </section>
  );
}
