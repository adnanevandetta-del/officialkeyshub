import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Reviews | Official Keys Hub",
  description:
    "Real customer reviews of Official Keys Hub — genuine Windows and Office keys, instant delivery, and support. Read what buyers say and leave your own review.",
  alternates: { canonical: "https://www.officialkeyshub.com/reviews" },
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
