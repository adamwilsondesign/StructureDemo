import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import NavChrome from "@/components/NavChrome";
import ScrollWash from "@/components/ScrollWash";
import BpGrid from "@/components/BpGrid";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScarcityPill from "@/components/ScarcityPill";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Structure — Agentic design systems for startups",
  description:
    "Two-week sprints that turn your brand and product into an agentic design system. Engineers ship higher quality. Sales and marketing stay on brand. Flat $50k.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Preloader />
        <ScrollWash />
        <BpGrid />
        <SiteHeader />
        <NavChrome />
        <main className="flex-1">{children}</main>
        <ScarcityPill />
        <Footer />
      </body>
    </html>
  );
}
