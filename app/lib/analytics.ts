// Thin wrapper around GA4's gtag (loaded in app/layout.tsx). Safe to call on the
// server or before gtag has loaded — it just does nothing.

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
