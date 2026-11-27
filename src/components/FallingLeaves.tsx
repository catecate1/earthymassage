import type { CSSProperties } from "react";

const particles = [
  [4, 30, 23, -4, 48, 120], [15, 22, 28, -19, -42, -160], [28, 34, 25, -10, 55, 180],
  [39, 18, 21, -15, -28, 100], [50, 28, 30, -25, 38, -140], [63, 24, 26, -6, -50, 150],
  [77, 32, 29, -17, 44, -180], [89, 20, 24, -9, -30, -110], [96, 26, 27, -22, -40, 130],
  [9, 30, 31, -27, 45, -150], [34, 22, 24, -2, -38, 170], [57, 28, 28, -13, 52, 140],
  [84, 34, 32, -29, -48, -120], [70, 18, 22, -20, 30, 90], [21, 20, 26, -12, 35, 110],
  [45, 26, 29, -3, -36, -130],
];

const Flake = () => (
  <svg viewBox="-12 -12 24 24" className="h-full w-full">
    <g stroke="hsl(var(--snow))" strokeWidth="1.6" strokeLinecap="round" fill="none">
      {[0, 60, 120].map((r) => (
        <g key={r} transform={`rotate(${r})`}>
          <line x1="0" y1="-11" x2="0" y2="11" />
          <path d="M-3,-8 L0,-5 L3,-8 M-3,8 L0,5 L3,8" />
        </g>
      ))}
    </g>
  </svg>
);

const FallingLeaves = () => (
  <div className="autumn-overlay" aria-hidden="true">
    {particles.map(([left, size, duration, delay, sway, spin], index) => (
      <div
        key={index}
        className="leaf-fall snow-flake"
        style={{
          "--leaf-left": `${left}%`,
          "--leaf-size": `${size}px`,
          "--leaf-duration": `${duration}s`,
          "--leaf-delay": `${delay}s`,
          "--leaf-sway": `${sway}px`,
          "--leaf-spin": `${spin}deg`,
        } as CSSProperties}
      >
        <Flake />
      </div>
    ))}
  </div>
);

export default FallingLeaves;
