import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Licensing & Authenticity | Official Keys Hub",
  description:
    "How Official Keys Hub sells genuine Microsoft product keys legally: the EU resale rights that make it lawful, how to verify a key's authenticity yourself through Microsoft, and our genuine-or-your-money-back guarantee.",
  alternates: { canonical: "https://www.officialkeyshub.com/licensing" },
  openGraph: {
    title: "Licensing & Authenticity | Official Keys Hub",
    description:
      "Genuine keys, sold legally under EU resale rights. Verify authenticity through Microsoft, backed by a 30-day money-back guarantee.",
  },
};

export default function LicensingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-24 max-w-4xl">
          {/* Header */}
          <div className="mb-10">
            <nav className="text-sm text-gray-500 mb-4">
              <a href="/" className="hover:text-sky-600">Home</a>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-semibold">Licensing &amp; Authenticity</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
              Licensing &amp; <span className="gradient-text">Authenticity</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl">
              Every key we sell is genuine and activates through Microsoft&rsquo;s own servers. Here is
              exactly why our licenses are legitimate, how you can verify authenticity yourself, and the
              guarantee that protects every purchase.
            </p>
          </div>

          {/* Trust strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {[
              { icon: "fas fa-certificate", label: "Genuine Licenses" },
              { icon: "fas fa-scale-balanced", label: "Legally Resold (EU)" },
              { icon: "fas fa-rotate-left", label: "30-Day Money Back" },
              { icon: "fas fa-bolt", label: "Instant Delivery" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex flex-col items-center text-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-5"
              >
                <i className={`${b.icon} text-2xl text-[#16a34a]`}></i>
                <span className="text-gray-800 text-sm font-semibold">{b.label}</span>
              </div>
            ))}
          </div>

          <div className="prose prose-lg max-w-none">
            {/* What we sell */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What We Actually Sell</h2>
              <p className="text-gray-700 mb-4">
                Official Keys Hub is an independent software reseller. We supply <strong>genuine Microsoft
                product keys</strong> — for Windows, Office, Windows Server and related products — that
                activate directly with Microsoft and receive official updates like any other genuine
                license. We describe every product honestly, including its edition and license type, so you
                always know exactly what you are buying before you pay.
              </p>
              <p className="text-gray-700 mb-4">
                We are <strong>not</strong> Microsoft, and we do not claim to be an official Microsoft store
                or a Microsoft-endorsed partner. What we offer is genuine licenses at a fair price, sold
                lawfully — and the transparency to prove it.
              </p>
            </section>

            {/* Legal basis */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Why Reselling Genuine Keys Is Legal</h2>
              <p className="text-gray-700 mb-4">
                Our business is based in Stockholm, Sweden and operates under European Union law. Under the
                EU principle of <strong>&ldquo;exhaustion of rights&rdquo;</strong>, once a software license
                has been sold within the European Economic Area with the rightsholder&rsquo;s consent, that
                license can be legally resold to another buyer.
              </p>
              <p className="text-gray-700 mb-4">
                This was confirmed by the Court of Justice of the European Union in the landmark ruling
                <strong> UsedSoft GmbH v. Oracle International Corp. (Case C-128/11, 2012)</strong>, which
                established that the resale of &ldquo;used&rdquo; software licenses is lawful, even for
                downloaded software delivered without a physical disc. It is the same legal principle that
                lets you resell a book, a car, or any product you legitimately own.
              </p>
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 mb-4">
                <p className="text-gray-700 mb-0">
                  <i className="fas fa-circle-info text-sky-600 mr-2"></i>
                  In short: we deal only in genuine, legitimately-sourced licenses, and EU law expressly
                  permits their resale. That is the entire basis of our business — no counterfeits, no
                  cracks, no &ldquo;pirated&rdquo; software.
                </p>
              </div>
            </section>

            {/* Verify yourself */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Verify Authenticity Yourself</h2>
              <p className="text-gray-700 mb-4">
                You never have to take our word for it — a genuine key proves itself through Microsoft.
                After activating, you can confirm your license is authentic in seconds:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li className="mb-2">
                  <strong>Windows:</strong> open <em>Settings &rarr; System &rarr; Activation</em>. A genuine,
                  active license shows <em>&ldquo;Windows is activated with a digital license&rdquo;</em> or
                  <em> &ldquo;with a product key.&rdquo;</em>
                </li>
                <li className="mb-2">
                  <strong>Command check:</strong> press <em>Win + R</em>, run
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded mx-1">slmgr /xpr</code> to confirm the
                  license status, or <code className="bg-gray-100 px-1.5 py-0.5 rounded mx-1">slmgr /dli</code>
                  for license details.
                </li>
                <li className="mb-2">
                  <strong>Office:</strong> open any Office app &rarr; <em>File &rarr; Account</em>. A genuine
                  license shows the product as activated under your account.
                </li>
                <li className="mb-2">
                  <strong>It activates with Microsoft directly</strong> — not through us, not through any
                  third-party tool. If it activates on Microsoft&rsquo;s servers, it is genuine.
                </li>
              </ul>
            </section>

            {/* Guarantee */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Genuine — Or Your Money Back</h2>
              <p className="text-gray-700 mb-4">
                Every order is protected by our <strong>30-day money-back guarantee</strong>. If a key does
                not activate and our support team cannot resolve it or provide a working replacement, you
                get a full refund. Buy with confidence:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Activates or it&rsquo;s free:</strong> a faulty key is replaced at no cost, or fully refunded.</li>
                <li><strong>30-day window:</strong> a full month to activate and confirm everything works.</li>
                <li><strong>Free replacements first:</strong> most activation issues are fixed in minutes with the right steps or a new key.</li>
                <li><strong>Refunded to your original payment method:</strong> PayPal, card (via PayPal), or USDT.</li>
              </ul>
              <p className="text-gray-700 mb-4">
                See the full terms on our{" "}
                <a href="/refund-policy" className="text-[#16a34a] font-semibold hover:underline">Refund Policy</a>{" "}
                page.
              </p>
            </section>

            {/* Delivery & support */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Instant Delivery &amp; 24/7 Support</h2>
              <p className="text-gray-700 mb-4">
                Your key is delivered instantly after payment, along with clear step-by-step activation
                instructions. If you ever get stuck, our support team is available around the clock to walk
                you through activation or issue a replacement — by email at{" "}
                <a href="mailto:digitalkeyhubllc@gmail.com" className="text-[#16a34a] font-semibold hover:underline">digitalkeyhubllc@gmail.com</a>{" "}
                or on{" "}
                <a href="https://wa.me/16019756129" target="_blank" rel="noopener noreferrer" className="text-[#16a34a] font-semibold hover:underline">WhatsApp</a>.
              </p>
            </section>

            {/* Trademark disclaimer */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Trademark &amp; Independence Notice</h2>
              <p className="text-gray-700 mb-4">
                Official Keys Hub is an independent reseller and is <strong>not affiliated with, authorized
                by, sponsored by, or endorsed by Microsoft Corporation</strong>. Microsoft, Windows, Office,
                and related names, logos and product names are trademarks of Microsoft Corporation. We
                reference them only to describe the genuine products we resell. All product names, logos and
                brands are the property of their respective owners.
              </p>
            </section>

            {/* Commitment callout */}
            <section className="mb-8">
              <div className="bg-[#16a34a]/10 border-2 border-[#16a34a] rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <i className="fas fa-shield-halved text-[#16a34a] mr-2"></i>
                  Our Authenticity Promise
                </h3>
                <p className="text-gray-700 mb-0">
                  We only sell genuine, legitimately-sourced licenses that activate through Microsoft&rsquo;s
                  own servers, we sell them lawfully under EU resale rights, and we back every purchase with
                  a 30-day money-back guarantee. If it doesn&rsquo;t activate, you don&rsquo;t pay. That is
                  our commitment to every customer.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
