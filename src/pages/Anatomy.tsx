import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import anatomyFront from "@/assets/anatomy-front.jpg";
import anatomyBack from "@/assets/anatomy-back.jpg";

const muscleGroups = [
  {
    name: "Trapezius & Neck",
    location: "Upper back and neck",
    benefit: "Relieves tension headaches and stiffness from desk work.",
  },
  {
    name: "Deltoids & Shoulders",
    location: "Shoulder caps",
    benefit: "Eases tightness from carrying bags or repetitive arm movements.",
  },
  {
    name: "Latissimus Dorsi",
    location: "Mid to lower back",
    benefit: "Reduces back pain and improves posture.",
  },
  {
    name: "Erector Spinae",
    location: "Along the spine",
    benefit: "Supports spinal alignment and relieves chronic low-back tension.",
  },
  {
    name: "Pectoralis Major",
    location: "Chest",
    benefit: "Opens the chest and counteracts forward-hunching posture.",
  },
  {
    name: "Hamstrings & Quadriceps",
    location: "Upper legs",
    benefit: "Loosens tight legs from sitting, standing, or exercise.",
  },
  {
    name: "Gastrocnemius (Calves)",
    location: "Lower legs",
    benefit: "Relieves cramping and improves circulation to the feet.",
  },
  {
    name: "Forearm Flexors & Extensors",
    location: "Forearms and hands",
    benefit: "Helps with repetitive strain and improves grip comfort.",
  },
];

const Anatomy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Anatomy & Massage"
        subtitle="Understanding the muscles Swedish massage targets for your well-being."
      />

      {/* Illustrations */}
      <section className="py-16 bg-background">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <img
                src={anatomyFront}
                alt="Anterior muscular system — front view of muscles targeted by Swedish massage"
                className="rounded-lg shadow-card w-full max-w-sm mx-auto object-cover"
                loading="lazy"
                width={768}
                height={1024}
              />
              <p className="mt-3 text-sm font-body text-muted-foreground">Anterior (Front) View</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <img
                src={anatomyBack}
                alt="Posterior muscular system — back view of muscles targeted by Swedish massage"
                className="rounded-lg shadow-card w-full max-w-sm mx-auto object-cover"
                loading="lazy"
                width={768}
                height={1024}
              />
              <p className="mt-3 text-sm font-body text-muted-foreground">Posterior (Back) View</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Muscle Groups */}
      <section className="py-16 bg-petal/30">
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl text-foreground text-center mb-10">
            Muscles Targeted by Swedish Massage
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {muscleGroups.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-card rounded-lg p-5 shadow-soft border border-border/30"
              >
                <h3 className="font-display text-lg text-foreground mb-1">{m.name}</h3>
                <p className="text-xs font-body text-primary mb-2">{m.location}</p>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{m.benefit}</p>
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
