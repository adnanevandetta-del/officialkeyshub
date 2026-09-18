import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Refund Policy & Money-Back Guarantee | Official Keys Hub",
  description:
    "Our 30-day money-back guarantee: refund eligibility, how to request one, free replacement keys, and processing times for genuine Microsoft license purchases.",
  alternates: { canonical: "https://www.officialkeyshub.com/refund-policy" },
};

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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">30-Day Money-Back Guarantee</h2>
              <p className="text-gray-700 mb-4">
                At Official Keys Hub, we stand behind the quality of every license we sell. We offer a
                30-day money-back guarantee to ensure your complete satisfaction. If your product key
                does not work and our support team cannot resolve the issue, you can request a full
                refund within 30 days of your purchase.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Eligibility for Refunds</h2>
              <p className="text-gray-700 mb-4">You are eligible for a full refund if:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>You request a refund within 30 days of your purchase date</li>
                <li>Your product key is faulty, invalid, or already used, and cannot be replaced</li>
                <li>You have not violated our Terms of Service</li>
                <li>You allow our support team a reasonable opportunity to troubleshoot the activation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Valid Reasons for Refunds</h2>
              <p className="text-gray-700 mb-4">We process refund requests for the following reasons:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Invalid Key:</strong> The product key does not activate and cannot be replaced</li>
                <li><strong>Wrong Product:</strong> You were sent a different product than the one ordered</li>
                <li><strong>Activation Issues:</strong> Persistent activation problems our support team cannot resolve</li>
                <li><strong>Non-Delivery:</strong> You did not receive your key and we are unable to deliver it</li>
                <li><strong>Accidental Purchase:</strong> You purchased the wrong product and have not yet used the key</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Non-Refundable Situations</h2>
              <p className="text-gray-700 mb-4">Refunds will NOT be issued in the following cases:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Refund request made more than 30 days after the purchase date</li>
                <li>The product key has been successfully activated and is working as described</li>
                <li>"Changed my mind" after a working key has already been redeemed or activated</li>
                <li>Buyer error, such as installing the wrong edition despite a valid, working key</li>
                <li>Fraudulent activity, key duplication, or chargeback abuse</li>
                <li>Failure to complete reasonable troubleshooting steps with our support team</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Because product keys are digital goods, a key that has been revealed and successfully
                activated is considered "used" and is generally non-refundable — the same way opened
                software cannot be returned. This does not affect your right to a replacement or refund
                if the key is faulty.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How to Request a Refund</h2>
              <p className="text-gray-700 mb-4">To request a refund, follow these steps:</p>
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
                    <li>Your order email address</li>
                    <li>Order/transaction ID</li>
                    <li>The product purchased and the activation error you received</li>
                    <li>Any relevant screenshots of the error</li>
                  </ul>
                </li>
                <li className="mb-2">
                  <strong>Troubleshooting Attempt:</strong> Our team will first help you activate the key
                  or provide a replacement key before processing a refund
                </li>
                <li className="mb-2">
                  <strong>Refund Processing:</strong> If a replacement is not possible and your request is
                  approved, your refund will be processed within 3-5 business days
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Processing Time</h2>
              <p className="text-gray-700 mb-4">Once your refund request is approved:</p>
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
                <li>PayPal: Returned to your PayPal account</li>
                <li>Credit/Debit Card (via PayPal): Returned to the original card</li>
                <li>Cryptocurrency (USDT): Refunded in USDT to a wallet you provide</li>
              </ul>
              <p className="text-gray-700 mb-4">
                We cannot process refunds to different payment methods or accounts than the original purchase.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Replacement Keys</h2>
              <p className="text-gray-700 mb-4">
                In most cases, a faulty key can be resolved instantly with a free replacement:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>If a key fails to activate, we will issue a working replacement at no cost</li>
                <li>Replacement is offered before a monetary refund whenever possible</li>
                <li>You may accept a refund instead of a replacement if you prefer</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Chargebacks and Disputes</h2>
              <p className="text-gray-700 mb-4">
                We encourage you to contact us directly before filing a chargeback with your bank or payment provider:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Most issues can be resolved instantly with a replacement key</li>
                <li>We will work with you to resolve any billing disputes</li>
                <li>Fraudulent chargebacks on delivered, working keys may result in legal action</li>
                <li>Future purchases may be restricted after a fraudulent chargeback</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Repeat Purchases</h2>
              <p className="text-gray-700 mb-4">
                Each order is treated independently:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Every new purchase has its own 30-day money-back guarantee window</li>
                <li>Repeat customers are eligible for support and refunds on each new order</li>
                <li>Abuse of the refund policy may result in future refunds being denied</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Support Before Refund</h2>
              <p className="text-gray-700 mb-4">
                Before requesting a refund for an activation issue, we recommend:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Contacting our 24/7 support team</li>
                <li>Following the steps in our <a href="/setup-guide" className="text-[#4ade80] hover:underline">Setup Guide</a> for your product</li>
                <li>Confirming your PC is connected to the internet during activation</li>
                <li>Making sure you are activating the correct edition (e.g. Windows 11 Pro vs Home)</li>
                <li>Trying phone activation (slui.exe 4) if online activation fails</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Most activation issues are resolved in minutes with the right steps or a replacement key.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Questions About Refunds</h2>
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
                  We are committed to providing genuine licenses and excellent customer support. Our
                  30-day money-back guarantee lets you buy with confidence. We will always process
                  legitimate refund and replacement requests fairly and promptly.
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
