"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Logo, MenuGlyph } from "@/components/logo";
import { nav, utilityNav } from "@/lib/content";
import { searchHub, type SearchHit } from "@/lib/search";
import { hostname } from "@/lib/format";
import type { Destination, Pointer } from "@/lib/types";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-studio-line bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Logo />
        <div className="flex items-center gap-2 md:gap-4">
          <nav aria-label="Header Utility" className="hidden items-center gap-5 text-sm font-semibold text-navy lg:flex">
            {utilityNav.map((item) =>
              item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-studio-red">
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className="hover:text-studio-red">
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-studio-line text-navy hover:border-navy"
            onClick={() => {
              setSearchOpen(true);
              setMenuOpen(false);
            }}
            aria-label="Open Search"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center"
            onClick={() => {
              setMenuOpen(true);
              setSearchOpen(false);
            }}
            aria-label="Open Menu Overlay"
          >
            <MenuGlyph className="h-14 w-14" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
            <Logo />
            <button
              type="button"
              className="text-sm font-semibold uppercase tracking-[0.16em] text-navy"
              onClick={() => setMenuOpen(false)}
            >
              Close the offcanvas menu
            </button>
          </div>
          <nav aria-label="Primary" className="mx-auto grid max-w-5xl gap-2 px-6 py-10 md:grid-cols-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-studio-line py-5 text-4xl font-medium text-navy hover:text-studio-red md:text-5xl"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mx-auto flex max-w-5xl flex-wrap gap-6 px-6 pb-16 text-sm font-semibold">
            {utilityNav.map((item) =>
              item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="text-studio-blue">
                  {item.label} →
                </a>
              ) : (
                <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="text-studio-blue">
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </div>
      ) : null}

      {searchOpen ? <SearchOverlay onClose={() => setSearchOpen(false)} /> : null}
    </header>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [pointers, setPointers] = useState<Pointer[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/feed")
      .then((response) => response.json())
      .then((payload: { pointers?: Pointer[]; destinations?: Destination[] }) => {
        if (cancelled) return;
        setPointers(payload.pointers ?? []);
        setDestinations(payload.destinations ?? []);
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(
    () => searchHub(query, pointers, destinations),
    [query, pointers, destinations],
  );

  return (
    <div className="fixed inset-0 z-50 bg-navy/40">
      <div className="mx-auto mt-8 max-w-3xl px-4">
        <div className="bg-white p-6 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-studio-red">Search</p>
            <button type="button" className="text-sm font-semibold text-navy" onClick={onClose}>
              Clear
            </button>
          </div>
          <label htmlFor="site-search" className="sr-only">
            Search
          </label>
          <input
            id="site-search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="search for something..."
            className="w-full border-b-2 border-navy bg-transparent py-3 text-2xl text-navy outline-none placeholder:text-studio-muted"
          />
          <div className="mt-6 max-h-[60vh] overflow-y-auto">
            {query && results.length === 0 ? (
              <p className="text-studio-muted">
                {ready ? "No matching news, changelogs, or destinations." : "Loading live results…"}
              </p>
            ) : (
              <ul className="divide-y divide-studio-line">
                {results.map((hit) => (
                  <li key={hitKey(hit)}>
                    <SearchResult hit={hit} onNavigate={onClose} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchResult({ hit, onNavigate }: { hit: SearchHit; onNavigate: () => void }) {
  if (hit.type === "destination") {
    return (
      <a
        href={hit.item.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className="block py-4 hover:bg-studio-soft"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-studio-muted">
          Destination · {hit.item.category}
        </p>
        <p className="mt-1 text-lg font-semibold text-navy">{hit.item.name}</p>
        <p className="text-sm text-studio-blue">{hostname(hit.item.url)} →</p>
      </a>
    );
  }

  return (
    <a
      href={hit.item.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className="block py-4 hover:bg-studio-soft"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-studio-muted">
        {hit.item.kind} · {hit.item.source}
      </p>
      <p className="mt-1 text-lg font-semibold text-navy">{hit.item.title}</p>
      <p className="text-sm text-studio-blue">{hostname(hit.item.url)} →</p>
    </a>
  );
}

function hitKey(hit: SearchHit) {
  return hit.type === "destination" ? `d-${hit.item.slug}` : `p-${hit.item.slug}`;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
