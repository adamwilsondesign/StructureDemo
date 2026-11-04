"use client";

import { useState } from "react";

export default function ROICalculator() {
  const [engineers, setEngineers] = useState(8);
  const [designers, setDesigners] = useState(1);
  const [salesMarketing, setSalesMarketing] = useState(4);

  const engCost = 200000;
  const desCost = 160000;
  const smCost = 140000;

  const engRecovery = 0.15;
  const desRecovery = 0.25;
  const smHoursPerWeek = 4;
  const smRecovery = (smHoursPerWeek / 40) * 0.7; // partial of the hours, conservative

  const capacity =
    engineers * engCost * engRecovery +
    designers * desCost * desRecovery +
    salesMarketing * smCost * smRecovery;

  const avoided = 50000;
  const total = capacity + avoided;
  const paybackWeeks = Math.round((50000 / (total / 52)) * 10) / 10;

  return (
    <div className="border border-[#e5e5e4] bg-white p-8 md:p-10">
      <h3 className="text-xl font-medium mb-2">What this is worth</h3>
      <p className="text-sm text-[#6b6b6b] mb-8 max-w-lg">
        Illustrative estimate based on published design-system efficiency ranges
        and typical fully-loaded costs. Actual results depend on adoption.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div>
          <label className="block text-sm mb-2">Engineers</label>
          <input
            type="number"
            min={0}
            value={engineers}
            onChange={(e) => setEngineers(Number(e.target.value))}
            className="w-full border border-[#e5e5e4] px-3 py-2 text-base"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Designers</label>
          <input
            type="number"
            min={0}
            value={designers}
            onChange={(e) => setDesigners(Number(e.target.value))}
            className="w-full border border-[#e5e5e4] px-3 py-2 text-base"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Sales + marketing</label>
          <input
            type="number"
            min={0}
            value={salesMarketing}
            onChange={(e) => setSalesMarketing(Number(e.target.value))}
            className="w-full border border-[#e5e5e4] px-3 py-2 text-base"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-[#e5e5e4]">
        <div>
          <div className="text-sm text-[#6b6b6b] mb-1">Capacity recovered</div>
          <div className="text-2xl font-medium">
            ${Math.round(capacity / 1000)}k
          </div>
          <div className="text-xs text-[#6b6b6b] mt-1">per year</div>
        </div>
        <div>
          <div className="text-sm text-[#6b6b6b] mb-1">Avoided external spend</div>
          <div className="text-2xl font-medium">${avoided / 1000}k</div>
          <div className="text-xs text-[#6b6b6b] mt-1">agency / freelance</div>
        </div>
        <div>
          <div className="text-sm text-[#6b6b6b] mb-1">Payback on $50k</div>
          <div className="text-2xl font-medium">{paybackWeeks} weeks</div>
          <div className="text-xs text-[#6b6b6b] mt-1">at this team size</div>
        </div>
      </div>
    </div>
  );
}
