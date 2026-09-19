import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Official Keys Hub",
  description:
    "The terms governing your use of Official Keys Hub and the purchase of genuine Microsoft software licenses — orders, delivery, refunds, and acceptable use.",
  alternates: { canonical: "https://www.officialkeyshub.com/terms" },
};

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-24 max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-gray-600">Last updated: June 5, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Official Keys Hub ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our website or purchase our products.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-700 mb-4">
                Official Keys Hub is an independent reseller of genuine Microsoft software licenses. We provide product keys and digital downloads, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Windows 11 and Windows 10 product keys (Home, Pro, Enterprise)</li>
                <li>Microsoft Office 2021, 2019, and Microsoft 365 licenses</li>
                <li>Windows Server, SQL Server, Visio, and Project licenses</li>
                <li>Visual Studio and third-party security software keys</li>
                <li>Instant email delivery of your license key after purchase</li>
                <li>Activation support for all products we sell</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Obligations</h2>
              <p className="text-gray-700 mb-4">By using our service, you agree to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Use each license key in accordance with Microsoft's applicable licensing terms</li>
                <li>Provide accurate contact and payment information at checkout</li>
                <li>Not attempt to fraudulently reproduce, duplicate, or resell purchased keys as your own</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not use our website to engage in any illegal or fraudulent activities</li>
                <li>Keep the license keys delivered to you confidential</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Account Registration and Payment</h2>
              <p className="text-gray-700 mb-4">
                To purchase from us, you provide your order and payment details at checkout. Payment terms:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>One-time payment per license purchased</li>
                <li>No automatic renewal or recurring charges</li>
                <li>All prices are in US Dollars (USD)</li>
                <li>Your license key is delivered by email once payment is confirmed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Service Availability</h2>
              <p className="text-gray-700 mb-4">
                While we strive to keep our website and order delivery available at all times, we do not guarantee uninterrupted access. Our website may be temporarily unavailable due to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Scheduled maintenance</li>
                <li>Technical issues beyond our control</li>
                <li>Internet service provider problems</li>
                <li>Force majeure events</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Content Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                Official Keys Hub is an independent reseller and is not affiliated with, endorsed by, or sponsored by Microsoft Corporation. Windows, Office, and other product names are trademarks of their respective owners and are used for identification purposes only. We source genuine keys through legitimate channels; customers are responsible for using each license in accordance with the software publisher's terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Termination</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to suspend or terminate your account at any time if:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>You violate these Terms of Service</li>
                <li>You engage in fraudulent activities or payment fraud</li>
                <li>You initiate abusive or fraudulent chargebacks</li>
                <li>You attempt to fraudulently duplicate or resell purchased keys</li>
                <li>We are required to do so by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Refund Policy</h2>
              <p className="text-gray-700 mb-4">
                We offer a 30-day money-back guarantee on eligible orders from the date of purchase. For full refund policy details, please see our <a href="/refund-policy" className="text-[#4ade80] hover:underline">Refund Policy</a> page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                Official Keys Hub shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our products or website. Our total liability shall not exceed the amount you paid for the product in question.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Continued use of the service after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none pl-0 text-gray-700">
                <li className="mb-2">
                  <i className="fas fa-envelope text-[#4ade80] mr-2"></i>
                  Email: officialkeyshub@gmail.com
                </li>
                <li>
                  <i className="fab fa-whatsapp text-[#4ade80] mr-2"></i>
                  WhatsApp: Available via floating button
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
