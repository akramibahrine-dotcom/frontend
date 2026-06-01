"use client";

import { cn } from "@/lib/utils";
import { useCurrencyStore } from "@/store/currency-store";
import { BUNDLE_OFFERS, SAVINGS_MAP } from "@/content/products";
import { getPayableBundlePriceSar, getWelcomeReferenceBundlePriceSar } from "@/lib/pricing";

const OFFER_IMAGES: Record<number, string> = {
  1: "/offers/1box.png",
  2: "/offers/2box.png",
  3: "/offers/3box.png",
};

type Props = {
  selectedQuantity: 1 | 2 | 3;
  onChange: (quantity: 1 | 2 | 3) => void;
  className?: string;
  welcomePromo?: boolean;
  offerImages?: Record<number, string>;
};

export function OfferSelector({ selectedQuantity, onChange, className, welcomePromo = false, offerImages }: Props) {
  const format = useCurrencyStore((s) => s.format);

  return (
    <div className={cn("space-y-2", className)} role="group" aria-label="اختر الباقة">
      {BUNDLE_OFFERS.map((offer) => {
        const isSelected = offer.quantity === selectedQuantity;
        const savings = SAVINGS_MAP[offer.quantity];
        const payable = getPayableBundlePriceSar(offer.quantity);
        const reference = getWelcomeReferenceBundlePriceSar(offer.quantity);

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
              <div className="flex-shrink-0 w-10 h-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={offerImages ? offerImages[offer.quantity] : OFFER_IMAGES[offer.quantity]} alt={`${offer.quantity} عبوة`} className="w-10 h-10 object-contain" />
              </div>
              <div>
                <span className="font-bold text-[#0F1A14] text-sm">{offer.labelAr}</span>
                {savings && (
                  <p className="text-xs text-[#155235] mt-0.5 font-medium">وفّر {format(savings)}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span
                className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap",
                  offer.quantity === 3
                    ? "bg-[#C99A45] text-white"
                    : offer.quantity === 2
                    ? "bg-[#155235] text-[#C99A45]"
                    : "bg-[#E8E2D8] text-[#567063]"
                )}
              >
                {offer.badgeAr}
              </span>
              <div className="flex flex-col items-end gap-0">
                {!welcomePromo && reference > payable && (
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
