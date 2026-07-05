import { createFileRoute } from "@tanstack/react-router";
import { Marquee } from "@/components/Marquee";
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

const clients = [
  "UNDP", "UNICEF", "WHO", "FAO", "WFP",
  "ILO", "UN-AIDS", "UN/ECA", "UNOAU", "Canada Embassy",
  "Concern Ethiopia", "ACF", "ACDI/VOCA", "DFID", "SC Canada",
  "Africa Insurance", "Nyala Insurance", "Oromia Insurance", "United Insurance", "Nib Insurance",
];

// Split into two rows scrolling in opposite directions for a fuller look.
const rowA = clients.filter((_, i) => i % 2 === 0);
const rowB = clients.filter((_, i) => i % 2 === 1);

const SVC_NUMS = ["01", "02", "03", "04", "05", "06", "07", "08"] as const;

function ClientsPage() {
  const { t } = useSite();
  return (
    <>
      <section className="page-hero">
        <div className="wrap hero-content">
          <div className="label">{t("cli.hero.label")}</div>
          <h1>{t("cli.hero.h1a")} <b>{t("cli.hero.h1b")}</b></h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <div className="wrap" style={{ marginBottom: 40 }}>
          <span className="label blue">{t("cli.trust.label")}</span>
          <h2 className="content-title" style={{ marginTop: 12, marginBottom: 0 }}>
            {t("cli.trust.h2a")} <b>{t("cli.trust.h2b")}</b>
          </h2>
        </div>

        <Marquee items={rowA} />
        <div style={{ height: 20 }} />
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
