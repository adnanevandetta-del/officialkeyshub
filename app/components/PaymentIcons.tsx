// Accepted-payment badges in their real brand colors, used everywhere on the
// site so payment methods read as recognizable, "alive" logos rather than flat
// monochrome glyphs. Brand colors are locked (see design system) — don't recolor
// them to match the theme.
//
// Pass `chip` to sit each logo on a white rounded chip (the realistic card-badge
// look), e.g. on the dark footer where flat colored glyphs would be low-contrast.

type Method = "visa" | "mastercard" | "paypal" | "bitcoin" | "usdt";

const ALL: Method[] = ["visa", "mastercard", "paypal", "bitcoin", "usdt"];

const COLORS: Record<Exclude<Method, "usdt">, { icon: string; color: string; label: string }> = {
  visa: { icon: "fab fa-cc-visa", color: "#1a4fd6", label: "Visa" },
  mastercard: { icon: "fab fa-cc-mastercard", color: "#eb001b", label: "Mastercard" },
  paypal: { icon: "fab fa-cc-paypal", color: "#0070ba", label: "PayPal" },
  bitcoin: { icon: "fab fa-bitcoin", color: "#f7931a", label: "Bitcoin" },
};

export default function PaymentIcons({
  size = "text-2xl",
  className = "",
  methods = ALL,
  chip = false,
}: {
  size?: string;
  className?: string;
  methods?: Method[];
  chip?: boolean;
}) {
  const wrap = (key: string, node: React.ReactNode) =>
    chip ? (
      <span
        key={key}
        className="inline-flex items-center justify-center h-8 w-11 rounded-md bg-white shadow-sm ring-1 ring-black/5"
      >
        {node}
      </span>
    ) : (
      <span key={key} className="inline-flex items-center justify-center">
        {node}
      </span>
    );

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {methods.map((m) => {
        if (m === "usdt") {
          return wrap(
            m,
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#26a17b] text-white text-[11px] font-black leading-none"
              title="USDT (Tether)"
              aria-label="USDT"
            >
              ₮
            </span>
          );
        }
        const c = COLORS[m];
        return wrap(
          m,
          <i
            className={`${c.icon} ${size} ${chip ? "" : "drop-shadow-sm"}`}
            style={{ color: c.color }}
            title={c.label}
            aria-label={c.label}
          />
        );
      })}
    </div>
  );
}
