"use client";

import { cn } from "@/lib/utils";
import { useCurrencyStore } from "@/store/currency-store";
import { BUNDLE_OFFERS, SAVINGS_MAP } from "@/content/products";
import { getPayableBundlePriceSar, getWelcomeReferenceBundlePriceSar } from "@/lib/pricing";

type Props = {
  selectedQuantity: 1 | 2 | 3;
  onChange: (quantity: 1 | 2 | 3) => void;
  className?: string;
  welcomePromo?: boolean;
  productImage?: string;
};

export function OfferSelector({ selectedQuantity, onChange, className, welcomePromo = false, productImage }: Props) {
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
              {productImage && (
                <div className="relative flex-shrink-0 w-14 h-14">
                  {offer.quantity === 1 && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={productImage} alt="" className="w-14 h-14 object-contain" />
                    </>
                  )}
                  {offer.quantity === 2 && (
                    <div className="relative w-14 h-14">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={productImage} alt="" className="absolute top-0 right-0 w-11 h-11 object-contain" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={productImage} alt="" className="absolute bottom-0 left-0 w-11 h-11 object-contain" />
                    </div>
                  )}
                  {offer.quantity === 3 && (
                    <div className="relative w-14 h-14">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={productImage} alt="" className="w-14 h-14 object-contain" />
                      <span className="absolute -top-1 -left-1 bg-[#C99A45] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        x3
                      </span>
                    </div>
                  )}
                </div>
              )}
              <div>
                <span className="font-bold text-[#0F1A14] text-sm">{offer.labelAr}</span>
                {savings && (
                  <p className="text-xs text-[#155235] mt-0.5 font-medium">وفّر {format(savings)}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full font-bold",
                  offer.quantity === 3
                    ? "bg-[#C99A45] text-white"
                    : offer.quantity === 2
                    ? "bg-[#155235] text-[#C99A45]"
                    : "bg-[#E8E2D8] text-[#567063]"
                )}
              >
                {offer.badgeAr}
              </span>
              <div className="flex flex-col items-end gap-0.5">
                {!welcomePromo && reference > payable && (
                  <span className="text-xs text-[#567063] line-through">{format(reference)}</span>
                )}
                <span className="font-extrabold text-[#0F1A14] text-base">{format(payable)}</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
