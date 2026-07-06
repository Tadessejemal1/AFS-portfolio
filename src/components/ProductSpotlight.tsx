import { Link } from "@tanstack/react-router";
import { img } from "@/lib/afs-images";
import { useSite } from "@/lib/site-context";

export function ProductSpotlight() {
  const { t } = useSite();

  return (
    <section className="corp-product">
      <div className="wrap corp-product-grid">
        <div className="corp-product-copy">
          <span className="corp-eyebrow">{t("home.geo.product.label")}</span>
          <h2 className="corp-h2">{t("home.geo.product.h2")}</h2>
          <p className="corp-lead">{t("home.geo.product.p")}</p>
          <Link to="/services" className="corp-text-link corp-text-link--bold">
            {t("home.geo.product.link")}
          </Link>
        </div>
        <div className="corp-product-visual">
          <img src={img.ev} alt="EV maintenance center" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

export function ExcellenceBand() {
  const { t } = useSite();

  return (
    <section className="corp-excellence">
      <div className="wrap corp-excellence-inner">
        <div>
          <span className="corp-eyebrow corp-eyebrow--light">{t("home.geo.excellence.label")}</span>
          <h2 className="corp-h2 corp-h2--light">{t("home.geo.excellence.h2")}</h2>
          <div className="corp-excellence-links">
            <Link to="/about" className="corp-text-link corp-text-link--light">{t("home.geo.excellence.link")}</Link>
            <Link to="/clients" className="corp-text-link corp-text-link--light">{t("home.geo.excellence.stories")}</Link>
          </div>
        </div>
        <div className="corp-excellence-stats">
          <div><b>25+</b><span>{t("home.kpi.years")}</span></div>
          <div><b>3,000+ m²</b><span>{t("home.kpi.facility")}</span></div>
          <div><b>1,000+</b><span>{t("home.kpi.vehicles")}</span></div>
          <div><b>24/7</b><span>{t("home.kpi.support")}</span></div>
        </div>
      </div>
    </section>
  );
}
