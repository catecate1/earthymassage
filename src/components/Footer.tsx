import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-spring-green" />
            <span className="font-display text-lg text-cream">Healing Touch</span>
          </div>
          <div className="flex gap-6">
            {["Services", "About", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="font-body text-sm text-cream/50 hover:text-blush transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
          <p className="font-body text-xs text-cream/30">
            © {new Date().getFullYear()} Healing Touch Massage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
