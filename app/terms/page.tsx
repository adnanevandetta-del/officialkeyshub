import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
                By accessing and using Best IPTV SE ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-700 mb-4">
                Best IPTV SE provides IPTV streaming services that allow subscribers to access television content via internet protocol. Our service includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Access to 30,000+ live TV channels</li>
                <li>190,000+ movies and TV shows on demand</li>
                <li>4K, FHD, and HD streaming quality</li>
                <li>Electronic Program Guide (EPG)</li>
                <li>Catch-up TV service</li>
                <li>Multi-device support</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Obligations</h2>
              <p className="text-gray-700 mb-4">By using our service, you agree to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Use the service for personal, non-commercial purposes only</li>
                <li>Not share your account credentials with third parties</li>
                <li>Not resell or redistribute our service</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not use the service to engage in any illegal activities</li>
                <li>Maintain the confidentiality of your login information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Account Registration and Payment</h2>
              <p className="text-gray-700 mb-4">
                To access our service, you must create an account and pay the applicable subscription fee. Payment terms:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>One-time payment for the selected subscription period</li>
                <li>No automatic renewal or recurring charges</li>
                <li>All prices are in Swedish Krona (SEK)</li>
                <li>Subscription activates immediately upon payment confirmation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Service Availability</h2>
              <p className="text-gray-700 mb-4">
                While we strive to maintain 99.9% uptime, we do not guarantee uninterrupted service. The service may be temporarily unavailable due to:
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
                Best IPTV SE acts as a service provider and does not create, own, or control the content streamed through our platform. We are not responsible for the accuracy, quality, or legality of third-party content. Users are responsible for ensuring their use of the service complies with local laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Termination</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to suspend or terminate your account at any time if:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>You violate these Terms of Service</li>
                <li>You engage in fraudulent activities</li>
                <li>You share your account with unauthorized users</li>
                <li>You attempt to resell our service</li>
                <li>We are required to do so by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Refund Policy</h2>
              <p className="text-gray-700 mb-4">
                We offer a 14-day money-back guarantee from the date of purchase. For full refund policy details, please see our <a href="/refund-policy" className="text-[#4ade80] hover:underline">Refund Policy</a> page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                Best IPTV SE shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service. Our total liability shall not exceed the amount you paid for the service.
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
                These Terms of Service shall be governed by and construed in accordance with the laws of Sweden, without regard to its conflict of law provisions.
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
                  Email: digitalkeyhubllc@gmail.com
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
