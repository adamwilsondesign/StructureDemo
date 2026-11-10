"use client";

import Reveal from "./Reveal";

/**
 * First content band after hero — exact copy/classes from live HTML.
 */
export default function FirstScroll() {
  return (
    <section className="px-6 pt-28 md:pt-40 pb-20 md:pb-28">
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
    </section>
  );
}
