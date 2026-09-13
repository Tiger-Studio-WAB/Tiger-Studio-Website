import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { getCopy } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getCopy();
  return { title: copy.about, description: copy.tagline };
}

export default async function AboutPage() {
  const { copy } = await getCopy();

  return (
    <>
      <PageHero kicker={copy.aboutKicker} title={copy.aboutTitle} lede={copy.tagline} />
      <PageShell>
        <article className="prose-studio max-w-2xl text-lg leading-relaxed">
          <p>{copy.aboutP1}</p>
          <p>{copy.aboutP2}</p>
          <h2 className="mt-12 text-3xl font-bold italic">{copy.aboutHowTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base">
            <li>
              <strong>{copy.products}</strong> {copy.aboutProducts}
            </li>
            <li>
              <strong>{copy.join}</strong> {copy.aboutJoin}
            </li>
            <li>
              <strong>{copy.docs}</strong> {copy.aboutDocs}
            </li>
            <li>
              <strong>{copy.help}</strong> {copy.aboutHelp}
            </li>
            <li>
              <strong>{copy.support}</strong> {copy.aboutSupport}
            </li>
            <li>
              <strong>{copy.news}</strong> {copy.aboutNews}
            </li>
          </ul>
        </article>
      </PageShell>
    </>
  );
}
