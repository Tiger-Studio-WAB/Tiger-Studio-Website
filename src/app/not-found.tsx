import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">404</p>
      <h1 className="mt-3 text-5xl font-bold italic">This page is not on the hub</h1>
      <span className="rule-yellow mt-4" />
      <p className="mt-5 text-lg text-muted-foreground">
        The path you asked for is not a Tiger Studio page.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/" className="btn btn-red">
          Back home
        </Link>
        <Link href="/products" className="btn btn-white border border-brand-red">
          Products
        </Link>
      </div>
    </div>
  );
}
