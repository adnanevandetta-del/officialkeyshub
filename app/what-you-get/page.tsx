import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://officialkeyshub.com/what-you-get" },
  title: "What You Get When You Buy From Us - Instant Delivery, Premium Support & Lifetime License",
  description: "Get genuine Windows & Office keys with instant email delivery, step-by-step installation guides, 24/7 premium support, lifetime license validity, and money-back guarantee. Buy with confidence.",
  keywords: "instant delivery, email delivery, installation guide, premium support, lifetime license, genuine product key, activation support, money back guarantee, retail license, OEM key, product key email, 24/7 support, authentic Microsoft key, lifetime validity, installation instructions, activation help",
  openGraph: {
    title: "What's Included With Every Purchase - Official Keys Hub",
    description: "Instant email delivery, premium 24/7 support, step-by-step guides, lifetime licenses, and genuine Microsoft keys. See what makes us different.",
    url: "https://officialkeyshub.com/what-you-get",
    type: "website",
  },
};

export default function WhatYouGetPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "What You Get" },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-20 bg-white min-h-screen">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Hero Header */}
        <section className="bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <i className="fas fa-shield-check"></i>
                100% Genuine Microsoft Licenses
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                What You Get When You Purchase From Official Keys Hub
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Every purchase includes instant email delivery, premium 24/7 support, step-by-step installation guides, 
                lifetime license validity, and our money-back guarantee. Here's everything included with your order.
              </p>
            </div>
          </div>
        </section>

        {/* Main Benefits Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  Everything Included With Every Purchase
                </h2>
                <p className="text-lg text-gray-600">
                  We don't just sell product keys — we provide complete support for your Microsoft software activation
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Instant Email Delivery */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-sky-200 hover:border-sky-400 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <i className="fas fa-envelope-open-text text-white text-2xl"></i>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">
                    Instant Email Delivery
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Receive your genuine product key via email within <strong>5-15 minutes</strong> after payment confirmation. 
                    No shipping delays, no waiting. Your license arrives directly in your inbox.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Email sent to your registered address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Product key clearly formatted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Downloadable PDF backup included</span>
                    </li>
                  </ul>
                </div>

                {/* Genuine Retail License */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <i className="fas fa-certificate text-white text-2xl"></i>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">
                    Genuine Retail License
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    100% <strong>authentic Microsoft retail licenses</strong> sourced from authorized distributors. 
                    Not pirated, not grey market. Full legal compliance with lifetime validity and Microsoft updates.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Verified genuine Microsoft keys</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Eligible for all Microsoft updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Lifetime license - never expires</span>
                    </li>
                  </ul>
                </div>

                {/* Premium 24/7 Support */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <i className="fas fa-headset text-white text-2xl"></i>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">
                    Premium 24/7 Support
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Get expert assistance anytime via <strong>WhatsApp, email, or live chat</strong>. Our support team helps with 
                    installation, activation issues, and any technical questions - completely free.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Available 24 hours a day, 7 days a week</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Fast response time (under 2 hours)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Expert activation troubleshooting</span>
                    </li>
                  </ul>
                </div>

                {/* Installation Guide */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-200 hover:border-orange-400 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <i className="fas fa-book-open text-white text-2xl"></i>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">
                    Step-by-Step Installation Guide
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Detailed <strong>installation and activation instructions</strong> included with every key. 
                    Screenshots, video tutorials, and troubleshooting tips for Windows and Office activation.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Complete activation walkthrough</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Download links to official Microsoft installers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Common error fixes included</span>
                    </li>
                  </ul>
                </div>

                {/* Money-Back Guarantee */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <i className="fas fa-shield-check text-white text-2xl"></i>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">
                    Money-Back Guarantee
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If your key doesn't activate or you're not satisfied, we offer a <strong>full refund or replacement key</strong> 
                    within 30 days. Your satisfaction is guaranteed.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>30-day money-back guarantee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Free replacement if key fails</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>No questions asked refund policy</span>
                    </li>
                  </ul>
                </div>

                {/* Activation Guarantee */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-teal-200 hover:border-teal-400 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <i className="fas fa-check-circle text-white text-2xl"></i>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">
                    Lifetime Activation Guarantee
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your license is <strong>valid for life</strong> on your device. Receive all security updates, feature updates, 
                    and Microsoft support. Transfer rights included with retail licenses.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Never expires - lifetime validity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Eligible for all Windows/Office updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>Retail keys are transferable</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Process Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">
                Your Complete Purchase Journey
              </h2>

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-black shadow-lg">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Choose Your Product</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Browse our catalog of genuine Windows, Office, and Server licenses. All products clearly show 
                      the edition, version, and license type (Retail, OEM, Online, Phone activation).
                    </p>
                    <div className="bg-sky-50 rounded-lg p-4 border border-sky-200">
                      <p className="text-sm text-gray-700">
                        <strong>Popular choices:</strong> Windows 11 Pro ($16.99), Office 2024 Pro Plus ($34.99), 
                        Windows + Office bundles (save up to 40%)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-black shadow-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure Checkout</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Complete your order using <strong>PayPal, USDT crypto, or WhatsApp payment</strong>. All transactions 
                      are secure and encrypted. Enter your email address to receive your license.
                    </p>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <p className="text-sm text-gray-700">
                        <strong>Payment methods:</strong> PayPal (instant), USDT (crypto), WhatsApp direct payment. 
                        SSL encrypted checkout for maximum security.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-black shadow-lg">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Instant Email Delivery (5-15 Minutes)</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      After payment confirmation, you'll receive an email containing your <strong>genuine product key, 
                      download links, and installation guide</strong>. Check your spam folder if you don't see it.
                    </p>
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <p className="text-sm text-gray-700">
                        <strong>Email includes:</strong> 25-character product key, Microsoft official download links, 
                        PDF installation guide, activation instructions, and our support contact.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-black shadow-lg">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Download & Install Microsoft Software</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Download Windows or Office directly from <strong>Microsoft's official servers</strong> using the links 
                      we provide. Run the installer and follow the on-screen prompts.
                    </p>
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <p className="text-sm text-gray-700">
                        <strong>Official sources only:</strong> All download links point to microsoft.com or Windows Update. 
                        No third-party downloads, no modified software.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-black shadow-lg">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Activate Your License</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Enter your product key in <strong>Settings → Activation</strong> (Windows) or during Office setup. 
                      Your software activates instantly and is fully licensed.
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-gray-700">
                        <strong>Activation methods:</strong> Online activation (most common), phone activation (offline PCs), 
                        Microsoft account binding. Full instructions included.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-black shadow-lg">
                    6
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Support Anytime</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Need help? Contact us via <strong>WhatsApp (+1 601-975-6129), email, or live chat</strong>. 
                      Our team provides free activation support, troubleshooting, and technical assistance.
                    </p>
                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                      <p className="text-sm text-gray-700">
                        <strong>We help with:</strong> Activation errors, installation issues, key not working, 
                        hardware change transfers, Office/Windows troubleshooting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">
                Why Customers Choose Official Keys Hub
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="text-4xl font-black text-sky-600 mb-2">15 min</div>
                  <p className="text-gray-700 font-semibold">Average Delivery Time</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="text-4xl font-black text-green-600 mb-2">99.8%</div>
                  <p className="text-gray-700 font-semibold">Successful Activation Rate</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="text-4xl font-black text-purple-600 mb-2">24/7</div>
                  <p className="text-gray-700 font-semibold">Customer Support Available</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="text-4xl font-black text-orange-600 mb-2">50K+</div>
                  <p className="text-gray-700 font-semibold">Happy Customers</p>
                </div>
              </div>

              <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-black text-gray-900 mb-6 text-center">
                  What Our Customers Say
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border-2 border-gray-200 rounded-xl p-6">
                    <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star text-yellow-400"></i>)}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "Received my Windows 11 Pro key in 10 minutes. Activated instantly. Best price I found anywhere!"
                    </p>
                    <p className="text-sm font-bold text-gray-900">- Michael T.</p>
                  </div>
                  <div className="border-2 border-gray-200 rounded-xl p-6">
                    <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star text-yellow-400"></i>)}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "Support team helped me activate Office 2024 on my new PC. Very responsive and helpful!"
                    </p>
                    <p className="text-sm font-bold text-gray-900">- Sarah L.</p>
                  </div>
                  <div className="border-2 border-gray-200 rounded-xl p-6">
                    <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star text-yellow-400"></i>)}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "Genuine keys at amazing prices. Used them for 3 PCs now. Highly recommended!"
                    </p>
                    <p className="text-sm font-bold text-gray-900">- David R.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                <details className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-sky-300 transition-colors group">
                  <summary className="font-bold text-gray-900 cursor-pointer flex items-center gap-3 list-none">
                    <i className="fas fa-chevron-right text-sky-600 transition-transform group-open:rotate-90"></i>
                    How quickly will I receive my product key?
                  </summary>
                  <div className="mt-4 pl-8 text-gray-700 leading-relaxed">
                    Product keys are delivered via email within 5-15 minutes after payment confirmation. Most orders are 
                    processed instantly. If you don't receive your key within 30 minutes, check your spam folder or contact 
                    our support team on WhatsApp.
                  </div>
                </details>

                <details className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-sky-300 transition-colors group">
                  <summary className="font-bold text-gray-900 cursor-pointer flex items-center gap-3 list-none">
                    <i className="fas fa-chevron-right text-sky-600 transition-transform group-open:rotate-90"></i>
                    Are these genuine Microsoft licenses?
                  </summary>
                  <div className="mt-4 pl-8 text-gray-700 leading-relaxed">
                    Yes, 100% genuine. All our product keys are authentic retail or OEM licenses sourced from authorized 
                    Microsoft distributors. They activate directly through Microsoft servers and are eligible for all 
                    official updates and support.
                  </div>
                </details>

                <details className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-sky-300 transition-colors group">
                  <summary className="font-bold text-gray-900 cursor-pointer flex items-center gap-3 list-none">
                    <i className="fas fa-chevron-right text-sky-600 transition-transform group-open:rotate-90"></i>
                    What if my key doesn't activate?
                  </summary>
                  <div className="mt-4 pl-8 text-gray-700 leading-relaxed">
                    If your key doesn't activate, contact us immediately via WhatsApp or email. We'll troubleshoot the 
                    issue or provide a replacement key within 24 hours. We also offer a full refund if you're not satisfied. 
                    Our activation success rate is 99.8%.
                  </div>
                </details>

                <details className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-sky-300 transition-colors group">
                  <summary className="font-bold text-gray-900 cursor-pointer flex items-center gap-3 list-none">
                    <i className="fas fa-chevron-right text-sky-600 transition-transform group-open:rotate-90"></i>
                    Do you provide installation instructions?
                  </summary>
                  <div className="mt-4 pl-8 text-gray-700 leading-relaxed">
                    Yes! Every order includes a detailed PDF installation guide with step-by-step instructions, screenshots, 
                    and official Microsoft download links. We also provide video tutorials and our support team is available 
                    24/7 to help with installation.
                  </div>
                </details>

                <details className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-sky-300 transition-colors group">
                  <summary className="font-bold text-gray-900 cursor-pointer flex items-center gap-3 list-none">
                    <i className="fas fa-chevron-right text-sky-600 transition-transform group-open:rotate-90"></i>
                    Is the license valid for life?
                  </summary>
                  <div className="mt-4 pl-8 text-gray-700 leading-relaxed">
                    Yes, all our licenses are lifetime licenses. Once activated, your Windows or Office license never expires. 
                    You'll continue to receive all security updates and feature updates from Microsoft. Retail licenses can 
                    also be transferred to a new PC if you upgrade your hardware.
                  </div>
                </details>

                <details className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-sky-300 transition-colors group">
                  <summary className="font-bold text-gray-900 cursor-pointer flex items-center gap-3 list-none">
                    <i className="fas fa-chevron-right text-sky-600 transition-transform group-open:rotate-90"></i>
                    What's the difference between Retail and OEM keys?
                  </summary>
                  <div className="mt-4 pl-8 text-gray-700 leading-relaxed">
                    <strong>Retail keys</strong> are transferable between PCs and include Microsoft support. 
                    <strong>OEM keys</strong> are tied to one motherboard permanently and don't include direct Microsoft 
                    support (but we provide support!). Both are genuine and lifetime licenses. OEM keys are cheaper.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                Ready to Get Your Genuine Microsoft License?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join 50,000+ satisfied customers. Instant delivery, premium support, and lifetime licenses guaranteed.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/#products"
                  className="inline-flex items-center gap-2 bg-white text-sky-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-xl"
                >
                  <i className="fas fa-shopping-cart"></i>
                  Browse Products
                </Link>
                <a
                  href="https://wa.me/16019756129?text=Hi! I have questions about purchasing a license"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition-colors shadow-xl"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                  Chat with Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
