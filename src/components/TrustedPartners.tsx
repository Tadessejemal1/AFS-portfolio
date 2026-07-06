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

      <Marquee variant="trusted" items={items} />
    </section>
  );
}
