import { useEffect } from "react";
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
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.src = "//s3.tracemyip.org/vLg/lgUrl.php?pidnVar2=72252&prtVar2=3&stlVar2=1218&rgtype=4684NR-IPIB&scvVar2=12";
    const container = document.getElementById("elemID031021");
    if (container) {
      container.prepend(script);
    }
    return () => {
      script.remove();
    };
  }, []);

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
            © {new Date().getFullYear()} Earthy Massage. All rights reserved.
          </p>
          {/* TraceMyIP.org Tracking Code */}
          <div id="elemID031021" style={{ lineHeight: "16px", textAlign: "center", zIndex: 100000 }}>
            <noscript>
              <a href="https://www.tracemyip.org/tools/link-click-tracker-ad-clicks-counter-ip-blocker/">
                <img
                  src="//s3.tracemyip.org/vLg/1218/4684NR-IPIB/72252/3/12/ans/"
                  alt="Download view tracers"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: "0px" }}
                />
              </a>
            </noscript>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
