import { getProductByName } from "../lib/blogAds";
import { getProductBoxImage } from "../lib/productImage";
import HeroBillboard, { type BillboardProduct } from "./HeroBillboard";

// Best sellers the hero box rotates through, with the name shown on the box
// spine and button, and a spine colour that matches each product's box art.
const ROTATION: { name: string; short: string; accent: string }[] = [
  { name: "Office 2024 Professional Plus", short: "Office 2024", accent: "#d83b01" },
  { name: "Windows 11 Pro", short: "Windows 11 Pro", accent: "#0067b8" },
  { name: "Windows 11 Pro + Office 2024 Pro Plus Bundle", short: "Windows 11 + Office", accent: "#0b4a8a" },
  { name: "Windows 11 Home", short: "Windows 11 Home", accent: "#0078d4" },
];

// Server wrapper: prices come straight from the catalog.
export default function Hero3D() {
  const products: BillboardProduct[] = [];
  for (const r of ROTATION) {
    const p = getProductByName(r.name);
    if (p)
      products.push({
        name: p.name,
        short: r.short,
        slug: p.slug,
        price: p.price,
        originalPrice: p.originalPrice,
        image: getProductBoxImage(p.name),
        accent: r.accent,
      });
  }
  if (products.length < 2) return null;
  return <HeroBillboard products={products} />;
}
