"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CHIP_COLORS = [
  "bg-brand-yellow text-black",
  "bg-white text-brand-red",
  "bg-brand-cyan text-ink",
  "bg-brand-blue text-white",
  "bg-brand-teal text-ink",
  "bg-brand-purple text-ink",
];

type Chip = {
  id: string;
  label: string;
  kind: "language" | "stat";
};

function formatCount(value: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(
    value,
  );
}

export function OrbitHero({
  languages,
  pullRequestCount,
  commitCount,
}: {
  languages: string[];
  pullRequestCount: number;
  commitCount: number;
}) {
  const rootRef = useRef<HTMLElement | null>(null);

  const chips = useMemo<Chip[]>(() => {
    const languageChips = languages.map((language) => ({
      id: `lang-${language}`,
      label: language,
      kind: "language" as const,
    }));
    return [
      {
        id: "stat-prs",
        label: `${formatCount(pullRequestCount)} PRs`,
        kind: "stat" as const,
      },
      {
        id: "stat-commits",
        label: `${formatCount(commitCount)} commits`,
        kind: "stat" as const,
      },
      ...languageChips,
    ];
  }, [languages, pullRequestCount, commitCount]);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const nodes = gsap.utils.toArray<HTMLElement>(".orbit-chip");
      if (!nodes.length) return;

      const radii = () => {
        const width = rootRef.current?.offsetWidth ?? window.innerWidth;
        return {
          start: Math.min(210, Math.max(118, width * 0.22)),
          end: Math.min(920, Math.max(420, width * 0.72)),
        };
      };

      const apply = (radius: number, fade: number) => {
        const count = nodes.length;
        nodes.forEach((node, index) => {
          const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
          gsap.set(node, {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            xPercent: -50,
            yPercent: -50,
            opacity: fade,
          });
        });
      };

      const { start } = radii();
      apply(start, 1);
      if (reduce) return;

      const tween = { t: 0 };
      gsap.to(tween, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const { start: nextStart, end: nextEnd } = radii();
            apply(nextStart + (nextEnd - nextStart) * tween.t, 1 - tween.t * 0.82);
          },
        },
      });
    },
    { scope: rootRef, dependencies: [chips.length] },
  );

  return (
    <section ref={rootRef} className="hero-grid relative overflow-hidden text-white">
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl items-center justify-center px-5 py-16">
        <div className="relative flex h-[22rem] w-[22rem] items-center justify-center sm:h-[28rem] sm:w-[28rem]">
          {chips.map((chip, index) => (
            <span
              key={chip.id}
              className={`orbit-chip absolute left-1/2 top-1/2 z-10 whitespace-nowrap px-3 py-1.5 text-sm font-bold shadow-[0_8px_24px_rgba(0,0,0,0.18)] ${
                CHIP_COLORS[index % CHIP_COLORS.length]
              } ${chip.kind === "stat" ? "uppercase tracking-wide" : ""}`}
            >
              {chip.label}
            </span>
          ))}
          <div
            aria-label="Logo placeholder"
            className="relative z-20 aspect-square w-28 border-2 border-white bg-transparent sm:w-36"
          />
        </div>
      </div>
    </section>
  );
}
