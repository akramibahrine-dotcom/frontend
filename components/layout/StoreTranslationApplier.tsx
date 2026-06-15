"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getApiBase } from "@/lib/api-base";
import { useLanguageStore } from "@/store/language-store";

function applyTranslations(translations: Record<string, string>) {
  const entries = Object.entries(translations).filter(([key, value]) => key.trim() && value.trim());
  if (!entries.length) return;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    }
  );

  const nodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    nodes.push(node as Text);
    node = walker.nextNode();
  }

  for (const textNode of nodes) {
    const original = textNode.textContent || "";
    const trimmed = original.trim();
    const replacement = translations[trimmed];
    if (!replacement) continue;
    textNode.textContent = original.replace(trimmed, replacement);
  }
}

export function StoreTranslationApplier() {
  const pathname = usePathname();
  const lang = useLanguageStore((s) => s.lang);
  const hydrated = useLanguageStore((s) => s.hydrated);

  useEffect(() => {
    if (pathname.startsWith("/admin") || !hydrated) return;
    let cancelled = false;
    fetch(`${getApiBase()}/api/v1/store/translations?locale=${lang}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : {}))
      .then((translations) => {
        if (!cancelled) applyTranslations(translations);
      })
      .catch(() => {
        // Translation overrides are optional; never break the storefront.
      });
    return () => {
      cancelled = true;
    };
  }, [pathname, lang, hydrated]);

  return null;
}
