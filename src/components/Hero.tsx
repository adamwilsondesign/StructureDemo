"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Magnetic from "./Magnetic";

/**
 * Elevated original hero — cool/blue still + caustic drift + stepped outcomes.
 * Keeps architecture / offer math / current headline; craft + motion first.
 */

const BARS = [
  { label: "ENGINEERS SHIP", width: "22%" },
  { label: "SALES STAY ON BRAND", width: "42%" },
  { label: "YOU OWN THE SYSTEM", width: "64%" },
] as const;

const BAR_STAGGER_S = 0.14;
const BARS_IO_THRESHOLD = 0.55;

function HeroMedia() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const [still, setStill] = useState<"a" | "b">("a");

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    // Optional sibling crossfade later in the session
    const swap = setTimeout(() => setStill("b"), 14000);
    return () => clearTimeout(swap);
  }, []);

  useEffect(() => {
    const el = mediaRef.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        el.style.setProperty("--px", x.toFixed(3));
        el.style.setProperty("--py", y.toFixed(3));
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={mediaRef} className="hero-media absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-still-a.jpg"
        alt=""
        className={`hero-still ${still === "a" ? "is-active" : ""}`}
        width={2400}
        height={1350}
        fetchPriority="high"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-still-b.jpg"
        alt=""
        className={`hero-still ${still === "b" ? "is-active" : ""}`}
        width={2400}
        height={1350}
      />
      <div className="hero-caustic" aria-hidden />
      <div className="hero-grain" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a14]/55 via-transparent to-[#050a14]/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050a14]/72 via-[#050a14]/28 to-transparent" />
    </div>
  );
}

function OutcomeBars() {
  const barsRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(0);

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

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % BARS.length);
    }, 2800);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div
      ref={barsRef}
      className={`hero-bars ${playing ? "is-playing" : ""}`}
      role="list"
      aria-label="Outcomes"
    >
      {BARS.map((bar, i) => (
        <div
          key={bar.label}
          className={`hero-bar-clip ${active === i ? "is-active" : ""}`}
          style={{ width: bar.width }}
          role="listitem"
        >
          <button
            type="button"
            className="hero-bar"
            style={{ animationDelay: `${BAR_STAGGER_S * i}s` }}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
          >
            <span className="hero-bar-label">
              <span aria-hidden>→</span>
              <span>{bar.label}</span>
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      data-hero="true"
      className="hero relative h-[100svh] min-h-[640px] text-[#f3f3f3]"
    >
      <HeroMedia />
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
              <Magnetic>
                <Link className="btn-primary" href="/contact">
                  Reserve a sprint
                </Link>
              </Magnetic>
              <Magnetic strength={8}>
                <Link className="btn-on-photo" href="/pricing">
                  See pricing
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
      <OutcomeBars />
    </section>
  );
}
