import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { MapPin } from "lucide-react";

const Directions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Directions" subtitle="Find us easily — we look forward to welcoming you" />

      <section className="py-16">
        <div className="container max-w-4xl">
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
