import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: {
    default: "VygodaUA — Знаходимо вигоду разом",
    template: "%s | VygodaUA",
  },
  description: "Вигідні пропозиції та знижки для України щодня",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "VygodaUA",
  },
  appleWebApp: {
    capable: true,
    title: "VygodaUA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
