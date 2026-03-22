import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-sage-light">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">About Me</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Healing Hands, <br />
              <em className="italic text-blush-dark">Caring Heart</em>
            </h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>
                I'm a licensed massage therapist with over 8 years of experience helping clients 
                find relief, relaxation, and renewed energy. My practice is built on the belief 
                that true wellness comes from treating the whole person.
              </p>
              <p>
                Trained in multiple modalities, I create a customized experience for each client — 
                whether you're seeking relief from chronic pain, recovering from an injury, or 
                simply need a moment of peace in your busy life.
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
            <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-primary/10 via-secondary to-accent/30 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
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
