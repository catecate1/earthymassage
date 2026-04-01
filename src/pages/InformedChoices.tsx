import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

import { Info, HandHelping, ShieldCheck, Droplets, Clock, Armchair, Gift } from "lucide-react";

const sections = [
  {
    icon: Info,
    title: "What to Expect",
    items: [
      "A brief health intake form will be completed before your first session.",
      "You will be draped with a sheet or bath sized towel at all times — only the area being worked on is uncovered.",
      "You may undress to your comfort level.",
    ],
  },
  {
    icon: HandHelping,
    title: "Who Is This Massage For?",
    text: "It is for anyone genuinely interested in a good, thorough, caring, seamless massage. I do a slightly firm Swedish Massage. It is great for relief from general aches and pains and very relaxing. A neck to ankle or toe massage which includes the pecs, abs, glutes, adductors and hamstrings.",
  },
  {
    icon: ShieldCheck,
    title: "What I Don't Do",
    text: "I do NOT do Deep Tissue, Rolfing, Thai or focus work — I do not spend an extended period of time on any one section of the body. In short, if it isn't on the services page then it isn't available. I'm not trying to fix you. I'm trying to relax you.",
  },
  {
    icon: Gift,
    title: "Purchasing Massage For Another",
    text: "Never purchase a massage for another person as a treat or surprise. This isn't a fancy spa.",
  },
  {
    icon: Armchair,
    title: "About The Table",
    text: "The face cradle is built into the table and is not adjustable. I've added extra padding for comfort. During winter months or chilly days, the table is heated.",
  },
  {
    icon: Droplets,
    title: "Water",
    text: "Everyone gets a bottle of water. If you need more, ask.",
  },
  {
    icon: Clock,
    title: "Same Day",
    text: "Same day appointments are usually available. Give yourself a two (2) hour lead time.",
  },
];

const InformedChoices = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Informed Choices" subtitle="Everything you need to know before your massage" />

      <section className="py-16">
        <div className="container max-w-4xl space-y-6">
          {sections.map((s) => (
            <div key={s.title} className="bg-card rounded-lg p-6 shadow-soft border border-border/40">
              <div className="flex items-center gap-3 mb-4">
                <s.icon className="w-6 h-6 text-primary" />
                <h2 className="font-display text-xl text-foreground">{s.title}</h2>
              </div>
              {"items" in s && s.items ? (
                <ul className="space-y-2">
                  {s.items.map((item, i) => (
                    <li key={i} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {"text" in s ? s.text : ""}
                </p>
              )}
            </div>
          ))}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InformedChoices;
