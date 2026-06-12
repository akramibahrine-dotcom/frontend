"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { toWesternDigits } from "@/lib/format-number";

import { getApiBase } from "@/lib/api-base";

const API_BASE = getApiBase();

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
    const replacement = toWesternDigits(translations[trimmed]);
    if (!replacement) continue;
    textNode.textContent = toWesternDigits(original.replace(trimmed, replacement));
  }
}

export function StoreTranslationApplier() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    let cancelled = false;
    fetch(`${API_BASE}/api/v1/store/translations?locale=ar`, { cache: "no-store" })
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
  }, [pathname]);

  return null;
}
