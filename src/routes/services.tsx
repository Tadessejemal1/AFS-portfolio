import { createFileRoute, Link } from "@tanstack/react-router";
import { img } from "@/lib/afs-images";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AFS International" },
      { name: "description", content: "Fleet management, preventive maintenance, engine overhaul, diagnostics, body & paint, and EV service." },
      { property: "og:title", content: "Services — AFS International" },
      { property: "og:description", content: "Every service your fleet needs — from preventive maintenance to EV." },
    ],
  }),
  component: ServicesPage,
});

const ROWS = [
  { k: "r1", image: img.workshop, rev: false },
  { k: "r2", image: img.diagnostics, rev: true },
  { k: "r3", image: img.hero, rev: false },
  { k: "r4", image: img.diagnostics, rev: true },
  { k: "r5", image: img.workshop, rev: false },
  { k: "r6", image: img.ev, rev: true },
] as const;

function ServicesPage() {
  const { t } = useSite();
  return (
    <>
      <section className="page-hero">
        <div className="wrap hero-content">
          <div className="label">{t("services.hero.label")}</div>
          <h1>{t("services.hero.h1a")} <b>{t("services.hero.h1b")}</b></h1>
        </div>
      </section>

      {ROWS.map((r, i) => {
        const label = t(`services.${r.k}.label`);
        const t1 = t(`services.${r.k}.t1`);
        const t2 = t(`services.${r.k}.t2`);
        const body = t(`services.${r.k}.body`);
        const cap = t(`services.${r.k}.cap`);
        const copy = (
          <div className="media-copy">
            <span className="label blue">{label}</span>
            <h3>{t1} <b>{t2}</b></h3>
            <p>{body}</p>
            <Link to="/contact" className="link-arrow">{t("common.requestService")}</Link>
          </div>
        );
        const media = (
          <div className="media-img"><img src={r.image} alt={cap} loading="lazy" /><span>{cap}</span></div>
        );
        return (
          <div key={i} className={`media-teaser${r.rev ? " rev" : ""}`}>
            {r.rev ? (<>{copy}{media}</>) : (<>{media}{copy}</>)}
          </div>
        );
      })}
    </>
  );
}
