import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Windows & Office Key Questions | Official Keys Hub",
  description: "Complete FAQ guide for buying, activating, and using Windows 11, Office 2021, and Microsoft software licenses. Instant answers to licensing, activation errors, purchase, and support questions.",
  keywords: "windows 11 activation help, office 2021 key activation, how to buy windows key, windows key not working, activate windows 11 pro, oem vs retail license, cheap windows keys safe, microsoft product key help, windows activation error fix, office activation guide, buy genuine windows key, windows 11 pro key purchase, office 2021 professional plus, windows server license, microsoft key delivery time, windows key refund policy, activate office without internet, windows 10 to 11 upgrade key, bulk windows licenses, microsoft volume licensing",
  openGraph: {
    title: "FAQ — Windows & Office Key Questions | Official Keys Hub",
    description: "Complete FAQ guide for Microsoft software licensing. Activation, purchase, delivery, troubleshooting, and support.",
    url: "https://www.officialkeyshub.com/faq",
    type: "website",
  },
};

export default function FAQPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "FAQ" },
  ];

  const faqCategories = [
    {
      category: "General Questions",
      icon: "fas fa-info-circle",
      questions: [
        {
          q: "What is Official Keys Hub?",
          a: "Official Keys Hub is a trusted provider of genuine Microsoft software licenses including Windows, Office, Server, and other Microsoft products. We offer authentic product keys at competitive prices with instant delivery and lifetime support."
        },
        {
          q: "Are your product keys genuine?",
          a: "Yes, 100% genuine! All our product keys are sourced through legitimate, legal channels and activate directly on Microsoft's own servers. Every key is authentic and legal, and comes with our money-back guarantee. We never sell pirated or illegal software."
        },
        {
          q: "How quickly will I receive my product key?",
          a: "Instant delivery! Most orders are processed within 5 minutes. You'll receive your product key via email and WhatsApp immediately after payment confirmation. Our automated system ensures the fastest possible delivery."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept PayPal, Stripe, Visa, Mastercard, American Express, and other major payment methods. All transactions are secured with 256-bit SSL encryption for your safety."
        },
        {
          q: "Do you offer refunds?",
          a: "Yes! We offer a 100% money-back guarantee within 30 days if your product key doesn't work. We'll either replace the key immediately or issue a full refund - no questions asked."
        }
      ]
    },
    {
      category: "Product Activation",
      icon: "fas fa-key",
      questions: [
        {
          q: "How do I activate my Windows or Office key?",
          a: "Activation is simple: 1) Install Windows/Office from Microsoft's official website, 2) Go to Settings > Update & Security > Activation (Windows) or File > Account (Office), 3) Click 'Change product key', 4) Enter your key, 5) Click 'Activate'. Full instructions are included with your purchase."
        },
        {
          q: "What's the difference between Online Key, Bind Key, and Phone Key?",
          a: "Online Key: Activates via Microsoft servers (requires internet). Bind Key: Permanently linked to your Microsoft account for easy reinstalls. Phone Key: Can be activated by calling Microsoft (works offline). All are genuine, just different activation methods."
        },
        {
          q: "Can I reinstall Windows/Office with the same key?",
          a: "Yes! Your license is valid for lifetime. You can reinstall on the same device as many times as needed. For major hardware changes, you may need to reactivate by phone (free Microsoft service)."
        },
        {
          q: "My key says 'already activated' - what should I do?",
          a: "Contact us immediately via WhatsApp or email. This rarely happens, but we'll replace your key within minutes at no extra cost. We guarantee all keys work on first activation."
        },
        {
          q: "Can I activate offline?",
          a: "Yes, with Phone Keys! Call Microsoft's automated activation line, enter the installation ID displayed on your screen, and receive an activation code. It's free and takes about 5 minutes."
        }
      ]
    },
    {
      category: "Licensing & Usage",
      icon: "fas fa-certificate",
      questions: [
        {
          q: "Can I use one key on multiple computers?",
          a: "No, each license is for ONE device only (unless specified as multi-device like Office 365). Using one key on multiple PCs simultaneously violates Microsoft's terms and will cause activation failures."
        },
        {
          q: "Can I transfer my license to a new computer?",
          a: "Yes! Retail licenses can be transferred. Uninstall from the old PC, then install and activate on the new one. For best results, use the phone activation method if you get an error."
        },
        {
          q: "What's the difference between Retail, OEM, and Volume licenses?",
          a: "Retail: Transferable between PCs, full Microsoft support. OEM: Tied to first PC, limited support. Volume: For businesses, requires Volume Licensing Service Center. We primarily sell Retail keys for maximum flexibility."
        },
        {
          q: "Are these lifetime licenses?",
          a: "Yes! One-time payment, lifetime validity (except Office 365 which is annual subscription). No recurring fees, no expiration. You own the license forever."
        },
        {
          q: "Can I upgrade from Home to Pro with my key?",
          a: "No, you need a Pro key to upgrade. However, we sell upgrade keys at competitive prices. Contact us for special upgrade pricing if you already have a Home license."
        }
      ]
    },
    {
      category: "Technical Support",
      icon: "fas fa-headset",
      questions: [
        {
          q: "What if my key doesn't work?",
          a: "Contact us immediately! We provide 24/7 support via WhatsApp and email. We'll troubleshoot with you, and if the key truly doesn't work, we'll replace it instantly or refund you fully."
        },
        {
          q: "Do you provide installation help?",
          a: "Yes! We include detailed PDF guides with screenshots. If you need personal assistance, our support team is available 24/7 via WhatsApp to guide you through the process step-by-step."
        },
        {
          q: "How long is support available?",
          a: "Lifetime! We don't disappear after the sale. As long as you have your product key, we'll help you with any activation or technical issues - forever."
        },
        {
          q: "Can you help with activation errors?",
          a: "Absolutely! Common errors like 0xC004C003, 0xC004F074, or 'This key didn't work' are usually fixable. Contact us and we'll guide you through the solution or provide a replacement key."
        },
        {
          q: "Do you offer remote assistance?",
          a: "Yes, for complex issues we can provide remote assistance via TeamViewer or AnyDesk (with your permission). This service is free for our customers."
        }
      ]
    },
    {
      category: "Product Specific",
      icon: "fas fa-box-open",
      questions: [
        {
          q: "What's included in Office Professional Plus?",
          a: "Office Professional Plus includes Word, Excel, PowerPoint, Outlook, OneNote, Publisher, Access, and Skype for Business. It's the complete Office suite with all applications."
        },
        {
          q: "Can I use Windows 11 key on Windows 10?",
          a: "No, they're separate products. However, Windows 10 keys can be used to install Windows 11 if your hardware is compatible. Contact us if you need clarification for your specific situation."
        },
        {
          q: "What's the difference between Office 2021 and Office 365?",
          a: "Office 2021: One-time purchase, works offline, no cloud features, fixed to that version. Office 365: Annual subscription, includes 1TB OneDrive, always updates to latest version, cloud features. Choose based on your needs."
        },
        {
          q: "Do Server licenses include CALs?",
          a: "No, Server licenses and Client Access Licenses (CALs) are sold separately. Contact us for bundle pricing if you need both server license and CALs."
        },
        {
          q: "Can I use Windows 7 keys in 2026?",
          a: "Yes, the key will activate Windows 7. However, Microsoft ended support in 2020. We recommend upgrading to Windows 10 or 11 for security updates. Keys still work for legacy systems or virtual machines."
        }
      ]
    },
    {
      category: "Security & Privacy",
      icon: "fas fa-shield-alt",
      questions: [
        {
          q: "Is it safe to buy from you?",
          a: "100% safe! We use encrypted payment processing (256-bit SSL), never store your payment information, and are an independent startup based in Stockholm, Sweden. We launched in 2025 and have served a few hundred satisfied customers so far."
        },
        {
          q: "Will you share my information?",
          a: "Never! We respect your privacy. Your email and order information are kept strictly confidential and will never be sold or shared with third parties. See our Privacy Policy for details."
        },
        {
          q: "Are these keys legal?",
          a: "Absolutely legal! All keys are sourced from authorized distributors. The software license resale market is legal in the EU under the 'doctrine of exhaustion' (UsedSoft v. Oracle case)."
        },
        {
          q: "Why are your prices so low?",
          a: "Volume purchasing, lower overhead (online only), and strategic partnerships allow us to offer genuine Microsoft products at 85-95% off retail prices. We pass the savings to you!"
        },
        {
          q: "Will Microsoft support my key?",
          a: "Yes, Microsoft supports all genuine product keys regardless of where purchased. If you need Microsoft support, they'll help you just like any other customer."
        }
      ]
    },
    {
      category: "Delivery & Orders",
      icon: "fas fa-shipping-fast",
      questions: [
        {
          q: "How will I receive my product key?",
          a: "Via email and WhatsApp! After payment, you'll instantly receive: 1) Product key, 2) Download link to official Microsoft ISO, 3) Installation guide PDF, 4) Activation instructions. Check spam folder if not in inbox."
        },
        {
          q: "I didn't receive my key, what should I do?",
          a: "First check your spam/junk folder. If still not found, contact us immediately on WhatsApp (+1 601 975-6129) with your order email. We'll resend instantly."
        },
        {
          q: "Can I change my order after purchase?",
          a: "If you haven't activated the key yet, contact us immediately. We may be able to exchange it for a different product. Once activated, exchanges aren't possible."
        },
        {
          q: "Do you keep order history?",
          a: "Yes! We keep records of all purchases. If you lose your key, contact us with your order email and we'll resend it free of charge."
        },
        {
          q: "Can I buy in bulk for my business?",
          a: "Yes! We offer volume discounts for businesses. Contact us via WhatsApp or email with your requirements and we'll provide a custom quote with special pricing."
        }
      ]
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((c) =>
      c.questions.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      }))
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />
      <div className="pt-20 bg-white min-h-screen">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Header */}
        <section className="py-16 bg-gradient-to-br from-sky-50 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-extrabold mb-4 text-gray-900">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Find answers to common questions about our software licenses, activation, and support
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white px-6 py-3 rounded-full shadow-md border border-sky-200">
                  <i className="fas fa-bolt text-sky-600 mr-2"></i>
                  <span className="font-semibold text-gray-800">Instant Answers</span>
                </div>
                <div className="bg-white px-6 py-3 rounded-full shadow-md border border-sky-200">
                  <i className="fas fa-headset text-sky-600 mr-2"></i>
                  <span className="font-semibold text-gray-800">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto space-y-12">
              {faqCategories.map((category, idx) => (
                <div key={idx} className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-sky-400 transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                      <i className={`${category.icon} text-sky-700 text-xl`}></i>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{category.category}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {category.questions.map((faq, qIdx) => (
                      <details key={qIdx} className="group">
                        <summary className="flex items-start gap-3 cursor-pointer list-none p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <i className="fas fa-chevron-right text-sky-600 mt-1 group-open:rotate-90 transition-transform"></i>
                          <span className="font-semibold text-lg text-gray-900 flex-1">{faq.q}</span>
                        </summary>
                        <div className="mt-4 ml-10 text-gray-700 leading-relaxed">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-gradient-to-br from-sky-50 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Still Have Questions?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our support team is available 24/7 to help you with any questions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/16019756129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-sky-600 to-sky-700 text-white font-bold rounded-lg hover:from-sky-700 hover:to-sky-800 transition-all shadow-lg inline-flex items-center justify-center"
                >
                  <i className="fab fa-whatsapp mr-2 text-xl"></i>
                  Chat on WhatsApp
                </a>
                <a
                  href="mailto:officialkeyshub@gmail.com"
                  className="px-8 py-4 bg-white text-sky-700 font-bold rounded-lg border-2 border-sky-600 hover:bg-sky-50 transition-all shadow-lg inline-flex items-center justify-center"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  Email Us
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