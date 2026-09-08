import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { CartProvider } from "./components/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buy Cheap Windows 11 & Office 2021 Keys | Official Keys Hub - 90% Off",
  description: "Buy genuine Windows 11 Pro, Office 2021, and Microsoft software keys up to 90% off. Instant delivery, lifetime license, 30-day money-back guarantee. Trusted by 50,000+ customers. From $12.99.",
  keywords: [
    "cheap windows 11 pro key",
    "buy windows 11 license",
    "cheap office 2021 key",
    "buy microsoft office",
    "windows 10 product key cheap",
    "windows 11 activation key",
    "genuine windows 11 key",
    "office 2021 professional plus key",
    "cheap microsoft keys",
    "windows office bundle",
    "genuine microsoft keys",
    "microsoft license reseller",
    "windows 11 oem key",
    "windows 10 pro license",
    "office 365 cheap",
    "microsoft product keys cheap",
    "buy windows key online",
    "legitimate windows key",
    "office 2019 activation key",
    "windows server 2022 license",
    "visio professional 2021",
    "project professional 2021",
    "sql server license",
    "visual studio 2022 key",
    "kaspersky total security",
    "norton 360 cheap",
    "bitdefender license",
    "authentic windows key",
    "verified microsoft reseller",
    "instant delivery windows key",
    "lifetime windows license"
  ],
  authors: [{ name: "Official Keys Hub" }],
  openGraph: {
    title: "Buy Cheap Windows 11 & Office 2021 Keys - Up to 90% Off | Official Keys Hub",
    description: "Genuine Microsoft software keys at unbeatable prices. Windows 11 Pro from $19.99, Office 2021 from $29.99. Instant delivery, lifetime license, 30-day guarantee.",
    type: "website",
    locale: "en_US",
    siteName: "Official Keys Hub",
    url: "https://officialkeyshub.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Cheap Windows 11 & Office 2021 Keys - Official Keys Hub",
    description: "Genuine Microsoft software keys up to 90% off. Instant delivery, lifetime license, 30-day guarantee.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className={inter.className}>
        <CartProvider>
        {/* Schema Markup for SEO */}
        <Script id="schema-organization" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Official Keys Hub",
            "description": "Trusted Microsoft software license provider offering genuine Windows, Office, Server, and security software keys at discounted prices",
            "url": "https://officialkeyshub.com",
            "logo": "https://officialkeyshub.com/logo.png",
            "image": "https://officialkeyshub.com/og-image.png",
            "priceRange": "$$",
            "telephone": "+1-601-975-6129",
            "email": "digitalkeyhubllc@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
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
            "url": "https://officialkeyshub.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://officialkeyshub.com/#products",
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
