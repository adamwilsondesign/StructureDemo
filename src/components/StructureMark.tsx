type StructureMarkProps = {
  className?: string;
  size?: number;
};

/** Three-slab Structure mark — keep geometry; elevate scale in hero. */
export default function StructureMark({
  className = "",
  size = 28,
}: StructureMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="3.2"
        y="5"
        width="5.2"
        height="18"
        rx="2.4"
        transform="rotate(-18 5.8 14)"
        fill="currentColor"
      />
      <rect
        x="11.4"
        y="5"
        width="5.2"
        height="18"
        rx="2.4"
        transform="rotate(-18 14 14)"
        fill="currentColor"
      />
      <rect
        x="19.6"
        y="5"
        width="5.2"
        height="18"
        rx="2.4"
        transform="rotate(-18 22.2 14)"
        fill="currentColor"
      />
    </svg>
  );
}
