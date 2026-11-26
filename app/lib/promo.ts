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
// One public code for everyone (no log-in needed). The sale ends for real at
// Cyber Monday 11:59 PM ET (BF_ENDS_AT); after that the banner, deal prices
// and code switch off by themselves and the site falls back to the normal 15%
// offer. BF_ON = false takes it down early. A real deadline is shown on the
// site, so never move it later to fake urgency.
// Only raise BF_PERCENT after checking it keeps the 60% margin floor.
export const BF_ON = true;
export const BF_CODE = "BF20";
export const BF_PERCENT = 20;
// Mon 30 Nov 2026, 11:59:59 PM Eastern (EST, UTC-5).
export const BF_ENDS_AT = Date.parse("2026-12-01T04:59:59Z");
export const BF_ENDS_LABEL = "Cyber Monday, Nov 30 at 11:59 PM ET";

export function blackFridayActive(now: number = Date.now()): boolean {
  return BF_ON && now < BF_ENDS_AT;
}

// "2d 4h left", "5h 12m left", "8m left" — or "" once the sale is over.
export function bfTimeLeft(now: number = Date.now()): string {
  const ms = BF_ENDS_AT - now;
  if (ms <= 0) return "";
  const m = Math.floor(ms / 60000);
  const d = Math.floor(m / 1440);
  const h = Math.floor((m % 1440) / 60);
  const min = m % 60;
  if (d > 0) return `${d}d ${h}h left`;
  if (h > 0) return `${h}h ${min}m left`;
  return `${Math.max(min, 1)}m left`;
}

// ── Volume discount for business software ────────────────────────────────
// Buying VOLUME_MIN or more keys from the business lines (Server, SQL Server,
// Visual Studio, Visio, Project) takes an extra VOLUME_PERCENT off those
// items, on top of any promo code. Check the 60% margin floor before raising.
export const VOLUME_MIN = 3;
export const VOLUME_PERCENT = 5;
export const VOLUME_CATEGORIES = ["server", "sql", "visualstudio", "visio", "project"] as const;

// Applies the sale percentage to a "$12.99" price string, e.g. "$10.39".
export function bfPrice(price: string): string {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  if (!isFinite(n)) return price;
  return `$${(Math.round(n * (100 - BF_PERCENT)) / 100).toFixed(2)}`;
}
