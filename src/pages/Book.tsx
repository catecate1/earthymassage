import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const Book = () => {
  useEffect(() => {
    const container = document.getElementById("bookeo-widget");
    if (!container) return;

    // Clear any previous widget content
    container.innerHTML = "";

    // Remove any existing Bookeo scripts to force re-initialization
    document.querySelectorAll('script[src*="bookeo.com"]').forEach((s) => s.remove());

    // Clear any Bookeo global state so it re-initializes
    if ((window as any).bookeo) {
      delete (window as any).bookeo;
    }

    const script = document.createElement("script");
    script.src = "https://bookeo.com/widget.js?a=2119X9M9P17F61D856AF";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      if (container) container.innerHTML = "";
      document.querySelectorAll('script[src*="bookeo.com"]').forEach((s) => s.remove());
      if ((window as any).bookeo) {
        delete (window as any).bookeo;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader
        title="Book Online"
        subtitle=""
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