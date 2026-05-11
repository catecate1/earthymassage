import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";

const WIDGET_SRC = "https://bookeo.com/widget.js?a=2119X9M9P17F61D856AF";

const Book = () => {
  useEffect(() => {
    const w = window as any;

    const start = () => {
      try {
        // Reset any prior init so the widget can re-render on SPA navigation
        w.axiomct_project = null;
        w.axiomct_iframe = null;
        w.axiomct_socket = null;
        w.axiomct_div = null;
        w.axiomct_spinner = null;
        if (typeof w.bookeo_start === "function") w.bookeo_start();
      } catch (e) {
        // no-op
      }
    };

    // If script was already loaded once, just (re)start the widget
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) {
      start();
      return () => {
        const pos = document.getElementById("bookeo_position");
        if (pos) pos.innerHTML = "";
      };
    }

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.onload = start;
    document.body.appendChild(script);

    return () => {
      const pos = document.getElementById("bookeo_position");
      if (pos) pos.innerHTML = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Book Online" subtitle="" />

      <section className="py-12">
        <div className="container max-w-4xl mx-auto">
          {/* Bookeo widget mounts itself into this div */}
          <div id="bookeo_position" className="min-h-[600px]" />

          <div className="border-t border-primary/10 pt-8 mt-12 space-y-3 text-center">
            <p className="text-foreground/60 text-sm">Prefer to reach me directly?</p>
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
