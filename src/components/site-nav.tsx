"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { LocaleLink as Link } from "@/components/locale-link";
import { SignOutButton } from "@/components/sign-out-button";
import { nav } from "@/lib/content";
import type { Profile } from "@/lib/help-types";
import type { UiCopy } from "@/lib/i18n";
import { stripLocalePath } from "@/lib/paths";

export function SiteNav({
  copy,
  profile,
  language,
  menuLanguage,
}: {
  copy: UiCopy;
  profile: Profile | null;
  language: ReactNode;
  menuLanguage: ReactNode;
}) {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const panelId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const labels: Record<string, string> = {
    "/products": copy.products,
    "/about": copy.about,
    "/join": copy.join,
    "/docs": copy.docs,
    "/help": copy.help,
    "/ideas": copy.ideas,
    "/me": copy.myBoard,
  };

  const items = [
    ...nav.map((item) => ({ href: item.href, label: labels[item.href] })),
    ...(profile
      ? [
          { href: "/ideas", label: copy.ideas },
          { href: "/me", label: copy.myBoard },
        ]
      : []),
  ];

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function active(href: string) {
    const current = stripLocalePath(pathname);
    return current === href || current.startsWith(`${href}/`);
  }

  return (
    <div className="ml-auto flex items-center gap-6">
      <nav className="site-nav site-nav-desktop items-center gap-5 text-base font-medium text-ink" aria-label="Primary">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={active(item.href) ? "is-active" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="site-header-tools text-sm font-semibold">
        <div className="hidden lg:block">
          {profile ? (
            <SignOutButton label={copy.signOut} />
          ) : (
            <Link href="/login" className="hover:text-brand-red">
              {copy.signIn}
            </Link>
          )}
        </div>
        {language}
        <button
          type="button"
          className="site-menu-button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpenPath(pathname)}
        >
          <span className="sr-only">{copy.menu}</span>
          <MenuIcon />
        </button>
      </div>
      {open ? (
        <div id={panelId} className="site-menu-overlay" role="dialog" aria-modal="true" aria-label={copy.menu}>
          <div className="flex h-[4.75rem] items-center justify-between">
            <p className="text-lg font-semibold tracking-wide">{copy.brand}</p>
            <div className="flex items-center gap-2">
              {menuLanguage}
              <button ref={closeRef} type="button" className="site-menu-button" onClick={() => setOpenPath(null)}>
                <span className="sr-only">{copy.menu}</span>
                <CloseIcon />
              </button>
            </div>
          </div>
          <nav className="mt-2" aria-label="Primary">
            {items.map((item) => (
              <Link key={item.href} href={item.href} className={active(item.href) ? "is-active" : undefined}>
                {item.label}
              </Link>
            ))}
            {profile ? null : (
              <Link href="/login" className={active("/login") ? "is-active" : undefined}>
                {copy.signIn}
              </Link>
            )}
          </nav>
          {profile ? (
            <div className="mt-6 text-base font-semibold">
              <SignOutButton label={copy.signOut} />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 6h16M3 11h16M3 16h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 5l12 12M17 5 5 17" strokeLinecap="round" />
    </svg>
  );
}
