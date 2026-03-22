import { motion } from "framer-motion";
import heroImage from "@/assets/hero-spa.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Serene massage therapy setting with botanicals"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
      </div>

      <div className="container relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="text-sage-light font-body text-sm tracking-[0.3em] uppercase mb-4">
            Healing Touch Massage
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream leading-tight mb-6">
            Restore Your <em className="italic text-blush">Balance</em>
          </h1>
          <p className="text-cream/80 font-body text-lg leading-relaxed mb-8 max-w-md">
            Personalized massage therapy rooted in holistic wellness. 
            Nurture your body and calm your mind in a peaceful spring-inspired sanctuary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-wide text-base px-8 py-6">
              Book a Session
            </Button>
            <Button size="lg" variant="outline" className="border-cream/40 text-cream hover:bg-cream/10 font-body tracking-wide text-base px-8 py-6">
              View Services
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
