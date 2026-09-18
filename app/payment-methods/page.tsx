import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";

export const metadata: Metadata = {
  title: "Payment Methods - Official Keys Hub",
  description: "Multiple secure payment options available: PayPal, Stripe, Credit Cards (Visa, Mastercard), and Cryptocurrency (USDT). Safe and encrypted transactions.",
  keywords: "payment methods, paypal, stripe, visa, mastercard, usdt payment, cryptocurrency, secure payment, buy software keys",
};

export default function PaymentMethodsPage() {
  const paymentMethods = [
    {
      id: "paypal",
      name: "PayPal",
      description: "Fast, secure, and trusted worldwide payment solution",
      icon: "fab fa-paypal",
      color: "blue",
      features: [
        "Instant payment processing",
        "Buyer protection included",
        "No credit card required",
        "Available in 200+ countries",
        "Refund support available"
      ],
      howTo: [
        "Select your product and proceed to checkout",
        "Choose PayPal as your payment method",
        "Log in to your PayPal account",
        "Review and confirm the payment",
        "Receive your product key instantly via email"
      ]
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Credit & debit card payments powered by Stripe",
      icon: "fab fa-stripe",
      color: "purple",
      features: [
        "Accepts all major credit cards",
        "Bank-level security (PCI compliant)",
        "3D Secure authentication",
        "Instant payment confirmation",
        "Encrypted transaction processing"
      ],
      howTo: [
        "Add products to your cart",
        "Proceed to secure checkout",
        "Enter your card details (Visa, Mastercard, etc.)",
        "Complete 3D Secure verification if required",
        "Get instant email with your license key"
      ],
      cards: ["Visa", "Mastercard", "American Express", "Discover"]
    },
    {
      id: "cards",
      name: "Credit & Debit Cards",
      description: "Visa, Mastercard, and other major cards accepted",
      icon: "fas fa-credit-card",
      color: "sky",
      features: [
        "Visa and Mastercard accepted",
        "Secure SSL encryption",
        "No additional fees",
        "Instant authorization",
        "Safe and reliable processing"
      ],
      howTo: [
        "Select your desired product",
        "Click 'Buy Now' or 'Add to Cart'",
        "Enter your card information securely",
        "Verify the transaction with your bank",
        "Receive your key immediately after payment"
      ]
    },
    {
      id: "usdt",
      name: "USDT (Cryptocurrency)",
      description: "Pay with Tether (USDT) for fast crypto transactions",
      icon: "fab fa-bitcoin",
      color: "orange",
      features: [
        "Low transaction fees",
        "Fast blockchain confirmation",
        "Anonymous payment option",
        "No chargebacks",
        "Global accessibility"
      ],
      howTo: [
        "Select USDT as payment method at checkout",
        "Copy the wallet address or scan QR code",
        "Send exact USDT amount from your wallet",
        "Wait for blockchain confirmation (2-5 minutes)",
        "Your license key will be sent after confirmation"
      ],
      note: "We accept USDT on TRC20 network. Please ensure you're sending to the correct network to avoid loss of funds."
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; badge: string; glow: string }> = {
      blue: {
        bg: "from-blue-50 to-blue-100",
        border: "border-blue-300",
        text: "text-blue-700",
        badge: "bg-blue-500",
        glow: "shadow-blue-500/50"
      },
      purple: {
        bg: "from-purple-50 to-purple-100",
        border: "border-purple-300",
        text: "text-purple-700",
        badge: "bg-purple-500",
        glow: "shadow-purple-500/50"
      },
      sky: {
        bg: "from-sky-50 to-sky-100",
        border: "border-sky-300",
        text: "text-sky-700",
        badge: "bg-sky-500",
        glow: "shadow-sky-500/50"
      },
      orange: {
        bg: "from-orange-50 to-orange-100",
        border: "border-orange-300",
        text: "text-orange-700",
        badge: "bg-orange-500",
        glow: "shadow-orange-500/50"
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Breadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Payment Methods", href: "/payment-methods" }
            ]}
          />

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 border border-blue-300 px-6 py-3 rounded-full mb-6">
              <i className="fas fa-credit-card text-xl"></i>
              <span className="font-bold uppercase tracking-wider">Secure Payment Options</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
              Payment Methods
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from multiple secure payment options. All transactions are encrypted and protected 
              with industry-standard security measures.
            </p>
          </div>

          {/* Security Banner */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl shadow-2xl p-8 text-white">
              <div className="flex items-center justify-center gap-4 mb-4">
                <i className="fas fa-shield-alt text-5xl"></i>
                <div className="text-left">
                  <h2 className="text-3xl font-black">100% Secure Payments</h2>
                  <p className="text-sky-100 text-lg">SSL Encrypted | PCI Compliant | Verified Transactions</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <i className="fas fa-lock text-3xl mb-2"></i>
                  <p className="text-sm font-semibold">SSL Encrypted</p>
                </div>
                <div className="text-center">
                  <i className="fas fa-check-circle text-3xl mb-2"></i>
                  <p className="text-sm font-semibold">Verified Merchant</p>
                </div>
                <div className="text-center">
                  <i className="fas fa-undo text-3xl mb-2"></i>
                  <p className="text-sm font-semibold">Refund Protected</p>
                </div>
                <div className="text-center">
                  <i className="fas fa-globe text-3xl mb-2"></i>
                  <p className="text-sm font-semibold">Worldwide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="max-w-5xl mx-auto space-y-8">
            {paymentMethods.map((method, index) => {
              const colors = getColorClasses(method.color);
              return (
                <div
                  key={method.id}
                  id={method.id}
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${colors.border} hover:${colors.glow} transition-all`}
                >
                  {/* Method Header */}
                  <div className={`bg-gradient-to-r ${colors.bg} p-6 border-b-2 ${colors.border}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 ${colors.badge} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                        <i className={`${method.icon} text-3xl`}></i>
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">{method.name}</h2>
                        <p className="text-gray-600 mt-1">{method.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Card Logos for Stripe/Cards */}
                    {method.cards && (
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Accepted Cards</h3>
                        <div className="flex flex-wrap gap-4">
                          {method.cards.map((card) => (
                            <div key={card} className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-300">
                              <span className="font-bold text-gray-700">{card}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className={`fas fa-check-circle ${colors.text}`}></i>
                        Key Features
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {method.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <i className={`fas fa-check ${colors.text} mt-1`}></i>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* How to Use */}
                    <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-list-ol text-blue-500"></i>
                        How to Pay
                      </h3>
                      <ol className="space-y-3">
                        {method.howTo.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-3">
                            <span className={`flex-shrink-0 w-7 h-7 ${colors.badge} text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                              {stepIndex + 1}
                            </span>
                            <span className="text-gray-700 pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Note for USDT */}
                    {method.note && (
                      <div className="mt-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
                        <div className="flex items-start gap-2">
                          <i className="fas fa-exclamation-triangle text-yellow-600 text-xl mt-0.5"></i>
                          <div>
                            <p className="font-bold text-yellow-900 mb-1">Important Note</p>
                            <p className="text-yellow-800 text-sm">{method.note}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="max-w-5xl mx-auto mt-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <i className="fas fa-question-circle text-blue-500"></i>
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Are my payment details secure?</h3>
                  <p className="text-gray-600">
                    Yes! All payments are processed through secure, PCI-compliant payment gateways with 
                    256-bit SSL encryption. We never store your credit card information.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">How long does payment processing take?</h3>
                  <p className="text-gray-600">
                    Most payments are processed instantly. Credit card and PayPal payments are immediate. 
                    USDT payments require 2-5 minutes for blockchain confirmation.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">What if my payment fails?</h3>
                  <p className="text-gray-600">
                    If your payment fails, please check your payment details and try again. If the issue 
                    persists, contact your bank or our support team via WhatsApp for immediate assistance.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Can I get a refund?</h3>
                  <p className="text-gray-600">
                    Yes! We offer a 100% money-back guarantee. If you experience any issues with your 
                    purchase, contact us within 30 days for a full refund.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="max-w-5xl mx-auto mt-16">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-10 text-white text-center">
              <i className="fas fa-headset text-6xl mb-6 opacity-90"></i>
              <h2 className="text-3xl font-black mb-4">Need Help with Payment?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Our support team is available 24/7 to assist you with any payment-related questions or issues.
              </p>
              <a
                href="https://wa.me/16019756129"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 font-bold rounded-xl text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                <i className="fab fa-whatsapp text-2xl"></i>
                Contact Support Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
