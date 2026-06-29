import { motion } from "framer-motion";
import { Star, Users, Tag, ArrowRight, Gift, Sun, Sparkles } from "lucide-react";
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

      <section className="py-12 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto rounded-xl border-4 border-patriotic-blue bg-patriotic-white overflow-hidden shadow-soft">
            <div className="bg-patriotic-red py-3 px-6 text-center">
              <span className="inline-flex items-center gap-2 text-patriotic-white font-body text-sm font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Limited Time — Now through July 4th
                <Sparkles className="w-4 h-4" />
              </span>
            </div>
            <div className="p-8 text-center">
              <h2 className="font-display text-3xl md:text-4xl text-patriotic-red mb-2">July 4th Special</h2>
              <p className="font-body text-muted-foreground mb-2">Celebrate Independence Day with big savings!</p>
              <p className="font-body text-sm text-patriotic-red font-semibold mb-6">Extended hours until 10pm during the special.</p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="rounded-lg border-2 border-patriotic-red/20 p-5 bg-background/50">
                  <p className="font-display text-lg text-foreground mb-1">60 Minutes</p>
                  <p className="font-display text-3xl text-patriotic-blue font-bold">$20 Off</p>
                  <p className="font-body text-sm text-muted-foreground mt-1">Now <span className="font-semibold text-foreground">$40</span> <span className="line-through">$60</span></p>
                </div>
                <div className="rounded-lg border-2 border-patriotic-blue/20 p-5 bg-background/50">
                  <p className="font-display text-lg text-foreground mb-1">75 Minutes</p>
                  <p className="font-display text-3xl text-patriotic-blue font-bold">$30 Off</p>
                  <p className="font-body text-sm text-muted-foreground mt-1">Now <span className="font-semibold text-foreground">$55</span> <span className="line-through">$85</span></p>
                </div>
                <div className="rounded-lg border-2 border-patriotic-red/20 p-5 bg-background/50">
                  <p className="font-display text-lg text-foreground mb-1">90 Minutes</p>
                  <p className="font-display text-3xl text-patriotic-blue font-bold">$40 Off</p>
                  <p className="font-body text-sm text-muted-foreground mt-1">Now <span className="font-semibold text-foreground">$75</span> <span className="line-through">$115</span></p>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/book">
                  <Button className="bg-patriotic-blue hover:bg-patriotic-blue/90 text-patriotic-white font-body px-8 py-3 text-base">
                    Book Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="h-2 bg-gradient-to-r from-patriotic-red via-patriotic-white to-patriotic-blue" />
          </motion.div>
        </div>
      </section>

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


          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-lg p-8 shadow-soft border border-border/30 text-center">
              
              <span className="inline-block bg-petal text-primary font-body px-3 py-1 rounded-full mb-4 text-sm">
                Early Bird
              </span>
              <div className="w-10 h-10 rounded-full bg-petal flex items-center justify-center mb-4 mx-auto">
                <Sun className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">Early Bird Special</h3>
              <p className="font-display text-2xl text-primary mb-4">25% Off Standard Rate Swedish Massage</p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-2">
                Available between 8am and 12pm.
              </p>
              <p className="text-muted-foreground font-body text-xs leading-relaxed italic mb-3">
                Cannot be combined with other services/discounts. No back to back appointments.
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed font-semibold">
                Enter code: <span className="text-primary">eb25</span>
              </p>
            </motion.div>

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
