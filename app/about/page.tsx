import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Official Keys Hub — Genuine Software Resale",
  description:
    "Official Keys Hub is an independent reseller of genuine Windows, Office, and Server licenses, sold legally under EU resale rights with instant delivery and a 30-day money-back guarantee.",
  keywords:
    "genuine windows keys, independent software reseller, legitimate microsoft keys, cheap office keys, EU software resale, genuine license reseller",
  openGraph: {
    title: "About Official Keys Hub",
    description:
      "Independent reseller of genuine Microsoft licenses. Sold legally, delivered instantly, backed by a 30-day money-back guarantee.",
    url: "https://www.officialkeyshub.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-20 bg-white min-h-screen">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-sky-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block mb-4">
                  <span className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                    Independent Reseller · Genuine Licenses
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                  Your Trusted Source for
                  <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-700">
                    Genuine Microsoft Licenses
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  Official Keys Hub is an independent reseller of genuine Windows, Office, and Server product keys — sold legally, delivered instantly, and backed by a 30-day money-back guarantee.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-100 text-center">
                  <div className="text-4xl font-extrabold text-blue-600 mb-2">10K+</div>
                  <div className="text-gray-700 font-semibold">Happy Customers</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-sky-100 text-center">
                  <div className="text-4xl font-extrabold text-sky-700 mb-2">4+</div>
                  <div className="text-gray-700 font-semibold">Years in Business</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-100 text-center">
                  <div className="text-4xl font-extrabold text-purple-600 mb-2">100%</div>
                  <div className="text-gray-700 font-semibold">Genuine Keys</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-orange-100 text-center">
                  <div className="text-4xl font-extrabold text-orange-600 mb-2">24/7</div>
                  <div className="text-gray-700 font-semibold">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-gray-900 text-center">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Founded in <strong>2022</strong>, Official Keys Hub started as a small indie retail operation with a straightforward mission: to make genuine Microsoft software accessible and affordable for everyone. We&rsquo;re not a large corporation or mega-retailer — we&rsquo;re a focused, customer-first team dedicated to providing authentic software licenses at honest prices.
                </p>
                <p>
                  As an <strong>independent reseller</strong>, we source genuine product keys through legitimate channels — including surplus and previously-sold licenses that can be lawfully resold within the EU. This lets us offer authentic keys at competitive rates and pass those savings directly to our customers, with discounts of up to <strong>90% off Microsoft&rsquo;s retail prices</strong>.
                </p>
                <p>
                  What makes us different? <strong>We&rsquo;re real people who genuinely care about your experience.</strong> Over the past 4+ years, we&rsquo;ve personally helped thousands of customers across 120+ countries activate their Windows and Office installations affordably. Every customer inquiry gets our direct attention, and we take pride in solving problems quickly and professionally.
                </p>
                <p>
                  As a <strong>registered independent business</strong>, we operate with full transparency and legal compliance. Every key we sell is <strong>100% genuine, legally sourced, and backed by our personal commitment and 30-day money-back guarantee</strong>. Each one activates directly through Microsoft&rsquo;s own servers — the ultimate proof of authenticity.
                </p>
                <p>
                  <strong>Customer satisfaction is our top priority.</strong> Unlike large companies where you&rsquo;re just a number, we treat every customer as a valued partner. We respond within minutes (not days), we provide clear instructions, and we stand behind every sale. If something goes wrong, we make it right — immediately. That&rsquo;s our promise as an independent retailer who depends on your trust and repeat business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Operate */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 text-center">
                How We Operate
              </h2>
              <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
                We&rsquo;re an independent business — not a Microsoft partner or an official Microsoft store. Here is exactly how we keep every sale genuine and legitimate.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Genuine Licenses */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-blue-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-certificate text-blue-600 text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Genuine Licenses</h3>
                      <p className="text-blue-600 font-semibold">Activate with Microsoft</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Every key we sell is a genuine Microsoft license that activates on Microsoft&rsquo;s own servers and receives official updates. We describe each product honestly — including its edition and license type — so you always know exactly what you&rsquo;re buying.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                      <span>Activates directly through Microsoft</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                      <span>Receives genuine updates like any license</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                      <span>No cracks, no pirated software — ever</span>
                    </li>
                  </ul>
                </div>

                {/* Registered EU Business */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-sky-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-building text-sky-700 text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Registered EU Business</h3>
                      <p className="text-sky-700 font-semibold">Based in Sweden</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We&rsquo;re a registered business operating from Stockholm, Sweden, under European Union law. We keep proper business records and comply with EU consumer-protection and data-protection rules.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-sky-700 mt-1"></i>
                      <span>Business entity registered in Sweden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-sky-700 mt-1"></i>
                      <span>Operates under EU consumer law</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-sky-700 mt-1"></i>
                      <span>GDPR-compliant data handling</span>
                    </li>
                  </ul>
                </div>

                {/* Legitimately Sourced */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-purple-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-box-open text-purple-600 text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Legitimately Sourced</h3>
                      <p className="text-purple-600 font-semibold">Legal Supply Only</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We source keys only through legitimate channels — including genuine, previously-sold licenses that can be lawfully resold within the EU. This keeps prices low without ever compromising on authenticity.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-purple-600 mt-1"></i>
                      <span>Genuine, legally-sourced licenses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-purple-600 mt-1"></i>
                      <span>Lawful EU resale (exhaustion of rights)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-purple-600 mt-1"></i>
                      <span>Each key verified to activate</span>
                    </li>
                  </ul>
                </div>

                {/* Legal Compliance */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-orange-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-gavel text-orange-600 text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Legal Compliance</h3>
                      <p className="text-orange-600 font-semibold">EU Resale Rights</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Reselling genuine licenses is lawful under EU law — confirmed by the Court of Justice of the EU in <strong>UsedSoft v. Oracle (Case C-128/11)</strong>. We operate in full compliance with those rules.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-orange-600 mt-1"></i>
                      <span>EU law compliant (UsedSoft ruling)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-orange-600 mt-1"></i>
                      <span>Honest, transparent product descriptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-orange-600 mt-1"></i>
                      <span>GDPR data protection</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Independence Notice */}
              <div className="mt-12 bg-gradient-to-r from-blue-50 to-sky-50 border-2 border-blue-200 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-circle-info text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Independent &amp; Transparent</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Official Keys Hub is an independent reseller and is <strong>not affiliated with, authorized by, sponsored by, or endorsed by Microsoft Corporation</strong>. Microsoft, Windows, and Office are trademarks of Microsoft Corporation, referenced only to describe the genuine products we resell. Read more on our{" "}
                      <Link href="/licensing" className="text-blue-600 font-semibold hover:underline">Licensing &amp; Authenticity</Link>{" "}page.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-white px-4 py-2 rounded-lg border border-blue-200">
                        <i className="fas fa-check text-blue-600 mr-2"></i>
                        <span className="text-sm font-semibold text-gray-800">Registered EU Business</span>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg border border-blue-200">
                        <i className="fas fa-check text-blue-600 mr-2"></i>
                        <span className="text-sm font-semibold text-gray-800">Genuine Licenses</span>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg border border-blue-200">
                        <i className="fas fa-check text-blue-600 mr-2"></i>
                        <span className="text-sm font-semibold text-gray-800">Lawful EU Resale</span>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg border border-blue-200">
                        <i className="fas fa-check text-blue-600 mr-2"></i>
                        <span className="text-sm font-semibold text-gray-800">30-Day Money Back</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">
                Why Choose Official Keys Hub?
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-badge-check text-blue-600 text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">100% Genuine Keys</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Every key is authentic and activates through Microsoft&rsquo;s own servers. No pirated or illegal software — ever.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-bolt text-sky-700 text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Delivery</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Automated delivery system sends your product key within 5 minutes of purchase confirmation. No waiting, no delays.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-shield-check text-purple-600 text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Genuine Guarantee</h3>
                  <p className="text-gray-600 leading-relaxed">
                    If a key doesn&rsquo;t activate, we provide a free replacement or a full refund. Your purchase is always protected.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-tags text-orange-600 text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Up to 90% Savings</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Legitimate sourcing means we pay less and pass the savings to you. Same genuine software, a fraction of the price.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-headset text-pink-600 text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Expert support team available around the clock via WhatsApp and email. We&rsquo;re here whenever you need help.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-undo text-cyan-600 text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">30-Day Refunds</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Not satisfied? Get a full refund within 30 days if we can&rsquo;t get your key working. Your satisfaction is guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="py-16 bg-gradient-to-br from-sky-50 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-gray-900 text-center">Our Commitment to You</h2>

              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-sky-200">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-sky-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-check text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Transparency</h3>
                      <p className="text-gray-700">
                        We&rsquo;re upfront about what you&rsquo;re buying. All keys are clearly labeled (OEM, Retail, etc.) and we explain exactly what you get.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-sky-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-check text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Authenticity</h3>
                      <p className="text-gray-700">
                        Every single product key comes from legitimate sources and activates with Microsoft. We never compromise on authenticity.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-sky-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-check text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Independent &amp; Personal Service</h3>
                      <p className="text-gray-700">
                        As an indie retailer, we provide direct, personal attention to every customer. You&rsquo;re not just a transaction number — we genuinely care about your satisfaction and stand behind every sale personally.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-sky-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-check text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy &amp; Security</h3>
                      <p className="text-gray-700">
                        We protect your personal information with strong encryption. Your data is never shared or sold to third parties.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-sky-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-check text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Continuous Improvement</h3>
                      <p className="text-gray-700">
                        We listen to customer feedback and constantly improve our service, delivery speed, and support quality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-gray-900 text-center">Company Information</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="fas fa-building text-blue-600"></i>
                    Business Details
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Company Name:</strong> Digital Key Hub LLC</p>
                    <p><strong>Founded:</strong> 2022</p>
                    <p><strong>Registration:</strong> Sweden (EU)</p>
                    <p><strong>Business Type:</strong> Independent Software Reseller</p>
                    <p><strong>Affiliation:</strong> Independent — not a Microsoft partner</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-sky-700"></i>
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Email:</strong> digitalkeyhubllc@gmail.com</p>
                    <p><strong>WhatsApp:</strong> +1 (601) 975-6129</p>
                    <p><strong>Support Hours:</strong> 24/7 Available</p>
                    <p><strong>Response Time:</strong> Within 30 minutes</p>
                    <p><strong>Website:</strong> officialkeyshub.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-8 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Our Global Reach</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">120+</div>
                    <div className="text-gray-700 text-sm">Countries Served</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-sky-700">10K+</div>
                    <div className="text-gray-700 text-sm">Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">25K+</div>
                    <div className="text-gray-700 text-sm">Licenses Sold</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600">4.8★</div>
                    <div className="text-gray-700 text-sm">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-sky-700">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Join thousands of satisfied customers who trust us for genuine Microsoft software licenses
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-xl text-lg"
                >
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Browse Products
                </Link>
                <Link
                  href="/faq"
                  className="px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-all shadow-xl text-lg"
                >
                  <i className="fas fa-question-circle mr-2"></i>
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
