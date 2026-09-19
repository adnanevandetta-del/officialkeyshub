import type { Metadata, Viewport } from "next";
import { Inter, STIX_Two_Text } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Script from "next/script";
import { CartProvider } from "./components/CartContext";

const inter = Inter({ subsets: ["latin"] });

// Mathematical Bold Italic display font (scientific/math typesetting serif),
// self-hosted via next/font and applied to headings in globals.css.
const stixMath = STIX_Two_Text({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["italic", "normal"],
  variable: "--font-math",
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
  title: "Official Keys Hub | Genuine Microsoft Windows & Office Licenses",
  description: "Official Keys Hub is a digital software reseller offering Windows, Microsoft Office, Windows Server and security software licenses. Instant delivery, activation support and a 30-day money-back guarantee.",
  keywords: [
    "buy windows 11 license",
    "buy microsoft office",
    "windows 11 activation key",
    "genuine windows 11 key",
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
    url: "https://www.officialkeyshub.com",
  },
  twitter: {
    card: "summary_large_image",
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
    <html lang="en" className={`scroll-smooth ${stixMath.variable}`}>
      <head>
        <meta name="theme-color" content="#0369a1" />
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="sG23QnRZt0jwlqElmdDi6H0SfVOqBFkGJllZlzgBFtk" />
      </head>
      <body className={inter.className}>
        <CartProvider>
        {/* Schema Markup for SEO */}
        <Script id="schema-organization" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Official Keys Hub",
            "description": "Digital software reseller offering genuine Windows, Office, Server, and security software licenses with instant delivery and activation support",
            "url": "https://www.officialkeyshub.com",
            "logo": "https://www.officialkeyshub.com/logo.png",
            "image": "https://www.officialkeyshub.com/og-image.png",
            "priceRange": "$$",
            "telephone": "+1-601-975-6129",
            "email": "digitalkeyhubllc@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Kungsgatan 8",
              "addressLocality": "Stockholm",
              "postalCode": "111 43",
              "addressCountry": "SE"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "5000",
              "bestRating": "5",
              "worstRating": "1"
            },
            "sameAs": [
              "https://wa.me/16019756129"
            ]
          })}
        </Script>
        
        <Script id="schema-website" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Official Keys Hub",
            "url": "https://www.officialkeyshub.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.officialkeyshub.com/#products",
              "query-input": "required name=search_term_string"
            }
          })}
        </Script>

        {children}
        </CartProvider>
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-150ZZZL2J8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-150ZZZL2J8');
          `}
        </Script>
      </body>
    </html>
  );
}
