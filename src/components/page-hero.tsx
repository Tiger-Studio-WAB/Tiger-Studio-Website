"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = {
  kicker?: string;
  title: React.ReactNode;
  lede?: string;
};

export function PageHero({ kicker, title, lede }: Props) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.from(".hero-kicker", { y: 14, autoAlpha: 0, duration: 0.4 })
          .from(".hero-title", { y: 28, autoAlpha: 0, duration: 0.55 }, "-=0.22")
          .from(".hero-rule", { scaleX: 0, transformOrigin: "left center", duration: 0.45 }, "-=0.28")
          .from(".hero-lede", { y: 18, autoAlpha: 0, duration: 0.45 }, "-=0.22");
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <header ref={rootRef} className="hero-grid text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        {kicker ? (
          <p className="hero-kicker text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{kicker}</p>
        ) : null}
        <h1 className="hero-title mt-3 max-w-4xl text-4xl font-bold italic leading-[1.1] md:text-6xl">{title}</h1>
        <span className="hero-rule rule-yellow mt-4" />
        {lede ? <p className="hero-lede mt-6 max-w-2xl text-lg leading-relaxed text-white/90">{lede}</p> : null}
      </div>
    </header>
  );
}
