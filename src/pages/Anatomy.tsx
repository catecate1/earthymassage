import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import anatomyFront from "@/assets/anatomy-front.jpg";
import anatomyBack from "@/assets/anatomy-back.jpg";

interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
  overlay?: ReactNode;
}
const MeridianOverlay = () => {
  const meridianLabels = [
    { name: "Ren (Conception)", x: 50, y: 9, targetX: 50, targetY: 14 },
    { name: "Lung", x: 30, y: 24, targetX: 40, targetY: 25 },
    { name: "Large Intestine", x: 70, y: 24, targetX: 60, targetY: 25 },
    { name: "Pericardium", x: 50, y: 31, targetX: 50, targetY: 34 },
    { name: "Heart", x: 26, y: 38, targetX: 38, targetY: 32 },
    { name: "Small Intestine", x: 74, y: 38, targetX: 62, targetY: 32 },
    { name: "Spleen", x: 24, y: 52, targetX: 34, targetY: 40 },
    { name: "Stomach", x: 76, y: 52, targetX: 66, targetY: 40 },
    { name: "Liver", x: 26, y: 68, targetX: 42, targetY: 46 },
    { name: "Gallbladder", x: 74, y: 68, targetX: 58, targetY: 46 },
    { name: "Kidney", x: 28, y: 82, targetX: 44, targetY: 72 },
    { name: "Bladder", x: 72, y: 82, targetX: 56, targetY: 72 },
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ overflow: "visible" }}
      role="img"
      aria-label="Diagram of the twelve meridian channels flowing through the front of the body"
    >
      <defs>
        <marker
          id="meridian-arrowhead"
          markerWidth="5"
          markerHeight="4"
          refX="4.5"
          refY="2"
          orient="auto"
        >
          <polygon points="0 0, 5 2, 0 4" fill="hsl(var(--foreground))" />
        </marker>
      </defs>

      {/* Meridian channels */}
      <g fill="none" strokeWidth="0.6" strokeLinecap="round">
        <path d="M45 6 C40 18 38 32 40 45 C42 60 46 75 48 90" stroke="hsl(var(--foreground))" strokeOpacity="0.5" />
        <path d="M55 6 C60 18 62 32 60 45 C58 60 54 75 52 90" stroke="hsl(var(--foreground))" strokeOpacity="0.5" />
        <path d="M47 24 C35 28 28 38 30 52 C32 66 38 78 42 88" stroke="hsl(var(--foreground))" strokeOpacity="0.55" />
        <path d="M53 24 C65 28 72 38 70 52 C68 66 62 78 58 88" stroke="hsl(var(--foreground))" strokeOpacity="0.55" />
        <path d="M50 12 C48 28 47 48 48 65 C49 78 50 88 50 90" stroke="hsl(var(--foreground))" strokeOpacity="0.55" />
        <path d="M42 32 C45 38 48 42 50 45 C52 42 55 38 58 32" stroke="hsl(var(--foreground))" strokeOpacity="0.55" />
        <path d="M50 34 C44 44 42 54 43 64 C44 74 47 84 50 90" stroke="hsl(var(--foreground))" strokeOpacity="0.55" />
        <path d="M50 34 C56 44 58 54 57 64 C56 74 53 84 50 90" stroke="hsl(var(--foreground))" strokeOpacity="0.55" />
        <path d="M36 40 C34 54 35 68 40 80" stroke="hsl(var(--foreground))" strokeOpacity="0.55" />
        <path d="M64 40 C66 54 65 68 60 80" stroke="hsl(var(--foreground))" strokeOpacity="0.55" />
        <path d="M44 28 C42 36 46 44 50 50 C54 44 58 36 56 28" stroke="hsl(var(--foreground))" strokeOpacity="0.55" />
        <path d="M50 50 C42 58 40 68 42 78 C44 86 48 92 50 92" stroke="hsl(var(--foreground))" strokeOpacity="0.55" />
        <path d="M50 50 C58 58 60 68 58 78 C56 86 52 92 50 92" stroke="hsl(var(--foreground))" strokeOpacity="0.55" />
      </g>

      {/* Direction arrows along central meridian */}
      <polygon points="48,26 50,22 52,26" fill="hsl(var(--foreground))" fillOpacity="0.4" />
      <polygon points="48,46 50,42 52,46" fill="hsl(var(--foreground))" fillOpacity="0.4" />
      <polygon points="48,70 50,66 52,70" fill="hsl(var(--foreground))" fillOpacity="0.4" />

      {/* Labels with leader lines */}
      {meridianLabels.map((m) => {
        const side = m.x <= 50 ? "left" : "right";
        return (
          <g key={m.name}>
            <line
              x1={m.x}
              y1={m.y}
              x2={m.targetX}
              y2={m.targetY}
              stroke="hsl(var(--foreground))"
              strokeWidth="0.4"
              strokeOpacity="0.85"
              markerEnd="url(#meridian-arrowhead)"
            />
            <text
              x={m.x}
              y={m.y}
              textAnchor={side === "left" ? "end" : "start"}
              dominantBaseline="middle"
              fill="hsl(var(--foreground))"
              fontSize="2.5"
              fontWeight="600"
              fontFamily="var(--font-body, sans-serif)"
              style={{ paintOrder: "stroke", stroke: "hsl(var(--background))", strokeWidth: "0.5", strokeLinecap: "round", strokeLinejoin: "round" }}
            >
              {m.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const acupointPoints = [
  { x: 50, y: 15, label: "Yintang" },
  { x: 42, y: 26, label: "Lung" },
  { x: 58, y: 26, label: "Lung" },
  { x: 50, y: 18, label: "Renzhong" },
  { x: 38, y: 32, label: "Heart" },
  { x: 62, y: 32, label: "Heart" },
  { x: 50, y: 30, label: "Shanzhong" },
  { x: 34, y: 40, label: "Stomach" },
  { x: 66, y: 40, label: "Stomach" },
  { x: 42, y: 46, label: "Liver" },
  { x: 58, y: 46, label: "Liver" },
  { x: 50, y: 43, label: "Zhongwan" },
  { x: 38, y: 56, label: "Spleen" },
  { x: 62, y: 56, label: "Spleen" },
  { x: 50, y: 64, label: "Qihai" },
  { x: 44, y: 72, label: "Kidney" },
  { x: 56, y: 72, label: "Kidney" },
  { x: 50, y: 80, label: "Guanyuan" },
  { x: 46, y: 88, label: "Bladder" },
  { x: 54, y: 88, label: "Bladder" },
];

const AcupointOverlay = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ overflow: "visible" }}
      role="img"
      aria-label="Diagram showing key acupoints along the meridian channels on the front of the body"
    >
      <defs>
        <marker
          id="acupoint-arrowhead"
          markerWidth="4"
          markerHeight="3"
          refX="3.5"
          refY="1.5"
          orient="auto"
        >
          <polygon points="0 0, 4 1.5, 0 3" fill="hsl(var(--foreground))" />
        </marker>
      </defs>

      {/* Meridian guide lines (subtle) */}
      <g fill="none" strokeWidth="0.5" strokeLinecap="round" stroke="hsl(var(--foreground))" strokeOpacity="0.25">
        <path d="M45 6 C40 18 38 32 40 45 C42 60 46 75 48 90" />
        <path d="M55 6 C60 18 62 32 60 45 C58 60 54 75 52 90" />
        <path d="M47 24 C35 28 28 38 30 52 C32 66 38 78 42 88" />
        <path d="M53 24 C65 28 72 38 70 52 C68 66 62 78 58 88" />
        <path d="M50 12 C48 28 47 48 48 65 C49 78 50 88 50 90" />
        <path d="M50 34 C44 44 42 54 43 64 C44 74 47 84 50 90" />
        <path d="M50 34 C56 44 58 54 57 64 C56 74 53 84 50 90" />
      </g>

      {/* Acupoints */}
      {acupointPoints.map((pt) => (
        <g key={`${pt.label}-${pt.x}-${pt.y}`}>
          <circle
            cx={pt.x}
            cy={pt.y}
            r="1.5"
            fill="hsl(var(--foreground))"
            fillOpacity="0.9"
          />
          <circle
            cx={pt.x}
            cy={pt.y}
            r="2.5"
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
        </g>
      ))}

      {/* Labels with leader lines */}
      {acupointPoints.map((pt, idx) => {
        const side = pt.x <= 50 ? "left" : "right";
        const isCenter = pt.x === 50;
        const centerSide = isCenter ? (idx % 2 === 0 ? "left" : "right") : side;
        const offset = isCenter ? 5 : 16;
        const labelX = isCenter
          ? (centerSide === "left" ? pt.x - offset - 4 : pt.x + offset + 4)
          : (side === "left" ? pt.x - offset : pt.x + offset);
        const labelY = pt.y;
        return (
          <g key={`label-${pt.label}-${pt.x}-${pt.y}`}>
            <line
              x1={labelX}
              y1={labelY}
              x2={pt.x}
              y2={pt.y}
              stroke="hsl(var(--foreground))"
              strokeWidth="0.3"
              strokeOpacity="0.85"
              markerEnd="url(#acupoint-arrowhead)"
            />
            <text
              x={labelX}
              y={labelY}
              textAnchor={centerSide === "left" ? "end" : "start"}
              dominantBaseline="middle"
              fill="hsl(var(--foreground))"
              fontSize="2.2"
              fontWeight="600"
              fontFamily="var(--font-body, sans-serif)"
              style={{ paintOrder: "stroke", stroke: "hsl(var(--background))", strokeWidth: "0.5", strokeLinecap: "round", strokeLinejoin: "round" }}
            >
              {pt.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};



interface MuscleHotspot {
  id: string;
  name: string;
  location: string;
  benefit: string;
  /** Position as percentage of the image */
  x: number;
  y: number;
}

const frontMuscles: MuscleHotspot[] = [
  { id: "deltoid-l", name: "Deltoids", location: "Shoulder caps", benefit: "Eases tightness from carrying bags or repetitive arm movements.", x: 35, y: 21 },
  { id: "deltoid-r", name: "Deltoids", location: "Shoulder caps", benefit: "Eases tightness from carrying bags or repetitive arm movements.", x: 65, y: 21 },
  { id: "pec", name: "Pectoralis Major", location: "Chest", benefit: "Opens the chest and counteracts forward-hunching posture.", x: 43, y: 30 },
  { id: "forearm-l", name: "Forearm Flexors", location: "Forearms and hands", benefit: "Helps with repetitive strain and improves grip comfort.", x: 27, y: 42 },
  { id: "forearm-r", name: "Forearm Flexors", location: "Forearms and hands", benefit: "Helps with repetitive strain and improves grip comfort.", x: 73, y: 42 },
  { id: "adductor-l", name: "Adductor Group", location: "Inner thigh", benefit: "Includes pectineus, adductor brevis, adductor longus, gracilis, and adductor magnus. Stabilizes the hip and relieves inner-thigh tension.", x: 46, y: 52 },
  { id: "adductor-r", name: "Adductor Group", location: "Inner thigh", benefit: "Includes pectineus, adductor brevis, adductor longus, gracilis, and adductor magnus. Stabilizes the hip and relieves inner-thigh tension.", x: 54, y: 52 },
  { id: "quad-l", name: "Quadriceps", location: "Front of upper legs", benefit: "Loosens tight legs from sitting, standing, or exercise.", x: 42, y: 58 },
  { id: "quad-r", name: "Quadriceps", location: "Front of upper legs", benefit: "Loosens tight legs from sitting, standing, or exercise.", x: 58, y: 58 },
  { id: "calf-front-l", name: "Tibialis Anterior", location: "Front of lower legs", benefit: "Supports ankle stability and reduces shin tension.", x: 40, y: 73 },
  { id: "calf-front-r", name: "Tibialis Anterior", location: "Front of lower legs", benefit: "Supports ankle stability and reduces shin tension.", x: 60, y: 73 },
];

const backMuscles: MuscleHotspot[] = [
  { id: "trap-back", name: "Trapezius", location: "Upper back and neck", benefit: "Relieves tension headaches and stiffness from desk work.", x: 43, y: 20 },
  { id: "deltoid-back-l", name: "Deltoids", location: "Shoulder caps", benefit: "Eases tightness from carrying bags or repetitive arm movements.", x: 34, y: 24 },
  { id: "deltoid-back-r", name: "Deltoids", location: "Shoulder caps", benefit: "Eases tightness from carrying bags or repetitive arm movements.", x: 66, y: 24 },
  { id: "lats-l", name: "Latissimus Dorsi", location: "Mid to lower back", benefit: "Reduces back pain and improves posture.", x: 38, y: 29 },
  { id: "lats-r", name: "Latissimus Dorsi", location: "Mid to lower back", benefit: "Reduces back pain and improves posture.", x: 62, y: 29 },
  { id: "erector", name: "Erector Spinae", location: "Along the spine", benefit: "Supports spinal alignment and relieves chronic low-back tension.", x: 47, y: 33 },
  { id: "forearm-back-l", name: "Forearm Extensors", location: "Back of forearms", benefit: "Helps with repetitive strain and improves grip comfort.", x: 27, y: 42 },
  { id: "forearm-back-r", name: "Forearm Extensors", location: "Back of forearms", benefit: "Helps with repetitive strain and improves grip comfort.", x: 73, y: 42 },
  { id: "glute-l", name: "Gluteus Maximus", location: "Buttocks", benefit: "Relieves lower back strain and supports hip mobility.", x: 44, y: 51 },
  { id: "glute-r", name: "Gluteus Maximus", location: "Buttocks", benefit: "Relieves lower back strain and supports hip mobility.", x: 56, y: 51 },
  { id: "hamstring-l", name: "Hamstrings", location: "Back of upper legs", benefit: "Loosens tight legs from sitting, standing, or exercise.", x: 43, y: 60 },
  { id: "hamstring-r", name: "Hamstrings", location: "Back of upper legs", benefit: "Loosens tight legs from sitting, standing, or exercise.", x: 57, y: 60 },
  { id: "calf-back-l", name: "Gastrocnemius", location: "Calves", benefit: "Relieves cramping and improves circulation to the feet.", x: 44, y: 78 },
  { id: "calf-back-r", name: "Gastrocnemius", location: "Calves", benefit: "Relieves cramping and improves circulation to the feet.", x: 56, y: 78 },
];

interface LabelledMuscle extends MuscleHotspot {
  /** Label anchor position: which side the label sits on */
  labelSide: "left" | "right";
  /** How far (%) the label extends from the point */
  labelOffset?: number;
}

/** Add label sides so lines don't overlap the body */
const addLabelSides = (muscles: MuscleHotspot[]): LabelledMuscle[] =>
  muscles.map((m) => ({
    ...m,
    labelSide: m.x <= 50 ? "left" : "right",
    labelOffset: m.x < 25 || m.x > 75 ? 12 : 22,
  }));

const MuscleOverlay = ({
  muscles: rawMuscles,
  activeId,
  onSelect,
}: {
  muscles: MuscleHotspot[];
  activeId: string | null;
  onSelect: (m: MuscleHotspot | null) => void;
}) => {
  const muscles = addLabelSides(rawMuscles);

  return (
    <svg
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      viewBox="-15 0 130 100"
      preserveAspectRatio="none"
      style={{ overflow: "visible" }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="4"
          refX="5"
          refY="2"
          orient="auto"
        >
          <polygon points="0 0, 6 2, 0 4" fill="black" />
        </marker>
        <marker
          id="arrowhead-active"
          markerWidth="6"
          markerHeight="4"
          refX="5"
          refY="2"
          orient="auto"
        >
          <polygon points="0 0, 6 2, 0 4" fill="black" />
        </marker>
      </defs>
      {muscles.map((m) => {
        const isActive = activeId === m.id;
        const offset = m.labelOffset ?? 24;
        const labelX = m.labelSide === "left" ? m.x - offset : m.x + offset;
        const labelY = m.y;
        const textAnchor = m.labelSide === "left" ? "end" : "start";
        // Approximate text width: ~1.4 SVG units per character at fontSize 2.4
        const approxTextWidth = m.name.length * 1.4;
        // Dot on the true outside of the text (before the word for left, after for right)
        const dotX = m.labelSide === "left"
          ? labelX - approxTextWidth - 1.5
          : labelX + approxTextWidth + 1.5;

        return (
          <g
            key={m.id}
            onClick={() => onSelect(isActive ? null : m)}
            className="cursor-pointer pointer-events-auto"
            role="button"
            aria-label={m.name}
          >
            {/* Line from label to muscle point with arrow */}
            <line
              x1={labelX}
              y1={labelY}
              x2={m.x}
              y2={m.y}
              stroke="black"
              strokeWidth={isActive ? "0.4" : "0.25"}
              strokeOpacity={isActive ? 1 : 0.7}
              markerEnd={isActive ? "url(#arrowhead-active)" : "url(#arrowhead)"}
            />
            {/* Glow ring when active */}
            {isActive && (
              <circle
                cx={m.x}
                cy={m.y}
                r="2.5"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.3"
                strokeOpacity="0.5"
              >
                <animate attributeName="r" from="1.5" to="3.5" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" from="0.6" to="0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            )}
            {/* Label text */}
            <text
              x={labelX}
              y={labelY}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              className="select-none"
              fill={isActive ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
              fontSize="2.4"
              fontWeight={isActive ? "700" : "500"}
              fontFamily="var(--font-body, sans-serif)"
              style={{ paintOrder: "stroke", stroke: "hsl(var(--background))", strokeWidth: "0.5", strokeLinecap: "round", strokeLinejoin: "round" }}
            >
              {m.name}
            </text>
            {/* Clickable dot on the outside of the label */}
            <circle
              cx={dotX}
              cy={labelY}
              r={isActive ? "1.2" : "0.9"}
              fill="hsl(var(--primary))"
              fillOpacity={isActive ? 1 : 0.7}
            />
          </g>
        );
      })}
    </svg>
  );
};

const Anatomy = () => {
  const [activeFront, setActiveFront] = useState<MuscleHotspot | null>(null);
  const [activeBack, setActiveBack] = useState<MuscleHotspot | null>(null);
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);

  const activeDetail = activeFront || activeBack;


  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Anatomy"
        subtitle="Tap any muscle point to learn how acupressure meridian body-work benefits that area."
      />

      {/* Interactive hint */}
      <div className="bg-primary/5 border-b border-primary/10 py-3">
        <p className="text-center text-sm font-body text-muted-foreground">
          <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2 align-middle" />
          <span className="text-foreground font-medium">Interactive model</span> — click the dots next to any muscle name to learn more.
        </p>
      </div>

      {/* Interactive Illustrations */}
      <section className="py-16 bg-background overflow-visible">
        <div className="container max-w-6xl px-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Front */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="relative inline-block max-w-sm w-full mx-auto overflow-visible group">
                <img
                  src={anatomyFront}
                  alt="Anterior muscular system"
                  className="rounded-lg shadow-card w-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                  loading="lazy"
                  width={768}
                  height={1024}
                  onClick={() => setLightbox({ src: anatomyFront, alt: "Anterior muscular system", caption: "Anterior (Front) View — click muscle labels to learn more", overlay: <MuscleOverlay muscles={frontMuscles} activeId={null} onSelect={() => {}} /> })}
                />
                <div className="absolute top-3 right-3 p-2 rounded-full bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none" aria-hidden="true">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <MuscleOverlay
                  muscles={frontMuscles}
                  activeId={activeFront?.id ?? null}
                  onSelect={(m) => {
                    setActiveFront(m);
                    if (m) setActiveBack(null);
                  }}
                />
              </div>
              <p className="mt-3 text-sm font-body text-muted-foreground">Anterior (Front) View</p>
            </motion.div>

            {/* Back */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="relative inline-block max-w-sm w-full mx-auto overflow-visible group">
                <img
                  src={anatomyBack}
                  alt="Posterior muscular system"
                  className="rounded-lg shadow-card w-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                  loading="lazy"
                  width={768}
                  height={1024}
                  onClick={() => setLightbox({ src: anatomyBack, alt: "Posterior muscular system", caption: "Posterior (Back) View — click muscle labels to learn more", overlay: <MuscleOverlay muscles={backMuscles} activeId={null} onSelect={() => {}} /> })}
                />
                <div className="absolute top-3 right-3 p-2 rounded-full bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none" aria-hidden="true">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <MuscleOverlay
                  muscles={backMuscles}
                  activeId={activeBack?.id ?? null}
                  onSelect={(m) => {
                    setActiveBack(m);
                    if (m) setActiveFront(null);
                  }}
                />
              </div>
              <p className="mt-3 text-sm font-body text-muted-foreground">Posterior (Back) View</p>
            </motion.div>
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            {activeDetail && (
              <motion.div
                key={activeDetail.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="mt-10 max-w-lg mx-auto bg-card rounded-xl p-6 shadow-soft border border-primary/20 text-center"
              >
                <h3 className="font-display text-xl text-foreground mb-1">{activeDetail.name}</h3>
                <p className="text-xs font-body text-primary mb-3">{activeDetail.location}</p>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {activeDetail.benefit}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Meridians & Acupoints Diagrams */}
      <section className="py-16 bg-background">
        <div className="container max-w-6xl px-6">
          <h2 className="font-display text-3xl text-foreground text-center mb-4">
            Meridians & Acupoints
          </h2>
          <p className="text-muted-foreground font-body text-center mb-12 max-w-2xl mx-auto">
            Meridians are the invisible channels where life energy flows. Acupoints are specific locations along these channels where pressure can release tension and restore balance.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Meridians diagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border/30 inline-block w-full max-w-md">
                <div className="relative inline-block w-full overflow-visible group cursor-pointer" onClick={() => setLightbox({ src: anatomyFront, alt: "Anterior anatomical figure showing meridian channels", caption: "Meridian Channels — anterior view", overlay: <MeridianOverlay /> })}>
                  <img
                    src={anatomyFront}
                    alt="Anterior anatomical figure showing meridian channels"
                    className="rounded-lg w-full object-cover hover:opacity-95 transition-opacity"
                    loading="lazy"
                    width={768}
                    height={1024}
                  />
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none" aria-hidden="true">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <MeridianOverlay />
                </div>
              </div>
              <h3 className="mt-4 font-display text-xl text-foreground">Meridian Channels</h3>
              <p className="mt-1 text-sm font-body text-muted-foreground max-w-xs mx-auto">
                Twelve primary pathways that carry energy through the body.
              </p>
            </motion.div>

            {/* Acupoints diagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-center"
            >
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border/30 inline-block w-full max-w-md">
                <div className="relative inline-block w-full overflow-visible group cursor-pointer" onClick={() => setLightbox({ src: anatomyFront, alt: "Anterior anatomical figure showing key acupoints", caption: "Key Acupoints — anterior view", overlay: <AcupointOverlay /> })}>
                  <img
                    src={anatomyFront}
                    alt="Anterior anatomical figure showing key acupoints"
                    className="rounded-lg w-full object-cover hover:opacity-95 transition-opacity"
                    loading="lazy"
                    width={768}
                    height={1024}
                  />
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none" aria-hidden="true">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <AcupointOverlay />
                </div>
              </div>
              <h3 className="mt-4 font-display text-xl text-foreground">Key Acupoints</h3>
              <p className="mt-1 text-sm font-body text-muted-foreground max-w-xs mx-auto">
                Specific points where pressure can release blocked energy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meridian & Acupoint Reference Lists */}
      <section className="py-12 bg-petal/20 border-y border-border/30">
        <div className="container max-w-5xl px-6">
          <h2 className="font-display text-2xl text-foreground text-center mb-8">
            Meridian & Acupoint Reference
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border/30">
              <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                Twelve Primary Meridian Channels
              </h3>
              <ul className="grid grid-cols-2 gap-2 text-sm font-body text-muted-foreground">
                {[
                  "Lung",
                  "Large Intestine",
                  "Stomach",
                  "Spleen",
                  "Heart",
                  "Small Intestine",
                  "Bladder",
                  "Kidney",
                  "Pericardium",
                  "Triple Burner",
                  "Gall Bladder",
                  "Liver",
                ].map((m) => (
                  <li key={m} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary/60" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-soft border border-border/30">
              <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                Key Acupoints Shown
              </h3>
              <ul className="grid grid-cols-2 gap-2 text-sm font-body text-muted-foreground">
                {[
                  "Yintang (between brows)",
                  "Renzhong (upper lip)",
                  "Shanzhong (chest center)",
                  "Zhongwan (upper abdomen)",
                  "Qihai (below navel)",
                  "Guanyuan (lower abdomen)",
                  "Lung",
                  "Heart",
                  "Stomach",
                  "Liver",
                  "Spleen",
                  "Kidney",
                  "Bladder",
                ].map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary/60" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Major Muscle Groups */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl text-foreground text-center mb-4">
            Major Muscle Groups
          </h2>
          <p className="text-muted-foreground font-body text-center mb-10 max-w-2xl mx-auto">
            Acupressure meridian body-work targets these key muscle groups to relieve tension, improve circulation, and restore balance to your body.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Trapezius & Neck", desc: "Relieves tension headaches and stiffness caused by desk work, stress, and poor posture." },
              { name: "Deltoids", desc: "Eases tightness from carrying bags, repetitive arm movements, and overhead activities." },
              { name: "Pectoralis Major", desc: "Opens the chest and counteracts the forward-hunching posture common with screen use." },
              { name: "Latissimus Dorsi", desc: "Reduces mid and lower back pain while improving overall posture and mobility." },
              { name: "Erector Spinae", desc: "Supports spinal alignment and relieves chronic low-back tension from prolonged sitting." },
              { name: "Forearm Flexors & Extensors", desc: "Helps with repetitive strain injuries, carpal tunnel symptoms, and grip discomfort." },
              { name: "Quadriceps", desc: "Loosens tight legs from sitting, standing, walking, or exercise." },
              { name: "Hamstrings", desc: "Relieves tightness in the back of the thighs that contributes to lower back strain." },
              { name: "Gluteus Maximus", desc: "Relieves lower back strain, supports hip mobility, and eases sciatic discomfort." },
              { name: "Gastrocnemius (Calves)", desc: "Relieves cramping, improves circulation to the feet, and reduces leg fatigue." },
              { name: "Tibialis Anterior", desc: "Supports ankle stability, reduces shin tension, and helps prevent shin splints." },
            ].map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-lg p-5 shadow-soft border border-border/30"
              >
                <h3 className="font-display text-lg text-foreground mb-1">{a.name}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Adductor Muscles Detail */}
      <section className="py-16 bg-petal/30">
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl text-foreground text-center mb-4">
            The Adductor Muscles
          </h2>
          <p className="text-muted-foreground font-body text-center mb-10 max-w-2xl mx-auto">
            The adductor group runs along the inner thigh and is essential for hip stability and leg movement. Acupressure meridian body-work can relieve tightness in these often-overlooked muscles.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Pectineus", desc: "The shortest adductor, assists hip flexion and adduction." },
              { name: "Adductor Brevis", desc: "Located deep in the thigh, stabilizes the pelvis during movement." },
              { name: "Adductor Longus", desc: "The most superficial adductor, commonly tight from sitting." },
              { name: "Gracilis", desc: "The only adductor that crosses the knee, aiding both hip and knee movement." },
              { name: "Adductor Magnus", desc: "The largest and strongest adductor, critical for walking and balance." },
            ].map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-lg p-5 shadow-soft border border-border/30"
              >
                <h3 className="font-display text-lg text-foreground mb-1">{a.name}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Close image"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative inline-block">
                <img
                  src={lightbox.src}
                  alt={lightbox.alt}
                  className="w-auto h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
                {lightbox.overlay}
              </div>
              {lightbox.caption && (
                <p className="mt-3 text-center text-sm font-body text-muted-foreground">
                  {lightbox.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Anatomy;
