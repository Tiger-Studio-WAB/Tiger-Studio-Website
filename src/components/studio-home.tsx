import Image from "next/image";
import Link from "next/link";
import { fill, type UiCopy } from "@/lib/i18n";

function formatCount(value: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

export function StudioHome({
  copy,
  motto,
  commitCount,
  pullRequestCount,
}: {
  copy: UiCopy;
  motto: string;
  commitCount: number;
  pullRequestCount: number;
}) {
  const cards = [
    {
      href: "/products",
      title: copy.products,
      body: copy.homeProductsBody,
      image: "/studio/desk.jpg",
      alt: "A laptop open on a wooden desk",
    },
    {
      href: "/about",
      title: copy.about,
      body: copy.homeAboutBody,
      image: "/studio/together.jpg",
      alt: "People gathered around a laptop",
    },
    {
      href: "/join",
      title: copy.join,
      body: copy.homeJoinBody,
      image: "/studio/hero.jpg",
      alt: "Students working together at a table",
    },
    {
      href: "/help",
      title: copy.help,
      body: copy.homeHelpBody,
      image: "/studio/build.jpg",
      alt: "Code on a laptop screen",
    },
  ];

  const stats = [
    commitCount > 0 ? fill(copy.orbitCommits, { count: formatCount(commitCount) }) : null,
    pullRequestCount > 0 ? fill(copy.orbitPullRequests, { count: formatCount(pullRequestCount) }) : null,
  ].filter((item): item is string => Boolean(item));

  return (
    <>
      <section className="studio-hero">
        <Image
          src="/studio/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0e2034]/55" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">{motto}</p>
          <h1 className="mt-4 text-[clamp(2.7rem,6vw,4.25rem)] font-bold leading-[1.08]">{copy.brand}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/92 md:text-xl">{copy.tagline}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/products" className="btn btn-red">
              {copy.products}
            </Link>
            <Link href="/join" className="btn btn-ghost">
              {copy.join}
            </Link>
          </div>
        </div>
        <svg className="studio-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 52C220 92 420 8 720 36C1020 64 1220 18 1440 48V90H0Z"
            fill="#f3f4f8"
          />
        </svg>
      </section>

      <section className="band bg-mist">
        <div className="mx-auto max-w-[46rem] px-6 text-center">
          <h2>{copy.aboutTitle}</h2>
          <p className="mt-5 text-muted-foreground">{copy.aboutP1}</p>
          {stats.length ? <p className="band-note mt-6 font-semibold text-ink">{stats.join(" · ")}</p> : null}
        </div>
      </section>

      <section className="band bg-white">
        <div className="px-6">
        <div className="split-panel mx-auto grid max-w-6xl md:grid-cols-2">
          <div className="order-2 flex flex-col justify-center p-8 md:order-1 md:p-14">
            <h2>{copy.productsTitle}</h2>
            <p className="mt-4 text-muted-foreground">{copy.aboutP2}</p>
            <p className="mt-3 text-muted-foreground">{copy.productsLede}</p>
            <Link href="/products" className="btn btn-red mt-7 self-start">
              {copy.products}
            </Link>
          </div>
          <div className="relative order-1 min-h-72 md:order-2">
            <Image
              src="/studio/build.jpg"
              alt="Code on a laptop screen"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        </div>
      </section>

      <section className="band bg-warm">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2>{copy.joinTitle}</h2>
            <p className="mt-3 text-muted-foreground">{copy.joinLede}</p>
          </div>
          <Link href="/join" className="btn btn-red shrink-0">
            {copy.join}
          </Link>
        </div>
      </section>

      <section className="band bg-mist">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-center">{copy.aboutHowTitle}</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <Link key={card.href} href={card.href} className="studio-card">
                <div className="relative h-44">
                  <Image src={card.image} alt={card.alt} fill sizes="(min-width: 1280px) 25vw, 50vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[1.35rem] leading-snug">{card.title}</h3>
                  <p className="mt-3 flex-1 text-base leading-7 text-muted-foreground">{card.body}</p>
                  <span className="mt-5 text-sm font-semibold text-brand-red">{copy.readMore}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
