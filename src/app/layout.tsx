import type { Metadata } from "next";
import StoryblokProvider from "@/components/StoryblokProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Dartry Mountains",
    template: "%s | The Dartry Mountains",
  },
  description:
    "Discover the Dartry Mountains — a Special Protection Area and Special Area of Conservation in Counties Sligo and Leitrim, Ireland.",
  metadataBase: new URL("https://dartrymountains.ie"),
  openGraph: {
    type: "website",
    locale: "en_IE",
    siteName: "The Dartry Mountains",
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
        </StoryblokProvider>
      </body>
    </html>
  );
}
