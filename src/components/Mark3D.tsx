"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

/**
 * Reconstructed from chunk-page.js module 54124.
 * Extruded Structure mark: three polygons + edge lines, projectable via `.frame()`.
 */

export type Mark3DHandle = {
  frame: (yaw: number, solid: number, pitch?: number) => void;
};

type Pt2 = [number, number];
type Pt3 = [number, number, number];

const FACES: Pt2[][] = [
  [
    [0, 32],
    [4, 32],
    [20, 16],
    [20, 0],
    [16, 0],
    [0, 16],
  ],
  [
    [22, 32],
    [30, 32],
    [46, 16],
    [46, 0],
    [38, 0],
    [22, 16],
  ],
  [
    [48, 32],
    [63, 32],
    [79, 16],
    [79, 0],
    [64, 0],
    [48, 16],
  ],
];

const EDGES: [Pt3, Pt3][] = (() => {
  const out: [Pt3, Pt3][] = [];
  for (const face of FACES) {
    const front = face.map(([x, y]) => [x, y, 0] as Pt3);
    const back = face.map(([x, y]) => [x, y, 16] as Pt3);
    for (let i = 0; i < front.length; i++) {
      const j = (i + 1) % front.length;
      out.push([front[i], front[j]]);
      out.push([back[i], back[j]]);
      out.push([front[i], back[i]]);
    }
  }
  return out;
})();

function project(x: number, y: number, z: number, yaw: number, pitch: number) {
  const cx = x - 39.5;
  const cy = y - 16;
  const cz = z - 8;
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const z1 = -cx * sinY + cz * cosY;
  const cosP = Math.cos(pitch);
  const sinP = Math.sin(pitch);
  const z2 = cy * sinP + z1 * cosP;
  const scale = 280 / (280 - z2);
  return {
    x: 39.5 + (cx * cosY + cz * sinY) * scale,
    y: 16 + (cy * cosP - z1 * sinP) * scale,
    z: z2,
  };
}

const Mark3D = forwardRef<Mark3DHandle, { className?: string }>(
  function Mark3D({ className }, ref) {
    const linesRef = useRef<(SVGLineElement | null)[]>([]);
    const facesRef = useRef<(SVGPathElement | null)[]>([]);

    useImperativeHandle(ref, () => ({
      frame(yaw: number, solid: number, pitch = 0.22) {
        let zMax = -Infinity;
        let zMin = Infinity;
        const segs = EDGES.map(([a, b]) => {
          const p = project(a[0], a[1], a[2], yaw, pitch);
          const q = project(b[0], b[1], b[2], yaw, pitch);
          zMax = Math.max(zMax, p.z, q.z);
          zMin = Math.min(zMin, p.z, q.z);
          return { p, q };
        });
        const zRange = Math.max(0.001, zMax - zMin);
        const facing = Math.max(0, Math.cos(yaw));
        const lineMul = 1 - solid * facing;

        segs.forEach(({ p, q }, i) => {
          const line = linesRef.current[i];
          if (!line) return;
          line.setAttribute("x1", p.x.toFixed(2));
          line.setAttribute("y1", p.y.toFixed(2));
          line.setAttribute("x2", q.x.toFixed(2));
          line.setAttribute("y2", q.y.toFixed(2));
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const depth = ((p.z + q.z) / 2 - zMin) / zRange;
          if (dx * dx + dy * dy < 2.2) {
            line.style.opacity = "0";
            return;
          }
          line.style.opacity = ((0.16 + 0.84 * depth) * lineMul).toFixed(3);
        });

        FACES.forEach((face, i) => {
          const path = facesRef.current[i];
          if (!path) return;
          const d =
            face
              .map(([x, y], n) => {
                const p = project(x, y, 0, yaw, pitch);
                return `${n ? "L" : "M"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
              })
              .join(" ") + " Z";
          path.setAttribute("d", d);
          path.style.opacity = (solid * facing).toFixed(3);
        });
      },
    }));

    return (
      <svg
        className={className}
        viewBox="-14 -22 112 78"
        fill="none"
        aria-hidden
      >
        {FACES.map((_, i) => (
          <path
            key={`f${i}`}
            ref={(el) => {
              facesRef.current[i] = el;
            }}
            className="mark-solid"
          />
        ))}
        {EDGES.map((_, i) => (
          <line
            key={`e${i}`}
            ref={(el) => {
              linesRef.current[i] = el;
            }}
            className="mark-line"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    );
  },
);

export default Mark3D;
