import { Reveal } from "@/components/reveal";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`mx-auto w-full max-w-6xl px-6 py-14 md:py-16 ${className ?? ""}`}>
      {children}
    </Reveal>
  );
}
