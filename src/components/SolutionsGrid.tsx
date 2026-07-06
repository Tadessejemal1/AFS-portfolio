import { Link } from "@tanstack/react-router";
import { useSite } from "@/lib/site-context";

const SVC_NUMS = ["01", "02", "03", "04", "05", "06"] as const;

export function SolutionsGrid() {
  const { t } = useSite();

  return (
    <section className="corp-section corp-solutions" id="solutions">
      <div className="wrap">
        <h2 className="corp-h2">{t("home.geo.solutions.h2")}</h2>
        <div className="corp-solution-grid">
          {SVC_NUMS.map((n) => (
            <Link key={n} to="/services" className="corp-solution-card">
              <span className="corp-solution-num">{n}</span>
              <h3>{t(`home.svc.${n}.t`)}</h3>
              <p>{t(`home.svc.${n}.d`)}</p>
            </Link>
          ))}
        </div>
        <div className="corp-section-cta">
          <Link to="/services" className="corp-text-link corp-text-link--bold">
            {t("home.geo.solutions.seeAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
