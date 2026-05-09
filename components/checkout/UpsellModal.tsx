"use client";

import { useEffect, useRef, useState } from "react";
import { useCartStore, type CartItem } from "@/store/cart-store";
import { useCurrencyStore } from "@/store/currency-store";
import { ProductPlaceholderImage } from "@/components/product/ProductPlaceholderImage";
import { COPY } from "@/content/copy";
import { getUpsellProduct } from "@/content/products";
import { useWelcomePromoStore } from "@/store/welcome-promo-store";
import {
  getPayableBundlePriceSar,
  getPayableUpsellPriceSar,
  getWelcomeReferenceUpsellPriceSar,
  WELCOME_PROMO_CODE,
} from "@/lib/pricing";
import { createOrder } from "@/lib/api";
import { generateEventId, getTrackingData } from "@/lib/events";
import { trackPurchase } from "@/lib/tracking";

const UPSELL_DURATION_SECONDS = 12;

type Props = {
  customer: { name: string; phone: string };
  cartItems: CartItem[];
  onClose: () => void;
};

export function UpsellModal({ customer, cartItems }: Props) {
  const { clearCart } = useCartStore();
  const format = useCurrencyStore((s) => s.format);
  const welcomePromo = useWelcomePromoStore((s) => s.active);
  const [countdown, setCountdown] = useState(UPSELL_DURATION_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const purchaseEventIdRef = useRef(generateEventId());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  /** Prevents duplicate API calls when the timer fires while the user taps Accept/Skip (each would get a new idempotency key). */
  const orderSubmittedRef = useRef(false);

  const mainProductId = cartItems.find((i) => i.source === "product_page")?.productId
    ?? cartItems[0]?.productId;
  const upsellProduct = mainProductId ? getUpsellProduct(mainProductId) : null;

  const baseTotal = cartItems.reduce(
    (sum, item) => sum + getPayableBundlePriceSar(item.quantity),
    0
  );

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleSkip();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const purchaseEventId = purchaseEventIdRef.current;
    const idempotencyKey = generateEventId();

    const finalItems = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      bundlePriceSar: getPayableBundlePriceSar(item.quantity),
      source: item.source,
    }));

    const upsellPrice = getPayableUpsellPriceSar();

    const upsell = withUpsell && upsellProduct
      ? { accepted: true, productId: upsellProduct.id, priceSar: upsellPrice }
      : { accepted: false, productId: null, priceSar: null };

    const upsellTotal = withUpsell && upsellProduct ? upsellPrice : 0;
    const totalSar = baseTotal + upsellTotal;

    try {
      const response = await createOrder({
        customer,
        promo_code: welcomePromo ? WELCOME_PROMO_CODE : null,
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
          initiateCheckoutEventId: null,
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

      trackPurchase(response.order_id, totalSar, contents, purchaseEventId);

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
      window.location.href = `/thank-you/${response.order_id}`;
    } catch (err) {
      orderSubmittedRef.current = false;
      const e = err as Error & { code?: string };
      const isGeo = e.code === "order_rejected";
      setError(
        isGeo
          ? COPY.checkout.geoErrorAr
          : COPY.checkout.networkErrorAr
      );
      setIsSubmitting(false);
    }
  }

  function handleAccept() { submitOrder(true); }
  function handleSkip()   { submitOrder(false); }

  const progressPercent = (countdown / UPSELL_DURATION_SECONDS) * 100;
  const upsellDisplayPrice = getPayableUpsellPriceSar();

  return (
    <div className="fixed inset-0 z-60 bg-[#071C12]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
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
                {COPY.upsell.countdownPrefixAr} {countdown} {COPY.upsell.countdownSuffixAr}
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <div className="w-24 h-24 flex-shrink-0">
                <ProductPlaceholderImage
                  theme={upsellProduct.imageTheme}
                  aspectRatio="square"
                  className="w-24 h-24"
                />
              </div>
              <div>
                <p className="font-bold text-white text-sm">{upsellProduct.nameAr}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-[#C99A45]">{format(upsellDisplayPrice)}</span>
                  {!welcomePromo && (
                    <span className="text-sm text-[#FFFFFF]/50 line-through">
                      {format(getWelcomeReferenceUpsellPriceSar())}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#C99A45] font-bold mt-0.5">{COPY.upsell.priceAr}</p>
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
              {isSubmitting ? "جاري التأكيد..." : COPY.upsell.ctaAr}
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
