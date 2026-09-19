import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partner Program - Affiliate Marketing | Official Keys Hub",
  description: "Join our affiliate program and earn commission by promoting genuine Microsoft software keys. Competitive rates, instant payouts, and dedicated support for partners.",
  keywords: "affiliate program, partner program, earn money, affiliate marketing, microsoft keys affiliate, reseller program",
};

export default function PartnerProgramPage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-sky-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-600/20 px-4 py-2 rounded-full mb-6">
            <i className="fas fa-handshake text-sky-500"></i>
            <span className="text-sky-400 font-bold text-sm uppercase">Partner Program</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Earn Money as Our Partner
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join our affiliate program and earn up to 30% commission on every sale you refer. 
            Help businesses get genuine Microsoft software at great prices.
          </p>
          <a
            href="https://wa.me/16019756129?text=Hi! I want to join the Partner Program"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-sky-600 to-sky-700 text-white font-black text-lg rounded-xl hover:from-sky-700 hover:to-sky-800 transition-all shadow-xl hover:scale-105"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            Become a Partner Now
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Why Partner With Us?</h2>
            <p className="text-xl text-gray-600">Industry-leading benefits and support</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-gradient-to-br from-sky-50 to-green-50 rounded-2xl p-8 border-2 border-sky-200 hover:border-sky-600 transition-all">
              <div className="w-16 h-16 bg-sky-700 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-percentage text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Up to 30% Commission</h3>
              <p className="text-gray-700 leading-relaxed">
                Earn competitive commissions on every sale. The more you sell, the higher your commission rate.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-500 transition-all">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-bolt text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Instant Payouts</h3>
              <p className="text-gray-700 leading-relaxed">
                Get paid quickly via PayPal, bank transfer, or cryptocurrency. Weekly payment schedule available.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 hover:border-purple-500 transition-all">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-headset text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Dedicated Support</h3>
              <p className="text-gray-700 leading-relaxed">
                Get priority support, marketing materials, and a dedicated account manager to help you succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Tiers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Commission Structure</h2>
            <p className="text-xl text-gray-600">Earn more as you sell more</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
              <div className="text-center mb-6">
                <i className="fas fa-star text-gray-400 text-4xl mb-3"></i>
                <h3 className="text-2xl font-bold text-gray-900">Starter</h3>
                <p className="text-gray-600 mt-2">0-10 sales/month</p>
              </div>
              <div className="text-center mb-6">
                <p className="text-5xl font-black text-sky-700">15%</p>
                <p className="text-gray-600 mt-2">Commission per sale</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <i className="fas fa-check text-sky-700"></i>
                  Basic marketing materials
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <i className="fas fa-check text-sky-700"></i>
                  Email support
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <i className="fas fa-check text-sky-700"></i>
                  Monthly payouts
                </li>
              </ul>
            </div>

            {/* Professional */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-sky-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-sky-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <div className="text-center mb-6">
                <i className="fas fa-crown text-sky-700 text-4xl mb-3"></i>
                <h3 className="text-2xl font-bold text-gray-900">Professional</h3>
                <p className="text-gray-600 mt-2">11-50 sales/month</p>
              </div>
              <div className="text-center mb-6">
                <p className="text-5xl font-black text-sky-700">25%</p>
                <p className="text-gray-600 mt-2">Commission per sale</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <i className="fas fa-check text-sky-700"></i>
                  Premium marketing materials
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <i className="fas fa-check text-sky-700"></i>
                  Priority support
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <i className="fas fa-check text-sky-700"></i>
                  Weekly payouts
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <i className="fas fa-check text-sky-700"></i>
                  Custom discount codes
                </li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
              <div className="text-center mb-6">
                <i className="fas fa-rocket text-blue-600 text-4xl mb-3"></i>
                <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
                <p className="text-gray-600 mt-2">51+ sales/month</p>
              </div>
              <div className="text-center mb-6">
                <p className="text-5xl font-black text-sky-700">30%</p>
                <p className="text-gray-600 mt-2">Commission per sale</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <i className="fas fa-check text-sky-700"></i>
                  All Professional features
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <i className="fas fa-check text-sky-700"></i>
                  Dedicated account manager
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <i className="fas fa-check text-sky-700"></i>
                  Instant payouts
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <i className="fas fa-check text-sky-700"></i>
                  Custom partnership terms
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Start earning in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-sky-700 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Sign Up</h3>
              <p className="text-gray-700 leading-relaxed">
                Contact us via WhatsApp or email to join our partner program. Quick approval process.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Promote</h3>
              <p className="text-gray-700 leading-relaxed">
                Get your unique referral link and start promoting our products using our marketing materials.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Earn</h3>
              <p className="text-gray-700 leading-relaxed">
                Earn commission on every sale. Track your earnings in real-time and get paid on schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sky-700 to-sky-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <i className="fas fa-handshake text-white text-6xl mb-6"></i>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Join hundreds of partners already earning with Official Keys Hub. 
            No upfront costs, no commitment required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/16019756129?text=Hi! I want to join the Partner Program"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-sky-700 font-black text-lg rounded-xl hover:bg-sky-50 transition-all shadow-xl"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Contact Us on WhatsApp
            </a>
            <a
              href="mailto:officialkeyshub@gmail.com?subject=Partner Program Inquiry"
              className="px-8 py-4 bg-sky-800 text-white font-black text-lg rounded-xl hover:bg-sky-900 transition-all shadow-xl"
            >
              <i className="fas fa-envelope mr-2"></i>
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <i className="fas fa-question-circle text-sky-700"></i>
                Who can become a partner?
              </h3>
              <p className="text-gray-700">
                Anyone! Whether you're a blogger, influencer, business owner, or have an audience interested in Microsoft software, you can join our partner program.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <i className="fas fa-question-circle text-sky-700"></i>
                How do I track my sales and commissions?
              </h3>
              <p className="text-gray-700">
                You'll get access to a partner dashboard where you can track clicks, conversions, earnings, and payment history in real-time.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <i className="fas fa-question-circle text-sky-700"></i>
                When and how do I get paid?
              </h3>
              <p className="text-gray-700">
                Payments are processed weekly or monthly depending on your tier. We support PayPal, bank transfer, USDT, and other payment methods with a minimum payout of $100.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <i className="fas fa-question-circle text-sky-700"></i>
                Is there a cost to join?
              </h3>
              <p className="text-gray-700">
                No! Our partner program is completely free to join. There are no hidden fees or upfront costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
