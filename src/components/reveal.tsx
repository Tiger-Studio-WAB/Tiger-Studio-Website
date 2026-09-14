"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        if (items.length) {
          gsap.from(items, {
            y: 14,
            autoAlpha: 0,
            duration: 0.38,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "transform,opacity,visibility",
          });
          return;
        }
        if (rootRef.current) {
          gsap.from(rootRef.current, {
            y: 10,
            autoAlpha: 0,
            duration: 0.34,
            ease: "power2.out",
            clearProps: "transform,opacity,visibility",
          });
        }
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
