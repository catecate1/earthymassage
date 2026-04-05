import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Flower2, ChevronDown } from "lucide-react";

const mainLinks = [
{ label: "Home", to: "/" },
{ label: "About", to: "/about" },
{ label: "Services", to: "/services" },
{ label: "What Is", to: "/what-is" },
{ label: "Specials", to: "/specials" }];


const moreLinks = [
{ label: "What's New", to: "/whats-new" },
{ label: "Anatomy", to: "/anatomy" },
{ label: "Availability", to: "/availability" },
{ label: "Testimonials", to: "/testimonials" },
{ label: "Informed Choices", to: "/informed-choices" },
{ label: "Payment", to: "/payment" },
{ label: "Policies", to: "/policies" },
{ label: "Directions", to: "/directions" }];


const allLinks = [...mainLinks, ...moreLinks, { label: "Book Online", to: "/book" }];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();

  const linkClass = (to: string) =>
  `font-body text-sm tracking-wide transition-colors ${
  location.pathname === to ?
  "text-primary font-semibold" :
  "text-muted-foreground hover:text-primary"}`;


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border/30">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <Flower2 className="w-5 h-5 text-primary" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-xl text-foreground tracking-wide">Earthy Massage</span>
            <em className="font-display text-foreground italic tracking-wide font-normal text-sm">Home Of The Go-To-Sleep Massage</em>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-5">
          {mainLinks.map((l) =>
          <Link key={l.label} to={l.to} className={linkClass(l.to)}>
              {l.label}
            </Link>
          )}

          {/* More dropdown */}
          <div
            className="relative"
            onMouseEnter={() => { clearTimeout((window as any).__moreTimer); setMoreOpen(true); }}
            onMouseLeave={() => { (window as any).__moreTimer = setTimeout(() => setMoreOpen(false), 300); }}
          >
            <button
              onClick={() => setMoreOpen((v) => !v)}
              className="font-body text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              More <ChevronDown className="w-3 h-3" />
            </button>
            {moreOpen &&
            <div className="absolute top-full right-0 pt-2">
              <div className="bg-card rounded-lg shadow-card border border-border/40 py-2 min-w-[180px]">
                {moreLinks.map((l) =>
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setMoreOpen(false)}
                className={`block px-4 py-2 font-body text-sm ${
                location.pathname === l.to ?
                "text-primary font-semibold" :
                "text-muted-foreground hover:text-primary hover:bg-petal"}`
                }>
                    {l.label}
                  </Link>
              )}
              </div>
            </div>
            }
          </div>

          <Link to="/book" className={linkClass("/book")}>
            Book Online
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open &&
      <div className="lg:hidden bg-cream backdrop-blur-md border-t border-border/30 py-4 max-h-[70vh] overflow-y-auto">
          {allLinks.map((l) =>
        <Link
          key={l.label}
          to={l.to}
          onClick={() => setOpen(false)}
          className={`block px-6 py-3 font-body text-sm ${
          location.pathname === l.to ?
          "text-primary font-semibold" :
          "text-muted-foreground hover:text-primary"}`
          }>
          
              {l.label}
            </Link>
        )}
        </div>
      }
    </nav>);

};

export default Navbar;