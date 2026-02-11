import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Roboto_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SparkleTrail from "@/components/SparkleTrail";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SYRENA CHOCOLATE — Journal & Shop",
  description: "A chocolate journal and curated shop by Syrena Chocolate. Stories, craft, and fine chocolate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${ebGaramond.variable} ${robotoMono.variable} antialiased`}>
        <SparkleTrail />
        {children}
      </body>
    </html>
  );
}
