"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Reconstructed from chunk-layout.js module 66570 + live footer HTML.
 * Wordmark draw-in on IO; parallax translateY on `.wordmark-shift`.
 * Compact CTA omitted on `/contact`.
 */

export default function Footer() {
  const pathname = usePathname();
  const isContact = pathname === "/contact";
  const shiftRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const shift = shiftRef.current;
    if (!shift) return;
    const onScroll = () => {
      const rect = shift.getBoundingClientRect();
      const vh = window.innerHeight;
      const n = Math.min(1, Math.max(0, (0.96 * vh - rect.top) / (0.2 * vh)));
      const y = window.innerWidth < 800 ? 0 : (1 - n) * 8;
      shift.style.transform = `translateY(${y}%)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = clipRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setDrawn(true);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer className="site-footer">
      <div
        className={`max-w-[1200px] mx-auto px-6 pb-6 ${
          isContact ? "pt-8" : "pt-16 md:pt-24"
        }`}
      >
        {!isContact && (
          <div className="grid grid-cols-12 gap-8 items-end">
            <h2 className="col-span-12 md:col-span-6 text-[52px] md:text-[84px] text-white leading-[0.96]">
              Reserve a sprint.
            </h2>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <p className="text-[18px] leading-[1.4] text-white/90 mb-6 max-w-[36ch]">
                Two weeks. Flat $50k. The brand and the product become a system
                the team keeps.
              </p>
              <Link className="btn-light" href="/contact">
                Reserve a sprint
              </Link>
            </div>
          </div>
        )}

        <div
          className={`footer-meta pt-6 flex items-center justify-between gap-4 text-[11px] tracking-[0.12em] text-white/80 border-t border-dashed border-white/30 ${
            isContact ? "mt-2" : "mt-20"
          }`}
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:opacity-70 text-left"
          >
            BACK TO TOP
          </button>
          <span>© 2026 STRUCTURE STUDIO INC.</span>
        </div>
      </div>

      <div
        ref={clipRef}
        className={`wordmark-clip ${drawn ? "is-drawn" : ""}`}
      >
        <div ref={shiftRef} className="wordmark-shift">
          <div className="structure-word structure-wire" aria-hidden>
            Structure
          </div>
          <div className="structure-word structure-fill">Structure</div>
        </div>
      </div>
    </footer>
  );
}
