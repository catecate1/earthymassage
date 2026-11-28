import { motion } from "framer-motion";
import { Activity, Heart, Brain, Moon, Eye, Move } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const principles = [
  { title: "Flowing Strokes", description: "Long, smooth strokes keep the session calm, connected, and unhurried." },
  { title: "Slightly Firm Pressure", description: "I use slightly firm pressure and keep the work moving rather than spending an extended period on any one area." },
];

const benefits = [
  { icon: Activity, title: "Improved Circulation", description: "Long, flowing strokes encourage circulation while keeping the session calm and comfortable." },
  { icon: Heart, title: "Deep Relaxation", description: "A steady pace and connected strokes give your body and mind time to settle." },
  { icon: Brain, title: "Everyday Aches", description: "Slightly firm pressure can ease general muscle tension and everyday aches without deep tissue work." },
  { icon: Moon, title: "Time To Unwind", description: "A quiet session offers a welcome break from the pace and demands of your day." },
  { icon: Eye, title: "A Mental Reset", description: "Setting aside time for yourself can help you slow down and feel more settled." },
  { icon: Move, title: "Comfortable Movement", description: "Gentle, full-body work can leave tight muscles feeling looser and movement more comfortable." },
];

const commonBenefits = [
  "Helps you relax and step away from everyday stress.",
  "Eases general muscle tension and everyday aches.",
  "Encourages circulation with long, flowing strokes.",
];

const WhatIs = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader
        title="What Is Swedish Body-Work?"
        subtitle="Long, flowing strokes, slightly firm pressure, and a calm, unhurried session."
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
              Swedish body-work is hands-on work built around long, flowing strokes and a steady,
              comfortable pace.  My sessions are slightly firm and cover the body from neck to ankle
              or toe, including the pecs, abs, glutes, adductors, and hamstrings.
            </p>
            <p>
              This is not deep tissue, Thai, sports massage, or extended focus work on one area.
              It is a thorough, caring, seamless session that gives you time to relax.  I'm not trying
              to fix you.  I'm trying to relax you.
            </p>
          </motion.div>

          {/* What the work is like */}
          <h2 className="font-display text-3xl text-foreground text-center mb-10">What The Work Is Like</h2>
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
          <h2 className="font-display text-3xl text-foreground text-center mb-10">Potential Benefits</h2>
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
