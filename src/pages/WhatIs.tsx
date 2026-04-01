import { motion } from "framer-motion";
import { Activity, Heart, Brain, Moon, Eye, Move } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";


const techniques = [
  { title: "Effleurage", description: "Long, gliding strokes that warm up the muscles and promote relaxation. This is the foundational technique of Swedish massage." },
  { title: "Petrissage", description: "Kneading motions that work deeper into the muscles, helping to release knots and improve tissue elasticity." },
  { title: "Tapotement", description: "Rhythmic tapping or percussion movements that stimulate and energize tired muscles." },
  { title: "Friction", description: "Deep, circular movements that target specific areas of tension and help break down adhesions." },
  { title: "Vibration", description: "Gentle shaking movements that help relax the body and relieve tension in smaller muscle groups." },
];

const benefits = [
  { icon: Activity, title: "Improved Circulation", description: "Long flowing strokes help move blood toward the heart, improving overall circulation." },
  { icon: Heart, title: "Stress Relief", description: "Activates the parasympathetic nervous system, lowering cortisol and promoting calm." },
  { icon: Brain, title: "Pain Reduction", description: "Gentle pressure releases muscle tension and reduces chronic pain conditions." },
  { icon: Moon, title: "Better Sleep", description: "Regular sessions promote deeper, more restful sleep patterns." },
  { icon: Eye, title: "Mental Clarity", description: "Reduces mental fatigue and enhances focus through deep relaxation." },
  { icon: Move, title: "Increased Flexibility", description: "Helps keep joints and muscles supple, improving range of motion." },
];

const WhatIs = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader
        title="What Is Swedish Massage?"
        subtitle="Discover the world's most popular massage technique and its remarkable benefits."
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
              Swedish massage is the most widely recognized and commonly practiced form of therapeutic massage.
              Developed in the early 19th century by Per Henrik Ling, this technique uses a combination of long
              flowing strokes, kneading, and circular movements to promote relaxation and improve circulation.
            </p>
            <p>
              Unlike deep tissue massage, Swedish massage uses lighter to moderate pressure, making it an excellent
              choice for those new to massage, those seeking relaxation, or anyone looking to maintain overall wellness.
              The technique works with the body's natural systems to encourage healing and balance.
            </p>
          </motion.div>

          {/* Interactive Anatomy */}
          <div className="mb-20">
            <h2 className="font-display text-3xl text-foreground text-center mb-8">Major Muscle Groups</h2>
            <AnatomyBody />
          </div>

          {/* Techniques */}
          <h2 className="font-display text-3xl text-foreground text-center mb-10">The Five Core Techniques</h2>
          <div className="space-y-4 mb-20">
            {techniques.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-card rounded-lg p-6 shadow-soft border border-border/30"
              >
                <h3 className="font-display text-lg text-foreground mb-2">{t.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{t.description}</p>
              </motion.div>
            ))}
          </div>

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
