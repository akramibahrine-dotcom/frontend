import type { Language } from "@/store/language-store";
import { getSortedArToEnPairs } from "@/lib/build-ar-to-en-map";

const originalTextNodes = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();

const TRANSLATABLE_ATTRS = ["aria-label", "alt", "placeholder", "title"] as const;

function replaceWithPairs(text: string, pairs: [string, string][]): string {
  let result = text;
  for (const [ar, en] of pairs) {
    if (result.includes(ar)) {
      result = result.split(ar).join(en);
    }
  }
  return result;
}

function shouldSkipElement(el: Element | null): boolean {
  if (!el) return true;
  const tag = el.tagName;
  return tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || tag === "TEXTAREA";
}

function collectTextNodes(root: Node): Text[] {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || shouldSkipElement(parent)) return NodeFilter.FILTER_REJECT;
      return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  let current = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }
  return nodes;
}

function translateAttributes(root: Node, pairs: [string, string][], restore: boolean) {
  if (!(root instanceof Element) && root !== document.body) return;
  const scope = root === document.body ? document.body : (root as Element);
  const selector = TRANSLATABLE_ATTRS.map((attr) => `[${attr}]`).join(",");
  const elements = scope.querySelectorAll(selector);
  for (const el of elements) {
    if (shouldSkipElement(el)) continue;
    for (const attr of TRANSLATABLE_ATTRS) {
      const value = el.getAttribute(attr);
      if (!value) continue;
      if (restore) {
        const stored = originalAttributes.get(el)?.get(attr);
        if (stored !== undefined) el.setAttribute(attr, stored);
        continue;
      }
      if (!originalAttributes.has(el)) originalAttributes.set(el, new Map());
      const attrMap = originalAttributes.get(el)!;
      if (!attrMap.has(attr)) attrMap.set(attr, value);
      const translated = replaceWithPairs(attrMap.get(attr)!, pairs);
      if (translated !== value) el.setAttribute(attr, translated);
    }
  }
}

export function applyStoreTranslation(pairs: [string, string][], root: Node = document.body) {
  for (const textNode of collectTextNodes(root)) {
    if (!originalTextNodes.has(textNode)) {
      originalTextNodes.set(textNode, textNode.textContent || "");
    }
    const original = originalTextNodes.get(textNode)!;
    textNode.textContent = replaceWithPairs(original, pairs);
  }
  translateAttributes(root, pairs, false);
}

export function restoreStoreTranslation(root: Node = document.body) {
  for (const textNode of collectTextNodes(root)) {
    const original = originalTextNodes.get(textNode);
    if (original !== undefined) textNode.textContent = original;
  }
  translateAttributes(root, [], true);
}

export function localizeText(text: string, lang: Language, pairs?: [string, string][]): string {
  if (lang === "ar" || !text) return text;
  const sorted = pairs ?? getSortedArToEnPairs();
  return replaceWithPairs(text, sorted);
}
