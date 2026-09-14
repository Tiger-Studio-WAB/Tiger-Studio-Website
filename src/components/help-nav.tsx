"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { UiCopy } from "@/lib/i18n";

gsap.registerPlugin(useGSAP);

const items = [
  { href: "/help", key: "helpNavHome" },
  { href: "/help/resources", key: "helpNavResources" },
  { href: "/help/share", key: "helpNavShare" },
  { href: "/docs", key: "docs" },
  { href: "/support", key: "support" },
  { href: "/join", key: "ideas" },
] as const;

export function HelpNav({ copy }: { copy: UiCopy }) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".help-nav-item", {
          y: 6,
          autoAlpha: 0,
          duration: 0.28,
          stagger: 0.03,
          ease: "power2.out",
          clearProps: "transform,opacity,visibility",
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <nav ref={rootRef} className="help-nav" aria-label={copy.help}>
      <div className="mx-auto flex w-full max-w-6xl flex-wrap gap-2 px-5 py-3">
        {items.map((item) => {
          const active =
            item.href === "/help"
              ? pathname === "/help"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`help-nav-item tap-chip ${active ? "is-active" : ""}`}
            >
              {copy[item.key]}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
