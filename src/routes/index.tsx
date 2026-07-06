import { createFileRoute, Link } from "@tanstack/react-router";
import { BenefitPillars } from "@/components/BenefitPillars";
import { ClientTestimonials } from "@/components/ClientTestimonials";
import { CorporateHero } from "@/components/CorporateHero";
import { ExcellenceBand, ProductSpotlight } from "@/components/ProductSpotlight";
import { HeroAnchorNav } from "@/components/HeroAnchorNav";
import { IndustryShowcase } from "@/components/IndustryShowcase";
import RequestDemo from "@/components/RequestDemo";
import { SolutionsGrid } from "@/components/SolutionsGrid";
import { TrustedPartners } from "@/components/TrustedPartners";
import { useSite } from "@/lib/site-context";
import { TRUSTED_PARTNER_KEYS, TRUSTED_PARTNER_LOGOS } from "@/lib/trusted-partners";


export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { t } = useSite();
  return (
    <>
      <CorporateHero />
      <HeroAnchorNav />

      <ProductSpotlight />

      <BenefitPillars />

      <ExcellenceBand />

      <TrustedPartners
        label={t("home.trusted.label")}
        items={TRUSTED_PARTNER_KEYS.map((key) => ({
          key,
          label: t(`home.trusted.${key}`),
          logo: TRUSTED_PARTNER_LOGOS[key],
          alt: t(`home.trusted.${key}`),
        }))}
      />

      <SolutionsGrid />

      <IndustryShowcase />

      <ClientTestimonials />

      <section className="corp-section corp-support" id="support">
        <div className="wrap corp-support-inner">
          <div>
            <h2 className="corp-h2">{t("home.geo.demo.h2")}</h2>
            <p className="corp-lead">{t("home.geo.demo.p")}</p>
          </div>
          <Link to="/contact" className="btn corp-btn-primary">{t("home.geo.demo.cta")}</Link>
        </div>
      </section>

      <RequestDemo />

      <section className="cta-band corp-cta">
        <div className="wrap">
          <h2>{t("home.cta.h2a")} <b>{t("home.cta.h2b")}</b></h2>
          <div className="cta-band-btns">
            <Link to="/contact" className="btn corp-btn-primary">{t("home.cta.book")}</Link>
            <Link to="/services" className="btn corp-btn-secondary">{t("home.cta.view")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
