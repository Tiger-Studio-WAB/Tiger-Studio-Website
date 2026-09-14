"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { UiCopy } from "@/lib/i18n";
import type { Destination } from "@/lib/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Beat = {
  src?: string;
  tiles?: boolean;
  contain?: boolean;
  alt: string;
  body: string;
  bullets?: { title?: string; text: string }[];
};

type Story = {
  id: string;
  titleId: string;
  title: string;
  href: string;
  hrefLabel: string;
  tone: "fog" | "ink" | "yellow";
  beats: Beat[];
};

export function HomeStory({
  copy,
  products,
}: {
  copy: UiCopy;
  products: Destination[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  const stories: Story[] = [
    {
      id: "products",
      titleId: "home-products-title",
      title: copy.productsTitle,
      href: "/products",
      hrefLabel: `${copy.products} →`,
      tone: "fog",
      beats: [
        {
          src: "/home/join.png",
          alt: copy.productsHelpName,
          body: copy.productsHelpBody,
          bullets: [
            { text: copy.howPost },
            { text: copy.howReply },
            { text: copy.howTranslate },
          ],
        },
        {
          src: "/home/news-cover.png",
          alt: copy.newsTitle,
          body: copy.productsLede,
          bullets: [{ title: copy.productsBoard, text: copy.homeJoinBody }],
        },
        {
          src: "/home/godot-icon.svg",
          contain: true,
          alt: products[0]?.name || copy.productsPublic,
          body: copy.homeProductsBody,
          bullets: products.slice(0, 4).map((item) => ({
            title: item.name,
            text: item.description,
          })),
        },
      ],
    },
    {
      id: "about",
      titleId: "home-about-title",
      title: copy.aboutTitle,
      href: "/about",
      hrefLabel: `${copy.about} →`,
      tone: "ink",
      beats: [
        {
          src: "/home/orbit.png",
          alt: copy.aboutTitle,
          body: copy.aboutP1,
        },
        {
          src: "/home/docs.png",
          alt: copy.docs,
          body: copy.aboutP2,
          bullets: [
            { title: copy.products, text: copy.aboutProducts },
            { title: copy.docs, text: copy.aboutDocs },
          ],
        },
        {
          src: "/home/help.png",
          alt: copy.help,
          body: copy.aboutHelp,
          bullets: [
            { title: copy.join, text: copy.aboutJoin },
            { title: copy.news, text: copy.aboutNews },
          ],
        },
      ],
    },
    {
      id: "values",
      titleId: "home-values-title",
      title: copy.motto,
      href: "/about",
      hrefLabel: `${copy.about} →`,
      tone: "yellow",
      beats: [
        {
          tiles: true,
          alt: copy.valueMake,
          body: copy.aboutP1,
          bullets: [{ title: copy.valueMake, text: copy.homeProductsBody }],
        },
        {
          src: "/home/news-cover.png",
          alt: copy.valueShip,
          body: copy.homeProductsBody,
          bullets: [{ title: copy.valueShip, text: copy.productsLede }],
        },
        {
          src: "/home/join.png",
          alt: copy.valueShare,
          body: copy.aboutP2,
          bullets: [{ title: copy.valueShare, text: copy.aboutNews }],
        },
      ],
    },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const desktop = Boolean(context.conditions?.isDesktop);
          const reduce = Boolean(context.conditions?.reduceMotion);
          const sections = gsap.utils.toArray<HTMLElement>(".home-pin");
          const refreshInits: Array<() => void> = [];

          sections.forEach((section) => {
            const frame = section.querySelector<HTMLElement>(".home-pin-frame");
            const inner = section.querySelector<HTMLElement>(".home-pin-inner");
            const shots = gsap.utils.toArray<HTMLElement>(section.querySelectorAll(".home-pin-shot"));
            const beats = gsap.utils.toArray<HTMLElement>(section.querySelectorAll(".home-pin-beat"));
            if (!frame || !inner) return;

            if (!desktop) return;

            const overflowY = () => {
              const styles = getComputedStyle(frame);
              const pad = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
              return Math.max(0, inner.scrollHeight - (frame.clientHeight - pad));
            };

            const applyHeight = () => {
              const overflow = overflowY();
              const beatCount = Math.max(1, shots.length);
              const hold = Math.round(window.innerHeight * (overflow > 0 ? 0.55 : 0.85) * beatCount);
              section.style.height = `${window.innerHeight + overflow + hold}px`;
            };

            applyHeight();
            refreshInits.push(applyHeight);
            ScrollTrigger.addEventListener("refreshInit", applyHeight);

            const fade = reduce ? 0 : 0.28;
            let current = 0;

            const showBeat = (next: number) => {
              shots.forEach((shot, index) => {
                const on = index === next;
                shot.classList.toggle("is-active", on);
                shot.toggleAttribute("aria-hidden", !on);
                gsap.to(shot, { opacity: on ? 1 : 0, duration: fade, ease: "power1.out", overwrite: "auto" });
              });
              beats.forEach((beat, index) => {
                const on = index === next;
                beat.classList.toggle("is-active", on);
                beat.toggleAttribute("aria-hidden", !on);
                gsap.to(beat, { opacity: on ? 1 : 0, duration: fade, ease: "power1.out", overwrite: "auto" });
              });
            };

            showBeat(0);

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: reduce ? true : 0.45,
                invalidateOnRefresh: true,
                onRefresh: (self) => {
                  const count = Math.max(1, shots.length);
                  current = Math.min(count - 1, Math.floor(self.progress * count + 1e-6));
                  showBeat(current);
                },
                onUpdate: (self) => {
                  const count = Math.max(1, shots.length);
                  const next = Math.min(count - 1, Math.floor(self.progress * count + 1e-6));
                  if (next === current) return;
                  current = next;
                  showBeat(next);
                },
              },
            });

            tl.to(inner, { y: () => -overflowY(), duration: 1 }, 0);
          });

          return () => {
            refreshInits.forEach((applyHeight) => {
              ScrollTrigger.removeEventListener("refreshInit", applyHeight);
            });
            sections.forEach((section) => {
              section.style.removeProperty("height");
              section.querySelectorAll(".home-pin-shot, .home-pin-beat").forEach((node) => {
                node.removeAttribute("aria-hidden");
              });
            });
          };
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [products.length] },
  );

  return (
    <div ref={rootRef}>
      {stories.map((story) => (
        <section
          key={story.id}
          className={`home-pin home-pin--${story.tone}`}
          aria-labelledby={story.titleId}
        >
          <div className="home-pin-frame">
            <div className="home-pin-inner">
              <h2 id={story.titleId} className="home-pin-title">
                {story.title}
              </h2>
              <span className="rule-yellow mt-4" />
              <div className="home-pin-stage">
                {story.beats.map((beat, index) => (
                  <StoryBeat key={`${story.id}-${index}`} beat={beat} active={index === 0} />
                ))}
              </div>
              <Link
                href={story.href}
                className={`home-pin-link${story.tone === "ink" ? " home-pin-link--on-dark" : ""}`}
              >
                {story.hrefLabel}
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function StoryBeat({ beat, active }: { beat: Beat; active: boolean }) {
  return (
    <>
      <figure className={`home-pin-shot${active ? " is-active" : ""}`}>
        {beat.tiles ? (
          <div className="home-pin-tiles" role="img" aria-label={beat.alt} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={beat.src}
            alt={beat.alt}
            className={beat.contain ? "is-contain" : undefined}
          />
        )}
      </figure>
      <div className={`home-pin-beat${active ? " is-active" : ""}`}>
        <p className="home-pin-lede">{beat.body}</p>
        {beat.bullets?.length ? (
          <ul className="home-pin-bullets">
            {beat.bullets.map((item) => (
              <li key={`${item.title ?? ""}-${item.text.slice(0, 24)}`}>
                {item.title ? <strong>{item.title}</strong> : null}
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}
