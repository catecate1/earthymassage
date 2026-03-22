import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Clock, Ban, CalendarX, ShieldCheck, Baby, Accessibility } from "lucide-react";

const policies = [
  {
    icon: Clock,
    title: "Arrival Time",
    text: "Please arrive 10–15 minutes early for your appointment, especially for first-time visits. This allows time for paperwork and a brief consultation with your therapist.",
  },
  {
    icon: CalendarX,
    title: "Cancellation Policy",
    text: "We require at least 24 hours' notice for cancellations or rescheduling. Late cancellations or no-shows may be subject to a fee equal to 50% of the scheduled service.",
  },
  {
    icon: Ban,
    title: "Late Arrivals",
    text: "If you arrive late, your session may be shortened to avoid impacting other clients' appointments. The full session fee will still apply.",
  },
  {
    icon: ShieldCheck,
    title: "Health & Safety",
    text: "Please inform your therapist of any health conditions, allergies, injuries, or medications. If you are feeling unwell or have a contagious condition, we ask that you reschedule.",
  },
  {
    icon: Baby,
    title: "Minors",
    text: "Clients under 18 must have a parent or guardian present during the session and must provide written consent prior to treatment.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    text: "Our studio is wheelchair accessible. Please let us know of any special accommodations you may need so we can ensure your comfort.",
  },
];

const Policies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Policies" subtitle="Our guidelines to ensure a wonderful experience for everyone" />

      <section className="py-16">
        <div className="container max-w-4xl space-y-6">
          {policies.map((p) => (
            <div key={p.title} className="bg-card rounded-lg p-6 shadow-soft border border-border/40 flex gap-4">
              <p.icon className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-lg text-foreground mb-1">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Policies;
