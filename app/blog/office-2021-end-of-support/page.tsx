import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import ProductStrip from "../../components/ProductStrip";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getProductBoxImage } from "../../lib/productImage";

// One definitive page for the Office 2021 end-of-support moment, written as a
// sourced briefing: Microsoft's lifecycle facts, what changes, how support
// windows have shrunk, the Office 2024 / Microsoft 365 / stay decision, and
// how to upgrade. Imagery is limited to the two products discussed (our own
// generated Office 2021 and Office 2024 box art — no third-party images).

const URL = "https://www.officialkeyshub.com/blog/office-2021-end-of-support";
const TITLE = "Office 2021 End of Support: What It Means — and Is Office 2024 Worth It?";
const DESCRIPTION =
  "Office 2021 stops receiving security updates on October 13, 2026. A sourced briefing: what Microsoft's lifecycle says, why support windows have shrunk from 10 years to 5, Office 2024 vs Microsoft 365 vs staying put, and how to upgrade.";

export const metadata: Metadata = {
  title: "Office 2021 End of Support (Oct 13, 2026): Is Office 2024 Worth It? | Official Keys Hub",
  description: DESCRIPTION,
  keywords:
    "office 2021 end of support, office 2021 end of support date, office 2021 end of life, office ltsc 2021 end of support, office 2021 no longer supported, microsoft office end of support dates, microsoft office end of life dates, office 2019 end of support, office 2016 end of support, publisher end of support, is office 2024 worth it, is office 2024 worth it over 2021, should i upgrade to office 2024, should i upgrade office 2021 to 2024, upgrade office 2021 to office 2024, office 2024 vs microsoft 365, office 2024 vs 2021, office home 2024 vs microsoft 365, is office home 2024 worth it, office 2024 end of support",
  alternates: { canonical: URL },
  openGraph: {
    title: "Office 2021 is losing support. Upgrade, subscribe — or stay put?",
    description:
      "What Microsoft's lifecycle says, why Office support windows shrank from 10 years to 5, and how Office 2024, Microsoft 365 and staying on 2021 compare.",
    url: URL,
    type: "article",
  },
};

// --- Sources (Microsoft's own pages) -------------------------------------
const sources = [
  { n: 1, label: "Microsoft Lifecycle — Office 2021", href: "https://learn.microsoft.com/en-us/lifecycle/products/office-2021" },
  { n: 2, label: "Microsoft Lifecycle — Office LTSC 2021", href: "https://learn.microsoft.com/en-us/lifecycle/products/office-ltsc-2021" },
  { n: 3, label: "Microsoft Lifecycle — Office 2024", href: "https://learn.microsoft.com/en-us/lifecycle/products/office-2024" },
  { n: 4, label: "Microsoft Lifecycle — Office 2019", href: "https://learn.microsoft.com/en-us/lifecycle/products/microsoft-office-2019" },
  { n: 5, label: "Microsoft Lifecycle — Office 2016", href: "https://learn.microsoft.com/en-us/lifecycle/products/microsoft-office-2016" },
  { n: 6, label: "Microsoft Support — Publisher will no longer be supported after October 2026", href: "https://support.microsoft.com/en-US/publisher/microsoft-publisher-will-no-longer-be-supported-after-october-2026" },
  { n: 7, label: "Microsoft Support — What's new in Excel 2024", href: "https://support.microsoft.com/office/faee26b6-ad74-40a8-9304-aa6db716553f" },
];
const Cite = ({ n }: { n: number }) => (
  <sup className="ml-0.5">
    <a href={`#source-${n}`} className="text-blue-700 font-semibold no-underline hover:underline">[{n}]</a>
  </sup>
);

// --- Support length per Office version (Microsoft Lifecycle dates) --------
const lifespans = [
  { v: "Office 2010", start: "2010-07-15", end: "2020-10-13" },
  { v: "Office 2013", start: "2013-01-09", end: "2023-04-11" },
  { v: "Office 2016", start: "2015-09-22", end: "2025-10-14" },
  { v: "Office 2019", start: "2018-09-24", end: "2025-10-14" },
  { v: "Office 2021", start: "2021-10-05", end: "2026-10-13" },
  { v: "Office 2024", start: "2024-10-01", end: "2029-10-09" },
].map((r) => ({
  ...r,
  years: (Date.parse(r.end) - Date.parse(r.start)) / (365.25 * 24 * 3600 * 1000),
}));
const fmt = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

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
    a: "It works, but every new security flaw found after October 13, 2026 stays unpatched. Opening documents and email attachments from the internet becomes riskier over time, so moving to a supported version such as Office 2024 or Microsoft 365 is the safer choice.",
  },
  {
    q: "Is Office 2024 worth it?",
    a: "For most people who prefer to pay once, yes. Office 2024 is the newest one-time-purchase Office, it gets security updates until October 9, 2029, and over three years it costs far less than a Microsoft 365 subscription. It's not worth it if you need Copilot AI, 1 TB of cloud storage or Office on many devices — that's what Microsoft 365 is for.",
  },
  {
    q: "Should I upgrade Office 2021 to Office 2024?",
    a: "If you use Office for email and documents you download or receive, yes. Office 2024 is the like-for-like replacement: same one-time model, same desktop apps (minus Publisher, which Microsoft is retiring), supported three years longer.",
  },
  {
    q: "Office 2024 vs Microsoft 365 — which is better?",
    a: "Office 2024 is better value if you want stable desktop apps and no subscription. Microsoft 365 is better if you want the newest features every month, Copilot AI, 1 TB of OneDrive storage and installs on several PCs, Macs, tablets and phones.",
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
    q: "Does Office 2024 include Publisher or Copilot?",
    a: "Neither. Microsoft is retiring Publisher (support ends in October 2026) and it isn't part of Office 2024. Copilot AI features come with Microsoft 365 subscriptions, not with one-time-purchase Office 2024.",
  },
  {
    q: "Is Office Home 2024 worth it?",
    a: "Yes, if you only need Word, Excel, PowerPoint and OneNote for personal use. If you need Outlook or use Office for work, Home & Business 2024 or Professional Plus 2024 is the better fit.",
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

const toc = [
  { id: "announcement", label: "What Microsoft announced" },
  { id: "shrinking", label: "Support windows are shrinking" },
  { id: "what-happens", label: "What changes on Oct 13" },
  { id: "safe", label: "Is it safe to keep it?" },
  { id: "all-dates", label: "Every Office support date" },
  { id: "compare", label: "Office 2021 vs 2024" },
  { id: "options", label: "Your options, compared" },
  { id: "recommendation", label: "Our recommendation" },
  { id: "upgrade", label: "How to upgrade" },
  { id: "discussion", label: "Questions worth discussing" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

// Share links let readers take the question to their own communities.
const shareText = "Office 2021 is losing support. Would you upgrade to Office 2024, switch to Microsoft 365, or keep it?";
const enc = encodeURIComponent;
const shareLinks = [
  { label: "Reddit", icon: "fab fa-reddit-alien", href: `https://www.reddit.com/submit?url=${enc(URL)}&title=${enc(shareText)}` },
  { label: "X", icon: "fab fa-x-twitter", href: `https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(URL)}` },
  { label: "LinkedIn", icon: "fab fa-linkedin-in", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(URL)}` },
  { label: "Facebook", icon: "fab fa-facebook-f", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(URL)}` },
  { label: "WhatsApp", icon: "fab fa-whatsapp", href: `https://wa.me/?text=${enc(`${shareText} ${URL}`)}` },
];

const H2 = ({ id, children }: { id: string; children: ReactNode }) => (
  <h2 id={id} className="scroll-mt-32 text-3xl md:text-4xl font-bold mt-16 mb-6 text-gray-900">
    {children}
  </h2>
);

// Our own generated box art for the two products discussed.
function Box({ name, className = "" }: { name: string; className?: string }) {
  return (
    <Image
      src={getProductBoxImage(name)}
      alt={`${name} product box`}
      width={564}
      height={780}
      unoptimized
      className={`h-auto ${className}`}
    />
  );
}

// Horizontal bars: years of security updates per Office version. One series,
// one hue; text labels carry the values; hover reveals the exact dates.
function SupportLengthChart() {
  const max = 12;
  const ticks = [0, 2, 4, 6, 8, 10, 12];
  return (
    <figure className="my-10 rounded-2xl border border-gray-200 bg-white p-5 md:p-7">
      <p className="font-bold text-gray-900 mb-1">Years of security updates per Office version</p>
      <p className="text-sm text-gray-500 mb-6">From release to final security update. Hover a bar for exact dates.</p>
      <div className="space-y-3">
        {lifespans.map((r) => (
          <div key={r.v} className="group relative grid grid-cols-[88px_minmax(0,1fr)] md:grid-cols-[104px_minmax(0,1fr)] items-center gap-3">
            <span className="text-sm font-semibold text-gray-800">{r.v}</span>
            <div className="relative h-7">
              {/* recessive gridlines */}
              {ticks.map((t) => (
                <span key={t} className="absolute inset-y-0 w-px bg-gray-100" style={{ left: `${(t / max) * 100}%` }} />
              ))}
              <div className="absolute inset-y-0 left-0 flex items-center gap-2" style={{ width: `${(r.years / max) * 100}%` }}>
                <span className="block h-3.5 w-full rounded-r bg-[#0369a1] group-hover:bg-[#075985] transition-colors" />
              </div>
              <span
                className="absolute top-1/2 -translate-y-1/2 pl-2 text-sm font-semibold text-gray-700 whitespace-nowrap"
                style={{ left: `${(r.years / max) * 100}%` }}
              >
                {r.years.toFixed(1)} yrs
              </span>
              {/* hover tooltip */}
              <span className="pointer-events-none absolute -top-9 left-0 z-10 hidden group-hover:block whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg">
                {fmt(r.start)} → {fmt(r.end)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[88px_minmax(0,1fr)] md:grid-cols-[104px_minmax(0,1fr)] gap-3 mt-2">
        <span />
        <div className="relative h-5 text-xs text-gray-400">
          {ticks.map((t) => (
            <span key={t} className="absolute -translate-x-1/2" style={{ left: `${(t / max) * 100}%` }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-gray-500">
        Source: Microsoft Lifecycle pages for each version.<Cite n={4} /><Cite n={5} /><Cite n={1} /><Cite n={3} />
      </figcaption>
    </figure>
  );
}

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
        image: "https://www.officialkeyshub.com/og-image.jpg",
        author: { "@type": "Organization", name: "Official Keys Hub" },
        publisher: {
          "@type": "Organization",
          name: "Official Keys Hub",
          logo: { "@type": "ImageObject", url: "https://www.officialkeyshub.com/logo.png" },
        },
        datePublished: "2026-10-04",
        dateModified: "2026-10-07",
        mainEntityOfPage: URL,
        citation: sources.map((s) => s.href),
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

  const statusPill = (s: "ended" | "ending" | "ok") =>
    s === "ended" ? (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 text-red-700 px-3 py-1 text-sm font-semibold"><i className="fas fa-circle-xmark"></i>Ended</span>
    ) : s === "ending" ? (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 px-3 py-1 text-sm font-semibold"><i className="fas fa-triangle-exclamation"></i>Ending</span>
    ) : (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-sm font-semibold"><i className="fas fa-circle-check"></i>Supported</span>
    );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Reading progress bar — CSS scroll-driven, shown only where supported */}
      <style>{`
        @supports (animation-timeline: scroll()) {
          .okh-progress { display:block; transform-origin:0 50%; animation: okh-grow linear both; animation-timeline: scroll(root); }
          @keyframes okh-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        }
      `}</style>
      <div className="okh-progress hidden fixed top-0 left-0 right-0 h-1 z-[60] bg-sky-600" />

      <Navbar />
      {/* The navbar is sticky (in normal flow), so no top padding is needed —
          the product strip sits directly under it. */}
      <div className="bg-white min-h-screen">
        <ProductStrip
          label="Office 2024 & 2021"
          names={[
            "Office 2024 Professional Plus",
            "Office Home & Business 2024",
            "Office Home 2024",
            "Office 2024 Pro Plus - Online Key",
            "Office 2021 Professional Plus",
            "Office 2021 Home & Business",
            "Office Home & Student 2021",
          ]}
        />
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <header className="pt-8 pb-10">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[minmax(0,1fr)_420px] gap-10 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Briefing</span>
                <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Deadline: Oct 13, 2026</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Updated Oct 7, 2026</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                Office 2021 End of Support: What It Means —{" "}
                <span className="text-blue-700">and Is Office 2024 Worth It?</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Office 2021 receives its final security update on October 13, 2026. This briefing sets out what
                Microsoft&apos;s lifecycle actually says, why support windows have shrunk from ten years to five, and
                how Office 2024, Microsoft 365 and staying put compare — with sources for every date.
              </p>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Image src="/logo.png" alt="" width={40} height={40} className="rounded-full ring-1 ring-gray-200" />
                <div>
                  <p className="font-semibold text-gray-900">Official Keys Hub team</p>
                  <p>Published Oct 4, 2026 · Updated Oct 7, 2026 · 12 min read</p>
                </div>
              </div>
            </div>

            {/* Hero visual: the two products, side by side */}
            <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="text-center">
                  <Box name="Office 2021 Professional Plus" className="w-full max-w-[150px] mx-auto opacity-80 grayscale-[35%]" />
                  <p className="mt-3 text-sm font-bold text-gray-900">Office 2021</p>
                  <p className="text-xs font-semibold text-red-700">Updates end Oct 13, 2026</p>
                </div>
                <i className="fas fa-arrow-right text-2xl text-gray-400" aria-hidden="true"></i>
                <div className="text-center">
                  <Box name="Office 2024 Professional Plus" className="w-full max-w-[150px] mx-auto" />
                  <p className="mt-3 text-sm font-bold text-gray-900">Office 2024</p>
                  <p className="text-xs font-semibold text-emerald-700">Supported until Oct 9, 2029</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Key facts */}
        <section className="max-w-6xl mx-auto px-6 mb-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { k: "Oct 13, 2026", v: "Office 2021's last security update", c: 1 },
              { k: "No ESU", v: "No paid extension for Office 2021", c: 2 },
              { k: "5 years", v: "Support window, down from ~10", c: 5 },
              { k: "Oct 9, 2029", v: "Office 2024 supported until", c: 3 },
            ].map((f) => (
              <div key={f.k} className="rounded-2xl border border-gray-200 bg-white p-5">
                <p className="text-2xl font-extrabold text-gray-900">{f.k}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {f.v}
                  <Cite n={f.c} />
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Body: sticky contents on desktop + article */}
        <div className="max-w-6xl mx-auto px-6 py-10 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 text-sm" aria-label="Contents">
              <p className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-3">Contents</p>
              <ol className="space-y-2 border-l border-gray-200">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="block -ml-px border-l-2 border-transparent pl-4 text-gray-500 hover:text-blue-700 hover:border-blue-700 transition">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="max-w-3xl text-gray-700 text-lg leading-[1.8]">
            {/* Quick answer */}
            <div className="rounded-2xl bg-sky-50 border border-sky-100 p-6 md:p-8 mb-10">
              <p className="text-xs font-bold uppercase tracking-wide text-sky-800 mb-2">Quick answer</p>
              <p className="text-gray-800">
                <strong>Office 2021 end of support date: October 13, 2026.</strong> It keeps working and stays
                activated, but receives <strong>no further security updates</strong>, and there is no paid
                extension. If you want to keep paying once, <strong>Office 2024</strong> is the like-for-like
                upgrade, supported until <strong>October 9, 2029</strong>. If you want the newest features, Copilot
                and cloud storage, <strong>Microsoft 365</strong> is the subscription route.
              </p>
            </div>

            <H2 id="announcement">What Microsoft Has Announced</H2>
            <p className="mb-5">
              Microsoft publishes a lifecycle page for every Office release. For Office 2021, the retirement date is{" "}
              <strong>October 13, 2026</strong> (Pacific Time) for Home &amp; Student, Home &amp; Business and
              Professional, on Windows and Mac.<Cite n={1} /> The volume-licensed{" "}
              <strong>Office LTSC 2021</strong> ends on the same date under Microsoft&apos;s Fixed Lifecycle Policy,
              with no extended-support phase.<Cite n={2} />
            </p>
            <p className="mb-5">That date covers every Office 2021 edition:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Office Professional Plus 2021, Home &amp; Business 2021 and Home &amp; Student 2021</li>
              <li>Office LTSC Professional Plus 2021 and Office LTSC Standard 2021</li>
              <li>Office 2021 for Mac and Office LTSC 2021 for Mac</li>
              <li>Standalone 2021 apps such as Visio 2021 and Project 2021</li>
            </ul>
            <p className="mb-5">
              Unlike Windows 10, there is <strong>no Extended Security Updates (ESU) program</strong> for Office 2021.
            </p>

            <H2 id="shrinking">The Bigger Story: Support Windows Have Halved</H2>
            <p className="mb-5">
              Most coverage stops at the date. The more useful fact for anyone buying Office is how much shorter each
              version&apos;s life has become. Office 2010, 2013 and 2016 each received about ten years of security
              updates. Office 2019 got about seven. Office 2021 — and now Office 2024 — get five.
            </p>
            <SupportLengthChart />
            <p className="mb-5">
              The practical takeaway: <strong>one-time-purchase Office now runs on a roughly five-year cycle</strong>,
              with a new version every three years. Buying the newest version as early as possible gets you the most
              supported years for your money — which is why a 2021 license bought today buys only days of security
              updates, while Office 2024 still has three years left.
            </p>

            <H2 id="what-happens">What Changes on October 13</H2>
            <p className="mb-6">
              <strong>Nothing you&apos;ll see on day one.</strong> The change is underneath:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                <p className="font-bold text-emerald-900 mb-3"><i className="fas fa-circle-check mr-2"></i>Keeps working</p>
                <ul className="space-y-1.5 text-emerald-900 text-base">
                  <li>Opens, edits and saves files</li>
                  <li>Stays activated — no expiry</li>
                  <li>Your documents are untouched</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                <p className="font-bold text-red-900 mb-3"><i className="fas fa-circle-xmark mr-2"></i>Stops</p>
                <ul className="space-y-1.5 text-red-900 text-base">
                  <li>Security updates</li>
                  <li>Bug fixes and quality updates</li>
                  <li>Microsoft technical support</li>
                </ul>
              </div>
            </div>
            <p className="mb-5">
              <strong>Publisher retires in the same month.</strong> Microsoft ends support for Publisher in October
              2026, and it isn&apos;t part of Office 2024.<Cite n={6} /> If you use it, save your .pub files as PDF or
              Word documents now.
            </p>

            <H2 id="safe">Is It Safe to Keep Using Office 2021?</H2>
            <p className="mb-5">
              For a few weeks, nothing visibly changes. The risk builds over time: any new vulnerability found in Word,
              Excel, Outlook or PowerPoint after October 13 will never be patched for Office 2021 — and Office
              documents and email attachments are one of the most common ways attackers get onto a PC.
            </p>
            <blockquote className="my-8 border-l-4 border-blue-700 pl-6 text-2xl font-semibold text-gray-900 leading-snug">
              &quot;Nothing bad has happened yet&quot; isn&apos;t a security plan.
            </blockquote>
            <p className="mb-5">
              Keeping Office 2021 on an offline PC, or for occasional trusted files, is lower risk. For everyday email
              and downloaded documents — and especially for a business handling customer data — move to a supported
              version.
            </p>

            <H2 id="all-dates">Microsoft Office End of Support Dates (All Versions)</H2>
            <div className="overflow-x-auto mb-6 rounded-2xl border border-gray-200">
              <table className="w-full text-base">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="text-left p-4">Version</th>
                    <th className="text-left p-4">End of support</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {eolDates.map((r) => (
                    <tr key={r.product} className="border-t border-gray-100">
                      <td className="p-4 font-semibold text-gray-900">{r.product}</td>
                      <td className="p-4">{r.date}</td>
                      <td className="p-4 whitespace-nowrap">{statusPill(r.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mb-5">
              Still on Office 2019 or 2016? You&apos;ve been unsupported since October 14, 2025 — everything below
              applies to you too.
            </p>

            <H2 id="compare">Office 2021 vs Office 2024: What&apos;s Actually Different</H2>
            <div className="grid grid-cols-2 gap-6 my-8 rounded-2xl border border-gray-200 bg-slate-50 p-6">
              <figure className="text-center">
                <Box name="Office 2021 Professional Plus" className="w-full max-w-[170px] mx-auto" />
                <figcaption className="mt-3 text-sm text-gray-600">Office 2021 Professional Plus</figcaption>
              </figure>
              <figure className="text-center">
                <Box name="Office 2024 Professional Plus" className="w-full max-w-[170px] mx-auto" />
                <figcaption className="mt-3 text-sm text-gray-600">Office 2024 Professional Plus</figcaption>
              </figure>
            </div>
            <div className="overflow-x-auto mb-6 rounded-2xl border border-gray-200">
              <table className="w-full text-base">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="text-left p-4"></th>
                    <th className="text-left p-4">Office 2021 Pro Plus</th>
                    <th className="text-left p-4 bg-blue-50">Office 2024 Pro Plus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100"><td className="p-4 font-semibold text-gray-900">Released</td><td className="p-4">October 2021</td><td className="p-4 bg-blue-50/60">October 2024</td></tr>
                  <tr className="border-t border-gray-100"><td className="p-4 font-semibold text-gray-900">Security updates until</td><td className="p-4">October 13, 2026</td><td className="p-4 bg-blue-50/60 font-semibold text-gray-900">October 9, 2029</td></tr>
                  <tr className="border-t border-gray-100"><td className="p-4 font-semibold text-gray-900">Apps</td><td className="p-4">Word, Excel, PowerPoint, Outlook, Access, Publisher, OneNote</td><td className="p-4 bg-blue-50/60">Word, Excel, PowerPoint, Outlook, Access, OneNote</td></tr>
                  <tr className="border-t border-gray-100"><td className="p-4 font-semibold text-gray-900">New in 2024</td><td className="p-4">—</td><td className="p-4 bg-blue-50/60">Refreshed design, Excel IMAGE function, dynamic charts, OpenDocument 1.4<Cite n={7} /></td></tr>
                  <tr className="border-t border-gray-100"><td className="p-4 font-semibold text-gray-900">License</td><td className="p-4">One-time purchase</td><td className="p-4 bg-blue-50/60">One-time purchase</td></tr>
                  <tr className="border-t border-gray-100"><td className="p-4 font-semibold text-gray-900">Price at Official Keys Hub</td><td className="p-4 font-bold text-gray-900">$24.99</td><td className="p-4 bg-blue-50/60 font-bold text-gray-900">$34.99</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mb-5">
              For $10 more you get three extra years of security updates and the newest features.
            </p>

            <H2 id="options">Your Three Options, Compared</H2>
            <p className="mb-5">
              The real question isn&apos;t <em>&quot;does it still work?&quot;</em> — it&apos;s which ownership model
              suits you for the next few years. Over a three-year window (roughly Office 2024&apos;s remaining support):
            </p>
            <div className="overflow-x-auto mb-6 rounded-2xl border border-gray-200">
              <table className="w-full text-base">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="text-left p-4"></th>
                    <th className="text-left p-4 bg-blue-50">Upgrade to Office 2024</th>
                    <th className="text-left p-4">Switch to Microsoft 365</th>
                    <th className="text-left p-4">Keep Office 2021</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100"><td className="p-4 font-semibold text-gray-900">How you pay</td><td className="p-4 bg-blue-50/60">Once</td><td className="p-4">$99.99/yr (Personal) · $129.99/yr (Family)</td><td className="p-4">Nothing</td></tr>
                  <tr className="border-t border-gray-100"><td className="p-4 font-semibold text-gray-900">~3-year cost</td><td className="p-4 bg-blue-50/60 font-bold text-gray-900">$34.99 here</td><td className="p-4 font-bold text-gray-900">~$300 / ~$390</td><td className="p-4 font-bold text-gray-900">$0</td></tr>
                  <tr className="border-t border-gray-100"><td className="p-4 font-semibold text-gray-900">Security updates</td><td className="p-4 bg-blue-50/60">Until Oct 2029</td><td className="p-4">While subscribed</td><td className="p-4">None after Oct 13, 2026</td></tr>
                  <tr className="border-t border-gray-100"><td className="p-4 font-semibold text-gray-900">Copilot AI</td><td className="p-4 bg-blue-50/60">No</td><td className="p-4">Yes</td><td className="p-4">No</td></tr>
                  <tr className="border-t border-gray-100"><td className="p-4 font-semibold text-gray-900">Cloud storage</td><td className="p-4 bg-blue-50/60">—</td><td className="p-4">1 TB per person</td><td className="p-4">—</td></tr>
                  <tr className="border-t border-gray-100"><td className="p-4 font-semibold text-gray-900">You own it</td><td className="p-4 bg-blue-50/60">Yes</td><td className="p-4">No — stops editing if you cancel</td><td className="p-4">Yes</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mb-5">
              The subscription isn&apos;t poor value — Family covers six people, each with 1 TB of storage. But for one
              person on one PC who doesn&apos;t want AI in their documents, paying every year for features they
              won&apos;t use is hard to justify.
            </p>

            <H2 id="recommendation">Our Recommendation</H2>
            <div className="rounded-2xl bg-gray-900 text-gray-300 p-7 md:p-9 mb-8">
              <p className="mb-4">
                <strong className="text-white">If you bought Office 2021 because you didn&apos;t want a subscription,
                Office 2024 is the natural next step.</strong> Same model, same apps, three more years of patches — for
                less than a single year of Microsoft 365.
              </p>
              <p className="mb-4">
                <strong className="text-white">If you share Office with family, rely on OneDrive, or want Copilot,</strong>{" "}
                Microsoft 365 earns its price — and this deadline is a sensible moment to switch.
              </p>
              <p>
                <strong className="text-white">Staying on Office 2021</strong> only makes sense on a PC that rarely
                touches email or downloads. We wouldn&apos;t run a business on it past October 13.
              </p>
            </div>

            {/* Inline offer — product image, solid colours */}
            <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6 md:p-8 my-12 flex flex-col sm:flex-row items-center gap-6">
              <Box name="Office 2024 Professional Plus" className="w-28 flex-shrink-0" />
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1">Supported until 2029</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">Office 2024 Professional Plus</p>
                <p className="text-base text-gray-600">One-time purchase · Instant email delivery · Activation help included</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-gray-900 mb-3">$34.99</p>
                <Link
                  href="/products/office-2024-professional-plus"
                  className="inline-block px-6 py-3 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition"
                >
                  Buy Office 2024
                </Link>
              </div>
            </div>

            <H2 id="upgrade">How to Upgrade Office 2021 (or 2019/2016) to Office 2024</H2>
            <ol className="space-y-4 mb-8">
              {[
                ["Back up", "Save anything important, and export Publisher (.pub) files to PDF or Word."],
                ["Uninstall your old Office", "Settings → Apps → Installed apps → Microsoft Office → Uninstall. Your documents stay where they are."],
                ["Restart", "Restart your PC so the old installation is fully removed."],
                ["Redeem your key", "Go to www.office.com/setup, sign in with your Microsoft account and enter your Office 2024 product key."],
                ["Install and confirm", "Download and run the installer, then open Word and check File → Account shows it as activated."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4 rounded-2xl border border-gray-200 p-5">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center">{i + 1}</span>
                  <div>
                    <p className="font-bold text-gray-900">{t}</p>
                    <p className="text-base">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mb-5">
              Screenshots and troubleshooting are in our{" "}
              <Link href="/activation-guide" className="text-blue-700 underline-offset-2 hover:underline">activation guide</Link>,
              and our team can help on WhatsApp if you get stuck.
            </p>

            <H2 id="discussion">Questions Worth Discussing</H2>
            <p className="mb-5">The deadline raises bigger questions than which box to buy. We&apos;d like to hear where you land:</p>
            <ol className="list-decimal pl-6 mb-8 space-y-3">
              <li><strong>Is a one-time Office license still worth it</strong> now that new features like Copilot only come with a subscription?</li>
              <li><strong>Would you run an unsupported Office</strong> on a work PC — or is that a hard no?</li>
              <li><strong>Five-year support windows:</strong> fair for a one-time purchase, or a nudge toward subscriptions?</li>
              <li><strong>Publisher users:</strong> with Publisher retiring and missing from Office 2024, what are you moving to?</li>
            </ol>
            <div className="rounded-2xl bg-slate-50 border border-gray-200 p-6 md:p-8 mb-8 text-center">
              <p className="font-bold text-gray-900 text-xl mb-1">Share this briefing</p>
              <p className="text-base text-gray-500 mb-5">Take the question to your team, group chat or community.</p>
              <div className="flex flex-wrap justify-center gap-3">
                {shareLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-800 font-semibold text-sm hover:border-blue-700 hover:text-blue-700 transition"
                  >
                    <i className={s.icon}></i> {s.label}
                  </a>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-5">
                Want a second opinion on your setup?{" "}
                <a href="https://wa.me/16019756129" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold">Message us on WhatsApp</a>.
              </p>
            </div>

            {/* FAQ — mirrored in the FAQPage JSON-LD above */}
            <H2 id="faq">Frequently Asked Questions</H2>
            <div className="space-y-3 mb-8">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-gray-200 bg-white p-5 open:shadow-md transition">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-lg text-gray-900">
                    {f.q}
                    <i className="fas fa-plus text-sm text-gray-400 transition group-open:rotate-45"></i>
                  </summary>
                  <p className="mt-3 text-gray-700 text-base">{f.a}</p>
                </details>
              ))}
            </div>

            <H2 id="sources">Sources</H2>
            <ol className="space-y-2 mb-6 text-base">
              {sources.map((s) => (
                <li key={s.n} id={`source-${s.n}`} className="scroll-mt-32">
                  <span className="font-semibold text-gray-900">[{s.n}]</span>{" "}
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">{s.label}</a>
                </li>
              ))}
            </ol>
            <p className="text-sm text-gray-500 mb-4">
              Microsoft 365 prices are Microsoft&apos;s US list prices as of October 2026. Official Keys Hub is an
              independent reseller of genuine licenses and is not affiliated with or endorsed by Microsoft. Product
              images are our own illustrations.
            </p>
          </article>
        </div>

        {/* CTA */}
        <section className="py-20 bg-blue-700">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Upgrade to Office 2024</h2>
            <p className="text-blue-100 text-lg mb-8">
              The newest one-time-purchase Office, supported until 2029. Genuine key, instant email delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products/office-2024-professional-plus"
                className="px-8 py-4 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition"
              >
                Office 2024 Pro Plus — $34.99
              </Link>
              <Link
                href="/products/office-home-and-business-2024"
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition"
              >
                Home &amp; Business 2024 — $39.99
              </Link>
            </div>
          </div>
        </section>

        {/* Related reading */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Related reading</h3>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { href: "/blog/office-2021-vs-office-365", t: "Office 2021 vs Office 365", d: "One-time purchase or subscription, compared", icon: "fa-scale-balanced" },
                { href: "/blog/how-to-activate-office-2021", t: "How to Activate Office", d: "Install and activate Office the right way", icon: "fa-key" },
                { href: "/blog/microsoft-product-keys-guide", t: "Microsoft Product Keys Explained", d: "Every Windows, Office and Server key in one guide", icon: "fa-book-open" },
              ].map((r) => (
                <Link key={r.href} href={r.href} className="group rounded-2xl border border-gray-200 bg-white p-6 hover:border-blue-700 hover:shadow-lg transition">
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <i className={`fas ${r.icon}`}></i>
                  </span>
                  <h4 className="font-bold mb-1 text-gray-900 group-hover:text-blue-700">{r.t}</h4>
                  <p className="text-sm text-gray-600">{r.d}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
