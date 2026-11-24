import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import {
  lifecycleGroups,
  LIFECYCLE_CHECKED,
  daysLeft,
  statusOf,
  formatEnd,
  type LifecycleRow,
  type LifecycleStatus,
} from "../lib/lifecycle";
import CopyLinkBox from "./CopyLinkBox";

const URL = "https://www.officialkeyshub.com/microsoft-end-of-support";

// Re-render once a day so "days left" and the status badges stay current.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Microsoft End of Support Dates: Windows, Office, Server",
  description:
    "Every Microsoft end of support date in one table: Windows 10 and 11, Office 2016 to 2024, Windows Server, SQL Server, Visio, Project and Visual Studio. Updated daily.",
  keywords:
    "microsoft end of support dates, windows end of support, office end of support, windows server end of life, sql server end of support, microsoft lifecycle dates, office 2021 end of support, windows 11 24h2 end of support",
  alternates: { canonical: URL },
  openGraph: {
    title: "Microsoft End of Support Dates (Windows, Office, Server)",
    description: "One table with every Microsoft end of support date, days left, and what to upgrade to. Updated daily.",
    url: URL,
    type: "website",
    images: [{ url: "https://www.officialkeyshub.com/og-image.jpg", width: 1200, height: 630, alt: "Microsoft end of support dates" }],
  },
};

const checkedLabel = new Date(`${LIFECYCLE_CHECKED}T12:00:00Z`).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const faqs = [
  {
    q: "What happens when Microsoft software reaches end of support?",
    a: "It keeps working, but Microsoft stops releasing security updates, bug fixes and technical support for it. New vulnerabilities stay unpatched, so it becomes riskier to use online over time.",
  },
  {
    q: "When does Windows 10 support end?",
    a: "Windows 10 support ended on 14 October 2025. Home and Pro PCs enrolled in the free consumer Extended Security Updates (ESU) program keep getting security updates until 12 October 2027.",
  },
  {
    q: "Does Windows 11 have an end of support date?",
    a: "Windows 11 as a whole has no announced end date. Each yearly version is supported for 24 months on Home and Pro, so installing the latest version through Windows Update keeps the PC supported.",
  },
  {
    q: "When does Office 2021 support end?",
    a: "Office 2021 reached end of support on 13 October 2026. Office 2024 is supported until 9 October 2029, and Microsoft 365 stays supported while the subscription is active.",
  },
  {
    q: "When does Windows Server 2016 support end?",
    a: "Extended support for Windows Server 2016 ends on 12 January 2027. Paid Extended Security Updates are available for up to three more years.",
  },
];

const statusStyle: Record<LifecycleStatus, { label: string; cls: string }> = {
  ended: { label: "Ended", cls: "bg-red-50 text-red-700 ring-red-200" },
  soon: { label: "Ends within a year", cls: "bg-amber-50 text-amber-800 ring-amber-200" },
  supported: { label: "Supported", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
};

function DaysCell({ row, today }: { row: LifecycleRow; today: Date }) {
  if (row.endLabel) return <span className="text-gray-500">—</span>;
  const d = daysLeft(row.end, today);
  if (d < 0) return <span className="text-gray-500">{Math.abs(d).toLocaleString("en-US")} days ago</span>;
  return <span className="font-semibold text-gray-900">{d.toLocaleString("en-US")} days</span>;
}

export default function EndOfSupportPage() {
  const today = new Date();

  // The next few end dates still ahead of us, for the summary box.
  const upcoming = lifecycleGroups
    .flatMap((g) => g.rows)
    .filter((r) => !r.endLabel && daysLeft(r.end, today) >= 0)
    .sort((a, b) => a.end.localeCompare(b.end))
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Microsoft End of Support Dates",
        url: URL,
        description:
          "End of support dates for Windows, Office, Windows Server, SQL Server, Visio, Project and Visual Studio, based on Microsoft's lifecycle pages.",
        dateModified: LIFECYCLE_CHECKED,
        publisher: { "@type": "Organization", name: "Official Keys Hub", url: "https://www.officialkeyshub.com" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.officialkeyshub.com" },
          { "@type": "ListItem", position: 2, name: "Microsoft End of Support Dates", item: URL },
        ],
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
      <main className="bg-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 pt-5">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Microsoft End of Support Dates" }]} />
        </div>

        <section className="py-10 md:py-14 bg-sky-50">
          <div className="max-w-5xl mx-auto px-4">
            <span className="inline-block mb-3 px-4 py-1 rounded-full bg-sky-100 text-sky-700 text-sm font-bold">
              Updated daily · dates checked {checkedLabel}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Microsoft End of Support Dates
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Every Windows, Office, Windows Server, SQL Server, Visio, Project and Visual Studio end of support date in
              one place, with days left and what to move to. Dates come from Microsoft&apos;s official lifecycle pages.
            </p>

            {upcoming.length > 0 && (
              <div className="mt-8 rounded-2xl border border-sky-200 bg-white p-5 md:p-6">
                <p className="text-xs font-bold uppercase tracking-wide text-sky-700 mb-3">Ending next</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {upcoming.map((r) => (
                    <li key={r.product} className="flex items-baseline justify-between gap-3 border-b border-gray-100 pb-2 last:border-0">
                      <span className="font-semibold text-gray-900">{r.product}</span>
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {formatEnd(r)} · <DaysCell row={r} today={today} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <nav aria-label="Jump to" className="mt-6 flex flex-wrap gap-2">
              {lifecycleGroups.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-200 hover:ring-sky-400"
                >
                  {g.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="max-w-5xl mx-auto px-4 space-y-12">
            {lifecycleGroups.map((g) => (
              <div key={g.id} id={g.id} className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{g.title}</h2>
                <p className="text-gray-600 mb-4 max-w-3xl">{g.intro}</p>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead className="bg-gray-50 text-left text-gray-600">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-semibold">Product</th>
                        <th scope="col" className="px-4 py-3 font-semibold">End of support</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Days left</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Move to</th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.rows.map((r, i) => {
                        const s = statusStyle[statusOf(r, today)];
                        return (
                          <tr key={r.product} className={i % 2 ? "bg-gray-50/60" : "bg-white"}>
                            <th scope="row" className="px-4 py-3 text-left font-semibold text-gray-900 align-top">
                              {r.product}
                              {r.note && <span className="block mt-1 text-xs font-normal text-gray-500">{r.note}</span>}
                            </th>
                            <td className="px-4 py-3 align-top whitespace-nowrap text-gray-800">{formatEnd(r)}</td>
                            <td className="px-4 py-3 align-top">
                              <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${s.cls}`}>
                                {s.label}
                              </span>
                            </td>
                            <td className="px-4 py-3 align-top whitespace-nowrap">
                              <DaysCell row={r} today={today} />
                            </td>
                            <td className="px-4 py-3 align-top">
                              {r.upgrade ? (
                                <Link href={r.upgrade.href} className="font-semibold text-sky-700 hover:underline whitespace-nowrap">
                                  {r.upgrade.label} →
                                </Link>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            <p className="text-sm text-gray-500">
              Dates are the last day of support (the end of extended support for products with two phases), taken from{" "}
              <a
                href="https://learn.microsoft.com/en-us/lifecycle/products/"
                className="text-sky-700 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft&apos;s lifecycle pages
              </a>{" "}
              and checked {checkedLabel}. Where only the month is certain, the month is shown. Microsoft occasionally
              changes dates, so check its page before a big decision. Official Keys Hub is an independent reseller and isn&apos;t
              affiliated with Microsoft.
            </p>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
            <div className="space-y-4 mb-12">
              {faqs.map((f) => (
                <div key={f.q} className="bg-white rounded-xl p-5 ring-1 ring-gray-200">
                  <h3 className="font-bold text-gray-900 mb-1">{f.q}</h3>
                  <p className="text-gray-700 m-0">{f.a}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related guides</h2>
            <ul className="space-y-2 text-sky-700 font-semibold mb-12">
              <li><Link href="/blog/windows-10-end-of-support-2026" className="hover:underline">Windows 10 end of support: your options</Link></li>
              <li><Link href="/blog/upgrade-windows-10-to-windows-11-cheap" className="hover:underline">How to upgrade Windows 10 to Windows 11 cheaply</Link></li>
              <li><Link href="/blog/office-2021-end-of-support" className="hover:underline">Office 2021 end of support: what to do next</Link></li>
              <li><Link href="/blog/office-2024-vs-microsoft-365" className="hover:underline">Office 2024 vs Microsoft 365</Link></li>
              <li><Link href="/key-finder" className="hover:underline">Which Windows or Office key do I need?</Link></li>
            </ul>

            <CopyLinkBox url={URL} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
