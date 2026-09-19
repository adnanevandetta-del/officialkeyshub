import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Reviews | Official Keys Hub",
  description:
    "Share your experience with Official Keys Hub — genuine Windows and Office keys, fast delivery and a 30-day money-back guarantee. Bought from us? Leave a review.",
  alternates: { canonical: "https://www.officialkeyshub.com/reviews" },
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
