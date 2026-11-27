import { getProductByName } from "../lib/blogAds";
import { getProductFaceImage } from "../lib/productImage";
import { type BundleOffer } from "./HeroBillboard";
import HeroOrbit from "./HeroOrbit";

const BUNDLE = "Windows 11 Pro + Office 2024 Pro Plus Bundle";
const ITEMS = [
  { name: "Windows 11 Pro", short: "Windows 11 Pro", accent: "#0067b8", perks: "Remote Desktop, BitLocker, Hyper-V" },
  { name: "Office 2024 Professional Plus", short: "Office 2024", accent: "#d83b01", perks: "Word, Excel, PowerPoint, Outlook, Access" },
] as const;

const num = (s: string) => parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
const usd = (n: number) => `$${n.toFixed(2)}`;

// Server wrapper: the bundle offer and its saving come straight from the catalog,
// so the "Save $X" figure is always the real difference vs buying separately.
export default function Hero3D() {
  const bundle = getProductByName(BUNDLE);
  const parts = ITEMS.map((it) => ({ it, p: getProductByName(it.name) }));
  if (!bundle || parts.some((x) => !x.p)) return null;

  const separately = parts.reduce((sum, x) => sum + num(x.p!.price), 0);
  const save = separately - num(bundle.price);
  if (save <= 0) return null; // never advertise a "saving" that isn't one

  const offer: BundleOffer = {
    slug: bundle.slug,
    price: bundle.price,
    separately: usd(separately),
    save: usd(save),
    items: parts.map(({ it, p }) => ({
      name: p!.name,
      short: it.short,
      price: p!.price,
      image: getProductFaceImage(p!.name),
      accent: it.accent,
      perks: it.perks,
    })) as BundleOffer["items"],
  };
  return <HeroOrbit offer={offer} />;
}
