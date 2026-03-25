import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const Book = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Book Online" subtitle="" />

      <section className="py-16">
        <div className="container max-w-4xl mx-auto">
          <iframe
            src="https://bookeo.com/earthymassage"
            title="Book an appointment"
            className="w-full border-0 rounded-lg"
            style={{ minHeight: "800px" }}
            allow="payment"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Book;