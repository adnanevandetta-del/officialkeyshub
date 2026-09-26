import Link from "next/link";
import PaymentIcons from "./PaymentIcons";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-8 pb-8 border-b border-slate-800">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">Official Keys Hub</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Genuine Windows, Office, and software licenses at honest prices, with fast delivery and friendly support.
            </p>
            {/* Accepted payment methods */}
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">We Accept</p>
            <PaymentIcons chip size="text-2xl" className="gap-2 flex-wrap" />

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
                href="https://reddit.com/user/officialkeyshub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Reddit"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-sky-500 flex items-center justify-center text-slate-300 hover:text-[#FF4500] transition-colors"
              >
                <i className="fab fa-reddit-alien text-base"></i>
              </a>
              <a
                href="https://facebook.com/moderndayaccessories"
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
                <Link href="/products" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/payment-methods" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Shipping &amp; Delivery
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
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">My Account</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/profile" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/profile#reviews" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  My Reviews
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Reviews
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
                <Link href="/licensing" className="text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Licensing &amp; Authenticity
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
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white font-semibold text-base mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt text-sky-500 mt-1 text-sm"></i>
                <a
                  href="https://www.google.com/maps/place/Stockholm,+Sweden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-sky-500 transition-colors text-sm"
                >
                  Stockholm, Sweden
                </a>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-envelope text-sky-500 mt-1 text-sm"></i>
                <a
                  href="mailto:officialkeyshub@gmail.com"
                  className="text-slate-400 hover:text-sky-500 transition-colors text-sm break-all"
                >
                  officialkeyshub@gmail.com
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
                href="https://www.google.com/maps/place/Stockholm,+Sweden"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-500 transition-colors text-sm"
              >
                Stockholm, Sweden
              </a>
            </div>
          </div>
          <span className="hidden md:block h-8 w-px bg-slate-700"></span>
          <p className="text-slate-500 text-xs max-w-xs">
            Independent startup · Genuine software licenses · Founded 2025
          </p>
          <a
            href="https://www.google.com/maps/place/Stockholm,+Sweden"
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
