import type { CSSProperties } from "react";
import orangeLeaf from "@/assets/autumn-leaf-orange.webp";
import redLeaf from "@/assets/autumn-leaf-red.webp";
import yellowLeaf from "@/assets/autumn-leaf-yellow.webp";
import acorn from "@/assets/autumn-acorn.webp";
import oakLeaf from "@/assets/autumn-leaf-oak.webp";
import birchLeaf from "@/assets/autumn-leaf-birch.webp";

const artwork = [orangeLeaf, redLeaf, yellowLeaf, acorn, oakLeaf, birchLeaf];
const particles = [
  [0, 4, 82, 23, -4, 48, 120],
  [4, 15, 94, 28, -19, -42, -160],
  [5, 28, 76, 25, -10, 55, 180],
  [3, 39, 40, 21, -15, -28, 100],
  [0, 50, 88, 30, -25, 38, -140],
  [1, 63, 80, 26, -6, -50, 150],
  [2, 77, 98, 29, -17, 44, -180],
  [3, 89, 44, 24, -9, -30, -110],
  [0, 96, 74, 27, -22, -40, 130],
  [2, 9, 90, 31, -27, 45, -150],
  [4, 34, 84, 24, -2, -38, 170],
  [5, 57, 78, 28, -13, 52, 140],
  [4, 84, 92, 32, -29, -48, -120],
  [3, 70, 38, 22, -20, 30, 90],
];

const FallingLeaves = () => (
  <div className="autumn-overlay" aria-hidden="true">
    {particles.map(([kind, left, size, duration, delay, sway, spin], index) => (
      <div
        key={index}
        className="leaf-fall"
        style={{
          "--leaf-left": `${left}%`,
          "--leaf-size": `${Math.round(size * 0.62)}px`,
          "--leaf-duration": `${duration}s`,
          "--leaf-delay": `${delay}s`,
          "--leaf-sway": `${sway}px`,
          "--leaf-spin": `${spin}deg`,
        } as CSSProperties}
      >
        <img src={artwork[kind]} alt="" width={256} height={256} loading="lazy" decoding="async" />
      </div>
    ))}
  </div>
);

export default FallingLeaves;