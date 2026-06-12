"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { toWesternDigits } from "@/lib/format-number";

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "SELECT", "OPTION"]);

function normalizeWesternDigits(root: ParentNode = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });

  const nodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    nodes.push(node as Text);
    node = walker.nextNode();
  }

  for (const textNode of nodes) {
    const original = textNode.textContent ?? "";
    const normalized = toWesternDigits(original);
    if (normalized !== original) textNode.textContent = normalized;
  }
}

export function WesternDigitsApplier() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    let debounce: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(() => normalizeWesternDigits(), 50);
    };

    schedule();

    const observer = new MutationObserver(schedule);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (debounce) clearTimeout(debounce);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
