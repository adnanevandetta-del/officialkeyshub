import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { allProducts } from "../lib/catalog";
import { getProductBoxImage } from "../lib/productImage";
import KeyFinder, { type FinderProduct } from "./KeyFinder";

const URL = "https://www.officialkeyshub.com/key-finder";

export const metadata: Metadata = {
  title: "Which Windows or Office Key Do I Need? Free Key Finder",
  description:
    "Answer 2 quick questions and get the right Microsoft license: Windows 11 Home vs Pro, Office Home vs Home & Business vs Pro Plus, Visio, Project, Server and more.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Which Windows or Office Key Do I Need?",
    description: "A 2-question tool that matches you with the right Windows or Office license.",
    url: URL,
    images: [{ url: "https://www.officialkeyshub.com/og-image.jpg", width: 1200, height: 630, alt: "Official Keys Hub key finder" }],
  },
};

// Every product the finder can recommend. Prices come from the live catalog.
const FINDER_NAMES = [
  "Windows 11 Home",
  "Windows 11 Pro",
  "Office Home 2024",
  "Office Home & Business 2024",
  "Office 2024 Professional Plus",
  "Microsoft 365 Business Standard (1 Year)",
  "Windows 11 Pro + Office 2024 Pro Plus Bundle",
  "Visio Professional 2024",
  "Project Professional 2024",
  "Windows Server 2025 Standard",
  "SQL Server 2022 Standard",
  "Visual Studio 2022 Professional",
];

const faqs = [
  {
    q: "Do I need Windows 11 Home or Pro?",
    a: "Home covers browsing, school, streaming and gaming. Choose Pro if you need Remote Desktop, BitLocker encryption, Hyper-V or Group Policy, which are common for work laptops.",
  },
  {
    q: "Which Office 2024 edition should I buy?",
    a: "Office Home 2024 has Word, Excel, PowerPoint and OneNote. Home & Business 2024 adds Outlook and allows business use. Professional Plus 2024 is the full suite, including Access.",
  },
  {
    q: "Should I buy Office 2024 or Microsoft 365?",
    a: "Office 2024 is a one-time purchase for one PC with security updates until October 2029. Microsoft 365 is a subscription that always has the newest features plus cloud storage. If you just want the apps, pay once.",
  },
  {
    q: "What if I pick the wrong key?",
    a: "Contact support before you activate the key and we will help you sort it out. Every order is covered by our 30-day money-back guarantee.",
  },
];

export default function KeyFinderPage() {
  const products: Record<string, FinderProduct> = {};
  for (const name of FINDER_NAMES) {
    const p = allProducts.find((x) => x.name === name && !x.outOfStock);
    if (p)
      products[name] = {
        name: p.name,
        slug: p.slug,
        price: p.price,
        originalPrice: p.originalPrice,
        description: p.description,
        image: getProductBoxImage(p.name),
      };
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Microsoft Key Finder",
        url: URL,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: "Answer two questions to find the right Windows or Office license.",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <div className="pt-20 bg-white min-h-screen">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Key Finder" }]} />
        <section className="py-12 md:py-16 bg-sky-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <span className="inline-block mb-3 px-4 py-1 rounded-full bg-sky-100 text-sky-700 text-sm font-bold">Free tool · 20 seconds</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Which key do I <span className="text-sky-700">actually need?</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Answer two quick questions and we&apos;ll match you with the right Windows or Office license, so you
                don&apos;t overpay for features you won&apos;t use.
              </p>
            </div>
            <KeyFinder products={products} />
          </div>
        </section>

        <section className="py-14">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick answers</h2>
            <div className="space-y-5 mb-10">
              {faqs.map((f) => (
                <div key={f.q} className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-1">{f.q}</h3>
                  <p className="text-gray-700 m-0">{f.a}</p>
                </div>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Want the full comparison?</h2>
            <ul className="space-y-2 text-sky-700 font-semibold">
              <li><Link href="/blog/windows-11-home-vs-pro" className="hover:underline">Windows 11 Home vs Pro</Link></li>
              <li><Link href="/blog/office-2024-professional-plus-key" className="hover:underline">Office 2024 Professional Plus: what you get</Link></li>
              <li><Link href="/blog/online-key-vs-phone-key-vs-bind-key" className="hover:underline">Online key vs phone key vs bind key</Link></li>
              <li><Link href="/blog/microsoft-product-keys-guide" className="hover:underline">Every Microsoft product key explained</Link></li>
            </ul>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
