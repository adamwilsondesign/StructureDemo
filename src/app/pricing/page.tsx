import Link from "next/link";

export default function Pricing() {
  return (
    <div className="inner-page max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
        Pricing
      </h1>
      <p className="text-lg text-[#3f3f3f] max-w-2xl mb-16 leading-relaxed">
        One price. Fixed scope. Two weeks.
      </p>

      <div className="border border-[#e5e5e4] bg-white p-10 max-w-xl">
        <div className="text-5xl font-medium mb-2">$50,000</div>
        <div className="text-sm text-[#6b6b6b] mb-8">USD · flat · two-week sprint</div>

        <ul className="space-y-3 text-sm mb-10">
          <li>Figma design system, tokens, and components</li>
          <li>Code Connect mappings</li>
          <li>Structured Markdown specs and governance</li>
          <li>Prompt libraries for engineering, sales, and marketing</li>
          <li>Light MCP integration</li>
          <li>Video training and full handoff package</li>
        </ul>

        <p className="text-sm text-[#6b6b6b] mb-8">
          Optional full rebrand available for an additional $50k. Same two-week
          window.
        </p>

        <Link
          href="/contact"
          className="inline-block bg-[#0f0f0f] text-white px-6 py-3 rounded-full text-sm hover:opacity-90"
        >
          Reserve a sprint
        </Link>
      </div>
    </div>
  );
}
