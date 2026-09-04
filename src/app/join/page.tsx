import type { Metadata } from "next";
import Link from "next/link";
import { MicrosoftSignIn } from "@/components/microsoft-sign-in";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { getSessionUser } from "@/lib/auth";
import { getCopy } from "@/lib/locale";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join",
  description: "Join Tiger Studio. Post ideas, reply if you can help, and ship on GitHub.",
};

export default async function JoinPage() {
  const [{ copy }, user] = await Promise.all([getCopy(), getSessionUser()]);
  const configured = isSupabaseConfigured();

  return (
    <>
      <PageHero
        kicker="Join"
        title="Post an idea. Ask for help."
        lede="Proj.Help lives on this site now. Sign in with a school Microsoft account, then publish an idea or reply to someone else's."
      />
      <PageShell>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <HowRow color="bg-brand-red" text={copy.howPost} />
            <HowRow color="bg-brand-blue" text={copy.howReply} />
            <HowRow color="bg-brand-yellow" text={copy.howTranslate} />
            <p className="text-sm leading-7 text-muted-foreground">
              Club work still happens on GitHub. The ideas board is for asking, matching, and
              translating. Repositories stay the record of what shipped.
            </p>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand-red hover:underline"
            >
              Open GitHub →
            </a>
          </div>
          <aside className="panel p-6">
            <h2 className="text-2xl font-bold italic">{copy.signIn}</h2>
            <span className="rule-yellow mt-3" />
            <p className="mt-4 text-sm leading-7">{copy.restricted}</p>
            <div className="mt-6">
              {user ? (
                <Link href="/ideas" className="btn btn-red">
                  {copy.browseCta}
                </Link>
              ) : (
                <MicrosoftSignIn label={copy.signIn} nextPath="/ideas" disabled={!configured} />
              )}
            </div>
            {!configured && !user ? (
              <p className="mt-4 text-sm text-brand-red">{copy.setupNeeded}</p>
            ) : null}
          </aside>
        </div>
      </PageShell>
    </>
  );
}

function HowRow({ color, text }: { color: string; text: string }) {
  return (
    <p className="flex items-start gap-3 text-base leading-7">
      <span className={`swatch mt-1.5 ${color}`} />
      <span>{text}</span>
    </p>
  );
}
