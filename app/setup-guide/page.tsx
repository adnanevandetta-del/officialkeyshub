import Navbar from "../components/Navbar";
import SetupGuide from "../components/SetupGuide";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.officialkeyshub.com/setup-guide" },
  title: "Product Key Activation Guide | Official Keys Hub",
  description:
    "Step-by-step activation guide for your Microsoft product keys. Activate Windows 11, Windows 10, Office and Windows Server in minutes, with 24/7 support.",
  keywords:
    "windows 11 activation, office 2021 activation, how to activate windows key, product key setup, windows server activation, microsoft key activation guide",
  openGraph: {
    images: [{ url: "https://www.officialkeyshub.com/og-image.jpg", width: 1200, height: 630, alt: "Official Keys Hub — genuine Microsoft Windows & Office licenses" }],
    title: "Microsoft Product Key Activation Guide | Official Keys Hub",
    description:
      "Complete activation guide for Windows and Office product keys. Easy 5-minute setup with step-by-step instructions.",
    url: "https://www.officialkeyshub.com/setup-guide",
    type: "website",
  },
};

export default function SetupGuidePage() {
  return (
    <>
      <Navbar />
      <SetupGuide />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
