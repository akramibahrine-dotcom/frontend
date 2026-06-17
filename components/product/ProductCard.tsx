"use client";

import Link from "next/link";
import { ProductPlaceholderImage } from "./ProductPlaceholderImage";
import { useCurrencyStore } from "@/store/currency-store";
import { CODBadge } from "@/components/ui/TrustBadge";
import { useCopy } from "@/hooks/useCopy";
import { cn } from "@/lib/utils";
import { getCatalogBundlePriceSar } from "@/lib/pricing";
import { getProductBundleOffers, type Product } from "@/content/products";

type Props = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: Props) {
  const format = useCurrencyStore((s) => s.format);
  const { localize, isEn } = useCopy();
  const offers = getProductBundleOffers(product);
  const startingPrice = getCatalogBundlePriceSar(1, offers);

  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden card-glow min-w-0",
        "shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group",
        className
      )}
    >
      <Link href={`/products/${product.slug}`} className="block overflow-hidden rounded-t-2xl">
        {product.images && product.images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={localize(product.nameAr)}
            className="w-full aspect-[4/5] object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <ProductPlaceholderImage
            theme={product.imageTheme}
            aspectRatio="product"
            className="rounded-t-2xl rounded-b-none group-hover:scale-[1.02] transition-transform duration-300"
          />
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <CODBadge className="mb-2" />
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-[#0F1A14] text-sm leading-snug hover:text-[#155235] transition-colors">
              {localize(product.nameAr)}
            </h3>
          </Link>
          <p className="text-xs text-[#567063] mt-1 leading-relaxed line-clamp-2">
            {localize(product.headlineAr)}
          </p>
        </div>

        <div className="mt-auto">
          <p className="text-xs text-[#8BA898] mb-0.5">{isEn ? "From" : "تبدأ من"}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-extrabold text-[#0F1A14]">{format(startingPrice)}</span>
            <span className="text-xs text-[#155235] font-medium">
              {isEn ? "Save with 2 or 3 packs" : "وفّر مع باقة 2 أو 3"}
            </span>
          </div>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className={cn(
            "w-full py-3 rounded-full text-center text-sm font-bold",
            "bg-[#155235] text-white",
            "hover:bg-[#0A3622] transition-colors duration-150",
            "active:scale-[0.98]"
          )}
        >
          {isEn ? "View Product" : "عرض المنتج"}
        </Link>
      </div>
    </div>
  );
}
