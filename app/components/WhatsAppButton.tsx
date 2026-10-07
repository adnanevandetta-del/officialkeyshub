"use client";

import { useState, useRef, useEffect } from "react";

// KEYS — the site's help assistant. A scripted quick-answer helper (not an AI
// model), so it's labelled "assistant": each quick question has a ready answer,
// and every answer offers a hand-off to a real person on WhatsApp.

type Msg = { from: "agent" | "user"; text: string; chips?: Chip[] };
type Chip = { icon: string; label: string; answer: string };

const WHATSAPP_NUMBER = "16019756129";
const BLUE = "#005A9E";
const BLUE_DARK = "#004578";

const CHIPS: Chip[] = [
  {
    icon: "fas fa-key",
    label: "How do I activate my key?",
    answer:
      "On Windows: Settings → System → Activation → Change product key, then paste your key. For Office: sign in at office.com/setup and enter the key. Full steps are on our Activation Guide page.",
  },
  {
    icon: "fas fa-bolt",
    label: "How fast is delivery?",
    answer: "Your key is emailed right after payment — usually within a few minutes — with step-by-step activation instructions.",
  },
  {
    icon: "fas fa-certificate",
    label: "Are your keys genuine?",
    answer:
      "Yes. Every key is a genuine Microsoft license that activates on Microsoft's servers and receives official updates, backed by our 30-day money-back guarantee.",
  },
  {
    icon: "fas fa-credit-card",
    label: "Which payment methods?",
    answer: "PayPal (with buyer protection), Visa/Mastercard via Stripe, and USDT crypto. All checkouts are encrypted.",
  },
  {
    icon: "fas fa-compass",
    label: "Which product do I need?",
    answer:
      "For a new PC: Windows 11 Pro. For Office apps you pay for once: Office 2024 (supported until 2029). Tell our team what you need on WhatsApp for a tailored pick.",
  },
  {
    icon: "fas fa-rotate-left",
    label: "What's your refund policy?",
    answer: "You're covered by a 30-day money-back guarantee. If a key doesn't activate, we replace it or refund you.",
  },
];

const GREETING =
  "Hi, I'm KEYS — the Official Keys Hub assistant. Pick a question below, or talk to a person on WhatsApp.";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ from: "agent", text: GREETING, chips: CHIPS }]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Deep link: any URL ending in #ask-keys opens the assistant.
  useEffect(() => {
    const check = () => window.location.hash === "#ask-keys" && setOpen(true);
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const openWhatsApp = (message: string) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const handleChip = (chip: Chip) => {
    setMessages((m) => [...m, { from: "user", text: chip.label }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "agent", text: chip.answer, chips: CHIPS }]);
    }, 700);
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="KEYS assistant"
          className="fixed bottom-24 right-4 sm:right-6 z-[9999] w-[calc(100vw-2rem)] max-w-[380px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 bg-white animate-agentIn"
        >
          {/* Header */}
          <div className="text-white px-4 py-3.5 flex items-center gap-3" style={{ backgroundColor: BLUE_DARK }}>
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center">
                <i className="fas fa-key text-lg" style={{ color: BLUE }}></i>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2" style={{ borderColor: BLUE_DARK }}></span>
            </div>
            <div className="flex-1">
              <h3 className="font-black text-base tracking-[0.18em] leading-tight">KEYS</h3>
              <p className="text-xs text-white/85">Official Keys Hub assistant · Online</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors"
              aria-label="Close assistant"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="px-4 py-4 space-y-3 h-[380px] overflow-y-auto bg-slate-50">
            {messages.map((m, i) => (
              <div key={i}>
                <div className={`flex items-end gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  {m.from === "agent" && (
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs" style={{ backgroundColor: BLUE }}>
                      <i className="fas fa-key"></i>
                    </span>
                  )}
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      m.from === "user"
                        ? "text-white rounded-br-md"
                        : "bg-white text-slate-800 rounded-bl-md border border-slate-200 shadow-sm"
                    }`}
                    style={m.from === "user" ? { backgroundColor: BLUE } : undefined}
                  >
                    {m.text}
                  </div>
                </div>

                {/* Quick questions + WhatsApp hand-off under agent messages */}
                {m.from === "agent" && m.chips && (
                  <div className="mt-2.5 ml-9 flex flex-col gap-2">
                    {i !== 0 && (
                      <button
                        onClick={() => openWhatsApp("Hi! I'd like to talk to a person about your products.")}
                        className="self-start inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb257] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                      >
                        <i className="fab fa-whatsapp text-sm"></i>
                        Talk to a person on WhatsApp
                      </button>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {m.chips.map((c) => (
                        <button
                          key={c.label}
                          onClick={() => handleChip(c)}
                          className="inline-flex items-center gap-1.5 text-left text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-[#005A9E] hover:text-[#005A9E] rounded-full px-3 py-1.5 transition-colors"
                        >
                          <i className={`${c.icon} text-[11px]`} style={{ color: BLUE }}></i>
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex items-end gap-2">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs" style={{ backgroundColor: BLUE }}>
                  <i className="fas fa-key"></i>
                </span>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-typing"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-typing [animation-delay:150ms]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-typing [animation-delay:300ms]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="p-3 bg-white border-t border-slate-200">
            <button
              onClick={() => openWhatsApp("Hi! I have a question about your products.")}
              className="w-full bg-[#25D366] hover:bg-[#1eb257] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <i className="fab fa-whatsapp text-lg"></i>
              Chat with our team on WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Floating launcher */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-[9998] flex items-center gap-3">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-white text-slate-800 pl-3 pr-4 py-2 rounded-full font-semibold text-sm shadow-lg ring-1 ring-black/10 hover:ring-[#005A9E] transition"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Need help? Ask <span className="font-black tracking-wider" style={{ color: BLUE }}>KEYS</span>
          </button>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative ring-4 ring-white"
          style={{ backgroundColor: BLUE }}
          aria-label={open ? "Close KEYS assistant" : "Open KEYS assistant"}
        >
          <i className={`fas ${open ? "fa-times" : "fa-key"} text-xl`}></i>
          {!open && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>}
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
