import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Microsoft Software Guides & Activation Tutorials | Official Keys Hub",
  description:
    "Expert guides on activating Windows and Office, buying genuine keys safely, license comparisons, and software licensing law — everything about Microsoft licensing.",
  alternates: { canonical: "https://www.officialkeyshub.com/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
