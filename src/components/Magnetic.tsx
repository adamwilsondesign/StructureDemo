"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Light magnetic pull for CTAs — CSS transform via --mx/--my.
 * Disabled when prefers-reduced-motion.
 */
export default function Magnetic({
  children,
  className = "",
  strength = 10,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(x, y);
      const max = Math.max(rect.width, rect.height) * 1.1;
      if (dist > max) {
        el.style.setProperty("--mx", "0px");
        el.style.setProperty("--my", "0px");
        return;
      }
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const t = 1 - dist / max;
        el.style.setProperty("--mx", `${(x / rect.width) * strength * t}px`);
        el.style.setProperty("--my", `${(y / rect.height) * strength * t}px`);
      });
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`magnetic ${className}`}
      style={{ "--mx": "0px", "--my": "0px" } as CSSProperties}
    >
      {children}
    </div>
  );
}
