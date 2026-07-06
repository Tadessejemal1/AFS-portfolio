import { Link } from "@tanstack/react-router";
import { img } from "@/lib/afs-images";
import { useSite } from "@/lib/site-context";

export function CorporateHero() {
  const { t } = useSite();
  const bullets = [t("home.geo.b1"), t("home.geo.b2"), t("home.geo.b3")];

  return (
    <section className="corp-hero">
      <div className="wrap corp-hero-grid">
        <div className="corp-hero-copy">
          <h1>{t("home.geo.h1")}</h1>
          <ul className="corp-hero-bullets">
            {bullets.map((item) => {
              const comma = item.indexOf(",");
              const bold = comma >= 0 ? item.slice(0, comma) : item;
              const rest = comma >= 0 ? item.slice(comma) : "";
              return (
                <li key={item}>
                  <strong>{bold}</strong>
                  {rest}
                </li>
              );
            })}
          </ul>
          <div className="corp-hero-btns">
            <Link to="/contact" className="btn corp-btn-primary">{t("home.geo.ctaPrimary")}</Link>
            <Link to="/services" className="btn corp-btn-secondary">{t("home.geo.ctaSecondary")}</Link>
          </div>
        </div>
        <div className="corp-hero-visual">
          <img src={img.hero} alt="AFS fleet workshop" />
        </div>
      </div>
    </section>
  );
}
