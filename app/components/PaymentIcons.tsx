// Accepted-payment badges drawn as their real brand logos (Mastercard's
// two-ring mark, a generic bank card, the PayPal two-tone wordmark, and the
// Tether/USDT coin) so they read as authentic, not flat monochrome glyphs.
// Brand marks sit on white chips because that's how the real logos are meant to
// be shown and how they stay legible on dark backgrounds.

type Method = "mastercard" | "card" | "paypal" | "usdt";

const ALL: Method[] = ["mastercard", "card", "paypal", "usdt"];

export function MastercardLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} role="img" aria-label="Mastercard">
      <circle cx="12" cy="10" r="8" fill="#EB001B" />
      <circle cx="20" cy="10" r="8" fill="#F79E1B" />
      {/* orange overlap lens of the two rings */}
      <path d="M16 3.6a7.99 7.99 0 0 0 0 12.8 7.99 7.99 0 0 0 0-12.8z" fill="#FF5F00" />
    </svg>
  );
}

export function CardLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} role="img" aria-label="Credit / debit card">
      <rect x="1" y="2.5" width="30" height="15" rx="2.5" fill="#1e3a8a" />
      <rect x="1" y="5.5" width="30" height="3.6" fill="#0b1e4d" />
      <rect x="24" y="7" width="5" height="3.6" rx="0.8" fill="#fbbf24" />
      <rect x="4" y="12" width="8" height="2.4" rx="1" fill="#93c5fd" />
      <rect x="15" y="12" width="4" height="2.4" rx="1" fill="#60a5fa" />
    </svg>
  );
}

export function PayPalWordmark({ className = "text-[15px]" }: { className?: string }) {
  return (
    <span className={`font-black italic leading-none tracking-tight ${className}`} aria-label="PayPal">
      <span style={{ color: "#253B80" }}>Pay</span>
      <span style={{ color: "#179BD7" }}>Pal</span>
    </span>
  );
}

export function UsdtLogo({
  coinClass = "w-5 h-5 text-[12px]",
  textClass = "text-[12px]",
}: {
  coinClass?: string;
  textClass?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1" aria-label="USDT (Tether)">
      <span className={`inline-flex items-center justify-center rounded-full bg-[#26A17B] text-white font-black leading-none ${coinClass}`}>
        ₮
      </span>
      <span className={`text-[#26A17B] font-black leading-none ${textClass}`}>USDT</span>
    </span>
  );
}

function Logo({ m }: { m: Method }) {
  switch (m) {
    case "mastercard":
      return <MastercardLogo />;
    case "card":
      return <CardLogo />;
    case "paypal":
      return <PayPalWordmark />;
    case "usdt":
      return <UsdtLogo />;
    default:
      return null;
  }
}

export default function PaymentIcons({
  methods = ALL,
  className = "",
  chipClass = "h-8",
}: {
  methods?: Method[];
  className?: string;
  chipClass?: string;
}) {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {methods.map((m) => (
        <span
          key={m}
          className={`inline-flex items-center justify-center bg-white rounded-md shadow-sm ring-1 ring-black/5 px-2 ${chipClass}`}
        >
          <Logo m={m} />
        </span>
      ))}
    </div>
  );
}
