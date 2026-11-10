"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Sticky bottom-left scarcity — frosted chrome + Contact CTA. */
export default function ScarcityPill() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const delay = reduced ? 0 : 900;
    const t = setTimeout(() => setInView(true), delay);
    return () => clearTimeout(t);
  }, []);

  return (
    <Link
      href="/contact"
      className={`scarcity-pill ${inView ? "is-in" : ""}`}
      aria-label="1 slot left in January — Contact"
    >
      <span className="scarcity-count" aria-hidden="true">
        1
      </span>
      <span className="scarcity-label">slot left in January</span>
      <span className="scarcity-sep" aria-hidden="true" />
      <span className="scarcity-contact">Contact</span>
    </Link>
  );
}
