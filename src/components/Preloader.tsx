"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Brand-mark preloader — three slabs assemble, cool not gimmicky.
 * Skippable once ready; respects prefers-reduced-motion.
 */
export default function Preloader() {
  const [ready, setReady] = useState(false);
  const [gone, setGone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [skipHint, setSkipHint] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced.current) {
      setProgress(100);
      setReady(true);
      const t = setTimeout(() => setGone(true), 180);
      return () => clearTimeout(t);
    }

    let raf = 0;
    const start = performance.now();
    const DURATION = 1650;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setReady(true);
        setSkipHint(true);
        // Auto-dismiss after exit animation completes
        setTimeout(() => setGone(true), 980);
      }
    };

    raf = requestAnimationFrame(tick);

    // Unlock skip early once fonts/images have a chance to settle
    const early = setTimeout(() => setSkipHint(true), 700);

    document.documentElement.dataset.preload = "active";
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(early);
      delete document.documentElement.dataset.preload;
    };
  }, []);

  useEffect(() => {
    if (gone) {
      delete document.documentElement.dataset.preload;
      document.documentElement.dataset.preload = "done";
    }
  }, [gone]);

  if (gone) return null;

  const dismiss = () => {
    if (!ready && !skipHint) return;
    setGone(true);
  };

  return (
    <div
      className={`preloader ${ready ? "is-ready" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={!ready}
      onClick={dismiss}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
          e.preventDefault();
          dismiss();
        }
      }}
      tabIndex={0}
    >
      <div className="preloader-inner">
        <svg
          className="preloader-mark"
          viewBox="0 0 79 32"
          aria-hidden
        >
          <polygon
            className="preloader-slab s1"
            points="0,32 4,32 20,16 20,0 16,0 0,16"
          />
          <polygon
            className="preloader-slab s2"
            points="22,32 30,32 46,16 46,0 38,0 22,16"
          />
          <polygon
            className="preloader-slab s3"
            points="48,32 63,32 79,16 79,0 64,0 48,16"
          />
        </svg>
        <div className="preloader-word font-display">Structure</div>
        <div className="preloader-track" aria-hidden>
          <div
            className="preloader-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="preloader-meta">
          {ready || skipHint ? "Enter" : "Loading"}
          <span className="preloader-pct">{progress}%</span>
        </p>
      </div>
      <div className="preloader-grain" aria-hidden />
    </div>
  );
}
