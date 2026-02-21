import type { Metadata } from "next";
import SparkleTrail from "@/components/SparkleTrail";
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Roboto+Mono:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SparkleTrail />
        {children}
      </body>
    </html>
  );
}
