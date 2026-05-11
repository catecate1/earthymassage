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
    const pos = document.getElementById("bookeo_position");
    if (pos) pos.innerHTML = "";

    // Guard against React StrictMode double-invoke and SPA re-mounts
    if (w.__bookeoLoading) return;
    w.__bookeoLoading = true;

    // If the script tag already exists, remove it so we get a fresh init
    document.querySelectorAll(`script[src^="https://bookeo.com/widget.js"]`).forEach((s) => s.remove());

    // Reset Bookeo internal globals
    w.axiomct_project = null;
    w.axiomct_iframe = null;
    w.axiomct_socket = null;
    w.axiomct_div = null;
    w.axiomct_spinner = null;

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.onload = () => {
      w.__bookeoLoading = false;
    };
    document.body.appendChild(script);

    return () => {
      w.__bookeoLoading = false;
      const p = document.getElementById("bookeo_position");
      if (p) p.innerHTML = "";
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
