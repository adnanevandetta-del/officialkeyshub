import Link from "next/link";
import PaymentIcons from "./PaymentIcons";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#0a0e1a] text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-8 pb-8 border-b border-slate-800">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-4">
              <Logo size="md" tone="dark" animated={false} />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              Windows, Office and software licenses at honest prices, with fast delivery and friendly support.
            </p>
            {/* Accepted payment methods */}
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">We Accept</p>
            <PaymentIcons className="gap-3 justify-center lg:justify-start" />

            {/* Social media */}
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-5 mb-2">Follow Us</p>
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
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
            <ul className="space-y-0.5">
              <li>
                <Link href="/products" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/payment-methods" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link href="/key-finder" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Which Key Do I Need?
                </Link>
              </li>
              <li>
                <Link href="/microsoft-end-of-support" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Microsoft End of Support Dates
                </Link>
              </li>
              <li>
                <Link href="/activation-guide" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Activation Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Phones: My Account and Legal stack in the right column, level with the
              longer Quick Links list. Desktop: lg:contents makes them grid columns again. */}
          <div className="space-y-8 lg:space-y-0 lg:contents">
          {/* My Account */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">My Account</h4>
            <ul className="space-y-0.5">
              <li>
                <Link href="/profile" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/profile#reviews" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  My Reviews
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/partner-program" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Partner Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Legal</h4>
            <ul className="space-y-0.5">
              <li>
                <Link href="/about" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/licensing" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Licensing &amp; Authenticity
                </Link>
              </li>
              <li>
                <Link href="/terms" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white font-semibold text-base mb-4">Contact Us</h4>
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope text-sky-500 text-sm"></i>
                <a
                  href="mailto:officialkeyshub@gmail.com"
                  className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm break-all"
                >
                  officialkeyshub@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-phone text-sky-500 text-sm"></i>
                <a
                  href="tel:+16019756129"
                  className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm"
                >
                  +1 (601) 975-6129
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="fab fa-whatsapp text-sky-500 text-sm"></i>
                <a
                  href="https://wa.me/16019756129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1.5 text-slate-400 hover:text-sky-500 transition-colors text-sm"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Official Keys Hub. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span><i className="fas fa-location-dot text-sky-500 mr-1" aria-hidden="true"></i>United States</span>
            <span aria-hidden="true">·</span>
            <span>Independent store, founded 2025</span>
          </p>
          <p className="text-slate-600 text-xs mt-2">
            All product names, logos, and brands are property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
