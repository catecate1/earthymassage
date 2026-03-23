import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { ShieldCheck, AlertTriangle, CheckCircle, Info } from "lucide-react";

const sections = [
  {
    icon: Info,
    title: "What to Expect",
    items: [
      "A brief health intake form will be completed before your first session.",
      "You will be draped with sheets at all times — only the area being worked on is uncovered.",
      "You may undress to your comfort level. Underwear may be left on.",
    ],
  },
];

const InformedChoices = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Informed Choices" subtitle="Everything you need to know before your massage" />

      <section className="py-16">
        <div className="container max-w-4xl space-y-10">
          {sections.map((s) => (
            <div key={s.title} className="bg-card rounded-lg p-6 shadow-soft border border-border/40">
              <div className="flex items-center gap-3 mb-4">
                <s.icon className="w-6 h-6 text-primary" />
                <h2 className="font-display text-xl text-foreground">{s.title}</h2>
              </div>
              <ul className="space-y-2">
                {s.items.map((item, i) => (
                  <li key={i} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InformedChoices;
