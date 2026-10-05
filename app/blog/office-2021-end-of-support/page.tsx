import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import Link from "next/link";
import type { Metadata } from "next";

const URL = "https://www.officialkeyshub.com/blog/office-2021-end-of-support";
const TITLE = "Office 2021 End of Support (October 13, 2026): What Happens & Why to Upgrade to Office 2024";
const DESCRIPTION =
  "Microsoft ends support for Office 2021 and Office LTSC 2021 on October 13, 2026. What changes, whether it's safe to keep using it, every Microsoft Office end-of-support date, and how to upgrade to Office 2024 (supported until 2029).";

export const metadata: Metadata = {
  title: `Office 2021 End of Support (Oct 13, 2026) — Upgrade to Office 2024 | Official Keys Hub`,
  description: DESCRIPTION,
  keywords:
    "office 2021 end of support, office 2021 end of support date, office 2021 end of life, office ltsc 2021 end of support, office 2021 ltsc end of support date, microsoft office end of support, microsoft office end of support dates, microsoft office end of life dates, office 2019 end of support, office 2016 end of support, publisher end of support, upgrade to office 2024, upgrade office 2021 to office 2024, upgrade office 2019 to office 2024, office 2024 vs 2021, office 2024 vs office 365, office 2024 end of support",
  alternates: { canonical: URL },
  openGraph: {
    title: "Office 2021 End of Support (Oct 13, 2026): What Happens & How to Upgrade",
    description:
      "Office 2021 stops getting security updates on October 13, 2026. Here's what that means and why Office 2024 (supported until 2029) is the one-time-purchase upgrade.",
    url: URL,
    type: "article",
  },
};

const faqs = [
  {
    q: "When does Office 2021 support end?",
    a: "Microsoft ends support for Office 2021 — including Office LTSC 2021, Office Standard 2021 and Office 2021 for Mac — on October 13, 2026. There is no extension and no paid Extended Security Updates program for Office 2021.",
  },
  {
    q: "Will Office 2021 stop working after October 13, 2026?",
    a: "No. Office 2021 keeps opening, editing and saving documents, and it stays activated. What stops is Microsoft's security updates, bug fixes and technical support for that version.",
  },
  {
    q: "Is it safe to keep using Office 2021 after end of support?",
    a: "It works, but every new security flaw found after October 13, 2026 stays unpatched. Opening documents and email attachments from the internet becomes riskier over time, so Microsoft recommends moving to a supported version such as Office 2024 or Microsoft 365.",
  },
  {
    q: "How long is Office 2024 supported?",
    a: "Office 2024 and Office LTSC 2024 are supported by Microsoft until October 9, 2029 — three years longer than Office 2021.",
  },
  {
    q: "Can I upgrade from Office 2021 to Office 2024 with my old key?",
    a: "No. Office 2024 needs its own Office 2024 product key; an Office 2021 key only activates Office 2021. Your documents, however, open in Office 2024 without any conversion.",
  },
  {
    q: "Does Office 2024 include Publisher?",
    a: "No. Microsoft is retiring Publisher — it is not part of Office 2024, and support for Publisher ends in October 2026. Save important .pub files as PDF or Word documents before you switch.",
  },
  {
    q: "Office 2024 or Microsoft 365 — which should I choose?",
    a: "Choose Office 2024 if you want to pay once and use the same version with security updates until 2029. Choose Microsoft 365 if you want a subscription that always has the newest features, cloud storage and apps on several devices.",
  },
];

const eolDates: { product: string; date: string; status: "ended" | "ending" | "ok" }[] = [
  { product: "Office 2010", date: "October 13, 2020", status: "ended" },
  { product: "Office 2013", date: "April 11, 2023", status: "ended" },
  { product: "Office 2016", date: "October 14, 2025", status: "ended" },
  { product: "Office 2019", date: "October 14, 2025", status: "ended" },
  { product: "Office 2021 / LTSC 2021", date: "October 13, 2026", status: "ending" },
  { product: "Publisher (all versions)", date: "October 2026", status: "ending" },
  { product: "Office 2024 / LTSC 2024", date: "October 9, 2029", status: "ok" },
  { product: "Microsoft 365", date: "Updated while subscribed", status: "ok" },
];

export default function Office2021EndOfSupport() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Office 2021 End of Support" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: TITLE,
        description: DESCRIPTION,
        author: { "@type": "Organization", name: "Official Keys Hub" },
        publisher: {
          "@type": "Organization",
          name: "Official Keys Hub",
          logo: { "@type": "ImageObject", url: "https://www.officialkeyshub.com/logo.png" },
        },
        datePublished: "2026-10-04",
        dateModified: "2026-10-04",
        mainEntityOfPage: URL,
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

  const statusCell = (s: "ended" | "ending" | "ok") =>
    s === "ended" ? "❌ Ended" : s === "ending" ? "⚠️ Ending" : "✅ Supported";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <div className="pt-20 bg-white min-h-screen">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">Office</span>
                <span className="text-gray-500">📅 Oct 4, 2026 • ⏱️ 9 min read</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
                Office 2021 End of Support: October 13, 2026
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  What Happens &amp; Why to Upgrade to Office 2024
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Microsoft is ending support for Office 2021 and Office LTSC 2021. Here&apos;s exactly what changes,
                whether you can keep using it, every Microsoft Office end-of-support date in one table, and how to
                move to Office 2024 — the newest one-time-purchase Office, supported until 2029.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed">

              {/* Quick answer */}
              <div className="bg-sky-50 border-l-4 border-sky-600 p-6 rounded-r-xl mb-10">
                <h2 className="font-bold text-sky-900 text-xl mb-3">⚡ Quick Answer</h2>
                <p className="text-sky-900">
                  <strong>Office 2021 end of support date: October 13, 2026.</strong> After that, Office 2021 keeps
                  working and stays activated, but it gets <strong>no more security updates</strong>, no bug fixes
                  and no Microsoft support — and there&apos;s no paid extension. If you want a one-time purchase
                  that stays patched, upgrade to <strong>Office 2024</strong>, supported until{" "}
                  <strong>October 9, 2029</strong>.
                </p>
              </div>

              {/* Table of contents */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
                <p className="font-bold text-gray-900 mb-3">📑 In this guide</p>
                <ol className="list-decimal pl-6 space-y-1 text-gray-700 text-base">
                  <li><a href="#date" className="text-blue-600 hover:underline">Office 2021 end of support date</a></li>
                  <li><a href="#what-happens" className="text-blue-600 hover:underline">What happens after support ends</a></li>
                  <li><a href="#safe" className="text-blue-600 hover:underline">Is it safe to keep using Office 2021?</a></li>
                  <li><a href="#all-dates" className="text-blue-600 hover:underline">Every Microsoft Office end-of-support date</a></li>
                  <li><a href="#options" className="text-blue-600 hover:underline">Your options</a></li>
                  <li><a href="#compare" className="text-blue-600 hover:underline">Office 2024 vs Office 2021</a></li>
                  <li><a href="#upgrade" className="text-blue-600 hover:underline">How to upgrade to Office 2024</a></li>
                  <li><a href="#faq" className="text-blue-600 hover:underline">FAQ</a></li>
                </ol>
              </div>

              <h2 id="date" className="text-3xl font-bold mt-12 mb-6 text-gray-900">Office 2021 End of Support Date</h2>
              <p className="mb-5">
                Office 2021 launched on October 5, 2021 with a fixed five-year lifecycle. Microsoft ends support on{" "}
                <strong>October 13, 2026</strong>. The same date applies to every Office 2021 edition:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Office Professional Plus 2021, Home &amp; Business 2021 and Home &amp; Student 2021</li>
                <li>Office LTSC Professional Plus 2021 and Office LTSC Standard 2021</li>
                <li>Office 2021 for Mac and Office LTSC 2021 for Mac</li>
                <li>Standalone 2021 apps such as Visio 2021 and Project 2021</li>
              </ul>
              <p className="mb-5">
                Unlike Windows 10, there is <strong>no Extended Security Updates (ESU) program</strong> for Office
                2021 — October 13, 2026 is the final date.
              </p>

              <h2 id="what-happens" className="text-3xl font-bold mt-12 mb-6 text-gray-900">What Happens When Office 2021 Reaches End of Life?</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <p className="font-bold text-green-900 mb-2">✅ Keeps working</p>
                  <ul className="space-y-1 text-green-900 text-base">
                    <li>• Opens, edits and saves files</li>
                    <li>• Stays activated — no expiry</li>
                    <li>• Your documents are untouched</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <p className="font-bold text-red-900 mb-2">❌ Stops</p>
                  <ul className="space-y-1 text-red-900 text-base">
                    <li>• Security updates</li>
                    <li>• Bug fixes and quality updates</li>
                    <li>• Microsoft technical support</li>
                  </ul>
                </div>
              </div>
              <p className="mb-5">
                <strong>Publisher retires at the same time.</strong> Microsoft is ending support for Publisher in
                October 2026, and Publisher isn&apos;t included in Office 2024. If you use it, save your .pub files as
                PDF or Word documents before switching.
              </p>

              <h2 id="safe" className="text-3xl font-bold mt-12 mb-6 text-gray-900">Is It Safe to Keep Using Office 2021?</h2>
              <p className="mb-5">
                For a few weeks, nothing visibly changes. The risk builds over time: any new vulnerability found in
                Word, Excel, Outlook or PowerPoint after October 13, 2026 will never be patched for Office 2021.
                Office documents and email attachments are one of the most common ways attackers get onto a PC, so
                an unpatched Office is a real exposure — especially for businesses handling customer data.
              </p>
              <p className="mb-5">
                Keeping Office 2021 on an offline PC or for occasional, trusted files is lower risk. For everyday
                work with email and downloaded documents, move to a supported version.
              </p>

              <h2 id="all-dates" className="text-3xl font-bold mt-12 mb-6 text-gray-900">Microsoft Office End of Support Dates (All Versions)</h2>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-base border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gray-100 text-gray-900">
                    <tr>
                      <th className="text-left p-3">Version</th>
                      <th className="text-left p-3">End of support</th>
                      <th className="text-left p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eolDates.map((r) => (
                      <tr key={r.product} className={`border-t border-gray-200 ${r.status === "ok" ? "bg-green-50/60" : ""}`}>
                        <td className="p-3 font-semibold text-gray-900">{r.product}</td>
                        <td className="p-3">{r.date}</td>
                        <td className="p-3 whitespace-nowrap">{statusCell(r.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mb-5">
                If you&apos;re still on Office 2019 or Office 2016, you&apos;re already unsupported (since October 14,
                2025) — the same upgrade path below applies to you.
              </p>

              <h2 id="options" className="text-3xl font-bold mt-12 mb-6 text-gray-900">Your Options After Office 2021 End of Support</h2>
              <div className="space-y-4 mb-8">
                <div className="border-2 border-sky-600 rounded-xl p-6 bg-sky-50">
                  <p className="font-bold text-sky-900 text-xl mb-2">1. Upgrade to Office 2024 — recommended</p>
                  <p className="text-sky-900 text-base">
                    The newest one-time-purchase Office. Pay once, no subscription, security updates until October 9,
                    2029. Best if you liked owning Office 2021 outright.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-xl p-6">
                  <p className="font-bold text-gray-900 text-xl mb-2">2. Switch to Microsoft 365</p>
                  <p className="text-base">
                    A subscription with always-current apps, 1 TB OneDrive storage per user and installs on several
                    devices. Best if you want the newest features and cloud storage.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-xl p-6">
                  <p className="font-bold text-gray-900 text-xl mb-2">3. Keep Office 2021 (not recommended)</p>
                  <p className="text-base">
                    It keeps working, but without security fixes. Only reasonable for offline PCs or very light use.
                  </p>
                </div>
              </div>

              <h2 id="compare" className="text-3xl font-bold mt-12 mb-6 text-gray-900">Office 2024 vs Office 2021</h2>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-base border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gray-100 text-gray-900">
                    <tr>
                      <th className="text-left p-3"></th>
                      <th className="text-left p-3">Office 2021 Pro Plus</th>
                      <th className="text-left p-3 bg-sky-50">Office 2024 Pro Plus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200"><td className="p-3 font-semibold text-gray-900">Released</td><td className="p-3">October 2021</td><td className="p-3 bg-sky-50">October 2024</td></tr>
                    <tr className="border-t border-gray-200"><td className="p-3 font-semibold text-gray-900">Security updates until</td><td className="p-3">❌ October 13, 2026</td><td className="p-3 bg-sky-50">✅ October 9, 2029</td></tr>
                    <tr className="border-t border-gray-200"><td className="p-3 font-semibold text-gray-900">Apps</td><td className="p-3">Word, Excel, PowerPoint, Outlook, Access, Publisher, OneNote</td><td className="p-3 bg-sky-50">Word, Excel, PowerPoint, Outlook, Access, OneNote</td></tr>
                    <tr className="border-t border-gray-200"><td className="p-3 font-semibold text-gray-900">New in 2024</td><td className="p-3">—</td><td className="p-3 bg-sky-50">Refreshed design, Excel IMAGE function, dynamic charts, OpenDocument 1.4 support</td></tr>
                    <tr className="border-t border-gray-200"><td className="p-3 font-semibold text-gray-900">License</td><td className="p-3">One-time purchase</td><td className="p-3 bg-sky-50">One-time purchase</td></tr>
                    <tr className="border-t border-gray-200"><td className="p-3 font-semibold text-gray-900">Price at Official Keys Hub</td><td className="p-3 font-bold text-gray-900">$24.99</td><td className="p-3 bg-sky-50 font-bold text-gray-900">$34.99</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-5">
                For $10 more you get three extra years of security updates and the newest features. Want the
                subscription comparison too? Read{" "}
                <Link href="/blog/office-2021-vs-office-365" className="text-blue-600">Office 2021 vs Office 365</Link>.
              </p>

              {/* Inline promo */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 my-10 text-white flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 text-center md:text-left">
                  <p className="text-sm font-bold uppercase tracking-wide text-blue-200 mb-1">Newest Office · Supported until 2029</p>
                  <p className="text-2xl font-bold mb-2">Office 2024 Professional Plus</p>
                  <p className="text-blue-100 text-base">One-time purchase · Instant email delivery · Activation help included</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-white mb-3">$34.99</p>
                  <Link
                    href="/products/office-2024-professional-plus"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition"
                  >
                    Buy Office 2024
                  </Link>
                </div>
              </div>

              <h2 id="upgrade" className="text-3xl font-bold mt-12 mb-6 text-gray-900">How to Upgrade Office 2021 (or 2019/2016) to Office 2024</h2>
              <ol className="list-decimal pl-6 mb-6 space-y-3">
                <li><strong>Back up</strong> anything important, and export Publisher (.pub) files to PDF or Word.</li>
                <li><strong>Uninstall your old Office</strong>: Settings → Apps → Installed apps → Microsoft Office → Uninstall. Your documents stay where they are.</li>
                <li><strong>Restart</strong> your PC.</li>
                <li>Go to <strong>www.office.com/setup</strong>, sign in with your Microsoft account and enter your Office 2024 product key.</li>
                <li><strong>Download and run the installer</strong>, then open Word and confirm it shows as activated under File → Account.</li>
              </ol>
              <p className="mb-5">
                Step-by-step screenshots and troubleshooting are in our{" "}
                <Link href="/activation-guide" className="text-blue-600">activation guide</Link>, and our support team can
                help on WhatsApp if you get stuck.
              </p>

              {/* FAQ — mirrored in the FAQPage JSON-LD above */}
              <h2 id="faq" className="text-3xl font-bold mt-12 mb-6 text-gray-900">❓ Frequently Asked Questions</h2>
              <div className="space-y-4 mb-8">
                {faqs.map((f) => (
                  <details key={f.q} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <summary className="font-bold cursor-pointer text-lg text-gray-900">{f.q}</summary>
                    <p className="mt-3 text-gray-700 text-base">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Upgrade to Office 2024 Today</h2>
            <p className="text-blue-100 text-lg mb-8">
              The newest one-time-purchase Office, supported until 2029. Genuine key, instant email delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products/office-2024-professional-plus"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition"
              >
                Office 2024 Pro Plus — $34.99
              </Link>
              <Link
                href="/products/office-home-and-business-2024"
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition"
              >
                Home &amp; Business 2024 — $39.99
              </Link>
            </div>
          </div>
        </section>

        {/* Related reading */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Related reading</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/microsoft-product-keys-guide" className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-blue-500 transition">
                <h4 className="font-bold mb-2 text-gray-900">Microsoft Product Keys Explained</h4>
                <p className="text-sm text-gray-600">Every Windows, Office and Server key in one guide</p>
              </Link>
              <Link href="/blog/office-2021-vs-office-365" className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-blue-500 transition">
                <h4 className="font-bold mb-2 text-gray-900">Office 2021 vs Office 365</h4>
                <p className="text-sm text-gray-600">One-time purchase or subscription?</p>
              </Link>
              <Link href="/blog/how-to-activate-office-2021" className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-blue-500 transition">
                <h4 className="font-bold mb-2 text-gray-900">How to Activate Office</h4>
                <p className="text-sm text-gray-600">Install and activate Office the right way</p>
              </Link>
              <Link href="/blog/buy-microsoft-retail-keys-safe" className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-blue-500 transition">
                <h4 className="font-bold mb-2 text-gray-900">How to Buy Microsoft Keys Safely</h4>
                <p className="text-sm text-gray-600">Retail vs OEM and the red flags to avoid</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
