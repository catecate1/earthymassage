import { motion } from "framer-motion";
import { Sparkles, Flower2, Heart } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Healing Touch",
    description: "Personalized Swedish massage tailored to your body's unique needs.",
  },
  {
    icon: Flower2,
    title: "Natural Wellness",
    description: "Organic oils and a calming environment to nurture your wellbeing.",
  },
  {
    icon: Heart,
    title: "Deep Relaxation",
    description: "Release tension and restore balance with every session.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Why Choose <em className="italic text-primary">Healing Touch</em>
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-2" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto mb-20"
        >
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="w-14 h-14 rounded-full bg-petal flex items-center justify-center mx-auto mb-5">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </motion.div>

        {/* About the therapist */}
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">About Me</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Healing Hands, <br />
              <em className="italic text-primary">Caring Heart</em>
            </h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>
                I'm a licensed massage therapist with over 8 years of experience helping clients 
                find relief, relaxation, and renewed energy. My practice is built on the belief 
                that true wellness comes from treating the whole person.
              </p>
              <p>
                My studio is a warm, inviting space designed to feel like a sanctuary from the 
                moment you walk in.
              </p>
            </div>
            <div className="flex gap-8 mt-8">
              {[
                { num: "8+", label: "Years Experience" },
                { num: "2k+", label: "Happy Clients" },
                { num: "5", label: "Modalities" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl text-primary">{stat.num}</div>
                  <div className="font-body text-xs text-muted-foreground tracking-wide uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-petal via-blush to-rose-light flex items-center justify-center shadow-card">
              <div className="text-center p-8">
                <div className="w-24 h-24 rounded-full bg-card mx-auto mb-4 flex items-center justify-center shadow-soft">
                  <span className="font-display text-4xl text-primary">S</span>
                </div>
                <p className="font-display text-xl text-foreground">Sarah Mitchell, LMT</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Licensed Massage Therapist</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
