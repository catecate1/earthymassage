import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Clock, Ban, DollarSign, CreditCard, Weight, AlertTriangle, RotateCcw, Link2 } from "lucide-react";

const policies = [
  {
    icon: Clock,
    title: "Arrival Time",
    text: "First-time visitors should arrive at least five [5] minutes early. This allows time for paperwork and a brief consultation.  Give yourself time to get lost.",
  },
  {
    icon: Ban,
    title: "No Walk-Ins",
    text: "Absolutely NO WALK-INS!",
  },
  {
    icon: AlertTriangle,
    title: "Fragrance Free Zone",
    text: "Perfumes and colognes are toxins. Do not be wearing any of that when you come in.",
  },
  {
    icon: DollarSign,
    title: "Cash Policy",
    text: "I do not accept $100 bills and do not make change.",
  },
  {
    icon: CreditCard,
    title: "Credit Cards",
    text: "I do not process credit cards in the office.",
  },
  {
    icon: Weight,
    title: "Table Weight Limit",
    text: "I do not allow anyone weighing more than 300 lbs. on my table.",
  },
  {
    icon: Clock,
    title: "Late Arrivals",
    text: "If you are late I will try to go over the scheduled time but might not be able to due to other commitments. That means your time will be cut short but you still owe for the time blocked on the calendar. If you are more than five (5) minutes late and I haven't heard from you, the appointment will be cancelled.",
  },
  {
    icon: RotateCcw,
    title: "No Refunds",
    text: "No refunds.  This includes prepaid no-shows.",
  },
  {
    icon: Link2,
    title: "Website Linking",
    text: "You may not link to this website without my express written permission.",
  },
  {
    icon: AlertTriangle,
    title: "Harassment Policy",
    text: "Any inappropriate behavior or requests will result in immediate termination of the session. The full session fee will be charged. Earthy Massage maintains a zero-tolerance policy.",
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
