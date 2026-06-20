import type { Product } from "@/content/products";
import type { Category } from "@/content/categories";
import type { CustomerReview } from "@/content/customer-reviews";
import type { Language } from "@/store/language-store";
import { PRODUCT_EN, CATEGORY_EN } from "@/content/store-en";
import { REVIEWS_EN } from "@/content/reviews-en";

export function getLocalizedProduct(product: Product, lang: Language) {
  if (lang === "ar") {
    return {
      name: product.nameAr,
      shortName: product.shortNameAr,
      headline: product.headlineAr,
      subheadline: product.subheadlineAr,
      concern: product.concernAr,
      painAware: product.painAwareAr,
      ritual: product.ritualAr,
      faq: product.faq,
      whyBaytsehaPoints: product.whyBaytsehaPoints,
    };
  }
  const en = PRODUCT_EN[product.id];
  return {
    name: en?.name ?? product.nameAr,
    shortName: en?.shortName ?? product.shortNameAr,
    headline: en?.headline ?? product.headlineAr,
    subheadline: en?.subheadline ?? product.subheadlineAr,
    concern: en?.concern ?? product.concernAr,
    painAware: en?.painAware ?? product.painAwareAr,
    ritual: en?.ritual ?? product.ritualAr,
    faq: en?.faq ?? product.faq,
    whyBaytsehaPoints: en?.whyBaytsehaPoints ?? product.whyBaytsehaPoints,
  };
}

export function getLocalizedCategory(category: Category, lang: Language) {
  if (lang === "ar") {
    return {
      name: category.nameAr,
      shortName: category.shortNameAr,
      description: category.descriptionAr,
      concern: category.concernAr,
    };
  }
  const en = CATEGORY_EN[category.slug];
  return {
    name: en?.name ?? category.nameAr,
    shortName: en?.shortName ?? category.shortNameAr,
    description: en?.description ?? category.descriptionAr,
    concern: en?.concern ?? category.concernAr,
  };
}

export function getLocalizedReview(review: CustomerReview, lang: Language) {
  if (lang === "ar") {
    return {
      name: review.nameAr,
      country: review.countryAr,
      sceneLabel: review.sceneLabelAr,
      quote: review.quoteAr,
    };
  }
  const en = REVIEWS_EN[review.id];
  return {
    name: en?.name ?? review.nameAr,
    country: en?.country ?? review.countryAr,
    sceneLabel: en?.sceneLabel ?? review.sceneLabelAr,
    quote: en?.quote ?? review.quoteAr,
  };
}

export function getLocalizedBundleOffer(
  offer: { badgeAr: string; labelAr: string; quantity: number },
  lang: Language
) {
  if (lang === "ar") return { badge: offer.badgeAr, label: offer.labelAr };
  const badge =
    offer.badgeAr === "الأكثر توفيراً"
      ? "Best Value"
      : offer.badgeAr === "الأكثر طلباً"
        ? "Most Popular"
        : offer.badgeAr === "قيمة حصرية"
          ? "Exclusive Value"
        : "Try One";
  const label =
    offer.quantity === 1
      ? "1 pack"
      : offer.quantity === 5
        ? "5 packs"
        : `${offer.quantity} packs`;
  return { badge, label };
}
