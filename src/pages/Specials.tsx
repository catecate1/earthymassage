import { motion } from "framer-motion";
import { Star, Users, Tag, ArrowRight, Gift, PartyPopper } from "lucide-react";
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
  salePrice: "$55",
  originalPrice: "$60",
  description: "New clients receive $5 off their first 60-minute Classic Swedish session. Experience the Healing Touch difference!"
},
{
  badge: "New Clients",
  icon: Tag,
  title: "First Visit Special",
  salePrice: "$75",
  originalPrice: "$85",
  description: "New clients receive $10 off their first 75-minute Classic Swedish session. Experience the Healing Touch difference!"
},
{
  badge: "New Clients",
  icon: Tag,
  title: "First Visit Special",
  salePrice: "$100",
  originalPrice: "$115",
  description: "New clients receive $15 off their first 90-minute Classic Swedish session. Experience the Healing Touch difference!"
}];

const ladiesNightSpecials = [
  {
    title: "60 Minutes",
    salePrice: "$36",
    originalPrice: "$60",
  },
  {
    title: "75 Minutes",
    salePrice: "$51",
    originalPrice: "$85",
  },
];


const Specials = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Current Specials"
        subtitle="Take advantage of these limited-time offers and treat yourself." />
      

      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {specials.map((s, i) =>
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-lg p-8 shadow-soft border border-border/30">
              
                <span className="inline-block bg-petal text-primary text-xs font-body px-3 py-1 rounded-full mb-4">
                  {s.badge}
                </span>
                <div className="w-10 h-10 rounded-full bg-petal flex items-center justify-center mb-4">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">{s.title}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-display text-2xl text-primary">{s.salePrice}</span>
                  {s.originalPrice &&
                <span className="font-body text-sm text-muted-foreground line-through">{s.originalPrice}</span>
                }
                </div>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">{s.description}</p>
                <Link to="/book">
                  <Button variant="outline" className="w-full border-border hover:bg-petal font-body text-sm group">
                    Book Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-lg p-8 shadow-soft border border-border/30 max-w-lg mx-auto mt-8 text-center">
            
            <span className="inline-block bg-petal text-primary font-body px-3 py-1 rounded-full mb-4 text-sm">
              Limited Event
            </span>
            <div className="w-10 h-10 rounded-full bg-petal flex items-center justify-center mb-4 mx-auto">
              <PartyPopper className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-2">Ladies Night Special</h3>
            <p className="text-muted-foreground font-body text-sm mb-1">April 4th, 2026 • 4:00 PM – 8:00 PM</p>
            <p className="font-display text-2xl text-primary mb-6">40% Off</p>
            <div className="flex justify-center gap-6 mb-6">
              {ladiesNightSpecials.map((item) => (
                <div key={item.title} className="text-center">
                  <p className="font-display text-lg text-foreground mb-1">{item.title}</p>
                  <span className="font-display text-xl text-primary">{item.salePrice}</span>
                  <span className="font-body text-sm text-muted-foreground line-through ml-2">{item.originalPrice}</span>
                </div>
              ))}
            </div>
            <Link to="/book">
              <Button variant="outline" className="border-border hover:bg-petal font-body text-sm group">
                Book Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-lg p-8 shadow-soft border border-border/30 max-w-md mx-auto mt-8 text-center">
            
            <span className="inline-block bg-petal text-primary font-body px-3 py-1 rounded-full mb-4 text-sm">
              Loyalty Reward
            </span>
            <div className="w-10 h-10 rounded-full bg-petal flex items-center justify-center mb-4 mx-auto">
              <Gift className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-2">Every 3rd Consecutive Standard Rate Service Of Equal Value        </h3>
            <p className="font-display text-2xl text-primary mb-4">50% Off Standard Rate</p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
               I'll keep track! No codes to enter.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default Specials;