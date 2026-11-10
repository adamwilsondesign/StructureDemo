"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Reconstructed from live HTML + chunk-page.js module 21448
 * (+ hero-slideshow.reconstructed.js constants).
 */

const SLIDES = [
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg",
];

const BARS = [
  { label: "ENGINEERS SHIP", width: "22%" },
  { label: "SALES STAY ON BRAND", width: "42%" },
  { label: "YOU OWN THE SYSTEM", width: "64%" },
];

const SLIDE_MS = 5000;
const BAR_STAGGER_S = 0.14;
const BARS_IO_THRESHOLD = 0.85;

function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      SLIDE_MS,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPlaying(true);
      },
      { threshold: BARS_IO_THRESHOLD },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1020]/35 via-transparent to-transparent" />
      <div
        ref={barsRef}
        className={`hero-bars ${playing ? "is-playing" : ""}`}
      >
        {BARS.map((bar, i) => (
          <div
            key={bar.label}
            className="hero-bar-clip"
            style={{ width: bar.width }}
          >
            <div
              className="hero-bar"
              style={{ animationDelay: `${BAR_STAGGER_S * i}s` }}
            >
              <span className="hero-bar-label">
                <span>→</span>
                <span>{bar.label}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      data-hero="true"
      className="relative h-[100svh] min-h-[640px] text-[#f3f3f3]"
    >
      <HeroSlideshow />
      <div className="hero-blueprint" />
      <div className="relative z-10 h-full max-w-[1200px] mx-auto px-6 flex flex-col justify-end pb-[220px]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8">
            <p
              className="rise-in text-[11px] tracking-[0.18em] uppercase mb-6 text-white/70"
              style={{ animationDelay: "80ms" }}
            >
              Agentic design systems
            </p>
            <h1
              className="rise-in text-[48px] md:text-[80px] text-white"
              style={{ animationDelay: "160ms" }}
            >
              Blazing fast design systems for startups
            </h1>
            <p
              className="rise-in mt-6 text-[17px] md:text-[18px] leading-[1.5] text-white/85 max-w-[40ch]"
              style={{ animationDelay: "280ms" }}
            >
              Two weeks. Flat $50k. Engineers ship higher quality. Sales and
              marketing stay on brand. You own the system.
            </p>
            <div
              className="rise-in mt-10 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "400ms" }}
            >
              <Link className="btn-primary" href="/contact">
                Reserve a sprint
              </Link>
              <Link className="btn-on-photo" href="/pricing">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
