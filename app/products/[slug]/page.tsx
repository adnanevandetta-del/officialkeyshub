import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductBuySection from "../../components/ProductBuySection";
import { getProductImage } from "../../lib/productImage";
import {
  allProducts,
  getProductBySlug,
  canonicalSlugFor,
  categoryLabel,
  type CatalogCategory,
  type FlatProduct,
} from "../../lib/catalog";

const SITE = "https://www.officialkeyshub.com";

function numericPrice(p: string): string {
  return parseFloat(p.replace(/[^0-9.]/g, "")).toFixed(2);
}

// Category-specific overview copy so each page reads distinctly by product
// family (not one boilerplate paragraph repeated across the whole catalog).
const categoryIntro: Record<CatalogCategory, string> = {
  bundles:
    "This bundle pairs a full Windows license with the Office suite, so you can set up a new PC end to end for one low price instead of buying each license separately.",
  windows:
    "Windows licenses from Official Keys Hub give you the full desktop operating system with security updates and feature upgrades, activated permanently against your hardware or Microsoft account.",
  office:
    "This Office license unlocks the full desktop apps — Word, Excel, PowerPoint and more — installed locally with no ongoing subscription, so you own the version you buy for good.",
  server:
    "Windows Server licensing is built for businesses running on-premises workloads, virtual machines and network roles. This license activates genuinely and is covered by our replacement guarantee.",
  visio:
    "Visio and Project are Microsoft's professional diagramming and planning tools. This license installs the full desktop application for building flowcharts, org charts and project schedules.",
  project:
    "Microsoft Project is the industry standard for planning schedules, tracking tasks and managing resources. This license installs the complete desktop application, activated for good.",
  sql:
    "SQL Server powers databases and business applications at scale. This genuine license activates with Microsoft and is ideal for developers and businesses running production or test workloads.",
  visualstudio:
    "Visual Studio is Microsoft's flagship IDE for building apps across web, desktop, cloud and mobile. This license unlocks the full professional development environment.",
  antivirus:
    "This security license keeps your devices protected with real-time malware, ransomware and phishing defense, backed by regular definition updates for the full term of the license.",
};

// Product-specific "at a glance" facts, derived only from catalog data.
function savingsPct(p: FlatProduct): number | null {
  const now = parseFloat(p.price.replace(/[^0-9.]/g, ""));
  const was = parseFloat((p.originalPrice || "").replace(/[^0-9.]/g, ""));
  if (!now || !was || was <= now) return null;
  return Math.round(((was - now) / was) * 100);
}

function specsFor(p: FlatProduct): { label: string; value: string }[] {
  const feats = p.features.join(" ").toLowerCase();
  const licenseType = /lifetime/.test(feats)
    ? "Lifetime (one-time purchase)"
    : /subscription|1 year|12 month|annual/.test(feats)
      ? "Subscription"
      : "Genuine license";
  const activation = /phone activation|offline/.test(feats)
    ? "Phone / offline activation"
    : /online activation|digital/.test(feats)
      ? "Online (Microsoft servers)"
      : "Standard product key";
  const deviceFeat = p.features.find((f) => /\bpc\b|device|user/i.test(f));
  const specs: { label: string; value: string }[] = [
    { label: "Product", value: p.name },
    { label: "Category", value: categoryLabel[p.category] },
    { label: "License type", value: licenseType },
    { label: "Activation", value: activation },
    { label: "Coverage", value: deviceFeat ?? "1 device" },
    { label: "Delivery", value: "Instant email delivery" },
    { label: "Price", value: p.price },
  ];
  const pct = savingsPct(p);
  if (pct) specs.push({ label: "You save", value: `${pct}% vs ${p.originalPrice}` });
  return specs;
}

function keywordsFor(p: FlatProduct): string {
  const n = p.name;
  const cat = categoryLabel[p.category];
  return [
    n,
    `buy ${n}`,
    `${n} key`,
    `${n} product key`,
    `${n} license`,
    `cheap ${n}`,
    `genuine ${n}`,
    `${n} activation key`,
    `${cat} key`,
    `${cat} license`,
    "genuine microsoft key",
    "instant delivery software key",
    "cheap microsoft license",
  ].join(", ");
}

function metaDescription(p: FlatProduct): string {
  return `Buy ${p.name} — a genuine Microsoft license for ${p.price}${p.originalPrice ? ` (was ${p.originalPrice})` : ""}. ${p.description}. Instant email delivery, activates directly with Microsoft, and backed by a 30-day money-back guarantee.`;
}

function faqsFor(p: FlatProduct) {
  return [
    {
      q: `Is this ${p.name} key genuine?`,
      a: `Yes. Every ${p.name} key we sell is a genuine Microsoft license that activates on Microsoft's own servers and receives official updates. We never sell cracked or pirated software.`,
    },
    {
      q: `How is my ${p.name} key delivered?`,
      a: `Instantly. After payment your product key is emailed to you — usually within a few minutes — along with clear step-by-step activation instructions.`,
    },
    {
      q: `How do I activate ${p.name}?`,
      a: `Enter the key in the product's activation settings and it validates directly with Microsoft. Our Activation Guide walks you through it, and 24/7 support is available if you get stuck.`,
    },
    {
      q: `Is it legal to buy ${p.name} at this price?`,
      a: `Yes. We are an independent reseller of genuine licenses, sold lawfully under EU resale rights (the UsedSoft v. Oracle ruling). The low price comes from legitimate sourcing, not from anything counterfeit.`,
    },
    {
      q: `What if the ${p.name} key doesn't work?`,
      a: `If a key ever fails to activate, our support team provides a free replacement — or a full refund within 30 days. You're always protected.`,
    },
  ];
}

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Product Not Found | Official Keys Hub" };
  // Variants ("- Online/Phone/Bind Key") canonicalize to their base product.
  const canonicalUrl = `${SITE}/products/${canonicalSlugFor(p)}`;
  const url = canonicalUrl;
  const desc = metaDescription(p);
  return {
    title: `${p.name} — Genuine Key, Instant Delivery`,
    description: desc,
    keywords: keywordsFor(p),
    alternates: { canonical: url },
    openGraph: {
      title: `${p.name} — Genuine Microsoft Key | Official Keys Hub`,
      description: `${p.name} for ${p.price}. Instant delivery, genuine license, 30-day money-back guarantee.`,
      url,
      type: "website",
      images: [{ url: `${SITE}/og/${p.slug}.jpg`, width: 1200, height: 630, alt: `${p.name} — Official Keys Hub` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name} — Genuine Microsoft Key | Official Keys Hub`,
      description: `${p.name} for ${p.price}. Instant delivery, genuine license, 30-day money-back guarantee.`,
      images: [`${SITE}/og/${p.slug}.jpg`],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  const url = `${SITE}/products/${p.slug}`;
  const img = `${SITE}/og/${p.slug}.jpg`;
  const cat = categoryLabel[p.category];
  const faqs = faqsFor(p);
  const related = allProducts
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: p.name,
        description: metaDescription(p),
        image: img,
        sku: p.slug,
        brand: { "@type": "Brand", name: "Microsoft" },
        category: cat,
        offers: {
          "@type": "Offer",
          url,
          price: numericPrice(p.price),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          priceValidUntil: "2027-12-31",
          seller: { "@type": "Organization", name: "Official Keys Hub" },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: cat, item: `${SITE}/#products` },
          { "@type": "ListItem", position: 3, name: p.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-400 mb-6 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-sky-400">Home</Link>
            <span>/</span>
            <Link href="/#products" className="hover:text-sky-400">{cat}</Link>
            <span>/</span>
            <span className="text-slate-200 font-semibold">{p.name}</span>
          </nav>

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
            {/* Image */}
            <div className="relative h-64 md:h-80 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900 border border-white/10 flex items-center justify-center overflow-hidden">
              <Image
                src={getProductImage(p.name)}
                alt={`${p.name} genuine product key`}
                fill
                unoptimized
                className="object-contain p-6"
                priority
              />
              {p.badge && (
                <span className="absolute top-4 left-4 bg-sky-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {p.badge}
                </span>
              )}
            </div>

            {/* Buy panel */}
            <div>
              <div className="inline-flex items-center gap-2 bg-sky-600/15 border border-sky-600/30 px-3 py-1 rounded-full mb-3">
                <i className="fas fa-microchip text-sky-400 text-xs"></i>
                <span className="text-sky-400 text-xs font-bold uppercase tracking-wide">{cat}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{p.name}</h1>
              <p className="text-slate-300 mb-5">{p.description}</p>
              <ProductBuySection name={p.name} price={p.price} originalPrice={p.originalPrice} />
            </div>
          </div>

          {/* Overview + features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
            <div className="lg:col-span-2 prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">About {p.name}</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Looking to <strong>buy {p.name}</strong> without paying full retail? Official Keys Hub delivers a
                genuine {p.name} product key for <strong>{p.price}</strong>{p.originalPrice ? <> instead of {p.originalPrice}</> : null} — a genuine
                Microsoft license that activates directly on Microsoft&rsquo;s own servers. {p.description}, and it&rsquo;s
                delivered to your inbox within minutes of purchase.
              </p>
              <p className="text-slate-300 leading-relaxed mb-6">{categoryIntro[p.category]}</p>

              <h3 className="text-xl font-bold text-white mt-2 mb-3">{p.name} at a glance</h3>
              <div className="overflow-hidden rounded-xl border border-white/10 mb-2">
                <table className="w-full text-sm">
                  <tbody>
                    {specsFor(p).map((s, i) => (
                      <tr key={s.label} className={i % 2 ? "bg-white/[0.02]" : ""}>
                        <th scope="row" className="text-left font-semibold text-slate-400 px-4 py-2.5 w-2/5 align-top">
                          {s.label}
                        </th>
                        <td className="text-slate-200 px-4 py-2.5">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                As an independent reseller operating under EU resale rights, we source every {cat.toLowerCase()} license
                through legitimate channels — so you get the real thing at a fair price, backed by our 30-day money-back
                guarantee and 24/7 support. Not sure how activation works? Our{" "}
                <Link href="/activation-guide" className="text-sky-400 hover:underline">Activation Guide</Link>{" "}
                walks you through every step, and you can read more about how we keep keys genuine on our{" "}
                <Link href="/licensing" className="text-sky-400 hover:underline">Licensing &amp; Authenticity</Link>{" "}page.
              </p>

              <h3 className="text-xl font-bold text-white mt-8 mb-3">What you get</h3>
              <ul className="space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-slate-300">
                    <i className="fas fa-check text-emerald-400 mt-1"></i>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-white mt-8 mb-3">How to activate {p.name}</h3>
              <ol className="space-y-2 text-slate-300 list-decimal pl-6">
                <li>Complete your purchase and receive the key by email (usually within minutes).</li>
                <li>Open the product&rsquo;s activation settings and enter your key.</li>
                <li>The key validates directly with Microsoft and activates your license.</li>
                <li>Need help? Message our 24/7 support on WhatsApp for step-by-step assistance.</li>
              </ol>
            </div>

            {/* Trust sidebar */}
            <aside className="space-y-4">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4">Why buy from us</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2"><i className="fas fa-certificate text-sky-400 mt-0.5"></i> Genuine license, activates with Microsoft</li>
                  <li className="flex items-start gap-2"><i className="fas fa-bolt text-sky-400 mt-0.5"></i> Instant email delivery</li>
                  <li className="flex items-start gap-2"><i className="fas fa-scale-balanced text-sky-400 mt-0.5"></i> Legally resold under EU law</li>
                  <li className="flex items-start gap-2"><i className="fas fa-rotate-left text-sky-400 mt-0.5"></i> 30-day money-back guarantee</li>
                  <li className="flex items-start gap-2"><i className="fas fa-headset text-sky-400 mt-0.5"></i> 24/7 WhatsApp &amp; email support</li>
                </ul>
              </div>
            </aside>
          </div>

          {/* FAQ */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently asked questions</h2>
            <div className="space-y-4 max-w-3xl">
              {faqs.map((f) => (
                <div key={f.q} className="glass rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">{f.q}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Related {cat} keys</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/products/${r.slug}`}
                    className="glass glow-hover rounded-xl p-4 transition-all"
                  >
                    <div className="relative h-24 mb-3 rounded-lg bg-gradient-to-b from-slate-800/80 to-slate-900 overflow-hidden flex items-center justify-center">
                      <Image src={getProductImage(r.name)} alt={r.name} fill unoptimized className="object-contain p-2" />
                    </div>
                    <p className="text-white text-sm font-semibold line-clamp-2 mb-1">{r.name}</p>
                    <p className="text-sky-400 font-bold">{r.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
