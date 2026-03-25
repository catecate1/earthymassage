import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, MessageSquare } from "lucide-react";

const Book = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Book Online" subtitle="" />

      <section className="py-12">
        <div className="container max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Ready to Book Your Session?</h2>
            <p className="text-foreground/70">Click below to view availability and schedule your appointment.</p>
            <Button asChild size="lg" className="text-lg px-10 py-6">
              <a href="https://bookeo.com/earthymassage.com" target="_blank" rel="noopener noreferrer">
                Book Now <ExternalLink className="ml-2" />
              </a>
            </Button>
          </div>

          <div className="border-t border-primary/10 pt-8 space-y-3">
            <p className="text-foreground/60 text-sm">Prefer to reach us directly?</p>
            <p className="text-foreground/70 text-sm">New clients please call. Existing clients can call or text.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild variant="outline">
                <a href="tel:+14133278496">
                  <Phone className="mr-2 h-4 w-4" /> Call
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="sms:+14133278496">
                  <MessageSquare className="mr-2 h-4 w-4" /> Text
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Book;
