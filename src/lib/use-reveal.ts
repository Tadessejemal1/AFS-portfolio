import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

const SELECTORS = [
  ".kpi",
  ".teaser",
  ".ind-card",
  ".sec-head",
  ".media-teaser",
  ".testimonial-card",
  ".sector-article",
  ".sector-link",
  ".cap-stat",
  ".fac-img",
  ".client-cell",
  ".t-row",
  ".row-item",
  ".two-col > *",
  ".hero-home .label",
  ".hero-home h1",
  ".hero-home p",
  ".hero-home .hero-btns",
  ".page-hero .label",
  ".page-hero h1",
  ".page-hero .lead",
  ".fleet-card",
  ".fleet-cap-head",
].join(",");

export function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS));
    nodes.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--reveal-delay", `${Math.min(i, 12) * 60}ms`);
    });

    if (prefersReduced) {
      nodes.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}
