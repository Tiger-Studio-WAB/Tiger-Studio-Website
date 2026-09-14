"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StudioLink } from "@/components/studio-link";
import type { UiCopy } from "@/lib/i18n";
import type { Destination } from "@/lib/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomeStory({
  copy,
  products,
}: {
  copy: UiCopy;
  products: Destination[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);

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

          sections.forEach((section) => {
            const frame = section.querySelector<HTMLElement>(".home-pin-frame");
            const inner = section.querySelector<HTMLElement>(".home-pin-inner");
            const items = section.querySelectorAll<HTMLElement>(".home-pin-item");
            if (!frame || !inner) return;

            if (!desktop) {
              if (reduce || !items.length) return;
              gsap.from(items, {
                y: 16,
                duration: 0.36,
                stagger: 0.06,
                ease: "power1.out",
                clearProps: "transform",
                scrollTrigger: {
                  trigger: section,
                  start: "top 86%",
                  once: true,
                },
              });
              return;
            }

            const overflowY = () => {
              const styles = getComputedStyle(frame);
              const pad =
                parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
              return Math.max(0, inner.scrollHeight - (frame.clientHeight - pad));
            };

            const applyHeight = () => {
              gsap.set(inner, { y: 0 });
              const overflow = overflowY();
              const hold = Math.round(window.innerHeight * (overflow > 0 ? 0.4 : 0.8));
              section.style.height = `${window.innerHeight + overflow + hold}px`;
            };

            applyHeight();

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: reduce ? true : 0.55,
                invalidateOnRefresh: true,
                onRefresh: applyHeight,
              },
            });

            tl.to(inner, { y: () => -overflowY(), duration: 1 }, 0);

            if (!reduce && items.length) {
              tl.from(
                items,
                {
                  y: 28,
                  duration: 0.35,
                  stagger: 0.08,
                },
                0,
              );
            }
          });

          return () => {
            sections.forEach((section) => {
              section.style.removeProperty("height");
            });
          };
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [products.length] },
  );

  const hubHow = [
    { title: copy.products, body: copy.aboutProducts },
    { title: copy.join, body: copy.aboutJoin },
    { title: copy.help, body: copy.aboutHelp },
    { title: copy.news, body: copy.aboutNews },
  ];

  const values = [
    { title: copy.valueMake, body: copy.aboutP1 },
    { title: copy.valueShip, body: copy.homeProductsBody },
    { title: copy.valueShare, body: copy.aboutP2 },
  ];

  return (
    <div ref={rootRef}>
      <section className="home-pin home-pin--products" aria-labelledby="home-products-title">
        <div className="home-pin-frame">
          <div className="home-pin-inner home-pin-split">
            <div className="home-pin-copy">
              <p className="home-pin-kicker">{copy.productsKicker}</p>
              <h2 id="home-products-title" className="home-pin-title">
                {copy.productsTitle}
              </h2>
              <span className="rule-yellow mt-4" />
              <p className="home-pin-lede">{copy.productsLede}</p>
              <Link href="/products" className="home-pin-link">
                {copy.products} →
              </Link>
            </div>
            <div className="home-pin-cards">
              <article className="home-pin-item panel tap-card p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.06em] text-brand-red">
                  {copy.productsBoard}
                </p>
                <h3 className="mt-2 text-2xl font-bold italic">{copy.productsHelpName}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{copy.productsHelpBody}</p>
                <Link href="/join" className="btn btn-red mt-5">
                  {copy.productsOpenJoin}
                </Link>
              </article>
              {products.slice(0, 3).map((destination) => (
                <StudioLink
                  key={destination.slug}
                  href={destination.url}
                  className="home-pin-item panel tap-card p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                    {destination.category}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{destination.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{destination.description}</p>
                </StudioLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-pin home-pin--about" aria-labelledby="home-about-title">
        <div className="home-pin-frame">
          <div className="home-pin-inner home-pin-split">
            <div className="home-pin-copy">
              <p className="home-pin-kicker home-pin-kicker--on-dark">{copy.aboutKicker}</p>
              <h2 id="home-about-title" className="home-pin-title">
                {copy.aboutTitle}
              </h2>
              <span className="rule-yellow mt-4" />
              <p className="home-pin-lede home-pin-lede--on-dark">{copy.aboutP1}</p>
              <p className="home-pin-lede home-pin-lede--on-dark">{copy.aboutP2}</p>
              <Link href="/about" className="home-pin-link home-pin-link--on-dark">
                {copy.about} →
              </Link>
            </div>
            <div className="home-pin-cards">
              <p className="home-pin-kicker home-pin-kicker--on-dark">{copy.aboutHowTitle}</p>
              {hubHow.map((item) => (
                <article key={item.title} className="home-pin-item home-pin-dark-card">
                  <h3 className="text-xl font-bold italic">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/75">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-pin home-pin--values" aria-labelledby="home-values-title">
        <div className="home-pin-frame">
          <div className="home-pin-inner home-pin-values">
            <div className="home-pin-copy mx-auto max-w-3xl text-center">
              <p className="home-pin-kicker">{copy.valuesKicker}</p>
              <h2 id="home-values-title" className="home-pin-title">
                {copy.motto}
              </h2>
              <span className="rule-yellow mx-auto mt-4" />
              <p className="home-pin-lede mx-auto">{copy.tagline}</p>
            </div>
            <div className="home-pin-value-grid">
              {values.map((value) => (
                <article key={value.title} className="home-pin-item panel p-6">
                  <h3 className="text-3xl font-bold italic md:text-4xl">{value.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">{value.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
