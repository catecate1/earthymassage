import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, MessageSquare } from "lucide-react";

const Book = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://secure.bookeo.com/bookeo.js?type=standard&id=earthymassage";
    script.async = true;
    document.getElementById("bookeo-container")?.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Book Online" subtitle="" />

      <section className="py-12">
        <div className="container max-w-4xl mx-auto space-y-8">
          <div id="bookeo-container" className="min-h-[600px]" />

          <div className="border-t border-primary/10 pt-8 space-y-3 text-center">
            <p className="text-foreground/60 text-sm">Prefer to reach me directly?</p>
            <p className="text-foreground/70 text-sm">
              New clients please call. Existing clients can call or text.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild variant="outline">
                <a href="tel:+14133278496">
                  <Phone className="mr-2 h-4 w-4" /> Call 413-327-8496
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="sms:+14133278496">
                  <MessageSquare className="mr-2 h-4 w-4" /> Text
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://bookeo.com/earthymassage/customer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Open Booking Site
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
