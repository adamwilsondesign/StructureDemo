"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

/**
 * Reconstructed from chunk-page.js module 78010 + live logo-sheet HTML.
 * NOTE: live deploy reused /logos/openai.png as a placeholder for every mark.
 */

const LOGO_SRC = "/logos/openai.png";

function LogoRow({ fade = false, index }: { fade?: boolean; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`logo-row ${inView ? "is-in" : ""} ${fade ? "is-fade" : ""}`}
      style={{
        animationDelay: `${160 * index}ms`,
        ...(fade
          ? {
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
            }
          : {}),
      }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-center">
          <img src={LOGO_SRC} alt="" className="logo-mark" />
        </div>
      ))}
    </div>
  );
}

export default function LogoSheet() {
  return (
    <section className="pt-8 pb-28 md:pt-16 md:pb-40">
      <Reveal delay={0}>
        <p className="text-center text-[11px] tracking-[0.2em] uppercase text-muted mb-14 px-6">
          Deploying design for
        </p>
      </Reveal>
      <div className="logo-sheet">
        <LogoRow index={0} />
        <LogoRow index={1} />
        <LogoRow index={2} />
        <LogoRow index={3} fade />
      </div>
    </section>
  );
}
