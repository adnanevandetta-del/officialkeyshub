// Slim benefits strip between the navbar and the billboard. It separates the
// two visually and doubles as a trust bar — the copy carries high-intent
// keywords (genuine Microsoft keys, instant delivery, money-back, support) that
// help conversion and SEO. Compact single-line items on a continuous,
// auto-scrolling marquee (pauses on hover / for reduced-motion users).

const items = [
  { icon: "fas fa-bolt", color: "#38bdf8", title: "Instant Email Delivery" },
  { icon: "fas fa-certificate", color: "#34d399", title: "Genuine Microsoft Keys" },
  { icon: "fas fa-lock", color: "#38bdf8", title: "Secure Payments" },
  { icon: "fab fa-bitcoin", color: "#f7931a", title: "Crypto Payments Accepted" },
  { icon: "fas fa-tags", color: "#fbbf24", title: "Up to 90% Off Retail" },
  { icon: "fas fa-shield-halved", color: "#34d399", title: "30-Day Money-Back Guarantee" },
  { icon: "fas fa-headset", color: "#38bdf8", title: "24/7 Support" },
];

function Item({ icon, color, title }: (typeof items)[number]) {
  return (
    <div
      className="flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5"
      style={{
        borderColor: `${color}66`,
        backgroundColor: `${color}14`,
        boxShadow: `0 0 10px ${color}2e`,
      }}
    >
      <i
        className={`${icon} text-[11px]`}
        style={{ color, filter: `drop-shadow(0 0 4px ${color})` }}
      ></i>
      <span
        className="text-[11px] font-bold"
        style={{ color: "#fff", textShadow: `0 0 6px ${color}55` }}
      >
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
    <div className="group relative bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/10 overflow-hidden">
      {/* blue → green accent hairline, matching the site theme */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 z-10"></div>

      <div className="py-1.5">
        <div className="flex w-max gap-6 okh-feat-marquee">
          {loop.map((it, i) => (
            <Item key={`${it.title}-${i}`} {...it} />
          ))}
        </div>
      </div>
    </div>
  );
}
