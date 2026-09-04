import type { Metadata } from "next";
import { ChangelogItem } from "@/components/changelog-item";
import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { getHub } from "@/lib/hub";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Tiger Studio changelog pointers — repositories, origin commits, and release notes hosted on GitHub.",
};

export default async function ChangelogPage() {
  const hub = await getHub();

  return (
    <>
      <PageHero
        kicker="Studio changelog"
        title="What changed, where it lives"
        lede="This timeline is generated from GitHub events — pushes, pull requests, tags, and releases — and refreshed automatically."
      />
      <div className="mx-auto max-w-5xl px-5 py-12 md:px-8">
        <p className="mb-4 text-sm text-studio-muted">
          Canonical history:{" "}
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-studio-blue hover:text-studio-red"
          >
            GitHub organization
          </a>
        </p>
        {hub.changelog.length ? (
          <ol>
            {hub.changelog.map((pointer) => (
              <ChangelogItem key={pointer.slug} pointer={pointer} />
            ))}
          </ol>
        ) : (
          <EmptyState
            title="No changelog events yet"
            body="Pushes, pull requests, and releases from the studio organization will appear here."
          />
        )}
      </div>
    </>
  );
}
