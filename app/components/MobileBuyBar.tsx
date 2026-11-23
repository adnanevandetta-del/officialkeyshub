"use client";

import { useEffect, useState } from "react";
import { paypalPaymentUrl } from "../lib/payment";
import { recordQuickOrder, priceToNumber } from "../lib/account";
import { trackEvent } from "../lib/analytics";

// Product pages: a sticky "Buy Now" bar on phones and tablets once the main buy
// box has scrolled out of view, so the buy button is always one tap away while
// people read the details and FAQ. Also sends GA4's view_item, the first step
// of the view → add_to_cart → begin_checkout → purchase funnel.
export default function MobileBuyBar({ name, price }: { name: string; price: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    trackEvent("view_item", {
      currency: "USD",
      value: priceToNumber(price),
      items: [{ item_name: name, price: priceToNumber(price) }],
    });
  }, [name, price]);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`lg:hidden fixed inset-x-0 bottom-0 z-[150] border-t border-slate-200 bg-white/95 backdrop-blur px-4 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">
            <span className="font-black text-gray-900 text-base">{price}</span> · instant email delivery
          </p>
        </div>
        <a
          href={paypalPaymentUrl(name, price)}
          onClick={() => recordQuickOrder(name, price, "paypal")}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          className="shrink-0 rounded-lg bg-blue-700 px-5 py-3 font-black text-white shadow-md hover:bg-blue-800 inline-flex items-center gap-2"
        >
          <i className="fab fa-paypal"></i> Buy Now
        </a>
      </div>
    </div>
  );
}
