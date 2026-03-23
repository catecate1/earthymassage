import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const Book = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader
        title="Book Online"
        subtitle="Request your appointment and I'll confirm within 24 hours."
      />

      <section className="py-16">
        <div className="container max-w-2xl mx-auto text-center">
          <p className="font-body text-muted-foreground">
            Booking is handled through my scheduling system. Please use the link below to book your appointment.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Book;