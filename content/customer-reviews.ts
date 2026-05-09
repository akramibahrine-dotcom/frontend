/**
 * لا نعرض تقييمات عملاء حقيقية حتى تتوفر من مصدر موثّق.
 * الصفحة الرئيسية تعرض نصًا بديلًا عبر ReviewsMarquee عندما يبقى المصفوفة فارغة.
 */
export type CustomerReview = {
  id: string;
  nameAr: string;
  countryAr: string;
  gender: "woman" | "man";
  portraitCategory: "women" | "men";
  portraitIndex: number;
  sceneLabelAr: string;
  sceneEmoji: string;
  quoteAr: string;
  rating: number;
};

export const CUSTOMER_REVIEWS: CustomerReview[] = [];

export function portraitUrl(review: CustomerReview): string {
  return `https://randomuser.me/api/portraits/med/${review.portraitCategory}/${review.portraitIndex}.jpg`;
}
