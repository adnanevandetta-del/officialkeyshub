import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RefundPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-24 max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
              Refund <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-gray-600">Last updated: June 5, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14-Day Money-Back Guarantee</h2>
              <p className="text-gray-700 mb-4">
                At Best IPTV SE, we stand behind the quality of our service. We offer a 14-day money-back guarantee to ensure your complete satisfaction. If you're not happy with our service for any reason, you can request a full refund within 14 days of your purchase.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Eligibility for Refunds</h2>
              <p className="text-gray-700 mb-4">
                You are eligible for a full refund if:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>You request a refund within 14 days of your initial purchase date</li>
                <li>You have not violated our Terms of Service</li>
                <li>You provide a valid reason for the refund request</li>
                <li>Your account has not been suspended or terminated for policy violations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Valid Reasons for Refunds</h2>
              <p className="text-gray-700 mb-4">
                We process refund requests for the following reasons:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Technical Issues:</strong> Persistent streaming problems that our support team cannot resolve</li>
                <li><strong>Service Quality:</strong> Significant quality issues with channels or content</li>
                <li><strong>Compatibility Problems:</strong> Service doesn't work on your device despite meeting requirements</li>
                <li><strong>Dissatisfaction:</strong> The service doesn't meet your expectations</li>
                <li><strong>Accidental Purchase:</strong> You purchased the wrong subscription plan</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Non-Refundable Situations</h2>
              <p className="text-gray-700 mb-4">
                Refunds will NOT be issued in the following cases:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Refund request made after 14 days from purchase date</li>
                <li>Account suspension or termination due to Terms of Service violations</li>
                <li>Account sharing or reselling detected</li>
                <li>Fraudulent activity or chargeback abuse</li>
                <li>Issues caused by your internet service provider or network</li>
                <li>Lack of usage or "changed my mind" after 14 days</li>
                <li>Content availability changes (third-party content)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How to Request a Refund</h2>
              <p className="text-gray-700 mb-4">
                To request a refund, follow these steps:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 mb-4">
                <li className="mb-2">
                  <strong>Contact Support:</strong> Reach out to our support team via:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Email: digitalkeyhubllc@gmail.com</li>
                    <li>WhatsApp: Click the floating WhatsApp button</li>
                  </ul>
                </li>
                <li className="mb-2">
                  <strong>Provide Information:</strong> Include the following details:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Your account email address</li>
                    <li>Order/transaction ID</li>
                    <li>Reason for refund request</li>
                    <li>Any relevant screenshots or details</li>
                  </ul>
                </li>
                <li className="mb-2">
                  <strong>Troubleshooting Attempt:</strong> Our team may ask you to try basic troubleshooting steps to resolve technical issues before processing the refund
                </li>
                <li className="mb-2">
                  <strong>Refund Processing:</strong> If approved, your refund will be processed within 3-5 business days
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Processing Time</h2>
              <p className="text-gray-700 mb-4">
                Once your refund request is approved:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Review Time:</strong> 1-2 business days to review your request</li>
                <li><strong>Processing Time:</strong> 3-5 business days to process the refund</li>
                <li><strong>Bank/Payment Provider:</strong> 5-10 business days for funds to appear in your account (varies by payment method)</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Total refund time: Approximately 7-15 business days from approval to funds in your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Refund Method</h2>
              <p className="text-gray-700 mb-4">
                Refunds are issued using the same payment method used for the original purchase:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Credit/Debit Card refunds: Returned to the original card</li>
                <li>PayPal: Returned to your PayPal account</li>
                <li>Bank Transfer: Requires your bank account details</li>
              </ul>
              <p className="text-gray-700 mb-4">
                We cannot process refunds to different payment methods or accounts than the original purchase.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Partial Refunds</h2>
              <p className="text-gray-700 mb-4">
                We do not offer partial refunds or pro-rated refunds for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Unused portion of your subscription</li>
                <li>Early cancellation after 14 days</li>
                <li>Service downgrades or plan changes</li>
              </ul>
              <p className="text-gray-700 mb-4">
                All refunds are for the full subscription amount paid, and are only available within the 14-day guarantee period.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Account Access After Refund</h2>
              <p className="text-gray-700 mb-4">
                Once a refund is issued:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Your account will be immediately deactivated</li>
                <li>You will lose access to all service features</li>
                <li>Your login credentials will no longer work</li>
                <li>Any saved preferences or settings will be deleted</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Chargebacks and Disputes</h2>
              <p className="text-gray-700 mb-4">
                We encourage you to contact us directly before filing a chargeback with your bank or payment provider:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Chargebacks may result in immediate account termination</li>
                <li>We will work with you to resolve any billing disputes</li>
                <li>Fraudulent chargebacks may result in legal action</li>
                <li>Future purchases may be restricted after a chargeback</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Free Trials and Refunds</h2>
              <p className="text-gray-700 mb-4">
                If you used a free trial before purchasing:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Free trials are not eligible for refunds (no payment made)</li>
                <li>Paid subscriptions after free trials follow the standard 14-day refund policy</li>
                <li>Trial period is not included in the 14-day refund window</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Subscription Renewals</h2>
              <p className="text-gray-700 mb-4">
                Our subscriptions do not auto-renew, so there are no accidental renewals. However:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Each new subscription purchase has its own 14-day refund window</li>
                <li>Repeat customers are eligible for refunds on each new purchase</li>
                <li>Abuse of refund policy may result in future refunds being denied</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Technical Support Before Refund</h2>
              <p className="text-gray-700 mb-4">
                Before requesting a refund for technical issues, we recommend:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Contacting our 24/7 support team</li>
                <li>Following our setup guides for your device</li>
                <li>Trying the recommended stream format (MPEGTS)</li>
                <li>Checking your internet connection speed (minimum 10 Mbps)</li>
                <li>Testing on different devices if available</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Many issues can be resolved quickly with proper setup and configuration.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Questions About Refunds</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about our refund policy or need assistance with a refund request:
              </p>
              <ul className="list-none pl-0 text-gray-700">
                <li className="mb-2">
                  <i className="fas fa-envelope text-[#4ade80] mr-2"></i>
                  Email: digitalkeyhubllc@gmail.com
                </li>
                <li>
                  <i className="fab fa-whatsapp text-[#4ade80] mr-2"></i>
                  WhatsApp: Click the floating button for instant chat
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                Our support team is available 24/7 to assist you with any concerns or questions.
              </p>
            </section>

            <section className="mb-8">
              <div className="bg-[#4ade80]/10 border-2 border-[#4ade80] rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <i className="fas fa-shield-alt text-[#4ade80] mr-2"></i>
                  Our Commitment
                </h3>
                <p className="text-gray-700 mb-0">
                  We are committed to providing excellent service and customer satisfaction. Our 14-day money-back guarantee ensures you can try our service risk-free. We will always process legitimate refund requests fairly and promptly.
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
