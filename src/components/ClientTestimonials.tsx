import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSite } from "@/lib/site-context";

const TESTIMONIAL_IDS = ["q1", "q2", "q3", "q4", "q5"] as const;
const AUTOPLAY_MS = 4500;

const AVATAR_TONES = [
  { bg: "#1D2430", fg: "#E8CC7F" },
  { bg: "#2A2418", fg: "#F0D78C" },
  { bg: "#1A2820", fg: "#C9A84C" },
  { bg: "#2C1F2E", fg: "#D4B968" },
  { bg: "#1E2A35", fg: "#F0D78C" },
] as const;

export function ClientTestimonials() {
  const { t } = useSite();
  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: true,
    slidesToScroll: 1,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    const root = emblaApi.rootNode();

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    root.addEventListener("mouseenter", pause);
    root.addEventListener("mouseleave", resume);
    root.addEventListener("touchstart", pause, { passive: true });
    root.addEventListener("touchend", resume, { passive: true });

    const timer = window.setInterval(() => {
      if (paused) return;
      emblaApi.scrollNext();
    }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(timer);
      root.removeEventListener("mouseenter", pause);
      root.removeEventListener("mouseleave", resume);
      root.removeEventListener("touchstart", pause);
      root.removeEventListener("touchend", resume);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <section className="section off testimonials-section" id="stories">
      <div className="wrap testimonials-head">
        <span className="label blue">{t("home.quotes.label")}</span>
        <h2 className="content-title testimonials-title">
          {t("home.quotes.h2a")} <b>{t("home.quotes.h2b")}</b>
        </h2>
        <p className="testimonials-lead">{t("home.quotes.lead")}</p>
        <div className="testimonials-nav">
          <button
            type="button"
            className="testimonials-nav-btn"
            onClick={scrollPrev}
            aria-label={t("home.quotes.prev")}
          >
            <ChevronLeft size={18} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            className="testimonials-nav-btn"
            onClick={scrollNext}
            aria-label={t("home.quotes.next")}
          >
            <ChevronRight size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div className="testimonials-panel">
        <div className="testimonials-embla" ref={emblaRef}>
          <div className="testimonials-embla-container">
            {TESTIMONIAL_IDS.map((id, index) => {
              const tone = AVATAR_TONES[index % AVATAR_TONES.length];
              return (
                <div className="testimonials-embla-slide" key={id}>
                  <article className="testimonial-card">
                    <div className="testimonial-top">
                      <div
                        className="testimonial-avatar"
                        style={{ background: tone.bg, color: tone.fg }}
                        aria-hidden
                      >
                        {t(`home.${id}.initials`)}
                      </div>
                      <div className="testimonial-id">
                        <cite className="testimonial-name">{t(`home.${id}.name`)}</cite>
                        <span className="testimonial-role">{t(`home.${id}.role`)}</span>
                        <span className="testimonial-org">{t(`home.${id}.org`)}</span>
                      </div>
                    </div>
                    <blockquote className="testimonial-quote">
                      <p>{t(`home.${id}.text`)}</p>
                    </blockquote>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className="testimonials-dots" role="tablist" aria-label={t("home.quotes.dotsLabel")}>
          {TESTIMONIAL_IDS.map((id, index) => (
            <button
              key={id}
              type="button"
              role="tab"
              className={`testimonials-dot${selected === index ? " active" : ""}`}
              aria-selected={selected === index}
              aria-label={`${t("home.quotes.goTo")} ${index + 1}`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
