import type { Metadata } from "next";
import SparkleTrail from "@/components/SparkleTrail";
import MeltedChocolateBg from "@/components/MeltedChocolateBg";
import "./globals.css";

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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <MeltedChocolateBg />
        <SparkleTrail />
        {children}
      </body>
    </html>
  );
}
