import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

/* ── colour palette ── */
const BONE = "#e8dfd0";
const BONE_DARK = "#c4b8a5";
const MUSCLE = "#c46b5e";
const MUSCLE_DARK = "#a04d42";
const TENDON = "#d4a68c";
const JOINT = "#bfb3a0";

/* ── helpers ── */
function lathe(points: [number, number][], segments = 24) {
  const pts = points.map(([x, y]) => new THREE.Vector2(x, y));
  return new THREE.LatheGeometry(pts, segments);
}

function tube(path: THREE.Vector3[], radius = 0.08, segments = 12) {
  const curve = new THREE.CatmullRomCurve3(path);
  return new THREE.TubeGeometry(curve, 20, radius, segments, false);
}

/* ── Skeleton layer ── */
function Skeleton() {
  const boneM = useMemo(() => new THREE.MeshStandardMaterial({ color: BONE, roughness: 0.6 }), []);
  const boneDarkM = useMemo(() => new THREE.MeshStandardMaterial({ color: BONE_DARK, roughness: 0.5 }), []);
  const jointM = useMemo(() => new THREE.MeshStandardMaterial({ color: JOINT, roughness: 0.4 }), []);

  /* Spine */
  const spinePath = Array.from({ length: 12 }, (_, i) => {
    const t = i / 11;
    return new THREE.Vector3(Math.sin(t * 0.3) * 0.02, -0.6 + t * 1.4, 0);
  });

  /* Rib cage */
  const ribs = useMemo(() => {
    const g = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const y = 0.25 + i * 0.08;
      const spread = 0.18 - i * 0.015;
      const ribPath = Array.from({ length: 8 }, (_, j) => {
        const a = (j / 7) * Math.PI;
        return new THREE.Vector3(Math.sin(a) * spread, y, Math.cos(a) * 0.06);
      });
      const ribGeo = tube(ribPath, 0.012);
      // We'll return the data instead of creating meshes here
      void ribGeo; // handled in JSX
    }
    return g;
  }, []);

  /* Pelvis profile */
  const pelvisGeo = lathe([
    [0, -0.62], [0.08, -0.58], [0.18, -0.52], [0.22, -0.45],
    [0.2, -0.4], [0.12, -0.38], [0.06, -0.4], [0, -0.42],
  ], 20);

  /* Skull */
  const skullGeo = lathe([
    [0, 1.05], [0.06, 1.02], [0.1, 0.95], [0.11, 0.88],
    [0.1, 0.82], [0.08, 0.78], [0.06, 0.76], [0, 0.75],
  ], 20);

  /* Jaw */
  const jawGeo = lathe([
    [0, 0.76], [0.06, 0.75], [0.07, 0.72], [0.05, 0.68],
    [0, 0.67],
  ], 16);

  return (
    <group>
      {/* Spine */}
      <mesh geometry={tube(spinePath, 0.015)} material={boneDarkM} />

      {/* Ribs */}
      {Array.from({ length: 6 }, (_, i) => {
        const y = 0.25 + i * 0.08;
        const spread = 0.18 - i * 0.015;
        const ribPath = Array.from({ length: 8 }, (_, j) => {
          const a = (j / 7) * Math.PI;
          return new THREE.Vector3(Math.sin(a) * spread, y, Math.cos(a) * 0.06);
        });
        return <mesh key={i} geometry={tube(ribPath, 0.012)} material={boneM} />;
      })}

      {/* Pelvis */}
      <mesh geometry={pelvisGeo} material={boneM} />

      {/* Skull */}
      <mesh geometry={skullGeo} material={boneM} />
      <mesh geometry={jawGeo} material={boneDarkM} />

      {/* Eye sockets */}
      <mesh position={[-0.04, 0.88, 0.08]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0.04, 0.88, 0.08]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Shoulder joints */}
      <mesh position={[-0.22, 0.55, 0]} material={jointM}>
        <sphereGeometry args={[0.03, 12, 12]} />
      </mesh>
      <mesh position={[0.22, 0.55, 0]} material={jointM}>
        <sphereGeometry args={[0.03, 12, 12]} />
      </mesh>

      {/* Upper arm bones */}
      {[-1, 1].map((side) => (
        <mesh key={`humerus-${side}`} geometry={tube([
          new THREE.Vector3(side * 0.22, 0.55, 0),
          new THREE.Vector3(side * 0.26, 0.35, 0.01),
          new THREE.Vector3(side * 0.28, 0.15, 0),
        ], 0.018)} material={boneM} />
      ))}

      {/* Elbow joints */}
      <mesh position={[-0.28, 0.15, 0]} material={jointM}><sphereGeometry args={[0.022, 10, 10]} /></mesh>
      <mesh position={[0.28, 0.15, 0]} material={jointM}><sphereGeometry args={[0.022, 10, 10]} /></mesh>

      {/* Forearm bones (radius & ulna) */}
      {[-1, 1].map((side) => (
        <group key={`forearm-${side}`}>
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.28, 0.15, 0.01),
            new THREE.Vector3(side * 0.3, 0, 0.01),
            new THREE.Vector3(side * 0.3, -0.15, 0),
          ], 0.013)} material={boneM} />
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.28, 0.15, -0.01),
            new THREE.Vector3(side * 0.29, 0, -0.01),
            new THREE.Vector3(side * 0.29, -0.15, 0),
          ], 0.011)} material={boneDarkM} />
        </group>
      ))}

      {/* Wrist / hand */}
      {[-1, 1].map((side) => (
        <mesh key={`hand-${side}`} position={[side * 0.3, -0.18, 0]} material={boneM}>
          <boxGeometry args={[0.04, 0.06, 0.02]} />
        </mesh>
      ))}

      {/* Femur bones */}
      {[-1, 1].map((side) => (
        <mesh key={`femur-${side}`} geometry={tube([
          new THREE.Vector3(side * 0.1, -0.58, 0),
          new THREE.Vector3(side * 0.12, -0.75, 0.02),
          new THREE.Vector3(side * 0.11, -0.95, 0.01),
          new THREE.Vector3(side * 0.1, -1.1, 0),
        ], 0.022)} material={boneM} />
      ))}

      {/* Knee joints */}
      <mesh position={[-0.1, -1.1, 0.015]} material={jointM}><sphereGeometry args={[0.028, 10, 10]} /></mesh>
      <mesh position={[0.1, -1.1, 0.015]} material={jointM}><sphereGeometry args={[0.028, 10, 10]} /></mesh>

      {/* Tibia / fibula */}
      {[-1, 1].map((side) => (
        <group key={`shin-${side}`}>
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.1, -1.1, 0.01),
            new THREE.Vector3(side * 0.09, -1.35, 0.01),
            new THREE.Vector3(side * 0.08, -1.58, 0),
          ], 0.018)} material={boneM} />
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.1, -1.1, -0.01),
            new THREE.Vector3(side * 0.1, -1.35, -0.01),
            new THREE.Vector3(side * 0.09, -1.55, 0),
          ], 0.012)} material={boneDarkM} />
        </group>
      ))}

      {/* Ankle / foot */}
      {[-1, 1].map((side) => (
        <group key={`foot-${side}`}>
          <mesh position={[side * 0.085, -1.6, 0]} material={jointM}>
            <sphereGeometry args={[0.022, 10, 10]} />
          </mesh>
          <mesh position={[side * 0.085, -1.63, 0.03]} material={boneM}>
            <boxGeometry args={[0.05, 0.02, 0.09]} />
          </mesh>
        </group>
      ))}

      {/* Clavicles */}
      {[-1, 1].map((side) => (
        <mesh key={`clav-${side}`} geometry={tube([
          new THREE.Vector3(0, 0.58, 0.03),
          new THREE.Vector3(side * 0.12, 0.57, 0.04),
          new THREE.Vector3(side * 0.22, 0.55, 0.02),
        ], 0.012)} material={boneDarkM} />
      ))}

      {/* Scapulae (simplified) */}
      {[-1, 1].map((side) => (
        <mesh key={`scap-${side}`} position={[side * 0.18, 0.45, -0.05]} rotation={[0, 0, side * 0.2]} material={boneM}>
          <boxGeometry args={[0.1, 0.12, 0.01]} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Muscle layer ── */
function Muscles() {
  const muscleM = useMemo(() => new THREE.MeshStandardMaterial({
    color: MUSCLE, roughness: 0.55, transparent: true, opacity: 0.85,
  }), []);
  const muscleDarkM = useMemo(() => new THREE.MeshStandardMaterial({
    color: MUSCLE_DARK, roughness: 0.5, transparent: true, opacity: 0.8,
  }), []);
  const tendonM = useMemo(() => new THREE.MeshStandardMaterial({
    color: TENDON, roughness: 0.4, transparent: true, opacity: 0.8,
  }), []);

  return (
    <group>
      {/* ── Torso muscles ── */}
      {/* Pectorals */}
      {[-1, 1].map((side) => (
        <mesh key={`pec-${side}`} geometry={tube([
          new THREE.Vector3(0, 0.52, 0.06),
          new THREE.Vector3(side * 0.08, 0.48, 0.09),
          new THREE.Vector3(side * 0.15, 0.42, 0.08),
          new THREE.Vector3(side * 0.2, 0.5, 0.04),
        ], 0.04)} material={muscleM} />
      ))}

      {/* Abdominals */}
      {Array.from({ length: 4 }, (_, i) => {
        const y = 0.38 - i * 0.08;
        return [-1, 1].map((side) => (
          <mesh key={`ab-${i}-${side}`} position={[side * 0.04, y, 0.07]}>
            <boxGeometry args={[0.06, 0.06, 0.03]} />
            <meshStandardMaterial color={MUSCLE} roughness={0.5} transparent opacity={0.8} />
          </mesh>
        ));
      })}

      {/* Obliques */}
      {[-1, 1].map((side) => (
        <mesh key={`oblique-${side}`} geometry={tube([
          new THREE.Vector3(side * 0.15, 0.35, 0.05),
          new THREE.Vector3(side * 0.17, 0.2, 0.06),
          new THREE.Vector3(side * 0.14, 0.05, 0.04),
        ], 0.035)} material={muscleDarkM} />
      ))}

      {/* Trapezius */}
      <mesh geometry={tube([
        new THREE.Vector3(-0.15, 0.55, -0.02),
        new THREE.Vector3(-0.05, 0.62, -0.03),
        new THREE.Vector3(0, 0.65, -0.03),
        new THREE.Vector3(0.05, 0.62, -0.03),
        new THREE.Vector3(0.15, 0.55, -0.02),
      ], 0.04)} material={muscleDarkM} />

      {/* Lats */}
      {[-1, 1].map((side) => (
        <mesh key={`lat-${side}`} geometry={tube([
          new THREE.Vector3(side * 0.18, 0.45, -0.04),
          new THREE.Vector3(side * 0.2, 0.3, -0.03),
          new THREE.Vector3(side * 0.16, 0.1, -0.02),
          new THREE.Vector3(side * 0.08, -0.05, 0),
        ], 0.04)} material={muscleDarkM} />
      ))}

      {/* ── Arm muscles ── */}
      {[-1, 1].map((side) => (
        <group key={`arm-muscles-${side}`}>
          {/* Deltoid */}
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.15, 0.58, 0.02),
            new THREE.Vector3(side * 0.24, 0.55, 0.02),
            new THREE.Vector3(side * 0.26, 0.45, 0),
          ], 0.035)} material={muscleM} />

          {/* Bicep */}
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.24, 0.5, 0.03),
            new THREE.Vector3(side * 0.26, 0.38, 0.04),
            new THREE.Vector3(side * 0.28, 0.25, 0.03),
            new THREE.Vector3(side * 0.28, 0.17, 0.01),
          ], 0.03)} material={muscleM} />

          {/* Tricep */}
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.23, 0.5, -0.02),
            new THREE.Vector3(side * 0.25, 0.38, -0.03),
            new THREE.Vector3(side * 0.27, 0.25, -0.02),
            new THREE.Vector3(side * 0.28, 0.17, -0.01),
          ], 0.025)} material={muscleDarkM} />

          {/* Forearm muscles */}
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.28, 0.14, 0.01),
            new THREE.Vector3(side * 0.3, 0.02, 0.01),
            new THREE.Vector3(side * 0.3, -0.1, 0),
          ], 0.022)} material={muscleM} />
        </group>
      ))}

      {/* ── Leg muscles ── */}
      {[-1, 1].map((side) => (
        <group key={`leg-muscles-${side}`}>
          {/* Gluteus */}
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.12, -0.42, -0.04),
            new THREE.Vector3(side * 0.16, -0.52, -0.05),
            new THREE.Vector3(side * 0.13, -0.62, -0.03),
          ], 0.05)} material={muscleDarkM} />

          {/* Quadriceps */}
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.12, -0.58, 0.03),
            new THREE.Vector3(side * 0.13, -0.72, 0.05),
            new THREE.Vector3(side * 0.12, -0.88, 0.04),
            new THREE.Vector3(side * 0.11, -1.05, 0.03),
          ], 0.04)} material={muscleM} />

          {/* Hamstrings */}
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.11, -0.6, -0.03),
            new THREE.Vector3(side * 0.12, -0.78, -0.04),
            new THREE.Vector3(side * 0.11, -0.95, -0.03),
            new THREE.Vector3(side * 0.1, -1.08, -0.01),
          ], 0.035)} material={muscleDarkM} />

          {/* Calf (gastrocnemius) */}
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.1, -1.12, -0.01),
            new THREE.Vector3(side * 0.1, -1.25, -0.03),
            new THREE.Vector3(side * 0.09, -1.38, -0.02),
            new THREE.Vector3(side * 0.085, -1.5, 0),
          ], 0.03)} material={muscleM} />

          {/* Tibialis anterior */}
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.1, -1.12, 0.02),
            new THREE.Vector3(side * 0.095, -1.3, 0.03),
            new THREE.Vector3(side * 0.09, -1.48, 0.02),
          ], 0.02)} material={muscleM} />

          {/* Achilles tendon */}
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.085, -1.5, -0.01),
            new THREE.Vector3(side * 0.085, -1.58, -0.02),
          ], 0.01)} material={tendonM} />

          {/* Adductors (inner thigh) */}
          <mesh geometry={tube([
            new THREE.Vector3(side * 0.06, -0.55, 0),
            new THREE.Vector3(side * 0.08, -0.7, 0.01),
            new THREE.Vector3(side * 0.09, -0.9, 0),
          ], 0.03)} material={muscleDarkM} />
        </group>
      ))}

      {/* Neck muscles (sternocleidomastoid) */}
      {[-1, 1].map((side) => (
        <mesh key={`neck-${side}`} geometry={tube([
          new THREE.Vector3(side * 0.06, 0.62, 0.02),
          new THREE.Vector3(side * 0.04, 0.68, 0.02),
          new THREE.Vector3(side * 0.02, 0.74, 0.01),
        ], 0.018)} material={muscleM} />
      ))}
    </group>
  );
}

/* ── Labels ── */
interface LabelData {
  position: [number, number, number];
  text: string;
  description: string;
}

const muscleLabels: LabelData[] = [
  { position: [0.32, 0.55, 0.1], text: "Deltoid", description: "Shoulder muscle enabling arm rotation and lifting" },
  { position: [0.35, 0.35, 0.1], text: "Biceps", description: "Upper arm flexor for bending the elbow" },
  { position: [-0.35, 0.35, -0.08], text: "Triceps", description: "Upper arm extensor for straightening the elbow" },
  { position: [0.3, 0.48, 0.15], text: "Pectoralis", description: "Chest muscle for arm adduction and rotation" },
  { position: [-0.3, 0.2, 0.1], text: "Abs", description: "Core muscles supporting posture and trunk flexion" },
  { position: [0.28, 0.3, -0.1], text: "Latissimus", description: "Large back muscle for pulling and posture" },
  { position: [0.0, 0.62, -0.08], text: "Trapezius", description: "Upper back muscle supporting neck and shoulders" },
  { position: [-0.25, -0.78, 0.1], text: "Quadriceps", description: "Front thigh muscles for knee extension" },
  { position: [0.25, -0.78, -0.1], text: "Hamstrings", description: "Rear thigh muscles for knee flexion" },
  { position: [-0.22, -1.3, -0.08], text: "Gastrocnemius", description: "Calf muscle for ankle plantar flexion" },
  { position: [0.25, -0.5, -0.1], text: "Gluteus", description: "Hip extensor for walking and standing" },
];

const skeletonLabels: LabelData[] = [
  { position: [0.18, 0.9, 0.12], text: "Cranium", description: "Protects the brain and supports facial structures" },
  { position: [0.3, 0.57, 0.08], text: "Clavicle", description: "Collarbone connecting shoulder to sternum" },
  { position: [-0.3, 0.35, 0], text: "Humerus", description: "Upper arm bone from shoulder to elbow" },
  { position: [0.3, 0, 0], text: "Radius/Ulna", description: "Paired forearm bones enabling rotation" },
  { position: [-0.25, 0.35, 0.1], text: "Rib cage", description: "Protects heart and lungs, aids breathing" },
  { position: [0, 0.6, 0.08], text: "Sternum", description: "Breastbone connecting the ribs" },
  { position: [0, -0.5, 0.12], text: "Pelvis", description: "Hip bones supporting the upper body" },
  { position: [-0.2, -0.85, 0.06], text: "Femur", description: "Thigh bone, longest bone in the body" },
  { position: [0.2, -1.35, 0.06], text: "Tibia/Fibula", description: "Shin bones from knee to ankle" },
  { position: [0, 0.3, -0.06], text: "Vertebrae", description: "Spinal column protecting the spinal cord" },
];

function Label({ data, visible }: { data: LabelData; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  if (!visible) return null;

  return (
    <Html position={data.position} distanceFactor={2.5} zIndexRange={[10, 0]}>
      <div
        className="cursor-pointer select-none"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <div className="bg-card/90 backdrop-blur-sm border border-border/40 rounded-md px-2 py-1 shadow-soft whitespace-nowrap">
          <span className="font-body text-xs text-foreground font-semibold">{data.text}</span>
        </div>
        {hovered && (
          <div className="absolute left-0 top-full mt-1 bg-card border border-border/40 rounded-md px-3 py-2 shadow-card max-w-[200px] z-50">
            <p className="font-body text-xs text-muted-foreground leading-relaxed">{data.description}</p>
          </div>
        )}
      </div>
    </Html>
  );
}

/* ── Scene ── */
function Scene({ showSkeleton, showMuscles, showLabels }: {
  showSkeleton: boolean;
  showMuscles: boolean;
  showLabels: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={0.8} />
      <directionalLight position={[-3, 3, -2]} intensity={0.3} />
      <pointLight position={[0, 2, 3]} intensity={0.3} />

      <group ref={groupRef} position={[0, 0.2, 0]}>
        {showSkeleton && <Skeleton />}
        {showMuscles && <Muscles />}

        {showLabels && showSkeleton && skeletonLabels.map((l) => (
          <Label key={l.text} data={l} visible={!showMuscles} />
        ))}
        {showLabels && showMuscles && muscleLabels.map((l) => (
          <Label key={l.text} data={l} visible />
        ))}
      </group>

      <OrbitControls
        enablePan={false}
        minDistance={1.5}
        maxDistance={5}
        autoRotate={false}
        target={[0, 0, 0]}
      />
    </>
  );
}

/* ── Main component ── */
export default function AnatomyViewer() {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showMuscles, setShowMuscles] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const toggleBtn = (label: string, active: boolean, onClick: () => void) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-body text-sm transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-accent"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {toggleBtn("Skeleton", showSkeleton, () => setShowSkeleton((v) => !v))}
        {toggleBtn("Muscles", showMuscles, () => setShowMuscles((v) => !v))}
        {toggleBtn("Labels", showLabels, () => setShowLabels((v) => !v))}
      </div>

      {/* Canvas */}
      <div className="w-full aspect-[3/4] max-w-lg mx-auto rounded-xl overflow-hidden bg-card border border-border/30 shadow-card">
        <Canvas camera={{ position: [0, 0.2, 2.8], fov: 40 }}>
          <Scene showSkeleton={showSkeleton} showMuscles={showMuscles} showLabels={showLabels} />
        </Canvas>
      </div>

      <p className="text-center font-body text-xs text-muted-foreground mt-4">
        Click and drag to rotate · Scroll to zoom · Hover labels for details
      </p>
    </div>
  );
}
