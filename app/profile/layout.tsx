import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | Official Keys Hub",
  description: "Manage your Official Keys Hub account, orders and reviews.",
  robots: { index: false, follow: true },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
