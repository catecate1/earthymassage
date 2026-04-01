import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnatomyViewer from "@/components/AnatomyViewer";

const Anatomy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Anatomy"
        subtitle="Explore the skeletal and muscular systems targeted during massage therapy."
      />

      <section className="py-12 bg-background">
        <div className="container max-w-4xl mx-auto">
          <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            Toggle the layers below to explore the skeleton and major muscle groups.
            Hover over labels to learn how each structure relates to massage therapy.
          </p>

          <Suspense fallback={
            <div className="w-full aspect-[3/4] max-w-lg mx-auto flex items-center justify-center bg-card rounded-xl border border-border/30">
              <p className="font-body text-muted-foreground">Loading 3D viewer…</p>
            </div>
          }>
            <AnatomyViewer />
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Anatomy;
