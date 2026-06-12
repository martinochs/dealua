import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: {
    default: "DealUA — Найкращі пропозиції для України",
    template: "%s | DealUA",
  },
  description: "Спільнота найкращих пропозицій та знижок для України",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "DealUA",
  },
  appleWebApp: {
    capable: true,
    title: "DealUA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
