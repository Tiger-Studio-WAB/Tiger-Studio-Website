import type { ReactNode } from "react";

type Props = {
  kicker?: string;
  title: ReactNode;
  lede?: string;
};

export function PageHero({ kicker, title, lede }: Props) {
  return (
    <header className="page-band">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
        {kicker ? <p className="hero-kicker text-sm font-semibold text-brand-red">{kicker}</p> : null}
        <h1 className="hero-title mt-3 text-[clamp(2.15rem,4.2vw,3.35rem)] font-bold leading-[1.15]">{title}</h1>
        {lede ? (
          <p className="hero-lede mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{lede}</p>
        ) : null}
      </div>
    </header>
  );
}
