import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Official Keys Hub",
  description: "View your Official Keys Hub orders and licenses.",
  robots: { index: false, follow: true },
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
