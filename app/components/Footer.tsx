import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Official Keys Hub</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Your trusted source for genuine Windows, Office, and software licenses with instant delivery and lifetime support.
            </p>
            {/* Accepted payment methods */}
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">We Accept</p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center h-7 w-11 bg-white rounded-md shadow-sm" title="Visa">
                <i className="fab fa-cc-visa text-[#1a1f71] text-xl"></i>
              </span>
              <span className="inline-flex items-center justify-center h-7 w-11 bg-white rounded-md shadow-sm" title="PayPal">
                <i className="fab fa-cc-paypal text-[#003087] text-xl"></i>
              </span>
              <span className="inline-flex items-center justify-center h-7 w-11 bg-white rounded-md shadow-sm" title="Stripe">
                <i className="fab fa-cc-stripe text-[#635bff] text-xl"></i>
              </span>
              <span className="inline-flex items-center justify-center h-7 px-2 bg-white rounded-md shadow-sm gap-1" title="USDT">
                <span className="w-4 h-4 rounded-full bg-[#26a17b] text-white flex items-center justify-center text-[10px] font-black">₮</span>
                <span className="text-[#26a17b] text-xs font-black">USDT</span>
              </span>
            </div>

            {/* Social media */}
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-5 mb-2">Follow Us</p>
            <div className="flex items-center gap-2.5">
              <a
                href="https://twitter.com/officialkeyshub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X (Twitter)"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-sky-500 flex items-center justify-center text-slate-300 hover:text-sky-400 transition-colors"
              >
                <i className="fab fa-x-twitter text-base"></i>
              </a>
              <a
                href="https://instagram.com/officialkeyshub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-sky-500 flex items-center justify-center text-slate-300 hover:text-[#E1306C] transition-colors"
              >
                <i className="fab fa-instagram text-base"></i>
              </a>
              <a
                href="https://reddit.com/r/officialkeyshub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Reddit"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-sky-500 flex items-center justify-center text-slate-300 hover:text-[#FF4500] transition-colors"
              >
                <i className="fab fa-reddit-alien text-base"></i>
              </a>
              <a
                href="https://facebook.com/officialkeyshub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-sky-500 flex items-center justify-center text-slate-300 hover:text-[#1877F2] transition-colors"
              >
                <i className="fab fa-facebook-f text-base"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#products" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/payment-methods" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link href="/activation-guide" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Activation Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/partner-program" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Partner Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt text-sky-500 mt-1 text-sm"></i>
                <a
                  href="https://www.google.com/maps/place/Kungsgatan+8,+111+43+Stockholm,+Sweden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-sky-500 transition-colors text-sm"
                >
                  Kungsgatan 8, 111 43<br />Stockholm, Sweden
                </a>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-envelope text-sky-500 mt-1 text-sm"></i>
                <a
                  href="mailto:digitalkeyhubllc@gmail.com"
                  className="text-slate-400 hover:text-sky-500 transition-colors text-sm break-all"
                >
                  digitalkeyhubllc@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-phone text-sky-500 mt-1 text-sm"></i>
                <a
                  href="tel:+16019756129"
                  className="text-slate-400 hover:text-sky-500 transition-colors text-sm"
                >
                  +1 (601) 975-6129
                </a>
              </li>
              <li className="flex items-start gap-2">
                <i className="fab fa-whatsapp text-sky-500 mt-1 text-sm"></i>
                <a
                  href="https://wa.me/16019756129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-sky-500 transition-colors text-sm"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Headquarters */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 rounded-xl border border-slate-800 bg-slate-900/50 px-5 py-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-sky-600/15 flex items-center justify-center">
              <i className="fas fa-building text-sky-500"></i>
            </span>
            <div>
              <p className="text-white text-sm font-semibold">Official Keys Hub — Headquarters</p>
              <a
                href="https://www.google.com/maps/place/Kungsgatan+8,+111+43+Stockholm,+Sweden"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-500 transition-colors text-sm"
              >
                Kungsgatan 8, 111 43 Stockholm, Sweden
              </a>
            </div>
          </div>
          <span className="hidden md:block h-8 w-px bg-slate-700"></span>
          <p className="text-slate-500 text-xs max-w-xs">
            Registered digital software reseller · Serving customers across the EU &amp; worldwide
          </p>
          <a
            href="https://www.google.com/maps/place/Kungsgatan+8,+111+43+Stockholm,+Sweden"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 hover:text-sky-400 text-sm font-semibold inline-flex items-center gap-1"
          >
            <i className="fas fa-map-marker-alt"></i> View on map
          </a>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Official Keys Hub. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs mt-2">
            All product names, logos, and brands are property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
