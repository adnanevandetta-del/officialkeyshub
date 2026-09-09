import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12 divide-x-0 md:divide-x md:divide-blue-700">
          {/* Company Info */}
          <div className="col-span-1 md:pr-8">
            <div className="mb-4">
              <Logo size="md" animated={false} />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your Official & trusted source for genuine Windows, Office, and software licenses. We provide authentic keys, instant delivery, lifetime support, and 100% money-back guarantee.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:pl-8">
            <h3 className="text-white font-bold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#products" className="hover:text-emerald-500 transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/payment-methods" className="hover:text-emerald-500 transition-colors text-sm">
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link href="/activation-guide" className="hover:text-emerald-500 transition-colors text-sm">
                  Activation Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-emerald-500 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-500 transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="md:pl-8">
            <h3 className="text-white font-bold text-base mb-4">Contact & Legal</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt text-emerald-500 mt-1 text-xs"></i>
                <span className="text-sm">
                  Storgatan 12, 111 51<br />
                  Stockholm, Sweden
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-envelope text-emerald-500 mt-1 text-xs"></i>
                <a
                  href="mailto:digitalkeyhubllc@gmail.com"
                  className="hover:text-emerald-500 transition-colors text-sm break-all"
                >
                  digitalkeyhubllc@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-phone text-emerald-500 mt-1 text-xs"></i>
                <a
                  href="tel:+16019756129"
                  className="hover:text-emerald-500 transition-colors text-sm"
                >
                  +1 (601) 975-6129
                </a>
              </li>
              <li className="flex items-start gap-2">
                <i className="fab fa-whatsapp text-emerald-500 mt-1 text-xs"></i>
                <a
                  href="https://wa.me/16019756129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-500 transition-colors text-sm"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
            <div className="border-t border-blue-700 pt-3">
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="hover:text-emerald-500 transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-emerald-500 transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund-policy" className="hover:text-emerald-500 transition-colors text-sm">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Popular Products */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Popular Products</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Windows</h4>
                <ul className="space-y-1">
                  <li>
                    <Link href="/#products" className="hover:text-emerald-500 transition-colors text-sm text-gray-400">
                      Windows 11 Pro
                    </Link>
                  </li>
                  <li>
                    <Link href="/#products" className="hover:text-emerald-500 transition-colors text-sm text-gray-400">
                      Windows 10 Pro
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Office</h4>
                <ul className="space-y-1">
                  <li>
                    <Link href="/#products" className="hover:text-emerald-500 transition-colors text-sm text-gray-400">
                      Office 2021 Pro Plus
                    </Link>
                  </li>
                  <li>
                    <Link href="/#products" className="hover:text-emerald-500 transition-colors text-sm text-gray-400">
                      Office 365
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Server</h4>
                <ul className="space-y-1">
                  <li>
                    <Link href="/#products" className="hover:text-emerald-500 transition-colors text-sm text-gray-400">
                      Windows Server 2022
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Top Sellers & More */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Top Sellers</h3>
            <ul className="space-y-2 mb-4">
              <li>
                <Link href="/#products" className="hover:text-emerald-500 transition-colors text-sm text-gray-400 flex items-center gap-2">
                  <i className="fas fa-fire text-orange-500 text-xs"></i>
                  Windows 11 Pro
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-emerald-500 transition-colors text-sm text-gray-400 flex items-center gap-2">
                  <i className="fas fa-fire text-orange-500 text-xs"></i>
                  Office 2021 Pro Plus
                </Link>
              </li>
            </ul>
            <h4 className="text-white font-bold text-base mb-3 mt-6">More Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#products" className="hover:text-emerald-500 transition-colors text-sm text-gray-400">
                  Visual Studio 2022
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-emerald-500 transition-colors text-sm text-gray-400">
                  SQL Server
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Map Location Section */}
        <div className="mb-12 pb-12 border-b border-blue-700">
          <h3 className="text-white font-bold text-xl mb-6 text-center">Our Headquarters</h3>
          <div className="bg-blue-800 rounded-xl overflow-hidden border border-blue-600 max-w-4xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.7482908875458!2d18.06392041583794!3d59.334591181659074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d5e8c8d3c3d%3A0x8b3f8e8e8e8e8e8e!2sStorgatan%2C%20Stockholm%2C%20Sweden!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">
              <i className="fas fa-map-marker-alt text-emerald-500 mr-2"></i>
              Storgatan 12, 111 51 Stockholm, Sweden
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm border-t border-blue-700 pt-8">
          <p>© {new Date().getFullYear()} Official Keys Hub. All rights reserved.</p>
          <p className="mt-2">
            All product names, logos, and brands are property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
