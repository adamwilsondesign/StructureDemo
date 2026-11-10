"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";

/**
 * Reconstructed from chunk-page.js module 93890 (quotes block).
 * Auto-advances via `.quote-fill` CSS animation end; swipe on touch.
 */

const QUOTES = [
  {
    tag: "Engineering",
    quote:
      "We stopped redrawing the same components. The decisions were already in the repo, and features started shipping the same week.",
    name: "Alex Rivera",
    role: "Engineering lead",
    image: "/images/slide1.jpg",
  },
  {
    tag: "Sales",
    quote:
      "Decks stopped being a design request. They’re generated from the same system engineering uses, and they still look like us.",
    name: "Sam Okonkwo",
    role: "Head of sales",
    image: "/images/slide2.jpg",
  },
  {
    tag: "Marketing",
    quote:
      "Launch notes, one-pagers, and social all pull from one source. We don’t wait on a designer to stay on brand.",
    name: "Priya Shah",
    role: "Marketing lead",
    image: "/images/slide3.jpg",
  },
];

export default function QuotesCarousel() {
  const [index, setIndex] = useState(0);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const quote = QUOTES[index];

  return (
    <section className="px-6 pb-24 md:pb-32">
      <Reveal>
        <div className="max-w-[1200px] mx-auto">
          <div
            className="relative overflow-hidden min-h-[460px] md:min-h-[520px] touch-pan-y"
            onTouchStart={(e) => {
              const t = e.changedTouches[0];
              touchRef.current = { x: t.clientX, y: t.clientY };
            }}
            onTouchEnd={(e) => {
              if (!touchRef.current) return;
              const t = e.changedTouches[0];
              const dx = t.clientX - touchRef.current.x;
              const dy = t.clientY - touchRef.current.y;
              touchRef.current = null;
              if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
              setIndex((i) =>
                dx < 0
                  ? (i + 1) % QUOTES.length
                  : (i - 1 + QUOTES.length) % QUOTES.length,
              );
            }}
          >
            {QUOTES.map((q, i) => (
              <img
                key={q.tag}
                src={q.image}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
            <div className="relative z-10 p-8 md:p-12 max-w-[460px] flex flex-col justify-end min-h-[460px] md:min-h-[520px] text-white">
              <span className="self-start mb-6 text-[13px] bg-black/55 px-3 py-1">
                {quote.tag}
              </span>
              <p className="text-[22px] md:text-[28px] leading-[1.25] font-[480]">
                “{quote.quote}”
              </p>
              <p className="mt-6 text-[16px] font-[480]">{quote.name}</p>
              <p className="text-[15px] text-white/70">{quote.role}</p>
            </div>
          </div>

          <div className="mt-5 flex justify-center gap-3 max-w-[280px] mx-auto">
            {QUOTES.map((q, i) => (
              <button
                key={q.tag}
                type="button"
                aria-label={q.tag}
                onClick={() => setIndex(i)}
                className="quote-track h-[3px] flex-1 overflow-hidden"
              >
                {i === index && (
                  <span
                    key={index}
                    className="quote-fill block h-full"
                    onAnimationEnd={() =>
                      setIndex((n) => (n + 1) % QUOTES.length)
                    }
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
