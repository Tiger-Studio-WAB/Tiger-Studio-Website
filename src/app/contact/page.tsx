import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Tiger Studio through GitHub.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Join us"
        title="Contact the studio"
        lede="For club work, start on GitHub. Repositories, issues, and pull requests are the working record."
      />
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <section className="border border-studio-line p-8">
          <h2 className="text-2xl font-semibold text-navy">Studio</h2>
          <p className="mt-4 leading-relaxed text-studio-muted">
            If you want to contribute a pointer, a project, or a changelog entry, open a conversation
            on GitHub.
          </p>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-studio-red"
          >
            Open GitHub
          </a>
        </section>
      </div>
    </>
  );
}
