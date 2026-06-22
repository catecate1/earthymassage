import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import massageRoom from "@/assets/massage-room.jpg";
import studioTable from "@/assets/studio-table.jpg.asset.json";
import studioCorner from "@/assets/studio-corner.jpg.asset.json";
import studioEntry from "@/assets/studio-entry.jpg.asset.json";

const studioPhotos = [
  { src: studioTable.url, alt: "Massage table with assortment of massage tools" },
  { src: studioCorner.url, alt: "Quiet corner of the studio with chair and mirror" },
  { src: studioEntry.url, alt: "Studio entryway with water cooler and plant" },
];

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
                  Welcome to Earthy Massage. I'm a licensed massage therapist specializing exclusively in Swedish massage — the gentle, flowing technique that promotes deep relaxation and overall wellness.
                
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

      <section className="py-16 bg-secondary/30">
        <div className="container max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-4xl text-foreground text-center mb-10">
            A peek inside the studio
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {studioPhotos.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-lg shadow-card aspect-[3/4]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  loading="lazy" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-display text-white/40 text-2xl md:text-3xl tracking-widest -rotate-[20deg] select-none"
                    style={{ textShadow: "0 1px 3px rgba(0,0,0,0.35)" }}>
                    Earthy Massage
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>);

};

export default About;