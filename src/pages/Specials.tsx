import { motion } from "framer-motion";
import { Gift, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { contestEntriesOpen, specialsContest } from "@/lib/specials-contest";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const Specials = () => {
  const [entriesOpen, setEntriesOpen] = useState(() => contestEntriesOpen(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => setEntriesOpen(contestEntriesOpen(new Date())), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Current Specials"
        subtitle="Take advantage of these limited-time offers and treat yourself." />

      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-xl mx-auto mb-12 text-center border-b border-border pb-12">
            <Gift className="w-8 h-8 text-primary mx-auto mb-4" />
            <p className="font-body text-sm text-primary mb-3">Body-Work Contest</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Win a Free {specialsContest.durationMinutes} Minute Body-Work Session
            </h2>
            <div className="font-body text-muted-foreground leading-relaxed space-y-4">
              <p>
                Limited to {specialsContest.maxEntries} entries.  You must be an existing customer in good standing to enter.
              </p>
              <dl className="space-y-3">
                <div>
                  <dt className="font-bold text-foreground">Entries Close</dt>
                  <dd>Friday, October 16, 2026 at 8:00 PM</dd>
                </div>
                <div>
                  <dt className="font-bold text-foreground">Drawing</dt>
                  <dd>Saturday, October 17, 2026 at 8:00 AM</dd>
                </div>
              </dl>
              <p className="text-sm">All times are Eastern time.</p>
              {specialsContest.assignedWheelNumber && <p>You'll be assigned a number for the wheel.</p>}
              {specialsContest.viewingLinkAfterDrawing && <p>After the drawing, you'll receive a link to watch the wheel.</p>}
              <p className="font-bold text-foreground">
                {entriesOpen ? "Call 413-327-8496 or email contest@earthy-wellness.com with “60 min” in the subject." : "Entries are closed."}
              </p>
            </div>
            {entriesOpen && (
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <Button asChild><a href="tel:4133278496"><Phone />Call to Enter</a></Button>
                <Button asChild variant="outline"><a href="mailto:contest@earthy-wellness.com?subject=60%20min"><Mail />Email to Enter</a></Button>
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-1 gap-8 max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-lg p-8 shadow-soft border border-border/30 text-center">

              <span className="inline-block bg-petal text-primary font-body px-3 py-1 rounded-full mb-4 text-sm">
                Early Bird Special
              </span>
              <div className="w-10 h-10 rounded-full bg-petal flex items-center justify-center mb-4 mx-auto">
                <Gift className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">90 Minute Meridian Body-Work</h3>
              <p className="font-display text-2xl text-primary mb-2">$10.00 Off</p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Between 8:00 AM and 11:00 AM only.  Use promo code <span className="font-bold text-foreground">ebo10</span> when booking online.  Cannot be combined with other discounts.
              </p>
            </motion.div>
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
