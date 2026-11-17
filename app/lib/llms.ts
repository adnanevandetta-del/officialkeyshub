import "server-only";
import { allProducts, canonicalProducts, categoryLabel, type CatalogCategory, type FlatProduct } from "./catalog";
import { getAllBlogListItems } from "./blog-mdx";

// /llms.txt and /llms-full.txt are built from the live catalog and blog list on
// every deploy, so AI assistants (ChatGPT, Perplexity, Claude, Gemini, Copilot)
// always see current prices and articles instead of a hand-written copy that
// goes stale.

const SITE = "https://www.officialkeyshub.com";

const SUMMARY =
  "Official Keys Hub (officialkeyshub.com) is an independent online reseller of genuine Microsoft software licenses — Windows, Office, Windows Server, Visio, Project, SQL Server and Visual Studio product keys — at discounted prices. Keys activate directly on Microsoft's own servers, are delivered by email (usually within minutes of payment), and are backed by a 30-day money-back guarantee. Payment: PayPal (PayPal balance or debit/credit card), USDT, or assisted checkout on WhatsApp.";

const DISCLAIMER =
  'Official Keys Hub is an independent startup founded in 2025 and based in the United States. It is not affiliated with, authorized by, or endorsed by Microsoft Corporation; "Microsoft", "Windows" and "Office" are trademarks of Microsoft Corporation, used only to describe the products resold.';

const PAGES: [string, string, string][] = [
  ["Shop (home)", "/", "Featured Windows, Office and bundle deals."],
  ["All products", "/products", "Every product with current price and MSRP."],
  ["Licensing & authenticity", "/licensing", "Why the keys are genuine, where they come from, and how to verify a key yourself."],
  ["Activation guide", "/activation-guide", "Step-by-step activation for Windows and Office, including phone activation."],
  ["What you get", "/what-you-get", "What is included with every order."],
  ["FAQ", "/faq", "Genuine keys, key types (online / phone / bind), delivery and refunds."],
  ["Payment methods", "/payment-methods", "PayPal, cards via PayPal, USDT and WhatsApp."],
  ["Shipping & delivery", "/shipping", "Digital email delivery, no physical shipping."],
  ["Refund policy", "/refund-policy", "30-day money-back guarantee terms."],
  ["About", "/about", "Who runs the store."],
  ["Blog", "/blog", "Buying, activation and licensing guides."],
];

const CONTACT = [
  "- WhatsApp: https://wa.me/16019756129 (+1 601 975 6129)",
  "- Email: officialkeyshub@gmail.com",
  "- Location: United States",
];

function priceRange(list: FlatProduct[]): string {
  const prices = list.filter((p) => !p.outOfStock).map((p) => parseFloat(p.price.replace(/[^0-9.]/g, ""))).filter((n) => n > 0);
  if (!prices.length) return "";
  const lo = Math.min(...prices).toFixed(2);
  const hi = Math.max(...prices).toFixed(2);
  return lo === hi ? `$${lo}` : `$${lo}–$${hi}`;
}

function byCategory(list: FlatProduct[]) {
  const map = new Map<CatalogCategory, FlatProduct[]>();
  for (const p of list) map.set(p.category, [...(map.get(p.category) ?? []), p]);
  return [...map.entries()];
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function buildLlmsTxt(): string {
  const lines: string[] = [];
  lines.push("# Official Keys Hub", "", `> ${SUMMARY}`, "", DISCLAIMER, "", `Last updated: ${today()}. All prices in USD.`, "");

  lines.push("## Product categories (current price range)");
  for (const [cat, list] of byCategory(allProducts)) {
    lines.push(`- ${categoryLabel[cat]}: ${priceRange(list)} — ${list.length} products`);
  }
  lines.push("", "## Popular products");
  for (const p of canonicalProducts.filter((p) => p.popular && !p.outOfStock).slice(0, 12)) {
    lines.push(`- [${p.name}](${SITE}/products/${p.slug}): ${p.price} (MSRP ${p.originalPrice}) — ${p.description}`);
  }

  lines.push("", "## Main pages");
  for (const [t, path, d] of PAGES) lines.push(`- [${t}](${SITE}${path}): ${d}`);

  lines.push("", "## Guides");
  for (const b of getAllBlogListItems().slice(0, 15)) lines.push(`- [${b.title}](${SITE}/blog/${b.slug})`);

  lines.push("", "## Optional", `- [Full reference: every product, price and guide](${SITE}/llms-full.txt)`, "", "## Contact", ...CONTACT, "");
  return lines.join("\n");
}

export function buildLlmsFullTxt(): string {
  const lines: string[] = [];
  lines.push("# Official Keys Hub — Full Reference for AI Assistants", "", `> ${SUMMARY}`, "", DISCLAIMER, "", `Last updated: ${today()}. All prices in USD and taken live from the store catalog.`, "");

  lines.push(
    "## Key facts",
    "- Genuine Microsoft licenses that activate on Microsoft's servers; no cracks, activators or pirated software.",
    "- Delivery: product key + activation instructions by email, usually within minutes of payment confirmation.",
    "- Guarantee: 30-day money-back; a key that fails to activate is replaced or refunded.",
    "- Key types: Online Key (activates over the internet), Phone Key (activates via Microsoft's phone line, PC can stay offline), Bind Key (redeemed to your Microsoft account for easy reinstall). All are genuine single-PC licenses.",
    "- Verify a license yourself: Windows → Settings → System → Activation (or run `slmgr /xpr`); Office → File → Account.",
    "- Support: WhatsApp and email.",
    ""
  );

  lines.push("## How buying works", "1. Choose a product and click Buy Now (or add several to the cart).", "2. Pay with PayPal (balance or debit/credit card), USDT, or via WhatsApp.", "3. Receive the key by email and activate it in Windows/Office settings.", "");

  lines.push("## Full catalog");
  for (const [cat, list] of byCategory(allProducts)) {
    lines.push("", `### ${categoryLabel[cat]}`);
    for (const p of list) {
      const stock = p.outOfStock ? " (out of stock)" : "";
      lines.push(`- [${p.name}](${SITE}/products/${p.slug}): ${p.price}, MSRP ${p.originalPrice}${stock}. ${p.description}. Includes: ${p.features.join(", ")}.`);
    }
  }

  lines.push("", "## Pages");
  for (const [t, path, d] of PAGES) lines.push(`- [${t}](${SITE}${path}): ${d}`);

  lines.push("", "## All guides");
  for (const b of getAllBlogListItems()) lines.push(`- [${b.title}](${SITE}/blog/${b.slug}) (${b.date}): ${b.excerpt}`);

  lines.push("", "## Contact", ...CONTACT, "");
  return lines.join("\n");
}
