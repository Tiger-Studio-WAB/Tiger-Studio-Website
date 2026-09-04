type Props = {
  kicker?: string;
  title: React.ReactNode;
  lede?: string;
};

export function PageHero({ kicker, title, lede }: Props) {
  return (
    <header className="hero-grid text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        {kicker ? <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{kicker}</p> : null}
        <h1 className="mt-3 max-w-4xl text-4xl font-bold italic leading-[1.1] md:text-6xl">{title}</h1>
        <span className="rule-yellow mt-4" />
        {lede ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">{lede}</p> : null}
      </div>
    </header>
  );
}
