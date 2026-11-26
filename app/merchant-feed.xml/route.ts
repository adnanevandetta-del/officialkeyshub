// Google Merchant Center product feed (RSS 2.0 with the g: namespace).
// Add https://www.officialkeyshub.com/merchant-feed.xml in Merchant Center as a
// scheduled-fetch data source to get free Shopping listings. Built from the
// catalog, so prices and stock always match the product pages.
//
// Only real everyday prices are sent (no "was" price); the Black Friday code is
// a checkout code, not a listed sale price.

import { canonicalProducts, categoryLabel, type FlatProduct } from "../lib/catalog";

const SITE = "https://www.officialkeyshub.com";

export const dynamic = "force-static";

const ANTIVIRUS_BRANDS = ["Trend Micro", "Kaspersky", "Norton", "Bitdefender", "McAfee", "ESET", "Avast"];
function brandOf(p: FlatProduct): string {
  if (p.category !== "antivirus") return "Microsoft";
  return ANTIVIRUS_BRANDS.find((b) => p.name.startsWith(b)) ?? p.name.split(" ")[0];
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function price(p: string): string {
  return `${parseFloat(p.replace(/[^0-9.]/g, "")).toFixed(2)} USD`;
}

function item(p: FlatProduct): string {
  const desc = `${p.description}. ${p.features.join(", ")}. Product key delivered by email after payment, with a 30-day money-back guarantee.`;
  return `    <item>
      <g:id>${esc(p.slug)}</g:id>
      <g:title>${esc(`${p.name} - Product Key`)}</g:title>
      <g:description>${esc(desc)}</g:description>
      <g:link>${SITE}/products/${p.slug}</g:link>
      <g:image_link>${SITE}/og/${p.slug}.jpg</g:image_link>
      <g:availability>${p.outOfStock ? "out_of_stock" : "in_stock"}</g:availability>
      <g:price>${price(p.price)}</g:price>
      <g:brand>${esc(brandOf(p))}</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>313</g:google_product_category>
      <g:product_type>${esc(`Software > ${categoryLabel[p.category]}`)}</g:product_type>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Email delivery</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
    </item>`;
}

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Official Keys Hub</title>
    <link>${SITE}</link>
    <description>Windows, Office and software license keys</description>
${canonicalProducts.map(item).join("\n")}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
