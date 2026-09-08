"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LINKS = [
  { href: "/products", title: "Products", body: "Public projects the studio ships." },
  { href: "/about", title: "About", body: "What Tiger Studio is, and how the hub works." },
  { href: "/join", title: "Join", body: "Post ideas, reply, and ship with the club." },
  { href: "/docs", title: "Docs", body: "Handbook from folders and Markdown. Support is a separate page." },
];

export function HomeLinks() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const safe = contextSafe ?? ((fn: () => void) => fn);
      const mm = gsap.matchMedia();
      mm.add(
        { reduceMotion: "(prefers-reduced-motion: reduce)" },
        (context) => {
          const nodes = gsap.utils.toArray<HTMLElement>("a");
          const reduce = Boolean(context.conditions?.reduceMotion);
          if (!nodes.length) return;

          if (!reduce) {
            gsap.from(nodes, {
              y: 10,
              autoAlpha: 0,
              duration: 0.32,
              stagger: 0.04,
              ease: "power1.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: rootRef.current,
                start: "top 90%",
              },
            });
          }

          const cleanups = nodes.map((node) => {
            const enter = safe(() => {
              gsap.set(node, { zIndex: 6 });
            });
            const leave = safe(() => {
              gsap.set(node, { zIndex: 1 });
            });
            node.addEventListener("pointerenter", enter);
            node.addEventListener("pointerleave", leave);
            node.addEventListener("focus", enter);
            node.addEventListener("blur", leave);
            return () => {
              node.removeEventListener("pointerenter", enter);
              node.removeEventListener("pointerleave", leave);
              node.removeEventListener("focus", enter);
              node.removeEventListener("blur", leave);
            };
          });

          return () => cleanups.forEach((fn) => fn());
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="home-links isolate mx-auto grid w-full max-w-6xl gap-4 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4"
    >
      {LINKS.map((link) => (
        <Link key={link.href} href={link.href} className="panel lift-card p-5 hover:border-brand-red">
          <h2 className="text-xl font-bold italic">{link.title}</h2>
          <span className="rule-yellow mt-3 w-16" />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{link.body}</p>
        </Link>
      ))}
    </section>
  );
}
