import { motion } from "framer-motion";
import { Clock, Droplets, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import swedishMassage from "@/assets/swedish-massage.jpg";
import massageChair from "@/assets/massage-chair.jpg";

const services = [
  {
    title: "Chair Massage",
    duration: "30 min",
    price: "$40",
    description: "A focused session targeting the back, shoulders and neck. Perfect for a quick reset during a busy day.",
    popular: false,
  },
  {
    title: "Classic Swedish",
    duration: "60 min",
    price: "$60",
    description: "Signature full-body Swedish massage. Flowing strokes promote deep relaxation and improved circulation.",
    popular: true,
  },
  {
    title: "Extended Bliss",
    duration: "90 min",
    price: "$115",
    description: "An indulgent session allowing extra time for each section of the body including the feet.",
    popular: false,
  },
  {
    title: "Ultimate Retreat",
    duration: "120 min",
    price: "$150",
    description: "The complete experience. Two full hours of unhurried Swedish massage for profound relaxation and renewal.",
    popular: false,
  },
];

const enhancements = [
  { title: "Coming Soon", price: "", description: "New enhancements are on the way. Stay tuned!" },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Services"
        subtitle="Swedish massage sessions crafted for your comfort and healing."
      />

      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={swedishMassage}
                alt="Swedish massage"
                className="rounded-lg shadow-card w-full object-cover"
              />
              <img
                src={massageChair}
                alt="Massage chair"
                className="rounded-lg shadow-card w-full object-cover mt-4"
              />
            </motion.div>

            <div className="space-y-4">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-card rounded-lg p-6 shadow-soft border border-border/30 relative"
                >
                  {s.popular && (
                    <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-body px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-display text-xl text-foreground mb-1">{s.title}</h3>
                  <div className="flex items-center gap-3 text-sm font-body mb-3">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" /> {s.duration}
                    </span>
                    <span className="text-primary font-semibold">{s.price}</span>
                  </div>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{s.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhancements */}
          <div className="max-w-5xl mx-auto mt-20">
            <h2 className="font-display text-3xl text-foreground text-center mb-10">Enhancements</h2>
            <div className="flex justify-center">
              {enhancements.map((e, i) => (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-card rounded-lg p-6 shadow-soft border border-border/30 text-center"
                >
                  <h3 className="font-display text-lg text-foreground mb-1">{e.title}</h3>
                  <p className="text-primary font-body font-semibold text-sm mb-2">{e.price}</p>
                  <p className="text-muted-foreground font-body text-sm">{e.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/book">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-wide text-base px-10 py-6">
                Book Your Session
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
