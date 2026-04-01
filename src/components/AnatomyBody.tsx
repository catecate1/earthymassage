import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
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

/* ─── colors matching anatomy chart ─── */
const colors = {
  muscle: "#c46b5e",
  muscleDark: "#a8524a",
  muscleLight: "#d4857a",
  tendon: "#e8cfc0",
  skin: "#d4a088",
};

/* ─── Lathe-based organic shapes ─── */
const createLatheGeometry = (
  points: [number, number][],
  segments = 32
): THREE.LatheGeometry => {
  const vec2Points = points.map(([x, y]) => new THREE.Vector2(x, y));
  return new THREE.LatheGeometry(vec2Points, segments);
};

/* ─── TORSO shape via Lathe ─── */
const TorsoMesh = () => {
  const geo = useMemo(() => {
    // Profile from neck down to hips (right side silhouette)
    const points: [number, number][] = [
      [0.0, 0],       // center bottom (crotch)
      [0.38, 0.05],   // inner hip
      [0.46, 0.15],   // hip width
      [0.44, 0.35],   // waist narrowing
      [0.36, 0.55],   // waist
      [0.34, 0.65],   // lower ribs
      [0.40, 0.85],   // ribcage
      [0.46, 1.0],    // chest
      [0.48, 1.1],    // upper chest
      [0.42, 1.25],   // shoulders start
      [0.22, 1.35],   // neck base
      [0.14, 1.42],   // neck
      [0.0, 1.45],    // center top
    ];
    return createLatheGeometry(points, 32);
  }, []);

  return (
    <mesh geometry={geo} position={[0, 1.45, 0]}>
      <meshStandardMaterial
        color={colors.muscle}
        roughness={0.55}
        metalness={0.02}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/* ─── HEAD shape via Lathe ─── */
const HeadMesh = () => {
  const geo = useMemo(() => {
    const points: [number, number][] = [
      [0.0, -0.02],
      [0.14, 0.0],
      [0.2, 0.06],    // jaw
      [0.22, 0.14],   // chin to cheek
      [0.26, 0.25],   // cheek
      [0.28, 0.35],   // temple
      [0.27, 0.45],   // forehead
      [0.24, 0.52],   // top forehead
      [0.18, 0.58],   // crown
      [0.08, 0.6],    // top
      [0.0, 0.61],
    ];
    return createLatheGeometry(points, 28);
  }, []);

  return (
    <mesh geometry={geo} position={[0, 3.4, 0]}>
      <meshStandardMaterial
        color={colors.muscleLight}
        roughness={0.5}
        metalness={0.02}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/* ─── LIMB via Lathe (organic taper) ─── */
const LimbMesh = ({
  position,
  rotation,
  profile,
  color = colors.muscle,
  scale,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  profile: [number, number][];
  color?: string;
  scale?: [number, number, number];
}) => {
  const geo = useMemo(() => createLatheGeometry(profile, 20), [profile]);
  return (
    <mesh geometry={geo} position={position} rotation={rotation} scale={scale}>
      <meshStandardMaterial
        color={color}
        roughness={0.55}
        metalness={0.02}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/* ─── limb profiles ─── */
const upperArmProfile: [number, number][] = [
  [0.0, 0.0],
  [0.1, 0.03],
  [0.13, 0.1],
  [0.14, 0.2],   // bicep peak
  [0.13, 0.35],
  [0.11, 0.45],
  [0.1, 0.52],
  [0.08, 0.55],
  [0.0, 0.56],
];

const forearmProfile: [number, number][] = [
  [0.0, 0.0],
  [0.07, 0.02],
  [0.1, 0.08],
  [0.11, 0.15],  // widest
  [0.1, 0.28],
  [0.08, 0.4],
  [0.06, 0.48],
  [0.05, 0.52],
  [0.0, 0.53],
];

const handProfile: [number, number][] = [
  [0.0, 0.0],
  [0.05, 0.01],
  [0.065, 0.04],
  [0.07, 0.08],
  [0.06, 0.13],
  [0.04, 0.17],
  [0.0, 0.18],
];

const thighProfile: [number, number][] = [
  [0.0, 0.0],
  [0.1, 0.02],
  [0.15, 0.06],
  [0.19, 0.15],  // widest (upper thigh)
  [0.2, 0.25],
  [0.19, 0.4],
  [0.17, 0.55],
  [0.14, 0.65],
  [0.12, 0.72],  // knee area
  [0.1, 0.75],
  [0.0, 0.76],
];

const calfProfile: [number, number][] = [
  [0.0, 0.0],
  [0.07, 0.02],
  [0.1, 0.06],
  [0.12, 0.12],
  [0.13, 0.2],   // calf peak
  [0.12, 0.32],
  [0.09, 0.45],
  [0.07, 0.55],
  [0.055, 0.6],
  [0.0, 0.62],
];

const footProfile: [number, number][] = [
  [0.0, 0.0],
  [0.06, 0.01],
  [0.09, 0.03],
  [0.1, 0.06],
  [0.08, 0.1],
  [0.05, 0.12],
  [0.0, 0.13],
];

/* ─── Shoulder cap ─── */
const shoulderProfile: [number, number][] = [
  [0.0, 0.0],
  [0.12, 0.02],
  [0.17, 0.06],
  [0.18, 0.12],
  [0.16, 0.18],
  [0.1, 0.22],
  [0.0, 0.24],
];

/* ─── Pec overlay ─── */
const PecMuscle = ({ side }: { side: "left" | "right" }) => {
  const x = side === "left" ? -0.18 : 0.18;
  return (
    <mesh position={[x, 2.85, 0.2]} scale={[1.4, 0.8, 0.6]}>
      <sphereGeometry args={[0.18, 20, 20]} />
      <meshStandardMaterial
        color={colors.muscleDark}
        roughness={0.5}
        metalness={0.02}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

/* ─── Ab definition lines ─── */
const AbLine = ({ y }: { y: number }) => (
  <mesh position={[0, y, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
    <planeGeometry args={[0.28, 0.008]} />
    <meshStandardMaterial color={colors.tendon} transparent opacity={0.5} />
  </mesh>
);

const AbCenter = () => (
  <mesh position={[0, 2.3, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
    <planeGeometry args={[0.008, 0.65]} />
    <meshStandardMaterial color={colors.tendon} transparent opacity={0.5} />
  </mesh>
);

/* ─── full figure ─── */
const HumanFigure = () => {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Head */}
      <HeadMesh />

      {/* Torso */}
      <TorsoMesh />

      {/* Pec overlays */}
      <PecMuscle side="left" />
      <PecMuscle side="right" />

      {/* Ab definition */}
      <AbCenter />
      <AbLine y={2.55} />
      <AbLine y={2.42} />
      <AbLine y={2.28} />
      <AbLine y={2.15} />

      {/* Shoulders */}
      <LimbMesh position={[-0.52, 2.88, 0]} profile={shoulderProfile} color={colors.muscleDark} />
      <LimbMesh position={[0.52, 2.88, 0]} profile={shoulderProfile} color={colors.muscleDark} />

      {/* Upper arms */}
      <LimbMesh position={[-0.6, 2.32, 0]} rotation={[0, 0, 0.1]} profile={upperArmProfile} />
      <LimbMesh position={[0.6, 2.32, 0]} rotation={[0, 0, -0.1]} profile={upperArmProfile} />

      {/* Forearms */}
      <LimbMesh position={[-0.65, 1.75, 0]} rotation={[0, 0, 0.05]} profile={forearmProfile} color={colors.muscleLight} />
      <LimbMesh position={[0.65, 1.75, 0]} rotation={[0, 0, -0.05]} profile={forearmProfile} color={colors.muscleLight} />

      {/* Hands */}
      <LimbMesh position={[-0.67, 1.38, 0]} profile={handProfile} color={colors.skin} />
      <LimbMesh position={[0.67, 1.38, 0]} profile={handProfile} color={colors.skin} />

      {/* Upper legs */}
      <LimbMesh position={[-0.2, 0.7, 0]} rotation={[0, 0, 0.02]} profile={thighProfile} />
      <LimbMesh position={[0.2, 0.7, 0]} rotation={[0, 0, -0.02]} profile={thighProfile} />

      {/* Calves */}
      <LimbMesh position={[-0.2, -0.12, 0]} profile={calfProfile} />
      <LimbMesh position={[0.2, -0.12, 0]} profile={calfProfile} />

      {/* Feet */}
      <LimbMesh position={[-0.2, -0.62, 0.05]} profile={footProfile} color={colors.skin} scale={[1, 1, 1.6]} />
      <LimbMesh position={[0.2, -0.62, 0.05]} profile={footProfile} color={colors.skin} scale={[1, 1, 1.6]} />

      {/* ══════ MUSCLE LABELS ══════ */}
      <MuscleLabel position={[0.78, 2.95, 0.15]} text="Deltoids" />
      <MuscleLabel position={[0.82, 2.55, 0.15]} text="Biceps" />
      <MuscleLabel position={[-0.82, 1.85, 0.15]} text="Forearms" side="left" />
      <MuscleLabel position={[0.68, 2.85, 0.3]} text="Pectorals" />
      <MuscleLabel position={[0.55, 2.35, 0.3]} text="Abdominals" />
      <MuscleLabel position={[-0.55, 1.6, 0.25]} text="Hip Flexors" side="left" />
      <MuscleLabel position={[0.52, 0.9, 0.2]} text="Quadriceps" />
      <MuscleLabel position={[-0.48, -0.05, 0.15]} text="Calves" side="left" />
      <MuscleLabel position={[-0.48, 0.9, 0.15]} text="Adductors" side="left" />

      <MuscleLabel position={[0.6, 3.2, -0.2]} text="Trapezius" />
      <MuscleLabel position={[-0.82, 2.55, -0.15]} text="Triceps" side="left" />
      <MuscleLabel position={[0.6, 2.55, -0.3]} text="Lats" />
      <MuscleLabel position={[-0.6, 1.55, -0.3]} text="Glutes" side="left" />
      <MuscleLabel position={[0.5, 0.9, -0.2]} text="Hamstrings" />
    </group>
  );
};

/* ─── scene ─── */
const AnatomyBody = () => {
  return (
    <div className="w-full max-w-lg mx-auto" style={{ height: "560px" }}>
      <Canvas camera={{ position: [0, 2.0, 5.0], fov: 42 }}>
        <ambientLight intensity={0.65} />
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
