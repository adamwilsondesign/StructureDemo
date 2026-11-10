import Link from "next/link";
import StructureMark from "./StructureMark";

/**
 * Premium hero — brand-first, one still, three motions only (rise + Ken Burns + seam elsewhere).
 */
export default function Hero() {
  return (
    <section data-hero className="hero" aria-label="Introduction">
      <div className="hero-media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-still-a.jpg"
          alt=""
          className="hero-still"
          width={2400}
          height={1350}
          fetchPriority="high"
        />
        <div className="hero-wash" />
      </div>

      <div className="hero-content">
        <div className="hero-brand rise-in" style={{ animationDelay: "40ms" }}>
          <StructureMark size={42} className="hero-mark" />
          <span className="structure-word hero-wordmark">Structure</span>
        </div>

        <h1 className="hero-headline rise-in" style={{ animationDelay: "140ms" }}>
          Systems the whole team can ship from.
        </h1>

        <p className="hero-support rise-in" style={{ animationDelay: "240ms" }}>
          Two weeks. Flat $50k. Engineers ship higher quality. Sales and
          marketing stay on brand. You own the system.
        </p>

        <div className="hero-ctas rise-in" style={{ animationDelay: "340ms" }}>
          <Link href="/contact" className="btn btn-accent">
            Reserve a sprint
          </Link>
          <Link href="/pricing" className="btn btn-ghost">
            See pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
