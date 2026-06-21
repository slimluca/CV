import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/ui";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Crea CV online e controlla ATS | creailcv.it",
    template: "%s | creailcv.it",
  },
  description:
    "Crea un CV italiano moderno, controlla la compatibilità ATS e prepara lettera ed email di candidatura.",
  alternates: { canonical: siteUrl },
  openGraph: { siteName: "creailcv.it", locale: "it_IT", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={manrope.variable}>
      <body className="flex min-h-screen flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "creailcv.it",
            url: siteUrl,
            logo: `${siteUrl}/brand/creailcv-favicon.png`,
            description:
              "Strumenti online per creare e migliorare candidature professionali in italiano.",
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
