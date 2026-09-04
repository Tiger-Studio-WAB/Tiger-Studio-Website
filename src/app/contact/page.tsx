import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Tiger Studio, a passion club of ${site.affiliation}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Join us"
        title="Contact the studio"
        lede="Tiger Studio is based on the WAB campus. For club work, start on GitHub. For school matters, use official WAB channels."
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:px-8">
        <section className="border border-wab-line p-8">
          <h2 className="text-2xl font-semibold text-navy">Studio</h2>
          <p className="mt-4 leading-relaxed text-wab-muted">
            Repositories, issues, and pull requests are the working record of the club. If you want
            to contribute a pointer, a project, or a changelog entry, open a conversation there.
          </p>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-wab-red"
          >
            Open GitHub
          </a>
        </section>
        <section className="border border-wab-line p-8">
          <h2 className="text-2xl font-semibold text-navy">Campus</h2>
          <address className="mt-4 not-italic leading-relaxed text-wab-muted">
            {site.affiliation}
            <br />
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.city} {site.address.postal}
            <br />
            {site.address.phone}
          </address>
          <a
            href={site.links.contactWab}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block border border-navy px-5 py-3 text-sm font-semibold text-navy hover:bg-navy hover:text-white"
          >
            WAB contact page
          </a>
        </section>
      </div>
    </>
  );
}
