"use client";

import Link from "next/link";
import { usdtProofMailto } from "../lib/payment";
import { money, removeOrder, updateOrderStatus, type Order, type OrderStatus } from "../lib/account";

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  delivered: "bg-green-100 text-green-700 border-green-300",
  cancelled: "bg-gray-100 text-gray-600 border-gray-300",
};

const STATUS_ICON: Record<OrderStatus, string> = {
  pending: "fa-clock",
  delivered: "fa-check-circle",
  cancelled: "fa-ban",
};

const METHOD_LABEL = { paypal: "PayPal", usdt: "USDT (crypto)", whatsapp: "WhatsApp" } as const;

export default function OrderList({ orders, emptyText }: { orders: Order[]; emptyText?: string }) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-10 md:p-12 text-center">
        <i className="fas fa-shopping-bag text-gray-300 text-6xl mb-4"></i>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-600 mb-6">{emptyText ?? "Orders you place will appear here."}</p>
        <Link
          href="/#products"
          className="inline-block px-6 py-3 bg-sky-700 text-white font-bold rounded-lg hover:bg-sky-800 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const supportText = encodeURIComponent(`Hi! I need help with my order ${order.id}`);
        return (
          <div key={order.id} className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border-2 border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-gray-200">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Order ID</p>
                  <p className="font-bold text-gray-900 font-mono text-sm">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Date</p>
                  <p className="font-bold text-gray-900 text-sm">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Payment</p>
                  <p className="font-bold text-gray-900 text-sm">{METHOD_LABEL[order.method]}</p>
                </div>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-sm font-bold border-2 flex items-center gap-2 ${STATUS_STYLE[order.status]}`}>
                <i className={`fas ${STATUS_ICON[order.status]}`}></i>
                {STATUS_LABEL[order.status]}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 bg-gray-50 p-3 rounded-lg">
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 break-words">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-sky-700 flex-shrink-0">{item.price}</p>
                </div>
              ))}
            </div>

            {order.status === "pending" && order.method === "usdt" && (
              <div className="mb-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-gray-700">
                <p className="mb-2">
                  <i className="fab fa-bitcoin text-green-600 mr-2"></i>
                  Paid with USDT? Email a screenshot of the transaction so we can verify it — your key is released after
                  verification.
                </p>
                <a
                  href={usdtProofMailto(order.id, order.items.map((i) => `${i.quantity}x ${i.name}`).join(", "), order.total, order.email)}
                  className="inline-flex items-center min-h-[44px] px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                >
                  <i className="fas fa-envelope mr-2"></i>Email payment proof
                </a>
              </div>
            )}

            {order.status === "pending" && order.method !== "usdt" && (
              <p className="text-sm text-gray-600 mb-4">
                <i className="fas fa-envelope text-sky-700 mr-2"></i>
                Your key is delivered {order.email ? <>to <span className="font-semibold">{order.email}</span> </> : ""}
                once payment is confirmed.
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-0.5">Total{order.promoCode ? ` (code ${order.promoCode})` : ""}</p>
                <p className="text-2xl font-black text-gray-900">{money(order.total)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {order.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateOrderStatus(order.id, "delivered")}
                      className="min-h-[44px] px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-sm"
                    >
                      <i className="fas fa-check mr-2"></i>I received my key
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, "cancelled")}
                      className="min-h-[44px] px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {order.status === "cancelled" && (
                  <button
                    onClick={() => removeOrder(order.id)}
                    className="min-h-[44px] px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
                  >
                    <i className="fas fa-trash mr-2"></i>Remove
                  </button>
                )}
                <a
                  href={`https://wa.me/16019756129?text=${supportText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center px-4 py-2 bg-sky-700 text-white rounded-lg font-semibold hover:bg-sky-800 transition-colors text-sm"
                >
                  <i className="fab fa-whatsapp mr-2"></i>Get Support
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
