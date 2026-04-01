import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

/* ─── helpers ─── */
interface LabelProps {
  position: [number, number, number];
  text: string;
  side?: "left" | "right";
}

const MuscleLabel = ({ position, text, side = "right" }: LabelProps) => (
  <Html position={position} center={false} style={{ pointerEvents: "none" }}>
    <div
      className={`whitespace-nowrap text-[10px] font-body tracking-wide uppercase px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground shadow-md ${
        side === "left" ? "-translate-x-full" : ""
      }`}
    >
      {text}
    </div>
  </Html>
);

/* ─── body part primitives ─── */
const capsuleArgs = (r: number, h: number): [number, number, number, number] => [r, r, h, 16];

const BodyMesh = ({
  geometry,
  position,
  scale,
  rotation,
  color = "#d4a88c",
}: {
  geometry: THREE.BufferGeometry;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}) => (
  <mesh geometry={geometry} position={position} scale={scale} rotation={rotation}>
    <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
  </mesh>
);

/* ─── the full figure ─── */
const HumanFigure = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Neutral skin tone
  const skin = "#d4a88c";
  const skinDark = "#c49478";

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* ── Head ── */}
      <mesh position={[0, 3.45, 0]}>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial color={skin} roughness={0.6} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 3.0, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.22, 12]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>

      {/* ── Torso ── */}
      {/* Upper torso (chest/pecs) */}
      <mesh position={[0, 2.5, 0]} scale={[1, 1, 0.55]}>
        <capsuleGeometry args={capsuleArgs(0.5, 0.5)} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>

      {/* Lower torso (abs/core) */}
      <mesh position={[0, 1.8, 0]} scale={[0.9, 1, 0.5]}>
        <capsuleGeometry args={capsuleArgs(0.42, 0.3)} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>

      {/* Hips */}
      <mesh position={[0, 1.25, 0]} scale={[1.05, 0.7, 0.55]}>
        <sphereGeometry args={[0.45, 20, 20]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>

      {/* ── Shoulders ── */}
      <mesh position={[-0.6, 2.8, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>
      <mesh position={[0.6, 2.8, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>

      {/* ── Upper Arms (Biceps/Triceps) ── */}
      <mesh position={[-0.72, 2.35, 0]} rotation={[0, 0, 0.15]}>
        <capsuleGeometry args={capsuleArgs(0.13, 0.5)} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>
      <mesh position={[0.72, 2.35, 0]} rotation={[0, 0, -0.15]}>
        <capsuleGeometry args={capsuleArgs(0.13, 0.5)} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>

      {/* ── Forearms ── */}
      <mesh position={[-0.8, 1.75, 0]} rotation={[0, 0, 0.08]}>
        <capsuleGeometry args={capsuleArgs(0.1, 0.5)} />
        <meshStandardMaterial color={skinDark} roughness={0.7} />
      </mesh>
      <mesh position={[0.8, 1.75, 0]} rotation={[0, 0, -0.08]}>
        <capsuleGeometry args={capsuleArgs(0.1, 0.5)} />
        <meshStandardMaterial color={skinDark} roughness={0.7} />
      </mesh>

      {/* ── Hands ── */}
      <mesh position={[-0.83, 1.3, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color={skinDark} roughness={0.7} />
      </mesh>
      <mesh position={[0.83, 1.3, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color={skinDark} roughness={0.7} />
      </mesh>

      {/* ── Upper Legs (Quads/Hamstrings) ── */}
      <mesh position={[-0.25, 0.6, 0]}>
        <capsuleGeometry args={capsuleArgs(0.18, 0.55)} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>
      <mesh position={[0.25, 0.6, 0]}>
        <capsuleGeometry args={capsuleArgs(0.18, 0.55)} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>

      {/* ── Lower Legs (Calves) ── */}
      <mesh position={[-0.25, -0.2, 0]}>
        <capsuleGeometry args={capsuleArgs(0.13, 0.55)} />
        <meshStandardMaterial color={skinDark} roughness={0.7} />
      </mesh>
      <mesh position={[0.25, -0.2, 0]}>
        <capsuleGeometry args={capsuleArgs(0.13, 0.55)} />
        <meshStandardMaterial color={skinDark} roughness={0.7} />
      </mesh>

      {/* ── Feet ── */}
      <mesh position={[-0.25, -0.7, 0.06]} scale={[0.8, 0.4, 1.3]}>
        <sphereGeometry args={[0.13, 12, 12]} />
        <meshStandardMaterial color={skinDark} roughness={0.7} />
      </mesh>
      <mesh position={[0.25, -0.7, 0.06]} scale={[0.8, 0.4, 1.3]}>
        <sphereGeometry args={[0.13, 12, 12]} />
        <meshStandardMaterial color={skinDark} roughness={0.7} />
      </mesh>

      {/* ── MUSCLE LABELS ── */}
      {/* Front */}
      <MuscleLabel position={[0.85, 2.65, 0.15]} text="Deltoids" />
      <MuscleLabel position={[0.95, 2.35, 0.15]} text="Biceps" />
      <MuscleLabel position={[-0.95, 1.75, 0.15]} text="Forearms" side="left" />
      <MuscleLabel position={[0.7, 2.55, 0.3]} text="Pectorals" />
      <MuscleLabel position={[0.65, 1.8, 0.3]} text="Abdominals" />
      <MuscleLabel position={[-0.65, 1.25, 0.3]} text="Hip Flexors" side="left" />
      <MuscleLabel position={[0.55, 0.6, 0.2]} text="Quadriceps" />
      <MuscleLabel position={[-0.55, -0.15, 0.2]} text="Calves" side="left" />
      <MuscleLabel position={[-0.55, 0.6, 0.2]} text="Adductors" side="left" />

      {/* Back */}
      <MuscleLabel position={[0.7, 2.5, -0.3]} text="Trapezius" />
      <MuscleLabel position={[-0.95, 2.35, -0.15]} text="Triceps" side="left" />
      <MuscleLabel position={[0.7, 2.1, -0.3]} text="Lats" />
      <MuscleLabel position={[-0.7, 1.5, -0.3]} text="Glutes" side="left" />
      <MuscleLabel position={[0.55, 0.6, -0.2]} text="Hamstrings" />
    </group>
  );
};

/* ─── scene wrapper ─── */
const AnatomyBody = () => {
  return (
    <div className="w-full max-w-lg mx-auto" style={{ height: "520px" }}>
      <Canvas camera={{ position: [0, 1.8, 5.5], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={0.8} />
        <directionalLight position={[-3, 3, -4]} intensity={0.3} />
        <HumanFigure />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
          autoRotate
          autoRotateSpeed={1.5}
        />
      </Canvas>
      <p className="text-center text-xs text-muted-foreground mt-2">
        Click &amp; drag to rotate • Auto-rotates
      </p>
    </div>
  );
};

export default AnatomyBody;
