import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Clock, Sun, Moon, Phone } from "lucide-react";

const hours = [
  { day: "Monday", time: "8:00 AM – 6:00 PM" },
  { day: "Tuesday", time: "8:00 AM – 6:00 PM" },
  { day: "Wednesday", time: "8:00 AM – 6:00 PM" },
  { day: "Thursday", time: "8:00 AM – 6:00 PM" },
  { day: "Friday", time: "8:00 AM – 6:00 PM" },
  { day: "Saturday", time: "8:00 AM – 6:00 PM" },
  { day: "Sunday", time: "Closed" }
];


const Availability = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Availability" subtitle="Find a time that works for your schedule" />

      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="bg-petal border border-primary/30 rounded-lg px-6 py-4 mb-6 text-center">
            <p className="font-body text-sm font-semibold text-foreground">
              Extended hours today, May 2 — open until 8:00 PM.
            </p>
          </div>
          <div className="bg-card rounded-lg shadow-soft border border-border/40 overflow-hidden mb-10">
            <div className="bg-primary/10 px-6 py-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="font-display text-xl text-foreground">Office Hours</h2>
            </div>
            <div className="divide-y divide-border/40">
              {hours.map((h) =>
              <div key={h.day} className="flex justify-between items-center px-6 py-4">
                  <span className="font-body text-sm font-semibold text-foreground">{h.day}</span>
                  <span className={`font-body text-sm ${h.time === "Closed" ? "text-primary" : "text-muted-foreground"}`}>
                    {h.time}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-petal rounded-lg p-6 text-center">
              <Sun className="w-6 h-6 text-primary mx-auto mb-3" />
              <h3 className="font-display text-lg text-foreground mb-2">Same-Day Appointments</h3>
              <p className="font-body text-sm text-muted-foreground font-semibold">Please book at least two [2] hours in advance. Plan ahead.</p>
            </div>
            <div className="bg-petal rounded-lg p-6 text-center">
              <Phone className="w-6 h-6 text-primary mx-auto mb-3" />
              <h3 className="font-display text-lg text-foreground mb-2">Contact</h3>
              <p className="font-body text-sm text-muted-foreground font-semibold mb-3">Call or text to schedule your appointment.</p>
              <a href="tel:+14133278496" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                <Phone className="w-4 h-4" />
                (413) 327-8496
              </a>
            </div>
            <div className="bg-petal rounded-lg p-6 text-center">
              <Moon className="w-6 h-6 text-primary mx-auto mb-3" />
              <h3 className="font-display text-lg text-foreground mb-2">Booking</h3>
              <p className="font-body text-sm text-muted-foreground font-semibold">Book online anytime — we'll confirm your appointment promptly.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default Availability;