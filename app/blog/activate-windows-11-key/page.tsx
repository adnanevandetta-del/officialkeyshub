import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Do I Activate My Windows 11 Key? Quick Answer + All Methods (2026)",
  description:
    "A short, clear answer to \"how do I activate my Windows 11 key\" plus every method: Settings, Command Prompt (slmgr), phone activation, and digital license. Works on Home, Pro and Enterprise.",
  keywords:
    "how do i activate my windows 11 key, activate windows 11 key, enter windows 11 product key, windows 11 activation command, slmgr activate windows 11, activate windows 11 home",
  alternates: { canonical: "https://officialkeyshub.com/blog/activate-windows-11-key" },
  openGraph: {
    title: "How Do I Activate My Windows 11 Key? Quick Answer + All Methods (2026)",
    description:
      "The fast answer plus every activation method for Windows 11 Home, Pro and Enterprise — Settings, Command Prompt and phone activation.",
    url: "https://officialkeyshub.com/blog/activate-windows-11-key",
    type: "article",
  },
};

const faqs = [
  {
    q: "How do I activate my Windows 11 key quickly?",
    a: "Open Settings with Windows key + I, go to System → Activation → Change product key, paste your 25-character key and click Next. Windows verifies it with Microsoft in about 30 seconds.",
  },
  {
    q: "Where do I enter the Windows 11 product key?",
    a: "Under Settings → System → Activation. Click the \"Change product key\" button next to the Upgrade or activation section, then type or paste your key.",
  },
  {
    q: "Can I activate Windows 11 Home with the same steps?",
    a: "Yes. The Settings and Command Prompt methods work identically on Windows 11 Home, Pro and Enterprise — just make sure the key matches the edition you installed.",
  },
  {
    q: "Do I need to reinstall Windows before activating?",
    a: "No. Activation only validates your license. Your files, apps and settings are untouched, so you can activate an already-installed copy at any time.",
  },
  {
    q: "My key says it doesn't work — what now?",
    a: "Confirm the key matches your edition (a Home key won't activate Pro), retype it carefully, and check your internet connection. For specific error codes, see our full activation guide, or contact your seller for a replacement.",
  },
];

export default function ActivateWindows11Key() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Activate Windows 11 Key" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "How Do I Activate My Windows 11 Key? Quick Answer + All Methods (2026)",
        description:
          "A short, clear answer to how to activate a Windows 11 key, plus every method: Settings, Command Prompt (slmgr), phone activation and digital license.",
        author: { "@type": "Organization", name: "Official Keys Hub" },
        publisher: {
          "@type": "Organization",
          name: "Official Keys Hub",
          logo: { "@type": "ImageObject", url: "https://officialkeyshub.com/logo.png" },
        },
        datePublished: "2026-09-17",
        dateModified: "2026-09-17",
        mainEntityOfPage: "https://officialkeyshub.com/blog/activate-windows-11-key",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <div className="pt-20 bg-white min-h-screen">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">
                  Activation
                </span>
                <span className="text-gray-500">📅 Sep 17, 2026 • ⏱️ 6 min read</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
                How Do I Activate My Windows 11 Key?
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Quick Answer + Every Method (2026)
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Got your product key and just want it activated? This guide gives you the fast answer first,
                then walks through every method — Settings, Command Prompt, phone activation and digital
                license — for Windows 11 Home, Pro and Enterprise.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto prose prose-lg">

              {/* Quick answer box */}
              <div className="not-prose bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-10">
                <h2 className="font-bold text-emerald-900 text-xl mb-3">⚡ Quick Answer</h2>
                <p className="text-emerald-900 mb-0">
                  Press <kbd className="px-2 py-1 bg-white rounded border border-gray-300 font-mono">Windows + I</kbd> →{" "}
                  <strong>System</strong> → <strong>Activation</strong> → <strong>Change product key</strong> →
                  paste your 25-character key → <strong>Next</strong>. Windows checks it with Microsoft and
                  activates in about 30 seconds. That&apos;s it.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                🖱️ Method 1: Activate in Settings (easiest)
              </h2>
              <div className="not-prose bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl mb-8">
                <div className="space-y-5">
                  {[
                    ["Open Settings", "Press Windows + I, or click Start → Settings (gear icon)."],
                    ["Go to Activation", "Select System in the sidebar, then scroll to Activation."],
                    ["Change product key", "Click \"Change product key\" and paste your 25-character key."],
                    ["Activate", "Click Next. When it finishes you'll see \"Windows is activated with a digital license.\""],
                  ].map(([title, desc], i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-11 h-11 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
                        <p className="text-gray-700">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm mt-6">
                  XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
                </div>
                <p className="text-gray-600 text-sm mt-2">💡 Paste the key instead of typing it to avoid mistakes.</p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                ⌨️ Method 2: Activate with Command Prompt
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Prefer the keyboard, or activating several PCs? Command Prompt is fast and reliable. Right-click
                Start → <strong>Terminal (Admin)</strong> or <strong>Command Prompt (Admin)</strong>, then run two commands:
              </p>
              <div className="not-prose bg-gray-900 rounded-xl p-6 mb-6 space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">1. Install your product key:</p>
                  <code className="block bg-black text-green-400 p-3 rounded font-mono text-sm">
                    slmgr /ipk XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
                  </code>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">2. Activate online:</p>
                  <code className="block bg-black text-green-400 p-3 rounded font-mono text-sm">slmgr /ato</code>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-8">
                A confirmation box appears when it succeeds. To double-check, run{" "}
                <code className="bg-gray-100 px-2 py-0.5 rounded">slmgr /xpr</code> — it will report that Windows is
                permanently activated.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                📞 Method 3: Phone Activation (no internet)
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                If the PC is offline or online activation is temporarily unavailable, press{" "}
                <kbd className="px-2 py-1 bg-white rounded border">Windows + R</kbd>, type{" "}
                <code className="bg-gray-100 px-2 py-0.5 rounded">slui 4</code>, pick your country and call the
                free automated Microsoft line to exchange your Installation ID for a Confirmation ID. It&apos;s a
                legitimate, no-cost Microsoft service. For the full step-by-step with every error code, see our{" "}
                <Link href="/blog/how-to-activate-windows-11" className="text-blue-600 font-semibold underline">
                  complete Windows 11 activation guide
                </Link>.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                🔄 Reinstalled Windows? You may not need to re-enter the key
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                Once a key activates, Windows ties a <strong>digital license</strong> to your hardware and your
                Microsoft account. If you reinstall on the same PC, it usually re-activates automatically. If you
                moved to a new computer, check whether your license can transfer in our{" "}
                <Link href="/blog/transfer-windows-license-new-pc" className="text-blue-600 font-semibold underline">
                  license transfer guide
                </Link>.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                ✅ How to confirm Windows is activated
              </h2>
              <div className="not-prose bg-gray-50 p-6 rounded-xl mb-10">
                <p className="text-gray-700">
                  Go to <strong>Settings → System → Activation</strong>. Under Activation state you should see{" "}
                  <em>&quot;Active&quot;</em> and the message <em>&quot;Windows is activated with a digital
                  license.&quot;</em> The desktop watermark disappears and personalization options unlock.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">❓ Frequently Asked Questions</h2>
              <div className="not-prose space-y-4 mb-10">
                {faqs.map((faq, idx) => (
                  <details key={idx} className="bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition-colors group">
                    <summary className="font-bold text-blue-900 cursor-pointer flex items-center justify-between">
                      {faq.q}
                      <i className="fas fa-chevron-down group-open:rotate-180 transition-transform text-blue-600"></i>
                    </summary>
                    <p className="text-gray-700 mt-4 leading-relaxed border-t border-blue-200 pt-4">{faq.a}</p>
                  </details>
                ))}
              </div>

              <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Related reading</h3>
                <ul className="space-y-1">
                  <li><Link href="/blog/how-to-activate-windows-11" className="text-blue-600 underline">Full Windows 11 activation guide (with error fixes)</Link></li>
                  <li><Link href="/blog/cheap-windows-11-keys-2026" className="text-blue-600 underline">Where to buy a genuine Windows 11 key</Link></li>
                  <li><Link href="/activation-guide" className="text-blue-600 underline">Activation Guide for all products</Link></li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-600">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Need a genuine Windows 11 key?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Get a genuine Windows 11 Pro license with instant email delivery, a lifetime activation, and a
              30-day money-back guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#products" className="px-10 py-5 bg-yellow-400 text-gray-900 font-bold text-lg rounded-xl hover:bg-yellow-300 transition-all shadow-xl inline-flex items-center justify-center">
                <i className="fab fa-windows mr-3"></i>
                Shop Windows 11 Keys
              </a>
              <a href="https://wa.me/16019756129" target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all shadow-xl inline-flex items-center justify-center">
                <i className="fab fa-whatsapp mr-3"></i>
                Chat With Support
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
