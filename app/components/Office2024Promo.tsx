import Link from "next/link";
import Image from "next/image";
import { getProductBoxImage } from "../lib/productImage";

// Homepage promo for Office 2024 — the upgrade path now that Office 2021
// support ends (October 13, 2026). Server component; plain links so it is
// crawlable.
const OFFICE_2021_EOS = Date.UTC(2026, 9, 13);

export default function Office2024Promo() {
  const ended = Date.now() >= OFFICE_2021_EOS;
  return (
    // Microsoft blue, matching the billboard and product cards.
    <section className="bg-[#005A9E] py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-[#004E8C] border border-white/20 p-6 md:p-10">
          {/* ambient glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 bg-[#003E70] border border-white/25 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
                <i className="fas fa-bolt"></i> New · Office 2024
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                Office 2021 support {ended ? "has ended" : "ends October 13, 2026"}.{" "}
                <span className="underline decoration-white/50 decoration-4 underline-offset-8">Upgrade to Office 2024.</span>
              </h2>
              <p className="text-white mb-6 max-w-2xl mx-auto lg:mx-0">
                The newest one-time-purchase Office — Word, Excel, PowerPoint, Outlook, Access and OneNote —
                with Microsoft security updates until 2029. No subscription.
              </p>

              <ul className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-white mb-7">
                <li><i className="fas fa-shield-halved text-white mr-2"></i>Supported until 2029</li>
                <li><i className="fas fa-infinity text-white mr-2"></i>Pay once, keep it</li>
                <li><i className="fas fa-envelope text-white mr-2"></i>Instant email delivery</li>
              </ul>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">$34.99</span>
                  <span className="text-white/60 line-through">$439.99</span>
                </div>
                <Link
                  href="/products/office-2024-professional-plus"
                  className="px-7 py-3 bg-emerald-600 text-white font-black rounded-lg hover:bg-emerald-700 transition"
                >
                  <i className="fas fa-cart-shopping mr-2"></i>Buy Office 2024
                </Link>
                <Link
                  href="/blog/office-2021-end-of-support"
                  className="text-white hover:underline underline-offset-2 font-semibold text-sm"
                >
                  Why upgrade? <i className="fas fa-arrow-right text-xs"></i>
                </Link>
              </div>
            </div>

            <Link href="/products/office-2024-professional-plus" className="mx-auto block w-48 md:w-56 transition-transform hover:-translate-y-1">
              <Image
                src={getProductBoxImage("Office 2024 Professional Plus")}
                alt="Office 2024 Professional Plus genuine product key"
                width={564}
                height={780}
                unoptimized
                className="w-full h-auto drop-shadow-2xl"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
