// Slim benefits strip between the navbar and the billboard. It separates the
// two visually and doubles as a trust bar — the copy carries high-intent
// keywords (lifetime licenses, instant delivery, money-back, support) that
// help conversion and SEO. Compact single-line items on a continuous,
// auto-scrolling marquee (pauses on hover / for reduced-motion users).

import { HEADER_THEME } from "../lib/headerTheme";
import { getProductByName } from "../lib/blogAds";
import { BF_PERCENT, bfPrice, blackFridayActive } from "../lib/promo";

const items = [
  { icon: "fas fa-bolt", title: "Instant Email Delivery" },
  { icon: "fas fa-infinity", title: "Lifetime Licenses" },
  { icon: "fas fa-lock", title: "Secure Payments" },
  { icon: "fab fa-bitcoin", title: "Crypto Payments Accepted" },
  { icon: "fas fa-tags", title: "Save up to 15% on Bundles" },
  { icon: "fas fa-shield-halved", title: "30-Day Money-Back Guarantee" },
  { icon: "fas fa-headset", title: "24/7 Support" },
];

type Item = { icon: string; title: string };

function Item({ icon, title }: Item) {
  return (
    <div className="flex items-center gap-1 md:gap-1.5 flex-shrink-0 whitespace-nowrap rounded-full border border-white/30 bg-white/10 px-2 md:px-2.5 py-0.5 transition-transform duration-200 hover:scale-105">
      <i className={`${icon} text-[9px] md:text-[11px] text-white`}></i>
      <span className="text-[10px] md:text-[11px] font-bold text-white">
        {title}
      </span>
    </div>
  );
}

// While the Black Friday sale is on, the strip alternates one gold Black
// Friday item with one of the usual emerald trust items, scrolling across the
// full width. Twelve different items fill even very wide screens, so the
// seamless loop never shows the same item twice at once.
function BlackFridayStrip() {
  const price = (name: string) => {
    const p = getProductByName(name);
    return p ? bfPrice(p.price) : null;
  };
  const bundle = price("Windows 11 Pro + Office 2024 Pro Plus Bundle");
  const win = price("Windows 11 Pro");
  const office = price("Office 2024 Professional Plus");
  const visio = price("Visio Professional 2024");

  const bf: Item[] = [
    { icon: "fas fa-tags", title: `Black Friday: ${BF_PERCENT}% off everything` },
    { icon: "fas fa-ticket", title: "Code applied at checkout" },
    ...(bundle ? [{ icon: "fas fa-box-open", title: `Windows 11 Pro + Office 2024 bundle ${bundle}` }] : []),
    ...(win ? [{ icon: "fab fa-windows", title: `Windows 11 Pro ${win}` }] : []),
    ...(office ? [{ icon: "fas fa-file-word", title: `Office 2024 Pro Plus ${office}` }] : []),
    ...(visio ? [{ icon: "fas fa-diagram-project", title: `Visio & Project 2024 ${visio}` }] : []),
  ];
  const green: Item[] = items.filter((it) => !/Save up to/.test(it.title));

  const mixed: (Item & { gold: boolean })[] = [];
  for (let i = 0; i < Math.max(bf.length, green.length); i++) {
    if (bf[i]) mixed.push({ ...bf[i], gold: true });
    if (green[i]) mixed.push({ ...green[i], gold: false });
  }
  const loop = [...mixed, ...mixed];

  return (
    <div className="group relative overflow-hidden border-b border-[#f2c94c]/25 bg-[#0d1017]">
      <div className="py-1.5">
        <div className="flex w-max gap-3 md:gap-4 okh-feat-marquee [animation-duration:45s]">
          {loop.map((it, i) => (
            <div
              key={`${it.title}-${i}`}
              aria-hidden={i >= mixed.length ? true : undefined}
              className={`flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 border ${
                it.gold ? "border-[#f2c94c]/60 bg-[#f2c94c]/10" : "border-emerald-400/40 bg-emerald-600"
              }`}
            >
              <i className={`${it.icon} text-[9px] md:text-[11px] ${it.gold ? "text-[#f5d77a]" : "text-white"}`}></i>
              <span className={`text-[10px] md:text-[11px] font-bold ${it.gold ? "text-[#ffe9a8]" : "text-white"}`}>{it.title}</span>
            </div>
          ))}
        </div>
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
