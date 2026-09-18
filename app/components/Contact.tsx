"use client";

import { FormEvent } from "react";

export default function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you within 24 hours.");
    e.currentTarget.reset();
  };

  return (
    <section className="py-24 bg-white" id="contact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#4ade80]/20 text-[#22c55e] border border-[#4ade80]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions? Our support team is available 24/7 to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-7">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#4ade80]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fas fa-envelope text-xl text-[#4ade80]"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-1">Email Support</h4>
                <a href="mailto:digitalkeyhubllc@gmail.com" className="text-gray-900 text-[0.95rem] hover:text-[#4ade80] break-all">
                  digitalkeyhubllc@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#25D366]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fab fa-whatsapp text-xl text-[#25D366]"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-1">WhatsApp</h4>
                <a
                  href="https://wa.me/16019756129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 text-[0.95rem] hover:text-[#25D366]"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#4ade80]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fas fa-clock text-xl text-[#4ade80]"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-1">Support Hours</h4>
                <p className="text-gray-900 text-[0.95rem] font-semibold">Available 24/7 7/7</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-2xl p-10 shadow-lg">
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                required
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-[0.95rem] focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                required
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-[0.95rem] focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject</label>
              <select className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-[0.95rem] focus:outline-none focus:border-[#4ade80] transition-colors">
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Billing Question</option>
                <option>Free Trial Request</option>
                <option>Reseller Inquiry</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
              <textarea
                rows={5}
                placeholder="How can we help you?"
                required
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-[0.95rem] focus:outline-none focus:border-[#4ade80] transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-black font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md"
            >
              <i className="fas fa-paper-plane"></i> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}


