import { createFileRoute } from "@tanstack/react-router";
import { img } from "@/lib/afs-images";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities — AFS International" },
      { name: "description", content: "3,000+ m² of engineered service capacity in Gotera, Addis Ababa." },
      { property: "og:title", content: "Facilities — AFS International" },
      { property: "og:description", content: "Workshop facility and key equipment inventory." },
    ],
  }),
  component: FacilitiesPage,
});

const facImgs = [img.workshop, img.diagnostics, img.hero, img.workshop, img.diagnostics, img.hero];
const EQ = ["01", "02", "03", "04", "05"] as const;

function FacilitiesPage() {
  const { t } = useSite();
  return (
    <>
      <section className="page-hero">
        <div className="wrap hero-content">
          <div className="label">{t("fac.hero.label")}</div>
          <h1>{t("fac.hero.h1a")} <b>{t("fac.hero.h1b")}</b></h1>
          <p className="lead">{t("fac.hero.lead")}</p>
        </div>
      </section>

      <section className="section off">
        <div className="wrap">
          <h2 style={{ fontSize: "clamp(28px,3vw,42px)", marginBottom: 40 }}>{t("fac.show.h2a")} <b>{t("fac.show.h2b")}</b></h2>
          <div className="fac-grid">
            {facImgs.map((src, i) => (
              <div key={i} className="fac-img"><img src={src} alt="Facility" loading="lazy" /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 style={{ fontSize: "clamp(28px,3vw,42px)", marginBottom: 40 }}>{t("fac.eq.h2a")} <b>{t("fac.eq.h2b")}</b></h2>
          <div className="row-list">
            {EQ.map((n) => (
              <div key={n} className="row-item">
                <div className="rn">{n}</div>
                <h4>{t(`fac.eq.${n}.t`)}</h4>
                <p>{t(`fac.eq.${n}.d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
