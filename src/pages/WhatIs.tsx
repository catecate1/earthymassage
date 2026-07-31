import { motion } from "framer-motion";
import { Activity, Heart, Brain, Moon, Eye, Move } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const principles = [
  { title: "Meridians", description: "Invisible channels where life energy flows through the body." },
  { title: "Acupoints", description: "Specific spots along the meridians used to release blocked energy." },
  { title: "Bodywork", description: "Hands-on pressure, stretching, or massage used to stimulate these points. [1]" },
];

const benefits = [
  { icon: Activity, title: "Improved Circulation", description: "Long flowing strokes help move blood toward the heart, improving overall circulation." },
  { icon: Heart, title: "Stress Relief", description: "Activates the parasympathetic nervous system, lowering cortisol and promoting calm." },
  { icon: Brain, title: "Pain Reduction", description: "Gentle pressure releases muscle tension and reduces chronic pain conditions." },
  { icon: Moon, title: "Better Sleep", description: "Regular sessions promote deeper, more restful sleep patterns." },
  { icon: Eye, title: "Mental Clarity", description: "Reduces mental fatigue and enhances focus through deep relaxation." },
  { icon: Move, title: "Increased Flexibility", description: "Helps keep joints and muscles supple, improving range of motion." },
];

const commonBenefits = [
  "Reduces physical pain and muscle tension.",
  "Lowers stress and helps the mind relax.",
  "Improves overall blood flow and energy flow.",
];

const WhatIs = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader
        title="What Is Acupressure Meridian Body-Work?"
        subtitle="Ancient principles, gentle hands-on work, and lasting relaxation."
      />

      <section className="py-16 bg-background">
        <div className="container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 font-body text-muted-foreground leading-relaxed mb-16"
          >
            <p>
              Acupressure meridian body-work is a gentle, holistic approach that blends traditional
              meridian theory with hands-on bodywork. By working along the body's energy channels and
              focusing on specific acupoints, this technique helps release tension, encourage balance,
              and support the body's natural ability to heal.
            </p>
            <p>
              Unlike deep tissue work, acupressure meridian body-work uses lighter to moderate pressure,
              making it an excellent choice for those new to bodywork, those seeking relaxation, or anyone
              looking to maintain overall wellness. The technique works with the body's natural systems to
              encourage healing and balance.
            </p>
          </motion.div>

          {/* Core Principles */}
          <h2 className="font-display text-3xl text-foreground text-center mb-10">Core Principles</h2>
          <div className="space-y-4 mb-20">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-card rounded-lg p-6 shadow-soft border border-border/30"
              >
                <h3 className="font-display text-lg text-foreground mb-2">{p.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Common Benefits */}
          <h2 className="font-display text-3xl text-foreground text-center mb-10">Common Benefits</h2>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-lg p-6 shadow-soft border border-border/30 mb-20"
          >
            <ul className="space-y-3">
              {commonBenefits.map((item, i) => (
                <li key={i} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Benefits */}
          <h2 className="font-display text-3xl text-foreground text-center mb-10">Benefits</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-petal flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-foreground mb-1">{b.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{b.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhatIs;
