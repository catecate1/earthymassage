import { Link } from "react-router-dom";
import { Flower2 } from "lucide-react";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Specials", to: "/specials" },
  { label: "What's New", to: "/whats-new" },
  { label: "Availability", to: "/availability" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Informed Choices", to: "/informed-choices" },
  { label: "Payment", to: "/payment" },
  { label: "Policies", to: "/policies" },
  { label: "Directions", to: "/directions" },
  { label: "Book Online", to: "/book" },
];

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground">
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Flower2 className="w-4 h-4 text-primary" />
            <span className="font-display text-lg text-cream">Earthy Massage </span>
          </Link>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="font-body text-sm text-cream/50 hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p className="font-body text-xs text-cream/30">
            © {new Date().getFullYear()} Earthy Massage And Wellness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
