import { create } from "zustand";

export type Language = "ar" | "en";

const STORAGE_KEY = "baytseha_lang";

type LanguageState = {
  lang: Language;
  hydrated: boolean;
  hydrate: () => void;
  setLang: (lang: Language) => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: "ar",
  hydrated: false,

  hydrate: () => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "ar" || stored === "en") {
        set({ lang: stored, hydrated: true });
      } else {
        set({ hydrated: true });
      }
    } catch {
      set({ hydrated: true });
    }
  },

  setLang: (lang) => {
    set({ lang });
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* noop */
    }
  },
}));
