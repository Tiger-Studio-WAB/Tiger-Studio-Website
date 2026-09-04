"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-24 md:px-8">
      <p className="section-kicker">Something went wrong</p>
      <h1 className="mt-4 text-4xl font-medium text-navy">The hub could not load this page</h1>
      <p className="mt-4 text-wab-muted">Please try again, or return to the Tiger Studio home.</p>
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="bg-navy px-5 py-3 text-sm font-semibold text-white"
        >
          Try again
        </button>
        <Link href="/" className="border border-navy px-5 py-3 text-sm font-semibold text-navy">
          Home
        </Link>
      </div>
    </div>
  );
}
