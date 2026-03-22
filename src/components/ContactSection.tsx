import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Ready to <em className="italic text-primary">Relax?</em>
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Your journey to wellness begins with a single step. Book your session today.
          </p>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {[
              { icon: MapPin, label: "Location", text: "123 Blossom Lane, Suite 4, Springfield" },
              { icon: Phone, label: "Phone", text: "(555) 123-4567" },
              { icon: Mail, label: "Email", text: "hello@healingtouchmassage.com" },
              { icon: Clock, label: "Hours", text: "Mon–Sat: 9am – 7pm" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-petal flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                  <span className="font-body text-foreground text-sm">{item.text}</span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-card rounded-lg p-8 shadow-card border border-border/30"
          >
            <h3 className="font-display text-2xl text-foreground mb-6">Book a Session</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Email *</label>
                  <input
                    type="email"
                    placeholder="jane@email.com"
                    className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Phone</label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Service *</label>
                  <select className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Choose a session</option>
                    <option>Swedish Massage</option>
                    <option>Deep Tissue</option>
                    <option>Hot Stone Therapy</option>
                    <option>Prenatal Massage</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Special Requests or Notes</label>
                <textarea
                  placeholder="Any areas of concern, allergies, preferences..."
                  rows={3}
                  className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-wide py-6 text-base">
                Submit Booking Request
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
