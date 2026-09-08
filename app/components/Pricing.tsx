"use client";

import { useState } from "react";
import PaymentModal from "./PaymentModal";

export default function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: "", price: "" });
  const [connections, setConnections] = useState(1);

  const openPayment = (name: string, price: string) => {
    setSelectedPlan({ name, price });
    setModalOpen(true);
  };

  const plans = [
    {
      duration: "1 Month",
      price: "199",
      originalPrice: "275",
      save: "28%",
      popular: false,
    },
    {
      duration: "3 Months",
      price: "495",
      originalPrice: "660",
      save: "25%",
      popular: false,
    },
    {
      duration: "6 Months",
      price: "759",
      originalPrice: "1045",
      save: "27%",
      popular: false,
    },
    {
      duration: "12 Months",
      price: "1199",
      originalPrice: "1650",
      save: "27%",
      popular: true,
      badge: "Best Seller!",
    },
  ];

  // Calculate price with connection multiplier (70% extra per additional connection)
  const calculatePrice = (basePrice: string) => {
    const base = parseInt(basePrice);
    const multiplier = 1 + (connections - 1) * 0.7;
    return Math.round(base * multiplier);
  };

  const calculateOriginalPrice = (basePrice: string) => {
    const base = parseInt(basePrice);
    const multiplier = 1 + (connections - 1) * 0.7;
    return Math.round(base * multiplier);
  };

  const features = [
    { text: "1 connection", enabled: true },
    { text: "4K | FHD | HD Quality", enabled: true },
    { text: "+30,000 Live TV Channels", enabled: true },
    { text: "All Sports Channels", enabled: true },
    { text: "+190,000 Movies & Shows", enabled: true },
    { text: "Anti-Freezing Technology", enabled: true },
    { text: "Catch Up 4 Days", enabled: true },
    { text: "TV Guide (EPG)", enabled: true },
    { text: "Pay Per View (PPV)", enabled: true },
    { text: "Built-in VPN Protection", enabled: true },
    { text: "Adults Channels (Optional)", enabled: true },
    { text: "24/7 Technical Assistance", enabled: true },
    { text: "Instant Activation", enabled: true },
  ];

  return (
    <>
      <section className="py-24 bg-white" id="pricing">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
              Fair, Reasonable <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              One-time IPTV subscription payment • No auto-renewal • No hidden fees
            </p>
          </div>

          {/* Connections Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4 bg-white border-2 border-[#fbbf24] px-6 py-3 rounded-full shadow-md">
              <button
                onClick={() => setConnections(Math.max(1, connections - 1))}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={connections === 1}
              >
                -
              </button>
              <span className="text-sm font-bold text-gray-800 min-w-[180px]">
                {connections} Connection{connections > 1 ? 's' : ''} · {connections} Device{connections > 1 ? 's' : ''}
              </span>
              <button
                onClick={() => setConnections(Math.min(5, connections + 1))}
                className="w-8 h-8 rounded-full bg-[#fbbf24] hover:bg-[#fcd34d] text-black font-bold flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={connections === 5}
              >
                +
              </button>
            </div>
            {connections > 1 && (
              <p className="text-xs text-gray-500 mt-2">
                +70% per additional connection
              </p>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`border-2 rounded-2xl p-8 relative hover:-translate-y-1.5 transition-all duration-300 shadow-lg ${
                  plan.popular
                    ? "border-[#fbbf24] bg-[#006AA7]"
                    : "border-gray-200 bg-[#006AA7]"
                }`}
              >
                {plan.badge && (
                  <div 
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#fbbf24] via-[#fcd34d] to-[#fbbf24] text-black px-5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap animate-pulse"
                    style={{
                      boxShadow: '0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-xl font-bold text-white mb-4">{plan.duration}</div>
                  <div className="mb-2">
                    <span className="text-5xl font-black text-white">SEK {calculatePrice(plan.price)}</span>
                  </div>
                  <div className="text-gray-300 line-through text-sm mb-2">SEK {calculateOriginalPrice(plan.originalPrice)}</div>
                  <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    SAVE {plan.save}
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-white">
                      <i className="fas fa-check text-[#fbbf24] mt-0.5 flex-shrink-0"></i>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://wa.me/16019756129?text=Hi!%20I%20would%20like%20to%20start%20my%20free%20IPTV%20test!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg font-bold transition-all inline-flex items-center justify-center bg-gradient-to-r from-[#fbbf24] via-[#fcd34d] to-[#fbbf24] text-black hover:opacity-90"
                  style={{
                    boxShadow: '0 0 30px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.3)'
                  }}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        planName={selectedPlan.name}
        planPrice={selectedPlan.price}
      />
    </>
  );
}


