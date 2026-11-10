"use client";

import { useEffect } from "react";

/**
 * Reconstructed from chunk-layout.js module 88695 / scroll-wash.min.js.
 * Paints a scroll-linked gradient on `.scroll-wash` through the `.opp` section
 * and sets `html[data-opp=dark|light]` from luminance near the viewport top.
 */

const PAGE: [number, number, number] = [231, 240, 251];
const BLUE: [number, number, number] = [14, 118, 255];
const DEEP: [number, number, number] = [7, 32, 88];

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function smoothstep(n: number) {
  const t = clamp01(n);
  return t * t * (3 - 2 * t);
}

function mix(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function rgb(c: [number, number, number]) {
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

function colorAtOppProgress(
  opp: Element | null,
  sampleY: number,
  vh: number,
): [number, number, number] {
  if (!opp) return PAGE;
  const rect = opp.getBoundingClientRect();
  const start = 1.05 * vh;
  const end = 0.72 * vh - (opp as HTMLElement).offsetHeight;
  const p = clamp01((start - rect.top) / (start - end));
  if (p <= 0 || p >= 1) return PAGE;
  // sampleY is unused in original for the progress calc — progress is from
  // opp rect only; the wash samples many Y positions with the same function.
  void sampleY;
  const wave =
    p < 0.34 ? smoothstep(p / 0.34) : p < 0.68 ? 1 : 1 - smoothstep((p - 0.68) / 0.32);
  const t = clamp01(wave);
  return t < 0.42
    ? mix(PAGE, BLUE, smoothstep(t / 0.42))
    : mix(BLUE, DEEP, smoothstep((t - 0.42) / 0.58));
}

export default function ScrollWash() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".scroll-wash");
    if (!el) return;

    let raf = 0;

    const paint = () => {
      raf = 0;
      const vh = window.innerHeight;
      const opp = document.querySelector(".opp");

      const sample = (y: number) => colorAtOppProgress(opp, y, vh);
      const top = sample(28);
      const bottom = sample(vh - 1);
      const isFlat = (c: [number, number, number]) =>
        c[0] === PAGE[0] && c[1] === PAGE[1] && c[2] === PAGE[2];

      if (isFlat(top) && isFlat(bottom)) {
        if (el.dataset.flat !== "1") {
          el.style.background = "#e7f0fb";
          el.dataset.flat = "1";
        }
      } else {
        el.dataset.flat = "0";
        const stops = Array.from({ length: 25 }, (_, i) => {
          const c = sample((vh * i) / 24);
          return `${rgb(c)} ${((i / 24) * 100).toFixed(2)}%`;
        });
        el.style.background = `linear-gradient(180deg, ${stops.join(", ")})`;
      }

      const lum = 0.3 * top[0] + 0.55 * top[1] + 0.15 * top[2];
      document.documentElement.dataset.opp = lum < 150 ? "dark" : "light";
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
      delete document.documentElement.dataset.opp;
    };
  }, []);

  return <div className="scroll-wash" aria-hidden />;
}
