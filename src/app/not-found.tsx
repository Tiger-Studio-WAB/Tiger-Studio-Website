import Link from "next/link";
import { AccentBars } from "@/components/color-rail";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 md:px-8">
      <AccentBars />
      <p className="section-kicker">404</p>
      <h1 className="mt-4 text-5xl font-medium text-navy">This page is not on the hub</h1>
      <p className="mt-4 text-lg text-studio-muted">
        The path you asked for is not a Tiger Studio page. Try the home hub, or jump to a
        destination we actually point to.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/" className="bg-navy px-5 py-3 text-sm font-semibold text-white">
          Back home
        </Link>
        <Link href="/destinations" className="border border-navy px-5 py-3 text-sm font-semibold text-navy">
          Destinations
        </Link>
      </div>
    </div>
  );
}
