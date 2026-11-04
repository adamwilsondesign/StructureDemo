import Link from "next/link";
import ROICalculator from "./ROICalculator";

export default function Home() {
  return (
    <div>
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <h1 className="text-5xl md:text-6xl font-medium leading-[1.05] tracking-tight max-w-3xl">
          Your team ships on-brand product and content. In two weeks.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-[#3f3f3f] max-w-2xl leading-relaxed">
          We turn your brand and product into an agentic design system. Engineers
          ship higher-quality features. Sales and marketing generate on-brand
          materials without waiting. Flat $50k.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/contact"
            className="bg-[#0f0f0f] text-white px-6 py-3 rounded-full text-sm hover:opacity-90"
          >
            Reserve a sprint
          </Link>
          <Link
            href="/process"
            className="px-6 py-3 text-sm border border-[#e5e5e4] rounded-full hover:bg-white"
          >
            How it works
          </Link>
        </div>
      </section>

      <section className="border-y border-[#e5e5e4] bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-lg font-medium mb-2">Engineers ship</h3>
            <p className="text-sm text-[#3f3f3f] leading-relaxed">
              Tokens, Code Connect, and structured specs mean less rework and
              fewer one-off components. Features move faster at higher quality.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Sales and marketing stay on brand</h3>
            <p className="text-sm text-[#3f3f3f] leading-relaxed">
              Prompt libraries and MD files let non-designers generate decks,
              one-pagers, and social content that match the system.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">No ongoing design dependency</h3>
            <p className="text-sm text-[#3f3f3f] leading-relaxed">
              Replaces or heavily reduces the need for a first design hire or
              repeated agency work. You own the system when the sprint ends.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-medium mb-4">Two weeks, fixed scope</h2>
        <p className="text-[#3f3f3f] mb-10 max-w-2xl">
          Templated system with roughly 25% customization. We get in, deliver,
          and leave you with everything needed to keep using it.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-[#e5e5e4] p-6 bg-white">
            <div className="text-sm text-[#6b6b6b] mb-1">Week 1</div>
            <h3 className="text-lg font-medium mb-3">Foundation</h3>
            <ul className="text-sm space-y-2 text-[#3f3f3f]">
              <li>Brand and product audit against the baseline system</li>
              <li>Tokens, color, type, and core components reskinned</li>
              <li>Initial MD specs and prompt library structure</li>
            </ul>
          </div>
          <div className="border border-[#e5e5e4] p-6 bg-white">
            <div className="text-sm text-[#6b6b6b] mb-1">Week 2</div>
            <h3 className="text-lg font-medium mb-3">Delivery</h3>
            <ul className="text-sm space-y-2 text-[#3f3f3f]">
              <li>Code Connect mappings and light MCP setup</li>
              <li>Role-specific prompt libraries and training videos</li>
              <li>Handoff package and readiness walkthrough</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[#e5e5e4]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-medium mb-10">What you get</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
            <div className="flex gap-3">
              <span className="text-[#6b6b6b]">01</span>
              <span>Figma design system, tokens, and components</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#6b6b6b]">02</span>
              <span>Code Connect mappings for engineering</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#6b6b6b]">03</span>
              <span>Structured Markdown specs and governance files</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#6b6b6b]">04</span>
              <span>Prompt libraries for engineering, sales, and marketing</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#6b6b6b]">05</span>
              <span>Light MCP integration for agent use</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#6b6b6b]">06</span>
              <span>Video training and handoff documentation</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <ROICalculator />
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="border border-[#e5e5e4] bg-white p-10 text-center">
          <h2 className="text-3xl font-medium mb-4">Two weeks. $50k. Done.</h2>
          <p className="text-[#3f3f3f] mb-8 max-w-md mx-auto">
            We work with AI-native startups that have a product and brand already
            in motion. If that is you, reserve a sprint.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#0f0f0f] text-white px-6 py-3 rounded-full text-sm hover:opacity-90"
          >
            Reserve a sprint
          </Link>
        </div>
      </section>
    </div>
  );
}
