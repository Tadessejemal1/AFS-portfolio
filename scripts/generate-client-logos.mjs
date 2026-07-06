import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const clients = [
  { slug: "undp", name: "UNDP", abbr: "UNDP", color: "#0468B1", accent: "#FFFFFF" },
  { slug: "unicef", name: "UNICEF", abbr: "UNICEF", color: "#1CABE2", accent: "#FFFFFF" },
  { slug: "who", name: "WHO", abbr: "WHO", color: "#009FDA", accent: "#FFFFFF" },
  { slug: "fao", name: "FAO", color: "#116AAB", abbr: "FAO", accent: "#78BE20" },
  { slug: "wfp", name: "WFP", abbr: "WFP", color: "#007DBC", accent: "#FFFFFF" },
  { slug: "ilo", name: "ILO", abbr: "ILO", color: "#005B8F", accent: "#FFFFFF" },
  { slug: "unaids", name: "UN-AIDS", abbr: "UNAIDS", color: "#C8102E", accent: "#FFFFFF" },
  { slug: "uneca", name: "UN/ECA", abbr: "UN ECA", color: "#009EDB", accent: "#FFFFFF" },
  { slug: "unoau", name: "UNOAU", abbr: "UNOAU", color: "#009EDB", accent: "#FFFFFF" },
  { slug: "canada-embassy", name: "Canada Embassy", abbr: "CAN", color: "#D80621", accent: "#FFFFFF" },
  { slug: "concern", name: "Concern Ethiopia", abbr: "CONCERN", color: "#E87722", accent: "#FFFFFF" },
  { slug: "acf", name: "ACF", abbr: "ACF", color: "#E30613", accent: "#FFFFFF" },
  { slug: "acdivoca", name: "ACDI/VOCA", abbr: "ACDI", color: "#006838", accent: "#FFFFFF" },
  { slug: "dfid", name: "DFID", abbr: "DFID", color: "#003078", accent: "#FFFFFF" },
  { slug: "sc-canada", name: "SC Canada", abbr: "SC", color: "#FF0022", accent: "#FFFFFF" },
  { slug: "africa-insurance", name: "Africa Insurance", abbr: "AIC", color: "#003DA5", accent: "#FFFFFF" },
  { slug: "nyala-insurance", name: "Nyala Insurance", abbr: "NYALA", color: "#00843D", accent: "#FFFFFF" },
  { slug: "oromia-insurance", name: "Oromia Insurance", abbr: "OROMIA", color: "#DA020E", accent: "#FCD116" },
  { slug: "united-insurance", name: "United Insurance", abbr: "UNITED", color: "#0054A6", accent: "#FFFFFF" },
  { slug: "nib-insurance", name: "Nib Insurance", abbr: "NIB", color: "#006B3F", accent: "#FFFFFF" },
  { slug: "unhcr", name: "UNHCR", abbr: "UNHCR", color: "#0072BC", accent: "#FFFFFF" },
  { slug: "unesco", name: "UNESCO", abbr: "UNESCO", color: "#004B87", accent: "#FFFFFF" },
  { slug: "unops", name: "UNOPS", abbr: "UNOPS", color: "#009EDB", accent: "#FFFFFF" },
  { slug: "ifad", name: "IFAD", abbr: "IFAD", color: "#007932", accent: "#FFFFFF" },
  { slug: "us-embassy", name: "US Embassy", abbr: "USA", color: "#3C3B6E", accent: "#B22234" },
  { slug: "uk-embassy", name: "UK Embassy", abbr: "UK", color: "#012169", accent: "#C8102E" },
  { slug: "eu-delegation", name: "EU Delegation", abbr: "EU", color: "#003399", accent: "#FFCC00" },
  { slug: "germany-embassy", name: "Germany Embassy", abbr: "DE", color: "#000000", accent: "#DD0000" },
  { slug: "sweden-embassy", name: "Swedish Embassy", abbr: "SE", color: "#006AA7", accent: "#FECC00" },
  { slug: "netherlands-embassy", name: "Netherlands Embassy", abbr: "NL", color: "#21468B", accent: "#AE1C28" },
  { slug: "japan-embassy", name: "Japanese Embassy", abbr: "JP", color: "#BC002D", accent: "#FFFFFF" },
  { slug: "save-children", name: "Save the Children", abbr: "STC", color: "#FF0022", accent: "#FFFFFF" },
  { slug: "world-vision", name: "World Vision", abbr: "WV", color: "#FF6600", accent: "#FFFFFF" },
  { slug: "crs", name: "CRS", abbr: "CRS", color: "#005596", accent: "#FFFFFF" },
  { slug: "mercy-corps", name: "Mercy Corps", abbr: "MC", color: "#F47920", accent: "#FFFFFF" },
  { slug: "oxfam", name: "Oxfam", abbr: "OXFAM", color: "#E87722", accent: "#FFFFFF" },
  { slug: "ethiopian-airlines", name: "Ethiopian Airlines", abbr: "ET", color: "#009639", accent: "#FCD116" },
  { slug: "ethio-telecom", name: "Ethio Telecom", abbr: "ETC", color: "#78BE20", accent: "#003DA5" },
  { slug: "ministry-transport", name: "Ministry of Transport", abbr: "MOT", color: "#078930", accent: "#FCDD09" },
  { slug: "awash-insurance", name: "Awash Insurance", abbr: "AWASH", color: "#005BAA", accent: "#FFFFFF" },
  { slug: "lion-insurance", name: "Lion Insurance", abbr: "LION", color: "#C69214", accent: "#1A1A1A" },
  { slug: "ethiopian-insurance", name: "Ethiopian Insurance", abbr: "EIC", color: "#006B3F", accent: "#FFFFFF" },
  { slug: "african-union", name: "African Union", abbr: "AU", color: "#006B3F", accent: "#FCD116" },
];

const dir = join(process.cwd(), "src/assets/clients");
mkdirSync(dir, { recursive: true });

function svgFor(c) {
  const fontSize = c.abbr.length > 6 ? 9 : c.abbr.length > 4 ? 10 : 12;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 48" fill="none" aria-hidden="true">
  <rect width="120" height="48" rx="8" fill="#FFFFFF"/>
  <rect x="1" y="1" width="118" height="46" rx="7" stroke="#E2E8F0" stroke-width="1"/>
  <rect x="8" y="8" width="32" height="32" rx="6" fill="${c.color}"/>
  <text x="24" y="28" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="9" font-weight="700" fill="${c.accent}">${c.abbr.slice(0, 4)}</text>
  <text x="72" y="28" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="${fontSize}" font-weight="700" fill="${c.color}">${c.abbr}</text>
</svg>
`;
}

for (const c of clients) {
  writeFileSync(join(dir, `${c.slug}.svg`), svgFor(c));
}

writeFileSync(
  join(process.cwd(), "src/lib/client-institutions.generated.json"),
  JSON.stringify(clients, null, 2),
);
console.log(`Generated ${clients.length} client logos`);
