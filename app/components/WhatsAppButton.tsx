"use client";

import { useState, useRef, useEffect } from "react";

type Msg = { from: "agent" | "user"; text: string; chips?: Chip[] };
type Chip = { label: string; reply: string; answer: string };

const WHATSAPP_NUMBER = "16019756129";

// The agent's mini knowledge base — each quick reply has a helpful answer,
// then always offers a hand-off to a human on WhatsApp.
const CHIPS: Chip[] = [
  {
    label: "🔑 How do I activate my key?",
    reply: "How do I activate my key?",
    answer:
      "Easy! After purchase you get your key by email instantly. On Windows: Settings → System → Activation → Change product key → paste it. For Office: sign in at office.com/setup and enter the key. Full steps are on our Activation Guide page.",
  },
  {
    label: "⚡ Is delivery instant?",
    reply: "Is delivery instant?",
    answer:
      "Yes — keys are delivered to your email automatically within seconds of payment, 24/7. No waiting for a human.",
  },
  {
    label: "✅ Are your keys genuine?",
    reply: "Are your keys genuine?",
    answer:
      "100%. Every key is a genuine Microsoft license that activates online and gets official updates, backed by our lifetime warranty and 30-day money-back guarantee.",
  },
  {
    label: "💳 What payment methods?",
    reply: "What payment methods do you accept?",
    answer:
      "We accept PayPal (buyer protection), Visa/Mastercard via Stripe, and USDT crypto. All checkouts are secure and encrypted.",
  },
  {
    label: "🎯 Which product do I need?",
    reply: "Which product do I need?",
    answer:
      "Tell me what you want to do — a home PC, a work laptop, or running Office apps — and I'll point you to the right edition. For a tailored recommendation, our team can help you in one message on WhatsApp.",
  },
  {
    label: "🔄 Refund policy?",
    reply: "What is your refund policy?",
    answer:
      "You're covered by a 30-day money-back guarantee. If a key doesn't activate, we replace it or refund you — no hassle.",
  },
];

const GREETING =
  "👋 Hi, I'm Keyla, your Official Keys Hub assistant. Ask me anything about our Windows & Office keys — or I can connect you to a human on WhatsApp.";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "agent", text: GREETING, chips: CHIPS },
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const openWhatsApp = (message: string) => {
    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleChip = (chip: Chip) => {
    // Show the user's question, then the agent "types" and replies with a
    // WhatsApp hand-off offer.
    setMessages((m) => [...m, { from: "user", text: chip.reply }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          from: "agent",
          text: chip.answer + "\n\nWant to talk to a real person? Tap below and continue on WhatsApp.",
          chips: CHIPS,
        },
      ]);
    }, 900);
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-[9999] w-[calc(100vw-2rem)] max-w-[380px] rounded-2xl overflow-hidden shadow-2xl border border-sky-600/30 bg-[#0b1020] animate-agentIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#25D366] to-[#0369a1] text-white p-4 flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
                <i className="fas fa-robot text-xl"></i>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-300 rounded-full border-2 border-[#0369a1]"></span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base leading-tight">Keyla · AI Assistant</h3>
              <p className="text-xs text-white/90">Online now · replies instantly</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="p-4 space-y-3 h-[360px] overflow-y-auto bg-[#070a12]">
            {messages.map((m, i) => (
              <div key={i}>
                <div className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                      m.from === "user"
                        ? "bg-sky-700 text-white rounded-br-sm"
                        : "bg-[#141b2d] text-slate-100 rounded-bl-sm border border-white/5"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>

                {/* Quick-reply chips + WhatsApp hand-off under agent messages */}
                {m.from === "agent" && m.chips && (
                  <div className="mt-2.5 flex flex-col gap-1.5">
                    {i !== 0 && (
                      <button
                        onClick={() => openWhatsApp("Hi! I'd like to talk to a person about your products.")}
                        className="self-start inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb257] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                      >
                        <i className="fab fa-whatsapp text-sm"></i>
                        Continue on WhatsApp
                      </button>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {m.chips.map((c, j) => (
                        <button
                          key={j}
                          onClick={() => handleChip(c)}
                          className="text-left text-xs text-slate-200 bg-white/[0.04] hover:bg-sky-600/15 hover:text-sky-200 border border-white/10 hover:border-sky-500/40 rounded-full px-3 py-1.5 transition-colors"
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-[#141b2d] border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-typing"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-typing [animation-delay:150ms]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-typing [animation-delay:300ms]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <button
            onClick={() => openWhatsApp("Hi! I have a question about your products.")}
            className="w-full bg-gradient-to-r from-[#25D366] to-[#0369a1] text-white py-3.5 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
          >
            <i className="fab fa-whatsapp text-lg"></i>
            Chat with us on WhatsApp
          </button>
        </div>
      )}

      {/* Floating launcher */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-[9998] flex items-center gap-3">
        {!open && (
          <div className="hidden sm:flex bg-[#0b1020] text-white px-3.5 py-2 rounded-lg font-semibold text-sm shadow-lg border border-sky-600/30 items-center gap-2 animate-pulse">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Need help? Ask Keyla
          </div>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          className="bg-gradient-to-br from-[#25D366] to-[#0369a1] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 relative"
          aria-label="Open AI assistant"
        >
          <i className={`fas ${open ? "fa-times" : "fa-robot"} text-2xl`}></i>
          {!open && <span className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0b1020] animate-pulse"></span>}
        </button>
      </div>

      <style jsx>{`
        @keyframes agentIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-agentIn { animation: agentIn 0.25s ease-out; }
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }
        .animate-typing { animation: typing 1s infinite; }
      `}</style>
    </>
  );
}
