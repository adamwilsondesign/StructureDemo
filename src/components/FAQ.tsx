"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Reconstructed from chunk-page.js module 85725 + js/faq-data.js.
 */

const FAQ_ITEMS = [
  {
    q: "Who is this sprint for?",
    a: "Funded, lean startups that already have a brand, even an early one, and a product engineering is shipping. If design is the thing slowing the team down, this is the sprint.",
  },
  {
    q: "What do we actually deliver?",
    a: "A Figma system, tokens, Code Connect, structured Markdown specs, prompt libraries for engineering, sales, and marketing, and short video training. You keep the files.",
  },
  {
    q: "How is two weeks possible?",
    a: "The baseline system already exists. Each sprint adapts that system to your brand and product. It is not a from-scratch build.",
  },
  {
    q: "What do you need from us before we start?",
    a: "An existing brand, product surfaces or wireframes, and a clear primary user. A short checklist lands before kickoff. The tighter that is, the smoother the two weeks.",
  },
  {
    q: "Is $50k the full cost?",
    a: "Yes. One sprint, flat $50k. A full rebrand in the same two weeks is a separate $50k.",
  },
  {
    q: "What happens when you leave?",
    a: "No retainer. The system, prompts, mappings, and training stay with your team. You own them.",
  },
  {
    q: "Can sales and marketing use it, or just engineering?",
    a: "Both. Engineers ship from tokens and specs. Sales and marketing generate on-brand material from the same source, without waiting in a design queue.",
  },
];

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path
        d="M6 1 L6 11 M11 6 L1 6"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path
        d="M2 2 L10 10 M10 2 L2 10"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [titleIn, setTitleIn] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTitleIn(true);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="faq">
      <div className="faq-split">
        <div className="faq-side">
          <h2
            className={`faq-title ${titleIn ? "is-in" : ""}`}
            aria-label="FAQ"
          >
            {["F", "A", "Q"].map((letter, i) => (
              <span
                key={letter}
                className="letter"
                style={{ animationDelay: `${70 * i}ms` }}
              >
                {letter}
              </span>
            ))}
          </h2>
          <div className="faq-cta">
            <p className="faq-kicker">got more questions?</p>
            <Link href="/contact" className="faq-reach">
              Reach us <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <ul className="faq-list">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <li key={item.q} className={isOpen ? "is-open" : ""}>
                <button
                  type="button"
                  className="faq-row"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="faq-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="faq-q">{item.q}</span>
                  <span className="faq-icon" aria-hidden>
                    {isOpen ? <CloseIcon /> : <PlusIcon />}
                  </span>
                </button>
                <div
                  className={`faq-answer-wrap ${isOpen ? "is-open" : ""}`}
                >
                  <div className="faq-answer-clip">
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
