import Link from "next/link";
import Hero from "@/components/Hero";
import FirstScroll from "@/components/FirstScroll";
import ROICalculator from "./ROICalculator";

export default function Home() {
  return (
    <div>
      <Hero />
      <FirstScroll />

      <section className="page-section">
        <h2>Two weeks, fixed scope</h2>
        <p className="lede">
          Templated system with roughly 25% customization. We get in, deliver,
          and leave you with everything needed to keep using it.
        </p>
        <div className="week-grid">
          <div className="week-card">
            <div className="eyebrow">Week 1</div>
            <h3>Foundation</h3>
            <ul>
              <li>Brand and product audit against the baseline system</li>
              <li>Tokens, color, type, and core components reskinned</li>
              <li>Initial MD specs and prompt library structure</li>
            </ul>
          </div>
          <div className="week-card">
            <div className="eyebrow">Week 2</div>
            <h3>Delivery</h3>
            <ul>
              <li>Code Connect mappings and light MCP setup</li>
              <li>Role-specific prompt libraries and training videos</li>
              <li>Handoff package and readiness walkthrough</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 0 }}>
        <div className="deliverables">
          <h2 style={{ marginBottom: "1.5rem" }}>What you get</h2>
          <div className="deliverables-grid">
            <div className="deliverable">
              <span>01</span>
              <span>Figma design system, tokens, and components</span>
            </div>
            <div className="deliverable">
              <span>02</span>
              <span>Code Connect mappings for engineering</span>
            </div>
            <div className="deliverable">
              <span>03</span>
              <span>Structured Markdown specs and governance files</span>
            </div>
            <div className="deliverable">
              <span>04</span>
              <span>Prompt libraries for engineering, sales, and marketing</span>
            </div>
            <div className="deliverable">
              <span>05</span>
              <span>Light MCP integration for agent use</span>
            </div>
            <div className="deliverable">
              <span>06</span>
              <span>Video training and handoff documentation</span>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 0 }}>
        <ROICalculator />
      </section>

      <section className="page-section" style={{ paddingTop: 0 }}>
        <div className="closing-band">
          <h2>Two weeks. $50k. Done.</h2>
          <p>
            We work with AI-native startups that have a product and brand already
            in motion. If that is you, reserve a sprint.
          </p>
          <Link href="/contact" className="btn btn-accent">
            Reserve a sprint
          </Link>
        </div>
      </section>
    </div>
  );
}
