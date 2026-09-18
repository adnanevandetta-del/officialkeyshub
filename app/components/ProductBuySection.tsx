"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { getProductImage } from "../lib/productImage";
import { paypalPaymentUrl } from "../lib/payment";

export default function ProductBuySection({
  name,
  price,
  originalPrice,
}: {
  name: string;
  price: string;
  originalPrice: string;
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const add = () => {
    addToCart({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      price,
      originalPrice,
      image: getProductImage(name),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const waText = encodeURIComponent(`Hi! I want to buy ${name} for ${price}`);

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-4xl font-black text-white">{price}</span>
        <span className="text-xl text-white/40 line-through">{originalPrice}</span>
      </div>

      {/* Reassurance */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-300 mt-3 mb-5">
        <span className="flex items-center gap-1.5"><i className="fas fa-bolt text-sky-400"></i> Instant delivery</span>
        <span className="flex items-center gap-1.5"><i className="fas fa-shield-halved text-sky-400"></i> Genuine license</span>
        <span className="flex items-center gap-1.5"><i className="fas fa-rotate-left text-sky-400"></i> 30-day money back</span>
      </div>

      <div className="space-y-2.5">
        <a
          href={paypalPaymentUrl(name, price)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-lg font-black text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg inline-flex items-center justify-center gap-2"
        >
          Buy Now
        </a>

        <button
          onClick={add}
          className="w-full py-2.5 rounded-lg font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md inline-flex items-center justify-center gap-2"
        >
          <i className={`fas ${added ? "fa-check" : "fa-cart-plus"}`}></i>
          {added ? "Added to Cart" : "Add to Cart"}
        </button>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <a
            href={`mailto:digitalkeyhubllc@gmail.com?subject=USDT Payment for ${encodeURIComponent(name)}&body=Hi, I want to purchase ${encodeURIComponent(name)} for ${price} via USDT.`}
            className="py-2.5 rounded-lg font-semibold text-slate-200 bg-white/5 border border-white/10 hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2 text-sm"
          >
            <i className="fab fa-bitcoin text-[#26a17b]"></i> USDT
          </a>
          <a
            href={`https://wa.me/16019756129?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 rounded-lg font-semibold text-slate-200 bg-white/5 border border-white/10 hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2 text-sm"
          >
            <i className="fab fa-whatsapp text-[#25D366]"></i> WhatsApp
          </a>
        </div>
      </div>

      {/* Accepted payments */}
      <div className="flex items-center gap-2.5 text-white/70 mt-5 pt-4 border-t border-white/10">
        <span className="text-white/45 text-[11px] font-medium">Secure payments</span>
        <i className="fab fa-cc-paypal text-lg" title="PayPal"></i>
        <i className="fab fa-cc-visa text-lg" title="Visa"></i>
        <i className="fab fa-cc-mastercard text-lg" title="Mastercard"></i>
        <i className="fab fa-bitcoin text-lg" title="USDT / Crypto"></i>
      </div>
    </div>
  );
}
