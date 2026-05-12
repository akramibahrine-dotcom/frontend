import type { ImageTheme } from "./products";

export type Category = {
  slug: string;
  nameAr: string;
  shortNameAr: string;
  descriptionAr: string;
  concernAr: string;
  imageTheme: ImageTheme;
  image: string;
  productSlugs: string[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "weight-support",
    nameAr: "دعم إدارة الوزن",
    shortNameAr: "إدارة الوزن",
    concernAr: "مرافقة إدارة الوزن",
    descriptionAr:
      "مجموعة أعشاب يومية لمرافقتك في رحلة الوزن — تشرب بهدوء بين وجباتك وحركتك، ضمن نمطٍ متوازن.",
    imageTheme: "weight",
    image: "/categories/cat-weight.jpg",
    productSlugs: ["weight-support-tea"],
  },
  {
    slug: "colon-comfort",
    nameAr: "راحة القولون والغازات",
    shortNameAr: "راحة البطن",
    concernAr: "راحة القولون والغازات",
    descriptionAr:
      "مزيج أعشاب يلطّف معدتك بعد الوجبات الثقيلة، ويعيد ليومك هدوءه الطبيعي.",
    imageTheme: "colon",
    image: "/categories/cat-colon.jpg",
    productSlugs: ["colon-comfort-tea"],
  },
  {
    slug: "hemorrhoid-comfort",
    nameAr: "الراحة مع البواسير",
    shortNameAr: "راحة البواسير",
    concernAr: "راحة يومية مع البواسير",
    descriptionAr:
      "روتين عشبي بسيط ومريح يحترم خصوصيتك من الطلب حتى التغليف، لمرافقة الراحة اليومية.",
    imageTheme: "hemorrhoid",
    image: "/categories/cat-hemorrhoid.jpg",
    productSlugs: ["hemorrhoid-comfort-tea"],
  },
  {
    slug: "liver-wellness",
    nameAr: "دعم صحة الكبد",
    shortNameAr: "عافية الكبد",
    concernAr: "مرافقة عافية الكبد",
    descriptionAr:
      "أعشابٌ هادئة تُضيف لكوبك اليومي روتينًا داعمًا، بجانب نومك ومائك وغذائك المتوازن.",
    imageTheme: "liver",
    image: "/categories/cat-liver.jpg",
    productSlugs: ["liver-wellness-tea"],
  },
  {
    slug: "lung-smoking-support",
    nameAr: "دعم الرئة وتقليل التدخين",
    shortNameAr: "الرئة والتدخين",
    concernAr: "مرافقة الصدر وآثار التدخين",
    descriptionAr:
      "كوبٌ دافئٌ يصاحبك في قرار تقليل التدخين — مرافقٌ لخطواتك، لا بديل عن البرامج الطبية.",
    imageTheme: "lung",
    image: "/categories/cat-lung.jpg",
    productSlugs: ["lung-smoking-support-tea"],
  },
  {
    slug: "prostate-wellness",
    nameAr: "دعم صحة البروستات",
    shortNameAr: "عافية البروستات",
    concernAr: "مرافقة عافية البروستات",
    descriptionAr:
      "مزيجٌ عشبيٌّ لرجلٍ يتابع صحّته اليومية، بخصوصيةٍ في المعاملة والتغليف.",
    imageTheme: "prostate",
    image: "/categories/cat-prostate.jpg",
    productSlugs: ["prostate-wellness-tea"],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
