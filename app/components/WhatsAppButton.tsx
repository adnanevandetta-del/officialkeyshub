"use client";

import { useState } from "react";

export default function WhatsAppButton() {
  const [showPopup, setShowPopup] = useState(false);
  const whatsappNumber = "16019756129";
  
  const handleWhatsAppRedirect = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
    setShowPopup(false);
  };

  const quickQuestions = [
    {
      icon: "🔑",
      question: "How do I activate my key?",
      message: "Hi! I need help activating my product key. Can you guide me through the process?"
    },
    {
      icon: "⚡",
      question: "Is delivery instant?",
      message: "Hi! I want to know how quickly I'll receive my product key after purchase."
    },
    {
      icon: "✅",
      question: "Are your keys genuine?",
      message: "Hi! I'd like to confirm if your Windows/Office keys are genuine and legal."
    },
    {
      icon: "💳",
      question: "What payment methods?",
      message: "Hi! What payment methods do you accept for purchases?"
    },
    {
      icon: "🔄",
      question: "Refund policy?",
      message: "Hi! I'd like to know more about your refund and warranty policy."
    },
    {
      icon: "🎯",
      question: "Which product do I need?",
      message: "Hi! I'm not sure which Windows/Office version I need. Can you help me choose?"
    }
  ];

  return (
    <>
      {/* Live Agent Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden animate-slideInUp">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white p-6 relative">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-all"
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <i className="fab fa-whatsapp text-[#25D366] text-2xl"></i>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Live Agent Support</h3>
                  <p className="text-sm text-white/90">Online • Responds in minutes</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(90vh-180px)] overflow-y-auto">
              <p className="text-gray-700 mb-4 text-center">
                👋 <strong>Hi there!</strong> Choose a question below or start a custom chat:
              </p>

              {/* Quick Questions Grid */}
              <div className="space-y-2 mb-4">
                {quickQuestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleWhatsAppRedirect(item.message)}
                    className="w-full text-left p-3 rounded-xl border-2 border-gray-200 hover:border-[#25D366] hover:bg-green-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-sm font-medium text-gray-800 group-hover:text-[#25D366]">
                        {item.question}
                      </span>
                      <i className="fas fa-arrow-right ml-auto text-gray-400 group-hover:text-[#25D366] transition-colors"></i>
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Message Button */}
              <button
                onClick={() => handleWhatsAppRedirect("Hi! I have a question about your products.")}
                className="w-full bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white py-4 rounded-xl font-bold text-base hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                Start Custom Chat
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                🔒 Secure • Fast Response • Expert Support
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-[9998] flex items-center gap-3">
        {/* Start Live Chat Label */}
        <div className="bg-[#25D366] text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-lg animate-pulse flex items-center gap-2">
          <i className="fab fa-whatsapp text-xl"></i>
          Need Help? Chat Now!
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-[7px] border-b-[7px] border-l-[9px] border-transparent border-l-[#25D366]"></div>
        </div>
        
        {/* Agent Button */}
        <button
          onClick={() => setShowPopup(true)}
          className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group relative"
          aria-label="Chat with live agent"
        >
          <i className="fab fa-whatsapp text-3xl"></i>
          
          {/* Online indicator */}
          <div className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideInUp {
          animation: slideInUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
