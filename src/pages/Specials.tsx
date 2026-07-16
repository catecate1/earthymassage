import { motion } from "framer-motion";
import { Star, Tag, ArrowRight, Gift, TreePine, Snowflake } from "lucide-react";
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
  description: "New clients receive $5 off their first 60-minute Classic Swedish session. Experience the Healing Touch difference!",
  code: "fa5"
},
{
  badge: "New Clients",
  icon: Tag,
  title: "First Visit Special",
  salePrice: "$75",
  originalPrice: "$85",
  description: "New clients receive $10 off their first 75-minute Classic Swedish session. Experience the Healing Touch difference!",
  code: "fa10"
},
{
  badge: "New Clients",
  icon: Tag,
  title: "First Visit Special",
  salePrice: "$100",
  originalPrice: "$115",
  description: "New clients receive $15 off their first 90-minute Classic Swedish session. Experience the Healing Touch difference!",
  code: "fa15"
}];



const Specials = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Current Specials"
        subtitle="Take advantage of these limited-time offers and treat yourself." />

      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-center font-display text-2xl text-foreground mb-8">Christmas in July Early Bird Specials (8 AM – 12 PM)</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="bg-card rounded-lg p-8 shadow-soft border border-border/30">
              <span className="inline-block bg-petal text-primary text-xs font-body px-3 py-1 rounded-full mb-4">
                Christmas in July
              </span>
              <div className="w-10 h-10 rounded-full bg-petal flex items-center justify-center mb-4">
                <TreePine className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">60 Minute Classic Swedish</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display text-2xl text-primary">$30</span>
                <span className="font-body text-sm text-muted-foreground line-through">$60</span>
              </div>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-3">
                Enjoy 50% off any 60-minute Classic Swedish session when you book between 8 AM and 12 PM.
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed font-semibold mb-6">
                Enter code: <span className="text-primary">cj50</span>
              </p>
              <Link to="/book">
                <Button variant="outline" className="w-full border-border hover:bg-petal font-body text-sm group">
                  Book Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-lg p-8 shadow-soft border border-border/30">
              <span className="inline-block bg-petal text-primary text-xs font-body px-3 py-1 rounded-full mb-4">
                Christmas in July
              </span>
              <div className="w-10 h-10 rounded-full bg-petal flex items-center justify-center mb-4">
                <Snowflake className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">75 Minute Classic Swedish</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display text-2xl text-primary">$42.50</span>
                <span className="font-body text-sm text-muted-foreground line-through">$85</span>
              </div>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-3">
                Enjoy 50% off any 75-minute Classic Swedish session when you book between 8 AM and 12 PM.
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed font-semibold mb-6">
                Enter code: <span className="text-primary">cj50</span>
              </p>
              <Link to="/book">
                <Button variant="outline" className="w-full border-border hover:bg-petal font-body text-sm group">
                  Book Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-lg p-8 shadow-soft border border-border/30">
              <span className="inline-block bg-petal text-primary text-xs font-body px-3 py-1 rounded-full mb-4">
                Christmas in July
              </span>
              <div className="w-10 h-10 rounded-full bg-petal flex items-center justify-center mb-4">
                <Gift className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">90 Minute Classic Swedish</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display text-2xl text-primary">$57.50</span>
                <span className="font-body text-sm text-muted-foreground line-through">$115</span>
              </div>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-3">
                Enjoy 50% off any 90-minute Classic Swedish session when you book between 8 AM and 12 PM.
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed font-semibold mb-6">
                Enter code: <span className="text-primary">cj50</span>
              </p>
              <Link to="/book">
                <Button variant="outline" className="w-full border-border hover:bg-petal font-body text-sm group">
                  Book Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <h2 className="text-center font-display text-2xl text-foreground mb-8">First Visit Specials</h2>
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
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-3">{s.description}</p>
                {s.code && (
                  <p className="text-muted-foreground font-body text-sm leading-relaxed font-semibold mb-6">
                    Enter code: <span className="text-primary">{s.code}</span>
                  </p>
                )}
                <Link to="/book">
                   <Button variant="outline" className="w-full border-border hover:bg-petal font-body text-sm group">
                     Book Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                   </Button>
                 </Link>
              </motion.div>
            )}
          </div>


          <div className="grid md:grid-cols-1 gap-8 max-w-xl mx-auto mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card rounded-lg p-8 shadow-soft border border-border/30 text-center">
              
              <span className="inline-block bg-petal text-primary font-body px-3 py-1 rounded-full mb-4 text-sm">
                Loyalty Reward
              </span>
              <div className="w-10 h-10 rounded-full bg-petal flex items-center justify-center mb-4 mx-auto">
                <Gift className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">Every 3rd Consecutive Standard Rate Service Of Equal Value</h3>
              <p className="font-display text-2xl text-primary mb-4">50% Off Standard Rate</p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                 I'll keep track! No codes to enter.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default Specials;
