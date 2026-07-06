import generated from "./client-institutions.generated.json";

type ClientMeta = {
  slug: string;
  name: string;
  abbr: string;
  color: string;
  accent: string;
};

const logoModules = import.meta.glob<string>("../assets/clients/*.svg", {
  eager: true,
  import: "default",
});

export type ClientInstitution = {
  id: string;
  name: string;
  logo: string;
};

export const CLIENT_INSTITUTIONS: ClientInstitution[] = (generated as ClientMeta[]).map(
  (c) => ({
    id: c.slug,
    name: c.name,
    logo: logoModules[`../assets/clients/${c.slug}.svg`],
  }),
);

export const CLIENT_COUNT = CLIENT_INSTITUTIONS.length;
