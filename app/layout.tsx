import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./fa-swap.css";
import Script from "next/script";
import { CartProvider } from "./components/CartContext";

// Plus Jakarta Sans — one elegant, modern sans for headings and body text,
// bundled in the repo (OFL-1.1, variable weights) instead of fetched from
// Google Fonts at build time, which broke production builds in Nov 2026.
// Exposed as --font-sans for globals.css.
const jakarta = localFont({
  src: "./fonts/PlusJakartaSans-latin-var.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#05060b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.officialkeyshub.com"),
  title: "Buy Genuine Windows & Office Keys | Official Keys Hub",
  description: "Buy genuine Microsoft Windows 11, Office 2024 and Windows Server keys. Instant email delivery, activation support and a 30-day money-back guarantee.",
  keywords: [
    "buy windows 11 license",
    "buy microsoft office",
    "windows 11 activation key",
    "genuine windows 11 key",
    "office 2024 professional plus key",
    "office 2021 professional plus key",
    "windows office bundle",
    "genuine microsoft keys",
    "microsoft license reseller",
    "windows 11 oem key",
    "windows 10 pro license",
    "buy windows key online",
    "legitimate windows key",
    "office 2019 activation key",
    "windows server 2022 license",
    "visio professional 2021",
    "project professional 2021",
    "sql server license",
    "visual studio 2022 key",
    "kaspersky total security",
    "bitdefender license",
    "authentic windows key",
    "verified microsoft reseller",
    "instant delivery windows key",
    "lifetime windows license",
    "windows 11 pro product key",
    "buy windows 10 key",
    "windows 11 home key",
    "office 2021 product key",
    "microsoft office 2021 professional plus",
    "buy office 2021 key",
    "office 365 product key",
    "how to activate office 2021",
    "how to activate windows 11",
    "transfer windows license to new pc",
    "oem vs retail windows key"
  ],
  authors: [{ name: "Official Keys Hub" }],
  openGraph: {
    title: "Official Keys Hub | Genuine Microsoft Windows & Office Licenses",
    description: "Genuine Windows, Office and Microsoft software licenses at competitive prices. Instant delivery, lifetime licensing and a 30-day money-back guarantee.",
    type: "website",
    locale: "en_US",
    siteName: "Official Keys Hub",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Official Keys Hub - genuine Microsoft Windows & Office licenses" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
    title: "Official Keys Hub | Genuine Microsoft Windows & Office Licenses",
    description: "Genuine Windows, Office and Microsoft software licenses. Instant delivery, lifetime licensing and a 30-day money-back guarantee.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${jakarta.variable}`}>
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="sG23QnRZt0jwlqElmdDi6H0SfVOqBFkGJllZlzgBFtk" />
        
      </head>
      <body className={jakarta.className}>
        {/* Google Analytics - G-DQJRSHQN1M */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DQJRSHQN1M"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DQJRSHQN1M');
          `}
        </Script>
        <CartProvider>
        {/* Schema Markup for SEO (plain JSON-LD, rendered into the HTML for crawlers) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "Official Keys Hub",
              "description": "Digital software reseller offering genuine Windows, Office, Server, and security software licenses with instant delivery and activation support",
              "url": "https://www.officialkeyshub.com",
              "logo": "https://www.officialkeyshub.com/logo.png",
              "image": "https://www.officialkeyshub.com/og-image.jpg",
              "foundingDate": "2025",
              "priceRange": "$$",
              "telephone": "+1-601-975-6129",
              "email": "officialkeyshub@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://wa.me/16019756129"
              ]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Official Keys Hub",
              "url": "https://www.officialkeyshub.com"
            }),
          }}
        />

        {children}
        </CartProvider>
      </body>
    </html>
  );
}
