import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientTestimonials } from "@/components/ClientTestimonials";
import { Marquee } from "@/components/Marquee";
import RequestDemo from "@/components/RequestDemo";
import { img } from "@/lib/afs-images";
import { useSite } from "@/lib/site-context";


export const Route = createFileRoute("/")({
  component: HomePage,
});

const SVC_NUMS = ["01", "02", "03", "04", "05", "06", "07", "08"] as const;

function HomePage() {
  const { t } = useSite();
  return (
    <>
      <section className="hero-home">
        <img className="hero-bg" src={img.hero} alt="AFS workshop" />
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <div className="wrap hero-content">
          <div className="label">{t("home.hero.label")}</div>
          <h1>
            {t("home.hero.h1a")}
            <br />
            <b>{t("home.hero.h1b")}</b>
          </h1>
          <p>{t("home.hero.p")}</p>
          <div className="hero-btns">
            <Link to="/contact" className="btn solid">{t("home.hero.ctaRequest")}</Link>
            <Link to="/services" className="btn outline">{t("home.hero.ctaExplore")}</Link>
          </div>
        </div>
      </section>

      <section className="kpi-strip">
        <div className="wrap kpi-grid">
          <div className="kpi"><b>25+</b><span>{t("home.kpi.years")}</span></div>
          <div className="kpi"><b>3,000+ m²</b><span>{t("home.kpi.facility")}</span></div>
          <div className="kpi"><b>1,000+</b><span>{t("home.kpi.vehicles")}</span></div>
          <div className="kpi"><b>24/7</b><span>{t("home.kpi.support")}</span></div>
        </div>
      </section>

      <section className="trusted">
        <div className="wrap">
          <span className="label">{t("home.trusted.label")}</span>
        </div>
        <Marquee
          variant="trusted"
          items={[
            t("home.trusted.un"),
            t("home.trusted.ngo"),
            t("home.trusted.ins"),
            t("home.trusted.gov"),
            t("home.trusted.dip"),
          ]}
        />
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2>{t("home.services.h2a")} <b>{t("home.services.h2b")}</b></h2>
            <p>{t("home.services.p")}</p>
          </div>
          <div className="teaser-grid">
            {SVC_NUMS.map((n) => (
              <Link key={n} to="/services" className="teaser">
                <div>
                  <div className="tnum">{n}</div>
                  <h4>{t(`home.svc.${n}.t`)}</h4>
                  <p>{t(`home.svc.${n}.d`)}</p>
                </div>
                <div className="arrow">{t("common.learnMore")}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="media-teaser">
        <div className="media-img">
          <img src={img.workshop} alt="AFS workshop" loading="lazy" />
          <span>{t("home.why.imgCaption")}</span>
        </div>
        <div className="media-copy">
          <span className="label blue">{t("home.why.label")}</span>
          <h3>{t("home.why.h3a")} <b>{t("home.why.h3b")}</b></h3>
          <p>{t("home.why.p")}</p>
          <Link to="/about" className="link-arrow">{t("common.learnMore")}</Link>
        </div>
      </div>

      <div className="media-teaser rev">
        <div className="media-copy">
          <span className="label blue">{t("home.strat.label")}</span>
          <h3>{t("home.strat.h3a")} <b>{t("home.strat.h3b")}</b></h3>
          <p>{t("home.strat.p")}</p>
          <Link to="/about" className="link-arrow">{t("home.strat.link")}</Link>
        </div>
        <div className="media-img">
          <img src={img.diagnostics} alt="Diagnostics" loading="lazy" />
          <span>{t("home.strat.imgCaption")}</span>
        </div>
      </div>

      <section className="ev-band">
        <img className="ev-bg" src={img.ev} alt="EV" loading="lazy" />
        <div className="ev-overlay" />
        <div className="wrap ev-content">
          <span className="label">{t("home.ev.label")}</span>
          <h2>{t("home.ev.h2a")} <b>{t("home.ev.h2b")}</b></h2>
          <p>{t("home.ev.p")}</p>
          <Link
            to="/services"
            className="link-arrow"
            style={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.7)", marginTop: 32 }}
          >
            {t("home.ev.link")}
          </Link>
        </div>
      </section>

      <ClientTestimonials />

      <RequestDemo />


      <section className="cta-band">
        <div className="wrap">
          <h2>{t("home.cta.h2a")} <b>{t("home.cta.h2b")}</b></h2>
          <div className="cta-band-btns">
            <Link to="/contact" className="btn solid">{t("home.cta.book")}</Link>
            <Link to="/services" className="btn outline">{t("home.cta.view")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
