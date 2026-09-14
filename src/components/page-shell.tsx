import { Reveal } from "@/components/reveal";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`mx-auto w-full max-w-6xl px-5 py-10 ${className ?? ""}`}>
      {children}
    </Reveal>
  );
}
