import { motion } from "framer-motion";
import { Leaf, Droplets, Sun, Heart } from "lucide-react";

const services = [
  {
    icon: Leaf,
    title: "Swedish Massage",
    description: "Gentle, flowing strokes to promote deep relaxation and relieve everyday tension.",
    duration: "60 / 90 min",
    price: "From $95",
  },
  {
    icon: Droplets,
    title: "Deep Tissue",
    description: "Targeted pressure to release chronic muscle knots and restore mobility.",
    duration: "60 / 90 min",
    price: "From $110",
  },
  {
    icon: Sun,
    title: "Hot Stone Therapy",
    description: "Warm basalt stones melt away stress while improving circulation and energy flow.",
    duration: "75 min",
    price: "From $120",
  },
  {
    icon: Heart,
    title: "Prenatal Massage",
    description: "Gentle, nurturing care designed for the comfort and wellness of expecting mothers.",
    duration: "60 min",
    price: "From $105",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">What I Offer</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">Therapeutic Services</h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            Each session is tailored to your unique needs, blending technique with intuition.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group bg-card rounded-lg p-8 shadow-soft hover:shadow-card transition-shadow duration-300 border border-border/50"
            >
              <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center mb-5 group-hover:bg-secondary transition-colors">
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{service.description}</p>
              <div className="flex justify-between items-center text-sm font-body">
                <span className="text-muted-foreground">{service.duration}</span>
                <span className="text-primary font-semibold">{service.price}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
