import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Official Keys Hub",
  description: "Sign in to your Official Keys Hub account to view your orders and licenses.",
  robots: { index: false, follow: true },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
