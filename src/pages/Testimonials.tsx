import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    text: "I've been going to Healing Touch for over a year now, and every session leaves me feeling completely renewed. The attention to detail and genuine care is unmatched.",
    stars: 5,
  },
  {
    name: "James K.",
    text: "As someone who deals with chronic back pain, finding a therapist who truly understands deep tissue work has been life-changing. I can't recommend Healing Touch enough.",
    stars: 5,
  },
  {
    name: "Linda R.",
    text: "The atmosphere is so peaceful and calming. From the moment you walk in, you feel the stress melt away. My monthly massage is the highlight of my self-care routine.",
    stars: 5,
  },
  {
    name: "David & Maria P.",
    text: "We booked a couples session for our anniversary and it was absolutely wonderful. The room was beautifully set up and the therapists were incredibly skilled.",
    stars: 5,
  },
  {
    name: "Emily T.",
    text: "I was nervous about my first massage ever, but the therapist made me feel completely at ease. She explained everything and checked in throughout. I'm hooked!",
    stars: 5,
  },
  {
    name: "Robert H.",
    text: "After my knee surgery, the therapeutic massage sessions helped my recovery tremendously. Professional, knowledgeable, and always accommodating with scheduling.",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Testimonials" subtitle="What our clients are saying about their experience" />

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card rounded-lg p-6 shadow-soft border border-border/40 relative">
                <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 italic">"{t.text}"</p>
                <p className="font-display text-sm text-foreground">— {t.name}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 bg-petal rounded-lg p-8">
            <p className="font-display text-lg text-foreground mb-2">Share Your Experience</p>
            <p className="font-body text-sm text-muted-foreground">
              We'd love to hear about your visit! Leave us a review on Google or let us know in person.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
