"use client";

import { useLanguageStore, type Language } from "@/store/language-store";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguageStore();

  const toggle = () => {
    const next: Language = lang === "ar" ? "en" : "ar";
    setLang(next);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-[#C99A45]/30 hover:border-[#C99A45] transition-colors text-xs font-medium text-white"
      aria-label={lang === "ar" ? "Switch to English" : "التبديل للعربية"}
      title={lang === "ar" ? "English" : "العربية"}
    >
      {lang === "ar" ? (
        <>
          <span className="text-base leading-none">🇸🇦</span>
          <span className="text-[#C99A45]">ع</span>
        </>
      ) : (
        <>
          <span className="text-base leading-none">🇺🇸</span>
          <span className="text-[#C99A45]">EN</span>
        </>
      )}
    </button>
  );
}
