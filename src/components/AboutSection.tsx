import { motion } from "framer-motion";
import { Sparkles, Flower2, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Sparkles,
    title: "Earthy Massage",
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
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Why Choose <em className="italic text-primary">Earthy Massage</em>
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
        
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Ready to <em className="italic text-primary">Relax?</em>
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto mb-8">
            Your journey to wellness begins with a single step. Book your Swedish massage session today.
          </p>
          <Link to="/book">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-wide text-base px-10 py-6"
            >
              Schedule Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
