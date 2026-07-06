import { Link } from "@tanstack/react-router";
import { useSite } from "@/lib/site-context";

const SECTOR_IDS = ["1", "2", "3", "4", "5", "6"] as const;

export function IndustryShowcase() {
  const { t } = useSite();

  return (
    <section className="corp-section corp-industries off" id="industries">
      <div className="wrap">
        <h2 className="corp-h2">{t("home.geo.industries.h2")}</h2>
        <div className="corp-industry-grid">
          {SECTOR_IDS.map((id) => (
            <Link key={id} to="/industries" className="corp-industry-card">
              <span className="corp-industry-tag">{t(`ind.s${id}.tag`)}</span>
              <h3>
                {t(`ind.s${id}.t1`)} {t(`ind.s${id}.t2`)}
              </h3>
              <span className="corp-text-link">{t("common.learnMore")}</span>
            </Link>
          ))}
        </div>
        <div className="corp-section-cta">
          <Link to="/industries" className="corp-text-link corp-text-link--bold">
            {t("home.geo.industries.seeAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
