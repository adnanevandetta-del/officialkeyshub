"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Are your licenses genuine and legal?",
      answer: "Yes! All our licenses are 100% genuine and sourced from authorized distributors. We guarantee authenticity and provide full support for activation and verification.",
    },
    {
      question: "How quickly will I receive my license key?",
      answer: "Most orders are delivered instantly via email within 5 minutes of payment confirmation. In rare cases, it may take up to 1 hour during peak times.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with your purchase or experience any activation issues, contact us for a full refund.",
    },
    {
      question: "Can I use the license on multiple computers?",
      answer: "License terms vary by product. Windows and Office licenses are typically for 1 PC/device. Please check the specific product description for exact limitations.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods including credit/debit cards, PayPal, cryptocurrency, and other secure payment options. Contact us via WhatsApp to arrange payment.",
    },
    {
      question: "Is lifetime support really included?",
      answer: "Absolutely! We provide lifetime technical support for all our products. If you have any activation issues or questions, our support team is available 24/7 via WhatsApp and email.",
    },
    {
      question: "What if my license key doesn't work?",
      answer: "In the rare case a license key doesn't work, contact us immediately. We'll provide a replacement key or full refund within 24 hours. Your satisfaction is our priority.",
    },
    {
      question: "Do you sell subscription-based licenses?",
      answer: "We offer both lifetime licenses (Windows, Office 2021, Office 2019) and subscription-based licenses (Office 365, antivirus products). Choose what works best for you!",
    },
    {
      question: "Are these OEM or retail licenses?",
      answer: "We offer both OEM and retail licenses depending on the product. All details are clearly specified in each product description. Both types are genuine and fully functional.",
    },
    {
      question: "Can I upgrade from Windows 10 to Windows 11?",
      answer: "Yes! If your computer meets Windows 11 system requirements, you can upgrade. We also offer Windows 11 licenses if you prefer a fresh installation.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 border border-emerald-300 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers. Can't find what you're looking for? Contact us anytime!
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-emerald-500 transition-all overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-lg text-gray-900 pr-4">
                  {faq.question}
                </span>
                <i
                  className={`fas fa-chevron-${
                    openIndex === index ? "up" : "down"
                  } text-emerald-600 text-xl flex-shrink-0 transition-transform`}
                ></i>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6 text-lg">
            Still have questions? We're here to help!
          </p>
          <a
            href="https://wa.me/16019756129"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg"
          >
            <i className="fab fa-whatsapp text-2xl"></i>
            <span>Chat with Us on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
