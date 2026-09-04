import type { Metadata } from "next";
import { ChangelogItem } from "@/components/changelog-item";
import { PageHero } from "@/components/page-hero";
import { changelogPointers } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Tiger Studio changelog pointers — repositories, origin commits, and release notes hosted on GitHub.",
};

export default function ChangelogPage() {
  const entries = changelogPointers();

  return (
    <>
      <PageHero
        kicker="Studio changelog"
        title="What changed, where it lives"
        lede="Release notes stay on GitHub. This page is a timeline of pointers so visitors can see what shipped without leaving the club's public home empty."
      />
      <div className="mx-auto max-w-5xl px-5 py-12 md:px-8">
        <p className="mb-4 text-sm text-wab-muted">
          Canonical history:{" "}
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-wab-blue hover:text-wab-red"
          >
            github.com/Tiger-Studio-WAB
          </a>
        </p>
        <ol>{entries.map((pointer) => <ChangelogItem key={pointer.slug} pointer={pointer} />)}</ol>
      </div>
    </>
  );
}
