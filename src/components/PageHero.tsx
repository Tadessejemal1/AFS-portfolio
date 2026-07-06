import type { ReactNode } from "react";
import { useSite } from "@/lib/site-context";

type PageHeroProps = {
  labelKey: string;
  h1aKey: string;
  h1bKey: string;
  leadKey?: string;
  variant?: "default" | "contact";
  children?: ReactNode;
};

export function PageHero({
  labelKey,
  h1aKey,
  h1bKey,
  leadKey,
  variant = "default",
  children,
}: PageHeroProps) {
  const { t } = useSite();
  return (
    <section className={`page-hero corp-page-hero${variant === "contact" ? " contact-hero" : ""}`}>
      <div className="wrap hero-content">
        <div className="label">{t(labelKey)}</div>
        <h1>
          {t(h1aKey)} <b>{t(h1bKey)}</b>
        </h1>
        {leadKey && <p className="lead">{t(leadKey)}</p>}
        {children}
      </div>
    </section>
  );
}
