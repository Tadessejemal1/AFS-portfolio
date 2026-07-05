import { createFileRoute } from "@tanstack/react-router";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability — AFS International" },
      { name: "description", content: "HSE policy, environmental protection, waste management, EV readiness." },
      { property: "og:title", content: "Sustainability — AFS International" },
      { property: "og:description", content: "Safe operations. Sustainable growth." },
    ],
  }),
  component: SustainabilityPage,
});

const ROWS = ["01", "02", "03", "04", "05"] as const;

function SustainabilityPage() {
  const { t } = useSite();
  return (
    <>
      <section className="page-hero">
        <div className="wrap hero-content">
          <div className="label">{t("sus.hero.label")}</div>
          <h1>{t("sus.hero.h1a")} <b>{t("sus.hero.h1b")}</b></h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="row-list">
            {ROWS.map((n) => (
              <div key={n} className="row-item">
                <div className="rn">{n}</div>
                <h4>{t(`sus.r.${n}.t`)}</h4>
                <p>{t(`sus.r.${n}.d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
