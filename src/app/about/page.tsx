import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Tiger Studio is a passion club of ${site.affiliation}. This website is the public hub that points to news, changelogs, and other destinations.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About the club"
        title={
          <>
            A WAB passion club with a public <strong>doorway</strong>
          </>
        }
        lede={site.tagline}
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_0.8fr] md:px-8">
        <article className="prose-wab max-w-2xl text-lg leading-relaxed text-navy">
          <p>
            Tiger Studio is a student passion club at the Western Academy of Beijing. We make,
            publish, and ship work the way many organizations do — across several homes on the web
            instead of a single feed.
          </p>
          <p>
            This website is the club&apos;s front door. It is designed to feel like WAB: the navy
            and gold, the three-bar mark, the generous type, the news cards, and the campus footer.
            Underneath that familiar frame is a hub. Each story, changelog, and destination is a
            pointer to another site.
          </p>
          <h2 className="mt-12 text-3xl font-medium">Why we point instead of republish</h2>
          <p className="mt-4">
            WAB already publishes learning news. GitHub already keeps a perfect history of commits
            and releases. Other club projects will have their own URLs. Rather than copy that
            material here, Tiger Studio links out — so the original page stays canonical, and
            visitors always read the latest version.
          </p>
          <h2 className="mt-12 text-3xl font-medium">How the hub is organized</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base">
            <li>
              <strong>News</strong> gathers campus and club stories from WAB Learning News and
              related posts.
            </li>
            <li>
              <strong>Changelog</strong> tracks repositories and origin commits on GitHub.
            </li>
            <li>
              <strong>Destinations</strong> is a directory of the websites we ask people to visit.
            </li>
          </ul>
          <p className="mt-8">
            New pointers are added in <code className="bg-wab-soft px-1.5 py-0.5 text-[0.95em]">src/lib/content.ts</code>
            . Point to a URL, name the source, and the card appears on the right page.
          </p>
        </article>
        <aside className="h-fit bg-navy p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-wab-gold">Affiliation</p>
          <p className="mt-4 text-2xl font-semibold">{site.affiliation}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            {site.motto}. Learning at WAB is intentional, iterative, challenging, and joyful. Tiger
            Studio takes that same charge into making and sharing work.
          </p>
          <a
            href={site.links.wab}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-semibold text-wab-gold hover:text-white"
          >
            Visit wab.edu →
          </a>
        </aside>
      </div>
    </>
  );
}
