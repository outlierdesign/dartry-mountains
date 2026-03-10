import type { Metadata } from "next";
import StoryblokProvider from "@/components/StoryblokProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/shared/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dartry Mountains — Conservation & Responsible Tourism | Sligo & Leitrim",
    template: "%s | Dartry Mountains",
  },
  description:
    "Discover the Dartry Mountains, a Special Protection Area (SPA) and Special Area of Conservation (SAC) in Counties Sligo and Leitrim. Home to protected chough and peregrine falcon habitats, rare grasslands, and a rich hill-farming heritage. Visit responsibly.",
  metadataBase: new URL("https://dartrymountains.ie"),
  keywords: [
    "Dartry Mountains",
    "Benbulben",
    "responsible tourism Ireland",
    "chough conservation",
    "Special Protection Area",
    "Special Area of Conservation",
    "Sligo mountains",
    "Leitrim mountains",
    "hill farming Ireland",
    "protected habitats Ireland",
    "peregrine falcon Ireland",
    "species-rich grassland",
    "peatland conservation",
    "EU Birds Directive",
    "EU Habitats Directive",
    "Leave No Trace Ireland",
    "BirdWatch Ireland",
    "NPWS Ireland",
    "ecotourism Ireland",
    "wildlife conservation Ireland",
  ],
  authors: [{ name: "Dartry Mountains Conservation" }],
  openGraph: {
    type: "website",
    locale: "en_IE",
    siteName: "Dartry Mountains",
    title: "Dartry Mountains — Conservation & Responsible Tourism",
    description:
      "An iconic mountain range in Sligo & Leitrim, Ireland. Protected habitats for chough and peregrine falcon, rare grasslands, and a rich hill-farming heritage.",
    url: "https://dartrymountains.ie",
    images: [
      {
        url: "/images/landscapes/benbulben.jpg",
        width: 1200,
        height: 630,
        alt: "Benbulben and the Dartry Mountains landscape",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dartry Mountains — Conservation & Responsible Tourism",
    description:
      "An iconic mountain range in Sligo & Leitrim. Protected habitats, rare wildlife, and a rich farming heritage.",
  },
  alternates: {
    canonical: "https://dartrymountains.ie",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Epilogue:wght@300;400;500;600;700&family=Cambo&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <StoryblokProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <JsonLd />
        </StoryblokProvider>
      </body>
    </html>
  );
}
