import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Microsoft Software Guides | Official Keys Hub",
  description:
    "Expert guides on activating Windows and Office, buying genuine keys safely, comparing licenses and the law on software resale.",
  alternates: { canonical: "https://www.officialkeyshub.com/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
