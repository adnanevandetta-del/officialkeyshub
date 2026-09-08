import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import ProductBillboard from "./components/ProductBillboard";
import Products from "./components/Products";
import MovingProductShowcase from "./components/MovingProductShowcase";
import TrustBadges from "./components/TrustBadges";
import CustomerReviews from "./components/CustomerReviews";
import ActivationGuideSection from "./components/ActivationGuideSection";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <CategoryBar />
      <ProductBillboard />
      <Products />
      <MovingProductShowcase />
      <TrustBadges />
      <Footer />
      <CustomerReviews />
      <ActivationGuideSection />
      <WhatsAppButton />
    </>
  );
}
