"use client";

import { useState } from "react";
import { USDT_ADDRESS, USDT_NETWORK, USDT_PROOF_EMAIL, usdtProofMailto } from "../lib/payment";

interface Props {
  orderId: string;
  amount: number; // USD (USDT is pegged 1:1)
  itemName: string;
  deliveryEmail?: string;
  variant?: "dark" | "light";
}

// Direct USDT payment: send to the store wallet, then email a screenshot of
// the transaction. The order is only confirmed once that proof is verified.
export default function UsdtPay({ orderId, amount, itemName, deliveryEmail, variant = "dark" }: Props) {
  const [copied, setCopied] = useState<"address" | "amount" | null>(null);
  const dark = variant === "dark";

  const copy = (text: string, what: "address" | "amount") => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(what);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // clipboard blocked — the text is still selectable on screen
    }
  };

  const box = dark ? "bg-white/[0.04] border-green-400/40" : "bg-green-50 border-green-300";
  const text = dark ? "text-slate-200" : "text-gray-700";
  const muted = dark ? "text-slate-400" : "text-gray-500";
  const strong = dark ? "text-white" : "text-gray-900";
  const chip = dark ? "bg-black/30 border-white/10" : "bg-white border-gray-200";
  const amountText = amount.toFixed(2);

  if (!USDT_ADDRESS) {
    return (
      <div className={`rounded-xl border p-4 ${box}`}>
        <p className={`font-bold ${strong} mb-1`}>Pay with USDT</p>
        <p className={`text-sm ${text} mb-3`}>
          Message us and we&apos;ll send you our USDT wallet address for order <span className="font-mono">{orderId}</span>.
        </p>
        <a
          href={`https://wa.me/16019756129?text=${encodeURIComponent(`Hi! I want to pay ${amountText} USDT for ${itemName} (order ${orderId}). Please send your USDT address.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center min-h-[44px] px-5 py-2 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors"
        >
          <i className="fab fa-whatsapp mr-2"></i>Get USDT address
        </a>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border p-4 md:p-5 ${box}`}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className={`font-bold text-lg ${strong}`}>
          <i className="fab fa-bitcoin text-green-500 mr-2"></i>Pay with USDT
        </p>
        <span className={`text-xs font-mono ${muted}`}>Order {orderId}</span>
      </div>

      <ol className={`space-y-4 text-sm ${text}`}>
        <li>
          <p className="font-bold mb-2">1. Send exactly this amount</p>
          <div className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 ${chip}`}>
            <span className={`text-xl font-black ${strong}`}>{amountText} USDT</span>
            <button
              type="button"
              onClick={() => copy(amountText, "amount")}
              className="min-h-[36px] px-3 rounded-md text-xs font-bold bg-green-600 text-white hover:bg-green-700"
            >
              {copied === "amount" ? "Copied" : "Copy"}
            </button>
          </div>
          {USDT_NETWORK && (
            <p className={`mt-2 ${muted}`}>
              Network: <span className={`font-bold ${strong}`}>{USDT_NETWORK}</span>
            </p>
          )}
        </li>

        <li>
          <p className="font-bold mb-2">2. To this USDT address</p>
          <div className={`rounded-lg border px-3 py-2 ${chip}`}>
            <p className={`font-mono text-sm break-all select-all ${strong}`}>{USDT_ADDRESS}</p>
            <button
              type="button"
              onClick={() => copy(USDT_ADDRESS, "address")}
              className="mt-2 min-h-[36px] px-3 rounded-md text-xs font-bold bg-green-600 text-white hover:bg-green-700"
            >
              <i className={`fas ${copied === "address" ? "fa-check" : "fa-copy"} mr-1`}></i>
              {copied === "address" ? "Address copied" : "Copy address"}
            </button>
          </div>
          <p className="mt-2 text-xs text-amber-500">
            <i className="fas fa-triangle-exclamation mr-1"></i>
            Send only USDT{USDT_NETWORK ? ` on the ${USDT_NETWORK} network` : ""}. Coins sent on another network or to a
            different address can&apos;t be recovered.
          </p>
        </li>

        <li>
          <p className="font-bold mb-2">3. Email us a screenshot of the transaction</p>
          <p className={`mb-3 ${muted}`}>
            Take a screenshot of the completed transfer (amount, address and transaction ID visible) and email it to{" "}
            <span className={`font-semibold ${strong}`}>{USDT_PROOF_EMAIL}</span> with your order ID.{" "}
            <strong>Your key is released after we verify the payment.</strong>
          </p>
          <a
            href={usdtProofMailto(orderId, itemName, amount, deliveryEmail)}
            className="flex items-center justify-center min-h-[48px] px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all"
          >
            <i className="fas fa-envelope mr-2"></i>Email payment proof
          </a>
          <p className={`mt-2 text-xs ${muted}`}>
            Your email app opens with the details filled in. Remember to attach the screenshot before sending.
          </p>
        </li>
      </ol>
    </div>
  );
}
