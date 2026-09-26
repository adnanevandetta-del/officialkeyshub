"use client";

import PaymentIcons from "./PaymentIcons";

export default function TrustBadges() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Accepted payment methods + live chat */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <PaymentIcons chipClass="h-11" className="gap-3" />

          {/* WhatsApp — presented as a live chat option with an "online" dot */}
          <a
            href="https://wa.me/16019756129?text=Hi! I have a question"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-11 px-4 rounded-lg bg-[#25D366] text-white font-bold shadow-md hover:brightness-105 transition-all"
          >
            <i className="fab fa-whatsapp text-xl"></i>
            <span className="text-sm">Live Chat</span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
          </a>
        </div>

        {/* Trust Text */}
        <div className="text-center mt-6">
          <p className="text-gray-700 font-semibold text-base md:text-lg">
            <i className="fas fa-shield-alt text-sky-600 mr-2"></i>
            Secure Payment Methods • Instant Delivery • 24/7 Support
          </p>
        </div>
      </div>
    </section>
  );
}
