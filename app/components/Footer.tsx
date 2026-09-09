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
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#products" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/payment-methods" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link href="/activation-guide" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Activation Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/partner-program" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
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
                <Link href="/terms" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
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
                <i className="fas fa-map-marker-alt text-emerald-400 mt-1 text-sm"></i>
                <span className="text-slate-400 text-sm">
                  Storgatan 12, 111 51<br />Stockholm, Sweden
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-envelope text-emerald-400 mt-1 text-sm"></i>
                <a
                  href="mailto:digitalkeyhubllc@gmail.com"
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-sm break-all"
                >
                  digitalkeyhubllc@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-phone text-emerald-400 mt-1 text-sm"></i>
                <a
                  href="tel:+16019756129"
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  +1 (601) 975-6129
                </a>
              </li>
              <li className="flex items-start gap-2">
                <i className="fab fa-whatsapp text-emerald-400 mt-1 text-sm"></i>
                <a
                  href="https://wa.me/16019756129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
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
