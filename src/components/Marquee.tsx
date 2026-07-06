export type ClientItem = {
  name: string;
  logo: string;
  alt: string;
};

export type TrustedPartner = {
  label: string;
  logo: string;
  alt: string;
};

type ClientMarqueeProps = {
  items: ClientItem[];
  reverse?: boolean;
  variant?: "client";
};

type ClientTextMarqueeProps = {
  items: string[];
  reverse?: boolean;
  variant?: "client-text";
};

type TrustedMarqueeProps = {
  items: TrustedPartner[];
  reverse?: boolean;
  variant: "trusted";
};

type MarqueeProps = ClientMarqueeProps | ClientTextMarqueeProps | TrustedMarqueeProps;

export function Marquee(props: MarqueeProps) {
  const { reverse = false } = props;

  if (props.variant === "trusted") {
    const tripled = [...props.items, ...props.items, ...props.items];

    return (
      <div className="trusted-marquee">
        <div className={`trusted-track${reverse ? " reverse" : ""}`}>
          {tripled.map((partner, i) => (
            <div
              key={`${partner.label}-${i}`}
              className="partner-tile partner-tile--marquee"
              aria-hidden={i >= props.items.length ? true : undefined}
            >
              <div className="partner-tile-logo">
                <img
                  src={partner.logo}
                  alt={i >= props.items.length ? "" : partner.alt}
                />
              </div>
              <span className="partner-tile-label">{partner.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const tripled = [...props.items, ...props.items, ...props.items];

  return (
    <div className="client-marquee">
      <div className={`client-track${reverse ? " reverse" : ""}`}>
        {tripled.map((c, i) => {
          const key = typeof c === "string" ? `${c}-${i}` : `${c.name}-${i}`;
          const isHidden = i >= props.items.length ? true : undefined;

          if (typeof c === "string") {
            return (
              <div key={key} className="client-tile" aria-hidden={isHidden}>
                <span className="client-tile-label">{c}</span>
              </div>
            );
          }

          return (
            <div key={key} className="client-tile client-tile--logo" aria-hidden={isHidden}>
              <img className="client-tile-logo" src={c.logo} alt={isHidden ? "" : c.alt} />
              <span className="client-tile-label">{c.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
