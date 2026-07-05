import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSite } from "@/lib/site-context";
import afsLogo from "@/assets/afs-logo.png";

const NAV = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/services", key: "nav.services" },
  { to: "/industries", key: "nav.industries" },
  { to: "/facilities", key: "nav.facilities" },
  { to: "/sustainability", key: "nav.sustainability" },
  { to: "/clients", key: "nav.clients" },
  { to: "/contact", key: "nav.contact" },
] as const;

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={16} height={16}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={16} height={16}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" strokeLinejoin="round" />
    </svg>
  );
}

function SiteControls({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { lang, setLang, theme, toggleTheme, t } = useSite();
  return (
    <div className={`site-controls ${variant}`}>
      <select
        aria-label={t("nav.language")}
        className="lang-select"
        value={lang}
        onChange={(e) => setLang(e.target.value as "en" | "am")}
      >
        <option value="en">EN</option>
        <option value="am">አማ</option>
      </select>
      <button
        type="button"
        className="theme-toggle"
        aria-label={t("nav.theme")}
        onClick={toggleTheme}
        title={theme === "light" ? "Dark mode" : "Light mode"}
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useSite();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="wrap hdr-inner">
          <Link to="/" className="logo">
            <img src={afsLogo} alt="AFS International" className="logo-img" />
            <div className="wordmark">
              <b>AFS INTERNATIONAL</b>
              <span>Automotive Fleet Services</span>
            </div>
          </Link>
          <nav className="navlinks">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className={isActive(n.to) ? "active" : ""}>
                {t(n.key)}
              </Link>
            ))}
          </nav>
          <div className="hdr-right">
            <SiteControls />
            <Link to="/contact" className="nav-cta">
              {t("nav.cta")}
            </Link>
          </div>
          <button
            className="hamburger"
            aria-label={t("nav.toggleMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className="m-overlay" onClick={() => setOpen(false)}></div>
      <aside className="mobile-menu" aria-label={t("nav.mobileNav")}>
        <nav className="m-nav">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`m-link${isActive(n.to) ? " active" : ""}`}
            >
              {t(n.key)}
            </Link>
          ))}
        </nav>
        <SiteControls variant="mobile" />
        <Link to="/contact" className="m-cta">
          {t("nav.cta")}
        </Link>
      </aside>
    </>
  );
}
