import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Shipping & Delivery — Instant Digital Delivery | Official Keys Hub",
  description:
    "Every order is delivered digitally, straight to your email inbox — usually within minutes of payment. No physical shipping, no shipping fees, no waiting for a courier.",
  alternates: { canonical: "https://www.officialkeyshub.com/shipping" },
};

export default function ShippingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-24 max-w-4xl">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
              Shipping &amp; <span className="gradient-text">Delivery</span>
            </h1>
            <p className="text-gray-600">Last updated: September 26, 2026</p>
          </div>

          {/* Digital delivery callout */}
          <div className="mb-10 bg-sky-50 border-2 border-sky-500 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center text-xl">
                <i className="fas fa-envelope-open-text"></i>
              </span>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  100% Digital Delivery — straight to your email
                </h2>
                <p className="text-gray-700 mb-0">
                  Everything we sell is a genuine digital license key. There is{" "}
                  <strong>nothing physical to ship</strong>. After your payment is
                  confirmed, your product key and step-by-step activation
                  instructions are sent directly to the email address you used at
                  checkout — no courier, no tracking number, no waiting for a
                  package in the mail.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How delivery works
              </h2>
              <ol className="list-decimal pl-6 text-gray-700 mb-4">
                <li className="mb-2">
                  <strong>Place your order</strong> and complete payment (PayPal,
                  card, or USDT).
                </li>
                <li className="mb-2">
                  <strong>We email your key.</strong> Your license key and
                  activation guide are sent to your order email address — usually
                  within a few minutes.
                </li>
                <li className="mb-2">
                  <strong>Activate.</strong> Follow the included instructions (or
                  our{" "}
                  <Link href="/activation-guide" className="text-sky-600 hover:underline">
                    Activation Guide
                  </Link>
                  ) to activate your product right away.
                </li>
              </ol>
              <p className="text-gray-700 mb-4">
                If you have an account with us, your key is also saved in your{" "}
                <Link href="/orders" className="text-sky-600 hover:underline">
                  Order History
                </Link>{" "}
                so you can access it any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery time</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Most orders: instant</strong> — delivered automatically
                  within minutes of a confirmed payment.
                </li>
                <li>
                  <strong>Occasionally up to a few hours</strong> — a small number
                  of orders are held for a quick manual security check. If yours
                  takes longer than expected, it is simply being verified.
                </li>
                <li>
                  Delivery is available <strong>worldwide</strong>, 24/7 — because
                  it is digital, your location never affects delivery.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Shipping costs
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>There are no shipping fees — ever.</strong> Because your
                order is delivered by email, you never pay for postage, handling,
                customs, or courier charges. The price you see at checkout is the
                full price.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Didn&apos;t receive your email?
              </h2>
              <p className="text-gray-700 mb-4">
                Your key almost always arrives within minutes. If you don&apos;t
                see it:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  Check your <strong>Spam / Junk</strong> and{" "}
                  <strong>Promotions</strong> folders.
                </li>
                <li>
                  Confirm you entered the correct email address at checkout (a
                  typo is the most common cause).
                </li>
                <li>
                  Sign in and check your{" "}
                  <Link href="/orders" className="text-sky-600 hover:underline">
                    Order History
                  </Link>
                  .
                </li>
                <li>
                  Still nothing? Contact us and we&apos;ll resend it right away —
                  we&apos;re here 24/7.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need help?</h2>
              <ul className="list-none pl-0 text-gray-700">
                <li className="mb-2">
                  <i className="fas fa-envelope text-sky-600 mr-2"></i>
                  Email:{" "}
                  <a
                    href="mailto:officialkeyshub@gmail.com"
                    className="text-sky-600 hover:underline break-all"
                  >
                    officialkeyshub@gmail.com
                  </a>
                </li>
                <li>
                  <i className="fab fa-whatsapp text-sky-600 mr-2"></i>
                  WhatsApp:{" "}
                  <a
                    href="https://wa.me/16019756129"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 hover:underline"
                  >
                    Click the floating button for instant chat
                  </a>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                Prefer to know before you buy? See our{" "}
                <Link href="/refund-policy" className="text-sky-600 hover:underline">
                  Refund Policy
                </Link>{" "}
                and{" "}
                <Link href="/faq" className="text-sky-600 hover:underline">
                  FAQ
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
