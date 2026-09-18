import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Transfer a Windows License to a New PC (2026 Guide) | Official Keys Hub",
  description:
    "Can you move your Windows key to a new computer? Learn how to transfer a Windows 10 or 11 license to a new PC, OEM vs retail transfer rules, and step-by-step deactivation.",
  keywords:
    "transfer windows license to new pc, move windows key to new computer, transfer windows 11 license, transfer windows 10 license, can i transfer my windows key, deactivate windows key old pc, retail vs oem transfer, reactivate windows new hardware",
  alternates: { canonical: "https://www.officialkeyshub.com/blog/transfer-windows-license-new-pc" },
  openGraph: {
    title: "How to Transfer a Windows License to a New PC (2026)",
    description: "Step-by-step guide to move your Windows 10/11 license to a new computer, including OEM vs retail rules.",
    url: "https://www.officialkeyshub.com/blog/transfer-windows-license-new-pc",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Transfer a Windows License to a New PC",
  description: "A complete 2026 guide to transferring a Windows 10 or 11 license to a new computer.",
  author: { "@type": "Organization", name: "Official Keys Hub" },
  publisher: {
    "@type": "Organization",
    name: "Official Keys Hub",
    logo: { "@type": "ImageObject", url: "https://www.officialkeyshub.com/logo.png" },
  },
  datePublished: "2026-09-14",
  dateModified: "2026-09-17",
};

export default function TransferWindowsLicense() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Transfer Windows License" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <div className="pt-20 bg-white min-h-screen">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">
                  Licensing Guide
                </span>
                <span className="text-gray-500">📅 Sep 14, 2026 • ⏱️ 8 min read</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
                How to Transfer a Windows License
                <br />
                <span className="text-blue-600">to a New PC (2026 Guide)</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Building or buying a new computer? You may be able to move your existing license instead of buying a
                new one. Here&apos;s exactly how to <strong>transfer a Windows license to a new PC</strong> — and when
                you can&apos;t.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-14">
          <div className="container mx-auto px-6">
            <article className="max-w-4xl mx-auto prose prose-lg max-w-none">
              <div className="bg-sky-50 border-l-4 border-sky-600 p-6 mb-10 rounded-r-lg">
                <p className="text-gray-800 m-0">
                  <strong>Quick answer:</strong> <strong>Retail</strong> Windows licenses <em>can</em> be transferred to a
                  new PC after you deactivate them on the old one. <strong>OEM</strong> licenses are tied to the original
                  motherboard and <em>cannot</em> be transferred.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">Retail vs OEM: Can You Transfer Your Key?</h2>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-900 text-white">
                    <tr>
                      <th className="p-3">License Type</th>
                      <th className="p-3">Transferable?</th>
                      <th className="p-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-t border-gray-200">
                      <td className="p-3 font-semibold">Retail</td>
                      <td className="p-3 text-sky-700 font-bold">Yes</td>
                      <td className="p-3">Move to a new PC unlimited times after deactivating the old one.</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-gray-50">
                      <td className="p-3 font-semibold">OEM</td>
                      <td className="p-3 text-red-600 font-bold">No</td>
                      <td className="p-3">Locked to the first motherboard it activated on.</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="p-3 font-semibold">Volume / MAK</td>
                      <td className="p-3 text-yellow-600 font-bold">Sometimes</td>
                      <td className="p-3">Depends on the agreement; usually managed by an organization.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-8 text-gray-700">
                Not sure which you have? Our{" "}
                <Link href="/blog/oem-vs-retail-windows-keys" className="text-blue-600 hover:underline">
                  OEM vs Retail Windows keys guide
                </Link>{" "}
                explains how to check.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 1: Deactivate Windows on the Old PC</h2>
              <ol className="space-y-3 mb-8 list-decimal pl-6 text-gray-700">
                <li>Open <strong>Command Prompt as Administrator</strong>.</li>
                <li>Run <code className="bg-gray-100 px-2 py-0.5 rounded">slmgr /upk</code> to uninstall the current product key.</li>
                <li>Run <code className="bg-gray-100 px-2 py-0.5 rounded">slmgr /cpky</code> to clear the key from the registry.</li>
                <li>The license is now released and ready to use on another PC.</li>
              </ol>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">Step 2: Activate Windows on the New PC</h2>
              <ol className="space-y-3 mb-8 list-decimal pl-6 text-gray-700">
                <li>On the new PC, open <strong>Settings → System → Activation</strong>.</li>
                <li>Choose <strong>Change product key</strong> and enter your 25-character key.</li>
                <li>If online activation is blocked because of a hardware change, use <strong>phone activation</strong> (run <code className="bg-gray-100 px-2 py-0.5 rounded">slui 4</code>).</li>
              </ol>
              <p className="mb-8 text-gray-700">
                Need the full activation walkthrough?{" "}
                <Link href="/blog/how-to-activate-windows-11" className="text-blue-600 hover:underline">
                  See our Windows 11 activation guide
                </Link>.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tip: Link Your License to a Microsoft Account</h2>
              <p className="mb-8 text-gray-700">
                Signing into Windows with a Microsoft account creates a <strong>digital license</strong>. After a hardware
                change you can then use the <strong>Activation Troubleshooter</strong> (&quot;I changed hardware on this
                device recently&quot;) to reactivate without re-entering the key.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">When It&apos;s Cheaper to Just Buy a New Key</h2>
              <p className="mb-8 text-gray-700">
                If your old license is OEM, or transferring is more hassle than it&apos;s worth, a genuine{" "}
                <Link href="/blog/cheap-windows-11-keys-2026" className="text-blue-600 hover:underline">
                  cheap Windows 11 key
                </Link>{" "}
                starts at just $12.99 — often less than the time spent troubleshooting a transfer.
              </p>

              {/* CTA */}
              <div className="not-prose bg-gradient-to-br from-sky-700 to-sky-800 rounded-2xl p-8 text-center text-white mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Need a Fresh Windows License?</h2>
                <p className="text-sky-100 mb-6 max-w-2xl mx-auto">Genuine Windows 10 &amp; 11 keys from $12.99 — instant delivery and lifetime activation.</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/#products" className="px-8 py-4 bg-white text-sky-800 font-bold rounded-lg hover:bg-sky-50 transition-all shadow-lg">
                    Browse Windows Keys →
                  </Link>
                  <Link href="/blog" className="px-8 py-4 bg-sky-800/40 text-white font-bold rounded-lg hover:bg-sky-800/60 transition-all border border-white/30">
                    Read More Guides
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
