// Slim benefits strip that sits between the navbar and the billboard. It
// separates the two visually and doubles as a trust bar — the copy carries
// high-intent keywords (genuine Microsoft keys, instant delivery, money-back,
// support) that help both conversion and SEO.
//
// Desktop: a static 4-up grid. Mobile: a slim auto-scrolling marquee so all
// four benefits cycle past without the visitor having to swipe.

const items = [
  { icon: "fas fa-bolt", color: "#0ea5e9", title: "Instant Email Delivery", sub: "Your key in minutes" },
  { icon: "fas fa-certificate", color: "#10b981", title: "Genuine Microsoft Keys", sub: "Activate on Microsoft servers" },
  { icon: "fas fa-shield-halved", color: "#0ea5e9", title: "30-Day Money-Back", sub: "Risk-free guarantee" },
  { icon: "fas fa-headset", color: "#10b981", title: "24/7 Support", sub: "WhatsApp & email" },
];

function Item({ icon, color, title, sub }: (typeof items)[number]) {
  return (
    <div className="flex items-center gap-3 flex-shrink-0 md:justify-center md:px-4 whitespace-nowrap">
      <span
        className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${color}1f` }}
      >
        <i className={`${icon} text-base`} style={{ color }}></i>
      </span>
      <div className="leading-tight">
        <p className="text-white text-[13px] font-bold">{title}</p>
        <p className="text-slate-400 text-[11px]">{sub}</p>
      </div>
    </div>
  );
}

export default function FeatureBar() {
  return (
    <div className="relative bg-gradient-to-r from-[#0a0e1a] via-[#0e1526] to-[#0a0e1a] border-b border-white/10 overflow-hidden">
      {/* blue → green accent hairline, matching the site theme */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 z-10"></div>

      {/* Desktop: static grid */}
      <div className="hidden md:block max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-4 py-3 md:divide-x md:divide-white/10">
          {items.map((it) => (
            <Item key={it.title} {...it} />
          ))}
        </div>
      </div>

      {/* Mobile: auto-scrolling marquee (duplicated for a seamless loop) */}
      <div className="md:hidden py-2.5">
        <div className="flex w-max gap-8 okh-feat-marquee">
          {[...items, ...items].map((it, i) => (
            <Item key={`${it.title}-${i}`} {...it} />
          ))}
        </div>
      </div>
    </div>
  );
}
