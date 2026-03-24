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
    document.getElementById("bookeo-widget")?.appendChild(script);

    return () => {
      script.remove();
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
        <div className="container max-w-4xl mx-auto">
          <div id="bookeo-widget" className="min-h-[600px]" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Book;