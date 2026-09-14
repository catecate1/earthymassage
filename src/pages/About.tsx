import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import yogaButterflies from "@/assets/yoga-pose-butterflies.png";
import studioRoom from "@/assets/studio-room.jpg.asset.json";
import studioCorner from "@/assets/studio-corner.jpg.asset.json";
import studioEntrance from "@/assets/studio-entrance.jpg.asset.json";
import studioHall from "@/assets/studio-hall.jpg.asset.json";
import studioLinens from "@/assets/studio-linens.jpg.asset.json";
import studioExit from "@/assets/studio-exit.jpg.asset.json";

const studioPhotos = [
{ src: studioEntrance.url, alt: "Hallway leading to the studio door with a welcome sign" },
{ src: studioRoom.url, alt: "Treatment table with fresh linens and body-work tools" },
{ src: studioCorner.url, alt: "Quiet corner with a chair, mirror and side table" },
{ src: studioHall.url, alt: "Hallway with coffee station and warm lighting" },
{ src: studioLinens.url, alt: "Cabinet with neatly folded fresh towels" },
{ src: studioExit.url, alt: "Exit door with water cooler and plant" }];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader title="About" subtitle="Dedicated to your wellness journey through the healing power of touch." />

      <section className="py-16 pb-20 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center md:text-left">
                <img
                  src={yogaButterflies}
                  alt="Meditating figure surrounded by butterflies, symbolizing peace and transformation"
                  className="rounded-lg shadow-card w-full object-cover"
                  loading="lazy" />
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
                    Welcome to Earthy Wellness.  I specialize exclusively in acupressure meridian body-work — the gentle,
                    flowing technique that promotes deep relaxation and overall wellness.
                  </p>
                  <p>
                    I have always had a keen interest in health and wellness and taken various related courses over the
                    years including massage school.  The human body is an amazing instrument.  Take care of it and it will
                    take care of you.
                  </p>
                <p>
                  My studio is a calm, inviting space where you can truly let go and allow your body to heal.  I use only
                  premium organic oils and maintain the highest standards of cleanliness and comfort.
                </p>
                <p>
                  I'm a folksy person and welcome the opportunity to meet you and give you a great restful place in time.
                </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16">
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8 text-center">
                A Look Around the Studio
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {studioPhotos.map((photo) =>
                <div key={photo.src} className="overflow-hidden rounded-lg shadow-card bg-card">
                    <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-64 object-cover"
                    loading="lazy" />
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default About;