import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const Book = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://bookeo.com/widget.js?a=2119X9M9P17F61D856AF";
    script.type = "text/javascript";
    script.async = true;
    document.getElementById("bookeo-container")?.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Book Online" subtitle="" />

      <section className="py-8">
        <div className="container max-w-4xl mx-auto">
          <div className="bg-accent/50 border border-primary/20 rounded-xl p-8 text-center mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-3">Online Booking Temporarily Unavailable</h2>
            <p className="text-foreground/80 mb-6">
              We're experiencing a technical issue with our online booking system today. We apologize for the inconvenience!
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground mb-1">New Clients</p>
                <p className="text-foreground/70">Please call us to schedule your appointment:</p>
                <a href="tel:+14133278496" className="inline-block mt-2 text-lg font-semibold text-primary hover:underline">
                  📞 Call to Book
                </a>
              </div>
              <div className="border-t border-primary/10 pt-4">
                <p className="font-medium text-foreground mb-1">Existing Clients</p>
                <p className="text-foreground/70">You may call or text us to book:</p>
                <a href="tel:+14133278496" className="inline-block mt-2 text-lg font-semibold text-primary hover:underline mr-4">
                  📞 Call
                </a>
                <a href="sms:+14133278496" className="inline-block mt-2 text-lg font-semibold text-primary hover:underline">
                  💬 Text
                </a>
              </div>
            </div>
          </div>
          <div id="bookeo-container" className="min-h-[400px]" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Book;