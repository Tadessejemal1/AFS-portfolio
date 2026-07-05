type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  variant?: "client" | "trusted";
};

export function Marquee({ items, reverse = false, variant = "client" }: MarqueeProps) {
  const tripled = [...items, ...items, ...items];

  if (variant === "trusted") {
    return (
      <div className="trusted-marquee">
        <div className={`trusted-track${reverse ? " reverse" : ""}`}>
          {tripled.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="logo-chip"
              aria-hidden={i >= items.length ? true : undefined}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="client-marquee">
      <div className={`client-track${reverse ? " reverse" : ""}`}>
        {tripled.map((c, i) => (
          <div key={`${c}-${i}`} className="client-tile" aria-hidden={i >= items.length ? true : undefined}>
            <span className="client-tile-label">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
