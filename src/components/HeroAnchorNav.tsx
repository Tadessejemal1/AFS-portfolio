import { useSite } from "@/lib/site-context";

const ANCHORS = [
  { id: "why-afs", key: "home.geo.nav.why" },
  { id: "trusted", key: "home.geo.nav.trusted" },
  { id: "solutions", key: "home.geo.nav.services" },
  { id: "industries", key: "home.geo.nav.industries" },
  { id: "stories", key: "home.geo.nav.stories" },
  { id: "support", key: "home.geo.nav.support" },
] as const;

export function HeroAnchorNav() {
  const { t } = useSite();

  return (
    <nav className="corp-anchor-nav" aria-label="Page sections">
      <div className="wrap corp-anchor-inner">
        {ANCHORS.map((a) => (
          <a key={a.id} href={`#${a.id}`} className="corp-anchor-link">
            {t(a.key)}
          </a>
        ))}
      </div>
    </nav>
  );
}
