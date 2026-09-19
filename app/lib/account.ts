// Customer account + order history, stored in the customer's own browser
// (localStorage). Nothing here is sample data: the account holds what the
// customer typed at sign-in, and orders are recorded when they start a
// checkout. Keys are never stored or shown on the site — they are delivered
// by email / WhatsApp after payment is confirmed.

import { useEffect, useState } from "react";
import { getStoredPromo, savePromoForEmail, clearStoredPromo } from "./promo";

export type OrderStatus = "pending" | "delivered" | "cancelled";
export type PaymentMethod = "paypal" | "usdt" | "whatsapp";

export interface Account {
  name: string;
  email: string;
  phone: string;
  createdAt: string; // ISO date
}

export interface OrderItem {
  name: string;
  price: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string; // ISO date
  items: OrderItem[];
  total: number; // USD, after any promo code
  method: PaymentMethod;
  email?: string; // delivery email, when the customer gave one
  promoCode?: string;
  status: OrderStatus;
}

const ACCOUNT_KEY = "okh_account";
const ORDERS_KEY = "okh_orders";
const CHANGE_EVENT = "okh-data-changed";

export const money = (n: number) => `$${n.toFixed(2)}`;
export const priceToNumber = (price: string) => parseFloat(price.replace(/[^0-9.]/g, "")) || 0;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown, notify = true) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage blocked (private mode) — nothing to do
  }
  if (notify) window.dispatchEvent(new Event(CHANGE_EVENT));
}

// ---------------------------------------------------------------- account

export function getAccount(): Account | null {
  const saved = read<Account | null>(ACCOUNT_KEY, null);
  if (saved && saved.email) return saved;

  // Customers who already generated a promo code have an email on file.
  const promo = getStoredPromo();
  if (promo?.email) {
    const account: Account = { name: "", email: promo.email, phone: "", createdAt: new Date().toISOString() };
    write(ACCOUNT_KEY, account, false);
    return account;
  }
  return null;
}

export function saveAccount(input: { name?: string; email: string; phone?: string }): Account {
  const existing = read<Account | null>(ACCOUNT_KEY, null);
  const email = input.email.trim().toLowerCase();
  const account: Account = {
    name: (input.name ?? existing?.name ?? "").trim(),
    email,
    phone: (input.phone ?? existing?.phone ?? "").trim(),
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
  write(ACCOUNT_KEY, account);
  savePromoForEmail(email); // keep the customer's promo code tied to their email
  return account;
}

export function signOut() {
  try {
    localStorage.removeItem(ACCOUNT_KEY);
  } catch {
    // ignore
  }
  clearStoredPromo();
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function deleteAllData() {
  try {
    localStorage.removeItem(ORDERS_KEY);
  } catch {
    // ignore
  }
  signOut();
}

export function displayName(account: Account | null): string {
  if (!account) return "";
  return account.name || account.email.split("@")[0];
}

// ----------------------------------------------------------------- orders

export function getOrders(): Order[] {
  const list = read<Order[]>(ORDERS_KEY, []);
  return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
}

function newOrderId(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `OKH-${ymd}-${suffix}`;
}

export function addOrder(input: {
  items: OrderItem[];
  total: number;
  method: PaymentMethod;
  email?: string;
  promoCode?: string;
}): Order {
  const list = read<Order[]>(ORDERS_KEY, []);

  // Clicking "Pay" twice in a row should not create two orders.
  const signature = (o: { items: OrderItem[]; total: number; method: PaymentMethod }) =>
    `${o.method}|${o.total.toFixed(2)}|${o.items.map((i) => `${i.quantity}x${i.name}`).join(",")}`;
  const recent = list.find(
    (o) =>
      o.status === "pending" &&
      signature(o) === signature(input) &&
      Date.now() - new Date(o.date).getTime() < 10 * 60 * 1000
  );
  if (recent) return recent;

  const order: Order = {
    id: newOrderId(),
    date: new Date().toISOString(),
    items: input.items,
    total: input.total,
    method: input.method,
    email: input.email?.trim() || getAccount()?.email,
    promoCode: input.promoCode,
    status: "pending",
  };
  write(ORDERS_KEY, [order, ...list]);
  return order;
}

// Used by the single-product "Buy Now" buttons.
export function recordQuickOrder(name: string, price: string, method: PaymentMethod): Order {
  return addOrder({ items: [{ name, price, quantity: 1 }], total: priceToNumber(price), method });
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  const list = read<Order[]>(ORDERS_KEY, []);
  write(ORDERS_KEY, list.map((o) => (o.id === id ? { ...o, status } : o)));
}

export function removeOrder(id: string) {
  const list = read<Order[]>(ORDERS_KEY, []);
  write(ORDERS_KEY, list.filter((o) => o.id !== id));
}

export function exportData(): string {
  return JSON.stringify({ account: getAccount(), orders: getOrders(), exportedAt: new Date().toISOString() }, null, 2);
}

// ------------------------------------------------------------------- hook

export function useAccountData() {
  const [state, setState] = useState<{ account: Account | null; orders: Order[]; ready: boolean }>({
    account: null,
    orders: [],
    ready: false,
  });

  useEffect(() => {
    const refresh = () => setState({ account: getAccount(), orders: getOrders(), ready: true });
    refresh();
    window.addEventListener(CHANGE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CHANGE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return state;
}
