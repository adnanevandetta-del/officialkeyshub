"use client";

import { useState, useEffect } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
}

export default function PaymentModal({ isOpen, onClose, planName, planPrice }: PaymentModalProps) {
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [formData, setFormData] = useState({
    cardName: "",
    cardEmail: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setShowStripeForm(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const formatCard = (value: string) => {
    const cleaned = value.replace(/\D/g, "").substring(0, 16);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").substring(0, 4);
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2);
    }
    return cleaned;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "cardNumber") {
      value = formatCard(value);
    } else if (field === "cardExpiry") {
      value = formatExpiry(value);
    } else if (field === "cardCvv") {
      value = value.replace(/\D/g, "").substring(0, 4);
    }
    setFormData({ ...formData, [field]: value });
  };

  const handlePayPal = () => {
    const paypalEmail = "YOUR_PAYPAL_BUSINESS_EMAIL@example.com";
    const itemName = encodeURIComponent(`StreamPro IPTV - ${planName} Plan`);
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(
      paypalEmail
    )}&item_name=${itemName}&amount=${planPrice}&currency_code=USD&return=${encodeURIComponent(
      window.location.href
    )}&cancel_return=${encodeURIComponent(window.location.href)}`;
    window.open(paypalUrl, "_blank");
  };

  const handleStripeSubmit = () => {
    if (!formData.cardName || !formData.cardEmail || !formData.cardNumber || !formData.cardExpiry || !formData.cardCvv) {
      alert("Please fill in all card details.");
      return;
    }
    alert(`Processing payment... (Connect your Stripe account to activate)`);
    setTimeout(() => {
      onClose();
      alert(`Thank you! Your ${planName} plan is being activated. Check your email.`);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-5"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-bg3 border border-[rgba(108,99,255,0.2)] rounded-3xl p-10 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>

        <h3 className="text-2xl font-extrabold mb-2">Complete Your Subscription</h3>
        <p className="text-slate-400 mb-7 text-[0.95rem]">
          Plan: <strong className="text-primary">{planName}</strong> —{" "}
          <strong className="text-primary">${planPrice}/month</strong>
        </p>

        <div className="mb-6">
          <p className="text-slate-400 text-sm mb-4">Choose your payment method:</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handlePayPal}
              className="flex items-center justify-center gap-2.5 p-4 rounded-xl font-bold bg-[#003087] hover:bg-[#002070] text-white transition-all hover:-translate-y-0.5"
            >
              <i className="fab fa-paypal text-xl text-[#009cde]"></i> Pay with PayPal
            </button>
            <button
              onClick={() => setShowStripeForm(!showStripeForm)}
              className="flex items-center justify-center gap-2.5 p-4 rounded-xl font-bold bg-[#635bff] hover:bg-[#5248e8] text-white transition-all hover:-translate-y-0.5"
            >
              <i className="fas fa-credit-card"></i> Pay with Card (Stripe)
            </button>
          </div>
        </div>

        {showStripeForm && (
          <div className="border-t border-[rgba(108,99,255,0.2)] pt-6">
            <h4 className="text-lg font-bold mb-5">Card Details</h4>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.cardName}
                onChange={(e) => handleInputChange("cardName", e.target.value)}
                className="w-full bg-white/[0.06] border border-[rgba(108,99,255,0.2)] rounded-lg px-4 py-3 text-white text-[0.95rem] focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={formData.cardEmail}
                onChange={(e) => handleInputChange("cardEmail", e.target.value)}
                className="w-full bg-white/[0.06] border border-[rgba(108,99,255,0.2)] rounded-lg px-4 py-3 text-white text-[0.95rem] focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                className="w-full bg-white/[0.06] border border-[rgba(108,99,255,0.2)] rounded-lg px-4 py-3 text-white text-[0.95rem] focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={(e) => handleInputChange("cardExpiry", e.target.value)}
                  className="w-full bg-white/[0.06] border border-[rgba(108,99,255,0.2)] rounded-lg px-4 py-3 text-white text-[0.95rem] focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={formData.cardCvv}
                  onChange={(e) => handleInputChange("cardCvv", e.target.value)}
                  className="w-full bg-white/[0.06] border border-[rgba(108,99,255,0.2)] rounded-lg px-4 py-3 text-white text-[0.95rem] focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleStripeSubmit}
              className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <i className="fas fa-lock"></i> Pay ${planPrice} Securely
            </button>

            <p className="text-center text-slate-400 text-xs mt-3 flex items-center justify-center gap-1.5">
              <i className="fas fa-shield-alt text-green-500"></i> 256-bit SSL encrypted. Your data is safe.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


