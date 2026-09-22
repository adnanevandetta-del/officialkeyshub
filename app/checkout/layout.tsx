import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Official Keys Hub",
  description: "Complete your Official Keys Hub order.",
  robots: { index: false, follow: true },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
