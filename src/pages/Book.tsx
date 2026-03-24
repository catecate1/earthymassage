import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const Book = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://bookeo.com/widget.js?a=2119X9M9P17F61D856AF&startmode=customer";
    script.type = "text/javascript";
    script.async = true;
    const container = document.getElementById("bookeo-widget");
    if (container) {
      container.appendChild(script);
    }
    return () => {
      if (container && script.parentNode === container) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader
        title="Book Online"
        subtitle="Request your appointment and I'll confirm within 24 hours."
      />

      <section className="py-16">
        <div className="container max-w-2xl mx-auto">
          <div id="bookeo-widget" className="min-h-[500px]" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Book;