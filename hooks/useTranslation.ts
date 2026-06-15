import { useLanguageStore } from "@/store/language-store";
import { t, type TranslationKey } from "@/content/translations";

export function useTranslation() {
  const lang = useLanguageStore((s) => s.lang);
  return {
    lang,
    t: (key: TranslationKey) => t(key, lang),
    isRtl: lang === "ar",
  };
}
