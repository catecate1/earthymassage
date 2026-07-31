import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import anatomyFront from "@/assets/anatomy-front.jpg";
import anatomyBack from "@/assets/anatomy-back.jpg";

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
      className="absolute inset-0 w-full h-full z-10"
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
            className="cursor-pointer"
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
              <div className="relative inline-block max-w-sm w-full mx-auto overflow-visible">
                <img
                  src={anatomyFront}
                  alt="Anterior muscular system"
                  className="rounded-lg shadow-card w-full object-cover"
                  loading="lazy"
                  width={768}
                  height={1024}
                />
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
              <div className="relative inline-block max-w-sm w-full mx-auto overflow-visible">
                <img
                  src={anatomyBack}
                  alt="Posterior muscular system"
                  className="rounded-lg shadow-card w-full object-cover"
                  loading="lazy"
                  width={768}
                  height={1024}
                />
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
                <svg
                  viewBox="0 0 200 320"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Diagram of the twelve meridian channels flowing through the front of the body"
                >
                  {/* Body silhouette */}
                  <path
                    d="M100 12
                       C86 12 78 22 78 34
                       C78 44 84 52 90 56
                       C80 60 70 72 68 88
                       C66 110 66 130 70 150
                       C72 170 72 190 72 210
                       C72 240 76 270 80 300
                       C82 308 90 310 94 310
                       L94 315
                       C94 318 97 320 100 320
                       C103 320 106 318 106 315
                       L106 310
                       C110 310 118 308 120 300
                       C124 270 128 240 128 210
                       C128 190 128 170 130 150
                       C134 130 134 110 132 88
                       C130 72 120 60 110 56
                       C116 52 122 44 122 34
                       C122 22 114 12 100 12
                       Z"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeOpacity="0.12"
                    strokeWidth="1.5"
                  />

                  {/* Meridian channels */}
                  <g fill="none" strokeWidth="2" strokeLinecap="round">
                    <path d="M88 22 C82 60 75 110 78 160 C80 210 88 260 94 300" stroke="hsl(var(--primary))" strokeOpacity="0.55" />
                    <path d="M112 22 C118 60 125 110 122 160 C120 210 112 260 106 300" stroke="hsl(var(--primary))" strokeOpacity="0.55" />
                    <path d="M90 58 C72 70 60 100 62 140 C64 180 70 220 78 260" stroke="#b88a8a" strokeOpacity="0.6" />
                    <path d="M110 58 C128 70 140 100 138 140 C136 180 130 220 122 260" stroke="#b88a8a" strokeOpacity="0.6" />
                    <path d="M100 36 C96 70 94 120 96 170 C98 220 100 270 100 300" stroke="#8aa38a" strokeOpacity="0.6" />
                    <path d="M78 88 C85 110 95 130 100 145 C105 130 115 110 122 88" stroke="#9a8fb8" strokeOpacity="0.6" />
                    <path d="M100 100 C88 130 82 170 85 210 C88 250 95 280 100 300" stroke="#b8a08a" strokeOpacity="0.6" />
                    <path d="M100 100 C112 130 118 170 115 210 C112 250 105 280 100 300" stroke="#b8a08a" strokeOpacity="0.6" />
                    <path d="M72 120 C68 160 70 200 78 240" stroke="#8a9ab8" strokeOpacity="0.6" />
                    <path d="M128 120 C132 160 130 200 122 240" stroke="#8a9ab8" strokeOpacity="0.6" />
                    <path d="M80 70 C78 90 82 110 100 125 C118 110 122 90 120 70" stroke="#b88a9a" strokeOpacity="0.6" />
                    <path d="M100 145 C82 160 78 185 80 210 C82 235 90 260 98 285" stroke="#8a9a8a" strokeOpacity="0.6" />
                    <path d="M100 145 C118 160 122 185 120 210 C118 235 110 260 102 285" stroke="#8a9a8a" strokeOpacity="0.6" />
                  </g>

                  {/* Direction arrows along central meridian */}
                  <polygon points="96,90 100,82 104,90" fill="hsl(var(--primary))" fillOpacity="0.4" />
                  <polygon points="96,180 100,172 104,180" fill="hsl(var(--primary))" fillOpacity="0.4" />
                  <polygon points="96,270 100,262 104,270" fill="hsl(var(--primary))" fillOpacity="0.4" />

                  {/* Legend */}
                  <text x="100" y="12" textAnchor="middle" fontSize="8" fontFamily="var(--font-body, sans-serif)" fill="hsl(var(--foreground))" fillOpacity="0.7">
                    Front View
                  </text>
                </svg>
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
                <svg
                  viewBox="0 0 200 320"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Diagram showing key acupoints along the meridian channels on the front of the body"
                >
                  {/* Body silhouette */}
                  <path
                    d="M100 12
                       C86 12 78 22 78 34
                       C78 44 84 52 90 56
                       C80 60 70 72 68 88
                       C66 110 66 130 70 150
                       C72 170 72 190 72 210
                       C72 240 76 270 80 300
                       C82 308 90 310 94 310
                       L94 315
                       C94 318 97 320 100 320
                       C103 320 106 318 106 315
                       L106 310
                       C110 310 118 308 120 300
                       C124 270 128 240 128 210
                       C128 190 128 170 130 150
                       C134 130 134 110 132 88
                       C130 72 120 60 110 56
                       C116 52 122 44 122 34
                       C122 22 114 12 100 12
                       Z"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeOpacity="0.12"
                    strokeWidth="1.5"
                  />

                  {/* Meridian guide lines (subtle) */}
                  <g fill="none" strokeWidth="1.5" strokeLinecap="round" stroke="hsl(var(--primary))" strokeOpacity="0.2">
                    <path d="M88 22 C82 60 75 110 78 160 C80 210 88 260 94 300" />
                    <path d="M112 22 C118 60 125 110 122 160 C120 210 112 260 106 300" />
                    <path d="M90 58 C72 70 60 100 62 140 C64 180 70 220 78 260" />
                    <path d="M110 58 C128 70 140 100 138 140 C136 180 130 220 122 260" />
                    <path d="M100 36 C96 70 94 120 96 170 C98 220 100 270 100 300" />
                    <path d="M100 100 C88 130 82 170 85 210 C88 250 95 280 100 300" />
                    <path d="M100 100 C112 130 118 170 115 210 C112 250 105 280 100 300" />
                  </g>

                  {/* Acupoints */}
                  {[
                    { x: 100, y: 34, label: "Yintang" },
                    { x: 88, y: 56, label: "Lung" },
                    { x: 112, y: 56, label: "Lung" },
                    { x: 100, y: 82, label: "Renzhong" },
                    { x: 78, y: 88, label: "Heart" },
                    { x: 122, y: 88, label: "Heart" },
                    { x: 100, y: 115, label: "Shanzhong" },
                    { x: 70, y: 120, label: "Stomach" },
                    { x: 130, y: 120, label: "Stomach" },
                    { x: 88, y: 145, label: "Liver" },
                    { x: 112, y: 145, label: "Liver" },
                    { x: 100, y: 170, label: "Zhongwan" },
                    { x: 78, y: 185, label: "Spleen" },
                    { x: 122, y: 185, label: "Spleen" },
                    { x: 100, y: 210, label: "Qihai" },
                    { x: 84, y: 235, label: "Kidney" },
                    { x: 116, y: 235, label: "Kidney" },
                    { x: 100, y: 260, label: "Guanyuan" },
                    { x: 90, y: 285, label: "Bladder" },
                    { x: 110, y: 285, label: "Bladder" },
                  ].map((pt) => (
                    <g key={`${pt.label}-${pt.x}-${pt.y}`}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="3"
                        fill="hsl(var(--primary))"
                        fillOpacity="0.85"
                      />
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="5"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeOpacity="0.3"
                        strokeWidth="1"
                      />
                    </g>
                  ))}

                  {/* Legend */}
                  <text x="100" y="12" textAnchor="middle" fontSize="8" fontFamily="var(--font-body, sans-serif)" fill="hsl(var(--foreground))" fillOpacity="0.7">
                    Front View
                  </text>
                </svg>
              </div>
              <h3 className="mt-4 font-display text-xl text-foreground">Key Acupoints</h3>
              <p className="mt-1 text-sm font-body text-muted-foreground max-w-xs mx-auto">
                Specific points where pressure can release blocked energy.
              </p>
            </motion.div>
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

      <Footer />
    </div>
  );
};

export default Anatomy;
