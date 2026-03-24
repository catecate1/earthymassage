import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { MapPin } from "lucide-react";

const Directions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Directions" subtitle="Find us easily — I look forward to welcoming you" />

      <section className="py-16">
        <div className="container max-w-4xl">
          {/* Map placeholder */}
          <div className="bg-muted rounded-lg h-64 flex items-center justify-center border border-border/40">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-body text-sm text-muted-foreground">Interactive map coming soon</p>
              <a
                href="https://www.google.com/maps/place/362+Front+St,+Chicopee,+MA+01013/@42.1479531,-72.6055898,17z/data=!3m1!4b1!4m6!3m5!1s0x89e6ddf789408d77:0xf7ce963fe3a81200!8m2!3d42.1479492!4d-72.6030149!16s%2Fg%2F11cpfdyw90?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
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
