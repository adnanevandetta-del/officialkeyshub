import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import PromoBanner from "./components/PromoBanner";
import FeatureBar from "./components/FeatureBar";
import ProductBillboard from "./components/ProductBillboard";
import Products from "./components/Products";
import MovingProductShowcase from "./components/MovingProductShowcase";
import TrustBadges from "./components/TrustBadges";
import CustomerReviews from "./components/CustomerReviews";
import ActivationGuideSection from "./components/ActivationGuideSection";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

// Canonical for the homepage only — set per page (not in the root layout) so it is
// not inherited by every other page.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <PromoBanner />
      <Navbar />
      <FeatureBar />
      <ProductBillboard />
      <Products />
      <MovingProductShowcase />
      <TrustBadges />
      <CustomerReviews />
      <ActivationGuideSection />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
