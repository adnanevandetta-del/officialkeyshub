// Slim benefits strip between the navbar and the billboard. It separates the
// two visually and doubles as a trust bar — the copy carries high-intent
// keywords (genuine Microsoft keys, instant delivery, money-back, support) that
// help conversion and SEO. Compact single-line items on a continuous,
// auto-scrolling marquee (pauses on hover / for reduced-motion users).

import { HEADER_THEME } from "../lib/headerTheme";

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

export default function FeatureBar() {
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
