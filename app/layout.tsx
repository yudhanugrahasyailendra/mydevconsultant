import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Preloader from "./components/Preloader";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyDEV — Jasa Pembuatan Website",
  description: "Jasa Pembuatan Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${jetbrainsMono.variable} ${manrope.variable}`}
    >
      <body suppressHydrationWarning>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
