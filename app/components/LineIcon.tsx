// One consistent set of thin line icons (24px grid, 1.75 stroke, round caps)
// for the homepage hero and best sellers, instead of mixed icon-font glyphs.

export type LineIconName = "mail" | "shieldCheck" | "refund" | "bolt" | "arrowRight" | "windows" | "card" | "lock";

const PATHS: Record<Exclude<LineIconName, "windows">, React.ReactNode> = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  shieldCheck: (
    <>
      <path d="M12 21.5s7.5-3.2 7.5-9.6V5.6L12 2.75 4.5 5.6v6.3c0 6.4 7.5 9.6 7.5 9.6Z" />
      <path d="m8.75 11.75 2.25 2.25 4.25-4.5" />
    </>
  ),
  refund: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5" />
      <path d="M3.5 3.75V8.5h4.75" />
      <path d="M12 8v4.25l2.75 1.75" />
    </>
  ),
  bolt: <path d="M13.25 2.75 4.75 13.5H12l-1.25 7.75 8.5-10.75H12l1.25-7.75Z" />,
  arrowRight: (
    <>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </>
  ),
  card: (
    <>
      <rect x="2.75" y="5.25" width="18.5" height="13.5" rx="2.5" />
      <path d="M2.75 9.75h18.5M6.5 15h3.5" />
    </>
  ),
  lock: (
    <>
      <rect x="4.75" y="10.5" width="14.5" height="10" rx="2.25" />
      <path d="M8 10.5V7.75a4 4 0 0 1 8 0v2.75" />
    </>
  ),
};

export default function LineIcon({ name, className = "h-5 w-5" }: { name: LineIconName; className?: string }) {
  if (name === "windows") {
    // Four-pane window glyph (filled), used next to "Activates on Microsoft".
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
        <rect x="3" y="3" width="8.25" height="8.25" rx="1" />
        <rect x="12.75" y="3" width="8.25" height="8.25" rx="1" />
        <rect x="3" y="12.75" width="8.25" height="8.25" rx="1" />
        <rect x="12.75" y="12.75" width="8.25" height="8.25" rx="1" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}
