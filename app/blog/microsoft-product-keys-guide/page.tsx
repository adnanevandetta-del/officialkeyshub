import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import Link from "next/link";
import type { Metadata } from "next";

const URL = "https://www.officialkeyshub.com/blog/microsoft-product-keys-guide";
const TITLE = "Microsoft Product Keys Explained (2026): Windows, Office, Server & More";
const DESCRIPTION =
  "Every Microsoft product key in one guide: Windows 11, Office 2021, Microsoft 365, Windows Server, Visio, Project, SQL Server and Visual Studio. Key types, real prices, support dates, how to find your key and how to spot a fake.";

export const metadata: Metadata = {
  title: `${TITLE} | Official Keys Hub`,
  description: DESCRIPTION,
  keywords:
    "microsoft product key, microsoft product key price, windows product key, windows 11 pro key, windows 11 pro key price, buy windows key, buy windows key cheap, office product key, office 2021 professional plus key, lifetime microsoft office, lifetime microsoft office license, microsoft product key lookup, microsoft product key checker, where to find microsoft product key, windows server 2022 key, visio 2021 key, project 2021 key, sql server 2022 key, visual studio 2022 key, retail vs oem key",
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description:
      "Windows, Office, Server, Visio, Project, SQL Server and Visual Studio keys explained — key types, prices, support dates and how to buy safely.",
    url: URL,
    type: "article",
  },
};

const faqs = [
  {
    q: "What is a Microsoft product key?",
    a: "A Microsoft product key is a 25-character code in the format XXXXX-XXXXX-XXXXX-XXXXX-XXXXX that proves you own a license for a Microsoft product such as Windows or Office. You enter it once and Microsoft's servers activate your copy.",
  },
  {
    q: "How much does a Microsoft product key cost?",
    a: "Microsoft's own list price for a Windows 11 Pro license is $199.99 and Windows 11 Home is $139. Discounted genuine keys from resellers cost far less — at Official Keys Hub, Windows 11 Pro is $16.99 and Office 2021 Professional Plus is $24.99.",
  },
  {
    q: "Is there a lifetime Microsoft Office license?",
    a: "Yes — perpetual (one-time purchase) versions like Office 2021 and Office 2024 are paid once and never expire. Microsoft 365 is different: it is a subscription and stops working if you don't renew. Note that 'lifetime' means the license never expires, not that Microsoft supports the version forever.",
  },
  {
    q: "How do I find my Windows product key?",
    a: "On PCs that shipped with Windows, the key is stored in the firmware. Open PowerShell and run (Get-CimInstance -ClassName SoftwareLicensingService).OA3xOriginalProductKey. If Windows is already activated with a digital license, you don't need the key — it reactivates automatically after reinstalling.",
  },
  {
    q: "Is there a Microsoft product key checker?",
    a: "Microsoft has no public tool that validates an unused key without activating it. To check an installed key, run slmgr /dli or slmgr /xpr in Command Prompt to see the license status. Avoid third-party 'key checker' sites — pasting your key into them can get it stolen.",
  },
  {
    q: "Does Office 2021 still work after October 13, 2026?",
    a: "Yes. Office 2021 keeps working and stays activated after its end-of-support date. What stops is Microsoft's security and quality updates for that version.",
  },
  {
    q: "What's the difference between an Online Key, Phone Key and Bind Key?",
    a: "They are activation methods. An Online Key activates over the internet in seconds. A Phone Key is activated through Microsoft's phone activation (useful when online activation isn't available). A Bind Key links Office to your Microsoft account so you can reinstall it from account.microsoft.com.",
  },
];

// Product-by-product overview. Prices mirror the live catalog.
const products: { family: string; name: string; href: string; price: string; bestFor: string }[] = [
  { family: "Windows", name: "Windows 11 Pro", href: "/products/windows-11-pro", price: "$16.99", bestFor: "Most PCs — BitLocker, Remote Desktop, Hyper-V" },
  { family: "Windows", name: "Windows 11 Home", href: "/products/windows-11-home", price: "$12.99", bestFor: "Home users who don't need Pro features" },
  { family: "Windows", name: "Windows 11 Pro for Workstations", href: "/products/windows-11-pro-for-workstations", price: "$24.99", bestFor: "High-end workstations, ReFS, server-grade hardware" },
  { family: "Office", name: "Office 2024 Professional Plus", href: "/products/office-2024-professional-plus", price: "$34.99", bestFor: "Newest Office — supported until 2029" },
  { family: "Office", name: "Office Home & Business 2024", href: "/products/office-home-and-business-2024", price: "$39.99", bestFor: "Small business — includes Outlook" },
  { family: "Office", name: "Office Home 2024", href: "/products/office-home-2024", price: "$29.99", bestFor: "Home & students — Word, Excel, PowerPoint" },
  { family: "Office", name: "Office 2021 Professional Plus", href: "/products/office-2021-professional-plus", price: "$24.99", bestFor: "Lowest-cost full suite (updates end Oct 2026)" },
  { family: "Office", name: "Microsoft 365 Business Standard (1 Year)", href: "/products/microsoft-365-business-standard-1-year", price: "$39.99", bestFor: "Always-updated apps + cloud services" },
  { family: "Server", name: "Windows Server 2025 Standard", href: "/products/windows-server-2025-standard", price: "$44.99", bestFor: "Newest Windows Server — physical or light virtualization" },
  { family: "Server", name: "Windows Server 2025 Datacenter", href: "/products/windows-server-2025-datacenter", price: "$69.99", bestFor: "Heavily virtualized datacenters" },
  { family: "Visio", name: "Visio Professional 2024", href: "/products/visio-professional-2024", price: "$34.99", bestFor: "Flowcharts, network and org diagrams" },
  { family: "Project", name: "Project Professional 2024", href: "/products/project-professional-2024", price: "$34.99", bestFor: "Schedules, Gantt charts, resources" },
  { family: "SQL Server", name: "SQL Server 2025 Standard", href: "/products/sql-server-2025-standard", price: "$54.99", bestFor: "Newest SQL Server with vector search" },
  { family: "Developer", name: "Visual Studio 2022 Professional", href: "/products/visual-studio-2022-professional", price: "$29.99", bestFor: "Professional .NET and C++ development" },
];

export default function MicrosoftProductKeysGuide() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Microsoft Product Keys Guide" },
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
        datePublished: "2026-10-02",
        dateModified: "2026-10-02",
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
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">Buying Guide</span>
                <span className="text-gray-500">📅 Oct 2, 2026 • ⏱️ 11 min read</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
                Microsoft Product Keys Explained
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Windows, Office, Server &amp; More (2026)
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                One guide to every Microsoft product key: what each one unlocks, which key type to choose, what it
                should really cost, which versions are still supported in 2026, how to find a key you already own,
                and how to spot a fake before you pay.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed">

              {/* Quick answer */}
              <div className="not-prose bg-sky-50 border-l-4 border-sky-600 p-6 rounded-r-xl mb-10">
                <h2 className="font-bold text-sky-900 text-xl mb-3">⚡ Quick Answer</h2>
                <p className="text-sky-900 mb-0">
                  A <strong>Microsoft product key</strong> is a 25-character code that activates a genuine license.
                  For most people the right picks in 2026 are <strong>Windows 11 Pro</strong> for the operating
                  system and <strong>Office 2024</strong> (one-time purchase, supported until 2029) or a{" "}
                  <strong>Microsoft 365</strong> subscription for the apps. A genuine key costs far less than Microsoft&apos;s $199.99 list price
                  — but anything priced like a coffee, or sold as a &quot;free key list&quot;, is a red flag.
                </p>
              </div>

              {/* Table of contents */}
              <div className="not-prose bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
                <p className="font-bold text-gray-900 mb-3">📑 In this guide</p>
                <ol className="list-decimal pl-6 space-y-1 text-gray-700">
                  <li><a href="#what-is" className="text-blue-600 hover:underline">What a Microsoft product key is</a></li>
                  <li><a href="#key-types" className="text-blue-600 hover:underline">Retail, OEM, Volume and digital licenses</a></li>
                  <li><a href="#activation-types" className="text-blue-600 hover:underline">Online, Phone and Bind keys</a></li>
                  <li><a href="#products" className="text-blue-600 hover:underline">Every product key, side by side</a></li>
                  <li><a href="#price" className="text-blue-600 hover:underline">Microsoft product key price</a></li>
                  <li><a href="#support" className="text-blue-600 hover:underline">Which versions are still supported in 2026</a></li>
                  <li><a href="#find" className="text-blue-600 hover:underline">How to find your product key</a></li>
                  <li><a href="#check" className="text-blue-600 hover:underline">How to check a key (and avoid &quot;key checker&quot; scams)</a></li>
                  <li><a href="#red-flags" className="text-blue-600 hover:underline">Red flags when buying</a></li>
                  <li><a href="#faq" className="text-blue-600 hover:underline">FAQ</a></li>
                </ol>
              </div>

              <h2 id="what-is" className="text-3xl font-bold mt-12 mb-6 text-gray-900">What Is a Microsoft Product Key?</h2>
              <p className="mb-5">
                A product key is a 25-character code in the format{" "}
                <code className="bg-gray-100 px-2 py-0.5 rounded">XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</code>. It proves
                you hold a license for one specific product and edition — a Windows 11 Pro key activates Windows 11
                Pro, not Home and not Office. When you enter it, Microsoft&apos;s activation servers check it and
                mark your copy as genuine.
              </p>
              <p className="mb-5">
                The key is not the software. You download Windows or Office from Microsoft, then enter the key to
                activate it. That&apos;s why a genuine license can be delivered instantly by email.
              </p>

              <h2 id="key-types" className="text-3xl font-bold mt-12 mb-6 text-gray-900">Retail, OEM, Volume and Digital Licenses</h2>
              <p className="mb-5">The same software can be sold under different license types. They differ in transfer rights and price, not features.</p>

              <div className="not-prose overflow-x-auto mb-8">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gray-100 text-gray-900">
                    <tr>
                      <th className="text-left p-3">License type</th>
                      <th className="text-left p-3">Tied to</th>
                      <th className="text-left p-3">Move to a new PC?</th>
                      <th className="text-left p-3">Typical buyer</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-t border-gray-200">
                      <td className="p-3 font-semibold">Retail (FPP)</td>
                      <td className="p-3">The owner</td>
                      <td className="p-3">✅ Yes</td>
                      <td className="p-3">People who rebuild PCs often</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="p-3 font-semibold">OEM</td>
                      <td className="p-3">The first PC it activates</td>
                      <td className="p-3">❌ No</td>
                      <td className="p-3">New builds and single PCs</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="p-3 font-semibold">Volume (MAK / KMS)</td>
                      <td className="p-3">An organization</td>
                      <td className="p-3">Within the organization</td>
                      <td className="p-3">Businesses and schools</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="p-3 font-semibold">Digital license</td>
                      <td className="p-3">Your hardware / Microsoft account</td>
                      <td className="p-3">Via Microsoft account (Retail)</td>
                      <td className="p-3">Anyone after first activation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-5">
                Want the full breakdown? Read <Link href="/blog/oem-vs-retail-windows-keys" className="text-blue-600">OEM vs Retail Windows keys</Link>.
              </p>

              <h2 id="activation-types" className="text-3xl font-bold mt-12 mb-6 text-gray-900">Online Key, Phone Key and Bind Key — What&apos;s the Difference?</h2>
              <p className="mb-5">On our store you&apos;ll see some products in several activation variants. All are genuine; they differ only in how activation happens:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Online Key</strong> — activates over the internet in seconds. The simplest option for most people.</li>
                <li><strong>Phone Key</strong> — activated through Microsoft&apos;s phone activation. Useful for offline PCs or when online activation isn&apos;t available.</li>
                <li><strong>Bind Key</strong> (Office) — links Office to your Microsoft account, so you can reinstall it any time from <em>account.microsoft.com</em> without re-entering a key.</li>
              </ul>

              <h2 id="products" className="text-3xl font-bold mt-12 mb-6 text-gray-900">Every Microsoft Product Key, Side by Side</h2>
              <p className="mb-5">The most-searched Microsoft products, what they&apos;re for and what a genuine key costs here:</p>

              <div className="not-prose overflow-x-auto mb-8">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gray-100 text-gray-900">
                    <tr>
                      <th className="text-left p-3">Product</th>
                      <th className="text-left p-3">Best for</th>
                      <th className="text-right p-3">Price</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {products.map((p) => (
                      <tr key={p.href} className="border-t border-gray-200">
                        <td className="p-3">
                          <span className="block text-xs text-gray-500 uppercase tracking-wide">{p.family}</span>
                          <Link href={p.href} className="font-semibold text-blue-600 hover:underline">{p.name}</Link>
                        </td>
                        <td className="p-3">{p.bestFor}</td>
                        <td className="p-3 text-right font-bold text-gray-900 whitespace-nowrap">{p.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Windows product keys</h3>
              <p className="mb-5">
                <strong>Windows 11 Pro</strong> is the edition most buyers should choose: it adds BitLocker drive
                encryption, Remote Desktop hosting and Hyper-V on top of Home. <strong>Windows 11 Home</strong> is
                fine for basic home use. Not sure? See{" "}
                <Link href="/blog/windows-11-home-vs-pro" className="text-blue-600">Windows 11 Home vs Pro</Link>.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Office product keys</h3>
              <p className="mb-5">
                <strong>Office 2024</strong> is the newest one-time-purchase Office, released in October 2024 and
                supported until 2029. <strong>Office 2024 Professional Plus</strong> includes Word, Excel,
                PowerPoint, Outlook, Access and OneNote; <strong>Home & Business 2024</strong> adds Outlook to the
                core apps; <strong>Home 2024</strong> covers Word, Excel, PowerPoint and OneNote.{" "}
                <strong>Office 2021</strong> is still the lowest-cost full suite, but its security updates end on
                October 13, 2026. <strong>Microsoft 365</strong> is a subscription with always-current apps and
                cloud storage. Compare the models in{" "}
                <Link href="/blog/office-2021-vs-office-365" className="text-blue-600">Office 2021 vs Office 365</Link>.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Windows Server, SQL Server, Visio, Project and Visual Studio keys</h3>
              <p className="mb-5">
                For businesses and developers: <strong>Windows Server 2025</strong> (Standard for physical or lightly
                virtualized servers, Datacenter for heavy virtualization), <strong>SQL Server 2025</strong> for
                databases, <strong>Visio 2024</strong> for diagrams, <strong>Project 2024</strong> for planning and{" "}
                <strong>Visual Studio 2022</strong> for software development. Each is a separate product key — an
                Office key doesn&apos;t activate Visio or Project.
              </p>

              <h2 id="price" className="text-3xl font-bold mt-12 mb-6 text-gray-900">Microsoft Product Key Price: What Should You Pay?</h2>
              <p className="mb-5">
                Microsoft&apos;s own Store lists <strong>Windows 11 Pro at $199.99</strong> and{" "}
                <strong>Windows 11 Home at $139</strong>. Genuine keys sold by resellers cost much less because they
                come from the secondary license market rather than Microsoft&apos;s retail channel.
              </p>
              <div className="not-prose grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="text-sm text-gray-500 mb-1">Microsoft Store list price</p>
                  <p className="font-bold text-gray-900">Windows 11 Pro — $199.99</p>
                  <p className="font-bold text-gray-900">Windows 11 Home — $139</p>
                </div>
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
                  <p className="text-sm text-sky-700 mb-1">Official Keys Hub</p>
                  <p className="font-bold text-gray-900">Windows 11 Pro — $16.99</p>
                  <p className="font-bold text-gray-900">Windows 11 Home — $12.99</p>
                </div>
              </div>
              <p className="mb-5">
                A realistic price is a fraction of retail. A price that&apos;s almost zero, a key sold with an
                &quot;activator&quot; tool, or a Microsoft 365 &quot;lifetime&quot; offer are the warning signs —
                see <a href="#red-flags" className="text-blue-600">red flags</a> below. For more on legality, read{" "}
                <Link href="/blog/is-buying-windows-keys-legal" className="text-blue-600">is buying cheap Windows keys legal?</Link>
              </p>

              <h2 id="support" className="text-3xl font-bold mt-12 mb-6 text-gray-900">Which Versions Are Still Supported in 2026?</h2>
              <p className="mb-5">
                &quot;Lifetime&quot; means a license never expires — not that Microsoft keeps patching that version
                forever. Before you buy, check the support dates:
              </p>
              <div className="not-prose overflow-x-auto mb-6">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gray-100 text-gray-900">
                    <tr>
                      <th className="text-left p-3">Product</th>
                      <th className="text-left p-3">Security updates</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-t border-gray-200"><td className="p-3 font-semibold">Windows 11</td><td className="p-3">✅ Supported (keep it on a current version)</td></tr>
                    <tr className="border-t border-gray-200"><td className="p-3 font-semibold">Windows 10</td><td className="p-3">⚠️ Ended Oct 14, 2025 — paid Extended Security Updates only</td></tr>
                    <tr className="border-t border-gray-200"><td className="p-3 font-semibold">Office 2024</td><td className="p-3">✅ Supported until 2029</td></tr>
                    <tr className="border-t border-gray-200"><td className="p-3 font-semibold">Office 2021</td><td className="p-3">⚠️ Ends Oct 13, 2026 — keeps working, no further updates</td></tr>
                    <tr className="border-t border-gray-200"><td className="p-3 font-semibold">Office 2019 / 2016</td><td className="p-3">❌ Ended Oct 14, 2025</td></tr>
                    <tr className="border-t border-gray-200"><td className="p-3 font-semibold">Microsoft 365</td><td className="p-3">✅ Always updated while subscribed</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="not-prose bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-8">
                <p className="font-bold text-yellow-900 mb-2">💡 What this means for you</p>
                <p className="text-yellow-900">
                  For a new PC, choose <strong>Windows 11</strong>. For Office, pick{" "}
                  <Link href="/products/office-2024-professional-plus" className="underline font-semibold">Office 2024</Link>{" "}
                  if you want a one-time purchase with security updates until 2029, or{" "}
                  <strong>Microsoft 365</strong> if you prefer a subscription that&apos;s always current. Office
                  2021 keeps working and stays activated, but its updates stop on October 13, 2026.
                </p>
              </div>

              <h2 id="find" className="text-3xl font-bold mt-12 mb-6 text-gray-900">How to Find Your Microsoft Product Key</h2>
              <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Windows</h3>
              <p className="mb-5">
                PCs that shipped with Windows store the key in the firmware. Open <strong>PowerShell</strong> and run:
              </p>
              <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm mb-5"><code>(Get-CimInstance -ClassName SoftwareLicensingService).OA3xOriginalProductKey</code></pre>
              <p className="mb-5">
                If nothing is returned, your PC probably uses a <strong>digital license</strong>. You don&apos;t need
                the key — Windows reactivates by itself after a reinstall on the same hardware. If you bought a key
                online, it&apos;s in your order email.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Office</h3>
              <p className="mb-5">
                For Office linked to a Microsoft account, sign in at <em>account.microsoft.com → Services &amp;
                subscriptions</em>: your account replaces the key and you can reinstall from there. Installed Office
                only shows the <strong>last 5 characters</strong> of its key, so keep your purchase email safe.
              </p>

              <h2 id="check" className="text-3xl font-bold mt-12 mb-6 text-gray-900">How to Check a Key (and Avoid &quot;Key Checker&quot; Scams)</h2>
              <p className="mb-5">
                To check the license on a PC, open Command Prompt and run{" "}
                <code className="bg-gray-100 px-2 py-0.5 rounded">slmgr /dli</code> (license details) or{" "}
                <code className="bg-gray-100 px-2 py-0.5 rounded">slmgr /xpr</code> (whether activation is
                permanent). Or open <strong>Settings → System → Activation</strong>.
              </p>
              <p className="mb-5">
                Microsoft has <strong>no public tool</strong> that validates an unused key without activating it.
                Websites that offer to &quot;check&quot; your key are a risk — pasting a key there can get it stolen
                and used on someone else&apos;s PC.
              </p>

              <h2 id="red-flags" className="text-3xl font-bold mt-12 mb-6 text-gray-900">🚩 Red Flags When Buying a Product Key</h2>
              <div className="not-prose bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-8">
                <ul className="space-y-2 text-red-900">
                  <li>✖️ <strong>&quot;Free product key&quot; lists</strong> — these are generic install keys or KMS client keys. They let Windows install but won&apos;t activate it.</li>
                  <li>✖️ <strong>Activator tools or scripts</strong> bundled with a key — that&apos;s not a license, and it&apos;s a malware risk.</li>
                  <li>✖️ <strong>&quot;Lifetime Microsoft 365&quot;</strong> — Microsoft 365 is a subscription; there&apos;s no lifetime version.</li>
                  <li>✖️ <strong>Wrong edition</strong> — a Home key won&apos;t activate Pro, and an Office key won&apos;t activate Visio.</li>
                  <li>✖️ <strong>No replacement policy or support contact</strong> — a real seller tells you what happens if a key fails.</li>
                </ul>
              </div>
              <p className="mb-5">
                More tips in{" "}
                <Link href="/blog/buy-microsoft-retail-keys-safe" className="text-blue-600">how to buy Microsoft keys safely</Link>.
              </p>

              {/* FAQ — mirrored in the FAQPage JSON-LD above */}
              <h2 id="faq" className="text-3xl font-bold mt-12 mb-6 text-gray-900">❓ Frequently Asked Questions</h2>
              <div className="not-prose space-y-4 mb-8">
                {faqs.map((f) => (
                  <details key={f.q} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <summary className="font-bold cursor-pointer text-lg text-gray-900">{f.q}</summary>
                    <p className="mt-3 text-gray-700">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get a Genuine Microsoft Product Key</h2>
            <p className="text-blue-100 text-lg mb-8">
              Instant email delivery, step-by-step activation help and a replacement guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products/windows-11-pro"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition"
              >
                Buy Windows 11 Pro — $16.99
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition"
              >
                Browse all products
              </Link>
            </div>
          </div>
        </section>

        {/* Related reading */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Related reading</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/activate-windows-11-key" className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-blue-500 transition">
                <h4 className="font-bold mb-2 text-gray-900">How to Activate a Windows 11 Key</h4>
                <p className="text-sm text-gray-600">Every activation method, step by step</p>
              </Link>
              <Link href="/blog/how-to-activate-office-2021" className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-blue-500 transition">
                <h4 className="font-bold mb-2 text-gray-900">How to Activate Office 2021</h4>
                <p className="text-sm text-gray-600">Install and activate Office the right way</p>
              </Link>
              <Link href="/blog/oem-vs-retail-windows-keys" className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-blue-500 transition">
                <h4 className="font-bold mb-2 text-gray-900">OEM vs Retail Windows Keys</h4>
                <p className="text-sm text-gray-600">Which license type you actually need</p>
              </Link>
              <Link href="/blog/office-2021-vs-office-365" className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-blue-500 transition">
                <h4 className="font-bold mb-2 text-gray-900">Office 2021 vs Office 365</h4>
                <p className="text-sm text-gray-600">One-time purchase or subscription?</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
