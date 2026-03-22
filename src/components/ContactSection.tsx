import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-blush/30 via-lavender/40 to-spring-green/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">Get in Touch</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Ready to <em className="italic text-blush-dark">Relax?</em>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              I'd love to help you on your wellness journey. Reach out to schedule your 
              first session or ask any questions about my services.
            </p>

            <div className="space-y-5">
              {[
                { icon: MapPin, text: "123 Blossom Lane, Suite 4, Springfield", bg: "bg-spring-green" },
                { icon: Phone, text: "(555) 123-4567", bg: "bg-petal" },
                { icon: Mail, text: "hello@healingtouchmassage.com", bg: "bg-lavender" },
                { icon: Clock, text: "Mon–Sat: 9am – 7pm", bg: "bg-blush" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-body text-foreground text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-card rounded-lg p-8 shadow-card border border-border/50"
          >
            <h3 className="font-display text-2xl text-foreground mb-6">Book a Session</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <select className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select a Service</option>
                <option>Swedish Massage</option>
                <option>Deep Tissue</option>
                <option>Hot Stone Therapy</option>
                <option>Prenatal Massage</option>
              </select>
              <textarea
                placeholder="Any notes or preferences?"
                rows={3}
                className="w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-wide py-6 text-base">
                Request Appointment
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
