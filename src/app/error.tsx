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
    <div className="mx-auto max-w-3xl px-5 py-24">
      <h1 className="text-4xl font-bold italic">The hub could not load this page</h1>
      <span className="rule-yellow mt-4" />
      <p className="mt-5 text-muted-foreground">Try again, or return home.</p>
      <div className="mt-8 flex gap-4">
        <button type="button" onClick={reset} className="btn btn-red">
          Try again
        </button>
        <Link href="/" className="btn btn-white border border-brand-red">
          Home
        </Link>
      </div>
    </div>
  );
}
