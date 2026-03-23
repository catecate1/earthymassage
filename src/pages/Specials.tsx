import { motion } from "framer-motion";
import { Star, Users, Tag, ArrowRight, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const specials = [
  {
    badge: "New Clients",
    icon: Star,
    title: "First Visit Special",
    salePrice: "$60",
    originalPrice: "$80",
    description: "New clients receive $20 off their first 60-minute Classic Swedish session. Experience the Healing Touch difference!",
  },
  {
    badge: "Limited Time",
    icon: Tag,
    title: "First Visit Special",
    salePrice: "$75",
    originalPrice: "$85",
    description: "New clients receive $10 off their first 75-minute Classic Swedish session. Experience the Healing Touch difference!",
  },
  {
    badge: "Limited Time",
    icon: Tag,
    title: "First Visit Special",
    salePrice: "$100",
    originalPrice: "$115",
    description: "New clients receive $15 off their first 90-minute Classic Swedish session. Experience the Healing Touch difference!",
  },
];

const Specials = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Current Specials"
        subtitle="Take advantage of these limited-time offers and treat yourself."
      />

      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {specials.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-lg p-8 shadow-soft border border-border/30"
              >
                <span className="inline-block bg-petal text-primary text-xs font-body px-3 py-1 rounded-full mb-4">
                  {s.badge}
                </span>
                <div className="w-10 h-10 rounded-full bg-petal flex items-center justify-center mb-4">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">{s.title}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-display text-2xl text-primary">{s.salePrice}</span>
                  {s.originalPrice && (
                    <span className="font-body text-sm text-muted-foreground line-through">{s.originalPrice}</span>
                  )}
                </div>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">{s.description}</p>
                <Link to="/book">
                  <Button variant="outline" className="w-full border-border hover:bg-petal font-body text-sm group">
                    Book Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Specials;
