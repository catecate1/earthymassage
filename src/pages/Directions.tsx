import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { MapPin, Car, Bus, Phone, Navigation } from "lucide-react";

const Directions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Directions" subtitle="Find us easily — we look forward to welcoming you" />

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-card rounded-lg p-6 shadow-soft border border-border/40">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl text-foreground">Our Location</h2>
              </div>
              <address className="font-body text-sm text-muted-foreground not-italic leading-relaxed mb-4">
                Healing Touch Massage<br />
                123 Blossom Lane, Suite 4<br />
                Springfield, ST 12345
              </address>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                <Phone className="w-4 h-4 text-primary" />
                <span>(555) 123-4567</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-petal rounded-lg p-5 flex gap-3">
                <Car className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-sm text-foreground mb-1">By Car</h3>
                  <p className="font-body text-xs text-muted-foreground">Free parking available in our private lot behind the building. Additional street parking on Blossom Lane.</p>
                </div>
              </div>
              <div className="bg-petal rounded-lg p-5 flex gap-3">
                <Bus className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-sm text-foreground mb-1">Public Transit</h3>
                  <p className="font-body text-xs text-muted-foreground">Bus routes 12 and 34 stop one block from our studio at the Blossom & Main intersection.</p>
                </div>
              </div>
              <div className="bg-petal rounded-lg p-5 flex gap-3">
                <Navigation className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-sm text-foreground mb-1">GPS</h3>
                  <p className="font-body text-xs text-muted-foreground">Search "Healing Touch Massage" in Google Maps or Apple Maps for turn-by-turn directions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-muted rounded-lg h-64 flex items-center justify-center border border-border/40">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-body text-sm text-muted-foreground">Interactive map coming soon</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-primary hover:underline mt-1 inline-block"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Directions;
