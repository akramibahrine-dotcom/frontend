"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/content/products";
import { getProductImageCandidates, getProductThemeEmoji } from "@/lib/product-images";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  quantity?: number;
  alt: string;
  className?: string;
  /** Compact fallback (emoji only) instead of hiding when all URLs fail */
  fallbackEmoji?: string;
};

export function ProductImage({
  product,
  quantity,
  alt,
  className,
  fallbackEmoji,
}: Props) {
  const candidates = useMemo(
    () => getProductImageCandidates(product, quantity),
    [product, quantity]
  );
  const [index, setIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const emoji = fallbackEmoji ?? getProductThemeEmoji(product.imageTheme);
  const src = candidates[index];

  if (!src || allFailed) {
    return (
      <div
        className={cn("flex items-center justify-center bg-[#155235]/10", className)}
        role="img"
        aria-label={alt}
      >
        <span className="text-3xl opacity-80">{emoji}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        if (index < candidates.length - 1) {
          setIndex((i) => i + 1);
        } else {
          setAllFailed(true);
        }
      }}
    />
  );
}
