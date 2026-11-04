import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#fafaf9] text-[#0f0f0f]">
        <header className="border-b border-[#e5e5e4]">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-lg font-medium tracking-tight">
              Structure
            </Link>
            <nav className="flex items-center gap-8 text-sm">
              <Link href="/process" className="hover:opacity-70">
                Process
              </Link>
              <Link href="/pricing" className="hover:opacity-70">
                Pricing
              </Link>
              <Link href="/about" className="hover:opacity-70">
                About
              </Link>
              <Link
                href="/contact"
                className="bg-[#0f0f0f] text-white px-4 py-2 rounded-full text-sm hover:opacity-90"
              >
                Reserve a sprint
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#e5e5e4] mt-24">
          <div className="max-w-5xl mx-auto px-6 py-10 text-sm text-[#6b6b6b] flex justify-between">
            <span>Structure.studio</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
