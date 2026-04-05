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
  { id: "trap-front", name: "Trapezius & Neck", location: "Upper back and neck", benefit: "Relieves tension headaches and stiffness from desk work.", x: 50, y: 14 },
  { id: "deltoid-l", name: "Deltoids", location: "Shoulder caps", benefit: "Eases tightness from carrying bags or repetitive arm movements.", x: 28, y: 20 },
  { id: "deltoid-r", name: "Deltoids", location: "Shoulder caps", benefit: "Eases tightness from carrying bags or repetitive arm movements.", x: 72, y: 20 },
  { id: "pec", name: "Pectoralis Major", location: "Chest", benefit: "Opens the chest and counteracts forward-hunching posture.", x: 50, y: 25 },
  { id: "forearm-l", name: "Forearm Flexors", location: "Forearms and hands", benefit: "Helps with repetitive strain and improves grip comfort.", x: 18, y: 42 },
  { id: "forearm-r", name: "Forearm Flexors", location: "Forearms and hands", benefit: "Helps with repetitive strain and improves grip comfort.", x: 82, y: 42 },
  { id: "quad-l", name: "Quadriceps", location: "Front of upper legs", benefit: "Loosens tight legs from sitting, standing, or exercise.", x: 38, y: 55 },
  { id: "quad-r", name: "Quadriceps", location: "Front of upper legs", benefit: "Loosens tight legs from sitting, standing, or exercise.", x: 62, y: 55 },
  { id: "adductor-l", name: "Adductor Group", location: "Inner thigh", benefit: "Includes pectineus, adductor brevis, adductor longus, gracilis, and adductor magnus. Stabilizes the hip and relieves inner-thigh tension.", x: 43, y: 52 },
  { id: "adductor-r", name: "Adductor Group", location: "Inner thigh", benefit: "Includes pectineus, adductor brevis, adductor longus, gracilis, and adductor magnus. Stabilizes the hip and relieves inner-thigh tension.", x: 57, y: 52 },
  { id: "calf-front-l", name: "Tibialis Anterior", location: "Front of lower legs", benefit: "Supports ankle stability and reduces shin tension.", x: 39, y: 74 },
  { id: "calf-front-r", name: "Tibialis Anterior", location: "Front of lower legs", benefit: "Supports ankle stability and reduces shin tension.", x: 61, y: 74 },
];

const backMuscles: MuscleHotspot[] = [
  { id: "trap-back", name: "Trapezius", location: "Upper back and neck", benefit: "Relieves tension headaches and stiffness from desk work.", x: 50, y: 16 },
  { id: "deltoid-back-l", name: "Deltoids", location: "Shoulder caps", benefit: "Eases tightness from carrying bags or repetitive arm movements.", x: 28, y: 20 },
  { id: "deltoid-back-r", name: "Deltoids", location: "Shoulder caps", benefit: "Eases tightness from carrying bags or repetitive arm movements.", x: 72, y: 20 },
  { id: "lats-l", name: "Latissimus Dorsi", location: "Mid to lower back", benefit: "Reduces back pain and improves posture.", x: 34, y: 32 },
  { id: "lats-r", name: "Latissimus Dorsi", location: "Mid to lower back", benefit: "Reduces back pain and improves posture.", x: 66, y: 32 },
  { id: "erector", name: "Erector Spinae", location: "Along the spine", benefit: "Supports spinal alignment and relieves chronic low-back tension.", x: 50, y: 36 },
  { id: "forearm-back-l", name: "Forearm Extensors", location: "Back of forearms", benefit: "Helps with repetitive strain and improves grip comfort.", x: 18, y: 42 },
  { id: "forearm-back-r", name: "Forearm Extensors", location: "Back of forearms", benefit: "Helps with repetitive strain and improves grip comfort.", x: 82, y: 42 },
  { id: "glute-l", name: "Gluteus Maximus", location: "Buttocks", benefit: "Relieves lower back strain and supports hip mobility.", x: 40, y: 46 },
  { id: "glute-r", name: "Gluteus Maximus", location: "Buttocks", benefit: "Relieves lower back strain and supports hip mobility.", x: 60, y: 46 },
  { id: "hamstring-l", name: "Hamstrings", location: "Back of upper legs", benefit: "Loosens tight legs from sitting, standing, or exercise.", x: 39, y: 58 },
  { id: "hamstring-r", name: "Hamstrings", location: "Back of upper legs", benefit: "Loosens tight legs from sitting, standing, or exercise.", x: 61, y: 58 },
  { id: "calf-back-l", name: "Gastrocnemius", location: "Calves", benefit: "Relieves cramping and improves circulation to the feet.", x: 39, y: 74 },
  { id: "calf-back-r", name: "Gastrocnemius", location: "Calves", benefit: "Relieves cramping and improves circulation to the feet.", x: 61, y: 74 },
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
          <polygon points="0 0, 6 2, 0 4" fill="hsl(var(--primary))" />
        </marker>
        <marker
          id="arrowhead-active"
          markerWidth="6"
          markerHeight="4"
          refX="5"
          refY="2"
          orient="auto"
        >
          <polygon points="0 0, 6 2, 0 4" fill="hsl(var(--primary))" />
        </marker>
      </defs>
      {muscles.map((m) => {
        const isActive = activeId === m.id;
        const offset = m.labelOffset ?? 24;
        const labelX = m.labelSide === "left" ? m.x - offset : m.x + offset;
        const labelY = m.y;
        const textAnchor = m.labelSide === "left" ? "end" : "start";
        // Dot sits on the far side of the label text
        const dotX = m.labelSide === "left" ? labelX - 1.5 : labelX + 1.5;

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
              stroke="hsl(var(--primary))"
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
              fill={isActive ? "hsl(var(--primary))" : "hsl(var(--primary))"}
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
        title="Anatomy & Massage"
        subtitle="Tap any muscle point to learn how Swedish massage benefits that area."
      />

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

      {/* Adductor Muscles Detail */}
      <section className="py-16 bg-petal/30">
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl text-foreground text-center mb-4">
            The Adductor Muscles
          </h2>
          <p className="text-muted-foreground font-body text-center mb-10 max-w-2xl mx-auto">
            The adductor group runs along the inner thigh and is essential for hip stability and leg movement. Massage therapy can relieve tightness in these often-overlooked muscles.
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
