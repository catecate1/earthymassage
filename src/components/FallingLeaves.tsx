import type { CSSProperties } from "react";

const particles = [
  [4, 30, 23, -4, 48, 120], [15, 22, 28, -19, -42, -160], [28, 34, 25, -10, 55, 180],
  [39, 18, 21, -15, -28, 100], [50, 28, 30, -25, 38, -140], [63, 24, 26, -6, -50, 150],
  [77, 32, 29, -17, 44, -180], [89, 20, 24, -9, -30, -110], [96, 26, 27, -22, -40, 130],
  [9, 30, 31, -27, 45, -150], [34, 22, 24, -2, -38, 170], [57, 28, 28, -13, 52, 140],
  [84, 34, 32, -29, -48, -120], [70, 18, 22, -20, 30, 90], [21, 20, 26, -12, 35, 110],
  [45, 26, 29, -3, -36, -130],
  [12, 24, 19, -7, 40, 140], [24, 30, 27, -18, -46, -170], [36, 20, 23, -11, 50, 110],
  [48, 32, 26, -24, -34, -90], [60, 22, 21, -5, 42, 160], [72, 28, 29, -16, -52, -140],
  [82, 18, 24, -8, 36, 120], [93, 26, 22, -21, -44, 100], [6, 20, 26, -14, 54, -160],
  [42, 24, 20, -26, -30, 150], [66, 30, 25, -2, 46, -110], [88, 22, 28, -19, -38, 170],
];

const FallingLeaves = () => (
  <div className="autumn-overlay" aria-hidden="true">
    {particles.map(([left, size, duration, delay, sway, spin], index) => (
      <div
        key={index}
        className="leaf-fall snow-flake"
        style={{
          "--leaf-left": `${left}%`,
          "--leaf-size": `${Math.round(size / 4)}px`,
          "--leaf-duration": `${duration}s`,
          "--leaf-delay": `${delay}s`,
          "--leaf-sway": `${sway}px`,
          "--leaf-spin": `${spin}deg`,
        } as CSSProperties}
      />
    ))}
  </div>
);

export default FallingLeaves;
