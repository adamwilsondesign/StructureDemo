"use client";

import { useEffect, useRef } from "react";
import Mark3D, { type Mark3DHandle } from "./Mark3D";

/**
 * Reconstructed from chunk-page.js module 89833.
 * Scroll-scrubbed per-character opacity + per-word color + 3D mark tilt.
 */

const COPY =
  "Design is still the slowest part of a fast company. A system engineering, sales, and marketing all share is how that changes. Two weeks from now, it can be yours.";

const MUTED: [number, number, number] = [186, 198, 212];
const WHITE: [number, number, number] = [255, 255, 255];

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function smoothstep(n: number) {
  const t = clamp01(n);
  return t * t * (3 - 2 * t);
}

export default function Opportunity() {
  const sectionRef = useRef<HTMLElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const markWrapRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<Mark3DHandle>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const block = blockRef.current;
    const copy = copyRef.current;
    const head = headRef.current;
    if (!section || !block || !copy || !head) return;

    const chars = [...copy.querySelectorAll<HTMLElement>(".opp-ch")];
    const words = [...copy.querySelectorAll<HTMLElement>(".opp-word")];
    const charCount = chars.length;
    const wordCount = words.length;
    let raf = 0;

    const paint = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = 1.05 * vh;
      const end = 0.72 * vh - section.offsetHeight;
      const h = clamp01((start - rect.top) / (start - end));

      const charStep = charCount > 1 ? (0.42 - 0.028) / (charCount - 1) : 0;
      for (let i = 0; i < charCount; i++) {
        chars[i].style.opacity = smoothstep(
          (h - (0.08 + i * charStep)) / 0.028,
        ).toFixed(3);
      }

      const wordStep =
        wordCount > 1 ? (0.68 - 0.48 - 0.05) / (wordCount - 1) : 0;
      for (let i = 0; i < wordCount; i++) {
        const t = smoothstep((h - (0.48 + i * wordStep)) / 0.05);
        const c = [
          Math.round(MUTED[0] + (WHITE[0] - MUTED[0]) * t),
          Math.round(MUTED[1] + (WHITE[1] - MUTED[1]) * t),
          Math.round(MUTED[2] + (WHITE[2] - MUTED[2]) * t),
        ];
        words[i].style.color = `rgb(${c[0]},${c[1]},${c[2]})`;
      }

      const fadeOut = 1 - smoothstep((h - 0.7) / 0.16);
      head.style.opacity = (
        smoothstep((h - 0.1) / 0.08) * fadeOut
      ).toFixed(3);
      block.style.opacity = fadeOut.toFixed(3);

      const tilt = clamp01((h - 0.08) / 0.6);
      if (markWrapRef.current) {
        markWrapRef.current.style.opacity = (
          0.4 * smoothstep((h - 0.06) / 0.18)
        ).toFixed(3);
      }
      const pitch = 0.16 + 0.34 * Math.sin(tilt * Math.PI);
      markRef.current?.frame(tilt * Math.PI, 0, pitch);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const words = COPY.split(" ");

  return (
    <section ref={sectionRef} className="opp">
      <div className="opp-pin">
        <div ref={blockRef} className="opp-block">
          <div ref={headRef} className="opp-head">
            <span>The opportunity of a generation</span>
          </div>
          <p ref={copyRef} className="opp-copy" aria-label={COPY}>
            {words.map((word, wi) => (
              <span key={`${word}-${wi}`}>
                <span className="opp-word">
                  {Array.from(word).map((ch, ci) => (
                    <span key={ci} className="opp-ch">
                      {ch}
                    </span>
                  ))}
                </span>
                {wi < words.length - 1 ? " " : null}
              </span>
            ))}
          </p>
          <div ref={markWrapRef} className="opp-mark">
            <Mark3D ref={markRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
