import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { CreditCard, DollarSign } from "lucide-react";

const methods = [
  { icon: CreditCard, title: "Credit & Debit Cards", desc: "Visa, Mastercard, American Express, and Discover accepted." },
  { icon: DollarSign, title: "Cash", desc: "Cash payments accepted at time of service." },
];

const Payment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Payment Information" subtitle="Convenient payment options for your wellness journey" />

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {methods.map((m) => (
              <div key={m.title} className="bg-card rounded-lg p-6 shadow-soft border border-border/40">
                <m.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display text-lg text-foreground mb-2">{m.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Payment;
