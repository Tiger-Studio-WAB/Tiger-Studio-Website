"use client";

import { useRouter } from "next/navigation";
import { setLocale } from "@/lib/actions/locale";
import { LOCALES, type UiCopy } from "@/lib/i18n";
import type { ContentLanguage } from "@/lib/help-types";

const LABELS: Record<ContentLanguage, string> = {
  en: "EN",
  zh: "中文",
  de: "DE",
};

export function LanguageToggle({ locale, copy }: { locale: ContentLanguage; copy?: UiCopy }) {
  const router = useRouter();

  async function choose(next: ContentLanguage) {
    if (next === locale) return;
    await setLocale(next);
    router.refresh();
  }

  return (
    <div className="lang-picker" role="group" aria-label={copy?.languagePicker ?? "Language"}>
      {LOCALES.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={item === locale}
          onClick={() => choose(item)}
        >
          {LABELS[item]}
        </button>
      ))}
    </div>
  );
}
