// Slim benefits strip between the navbar and the billboard. It separates the
// two visually and doubles as a trust bar — the copy carries high-intent
// keywords (genuine Microsoft keys, instant delivery, money-back, support) that
// help conversion and SEO. Compact single-line items on a continuous,
// auto-scrolling marquee (pauses on hover / for reduced-motion users).

import { HEADER_THEME } from "../lib/headerTheme";
import { getProductByName } from "../lib/blogAds";
import { BF_CODE, BF_PERCENT, bfPrice, blackFridayActive } from "../lib/promo";

const items = [
  { icon: "fas fa-bolt", title: "Instant Email Delivery" },
  { icon: "fas fa-certificate", title: "Genuine Microsoft Keys" },
  { icon: "fas fa-lock", title: "Secure Payments" },
  { icon: "fab fa-bitcoin", title: "Crypto Payments Accepted" },
  { icon: "fas fa-tags", title: "Save up to 15% on Bundles" },
  { icon: "fas fa-shield-halved", title: "30-Day Money-Back Guarantee" },
  { icon: "fas fa-headset", title: "24/7 Support" },
];

function Item({ icon, title }: (typeof items)[number]) {
  return (
    <div className="flex items-center gap-1 md:gap-1.5 flex-shrink-0 whitespace-nowrap rounded-full border border-white/30 bg-white/10 px-2 md:px-2.5 py-0.5 transition-transform duration-200 hover:scale-105">
      <i className={`${icon} text-[9px] md:text-[11px] text-white`}></i>
      <span className="text-[10px] md:text-[11px] font-bold text-white">
        {title}
      </span>
    </div>
  );
}

// While the Black Friday sale is on, the strip turns into a static, gold sale
// strip: no marquee, so nothing ever appears twice on screen. Less important
// items drop off on smaller screens instead of scrolling.
function BlackFridayStrip() {
  const bundle = getProductByName("Windows 11 Pro + Office 2024 Pro Plus Bundle");
  const sale: { icon: string; title: string; gold?: boolean; show: string }[] = [
    { icon: "fas fa-tags", title: `Black Friday: ${BF_PERCENT}% off everything`, gold: true, show: "flex" },
    { icon: "fas fa-ticket", title: `Code ${BF_CODE} at checkout`, gold: true, show: "flex" },
    ...(bundle
      ? [{ icon: "fas fa-box-open", title: `Windows 11 Pro + Office 2024 bundle ${bfPrice(bundle.price)}`, gold: true, show: "hidden md:flex" }]
      : []),
    { icon: "fas fa-certificate", title: "Genuine Microsoft keys", show: "hidden lg:flex" },
    { icon: "fas fa-shield-halved", title: "30-day money-back", show: "hidden lg:flex" },
    { icon: "fas fa-lock", title: "PayPal, card & crypto", show: "hidden xl:flex" },
  ];
  return (
    <div className="border-b border-[#f2c94c]/25 bg-[#0d1017]">
      <div className="max-w-7xl mx-auto px-3 py-1.5 flex items-center justify-center gap-2 md:gap-3">
        {sale.map((it) => (
          <div
            key={it.title}
            className={`${it.show} items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 border ${
              it.gold ? "border-[#f2c94c]/50 bg-[#f2c94c]/10" : "border-white/15 bg-white/5"
            }`}
          >
            <i className={`${it.icon} text-[10px] md:text-[11px] ${it.gold ? "text-[#f5d77a]" : "text-white/70"}`}></i>
            <span className={`text-[10px] md:text-[11px] font-bold ${it.gold ? "text-[#ffe9a8]" : "text-white/85"}`}>{it.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeatureBar() {
  if (blackFridayActive()) return <BlackFridayStrip />;

  // Seven unique items already overfill a wide viewport, so a single duplicate
  // is enough for a seamless -50% loop (no visible repeat on screen at once).
  const loop = [...items, ...items];

  return (
    <div
      className="group relative border-b border-white/10 overflow-hidden"
      style={{ backgroundColor: HEADER_THEME.strip }}
    >

      <div className="py-1.5">
        <div className="flex w-max gap-4 md:gap-6 okh-feat-marquee">
          {loop.map((it, i) => (
            <Item key={`${it.title}-${i}`} {...it} />
          ))}
        </div>
      </div>
    </div>
  );
}
