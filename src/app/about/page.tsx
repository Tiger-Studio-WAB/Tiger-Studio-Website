import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tiger Studio is a student passion club. This website is the public hub for products, ideas, and pointers out to the sites that own the work.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero kicker="About" title="A studio with a public doorway" lede={site.tagline} />
      <PageShell>
        <article className="prose-studio max-w-2xl text-lg leading-relaxed">
          <p>
            Tiger Studio is a student passion club. We make, publish, and ship work across several
            homes on the web instead of a single feed.
          </p>
          <p>
            This website is the club&apos;s front door. Products live on GitHub and other destinations.
            Join is the ideas board — post something you want help with, and people can reply.
          </p>
          <h2 className="mt-12 text-3xl font-bold italic">How the hub is organized</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base">
            <li>
              <strong>Products</strong> lists public repositories and studio tools.
            </li>
            <li>
              <strong>Join</strong> is Proj.Help: ideas, replies, and English/Chinese translation.
            </li>
            <li>
              <strong>Docs</strong> will point at a docs repository once that repo exists.
            </li>
          </ul>
        </article>
      </PageShell>
    </>
  );
}
