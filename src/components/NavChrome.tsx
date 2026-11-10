"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reconstructed from chunk-layout.js module 12878.
 * Sets `html[data-over=hero|page]` from `[data-hero], [data-dark]` IO,
 * and `html[data-nav=shown|hidden]` from scroll direction.
 * Renders null — side-effect only (layout island).
 */
export default function NavChrome() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.nav = "shown";

    const heroes = [
      ...document.querySelectorAll<HTMLElement>("[data-hero], [data-dark]"),
    ];
    const visible = new Set<Element>();
    const io =
      heroes.length > 0
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) visible.add(entry.target);
                else visible.delete(entry.target);
              }
              root.dataset.over = visible.size ? "hero" : "page";
            },
            { threshold: 0.25 },
          )
        : null;

    heroes.forEach((el) => io?.observe(el));
    if (!heroes.length) root.dataset.over = "page";

    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY;
        if (y < 24) root.dataset.nav = "shown";
        else if (dy > 8) root.dataset.nav = "hidden";
        else if (dy < -8) root.dataset.nav = "shown";
        root.dataset.scrolled = y > 12 ? "1" : "0";
        lastY = y;
        ticking = false;
      });
    };
    root.dataset.scrolled = window.scrollY > 12 ? "1" : "0";

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      root.dataset.over = "page";
      root.dataset.nav = "shown";
    };
  }, [pathname]);

  return null;
}
