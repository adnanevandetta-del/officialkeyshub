import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IPTV Setup Guide | Complete Installation Instructions for All Devices",
  description: "Step-by-step IPTV setup guide for Firestick, Android TV, Smart TV, iPhone, Windows PC, and more. Easy 5-minute installation with 24/7 support.",
  keywords: "iptv setup, iptv installation, firestick iptv, iptv smarters pro, iptv guide, how to install iptv",
  openGraph: {
    title: "IPTV Setup Guide | Installation Instructions",
    description: "Complete setup guide for IPTV on all devices. Easy 5-minute installation with step-by-step instructions.",
    url: "https://iptvv.se/setup-guide",
    type: "website",
  },
};

export default function SetupGuidePage() {
  return (
    <>
      <Navbar />
      <Features />
      <Footer />
    </>
  );
}
