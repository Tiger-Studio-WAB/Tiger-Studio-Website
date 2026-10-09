"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useContentLocale } from "@/components/locale-context";
import { withLocale } from "@/lib/paths";

type LinkHref = ComponentProps<typeof Link>["href"];

function localizeHref(href: LinkHref, locale: ReturnType<typeof useContentLocale>) {
  if (typeof href === "string") return withLocale(href, locale);
  if (href && typeof href === "object" && typeof href.pathname === "string") {
    return { ...href, pathname: withLocale(href.pathname, locale) };
  }
  return href;
}

export function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const locale = useContentLocale();
  return <Link href={localizeHref(href, locale)} {...props} />;
}
