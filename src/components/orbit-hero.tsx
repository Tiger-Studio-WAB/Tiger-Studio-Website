"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fill, type UiCopy } from "@/lib/i18n";
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

const LANGUAGE_LIMIT = 5;
const COMMIT_LIMIT = 2;

type BoxKind = "language" | "commit" | "stat";
type Ring = "inner" | "outer";

type OrbitBox = {
  id: string;
  kind: BoxKind;
  kicker: string;
  title: string;
  meta?: string;
  href?: string;
  ring: Ring;
  slot: number;
  slotCount: number;
};

function formatCount(value: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(
    value,
  );
}

function formatShare(bytes: number, total: number, copy: UiCopy) {
  if (total <= 0) return undefined;
  const share = (bytes / total) * 100;
  if (share < 1) return copy.orbitCodeShareTiny;
  return fill(copy.orbitCodeShare, { percent: Math.round(share) });
}

function clipTitle(title: string, max = 28) {
  const clean = title.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max - 1);
  const cut = slice.lastIndexOf(" ");
  return `${(cut > 12 ? slice.slice(0, cut) : slice).trim()}…`;
}

function languageWidth(name: string) {
  return Math.max(128, Math.min(172, Math.round(name.length * 9.4 + 52)));
}

function buildBoxes(
  languages: LanguageStat[],
  recentCommits: OrbitCommit[],
  pullRequestCount: number,
  commitCount: number,
  copy: UiCopy,
): OrbitBox[] {
  const languageItems = languages.slice(0, LANGUAGE_LIMIT);
  const commitItems = recentCommits.slice(0, COMMIT_LIMIT);
  const totalBytes = languageItems.reduce((sum, language) => sum + language.bytes, 0);

  const stats: Omit<OrbitBox, "ring" | "slot" | "slotCount">[] = [
    {
      id: "stat-commits",
      kind: "stat",
      kicker: copy.orbitStudio,
      title: fill(copy.orbitCommits, { count: formatCount(commitCount) }),
      href: "/news",
    },
    {
      id: "stat-prs",
      kind: "stat",
      kicker: copy.orbitStudio,
      title: fill(copy.orbitPullRequests, { count: formatCount(pullRequestCount) }),
      href: "/news",
    },
  ];
  const languageBoxes: Omit<OrbitBox, "ring" | "slot" | "slotCount">[] = languageItems.map(
    (language, index) => ({
      id: `lang-${language.name}`,
      kind: "language",
      kicker: copy.orbitLanguage,
      title: language.name,
      meta: index === 0 ? undefined : formatShare(language.bytes, totalBytes, copy),
    }),
  );
  const commitBoxes: Omit<OrbitBox, "ring" | "slot" | "slotCount">[] = commitItems.map((commit) => ({
    id: `commit-${commit.id}`,
    kind: "commit",
    kicker: copy.orbitCommit,
    title: clipTitle(commit.message, 28),
    meta: commit.repo,
    href: commit.url,
  }));

  const inner = [...stats, ...languageBoxes.slice(0, 1)];
  const outer = [...languageBoxes.slice(1), ...commitBoxes];

  return [
    ...inner.map((box, slot) => ({ ...box, ring: "inner" as const, slot, slotCount: inner.length })),
    ...outer.map((box, slot) => ({ ...box, ring: "outer" as const, slot, slotCount: outer.length })),
  ];
}

function ringPoint(box: Pick<OrbitBox, "ring" | "slot" | "slotCount">, innerRadius: number, outerRadius: number) {
  const count = Math.max(box.slotCount, 1);
  const radius = box.ring === "inner" ? innerRadius : outerRadius;
  const offset = box.ring === "outer" ? Math.PI / count : 0;
  const angle = -Math.PI / 2 + offset + (box.slot / count) * Math.PI * 2;
  return { angle, r: radius };
}

function initialTransform(box: OrbitBox, tilt: number) {
  const { angle, r } = ringPoint(box, 108, 276);
  return `translate(-50%, -50%) translate(${Math.cos(angle) * r}px, ${Math.sin(angle) * r}px) rotate(${tilt}deg)`;
}

export function OrbitHero({
  languages,
  recentCommits,
  pullRequestCount,
  commitCount,
  copy,
}: {
  languages: LanguageStat[];
  recentCommits: OrbitCommit[];
  pullRequestCount: number;
  commitCount: number;
  copy: UiCopy;
}) {
  const rootRef = useRef<HTMLElement | null>(null);

  const boxes = useMemo(
    () => buildBoxes(languages, recentCommits, pullRequestCount, commitCount, copy),
    [languages, recentCommits, pullRequestCount, commitCount, copy],
  );

  useGSAP(
    (_context, contextSafe) => {
      const safe = contextSafe ?? ((fn: () => void) => fn);
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 641px)",
          isMobile: "(max-width: 640px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const reduce = Boolean(context.conditions?.reduceMotion);
          const isMobile = Boolean(context.conditions?.isMobile);
          const nodes = gsap.utils.toArray<HTMLElement>(".orbit-box");
          if (!nodes.length) return;

          const radii = () => {
            const width = rootRef.current?.offsetWidth ?? window.innerWidth;
            const height = rootRef.current?.querySelector(".hero-grid")?.clientHeight ?? window.innerHeight;
            const span = Math.min(width, height);
            if (isMobile) {
              return { inner: Math.max(84, span * 0.16), outer: Math.max(196, span * 0.38) };
            }
            return { inner: Math.max(108, span * 0.155), outer: Math.max(276, span * 0.4) };
          };

          const apply = (progress: number) => {
            const { inner, outer } = radii();
            const fly = 1 + progress * 0.28;
            nodes.forEach((node) => {
              const ring = (node.dataset.ring as Ring) || "outer";
              const slot = Number(node.dataset.slot) || 0;
              const slotCount = Number(node.dataset.slotCount) || 1;
              const point = ringPoint({ ring, slot, slotCount }, inner, outer);
              gsap.set(node, {
                x: Math.cos(point.angle) * point.r * fly,
                y: Math.sin(point.angle) * point.r * fly,
                xPercent: -50,
                yPercent: -50,
                rotation: Number(node.dataset.tilt) || 0,
                opacity: 1 - progress * 0.32,
                scale: 1 + progress * 0.02,
                visibility: "visible",
                pointerEvents: "auto",
                force3D: true,
              });
            });
          };

          apply(0);

          const cleanups = nodes.map((node) => {
            const inner = node.querySelector<HTMLElement>(".orbit-box-inner");
            const enter = safe(() => {
              nodes.forEach((other) => {
                if (other !== node) gsap.set(other, { zIndex: 12 });
              });
              gsap.set(node, { zIndex: 40 });
              if (!reduce && inner) {
                gsap.to(inner, { scale: 1.025, duration: 0.18, ease: "power2.out", overwrite: "auto" });
              }
            });
            const leave = safe(() => {
              gsap.set(node, { zIndex: 12 });
              if (!reduce && inner) {
                gsap.to(inner, { scale: 1, duration: 0.18, ease: "power2.out", overwrite: "auto" });
              }
            });
            node.addEventListener("pointerenter", enter);
            node.addEventListener("pointerleave", leave);
            node.addEventListener("focusin", enter);
            node.addEventListener("focusout", leave);
            return () => {
              node.removeEventListener("pointerenter", enter);
              node.removeEventListener("pointerleave", leave);
              node.removeEventListener("focusin", enter);
              node.removeEventListener("focusout", leave);
            };
          });

          if (reduce) return () => cleanups.forEach((fn) => fn());

          const inners = nodes
            .map((node) => node.querySelector<HTMLElement>(".orbit-box-inner"))
            .filter((node): node is HTMLElement => Boolean(node));
          gsap.from(inners, {
            scale: 0.96,
            autoAlpha: 0,
            duration: 0.35,
            stagger: { each: 0.02, from: "center" },
            ease: "power1.out",
            overwrite: "auto",
          });

          ScrollTrigger.create({
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            invalidateOnRefresh: true,
            onRefresh: (self) => apply(self.progress),
            onUpdate: (self) => apply(self.progress),
          });

          return () => cleanups.forEach((fn) => fn());
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [boxes.length] },
  );

  return (
    <section ref={rootRef} className="relative h-[120svh]">
      <div className="hero-grid sticky top-0 min-h-[100svh] overflow-hidden text-white">
        <h1 className="sr-only">Tiger Studio</h1>
        <div className="relative isolate mx-auto flex min-h-[100svh] w-full max-w-none items-center justify-center px-5 py-16">
          {boxes.map((box, index) => {
            const width =
              box.kind === "commit" ? 160 : box.kind === "language" ? languageWidth(box.title) : 118;
            const tilt = box.ring === "inner" ? 0 : ((index * 31) % 5) - 2;
            const className = `orbit-box absolute left-1/2 top-1/2 block shadow-[0_12px_32px_rgba(0,0,0,0.2)] ${
              BOX_COLORS[index % BOX_COLORS.length]
            } ${box.kind === "stat" ? "uppercase tracking-wide" : ""}`;
            const style = {
              width,
              padding: 12,
              transform: initialTransform(box, tilt),
            };
            const inner = (
              <span className="orbit-box-inner">
                <span className="block text-[0.62em] font-semibold uppercase tracking-[0.16em] opacity-70">
                  {box.kicker}
                </span>
                <span
                  className={`mt-1 block font-bold leading-tight ${
                    box.kind === "commit"
                      ? "line-clamp-2 normal-case tracking-normal"
                      : "whitespace-nowrap italic"
                  }`}
                  style={{ fontSize: box.kind === "commit" ? 15 : 16 }}
                >
                  {box.title}
                </span>
                {box.meta ? (
                  <span className="mt-2 block text-[0.72em] font-semibold leading-snug opacity-75">
                    {box.meta}
                  </span>
                ) : null}
              </span>
            );

            if (box.href) {
              const external = box.href.startsWith("http");
              return (
                <a
                  key={box.id}
                  href={box.href}
                  className={className}
                  data-ring={box.ring}
                  data-slot={String(box.slot)}
                  data-slot-count={String(box.slotCount)}
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
                data-ring={box.ring}
                data-slot={String(box.slot)}
                data-slot-count={String(box.slotCount)}
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
            className="orbit-logo relative z-20 aspect-square w-28 border-2 border-white bg-brand-red sm:w-36"
          />
        </div>
      </div>
    </section>
  );
}
