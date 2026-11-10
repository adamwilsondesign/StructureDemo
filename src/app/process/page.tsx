import Link from "next/link";

export default function Process() {
  return (
    <div className="inner-page max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
        How it works
      </h1>
      <p className="text-lg text-[#3f3f3f] max-w-2xl mb-16 leading-relaxed">
        Fixed two-week sprint. Templated system with roughly 25% customization.
        You own everything when we leave.
      </p>

      <div className="space-y-16">
        <div>
          <div className="text-sm text-[#6b6b6b] mb-2">Before the sprint</div>
          <h2 className="text-2xl font-medium mb-4">Readiness</h2>
          <p className="text-[#3f3f3f] max-w-2xl leading-relaxed">
            We send a short checklist. You need an existing brand (even if
            early), product surfaces or wireframes, and a clear primary user or
            customer. The tighter this is, the smoother the two weeks.
          </p>
        </div>

        <div>
          <div className="text-sm text-[#6b6b6b] mb-2">Week 1</div>
          <h2 className="text-2xl font-medium mb-4">Foundation</h2>
          <ul className="space-y-3 text-[#3f3f3f] max-w-2xl">
            <li>Brand and product audit against the baseline system</li>
            <li>Design tokens, color, type, spacing, and core components</li>
            <li>Initial structured Markdown specs and prompt library outline</li>
            <li>Daily or near-daily check-ins to lock decisions fast</li>
          </ul>
        </div>

        <div>
          <div className="text-sm text-[#6b6b6b] mb-2">Week 2</div>
          <h2 className="text-2xl font-medium mb-4">Delivery and handoff</h2>
          <ul className="space-y-3 text-[#3f3f3f] max-w-2xl">
            <li>Code Connect mappings and light MCP setup</li>
            <li>Role-specific prompt libraries (engineering, sales, marketing)</li>
            <li>Short video training on how to use the system</li>
            <li>Organized handoff package and live walkthrough</li>
          </ul>
        </div>

        <div>
          <div className="text-sm text-[#6b6b6b] mb-2">After</div>
          <h2 className="text-2xl font-medium mb-4">You own it</h2>
          <p className="text-[#3f3f3f] max-w-2xl leading-relaxed">
            No retainer. The system, files, prompts, and training are yours.
            Optional daily drift-check agent guidance is included so the system
            stays consistent without us.
          </p>
        </div>
      </div>

      <div className="mt-20">
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
