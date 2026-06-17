"use client";

import { useEffect, useRef, useState } from "react";
import { useCartStore, type CartItem } from "@/store/cart-store";
import { useCurrencyStore } from "@/store/currency-store";
import { FormattedAmount } from "@/components/currency/FormattedAmount";
import { ProductImage } from "@/components/product/ProductImage";
import { COPY } from "@/content/copy";
import { getUpsellProduct, PRODUCTS } from "@/content/products";
import { useWelcomePromoStore } from "@/store/welcome-promo-store";
import {
  getPayableBundlePriceSar,
  getPayableUpsellPriceSar,
  getWelcomeReferenceUpsellPriceSar,
  shouldShowWelcomeReferencePricing,
  WELCOME_PROMO_CODE,
  WELCOME_PROMO_ENABLED,
} from "@/lib/pricing";
import { createOrder } from "@/lib/api";
import { generateEventId, getTrackingData } from "@/lib/events";
import { trackPurchase, waitForPixelFlush } from "@/lib/tracking";

const UPSELL_DURATION_SECONDS = 12;

type Props = {
  customer: { name: string; phone: string; address: string };
  cartItems: CartItem[];
  onClose: () => void;
  purchaseEventId: string;
  initiateCheckoutEventId?: string | null;
};

export function UpsellModal({
  customer,
  cartItems,
  purchaseEventId,
  initiateCheckoutEventId = null,
}: Props) {
  const { clearCart } = useCartStore();
  const format = useCurrencyStore((s) => s.format);
  const welcomePromo = useWelcomePromoStore((s) => s.active);
  const [countdown, setCountdown] = useState(UPSELL_DURATION_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const idempotencyKeyRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  /** Prevents duplicate API calls when the timer fires while the user taps Accept/Skip (each would get a new idempotency key). */
  const orderSubmittedRef = useRef(false);
  const submitOrderRef = useRef<(withUpsell: boolean) => Promise<void>>(async () => {});

  const mainProductId = cartItems.find((i) => i.source === "product_page")?.productId
    ?? cartItems[0]?.productId;
  const upsellProduct = mainProductId ? getUpsellProduct(mainProductId) : null;

  const baseTotal = cartItems.reduce(
    (sum, item) => {
      const prod = PRODUCTS.find((p) => p.id === item.productId);
      return sum + getPayableBundlePriceSar(item.quantity, prod?.bundleOffers);
    },
    0
  );

  useEffect(() => {
    if (!upsellProduct) {
      void submitOrderRef.current(false);
      return;
    }

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          void submitOrderRef.current(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [upsellProduct]);

  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  async function submitOrder(withUpsell: boolean) {
    if (orderSubmittedRef.current) return;
    orderSubmittedRef.current = true;
    stopTimer();
    setIsSubmitting(true);
    setError(null);

    const tracking = getTrackingData();
    if (!idempotencyKeyRef.current) {
      idempotencyKeyRef.current = generateEventId();
    }
    const idempotencyKey = idempotencyKeyRef.current;

    const finalItems = cartItems.map((item) => {
      const prod = PRODUCTS.find((p) => p.id === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        bundlePriceSar: getPayableBundlePriceSar(item.quantity, prod?.bundleOffers),
        source: item.source,
      };
    });

    const upsellPrice = getPayableUpsellPriceSar();

    const upsell = withUpsell && upsellProduct
      ? { accepted: true, productId: upsellProduct.id, priceSar: upsellPrice }
      : { accepted: false, productId: null, priceSar: null };

    const upsellTotal = withUpsell && upsellProduct ? upsellPrice : 0;
    const totalSar = baseTotal + upsellTotal;

    try {
      const response = await createOrder({
        customer: {
          name: customer.name,
          phone: customer.phone,
          address: customer.address,
        },
        promo_code: WELCOME_PROMO_ENABLED && welcomePromo ? WELCOME_PROMO_CODE : null,
        items: finalItems,
        upsell,
        pricing: {
          subtotalSar: totalSar,
          shippingSar: 0,
          totalSar,
          currency: "SAR",
        },
        tracking: {
          purchaseEventId,
          initiateCheckoutEventId,
          fbp: tracking.fbp,
          fbc: tracking.fbc,
          ttp: tracking.ttp,
          ttclid: tracking.ttclid,
          scClickId: tracking.scClickId,
          scCookie1: tracking.scCookie1,
          landingPageUrl: tracking.landingPageUrl,
          pageUrl: tracking.pageUrl,
          utm: tracking.utm,
        },
        idempotencyKey,
      });

      const contents = [
        ...finalItems.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
          item_price: item.bundlePriceSar,
        })),
        ...(withUpsell && upsellProduct
          ? [{ id: upsellProduct.id, quantity: 1, item_price: upsellPrice }]
          : []),
      ];

      trackPurchase(response.order_id, totalSar, contents, response.purchase_event_id);

      // Save order summary for the thank-you page
      try {
        const orderSummary = {
          orderId: response.order_id,
          publicOrderNumber: response.public_order_number,
          customerName: customer.name,
          totalSar,
          items: finalItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceSar: item.bundlePriceSar,
          })),
          upsell: withUpsell && upsellProduct
            ? { productId: upsellProduct.id, priceSar: upsellPrice }
            : null,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem("baytseha_last_order", JSON.stringify(orderSummary));
      } catch { /* ignore storage errors */ }

      clearCart();
      await waitForPixelFlush();
      window.location.href = `/thank-you/${response.order_id}`;
    } catch (err) {
      orderSubmittedRef.current = false;
      const e = err as Error & { code?: string };
      if (e.code === "order_rejected") {
        setError(e.message || COPY.checkout.geoErrorAr);
      } else if (e.code === "invalid_price") {
        setError(e.message || "سعر الباقة غير متطابق. حدّث الصفحة وحاول مرة أخرى.");
      } else if (e.message) {
        setError(e.message);
      } else {
        setError(COPY.checkout.networkErrorAr);
      }
      setIsSubmitting(false);
    }
  }

  function handleAccept() { void submitOrder(true); }
  function handleSkip()   { void submitOrder(false); }

  submitOrderRef.current = submitOrder;

  const progressPercent = (countdown / UPSELL_DURATION_SECONDS) * 100;
  const upsellDisplayPrice = getPayableUpsellPriceSar();

  return (
    <div className="fixed inset-0 z-[60] bg-[#071C12]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div
        className="w-full sm:max-w-md bg-[#0D2B1D] border border-[#155235]/60 rounded-t-3xl sm:rounded-2xl overflow-hidden animate-scale-in shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="upsell-title"
      >
        {/* Progress bar */}
        <div className="h-1 bg-[#155235]/40">
          <div
            className="h-full bg-[#C99A45] transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {upsellProduct && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 id="upsell-title" className="font-bold text-white text-lg">
                {COPY.upsell.titleAr}
              </h2>
              <span className="text-sm text-[#FFFFFF]/60">
                {COPY.upsell.countdownPrefixAr}{" "}
                <FormattedAmount>{countdown}</FormattedAmount>{" "}
                {COPY.upsell.countdownSuffixAr}
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-[#155235]/20">
                <ProductImage
                  product={upsellProduct}
                  quantity={1}
                  alt={upsellProduct.nameAr}
                  className="w-24 h-24 object-contain"
                  fallbackEmoji={upsellProduct.imageTheme === "herbal-skin" ? "✨" : "🌿"}
                />
              </div>
              <div>
                <p className="font-bold text-white text-sm">{upsellProduct.nameAr}</p>
                <div className="flex items-center gap-2 mt-1" dir="ltr">
                  <FormattedAmount className="text-2xl font-extrabold text-[#C99A45]">{format(upsellDisplayPrice)}</FormattedAmount>
                  {shouldShowWelcomeReferencePricing(welcomePromo) && (
                    <FormattedAmount className="text-sm text-[#FFFFFF]/50 line-through">
                      {format(getWelcomeReferenceUpsellPriceSar())}
                    </FormattedAmount>
                  )}
                </div>
                <p className="text-xs text-[#C99A45] font-bold mt-0.5">{COPY.upsell.priceAr(format(upsellDisplayPrice))}</p>
              </div>
            </div>

            <p className="text-xs text-[#FFFFFF]/60 bg-[#155235]/30 border border-[#155235]/40 rounded-xl px-3 py-2 text-center">
              {COPY.upsell.trustAr}
            </p>

            {error && (
              <div className="p-3 bg-red-900/30 border border-red-700/40 rounded-xl text-xs text-red-400 text-center">
                {error}
              </div>
            )}

            <button
              onClick={handleAccept}
              disabled={isSubmitting}
              className="btn-gold w-full py-4 rounded-full font-bold text-base disabled:opacity-60"
            >
              {isSubmitting ? "جاري التأكيد..." : COPY.upsell.ctaAr(format(upsellDisplayPrice))}
            </button>

            <button
              onClick={handleSkip}
              disabled={isSubmitting}
              className="w-full text-sm text-[#FFFFFF]/50 underline text-center hover:text-[#C99A45] transition-colors py-1 disabled:opacity-60"
            >
              {COPY.upsell.skipAr}
            </button>
          </div>
        )}

        {!upsellProduct && (
          <div className="p-6 space-y-4">
            <p className="text-center text-[#FFFFFF]/70">جاري تأكيد طلبك...</p>
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            <button
              onClick={handleSkip}
              disabled={isSubmitting}
              className="btn-luxury w-full py-4 rounded-full font-bold text-base disabled:opacity-60"
            >
              {isSubmitting ? "جاري التأكيد..." : "تأكيد الطلب"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
