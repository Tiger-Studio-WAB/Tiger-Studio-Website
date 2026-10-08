"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ContentLanguage } from "@/lib/help-types";

const LocaleContext = createContext<ContentLanguage>("en");

export function LocaleProvider({
  locale,
  children,
}: {
  locale: ContentLanguage;
  children: ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useContentLocale() {
  return useContext(LocaleContext);
}
