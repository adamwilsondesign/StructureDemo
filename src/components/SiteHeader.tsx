"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StructureMark from "./StructureMark";

export default function SiteHeader() {
  const [overHero, setOverHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) {
      setOverHero(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOverHero(entry.isIntersecting && entry.intersectionRatio > 0.35);
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.over = overHero ? "hero" : "page";
  }, [overHero]);

  useEffect(() => {
    document.documentElement.dataset.menu = menuOpen ? "open" : "closed";
    return () => {
      delete document.documentElement.dataset.menu;
    };
  }, [menuOpen]);

  return (
    <header
      className={`site-header ${overHero ? "is-over-hero" : ""} ${menuOpen ? "is-open" : ""}`}
    >
      <div className="site-header-inner">
        <Link href="/" className="brand" onClick={() => setMenuOpen(false)}>
          <StructureMark size={22} />
          <span className="structure-word">Structure</span>
        </Link>

        <nav className="site-nav desktop-nav" aria-label="Primary">
          <Link href="/process" className="nav-chip">
            Process
          </Link>
          <Link href="/pricing" className="nav-chip">
            Pricing
          </Link>
          <Link
            href="/contact"
            className={`btn btn-sm ${overHero ? "btn-accent" : "btn-primary"}`}
          >
            Reserve a sprint
          </Link>
        </nav>

        <button
          type="button"
          className="burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {menuOpen ? (
        <div className="mobile-menu">
          <Link href="/process" onClick={() => setMenuOpen(false)}>
            Process
          </Link>
          <Link href="/pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link
            href="/contact"
            className="btn btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Reserve a sprint
          </Link>
        </div>
      ) : null}
    </header>
  );
}
