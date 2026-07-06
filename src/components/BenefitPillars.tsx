import { Link } from "@tanstack/react-router";
import { useSite } from "@/lib/site-context";

const PILLAR_IDS = ["1", "2", "3", "4", "5"] as const;

const PILLAR_ICONS = [
  "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 7H20M4 12h16",
  "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
];

export function BenefitPillars() {
  const { t } = useSite();

  return (
    <section className="corp-section corp-pillars" id="why-afs">
      <div className="wrap">
        <span className="corp-eyebrow">{t("home.geo.pillars.label")}</span>
        <h2 className="corp-h2">{t("home.geo.pillars.h2")}</h2>
        <p className="corp-lead">{t("home.geo.pillars.sub")}</p>
        <div className="corp-pillar-grid">
          {PILLAR_IDS.map((id, i) => (
            <article className="corp-pillar-card" key={id}>
              <div className="corp-pillar-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d={PILLAR_ICONS[i]} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>{t(`home.geo.pillar.${id}.t`)}</h3>
              <p>{t(`home.geo.pillar.${id}.d`)}</p>
              <Link to="/services" className="corp-text-link">{t(`home.geo.pillar.${id}.link`)}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
