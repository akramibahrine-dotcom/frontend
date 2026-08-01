import { BUNDLE_OFFERS, PRODUCTS, UPSELL_PRICE_SAR, type BundleOffer, type Product } from "@/content/products";
import { convertSarTo, formatPrice, type CurrencyCode, type CurrencyRates } from "@/lib/currency";

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

/** Resolve the offer row for a quantity from product-specific offers only (no cross-product fallback). */
export function getBundleOffer(
  quantity: number,
  productBundleOffers?: readonly BundleOffer[]
): BundleOffer | undefined {
  const offers = productBundleOffers ?? BUNDLE_OFFERS;
  return offers.find((o) => o.quantity === quantity);
}

export function getCatalogBundlePriceSar(quantity: number, productBundleOffers?: readonly BundleOffer[]): number {
  const offer = getBundleOffer(quantity, productBundleOffers);
  if (offer) return offer.priceSar;
  // Never borrow another product's price map — only fall back within the default catalog.
  if (!productBundleOffers) {
    return BUNDLE_OFFERS.find((o) => o.quantity === quantity)?.priceSar ?? 0;
  }
  return 0;
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

/**
 * Display amount for a bundle in the shopper's currency.
 * Uses product-specific priceOverrides when present (e.g. C60 OMR),
 * otherwise converts that product's own SAR catalog price.
 */
export function getDisplayBundleAmount(
  quantity: number,
  currency: CurrencyCode,
  rates: CurrencyRates,
  productBundleOffers?: readonly BundleOffer[]
): number {
  const offer = getBundleOffer(quantity, productBundleOffers);
  const override = offer?.priceOverrides?.[currency];
  if (override != null) return override;
  const sar = getCatalogBundlePriceSar(quantity, productBundleOffers);
  return convertSarTo(sar, currency, rates);
}

export function formatBundlePrice(
  quantity: number,
  currency: CurrencyCode,
  rates: CurrencyRates,
  productBundleOffers?: readonly BundleOffer[]
): string {
  return formatPrice(getDisplayBundleAmount(quantity, currency, rates, productBundleOffers), currency);
}

/** Savings vs buying base packs, respecting currency overrides when both sides have them. */
export function getDisplayBundleSavings(
  quantity: number,
  currency: CurrencyCode,
  rates: CurrencyRates,
  productBundleOffers?: readonly BundleOffer[],
  savingsInSar?: number
): number {
  const offers = productBundleOffers ?? BUNDLE_OFFERS;
  const base = [...offers].sort((a, b) => a.quantity - b.quantity)[0];
  const current = offers.find((o) => o.quantity === quantity);
  if (!base || !current || current.quantity <= base.quantity) {
    return convertSarTo(savingsInSar ?? 0, currency, rates);
  }

  const multiples = current.quantity / base.quantity;
  const baseOverride = base.priceOverrides?.[currency];
  const currentOverride = current.priceOverrides?.[currency];

  if (Number.isInteger(multiples) && baseOverride != null && currentOverride != null) {
    return baseOverride * multiples - currentOverride;
  }

  if (base.quantity === 1 && baseOverride != null && currentOverride != null) {
    return baseOverride * quantity - currentOverride;
  }

  if (savingsInSar != null) return convertSarTo(savingsInSar, currency, rates);

  if (Number.isInteger(multiples)) {
    return convertSarTo(base.priceSar * multiples - current.priceSar, currency, rates);
  }
  if (base.quantity === 1) {
    return convertSarTo(base.priceSar * quantity - current.priceSar, currency, rates);
  }
  return 0;
}

export function formatBundleSavings(
  quantity: number,
  currency: CurrencyCode,
  rates: CurrencyRates,
  productBundleOffers?: readonly BundleOffer[],
  savingsInSar?: number
): string {
  return formatPrice(
    getDisplayBundleSavings(quantity, currency, rates, productBundleOffers, savingsInSar),
    currency
  );
}

/** Sum of line display amounts — uses each product's own offers/overrides (never mixes catalogs). */
export function getDisplayCartTotal(
  items: ReadonlyArray<{ productId: string; quantity: number }>,
  currency: CurrencyCode,
  rates: CurrencyRates
): number {
  return items.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    return sum + getDisplayBundleAmount(item.quantity, currency, rates, product?.bundleOffers);
  }, 0);
}

export function formatDisplayCartTotal(
  items: ReadonlyArray<{ productId: string; quantity: number }>,
  currency: CurrencyCode,
  rates: CurrencyRates
): string {
  return formatPrice(getDisplayCartTotal(items, currency, rates), currency);
}
