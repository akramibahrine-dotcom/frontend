"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/store/language-store";

export function LanguageProvider() {
  const lang = useLanguageStore((s) => s.lang);
  const hydrate = useLanguageStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", lang === "ar" ? "ar-SA-u-nu-latn" : "en");
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  return null;
}
