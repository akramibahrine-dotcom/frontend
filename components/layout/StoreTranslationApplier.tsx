"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getApiBase } from "@/lib/api-base";
import { getSortedArToEnPairs } from "@/lib/build-ar-to-en-map";
import { applyStoreTranslation, restoreStoreTranslation } from "@/lib/store-i18n";
import { useLanguageStore } from "@/store/language-store";

export function StoreTranslationApplier() {
  const pathname = usePathname();
  const lang = useLanguageStore((s) => s.lang);
  const hydrated = useLanguageStore((s) => s.hydrated);
  const observerRef = useRef<MutationObserver | null>(null);
  const pairsRef = useRef<[string, string][]>(getSortedArToEnPairs());

  useEffect(() => {
    if (pathname.startsWith("/admin") || !hydrated) return;

    let cancelled = false;

    function applyCurrentLanguage(apiOverrides: Record<string, string> = {}) {
      if (cancelled) return;
      if (lang === "ar") {
        restoreStoreTranslation();
        return;
      }
      pairsRef.current = getSortedArToEnPairs(apiOverrides);
      applyStoreTranslation(pairsRef.current);
    }

    if (lang === "ar") {
      restoreStoreTranslation();
      return;
    }

    applyCurrentLanguage();

    fetch(`${getApiBase()}/api/v1/store/translations?locale=en`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : {}))
      .then((apiOverrides) => {
        applyCurrentLanguage(apiOverrides as Record<string, string>);
      })
      .catch(() => {
        // Optional admin overrides — storefront must work without them.
      });

    return () => {
      cancelled = true;
    };
  }, [pathname, lang, hydrated]);

  useEffect(() => {
    if (pathname.startsWith("/admin") || !hydrated || lang !== "en") {
      observerRef.current?.disconnect();
      observerRef.current = null;
      return;
    }

    let timer: ReturnType<typeof setTimeout> | null = null;
    const observer = new MutationObserver(() => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        applyStoreTranslation(pairsRef.current);
      }, 80);
    });

    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    observerRef.current = observer;

    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname, lang, hydrated]);

  return null;
}
