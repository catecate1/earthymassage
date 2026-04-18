import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { MapPin, TrafficCone } from "lucide-react";

const Directions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Directions" subtitle="Find us easily — I look forward to welcoming you" />

      <section className="py-16">
        <div className="container max-w-4xl">
          {/* Parking note */}
          <div className="mb-8 flex items-start gap-3 bg-petal/50 border border-primary/20 rounded-lg p-5">
            <TrafficCone className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <p className="font-body text-sm text-foreground">
              Please park in the space marked with the <span className="font-semibold text-primary">orange parking cone</span> and use the <span className="font-semibold">rear entrance</span>.
            </p>
          </div>

          {/* Map placeholder */}
          <div className="bg-muted rounded-lg h-64 flex items-center justify-center border border-border/40">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-body text-sm text-muted-foreground">Interactive map</p>
              <a
                href="https://www.google.com/maps/dir//Earthy+Massage,+362+Front+St+Rear+entrance,+Chicopee,+MA+01013/@41.7234944,-71.450624,9z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89e6c9c46860cde7:0xd49d02115a666f27!2m2!1d-72.6030149!2d42.1479492?hl=en&authuser=0&entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
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
