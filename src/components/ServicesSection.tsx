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
    <section id="services" className="py-24 bg-cream">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">Our Services</h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            Swedish massage sessions crafted for your comfort and healing.
          </p>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-6 mb-12" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={item}
              className={`group bg-card rounded-lg p-8 shadow-soft hover:shadow-card transition-all duration-300 border border-border/40 hover:-translate-y-1 ${i === 0 ? 'md:col-span-1' : ''}`}
            >
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 rounded-full bg-petal flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl text-foreground mb-1">{service.title}</h3>
                  <div className="flex items-center gap-3 text-sm font-body mb-3">
                    <span className="text-muted-foreground">{service.duration}</span>
                    <span className="text-primary font-semibold">{service.price}</span>
                  </div>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
