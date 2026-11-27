// Slim benefits strip between the navbar and the billboard (homepage only).
// Emerald trust chips on a continuous, auto-scrolling marquee (pauses on hover /
// for reduced-motion users). Black Friday is deliberately NOT shown here: on the
// homepage the sale appears once, in the bundles section.

const items = [
  { icon: "fas fa-bolt", title: "Instant Email Delivery" },
  { icon: "fas fa-infinity", title: "Lifetime Licenses" },
  { icon: "fas fa-lock", title: "Secure Payments" },
  { icon: "fab fa-bitcoin", title: "Crypto Payments Accepted" },
  { icon: "fas fa-tags", title: "Save up to 15% on Bundles" },
  { icon: "fas fa-shield-halved", title: "30-Day Money-Back Guarantee" },
  { icon: "fas fa-headset", title: "24/7 Support" },
];

export default function FeatureBar() {
  // Each half of the -50% loop holds the list twice, so even very wide screens
  // are filled edge to edge without a gap.
  const half = [...items, ...items];
  const loop = [...half, ...half];

  return (
    <div className="group relative overflow-hidden border-b border-white/10 bg-[#0d1017]">
      <div className="py-1.5">
        <div className="flex w-max gap-3 md:gap-4 okh-feat-marquee [animation-duration:60s]">
          {loop.map((it, i) => (
            <div
              key={`${it.title}-${i}`}
              aria-hidden={i >= items.length ? true : undefined}
              className="flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-400/40 bg-emerald-600 px-2.5 py-0.5"
            >
              <i className={`${it.icon} text-[9px] md:text-[11px] text-white`} aria-hidden="true"></i>
              <span className="text-[10px] md:text-[11px] font-bold text-white">{it.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
