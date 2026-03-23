import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Sparkles, Calendar } from "lucide-react";

const updates = [
  {
    date: "March 2026",
    title: "New Hours",
    body: "8am - 6pm Monday - Saturday",
  },
  {
    date: "February 2026",
    title: "Extended Evening Hours",
    body: "We now offer appointments until 8:00 PM on Tuesdays and Thursdays, making it easier to fit self-care into your busy schedule.",
  },
  {
    date: "January 2026",
    title: "New Hot Stone Add-On",
    body: "Enhance any massage with our new hot basalt stone therapy. Warm stones melt away tension and promote deeper relaxation.",
  },
  {
    date: "December 2025",
    title: "Gift Certificates Available Online",
    body: "Give the gift of relaxation! Digital gift certificates are now available for purchase and can be emailed directly to your loved ones.",
  },
];

const WhatsNew = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="What's New" subtitle="The latest updates, offerings, and announcements" />

      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="space-y-8">
            {updates.map((u, i) => (
              <div key={i} className="bg-card rounded-lg p-6 shadow-soft border border-border/40">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-body text-xs text-primary font-semibold uppercase tracking-wider">{u.date}</span>
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">{u.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 bg-petal rounded-lg p-8">
            <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
            <p className="font-display text-lg text-foreground mb-2">Stay in the Loop</p>
            <p className="font-body text-sm text-muted-foreground">Check back often for new services, seasonal specials, and wellness tips.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhatsNew;
