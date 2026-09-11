import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Flower2, Droplets, Activity } from "lucide-react";

const WellnessNotes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader
        title="Wellness Notes"
        subtitle="Short reflections on energy, nutrition, and the small things that support well-being."
      />

      <section className="py-16">
        <div className="container max-w-3xl space-y-16">
          {/* Chi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Flower2 className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl text-foreground">What Is Chi?</h2>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-soft border border-border/40">
              <p className="font-body text-muted-foreground leading-relaxed">
                Chi (also spelled Qi) is a concept rooted in traditional Chinese philosophy that describes the vital life energy flowing through all living things. Think of it as the body's natural current—when it moves freely, we feel balanced and well; when it becomes blocked or stagnant, we may feel tension, fatigue, or discomfort.
              </p>
            </div>
          </motion.div>

          {/* Chi and Systemic Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl text-foreground">Chi and Systemic Health</h2>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-soft border border-border/40 space-y-4">
              <p className="font-body text-muted-foreground leading-relaxed">
                Because chi is thought to move through the whole body, a blockage in one area can affect how you feel overall. When energy isn't flowing smoothly, tension, stress, or fatigue can show up in unexpected places. Supporting chi isn't about forcing a fix—it's about helping the body return to its own natural rhythm.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Gentle bodywork, slow breathing, and rest all encourage chi to move more freely. As the body relaxes, circulation improves, the nervous system settles, and the whole system feels more balanced. It's a holistic way of caring for yourself—one that honors relaxation as a real and necessary part of health.
              </p>
            </div>
          </motion.div>

          {/* Seed Oils */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl text-foreground">Seed Oils</h2>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-soft border border-border/40 space-y-4">
              <p className="font-body text-muted-foreground leading-relaxed">
                Omega-3 oils are anti-inflammatory and Omega-6 oils are inflammatory.
              </p>
              <p className="font-body text-primary font-semibold">
                More to come…
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WellnessNotes;
