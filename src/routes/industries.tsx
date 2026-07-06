import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { img } from "@/lib/afs-images";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — AFS International" },
      { name: "description", content: "Six sectors served: government, NGO, UN agencies, insurance, corporate, construction." },
      { property: "og:title", content: "Industries — AFS International" },
      { property: "og:description", content: "Six sectors. One accountable workshop." },
    ],
  }),
  component: IndustriesPage,
});

const govIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22V12h6v10"/></svg>;
const ngoIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const unIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const insIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const corpIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/></svg>;
const conIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6h0"/><path d="M14 9a6 6 0 0 1 6 6v3"/></svg>;

const SECTORS = [
  { k: "s1", num: "01", image: img.workshop, icon: govIcon, rev: false, m1v: "98.6%", m2v: "48 hrs" },
  { k: "s2", num: "02", image: img.diagnostics, icon: ngoIcon, rev: true, m1v: "40+", m2v: "24/7" },
  { k: "s3", num: "03", image: img.hero, icon: unIcon, rev: false, m1v: "9", m2v: "9001·14001·45001" },
  { k: "s4", num: "04", image: img.workshop, icon: insIcon, rev: true, m1v: "15+", m2v: "< 24 hrs" },
  { k: "s5", num: "05", image: img.ev, icon: corpIcon, rev: false, m1v: "1,000+", m2v: "96%" },
  { k: "s6", num: "06", image: img.diagnostics, icon: conIcon, rev: true, m1v: "12", m2v: "MIG · TIG · Arc" },
] as const;

function IndustriesPage() {
  const { t } = useSite();
  return (
    <>
      <PageHero
        labelKey="ind.hero.label"
        h1aKey="ind.hero.h1a"
        h1bKey="ind.hero.h1b"
        leadKey="ind.hero.lead"
      />

      <section className="sector-index">
        <div className="wrap sector-index-grid">
          {SECTORS.map((s) => (
            <a key={s.k} className="sector-link" href={`#sector-${s.num}`}>
              <span className="num">{s.num}</span>
              <span className="tag">{t(`ind.${s.k}.tag`)}</span>
            </a>
          ))}
        </div>
      </section>

      <div className="wrap">
        {SECTORS.map((s) => (
          <article key={s.k} className={`sector-article${s.rev ? " rev" : ""}`} id={`sector-${s.num}`}>
            <div className="sector-media">
              <img src={s.image} alt={t(`ind.${s.k}.tag`)} loading="lazy" />
              <div className="grad" />
              <div className="sector-badge">{s.icon}<span>{t(`ind.${s.k}.tag`)}</span></div>
              <div className="sector-numeral">{s.num}</div>
            </div>
            <div className="sector-copy">
              <div className="sector-label"><span className="line" /><span className="label blue">{t("ind.sectorLabel")} {s.num}</span></div>
              <h2>{t(`ind.${s.k}.t1`)} <b>{t(`ind.${s.k}.t2`)}</b></h2>
              <p className="lead">{t(`ind.${s.k}.lead`)}</p>
              <p className="body">{t(`ind.${s.k}.body`)}</p>
              <ul className="sector-bullets">
                <li>{t(`ind.${s.k}.b1`)}</li>
                <li>{t(`ind.${s.k}.b2`)}</li>
                <li>{t(`ind.${s.k}.b3`)}</li>
              </ul>
              <div className="sector-footer">
                <div className="sector-metrics">
                  <div><div className="val">{s.m1v}</div><div className="key">{t(`ind.${s.k}.m1`)}</div></div>
                  <div><div className="val">{s.m2v}</div><div className="key">{t(`ind.${s.k}.m2`)}</div></div>
                </div>
                <Link to="/contact" className="link-arrow">{t("common.discussSector")}</Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="cap-band">
        <div className="cap-glow" />
        <div className="wrap cap-inner">
          <div className="cap-top">
            <div>
              <span className="label">{t("ind.cap.label")}</span>
              <h2>{t("ind.cap.h2a")} <b>{t("ind.cap.h2b")}</b></h2>
            </div>
            <p className="cap-desc">{t("ind.cap.desc")}</p>
          </div>
          <div className="cap-stats">
            <div className="cap-stat"><div className="val">25+</div><div className="key">{t("ind.cap.s1")}</div></div>
            <div className="cap-stat"><div className="val">1,000+</div><div className="key">{t("ind.cap.s2")}</div></div>
            <div className="cap-stat"><div className="val">40+</div><div className="key">{t("ind.cap.s3")}</div></div>
            <div className="cap-stat"><div className="val">3,000+ m²</div><div className="key">{t("ind.cap.s4")}</div></div>
          </div>
          <div className="cap-btns">
            <Link to="/contact" className="btn solid">{t("ind.cap.talk")}</Link>
            <Link to="/services" className="btn outline">{t("ind.cap.explore")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
