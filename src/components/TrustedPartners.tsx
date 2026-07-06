import { Marquee } from "@/components/Marquee";
import type { TrustedPartnerKey } from "@/lib/trusted-partners";

export type TrustedPartnerItem = {
  key: TrustedPartnerKey;
  label: string;
  logo: string;
  alt: string;
};

type TrustedPartnersProps = {
  label: string;
  items: TrustedPartnerItem[];
  id?: string;
};

export function TrustedPartners({ label, items, id = "trusted" }: TrustedPartnersProps) {
  return (
    <section className="trusted corp-trusted" aria-label={label} id={id}>
      <div className="wrap trusted-head">
        <span className="label">{label}</span>
        <p className="trusted-sub">{items.length} institutional sectors · one standard of excellence</p>
      </div>

      <div className="wrap partner-grid" role="list">
        {items.map((partner) => (
          <article className="partner-tile" role="listitem" key={partner.key}>
            <div className="partner-tile-logo">
              <img src={partner.logo} alt={partner.alt} loading="lazy" />
            </div>
            <span className="partner-tile-label">{partner.label}</span>
          </article>
        ))}
      </div>

      <div className="partner-marquee-wrap" aria-hidden>
        <Marquee variant="trusted" items={items} />
      </div>
    </section>
  );
}
