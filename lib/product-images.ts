import type { ImageTheme, Product } from "@/content/products";

const THEME_EMOJI: Record<ImageTheme, string> = {
  weight: "🍃",
  colon: "🌼",
  hemorrhoid: "🌸",
  liver: "🌿",
  lung: "🍀",
  prostate: "🌱",
  "womens-health": "🌸",
  "herbal-skin": "✨",
};

export function getProductThemeEmoji(theme: ImageTheme): string {
  return THEME_EMOJI[theme] ?? "🌿";
}

/** Ordered image URLs to try for a product thumbnail (first match wins). */
export function getProductImageCandidates(
  product: Product,
  quantity?: number
): string[] {
  const candidates: string[] = [];

  if (quantity != null && product.offerImages?.[quantity as keyof typeof product.offerImages]) {
    candidates.push(product.offerImages[quantity as keyof typeof product.offerImages]!);
  }

  candidates.push(...product.images);

  for (const extra of [
    product.imageSection2,
    product.imageRitual,
    product.imagePromisePackaging,
    product.imagePromiseDelivery,
    product.imagePromiseCod,
    product.imageSection4,
    product.imageCertificates,
  ]) {
    if (extra) candidates.push(extra);
  }

  candidates.push(
    `/products/${product.slug}/1.webp`,
    `/products/${product.slug}/1.jpg`,
    `/products/${product.slug}/hero.png`
  );

  return [...new Set(candidates.filter(Boolean))];
}

export function getPrimaryProductImageUrl(
  product: Product,
  quantity?: number
): string {
  return getProductImageCandidates(product, quantity)[0] ?? `/products/${product.slug}/1.jpg`;
}
