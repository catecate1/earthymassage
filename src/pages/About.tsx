import { motion } from "framer-motion";
import { Award, Clock, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import massageRoom from "@/assets/massage-room.jpg";

const credentials = [
{
  icon: Award,
  title: "Licensed ",
  description: "Licensed massage therapist with training in Swedish techniques."
},
{
  icon: Clock,
  title: "10+ Years Experience",
  description: "Over a decade of dedicated practice in therapeutic massage."
},
{
  icon: Heart,
  title: "Client-Centered Care",
  description: "Every session is tailored to your unique needs and comfort level."
}];


const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader
        title="About Me"
        subtitle="Dedicated to your wellness journey through the healing power of touch." />
      

      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              
              <img
                src={massageRoom}
                alt="Massage therapy space"
                className="rounded-lg shadow-card w-full object-cover" />
              
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}>
              
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                Hello, I'm <em className="italic text-primary">Deb</em>
              </h2>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  Welcome to Healing Touch. I'm a licensed massage therapist specializing
                  exclusively in Swedish massage — the gentle, flowing technique that promotes
                  deep relaxation and overall wellness.
                </p>
                <p>
                  I have always had a keen interest in health and wellness and taken various
                  related courses over the years including massage school. The human body is
                  an amazing instrument. Take care of it and it will take care of you.
                </p>
                <p>
                  My studio is a calm, inviting space where you can truly let go and allow
                  your body to heal. I use only premium organic massage oils and maintain the
                  highest standards of cleanliness and comfort.
                </p>
                <p>
                  I'm a folksy person and welcome the opportunity to meet you and give you a
                  great restful, go to sleep massage.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
            
            {credentials.map((c) =>
            <div key={c.title} className="bg-card rounded-lg p-8 shadow-soft border border-border/30 text-center">
                <div className="w-12 h-12 rounded-full bg-petal flex items-center justify-center mx-auto mb-4">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{c.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{c.description}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default About;