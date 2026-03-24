import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import massageRoom from "@/assets/massage-room.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader title="About" subtitle="Dedicated to your wellness journey through the healing power of touch." />

      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={massageRoom}
                alt="Massage therapy space"
                className="rounded-lg shadow-card w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                Hello, I'm <em className="italic text-primary">Deb</em>
              </h2>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  Welcome to Earthy Massge. I'm a licensed massage therapist specializing exclusively in Swedish massage
                  — the gentle, flowing technique that promotes deep relaxation and overall wellness.
                </p>
                <p>
                  I have always had a keen interest in health and wellness and taken various related courses over the
                  years including massage school. The human body is an amazing instrument. Take care of it and it will
                  take care of you.
                </p>
                <p>
                  My studio is a calm, inviting space where you can truly let go and allow your body to heal. I use only
                  premium organic massage oils and maintain the highest standards of cleanliness and comfort.
                </p>
                <p>
                  I'm a folksy person and welcome the opportunity to meet you and give you a great restful, go to sleep
                  massage.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
