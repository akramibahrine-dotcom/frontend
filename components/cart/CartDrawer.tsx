"use client";

import { useCartStore, type CartItem } from "@/store/cart-store";
import { useCurrencyStore } from "@/store/currency-store";
import { useWelcomePromoStore } from "@/store/welcome-promo-store";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { CODBadge } from "@/components/ui/TrustBadge";
import { COPY } from "@/content/copy";
import { PRODUCTS, getProductBundleOffers } from "@/content/products";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FormattedAmount } from "@/components/currency/FormattedAmount";
import { ProductImage } from "@/components/product/ProductImage";
import { getCatalogBundlePriceSar, getPayableBundlePriceSar, getWelcomeReferenceBundlePriceSar, shouldShowWelcomeReferencePricing } from "@/lib/pricing";

export function CartDrawer() {
  const { items, isOpen, isCheckoutOpen, closeCart, openCheckout, getTotal, closeCheckout } = useCartStore();
  const { format } = useCurrencyStore();
  const welcomePromo = useWelcomePromoStore((s) => s.active);
  const total = getTotal();

  const crossSells = PRODUCTS.filter(
    (p) => !items.some((item) => item.productId === p.id)
  ).slice(0, 4);

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
        aria-label="سلة التسوق"
      >
        <div className="flex items-center justify-between p-4 border-b border-[#155235]/50">
          <h2 className="font-bold text-lg text-white">سلة التسوق</h2>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full bg-[#155235]/50 flex items-center justify-center hover:bg-[#155235] transition-colors text-[#C99A45]"
            aria-label="إغلاق السلة"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto herb-backdrop">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
              <span className="text-5xl">🛒</span>
              <p className="text-[#C99A45] font-medium">{COPY.cart.emptyAr}</p>
              <p className="text-sm text-[#FFFFFF]/60">{COPY.cart.emptySubAr}</p>
              <Link
                href="/collections"
                onClick={closeCart}
                className="px-6 py-2.5 rounded-full bg-[#C99A45] text-[#071C12] text-sm font-bold hover:bg-[#B8893A] transition-colors"
              >
                اختر منتجًا
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              <div className="mb-2">
                <p className="text-sm font-bold text-white">منتجاتك المختارة</p>
                <p className="text-xs text-[#FFFFFF]/60">راجع تفاصيل الباقات قبل إتمام الطلب</p>
              </div>
              {items.map((item) => (
                <CartLineRow key={item.lineId} item={item} welcomePromo={welcomePromo} />
              ))}

              {crossSells.length > 0 && (
                <div className="pt-2">
                  <p className="text-sm font-bold text-[#C99A45] mb-2">أكملي روتين عنايتك بأسعار حصرية لفترة محدودة 🔥</p>
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
              <span className="text-[#FFFFFF]/60 text-sm">الإجمالي</span>
              <FormattedAmount className="font-extrabold text-xl text-white">{format(total)}</FormattedAmount>
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
              <CODBadge />
              <span className="text-xs text-[#FFFFFF]/60 flex items-center gap-1">
                🚚 تأكيد قبل التجهيز
              </span>
              <span className="text-xs text-[#FFFFFF]/60 flex items-center gap-1">
                شامل للتوصيل
              </span>
            </div>

            <button
              onClick={openCheckout}
              className="btn-luxury w-full py-4 rounded-full font-bold text-base transition-all"
            >
              {COPY.cart.ctaAr}
            </button>
            <p className="text-xs text-center text-[#FFFFFF]/50">
              دفع عند الاستلام - بدون بطاقة
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
        <p className="text-sm font-bold text-white line-clamp-2">{item.nameAr}</p>
        <p className="text-xs text-[#FFFFFF]/60 mt-0.5">
          {item.quantity === 1 ? "عبوة واحدة" : item.quantity === 2 ? "عبوتان" : "3 عبوات"}
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
        aria-label={`حذف ${item.nameAr}`}
      >
        ✕
      </button>
    </div>
  );
}

function CrossSellCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const { addBundle } = useCartStore();
  const { format } = useCurrencyStore();
  const startingPrice =
    getProductBundleOffers(product).find((o) => o.quantity === 1)?.priceSar ??
    getCatalogBundlePriceSar(1);

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
        <p className="text-xs font-bold text-white line-clamp-1">{product.nameAr}</p>
        <p className="text-xs text-[#C99A45] font-bold mt-0.5">
          تبدأ من <FormattedAmount>{format(startingPrice)}</FormattedAmount>
        </p>
      </div>
      <button
        onClick={() => {
          addBundle(product.id, product.slug, product.nameAr, 1, product.imageTheme, "cart_cross_sell");
        }}
        className="flex-shrink-0 px-3 py-1.5 rounded-full bg-[#155235] text-[#C99A45] text-xs font-bold border border-[#C99A45]/20 hover:bg-[#1B6B45] transition-colors whitespace-nowrap"
        aria-label={`أضف ${product.nameAr} للطلب`}
      >
        أضف
      </button>
    </div>
  );
}
