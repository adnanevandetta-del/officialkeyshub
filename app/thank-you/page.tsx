import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThankYouContent from "./ThankYouContent";

// PayPal sends buyers here after paying (or cancelling). Not a search landing page.
export const metadata: Metadata = {
  title: "Thank You — Your Order Is Being Processed",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-20 max-w-2xl">
          <Suspense fallback={null}>
            <ThankYouContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
