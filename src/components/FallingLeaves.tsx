import { useMemo } from "react";

type LeafStyle = {
  shape: "maple" | "oak" | "birch";
  from: string;
  to: string;
  vein: string;
};

const LEAF_STYLES: LeafStyle[] = [
  { shape: "maple", from: "#f08a1d", to: "#b34700", vein: "rgba(90,30,0,0.45)" },
  { shape: "birch", from: "#f6c22e", to: "#c97b06", vein: "rgba(120,70,0,0.4)" },
  { shape: "oak", from: "#e05a2b", to: "#8f2408", vein: "rgba(70,15,0,0.45)" },
  { shape: "maple", from: "#e8a33d", to: "#9c4a10", vein: "rgba(90,40,0,0.4)" },
  { shape: "birch", from: "#d94f2b", to: "#a02a10", vein: "rgba(80,15,0,0.45)" },
  { shape: "oak", from: "#f2b12a", to: "#b35c05", vein: "rgba(110,60,0,0.4)" },
];

type Leaf = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  spin: number;
  opacity: number;
  style: LeafStyle;
  uid: string;
};

const LeafSvg = ({ leaf }: { leaf: Leaf }) => {
  const { from, to, vein } = leaf.style;
  const gradId = `leaf-grad-${leaf.uid}`;

  const gradient = (
    <defs>
      <linearGradient id={gradId} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </linearGradient>
    </defs>
  );

  if (leaf.style.shape === "maple") {
    return (
      <svg viewBox="0 0 24 26" fill="none" className="w-full h-full">
        {gradient}
        <path
          d="M12 1.5 L13.7 6 L18 4 L17.2 8.6 L22.2 9.6 L18.6 12.8 L21.2 16.8 L15.6 16 L13.8 20.5 L12 17.2 L10.2 20.5 L8.4 16 L2.8 16.8 L5.4 12.8 L1.8 9.6 L6.8 8.6 L6 4 L10.3 6 Z"
          fill={`url(#${gradId})`}
          stroke="rgba(60,20,0,0.35)"
          strokeWidth="0.4"
        />
        <path d="M12 4 L12 24" stroke={vein} strokeWidth="0.7" strokeLinecap="round" />
        <path
          d="M12 7 L16 5.6 M12 7 L8 5.6 M12 11 L17.6 10 M12 11 L6.4 10 M12 15 L15 16.6 M12 15 L9 16.6"
          stroke={vein}
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (leaf.style.shape === "oak") {
    return (
      <svg viewBox="0 0 24 26" fill="none" className="w-full h-full">
        {gradient}
        <path
          d="M12 1.5 C13.2 3.4 12.6 4.8 14.2 5.4 C16 4.8 16.2 7 15 8.2 C17.2 8.2 17.4 10.8 15.4 11.4 C17.8 12 17.4 14.8 15.2 14.8 C16.8 16 15.8 18.6 13.6 18 C13.8 20.2 12.4 21.2 12 23.5 C11.6 21.2 10.2 20.2 10.4 18 C8.2 18.6 7.2 16 8.8 14.8 C6.6 14.8 6.2 12 8.6 11.4 C6.6 10.8 6.8 8.2 9 8.2 C7.8 7 8 4.8 9.8 5.4 C11.4 4.8 10.8 3.4 12 1.5 Z"
          fill={`url(#${gradId})`}
          stroke="rgba(60,20,0,0.35)"
          strokeWidth="0.4"
        />
        <path d="M12 4 L12 24.5" stroke={vein} strokeWidth="0.7" strokeLinecap="round" />
        <path
          d="M12 7.5 L14.6 6.8 M12 7.5 L9.4 6.8 M12 11.2 L15 10.8 M12 11.2 L9 10.8 M12 15 L14.4 15.6 M12 15 L9.6 15.6"
          stroke={vein}
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // birch / pointed leaf
  return (
    <svg viewBox="0 0 24 26" fill="none" className="w-full h-full">
      {gradient}
      <path
        d="M12 1.5 C16.5 6 19.5 10 19.5 14 C19.5 18.2 16.2 21.4 12 22 C7.8 21.4 4.5 18.2 4.5 14 C4.5 10 7.5 6 12 1.5 Z"
        fill={`url(#${gradId})`}
        stroke="rgba(60,20,0,0.35)"
        strokeWidth="0.4"
      />
      <path d="M12 3 L12 24.5" stroke={vein} strokeWidth="0.7" strokeLinecap="round" />
      <path
        d="M12 6 L16.6 8 M12 6 L7.4 8 M12 10.5 L17.6 13 M12 10.5 L6.4 13 M12 15 L16 17.6 M12 15 L8 17.6"
        stroke={vein}
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

const FallingLeaves = () => {
  const leaves = useMemo<Leaf[]>(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        left: (i * 8.3 + (i % 5) * 4.1) % 100,
        size: 34 + ((i * 19) % 30),
        duration: 12 + ((i * 7) % 9),
        delay: -((i * 3.7) % 18),
        sway: 45 + ((i * 17) % 55),
        spin: i % 2 === 0 ? 360 : -360,
        opacity: 0.6 + ((i * 11) % 30) / 100,
        style: LEAF_STYLES[i % LEAF_STYLES.length],
        uid: `l${i}`,
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
            height: `${leaf.size * 1.08}px`,
            opacity: leaf.opacity,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            // @ts-expect-error custom properties are valid CSS
            "--leaf-sway": `${leaf.sway}px`,
            "--leaf-spin": `${leaf.spin}deg`,
          }}
        >
          <LeafSvg leaf={leaf} />
        </div>
      ))}
    </div>
  );
};

export default FallingLeaves;
