"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LanguageStat, OrbitCommit } from "@/lib/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BOX_COLORS = [
  "bg-brand-yellow text-black",
  "bg-white text-brand-red",
  "bg-brand-cyan text-ink",
  "bg-brand-blue text-white",
  "bg-brand-teal text-ink",
  "bg-brand-purple text-ink",
];

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const LANGUAGE_LIMIT = 10;
const COMMIT_LIMIT = 6;

type BoxKind = "language" | "commit" | "stat";

type OrbitBox = {
  id: string;
  kind: BoxKind;
  kicker: string;
  title: string;
  meta?: string;
  href?: string;
  weight: number;
  priority: "high" | "low";
};

function formatCount(value: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(
    value,
  );
}

function formatShare(bytes: number, total: number) {
  if (total <= 0) return undefined;
  const share = (bytes / total) * 100;
  if (share < 1) return "<1% of code";
  return `${Math.round(share)}% of code`;
}

function logWeight(value: number) {
  return Math.log1p(Math.max(0, value));
}

function sizeFromImportance(t: number, min: number, max: number) {
  const clamped = Math.min(1, Math.max(0, t));
  return Math.round(min + clamped * (max - min));
}

function importanceFor(weight: number, weights: number[]) {
  const logs = weights.map(logWeight);
  const min = Math.min(...logs);
  const max = Math.max(...logs);
  if (!Number.isFinite(min) || !Number.isFinite(max) || max === min) return 0.72;
  return (logWeight(weight) - min) / (max - min);
}

function buildBoxes(
  languages: LanguageStat[],
  recentCommits: OrbitCommit[],
  pullRequestCount: number,
  commitCount: number,
): OrbitBox[] {
  const languageItems = languages.slice(0, LANGUAGE_LIMIT);
  const commitItems = recentCommits.slice(0, COMMIT_LIMIT);
  const totalBytes = languageItems.reduce((sum, language) => sum + language.bytes, 0);
  const peakLanguage = languageItems[0]?.bytes ?? Math.max(commitCount, pullRequestCount, 1);

  const boxes: OrbitBox[] = [
    {
      id: "stat-commits",
      kind: "stat",
      kicker: "Studio",
      title: `${formatCount(commitCount)} commits`,
      meta: "Across public repos",
      href: "/changelog",
      weight: peakLanguage * 1.15,
      priority: "high",
    },
    {
      id: "stat-prs",
      kind: "stat",
      kicker: "Studio",
      title: `${formatCount(pullRequestCount)} pull requests`,
      meta: "Opened in the org",
      href: "/changelog",
      weight: peakLanguage * 0.92,
      priority: "high",
    },
    ...languageItems.map((language) => ({
      id: `lang-${language.name}`,
      kind: "language" as const,
      kicker: "Language",
      title: language.name,
      meta: formatShare(language.bytes, totalBytes),
      weight: language.bytes,
      priority: "high" as const,
    })),
    ...commitItems.map((commit, index) => ({
      id: `commit-${commit.id}`,
      kind: "commit" as const,
      kicker: "Commit",
      title: commit.message.length > 88 ? `${commit.message.slice(0, 85)}…` : commit.message,
      meta: commit.repo,
      href: commit.url,
      weight: peakLanguage * Math.max(0.18, 0.62 - index * 0.07),
      priority: "high" as const,
    })),
  ];

  const ranked = [...boxes].sort((a, b) => b.weight - a.weight || a.title.localeCompare(b.title));
  return ranked.map((box, index) => ({
    ...box,
    priority: index < 8 || box.kind === "stat" ? "high" : "low",
  }));
}

function layoutBoxes(nodes: HTMLElement[], inner: number) {
  const sizes = nodes.map((node) => ({
    w: node.offsetWidth,
    h: node.offsetHeight,
  }));
  const placed: { x: number; y: number; r: number; angle: number }[] = [];

  nodes.forEach((node, index) => {
    const box = sizes[index];
    const angle = index * GOLDEN_ANGLE - Math.PI / 2;
    let radius = inner + Math.sqrt(index + 1) * 36;
    let x = 0;
    let y = 0;

    const overlaps = () => {
      const hw = box.w / 2;
      const hh = box.h / 2;
      if (Math.hypot(x, y) < inner + Math.min(hw, hh) * 0.35) return true;
      return placed.some((point, otherIndex) => {
        const other = sizes[otherIndex];
        return (
          Math.abs(x - point.x) < (hw + other.w / 2) * 0.84 &&
          Math.abs(y - point.y) < (hh + other.h / 2) * 0.84
        );
      });
    };

    for (let step = 0; step < 48; step += 1) {
      x = Math.cos(angle) * radius;
      y = Math.sin(angle) * radius;
      if (!overlaps()) break;
      radius += 16;
    }

    placed.push({ x, y, r: radius, angle });
    node.dataset.radius = String(radius);
    node.dataset.angle = String(angle);
  });

  return placed;
}

export function OrbitHero({
  languages,
  recentCommits,
  pullRequestCount,
  commitCount,
}: {
  languages: LanguageStat[];
  recentCommits: OrbitCommit[];
  pullRequestCount: number;
  commitCount: number;
}) {
  const rootRef = useRef<HTMLElement | null>(null);

  const boxes = useMemo(
    () => buildBoxes(languages, recentCommits, pullRequestCount, commitCount),
    [languages, recentCommits, pullRequestCount, commitCount],
  );
  const weights = useMemo(() => boxes.map((box) => box.weight), [boxes]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 641px)",
          isMobile: "(max-width: 640px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const reduce = Boolean(context.conditions?.reduceMotion);
          const nodes = gsap.utils
            .toArray<HTMLElement>(".orbit-box")
            .filter((node) => window.getComputedStyle(node).display !== "none");
          if (!nodes.length) return;

          const innerRadius = () => {
            const width = rootRef.current?.offsetWidth ?? window.innerWidth;
            return Math.min(168, Math.max(92, width * 0.12));
          };

          let placed = layoutBoxes(nodes, innerRadius());

          const apply = (progress: number) => {
            const fly = 1 + progress * 2.85;
            nodes.forEach((node, index) => {
              const point = placed[index];
              if (!point) return;
              gsap.set(node, {
                x: Math.cos(point.angle) * point.r * fly,
                y: Math.sin(point.angle) * point.r * fly,
                xPercent: -50,
                yPercent: -50,
                rotation: Number(node.dataset.tilt) || 0,
                opacity: 1 - progress * 0.82,
                scale: 1 + progress * 0.12,
                force3D: true,
              });
            });
          };

          apply(0);
          if (reduce) return;

          const tween = { t: 0 };
          gsap.to(tween, {
            t: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "+=140%",
              pin: true,
              scrub: 0.55,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: () => {
                placed = layoutBoxes(nodes, innerRadius());
                apply(tween.t);
              },
              onUpdate: () => apply(tween.t),
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [boxes.length] },
  );

  return (
    <section ref={rootRef} className="hero-grid relative overflow-hidden text-white">
      <h1 className="sr-only">Tiger Studio</h1>
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-none items-center justify-center px-5 py-16">
        {boxes.map((box, index) => {
          const importance = importanceFor(box.weight, weights);
          const width =
            box.kind === "commit"
              ? sizeFromImportance(importance, 148, 236)
              : sizeFromImportance(importance, 96, 220);
          const padding = sizeFromImportance(importance, 10, 22);
          const titleSize = sizeFromImportance(importance, 14, 28);
          const tilt = ((index * 47) % 13) - 6;
          const className = `orbit-box absolute left-1/2 top-1/2 z-10 block shadow-[0_12px_32px_rgba(0,0,0,0.2)] ${
            BOX_COLORS[index % BOX_COLORS.length]
          } ${box.kind === "stat" ? "uppercase tracking-wide" : ""}`;
          const style = {
            width,
            padding,
          };
          const inner = (
            <>
              <span className="block text-[0.62em] font-semibold uppercase tracking-[0.16em] opacity-70">
                {box.kicker}
              </span>
              <span
                className={`mt-1 block break-words font-bold leading-tight ${
                  box.kind === "commit" ? "line-clamp-3 normal-case tracking-normal" : "italic"
                }`}
                style={{ fontSize: titleSize }}
              >
                {box.title}
              </span>
              {box.meta ? (
                <span className="mt-2 block text-[0.72em] font-semibold leading-snug opacity-75">
                  {box.meta}
                </span>
              ) : null}
            </>
          );

          if (box.href) {
            const external = box.href.startsWith("http");
            return (
              <a
                key={box.id}
                href={box.href}
                className={className}
                data-priority={box.priority}
                data-kind={box.kind}
                data-tilt={String(tilt)}
                style={style}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                {inner}
              </a>
            );
          }

          return (
            <div
              key={box.id}
              className={className}
              data-priority={box.priority}
              data-kind={box.kind}
              data-tilt={String(tilt)}
              style={style}
            >
              {inner}
            </div>
          );
        })}
        <div
          aria-label="Logo placeholder"
          className="relative z-20 aspect-square w-28 border-2 border-white bg-transparent sm:w-36"
        />
      </div>
    </section>
  );
}
