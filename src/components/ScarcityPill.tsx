/** Sticky bottom-left scarcity — frosted glass, clear of hero type/CTAs. */
export default function ScarcityPill() {
  return (
    <aside
      className="scarcity-pill"
      aria-label="Sprint availability"
    >
      <span className="scarcity-count" aria-hidden="true">
        1
      </span>
      <span className="scarcity-label">slot left in January</span>
    </aside>
  );
}
