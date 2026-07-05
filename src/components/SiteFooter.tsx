import { Link } from "@tanstack/react-router";
import { useSite } from "@/lib/site-context";
import afsLogo from "@/assets/afs-logo.png";

function Icon({ name }: { name: "facebook" | "x" | "instagram" | "youtube" | "linkedin" }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor" } as const;
  switch (name) {
    case "facebook":
      return (
        <svg {...common} aria-hidden>
          <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.5-1.5H16.5V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H7.5v3h2.6v7h3.4z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} aria-hidden>
          <path d="M18.244 3H21l-6.52 7.45L22 21h-6.11l-4.78-6.24L5.6 21H2.844l6.97-7.97L2 3h6.24l4.32 5.72L18.244 3zm-1.07 16.2h1.52L7.9 4.7H6.27l10.9 14.5z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} aria-hidden>
          <path d="M21.6 7.2c-.2-1.1-1-2-2.1-2.2C17.6 4.6 12 4.6 12 4.6s-5.6 0-7.5.4C3.4 5.2 2.6 6.1 2.4 7.2 2 9.1 2 12 2 12s0 2.9.4 4.8c.2 1.1 1 2 2.1 2.2 1.9.4 7.5.4 7.5.4s5.6 0 7.5-.4c1.1-.2 1.9-1.1 2.1-2.2.4-1.9.4-4.8.4-4.8s0-2.9-.4-4.8zM10 15.3V8.7l5.2 3.3-5.2 3.3z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} aria-hidden>
          <path d="M4.98 3.5A2.5 2.5 0 1 1 4.97 8.5a2.5 2.5 0 0 1 .01-5zM3 9.5h4V21H3V9.5zM9 9.5h3.8v1.6h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21H9V9.5z" />
        </svg>
      );
  }
}

export function SiteFooter() {
  const { t } = useSite();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand-col">
            <div className="brand">
              <img src={afsLogo} alt="AFS International" className="logo-img" />
              <span>AFS International</span>
            </div>
            <p className="foot-desc">{t("foot.desc")}</p>
            <div className="foot-social" aria-label="Social media">
              <a href="#" aria-label="Facebook"><Icon name="facebook" /></a>
              <a href="#" aria-label="X"><Icon name="x" /></a>
              <a href="#" aria-label="Instagram"><Icon name="instagram" /></a>
              <a href="#" aria-label="YouTube"><Icon name="youtube" /></a>
              <a href="#" aria-label="LinkedIn"><Icon name="linkedin" /></a>
            </div>
          </div>

          <div className="foot-links-col foot-col-company">
            <h5>{t("foot.company")}</h5>
            <ul>
              <li><Link to="/about">{t("foot.link.about")}</Link></li>
              <li><Link to="/sustainability">{t("foot.link.sustainability")}</Link></li>
              <li><Link to="/clients">{t("foot.link.clients")}</Link></li>
            </ul>
          </div>

          <div className="foot-links-col foot-col-experience">
            <h5>Experience AFS</h5>
            <ul>
              <li><Link to="/facilities">Workshops & Facilities</Link></li>
              <li><Link to="/industries">Industries Served</Link></li>
              <li><Link to="/clients">Client Stories</Link></li>
            </ul>
          </div>

          <div className="foot-links-col foot-col-services">
            <h5>{t("foot.services")}</h5>
            <ul>
              <li><Link to="/services">{t("foot.link.fleet")}</Link></li>
              <li><Link to="/services">{t("foot.link.ev")}</Link></li>
              <li><Link to="/facilities">{t("foot.link.facilities")}</Link></li>
              <li><Link to="/contact">Roadside Assistance</Link></li>
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>{t("foot.copyright")}</span>
          <span>{t("foot.est")}</span>
        </div>
      </div>
    </footer>
  );
}
