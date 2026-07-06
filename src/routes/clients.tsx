import { createFileRoute } from "@tanstack/react-router";
import { Marquee } from "@/components/Marquee";
import { PageHero } from "@/components/PageHero";
import { CLIENT_COUNT, CLIENT_INSTITUTIONS } from "@/lib/client-institutions";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients — AFS International" },
      { name: "description", content: "Institutions that trust AFS: UN agencies, embassies, NGOs and insurers." },
      { property: "og:title", content: "Clients — AFS International" },
      { property: "og:description", content: "Institutions that trust AFS." },
    ],
  }),
  component: ClientsPage,
});

const clientItems = CLIENT_INSTITUTIONS.map((c) => ({
  name: c.name,
  logo: c.logo,
  alt: c.name,
}));

const rowA = clientItems.filter((_, i) => i % 2 === 0);
const rowB = clientItems.filter((_, i) => i % 2 === 1);

const SVC_NUMS = ["01", "02", "03", "04", "05", "06", "07", "08"] as const;

function ClientsPage() {
  const { t } = useSite();
  return (
    <>
      <PageHero
        labelKey="cli.hero.label"
        h1aKey="cli.hero.h1a"
        h1bKey="cli.hero.h1b"
      />

      <section className="section corp-clients-section">
        <div className="wrap corp-clients-head">
          <span className="label blue">{t("cli.trust.label")}</span>
          <h2 className="content-title">
            {t("cli.trust.h2a")} <b>{t("cli.trust.h2b")}</b>
          </h2>
          <p className="client-count-note">{CLIENT_COUNT}+ {t("cli.trust.count")}</p>
        </div>

        <Marquee items={rowA} />
        <div className="corp-marquee-gap" />
        <Marquee items={rowB} reverse />

        <div className="wrap">
          <p className="client-note">{t("cli.note")}</p>
        </div>
      </section>

      <section className="fleet-cap-band">
        <div className="cap-glow" aria-hidden />
        <div className="wrap">
          <div className="fleet-cap-head">
            <span className="eyebrow">Full Lifecycle Capability</span>
            <h2>{t("home.services.h2a")} <b>{t("home.services.h2b")}</b></h2>
            <p>{t("home.services.p")}</p>
          </div>
          <div className="fleet-grid">
            {SVC_NUMS.map((n) => (
              <div key={n} className="fleet-card">
                <div className="fleet-num">{n}</div>
                <h4>{t(`home.svc.${n}.t`)}</h4>
                <p>{t(`home.svc.${n}.d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
