import { BUNDLE_OFFERS, UPSELL_PRICE_SAR } from "@/content/products";

/** Must match backend `welcome_promo_codes` (.env) — default عميل10 */
export const WELCOME_PROMO_CODE = "عميل10";

/** Shown as strikethrough «السعر المرجعي» before the visitor accepts the welcome promo (display only). */
export const WELCOME_REFERENCE_MARKUP_PERCENT = 10;

export function getCatalogBundlePriceSar(quantity: 1 | 2 | 3): number {
  return BUNDLE_OFFERS.find((o) => o.quantity === quantity)!.priceSar;
}

/** Reference price for marketing (catalog + markup); not charged. */
export function getWelcomeReferenceBundlePriceSar(quantity: 1 | 2 | 3): number {
  const base = getCatalogBundlePriceSar(quantity);
  return Math.round((base * (100 + WELCOME_REFERENCE_MARKUP_PERCENT)) / 100);
}

export function getWelcomeReferenceUpsellPriceSar(): number {
  return Math.round((UPSELL_PRICE_SAR * (100 + WELCOME_REFERENCE_MARKUP_PERCENT)) / 100);
}

/** Amount sent to checkout / API — always catalog bundle SAR. */
export function getPayableBundlePriceSar(quantity: 1 | 2 | 3): number {
  return getCatalogBundlePriceSar(quantity);
}

/** Upsell line always catalog upsell price. */
export function getPayableUpsellPriceSar(): number {
  return UPSELL_PRICE_SAR;
}
