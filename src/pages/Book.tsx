import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const Book = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Book Online"
        subtitle="Request your appointment and I'll confirm within 24 hours."
      />

      <section className="py-16 bg-background">
        <div className="container max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-lg p-8 md:p-10 shadow-card border border-border/30"
          >
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm text-foreground mb-1.5 block">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-foreground mb-1.5 block">Email *</label>
                  <input
                    type="email"
                    placeholder="jane@email.com"
                    className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm text-foreground mb-1.5 block">Phone</label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-foreground mb-1.5 block">Service *</label>
                  <select className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Choose a session</option>
                    <option>Express Relief – 30 min ($45)</option>
                    <option>Classic Swedish – 60 min ($80)</option>
                    <option>Extended Bliss – 90 min ($115)</option>
                    <option>Ultimate Retreat – 120 min ($150)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm text-foreground mb-1.5 block">Preferred Date *</label>
                  <input
                    type="date"
                    className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-foreground mb-1.5 block">Preferred Time</label>
                  <select className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select time</option>
                    {["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"].map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="font-body text-sm text-foreground mb-1.5 block">Special Requests or Notes</label>
                <textarea
                  placeholder="Any areas of concern, allergies, preferences..."
                  rows={4}
                  className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-wide py-6 text-base">
                <Send className="w-4 h-4 mr-2" />
                Submit Booking Request
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Book;
