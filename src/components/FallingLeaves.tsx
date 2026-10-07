import { useMemo } from "react";

const LEAF_COLORS = [
  "#c2610f",
  "#a8440b",
  "#8a5a12",
  "#d18a2a",
  "#7a3b0e",
];

type Leaf = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  spin: number;
  color: string;
  opacity: number;
};

const LeafSvg = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path
      d="M12 2C7 6 4 10 4 14c0 4 3.5 8 8 8s8-4 8-8c0-4-3-8-8-12z"
      fill={color}
    />
    <path
      d="M12 4v16"
      stroke="rgba(255,255,255,0.35)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path
      d="M12 9l4-2M12 9l-4-2M12 14l5-2M12 14l-5-2"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

const FallingLeaves = () => {
  const leaves = useMemo<Leaf[]>(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: (i * 7.3 + (i % 5) * 4.1) % 100,
        size: 18 + ((i * 13) % 22),
        duration: 11 + ((i * 7) % 9),
        delay: -((i * 3.7) % 16),
        sway: 40 + ((i * 17) % 50),
        spin: i % 2 === 0 ? 360 : -360,
        color: LEAF_COLORS[i % LEAF_COLORS.length],
        opacity: 0.55 + ((i * 11) % 30) / 100,
      })),
    []
  );

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-30 pointer-events-none overflow-hidden"
    >
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className="leaf-fall"
          style={{
            left: `${leaf.left}%`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            opacity: leaf.opacity,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            // @ts-expect-error custom properties are valid CSS
            "--leaf-sway": `${leaf.sway}px`,
            "--leaf-spin": `${leaf.spin}deg`,
          }}
        >
          <LeafSvg color={leaf.color} />
        </div>
      ))}
    </div>
  );
};

export default FallingLeaves;
