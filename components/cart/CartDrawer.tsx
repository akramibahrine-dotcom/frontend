"use client";

import { useCartStore, type CartItem } from "@/store/cart-store";
import { useCurrencyStore } from "@/store/currency-store";
import { useWelcomePromoStore } from "@/store/welcome-promo-store";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { CODBadge } from "@/components/ui/TrustBadge";
import { useCopy } from "@/hooks/useCopy";
import { PRODUCTS } from "@/content/products";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FormattedAmount } from "@/components/currency/FormattedAmount";
import { ProductImage } from "@/components/product/ProductImage";
import { getCatalogBundlePriceSar, getPayableBundlePriceSar, getWelcomeReferenceBundlePriceSar, shouldShowWelcomeReferencePricing } from "@/lib/pricing";

export function CartDrawer() {
  const { items, isOpen, isCheckoutOpen, closeCart, openCheckout, getTotal, closeCheckout } = useCartStore();
  const { format } = useCurrencyStore();
  const welcomePromo = useWelcomePromoStore((s) => s.active);
  const { cart } = useCopy();
  const total = getTotal();

  const crossSells = PRODUCTS.filter(
    (p) => !items.some((item) => item.productId === p.id)
  ).slice(0, 2);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 cart-drawer-overlay animate-fade-in"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md z-50 shadow-2xl",
          "flex flex-col transition-transform duration-300",
          "bg-[#071C12]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label={cart.title}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#155235]/50">
          <h2 className="font-bold text-lg text-white">{cart.title}</h2>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full bg-[#155235]/50 flex items-center justify-center hover:bg-[#155235] transition-colors text-[#C99A45]"
            aria-label={cart.close}
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto herb-backdrop">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
              <span className="text-5xl">🛒</span>
              <p className="text-[#C99A45] font-medium">{cart.empty}</p>
              <p className="text-sm text-[#FFFFFF]/60">{cart.emptySub}</p>
              <Link
                href="/collections"
                onClick={closeCart}
                className="px-6 py-2.5 rounded-full bg-[#C99A45] text-[#071C12] text-sm font-bold hover:bg-[#B8893A] transition-colors"
              >
                {cart.chooseProduct}
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              <div className="mb-2">
                <p className="text-sm font-bold text-white">{cart.selectedProducts}</p>
                <p className="text-xs text-[#FFFFFF]/60">{cart.reviewBundles}</p>
              </div>
              {items.map((item) => (
                <CartLineRow key={item.lineId} item={item} welcomePromo={welcomePromo} />
              ))}

              <GiftProgressBanner totalSar={total} />

              {crossSells.length > 0 && (
                <div className="pt-2">
                  <p className="text-sm font-bold text-[#C99A45] mb-2">{cart.crossSellTitle}</p>
                  <div className="space-y-2">
                    {crossSells.map((product) => (
                      <CrossSellCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-[#155235]/50 space-y-3 bg-[#0A2616]">
            <div className="flex justify-between items-center">
              <span className="text-[#FFFFFF]/60 text-sm">{cart.total}</span>
              <FormattedAmount className="font-extrabold text-xl text-white">{format(total)}</FormattedAmount>
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
              <CODBadge />
              <span className="text-xs text-[#FFFFFF]/60 flex items-center gap-1">
                {cart.confirmBeforePack}
              </span>
              <span className="text-xs text-[#FFFFFF]/60 flex items-center gap-1">
                {cart.shippingIncluded}
              </span>
            </div>

            <button
              onClick={openCheckout}
              className="btn-luxury w-full py-4 rounded-full font-bold text-base transition-all"
            >
              {cart.cta}
            </button>
            <p className="text-xs text-center text-[#FFFFFF]/50">
              {cart.codNoCard}
            </p>
          </div>
        )}
      </div>

      {isCheckoutOpen && <CheckoutModal onClose={closeCheckout} />}
    </>
  );
}

function CartLineRow({ item, welcomePromo }: { item: CartItem; welcomePromo: boolean }) {
  const { format } = useCurrencyStore();
  const { packLabel, localize, isEn } = useCopy();
  const removeLine = useCartStore((s) => s.removeLine);
  const prod = PRODUCTS.find((p) => p.id === item.productId);
  const catalog = getCatalogBundlePriceSar(item.quantity, prod?.bundleOffers);
  const payable = getPayableBundlePriceSar(item.quantity, prod?.bundleOffers);
  const reference = getWelcomeReferenceBundlePriceSar(item.quantity, prod?.bundleOffers);

  return (
    <div className="flex items-center gap-3 p-3 bg-[#0D2B1D] border border-[#155235]/40 rounded-xl">
      <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-[#155235]/20">
        {prod ? (
          <ProductImage
            product={prod}
            quantity={item.quantity}
            alt={item.nameAr}
            className="w-14 h-14 object-contain"
          />
        ) : null}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white line-clamp-2">{localize(item.nameAr)}</p>
        <p className="text-xs text-[#FFFFFF]/60 mt-0.5">
          {packLabel(item.quantity)}
        </p>
        <div className="mt-1 flex items-center gap-2 flex-wrap" dir="ltr">
          {shouldShowWelcomeReferencePricing(welcomePromo) && reference > payable ? (
            <>
              <FormattedAmount className="text-xs text-[#FFFFFF]/45 line-through">{format(reference)}</FormattedAmount>
              <FormattedAmount className="text-sm font-extrabold text-[#C99A45]">{format(payable)}</FormattedAmount>
            </>
          ) : (
            <FormattedAmount className="text-sm font-extrabold text-[#C99A45]">{format(catalog)}</FormattedAmount>
          )}
        </div>
      </div>
      <button
        onClick={() => removeLine(item.lineId)}
        className="flex-shrink-0 w-7 h-7 rounded-full bg-[#155235]/40 text-[#FFFFFF] hover:bg-red-900/40 hover:text-red-400 flex items-center justify-center text-xs transition-colors"
        aria-label={isEn ? `Remove ${localize(item.nameAr)}` : `حذف ${item.nameAr}`}
      >
        ✕
      </button>
    </div>
  );
}

const GIFT_THRESHOLD_SAR = 299;

function GiftProgressBanner({ totalSar }: { totalSar: number }) {
  const { format } = useCurrencyStore();
  const reached = totalSar >= GIFT_THRESHOLD_SAR;
  const remaining = GIFT_THRESHOLD_SAR - totalSar;
  const progress = Math.min((totalSar / GIFT_THRESHOLD_SAR) * 100, 100);

  return (
    <div className="p-3 rounded-xl border border-[#C99A45]/30 bg-gradient-to-r from-[#1A3A28] to-[#0D2B1D]">
      {reached ? (
        <div className="flex items-center gap-2 text-center justify-center">
          <span className="text-2xl">🎁</span>
          <p className="text-sm font-bold text-[#C99A45]">
            تهانينا! ستحصل على هدية مفاجأة مجانية مع طلبك!
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🎁</span>
            <p className="text-xs font-bold text-white">
              أضف <FormattedAmount className="text-[#C99A45] font-extrabold">{format(remaining)}</FormattedAmount> للحصول على هدية مجانية!
            </p>
          </div>
          <div className="w-full h-2 bg-[#155235]/50 rounded-full overflow-hidden mb-1.5">
            <div
              className="h-full bg-gradient-to-r from-[#C99A45] to-[#E8C068] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-[#FFFFFF]/50 text-center">
            عند الوصول لـ <FormattedAmount className="text-[#FFFFFF]/70">{format(GIFT_THRESHOLD_SAR)}</FormattedAmount> تحصل على هدية مفاجأة
          </p>
        </>
      )}
    </div>
  );
}

function CrossSellCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const { addBundle } = useCartStore();
  const { format } = useCurrencyStore();
  const { cart, localize, isEn } = useCopy();
  const CROSS_SELL_PRICE_SAR = 129;

  return (
    <div className="flex items-center gap-3 p-3 bg-[#0D2B1D] border border-[#155235]/40 rounded-xl">
      <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-[#155235]/20">
        <ProductImage
          product={product}
          alt={product.nameAr}
          className="w-12 h-12 object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-white line-clamp-1">{localize(product.nameAr)}</p>
        <p className="text-xs text-[#C99A45] font-bold mt-0.5">
          <FormattedAmount>{format(CROSS_SELL_PRICE_SAR)}</FormattedAmount>
        </p>
      </div>
      <button
        onClick={() => {
          addBundle(product.id, product.slug, product.nameAr, 1, product.imageTheme, "cart_cross_sell");
        }}
        className="flex-shrink-0 px-3 py-1.5 rounded-full bg-[#155235] text-[#C99A45] text-xs font-bold border border-[#C99A45]/20 hover:bg-[#1B6B45] transition-colors whitespace-nowrap"
        aria-label={isEn ? `Add ${localize(product.nameAr)} to order` : `أضف ${product.nameAr} للطلب`}
      >
        {cart.add}
      </button>
    </div>
  );
}
