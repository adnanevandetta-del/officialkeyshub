import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Official Keys Hub",
  description:
    "How Official Keys Hub collects, uses, and protects your personal data when you buy Microsoft software keys — your rights, cookies, and data retention.",
  alternates: { canonical: "https://www.officialkeyshub.com/privacy" },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-24 max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-gray-600">Last updated: June 5, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Official Keys Hub ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase Microsoft software licenses from us.
              </p>
              <p className="text-gray-700 mb-4">
                By using our service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">We collect the following personal information:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Email address</li>
                <li>WhatsApp phone number (if you contact us via WhatsApp)</li>
                <li>Payment information (processed securely by third-party payment processors)</li>
                <li>Username and password</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">2.2 Usage Information</h3>
              <p className="text-gray-700 mb-4">We automatically collect certain information:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Device information (type, operating system, unique device identifiers)</li>
                <li>IP address and general location</li>
                <li>Pages viewed and products browsed</li>
                <li>Website usage patterns</li>
                <li>Technical data for service optimization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Process your orders and deliver your license keys</li>
                <li>Process payments and manage your account</li>
                <li>Communicate with you about your orders and provide support</li>
                <li>Improve and optimize our website and services</li>
                <li>Prevent fraud and unauthorized access</li>
                <li>Comply with legal obligations</li>
                <li>Send promotional communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Information</h2>
              <p className="text-gray-700 mb-4">
                We take the security of your payment details seriously:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Payments are handled by trusted third-party processors (such as PayPal)</li>
                <li>We do not store your full card number, CVV, or banking credentials on our servers</li>
                <li>All transactions are encrypted using industry-standard SSL/TLS</li>
                <li>We only retain the order details needed to deliver your keys and provide support</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in service delivery (payment processors, hosting providers)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of our business</li>
                <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure server infrastructure</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication protocols</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="text-gray-700 mb-4">
                However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
              </ul>
              <p className="text-gray-700 mb-4">
                When you close your account, we may retain certain information for legal and business purposes, but will delete or anonymize it when no longer needed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4">
                Under GDPR and other applicable data protection laws, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Restriction:</strong> Limit how we use your data</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise these rights, contact us at digitalkeyhubllc@gmail.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Maintain your session and preferences</li>
                <li>Analyze service usage and performance</li>
                <li>Provide personalized content</li>
                <li>Improve user experience</li>
              </ul>
              <p className="text-gray-700 mb-4">
                You can control cookies through your browser settings. Disabling cookies may limit some features of our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our service is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and maintained on servers located outside of your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
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
