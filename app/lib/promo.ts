// Site-wide promotional discount: a single 15% code that a customer
// generates by logging in with their email. Everything is client-side
// (this is a static/mock storefront), persisted in localStorage.

export const PROMO_PERCENT = 15;
export const PROMO_PREFIX = "KEYS15";
// Codes issued under earlier offers (KEYS30-, KEYS20-XXXX) keep working, at the current rate.
const LEGACY_PREFIXES = ["KEYS30", "KEYS20"];

const STORAGE_KEY = "okh_promo";

export interface StoredPromo {
  email: string;
  code: string;
  percent: number;
}

// Deterministic 4-char suffix derived from the email so the same email
// always produces the same code.
function emailSuffix(email: string): string {
  const normalized = email.trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash * 31 + normalized.charCodeAt(i)) & 0xffffffff;
  }
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars
  let suffix = "";
  let n = Math.abs(hash);
  for (let i = 0; i < 4; i++) {
    suffix += alphabet[n % alphabet.length];
    n = Math.floor(n / alphabet.length);
  }
  return suffix;
}

export function generatePromoCode(email: string): string {
  return `${PROMO_PREFIX}-${emailSuffix(email)}`;
}

// Save (or refresh) the promo tied to an email and return it.
export function savePromoForEmail(email: string): StoredPromo {
  const promo: StoredPromo = {
    email: email.trim().toLowerCase(),
    code: generatePromoCode(email),
    percent: PROMO_PERCENT,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(promo));
  } catch {
    // storage unavailable (private mode, blocked) — code is still returned
  }
  return promo;
}

export function clearStoredPromo(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function getStoredPromo(): StoredPromo | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredPromo;
    if (parsed && typeof parsed.code === "string") return parsed;
    return null;
  } catch {
    return null;
  }
}

// A code is valid if it matches the stored code, or matches the expected
// KEYS15-XXXX format (so a code generated on another device still works).
export function validatePromoCode(code: string): number {
  const cleaned = code.trim().toUpperCase();
  if (!cleaned) return 0;
  if (cleaned === BF_CODE) return blackFridayActive() ? BF_PERCENT : 0;
  const stored = getStoredPromo();
  if (stored && cleaned === stored.code.toUpperCase()) return PROMO_PERCENT;
  const prefixes = [PROMO_PREFIX, ...LEGACY_PREFIXES].join("|");
  if (new RegExp(`^(${prefixes})-[A-Z0-9]{4}$`).test(cleaned)) return PROMO_PERCENT;
  return 0;
}

// ── Black Friday sale ────────────────────────────────────────────────────
// One public code for everyone (no log-in needed). No end date: the sale runs
// until BF_ON is set to false. Turning it off removes the banner, the deal
// prices and the code, and the site falls back to the normal 15% offer.
// Only raise BF_PERCENT after checking it keeps the 60% margin floor.
export const BF_ON = true;
export const BF_CODE = "BF20";
export const BF_PERCENT = 20;

export function blackFridayActive(): boolean {
  return BF_ON;
}

// Applies the sale percentage to a "$12.99" price string, e.g. "$10.39".
export function bfPrice(price: string): string {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  if (!isFinite(n)) return price;
  return `$${(Math.round(n * (100 - BF_PERCENT)) / 100).toFixed(2)}`;
}
