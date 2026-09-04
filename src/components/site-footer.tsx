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
          <p className="mt-4 text-sm font-semibold text-wab-gold">{site.motto}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-wab-gold">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-wab-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-wab-gold">Campus</h2>
          <address className="mt-4 not-italic text-sm leading-relaxed text-white/80">
            {site.affiliation}
            <br />
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.city}
            <br />
            {site.address.postal}
            <br />
            <a href={`tel:${site.address.phone.replace(/\s/g, "")}`} className="mt-3 inline-block hover:text-wab-gold">
              {site.address.phone}
            </a>
          </address>
          <div className="mt-6 flex flex-col gap-2 text-sm">
            <a href={site.links.wab} target="_blank" rel="noopener noreferrer" className="hover:text-wab-gold">
              WAB website →
            </a>
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-wab-gold">
              GitHub →
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/50 md:px-8">
        © {new Date().getFullYear()} {site.name}. A passion club of {site.affiliation}.
      </div>
    </footer>
  );
}
