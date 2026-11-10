import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
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
        <SiteHeader />
        <main>{children}</main>
        <ScarcityPill />
        <footer className="site-footer">
          <div className="site-footer-inner">
            <span>Structure.studio</span>
            <span>© 2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
