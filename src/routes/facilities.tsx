import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
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
      <PageHero
        labelKey="fac.hero.label"
        h1aKey="fac.hero.h1a"
        h1bKey="fac.hero.h1b"
        leadKey="fac.hero.lead"
      />

      <section className="section off">
        <div className="wrap">
          <h2 className="corp-section-title">{t("fac.show.h2a")} <b>{t("fac.show.h2b")}</b></h2>
          <div className="fac-grid">
            {facImgs.map((src, i) => (
              <div key={i} className="fac-img"><img src={src} alt="Facility" loading="lazy" /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="corp-section-title">{t("fac.eq.h2a")} <b>{t("fac.eq.h2b")}</b></h2>
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
