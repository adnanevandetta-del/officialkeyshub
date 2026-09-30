"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { getProductImage } from "../lib/productImage";
import { paypalPaymentUrl } from "../lib/payment";
import { recordQuickOrder, priceToNumber } from "../lib/account";
import UsdtPay from "./UsdtPay";
import PaymentIcons from "./PaymentIcons";

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
  const [usdtOrderId, setUsdtOrderId] = useState<string | null>(null);

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
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-4xl font-black text-gray-900">{price}</span>
        {originalPrice && <span className="text-xl text-gray-400 line-through">{originalPrice}</span>}
      </div>

      {/* Reassurance */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-600 mt-3 mb-5">
        <span className="flex items-center gap-1.5"><i className="fas fa-bolt text-blue-600"></i> Instant delivery</span>
        <span className="flex items-center gap-1.5"><i className="fas fa-shield-halved text-blue-600"></i> Genuine license</span>
        <span className="flex items-center gap-1.5"><i className="fas fa-rotate-left text-blue-600"></i> 30-day money back</span>
      </div>

      <div className="space-y-2.5">
        <a
          href={paypalPaymentUrl(name, price)}
          onClick={() => recordQuickOrder(name, price, "paypal")}
          target="_blank"
          rel="noopener noreferrer"
          className="press-3d w-full py-3 rounded-lg font-black text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg inline-flex items-center justify-center gap-2"
        >
          Buy Now
        </a>

        <button
          onClick={add}
          className="press-3d w-full py-2.5 rounded-lg font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md inline-flex items-center justify-center gap-2"
        >
          <i className={`fas ${added ? "fa-check" : "fa-cart-plus"}`}></i>
          {added ? "Added to Cart" : "Add to Cart"}
        </button>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => setUsdtOrderId(recordQuickOrder(name, price, "usdt").id)}
            className="py-2.5 rounded-lg font-semibold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2 text-sm"
          >
            <i className="fab fa-bitcoin text-[#26a17b]"></i> USDT
          </button>
          <a
            href={`https://wa.me/16019756129?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordQuickOrder(name, price, "whatsapp")}
            className="py-2.5 rounded-lg font-semibold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2 text-sm"
          >
            <i className="fab fa-whatsapp text-[#25D366]"></i> WhatsApp
          </a>
        </div>
      </div>

      {usdtOrderId && (
        <div className="mt-4">
          <UsdtPay orderId={usdtOrderId} amount={priceToNumber(price)} itemName={name} />
        </div>
      )}

      {/* Accepted payments */}
      <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-gray-200">
        <span className="text-gray-400 text-[11px] font-medium">Secure payments</span>
        <PaymentIcons />
      </div>
    </div>
  );
}
