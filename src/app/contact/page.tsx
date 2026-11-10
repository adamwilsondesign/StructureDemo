"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="inner-page max-w-xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-medium mb-4">Received.</h1>
        <p className="text-[#3f3f3f]">
          We’ll reply within one business day with next steps or a short
          readiness check.
        </p>
      </div>
    );
  }

  return (
    <div className="inner-page max-w-xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-medium tracking-tight mb-4">Reserve a sprint</h1>
      <p className="text-[#3f3f3f] mb-10">
        Tell us a bit about the company and product. We’ll confirm fit and
        timing.
      </p>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div>
          <label className="block text-sm mb-2">Name</label>
          <input
            required
            className="w-full border border-[#e5e5e4] px-3 py-2 bg-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            required
            className="w-full border border-[#e5e5e4] px-3 py-2 bg-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Company</label>
          <input
            required
            className="w-full border border-[#e5e5e4] px-3 py-2 bg-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">
            What are you shipping, and what’s the design situation today?
          </label>
          <textarea
            required
            rows={4}
            className="w-full border border-[#e5e5e4] px-3 py-2 bg-white"
          />
        </div>
        <button
          type="submit"
          className="bg-[#0f0f0f] text-white px-6 py-3 rounded-full text-sm hover:opacity-90"
        >
          Send
        </button>
      </form>
    </div>
  );
}
