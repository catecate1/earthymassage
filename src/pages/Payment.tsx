import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { CreditCard, DollarSign, Heart, Smartphone } from "lucide-react";

const methods = [
  { icon: CreditCard, title: "Credit & Debit Cards", desc: "Visa, Mastercard, American Express, and Discover accepted." },
  { icon: Smartphone, title: "Digital Wallets", desc: "Apple Pay, Google Pay, and contactless payments welcome." },
  { icon: DollarSign, title: "Cash", desc: "Cash payments accepted at time of service." },
  { icon: Heart, title: "Gift Certificates", desc: "Redeem gift certificates toward any service or package." },
];

const Payment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Payment Information" subtitle="Convenient payment options for your wellness journey" />

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {methods.map((m) => (
              <div key={m.title} className="bg-card rounded-lg p-6 shadow-soft border border-border/40">
                <m.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display text-lg text-foreground mb-2">{m.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-petal rounded-lg p-8 space-y-4">
            <h2 className="font-display text-2xl text-foreground">Payment Policies</h2>
            <ul className="space-y-3 font-body text-muted-foreground text-sm">
              <li>• Payment is due at the time of service unless prior arrangements have been made.</li>
              <li>• Gratuities are appreciated but never expected.</li>
              <li>• Insurance reimbursement receipts are available upon request.</li>
              <li>• Package deals must be paid in full at time of purchase.</li>
              <li>• Gift certificates are non-refundable but transferable.</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Payment;
