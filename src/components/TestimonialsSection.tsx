import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Emily R.",
    text: "Sarah's deep tissue massage changed my life. After years of back pain, I finally feel like myself again. Her space is so calming — I look forward to every visit.",
    rating: 5,
  },
  {
    name: "Michael T.",
    text: "The hot stone therapy is absolutely incredible. Sarah has an intuitive understanding of where tension lives in the body. Cannot recommend enough!",
    rating: 5,
  },
  {
    name: "Jessica L.",
    text: "I started seeing Sarah during my pregnancy and it made such a difference. She's gentle, knowledgeable, and genuinely cares about her clients' well-being.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">Kind Words</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-lg p-8 shadow-soft border border-border/50"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-warm-gold text-warm-gold" />
                ))}
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <p className="font-display text-foreground text-sm">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
