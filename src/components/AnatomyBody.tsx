import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/* ─── label ─── */
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

/* ─── smoothed body part using LatheGeometry for organic shapes ─── */
const skin = "#c9a48a";
const skinLight = "#d4b49a";
const muscle = "#b8897a";

const HumanFigure = () => {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>

      {/* ══════ HEAD ══════ */}
      {/* Cranium */}
      <mesh position={[0, 4.05, 0]} scale={[0.85, 1, 0.9]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color={skinLight} roughness={0.55} />
      </mesh>
      {/* Jaw */}
      <mesh position={[0, 3.72, 0.04]} scale={[0.7, 0.55, 0.65]}>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial color={skinLight} roughness={0.6} />
      </mesh>

      {/* ══════ NECK ══════ */}
      <mesh position={[0, 3.48, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.3, 16]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>

      {/* ══════ TORSO ══════ */}
      {/* Upper chest / pecs */}
      <mesh position={[0, 3.05, 0]} scale={[1, 0.8, 0.52]}>
        <capsuleGeometry args={[0.48, 0.3, 16, 24]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>
      {/* Ribcage taper */}
      <mesh position={[0, 2.55, 0]} scale={[0.92, 0.85, 0.48]}>
        <capsuleGeometry args={[0.42, 0.25, 16, 24]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>
      {/* Waist */}
      <mesh position={[0, 2.1, 0]} scale={[0.78, 0.7, 0.44]}>
        <capsuleGeometry args={[0.36, 0.2, 16, 24]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>
      {/* Pelvis / hips */}
      <mesh position={[0, 1.65, 0]} scale={[1, 0.65, 0.5]}>
        <sphereGeometry args={[0.46, 24, 24]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>

      {/* ══════ SHOULDERS ══════ */}
      {/* Left */}
      <mesh position={[-0.55, 3.18, 0]}>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshStandardMaterial color={muscle} roughness={0.6} />
      </mesh>
      {/* Right */}
      <mesh position={[0.55, 3.18, 0]}>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshStandardMaterial color={muscle} roughness={0.6} />
      </mesh>

      {/* ══════ UPPER ARMS ══════ */}
      {/* Left */}
      <mesh position={[-0.62, 2.72, 0]} rotation={[0, 0, 0.12]}>
        <capsuleGeometry args={[0.12, 0.5, 12, 16]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>
      {/* Right */}
      <mesh position={[0.62, 2.72, 0]} rotation={[0, 0, -0.12]}>
        <capsuleGeometry args={[0.12, 0.5, 12, 16]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>

      {/* ══════ ELBOWS ══════ */}
      <mesh position={[-0.66, 2.3, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>
      <mesh position={[0.66, 2.3, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>

      {/* ══════ FOREARMS ══════ */}
      <mesh position={[-0.68, 1.85, 0]} rotation={[0, 0, 0.05]}>
        <capsuleGeometry args={[0.09, 0.5, 12, 16]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>
      <mesh position={[0.68, 1.85, 0]} rotation={[0, 0, -0.05]}>
        <capsuleGeometry args={[0.09, 0.5, 12, 16]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>

      {/* ══════ WRISTS / HANDS ══════ */}
      <mesh position={[-0.7, 1.42, 0]} scale={[0.7, 1.1, 0.45]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color={skinLight} roughness={0.6} />
      </mesh>
      <mesh position={[0.7, 1.42, 0]} scale={[0.7, 1.1, 0.45]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color={skinLight} roughness={0.6} />
      </mesh>

      {/* ══════ UPPER LEGS / THIGHS ══════ */}
      <mesh position={[-0.22, 1.0, 0]} rotation={[0, 0, 0.03]}>
        <capsuleGeometry args={[0.17, 0.6, 12, 16]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>
      <mesh position={[0.22, 1.0, 0]} rotation={[0, 0, -0.03]}>
        <capsuleGeometry args={[0.17, 0.6, 12, 16]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>

      {/* ══════ KNEES ══════ */}
      <mesh position={[-0.22, 0.52, 0.02]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>
      <mesh position={[0.22, 0.52, 0.02]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>

      {/* ══════ LOWER LEGS / CALVES ══════ */}
      <mesh position={[-0.22, 0.05, 0]}>
        <capsuleGeometry args={[0.11, 0.55, 12, 16]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>
      <mesh position={[0.22, 0.05, 0]}>
        <capsuleGeometry args={[0.11, 0.55, 12, 16]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>

      {/* ══════ ANKLES ══════ */}
      <mesh position={[-0.22, -0.42, 0]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>
      <mesh position={[0.22, -0.42, 0]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>

      {/* ══════ FEET ══════ */}
      <mesh position={[-0.22, -0.52, 0.08]} scale={[0.7, 0.35, 1.3]}>
        <sphereGeometry args={[0.12, 14, 14]} />
        <meshStandardMaterial color={skinLight} roughness={0.6} />
      </mesh>
      <mesh position={[0.22, -0.52, 0.08]} scale={[0.7, 0.35, 1.3]}>
        <sphereGeometry args={[0.12, 14, 14]} />
        <meshStandardMaterial color={skinLight} roughness={0.6} />
      </mesh>

      {/* ══════ MUSCLE LABELS ══════ */}
      {/* Front */}
      <MuscleLabel position={[0.8, 3.18, 0.15]} text="Deltoids" />
      <MuscleLabel position={[0.85, 2.72, 0.15]} text="Biceps" />
      <MuscleLabel position={[-0.85, 1.85, 0.15]} text="Forearms" side="left" />
      <MuscleLabel position={[0.7, 3.0, 0.3]} text="Pectorals" />
      <MuscleLabel position={[0.6, 2.3, 0.3]} text="Abdominals" />
      <MuscleLabel position={[-0.6, 1.65, 0.3]} text="Hip Flexors" side="left" />
      <MuscleLabel position={[0.55, 1.0, 0.2]} text="Quadriceps" />
      <MuscleLabel position={[-0.5, 0.05, 0.15]} text="Calves" side="left" />
      <MuscleLabel position={[-0.5, 1.0, 0.15]} text="Adductors" side="left" />

      {/* Back */}
      <MuscleLabel position={[0.65, 3.35, -0.2]} text="Trapezius" />
      <MuscleLabel position={[-0.85, 2.72, -0.15]} text="Triceps" side="left" />
      <MuscleLabel position={[0.65, 2.6, -0.3]} text="Lats" />
      <MuscleLabel position={[-0.65, 1.65, -0.3]} text="Glutes" side="left" />
      <MuscleLabel position={[0.55, 1.0, -0.2]} text="Hamstrings" />
    </group>
  );
};

/* ─── scene wrapper ─── */
const AnatomyBody = () => {
  return (
    <div className="w-full max-w-lg mx-auto" style={{ height: "560px" }}>
      <Canvas camera={{ position: [0, 2.2, 5.2], fov: 42 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={0.9} />
        <directionalLight position={[-3, 3, -4]} intensity={0.35} />
        <directionalLight position={[0, -2, 3]} intensity={0.15} />
        <HumanFigure />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>
      <p className="text-center text-xs text-muted-foreground mt-2">
        Click &amp; drag to rotate
      </p>
    </div>
  );
};

export default AnatomyBody;
