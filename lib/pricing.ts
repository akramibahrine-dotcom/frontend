import { BUNDLE_OFFERS, UPSELL_PRICE_SAR, type BundleOffer, type Product } from "@/content/products";

/** Must match backend `welcome_promo_codes` (.env) — default عميل10 */
export const WELCOME_PROMO_CODE = "عميل10";

/** When false, welcome modal is hidden and stored promo state is ignored. */
export const WELCOME_PROMO_ENABLED = false;

/** Show strikethrough reference prices only when the welcome promo flow is active. */
export function shouldShowWelcomeReferencePricing(promoAccepted: boolean = false): boolean {
  return WELCOME_PROMO_ENABLED && !promoAccepted;
}

/** Shown as strikethrough «السعر المرجعي» before the visitor accepts the welcome promo (display only). */
export const WELCOME_REFERENCE_MARKUP_PERCENT = 10;

export function getCatalogBundlePriceSar(quantity: number, productBundleOffers?: readonly BundleOffer[]): number {
  const offers = productBundleOffers ?? BUNDLE_OFFERS;
  return offers.find((o) => o.quantity === quantity)?.priceSar ?? BUNDLE_OFFERS.find((o) => o.quantity === quantity)!.priceSar;
}

/** Reference price for marketing (catalog + markup); not charged. */
export function getWelcomeReferenceBundlePriceSar(quantity: number, productBundleOffers?: readonly BundleOffer[]): number {
  const base = getCatalogBundlePriceSar(quantity, productBundleOffers);
  return Math.round((base * (100 + WELCOME_REFERENCE_MARKUP_PERCENT)) / 100);
}

export function getWelcomeReferenceUpsellPriceSar(): number {
  return Math.round((UPSELL_PRICE_SAR * (100 + WELCOME_REFERENCE_MARKUP_PERCENT)) / 100);
}

/** Amount sent to checkout / API — always catalog bundle SAR. */
export function getPayableBundlePriceSar(quantity: number, productBundleOffers?: readonly BundleOffer[]): number {
  return getCatalogBundlePriceSar(quantity, productBundleOffers);
}

/** Get the bundle offers for a product (custom or default). */
export function getProductOffers(product?: Product | null): readonly BundleOffer[] {
  return product?.bundleOffers ?? BUNDLE_OFFERS;
}

/** Upsell line always catalog upsell price. */
export function getPayableUpsellPriceSar(): number {
  return UPSELL_PRICE_SAR;
}
