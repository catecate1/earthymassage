import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/10 backdrop-blur-md border-b border-border/10">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="font-display text-xl text-cream tracking-wide">
          Healing Touch
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-body text-sm text-cream/80 hover:text-cream transition-colors tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="font-body text-sm bg-primary text-primary-foreground px-5 py-2 rounded-md hover:bg-primary/90 transition-colors tracking-wide"
          >
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-cream">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-foreground/90 backdrop-blur-md border-t border-border/10 py-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 font-body text-sm text-cream/80 hover:text-cream"
            >
              {l.label}
            </a>
          ))}
          <div className="px-6 pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block text-center font-body text-sm bg-primary text-primary-foreground px-5 py-2 rounded-md"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
