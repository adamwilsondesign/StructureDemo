"use client";

import { useEffect, useRef } from "react";
import Mark3D, { type Mark3DHandle } from "./Mark3D";

/**
 * Reconstructed from chunk-page.js module 54117.
 * One-shot mark draw-in when ≥55% visible; marquee logos (placeholder src).
 */

const LOGO_SRC = "/logos/openai.png";
const LOGO_SLOTS = Array.from({ length: 8 }, (_, i) => i);

function easeOutCubic(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - x, 3);
}

export default function Journey() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<Mark3DHandle>(null);
  const playedRef = useRef(false);
  const logos = [...LOGO_SLOTS, ...LOGO_SLOTS];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;

    markRef.current?.frame(-1.05, 0, 0.5);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || playedRef.current) return;
        playedRef.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const n = (now - start) / 1700;
          const yawEase = easeOutCubic(n / 0.72);
          const solidEase = easeOutCubic((n - 0.46) / 0.54);
          markRef.current?.frame(
            -1.05 + 1.05 * yawEase,
            solidEase,
            0.5 * (1 - yawEase),
          );
          if (n < 1) raf = requestAnimationFrame(tick);
        };
        markRef.current?.frame(-1.05, 0, 0.5);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.55 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="journey">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-12 gap-y-10">
        <div className="col-span-12 md:col-span-2">
          <div ref={wrapRef} className="journey-mark-wrap">
            <Mark3D ref={markRef} className="journey-mark" />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-5">
          <h2 className="text-[40px] md:text-[56px] leading-[1.02] tracking-[-0.03em]">
            Your journey is short because ours was long.
          </h2>
          <p className="mt-6 text-[17px] leading-[1.55] text-muted max-w-[42ch]">
            Our speed isn’t driven by luck. It’s a decade of shipping product
            together, for startups and companies that already had a brand in
            motion. We know which decisions to lock, and which ones to hand to
            the team.
          </p>
        </div>
      </div>
      <div className="journey-logos" aria-hidden>
        <div className="journey-track">
          {logos.map((_, i) => (
            <img key={i} src={LOGO_SRC} alt="" className="journey-logo" />
          ))}
        </div>
      </div>
    </section>
  );
}
