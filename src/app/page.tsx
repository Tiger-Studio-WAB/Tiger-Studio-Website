import Link from "next/link";
import { ColorRail } from "@/components/color-rail";
import { DestinationCard } from "@/components/destination-card";
import { PointerCard } from "@/components/pointer-card";
import { getHub } from "@/lib/hub";
import { site } from "@/lib/site";

export default async function HomePage() {
  const hub = await getHub();
  const latest = hub.pointers.slice(0, 4);
  const featured = hub.destinations.slice(0, 3);

  return (
    <>
      <JsonLd />
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 12% 20%, #2262d5 0, transparent 32%), radial-gradient(circle at 88% 10%, #e24b2d 0, transparent 28%), radial-gradient(circle at 70% 80%, #f4d348 0, transparent 26%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1.3fr_0.7fr] md:px-8 md:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-studio-gold">
              {site.name}
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">
              Build in public
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-white/80">{site.tagline}</p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
              Tiger Studio is a public doorway. We do not host every story here. News, changelogs,
              posts, and projects live on the websites that own them — and this hub points you there.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/destinations"
                className="bg-studio-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-white"
              >
                Browse destinations
              </Link>
              <Link
                href="/news"
                className="border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Latest news pointers
              </Link>
            </div>
          </div>
          <aside className="flex flex-col justify-end gap-3">
            <HeroTile href="/news" label="News" color="bg-studio-red" copy="Studio stories opened on the site that published them." />
            <HeroTile href="/changelog" label="Changelog" color="bg-studio-gold" copy="Release notes that live on GitHub." />
            <HeroTile href="/destinations" label="Destinations" color="bg-studio-cyan" copy="A directory of other websites." />
          </aside>
        </div>
        <ColorRail />
      </section>

      <section className="bg-studio-soft">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <p className="section-kicker">How we connect</p>
          <h2 className="mt-3 text-4xl font-medium text-navy md:text-5xl">
            How we <strong>point outward</strong>
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-studio-muted">
            Like any organization site, Tiger Studio has a home, an about page, news, a changelog,
            and a contact path. The difference is editorial: each post is a pointer. Follow it and
            you land on GitHub or another destination the studio actually uses.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <LearnCard
              href="/news"
              title="News"
              color="purple"
              body="Studio notes and project mentions — opened on the site that published them."
            />
            <LearnCard
              href="/changelog"
              title="Changelog"
              color="gold"
              body="Commits, repositories, and release history. GitHub remains the source of truth."
            />
            <LearnCard
              href="/destinations"
              title="Destinations"
              color="teal"
              body="A curated directory of engineering, tools, and community websites we keep close."
            />
          </div>
        </div>
      </section>

      <section className="border-y border-studio-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:grid-cols-2 md:grid-cols-4 md:px-8">
          {hub.stats.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-5xl font-semibold text-studio-red">{item.value}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-studio-muted">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="section-kicker">Studio news</p>
            <h2 className="mt-3 text-4xl font-medium text-navy">
              Latest <strong>pointers</strong>
            </h2>
          </div>
          <Link href="/news" className="hidden text-sm font-semibold text-studio-blue hover:text-studio-red md:inline">
            View all news →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {latest.length ? (
            latest.map((pointer) => <PointerCard key={pointer.slug} pointer={pointer} />)
          ) : (
            <p className="text-studio-muted">GitHub has not returned any pointers yet. Check back after the next refresh.</p>
          )}
        </div>
        <Link href="/news" className="mt-8 inline-block text-sm font-semibold text-studio-blue md:hidden">
          View all news →
        </Link>
      </section>

      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-studio-gold">Get Social</p>
          <h2 className="mt-3 text-4xl font-medium">
            Destinations we <strong>keep close</strong>
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Public GitHub repositories show up here as they are created. Tools the studio ships with
            sit alongside them. Every card leaves this site on purpose.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>
          <div className="mt-10">
            <Link href="/destinations" className="bg-studio-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-white">
              Open the full directory
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroTile({
  href,
  label,
  color,
  copy,
}: {
  href: string;
  label: string;
  color: string;
  copy: string;
}) {
  return (
    <Link href={href} className="flex overflow-hidden bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
      <span className={`w-2 ${color}`} />
      <span className="flex flex-col p-4">
        <span className="text-lg font-semibold">{label}</span>
        <span className="text-sm text-white/70">{copy}</span>
      </span>
    </Link>
  );
}

function LearnCard({
  href,
  title,
  color,
  body,
}: {
  href: string;
  title: string;
  color: "purple" | "gold" | "teal";
  body: string;
}) {
  const wash = {
    purple: "from-[#5b4d9a]/80",
    gold: "from-[#f4d348]/90",
    teal: "from-[#1f7a72]/80",
  }[color];

  return (
    <Link href={href} className="group relative min-h-[22rem] overflow-hidden bg-navy text-white">
      <div className={`absolute inset-0 bg-gradient-to-t ${wash} to-navy`} />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(135deg, transparent 0 40%, rgba(255,255,255,0.12) 40% 42%, transparent 42%), linear-gradient(45deg, transparent 0 70%, rgba(255,255,255,0.08) 70%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-end p-7">
        <h3 className="text-3xl font-semibold">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/85">{body}</p>
        <p className="mt-5 text-sm font-semibold">Go to the {title.toLowerCase()} page →</p>
      </div>
    </Link>
  );
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          description: site.description,
          url: site.url,
        }),
      }}
    />
  );
}
