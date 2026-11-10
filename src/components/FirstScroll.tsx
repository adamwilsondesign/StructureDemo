"use client";

import { useEffect, useRef } from "react";

const OUTCOMES = [
  "Engineers ship",
  "Sales stay on brand",
  "You own the system",
] as const;

/** Editorial first scroll + quiet outcomes line; reveal once on seam. */
export default function FirstScroll() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          observer.disconnect();
        }
      },
      { threshold: 0.22 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="first-scroll reveal"
      aria-label="What the system does"
    >
      <div className="first-scroll-grid">
        <h2 className="first-scroll-headline font-display">
          Your brand and product, turned into a system your team can actually
          use.
        </h2>
        <div className="first-scroll-body">
          <p>
            Engineers ship with tokens, Code Connect, and specs already decided.
            Sales and marketing generate on-brand material without a queue. We
            leave. You keep the files.
          </p>
          <p className="outcomes-line" aria-label="Outcomes">
            {OUTCOMES.map((label, i) => (
              <span key={label} className="outcome">
                {i > 0 ? <span className="outcome-sep" aria-hidden="true" /> : null}
                {label}
              </span>
            ))}
            <span className="outcomes-rule" aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  );
}
