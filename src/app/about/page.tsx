import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tiger Studio is a student passion club. This website is the public hub that points to news, changelogs, and other destinations.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About the club"
        title={
          <>
            A studio with a public <strong>doorway</strong>
          </>
        }
        lede={site.tagline}
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_0.8fr] md:px-8">
        <article className="prose-studio max-w-2xl text-lg leading-relaxed text-navy">
          <p>
            Tiger Studio is a student passion club. We make, publish, and ship work the way many
            organizations do — across several homes on the web instead of a single feed.
          </p>
          <p>
            This website is the club&apos;s front door. Underneath the layout is a hub. Each story,
            changelog, and destination is a pointer to another site.
          </p>
          <h2 className="mt-12 text-3xl font-medium">Why we point instead of republish</h2>
          <p className="mt-4">
            GitHub already keeps a perfect history of commits and releases. Other studio projects
            will have their own URLs. Rather than copy that material here, Tiger Studio links out —
            so the original page stays canonical, and visitors always read the latest version.
          </p>
          <h2 className="mt-12 text-3xl font-medium">How the hub is organized</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base">
            <li>
              <strong>News</strong> gathers studio notes and project mentions from the sites that
              published them.
            </li>
            <li>
              <strong>Changelog</strong> tracks repositories and origin commits on GitHub.
            </li>
            <li>
              <strong>Destinations</strong> is a directory of the websites we ask people to visit.
            </li>
          </ul>
          <p className="mt-8">
            News, changelogs, and project destinations are loaded live from GitHub. Create a public
            repository, open an issue, or merge a pull request and this hub will point to it after
            the next refresh.
          </p>
        </article>
        <aside className="h-fit bg-navy p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-studio-gold">Studio</p>
          <p className="mt-4 text-2xl font-semibold">{site.name}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            {site.motto}. The working record lives on GitHub — this site is the public doorway.
          </p>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-semibold text-studio-gold hover:text-white"
          >
            Open GitHub →
          </a>
        </aside>
      </div>
    </>
  );
}
