"use client";

import { useState } from "react";

export function SoftImage({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  const [ok, setOk] = useState(Boolean(src));
  if (!src || !ok) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} onError={() => setOk(false)} />
  );
}
