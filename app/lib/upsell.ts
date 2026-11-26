import { allProducts, type FlatProduct } from "./catalog";
import { VOLUME_CATEGORIES, VOLUME_MIN, VOLUME_PERCENT } from "./promo";

// Checkout upsells and the business volume discount. Pure functions over the
// cart so the checkout page, the cart modal and the WhatsApp message agree.

export interface CartLine {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export const toNumber = (price: string) => parseFloat(price.replace(/[^0-9.]/g, "")) || 0;

const byName = (name: string): FlatProduct | undefined =>
  allProducts.find((p) => p.name === name && !p.outOfStock);

export function cartItemId(name: string): string {
  // Same id scheme as ProductBuySection / Products, so adding the same product
  // twice bumps the quantity instead of making a second line.
  return name.toLowerCase().replace(/\s+/g, "-");
}

// ── Upgrade a single product to the Windows + Office bundle ──────────────
// Each entry: the product in the cart → the bundle that contains it, and the
// other half of the bundle (used to show the honest "bought separately" price).
const UPGRADES: { from: string; bundle: string; other: string }[] = [
  { from: "Windows 11 Pro", bundle: "Windows 11 Pro + Office 2021 Pro Plus Bundle", other: "Office 2021 Professional Plus" },
  { from: "Windows 10 Pro", bundle: "Windows 10 Pro + Office 2021 Pro Plus Bundle", other: "Office 2021 Professional Plus" },
  { from: "Office 2021 Professional Plus", bundle: "Windows 11 Pro + Office 2021 Pro Plus Bundle", other: "Windows 11 Pro" },
  { from: "Office 2024 Professional Plus", bundle: "Windows 11 Pro + Office 2024 Pro Plus Bundle", other: "Windows 11 Pro" },
];

export interface BundleUpsell {
  kind: "bundle";
  line: CartLine; // the cart line to replace
  bundle: FlatProduct;
  extra: number; // what the upgrade adds to the order, per unit
  separately: number; // price of the two products bought one by one, per unit
}

export interface AddOnUpsell {
  kind: "addon";
  product: FlatProduct;
  reason: string;
}

export type Upsell = BundleUpsell | AddOnUpsell;

const isWindows = (name: string) => /^windows (11|10)/i.test(name) && !/server|365/i.test(name);
const isOffice = (name: string) => /^office/i.test(name) && !/365/i.test(name);
const isBundle = (name: string) => /bundle/i.test(name);

export function findUpsell(cart: CartLine[]): Upsell | null {
  if (cart.length === 0 || cart.some((l) => isBundle(l.name))) return null;
  const hasWindows = cart.some((l) => isWindows(l.name));
  const hasOffice = cart.some((l) => isOffice(l.name));

  // 1. A single Windows or Office key and nothing of the other kind → bundle.
  if (!(hasWindows && hasOffice)) {
    for (const u of UPGRADES) {
      const line = cart.find((l) => l.name === u.from);
      const bundle = byName(u.bundle);
      const other = byName(u.other);
      if (!line || !bundle || !other) continue;
      const extra = toNumber(bundle.price) - toNumber(line.price);
      const separately = toNumber(line.price) + toNumber(other.price);
      if (extra > 0 && separately > toNumber(bundle.price)) {
        return { kind: "bundle", line, bundle, extra, separately };
      }
    }
  }

  // 2. Office (any edition) but no Windows key → offer Windows 11 Pro.
  if (hasOffice && !hasWindows) {
    const win = byName("Windows 11 Pro");
    if (win) return { kind: "addon", product: win, reason: "Setting up a new PC? Add the Windows key too." };
  }

  // 3. Windows but no Office → offer Office 2021 Pro Plus.
  if (hasWindows && !hasOffice) {
    const office = byName("Office 2021 Professional Plus");
    if (office) return { kind: "addon", product: office, reason: "Add Word, Excel, PowerPoint and Outlook for life." };
  }
  return null;
}

// ── Volume discount on business software ─────────────────────────────────
const businessNames = new Set(
  allProducts
    .filter((p) => (VOLUME_CATEGORIES as readonly string[]).includes(p.category))
    .map((p) => p.name),
);

export function isBusinessProduct(name: string): boolean {
  return businessNames.has(name);
}

export interface VolumeInfo {
  units: number; // business keys in the cart
  subtotal: number; // their price before any discount
  qualifies: boolean;
  needed: number; // keys still needed to qualify
}

export function volumeInfo(cart: CartLine[]): VolumeInfo {
  const lines = cart.filter((l) => isBusinessProduct(l.name));
  const units = lines.reduce((s, l) => s + l.quantity, 0);
  const subtotal = lines.reduce((s, l) => s + toNumber(l.price) * l.quantity, 0);
  return { units, subtotal, qualifies: units >= VOLUME_MIN, needed: Math.max(0, VOLUME_MIN - units) };
}

// Extra discount in dollars, applied to the business items after the promo code.
export function volumeDiscount(cart: CartLine[], promoPercent: number): number {
  const v = volumeInfo(cart);
  if (!v.qualifies) return 0;
  const afterPromo = v.subtotal * (1 - promoPercent / 100);
  return Math.round(afterPromo * VOLUME_PERCENT) / 100;
}

export { VOLUME_MIN, VOLUME_PERCENT };
