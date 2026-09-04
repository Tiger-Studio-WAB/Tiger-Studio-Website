import Link from "next/link";
import { Logo } from "@/components/logo";
import { ColorRail } from "@/components/color-rail";
import { nav } from "@/lib/content";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-white">
      <ColorRail />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <div className="brightness-0 invert">
            <Logo compact />
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">{site.tagline}</p>
          <p className="mt-4 text-sm font-semibold text-studio-gold">{site.motto}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-studio-gold">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-studio-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-studio-gold">Studio</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            Work happens on GitHub. This site is the public doorway.
          </p>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm hover:text-studio-gold"
          >
            GitHub →
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/50 md:px-8">
        © {new Date().getFullYear()} {site.name}.
      </div>
    </footer>
  );
}
