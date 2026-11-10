"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Reconstructed from chunk-layout.js module 26642 + live header HTML.
 * Mobile menu: Home / Pricing / Get started (portal into document.body).
 * Desktop nav chips: Process / Pricing / Reserve a sprint.
 */

const MOBILE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Get started" },
];

function BrandMark() {
  return (
    <svg className="mark" viewBox="0 0 79 32" aria-hidden>
      <polygon points="0,32 4,32 20,16 20,0 16,0 0,16" />
      <polygon points="22,32 30,32 46,16 46,0 38,0 22,16" />
      <polygon points="48,32 63,32 79,16 79,0 64,0 48,16" />
    </svg>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mountedMenu, setMountedMenu] = useState(false);
  const [menuIn, setMenuIn] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (open) setMountedMenu(true);
    else setMenuIn(false);
  }, [open]);

  useEffect(() => {
    if (!mountedMenu || !open) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setMenuIn(true));
    });
    return () => cancelAnimationFrame(id);
  }, [mountedMenu, open]);

  useEffect(() => {
    const busy = open || mountedMenu;
    document.body.style.overflow = busy ? "hidden" : "";
    document.documentElement.dataset.menu = busy ? "open" : "closed";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.dataset.menu = "closed";
    };
  }, [open, mountedMenu]);

  return (
    <header
      className={`site-header fixed top-0 inset-x-0 z-[70] ${
        open || mountedMenu ? "is-open" : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-16 flex items-center gap-3">
        <Link
          href="/"
          className="brand font-display text-[22px] md:text-[26px] leading-none inline-flex items-center gap-2 shrink-0"
          onClick={() => setOpen(false)}
        >
          <BrandMark />
          <span>Structure</span>
        </Link>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <Link
            href="/contact"
            className="slot-pill"
            onClick={() => setOpen(false)}
          >
            <span className="slot-count">1</span>
            <span>slot left in January</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-[12px]">
            <Link className="nav-chip" href="/process">
              Process
            </Link>
            <Link className="nav-chip" href="/pricing">
              Pricing
            </Link>
            <Link className="btn-primary" href="/contact">
              Reserve a sprint
            </Link>
          </nav>

          <button
            type="button"
            className="burger md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <i className={open ? "is-a" : ""} />
            <i className={open ? "is-b" : ""} />
          </button>
        </div>
      </div>

      {mountedMenu &&
        hydrated &&
        createPortal(
          <>
            <button
              type="button"
              className={`menu-blur ${menuIn ? "is-in" : ""}`}
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <div
              className={`mobile-menu ${menuIn ? "is-in" : ""}`}
              onTransitionEnd={(e) => {
                if (
                  e.target === e.currentTarget &&
                  e.propertyName === "transform" &&
                  !open
                ) {
                  setMountedMenu(false);
                }
              }}
            >
              <div className="menu-links">
                {MOBILE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="menu-wordmark" aria-hidden>
                <div className="structure-word menu-word">Structure</div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </header>
  );
}
