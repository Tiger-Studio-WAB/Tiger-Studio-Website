import { AccentBars } from "@/components/color-rail";

type Props = {
  kicker?: string;
  title: React.ReactNode;
  lede?: string;
};

export function PageHero({ kicker, title, lede }: Props) {
  return (
    <header className="border-b border-wab-line bg-wab-soft">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <AccentBars />
        {kicker ? <p className="section-kicker mb-4">{kicker}</p> : null}
        <h1 className="max-w-4xl text-4xl font-medium leading-[1.1] tracking-tight text-navy md:text-6xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-wab-muted">{lede}</p>
        ) : null}
      </div>
    </header>
  );
}
