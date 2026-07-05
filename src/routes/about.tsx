import { createFileRoute } from "@tanstack/react-router";
import { img } from "@/lib/afs-images";
import { useSite } from "@/lib/site-context";
import organogram from "@/assets/afs-organogram.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AFS International" },
      { name: "description", content: "Founded 1999. AFS's story, leadership, and Accelerate Strategy for Ethiopia's fleet future." },
      { property: "og:title", content: "About — AFS International" },
      { property: "og:description", content: "Company story, history & leadership of Ethiopia's premier fleet service provider." },
    ],
  }),
  component: AboutPage,
});

const PILLARS = ["01", "02", "03", "04", "05", "06"] as const;

function AboutPage() {
  const { t } = useSite();
  return (
    <>
      <section className="page-hero">
        <div className="wrap hero-content">
          <div className="label">{t("about.hero.label")}</div>
          <h1>{t("about.hero.h1a")} <b>{t("about.hero.h1b")}</b></h1>
        </div>
      </section>

      <section className="section">
        <div className="wrap two-col">
          <div>
            <span className="label blue">{t("about.story.label")}</span>
            <h3>{t("about.story.h3")}</h3>
            <p>{t("about.story.p1a")}<b>{t("about.story.p1b")}</b>{t("about.story.p1c")}</p>
            <p>{t("about.story.p2a")}<b>{t("about.story.p2b")}</b>{t("about.story.p2c")}</p>
            <p><b>{t("about.story.p3a")}</b>{t("about.story.p3b")}</p>
          </div>
          <div>
            <span className="label blue">{t("about.mvv.mission")}</span>
            <p style={{ color: "var(--ink)", fontSize: 16, marginBottom: 28 }}>{t("about.mvv.missionP")}</p>
            <span className="label blue">{t("about.mvv.vision")}</span>
            <p style={{ color: "var(--ink)", fontSize: 16, marginBottom: 28 }}>{t("about.mvv.visionP")}</p>
            <span className="label blue">{t("about.mvv.values")}</span>
            <p style={{ fontSize: 14.5 }}>{t("about.mvv.valuesP")}</p>
          </div>
        </div>
      </section>

      <section className="section off">
        <div className="wrap">
          <h2 style={{ fontSize: "clamp(28px,3vw,42px)", marginBottom: 40 }}>{t("about.time.h2a")} <b>{t("about.time.h2b")}</b></h2>
          <div className="timeline">
            <div className="t-row"><div className="yr">1999</div><div><h4>{t("about.time.r1.t")}</h4><p>{t("about.time.r1.d")}</p></div></div>
            <div className="t-row"><div className="yr">{t("about.time.r2.y")}</div><div><h4>{t("about.time.r2.t")}</h4><p>{t("about.time.r2.d")}</p></div></div>
            <div className="t-row"><div className="yr">2026</div><div><h4>{t("about.time.r3.t")}</h4><p>{t("about.time.r3.d")}</p></div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 style={{ fontSize: "clamp(28px,3vw,42px)", marginBottom: 40 }}>{t("about.lead.h2")}</h2>
          <div className="two-col">
            <div className="media-img" style={{ aspectRatio: "3/4" }}>
              <img src={img.leader} alt={t("about.lead.name")} loading="lazy" />
            </div>
            <div style={{ paddingTop: 32 }}>
              <span className="label blue">{t("about.lead.label")}</span>
              <h3 style={{ fontSize: 30, margin: "12px 0 16px" }}>{t("about.lead.name")}</h3>
              <p>{t("about.lead.p")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section off pillars-section">
        <div className="wrap">
          <div className="pillars-head">
            <h2>{t("about.pill.h2a")} <b>{t("about.pill.h2b")}</b></h2>
            <div className="pillars-divider" />
          </div>
          <div className="ind-grid">
            {PILLARS.map((n) => (
              <div key={n} className="ind-card">
                <div className="ind-gold" />
                <span className="ind-num">{n}</span>
                <h4>{t(`about.pill.${n}.t`)}</h4>
                <p>{t(`about.pill.${n}.d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 32 }}>
            <span className="label blue">Organization</span>
            <h2 style={{ fontSize: "clamp(28px,3vw,42px)" }}>Our <b>Organogram</b></h2>
            <p>A clear structure supporting excellence across technical, commercial and support functions — updated February 2026.</p>
          </div>
          <figure className="organogram">
            <div className="organogram-scroll">
              <a href={organogram} target="_blank" rel="noopener noreferrer" aria-label="Open full-size organogram">
                <img src={organogram} alt="AFS Automotive Fleet Services International PLC — Organogram, February 2026" loading="lazy" />
              </a>
            </div>
            <figcaption>
              <span className="hint-mobile">Pinch or scroll to explore · tap to open full size</span>
              <span className="hint-desktop">Driven by Excellence — Committed to Service</span>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
