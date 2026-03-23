import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-spa.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Serene massage therapy setting with botanicals"
          className="w-full h-full object-cover"
          loading="eager" />
        

        <div className="absolute inset-0 bg-gradient-to-r from-foreground/50 via-foreground/20 to-transparent" />
      </div>

      <div className="container relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl">
          
          <p className="text-rose-light font-body text-sm tracking-[0.3em] uppercase mb-4 font-medium">Swedish Massage Therapy</p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream leading-tight mb-6">
            Find Your <em className="italic text-cream">Serenity</em>
          </h1>
          <p className="text-cream/80 font-body text-lg leading-relaxed mb-8 max-w-md opacity-100 font-medium">
            Experience the gentle art of massage in a warm, welcoming space designed for deep relaxation and lasting
            renewal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/book">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-wide text-base px-8 py-6">
                
                Book Your Session <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground border-none font-body tracking-wide text-base px-8 py-6">
                
                Explore Services
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default HeroSection;