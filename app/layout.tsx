import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Preloader from "./components/Preloader";
import RouteLoader from "./components/RouteLoader";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home | MyDEV - Building Your Future",
  description: "Jasa Pembuatan Website & Aplikasi Digital Profesional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${inter.variable}`}
    >
      <body suppressHydrationWarning>
        <Preloader />
        <RouteLoader>{children}</RouteLoader>
      </body>
    </html>
  );
}
