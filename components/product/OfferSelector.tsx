"use client";

import { cn } from "@/lib/utils";
import { useCurrencyStore } from "@/store/currency-store";
import { BUNDLE_OFFERS, SAVINGS_MAP, type BundleOffer } from "@/content/products";
import { getPayableBundlePriceSar, getWelcomeReferenceBundlePriceSar, shouldShowWelcomeReferencePricing } from "@/lib/pricing";
import { useLanguageStore } from "@/store/language-store";
import { getLocalizedBundleOffer } from "@/lib/get-localized-product";
import { useCopy } from "@/hooks/useCopy";

const OFFER_IMAGES: Record<number, string> = {
  1: "/offers/1box.png",
  2: "/offers/2box.png",
  3: "/offers/3box.png",
};

type Props = {
  selectedQuantity: number;
  onChange: (quantity: number) => void;
  className?: string;
  welcomePromo?: boolean;
  offerImages?: Record<number, string>;
  productImage?: string;
  bundleOffers?: readonly BundleOffer[];
  savingsMap?: Record<number, number>;
};

export function OfferSelector({ selectedQuantity, onChange, className, welcomePromo = false, offerImages, productImage, bundleOffers, savingsMap }: Props) {
  const format = useCurrencyStore((s) => s.format);
  const lang = useLanguageStore((s) => s.lang);
  const { productPage } = useCopy();
  const offers = bundleOffers ?? BUNDLE_OFFERS;
  const savings_map = savingsMap ?? SAVINGS_MAP;

  return (
    <div className={cn("space-y-2", className)} role="group" aria-label={productPage.chooseBundle}>
      {offers.map((offer) => {
        const isSelected = offer.quantity === selectedQuantity;
        const savings = savings_map[offer.quantity];
        const payable = getPayableBundlePriceSar(offer.quantity, bundleOffers);
        const reference = getWelcomeReferenceBundlePriceSar(offer.quantity, bundleOffers);
        const localized = getLocalizedBundleOffer(offer, lang);

        const isBestValue =
          offer.badgeAr === "الأكثر توفيراً" || offer.badgeAr === "قيمة حصرية";
        const isMostPopular = offer.badgeAr === "الأكثر طلباً";

        return (
          <button
            key={offer.quantity}
            type="button"
            onClick={() => onChange(offer.quantity)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-all duration-150 text-right",
              isSelected
                ? "border-[#155235] bg-[#155235]/8 shadow-sm"
                : "border-[#E8E2D8] bg-white hover:border-[#155235]/50"
            )}
            aria-pressed={isSelected}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                  isSelected ? "border-[#155235] bg-[#155235]" : "border-[#E8E2D8]"
                )}
                aria-hidden="true"
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <div className="flex-shrink-0 w-12 h-10 flex items-center justify-center relative">
                {offerImages ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={offerImages[offer.quantity]} alt={productPage.packAlt(offer.quantity)} className="w-10 h-10 object-contain" />
                ) : productImage ? (
                  <div className="flex items-center justify-center relative w-full h-full">
                    {Array.from({ length: Math.min(offer.quantity, 3) }).map((_, i) => (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        key={i}
                        src={productImage}
                        alt="Product packaging"
                        className="w-8 h-8 object-contain absolute"
                        style={{
                          transform: `translateX(${i * 8 - (Math.min(offer.quantity, 3) - 1) * 4}px) rotate(${i * 5 - (Math.min(offer.quantity, 3) - 1) * 2.5}deg)`,
                          zIndex: Math.min(offer.quantity, 3) - i
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={OFFER_IMAGES[offer.quantity] ?? OFFER_IMAGES[1]} alt={productPage.packAlt(offer.quantity)} className="w-10 h-10 object-contain" />
                )}
              </div>
              <div>
                <span className="font-bold text-[#0F1A14] text-sm">{localized.label}</span>
                {savings && (
                  <p className="text-xs text-[#155235] mt-0.5 font-medium">{productPage.save} {format(savings)}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span
                className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap",
                  isBestValue
                    ? "bg-[#C99A45] text-white"
                    : isMostPopular
                    ? "bg-[#155235] text-[#C99A45]"
                    : "bg-[#E8E2D8] text-[#567063]"
                )}
              >
                {localized.badge}
              </span>
              <div className="flex flex-col items-end gap-0">
                {shouldShowWelcomeReferencePricing(welcomePromo) && reference > payable && (
                  <span className="text-[10px] text-[#567063] line-through leading-none">{format(reference)}</span>
                )}
                <span className="font-extrabold text-[#0F1A14] text-base leading-none mt-0.5">{format(payable)}</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
