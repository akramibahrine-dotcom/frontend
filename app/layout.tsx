import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PixelProvider } from "@/components/tracking/PixelProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CurrencyProvider } from "@/components/currency/CurrencyProvider";
import { getMetadataBase, getSiteOrigin } from "@/lib/site-url";
import "@/styles/globals.css";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: {
    template: "%s | بيت الصحة",
    default: "بيت الصحة - شاي عشبي بعناية يومية داخل السعودية",
  },
  description:
    "خلطات شاي عشبية مختارة بعناية للعناية اليومية. دفع عند الاستلام، توصيل داخل السعودية.",
  metadataBase: getMetadataBase(),
  openGraph: {
    siteName: "بيت الصحة - Baytseha",
    locale: "ar_SA",
    type: "website",
  },
  alternates: {
    canonical: getSiteOrigin(),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={ibmPlexArabic.variable}>
      <body className="min-h-screen flex flex-col font-arabic">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <PixelProvider />
        <CurrencyProvider />
      </body>
    </html>
  );
}
