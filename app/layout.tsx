import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: {
    default: "VyhodaDeal — Найкращі пропозиції. Щодня.",
    template: "%s | VyhodaDeal",
  },
  description: "Вигідні пропозиції та знижки для України щодня",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "VyhodaDeal",
  },
  appleWebApp: {
    capable: true,
    title: "VyhodaDeal",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
