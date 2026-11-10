"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

const PANELS = [
  {
    index: "/01",
    title: "Engineers ship",
    body: "Higher quality builds without the overhead.",
    src: "/images/outcome-01.jpg",
  },
  {
    index: "/02",
    title: "Sales stay on brand",
    body: "Generate on-brand material without a queue.",
    src: "/images/outcome-02.jpg",
  },
  {
    index: "/03",
    title: "You own the system",
    body: "Full ownership of the architecture and files.",
    src: "/images/outcome-03.jpg",
  },
] as const;

/**
 * Editorial first band + atmospheric outcome panels — same three outcomes.
 */
export default function FirstScroll() {
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="first-scroll px-6 pt-28 md:pt-40 pb-20 md:pb-28">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-12 gap-x-10 gap-y-8">
        <Reveal className="md:col-span-6" delay={0}>
          <h2 className="text-[34px] md:text-[48px] leading-[0.96]">
            Your brand and product, turned into a system your team can actually
            use.
          </h2>
        </Reveal>
        <Reveal
          className="md:col-span-5 md:col-start-8 text-muted text-[17px] leading-[1.6] md:pt-2"
          delay={120}
        >
          Engineers ship with tokens, Code Connect, and specs already decided.
          Sales and marketing generate on-brand material without a queue. We
          leave. You keep the files.
        </Reveal>
      </div>

      <div
        ref={panelsRef}
        className="outcome-panels max-w-[1200px] mx-auto mt-16 md:mt-20"
        aria-label="Outcomes"
      >
        {PANELS.map((panel, i) => (
          <article
            key={panel.index}
            className="outcome-panel"
            style={{ ["--i" as string]: i }}
          >
            <div className="outcome-panel-media" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={panel.src} alt="" />
              <div className="outcome-panel-grain" />
            </div>
            <div className="outcome-panel-copy">
              <span className="outcome-panel-index">{panel.index}</span>
              <h3>{panel.title}</h3>
              <p>{panel.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
