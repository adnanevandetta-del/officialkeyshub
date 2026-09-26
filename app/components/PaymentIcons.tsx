// Accepted-payment badges drawn as their real brand logos (Mastercard's
// two-ring mark, a generic bank card, the PayPal two-tone wordmark, and the
// Tether/USDT coin) so they read as authentic, not flat monochrome glyphs.
//
// By default the logos render bare (compact, no chip). Pass `chip` to sit each
// logo on a white rounded chip — only needed on dark backgrounds where the
// coloured marks would otherwise lose contrast.

type Method = "mastercard" | "card" | "paypal" | "usdt";
type Size = "sm" | "lg";

const ALL: Method[] = ["mastercard", "card", "paypal", "usdt"];

const SVG_H: Record<Size, string> = { sm: "h-[18px] w-auto", lg: "h-7 w-auto" };
const PP_T: Record<Size, string> = { sm: "text-[14px]", lg: "text-2xl" };
const USDT_COIN: Record<Size, string> = { sm: "w-[18px] h-[18px] text-[11px]", lg: "w-7 h-7 text-base" };
const USDT_TXT: Record<Size, string> = { sm: "text-[11px]", lg: "text-base" };

export function MastercardLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} role="img" aria-label="Mastercard">
      <circle cx="12" cy="10" r="8" fill="#EB001B" />
      <circle cx="20" cy="10" r="8" fill="#F79E1B" />
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

function Logo({ m, size }: { m: Method; size: Size }) {
  switch (m) {
    case "mastercard":
      return <MastercardLogo className={SVG_H[size]} />;
    case "card":
      return <CardLogo className={SVG_H[size]} />;
    case "paypal":
      return <PayPalWordmark className={PP_T[size]} />;
    case "usdt":
      return <UsdtLogo coinClass={USDT_COIN[size]} textClass={USDT_TXT[size]} />;
    default:
      return null;
  }
}

export default function PaymentIcons({
  methods = ALL,
  className = "",
  chip = false,
  size = "sm",
}: {
  methods?: Method[];
  className?: string;
  chip?: boolean;
  size?: Size;
}) {
  return (
    <div className={`flex items-center gap-2.5 flex-wrap ${className}`}>
      {methods.map((m) => {
        const logo = <Logo m={m} size={size} />;
        return chip ? (
          <span
            key={m}
            className={`inline-flex items-center justify-center bg-white rounded-md shadow-sm ring-1 ring-black/5 px-2 ${size === "lg" ? "h-11" : "h-8"}`}
          >
            {logo}
          </span>
        ) : (
          <span key={m} className="inline-flex items-center">
            {logo}
          </span>
        );
      })}
    </div>
  );
}
