export type ImageTheme = "weight" | "colon" | "hemorrhoid" | "liver" | "lung" | "prostate" | "womens-health";

export type BundleOffer = {
  quantity: 1 | 2 | 3;
  priceSar: number;
  badgeAr: string;
  labelAr: string;
};

export const BUNDLE_OFFERS: readonly BundleOffer[] = [
  { quantity: 3, priceSar: 349, badgeAr: "الأكثر توفيراً", labelAr: "ثلاث عبوات" },
  { quantity: 2, priceSar: 279, badgeAr: "الأكثر طلباً", labelAr: "عبوتان" },
  { quantity: 1, priceSar: 199, badgeAr: "للتجربة", labelAr: "عبوة واحدة" },
] as const;

export const UPSELL_PRICE_SAR = 99;

export type FAQItem = {
  question: string;
  answer: string;
};

export type Product = {
  id: string;
  slug: string;
  sku: string;
  nameAr: string;
  shortNameAr: string;
  headlineAr: string;
  subheadlineAr: string;
  concernAr: string;
  painAwareAr: string;
  imageTheme: ImageTheme;
  upsellProductId: string;
  crossSellProductIds: string[];
  faq: FAQItem[];
  ritualAr: string;
  whyBaytsehaPoints: string[];
  images: string[];
  imageSection2?: string;
  imageSection4?: string;
  imagePromisePackaging?: string;
  imagePromiseDelivery?: string;
  imagePromiseCod?: string;
  imageRitual?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "weight-support-tea",
    slug: "weight-support-tea",
    sku: "BAYT-WST-001",
    nameAr: "شاي عشبي من بيت الصحة لمرافقة يومك في إدارة الوزن",
    shortNameAr: "شاي مرافقة الوزن",
    headlineAr: "تخلّص من الوزن الزائد — الحل الطبيعي الذي ينتظره جسمك",
    subheadlineAr:
      "خلطة عشبية تُشرب كنقطة استراحة بين وجبتك وحركتك — بيت الصحة يقدّمها كروتين داعم مع أكلٍ متوازنٍ وعاداتٍ لطيفة.",
    concernAr: "حل لمشاكل الوزن و سرعة التخسيس",
    painAwareAr:
      "أحيانًا العقبة مو الحماس، إنما الاستمرار. جعلنا هذا المزيج خفيفًا على الحلق وعلى يومك، ليسهل أن يثبت معك.",
    imageTheme: "weight",
    images: ["/products/weight-support-tea/1.jpg", "/products/weight-support-tea/2.jpg", "/products/weight-support-tea/3.jpg"],
    upsellProductId: "colon-comfort-tea",
    crossSellProductIds: ["colon-comfort-tea", "liver-wellness-tea"],
    ritualAr:
      "كوبٌ واحد صباحًا أو مساءً، مع نومٍ وأكلٍ يعرفك. إن كان لديك خطة علاج، سلٍ مختصّك قبل التجربة.",
    whyBaytsehaPoints: [
      "خلطات نعبّئها كما نودّ أن تُعبَّأ لهدايا بيتنا",
      "من جوالك إلى بابك — بلا تعطيل يومك",
      "ادفع عندما يمسك المندوب الطرد",
      "نجيبك بعد الطلب كما نكون معك عند الاستفسار",
    ],
    faq: [
      {
        question: "هل هذا الشاي «يحرق» الدهون؟",
        answer:
          "نعم! هذا الشاي صُمِّم خصيصًا لدعم حرق الدهون وتسريع التخسيس بشكل طبيعي — مزيج من أقوى الأعشاب المعروفة بخصائصها في إدارة الوزن وتحسين الهضم.",
      },
      {
        question: "متى أشربه؟",
        answer: "كوبٌ واحد في وقتٍ ثابت يوميًا، واتبع ما يذكر على عبوة بيت الصحة.",
      },
      {
        question: "هل يصلح مع أدويتي؟",
        answer:
          "الأعشاب قد تتفاعل مع الأدوية. إن كنت مشخصًا أو تتناول علاجًا، راجع طبيبك قبل الاستمرار.",
      },
      {
        question: "كيف يصلني الطلب؟",
        answer:
          "نوصّل إلى جميع دول الخليج (السعودية، الإمارات، الكويت، البحرين، قطر، عُمان) — دفعك عندما يصلك الطلب.",
      },
    ],
  },
  {
    id: "colon-comfort-tea",
    slug: "colon-comfort-tea",
    sku: "BAYT-CCT-002",
    nameAr: "شاي عشبي من بيت الصحة لأيامٍ أهدأ مع البطن والغازات",
    shortNameAr: "شاي راحة البطن",
    headlineAr: "بعد الأكل… كوبٌ يلطّف معدتك ويعيدك لهدوءك",
    subheadlineAr:
      "مزيجٌ يوميٌّ للاسترخاء الهضمي — بلا مبالغة؛ نكتب لك الاستخدام بشفافية كما نكتبه لأهل بيتنا.",
    concernAr: "راحة القولون والغازات",
    painAwareAr:
      "الضغط والسفر والوجبات الثقيلة تَثقل البطن حتى يضيق صدرك. جئنا بخلطة دافئة تُذكّرك أن العناية تبدأ بكوبٍ منتظم.",
    imageTheme: "colon",
    images: ["/products/colon-comfort-tea/1.jpg", "/products/colon-comfort-tea/2.jpg", "/products/colon-comfort-tea/3.jpg"],
    upsellProductId: "liver-wellness-tea",
    crossSellProductIds: ["weight-support-tea", "hemorrhoid-comfort-tea"],
    ritualAr:
      "كوبٌ بعد الوجبة الغنية، دافئًا قدر الإمكان، ضمن روتينك. الماءُ والأليافُ رفيقان لهذا الكوب.",
    whyBaytsehaPoints: [
      "أعشاب نختارها لسكونٍ يوميٍّ لا لصخبٍ إعلاني",
      "خصوصية تغليف — ما نعرّضك لحرج",
      "الدفع رسالة اطمئنان عند بابك",
      "فريقٌ يتكلم العربية التي تفهمها",
    ],
    faq: [
      {
        question: "هل يعالج القولون العصبي؟",
        answer:
          "لا. نقدّمه لراحة يومية مريحة ضمن نمط حياتك؛ التشخيص والعلاج من اختصاص الطبيب.",
      },
      {
        question: "هل للاستخدام اليومي؟",
        answer: "صُمم لأيامٍ متتابعة ضمن تعليمات العبوة، مع مراعاة ماءٍ كافٍ ونومٍ معقول.",
      },
      {
        question: "كيف أطلب؟",
        answer: "اختر باقتك، أدخل بياناتك، وسيتواصل معك بيت الصحة قبل إغلاق الطلب — والدفع عند الاستلام.",
      },
    ],
  },
  {
    id: "hemorrhoid-comfort-tea",
    slug: "hemorrhoid-comfort-tea",
    sku: "BAYT-HCT-003",
    nameAr: "شاي عشبي من بيت الصحة لمرافقة الراحة اليومية مع البواسير",
    shortNameAr: "شاي مرافقة البواسير",
    headlineAr: "للمواضيع الحسّاسة — طلبٌ بهدوء وطردٌ بلا إحراج",
    subheadlineAr:
      "خلطة داعمة لعافية يومك، مع تجربة شراء نحترم فيها خصوصيتك من الطلب حتى التغليف.",
    concernAr: "راحة يومية مع البواسير",
    painAwareAr:
      "بعض الاحتياجات لا تحتاج خطبة. نكتفي أن نضع بين يديك روتينًا عشبيًا بسيطًا، ونترك الطبيب لحديث المسارات العلاجية.",
    imageTheme: "hemorrhoid",
    images: ["/products/hemorrhoid-comfort-tea/1.jpg", "/products/hemorrhoid-comfort-tea/2.jpg", "/products/hemorrhoid-comfort-tea/3.jpg"],
    upsellProductId: "colon-comfort-tea",
    crossSellProductIds: ["colon-comfort-tea", "liver-wellness-tea"],
    ritualAr:
      "كوبٌ يومي مع ماءٍ وفير وأليافٍ في طعامك؛ استشر مختصّك إن استمرّ الألم أو زاد.",
    whyBaytsehaPoints: [
      "تغليفٌ لا يفضح محتواه بين جيرانك",
      "تأكيدٌ واتسّابٌ بأسلوبٍ مهذّب",
      "لا دفع إلا عندما يمسك الطرد مندوبنا",
      "بيت الصحة — اسمٌ نحمله قبل أن نبيع",
    ],
    faq: [
      {
        question: "هل يشفّي البواسير؟",
        answer:
          "لا. منتج عشبي لراحة يومك؛ الألم المستمر أو النزف يستوجب طبيبًا مباشرة.",
      },
      {
        question: "هل الطرد يوضّح المحتوى؟",
        answer:
          "نعم، نراعي تغليفًا محايدًا قدر الإمكان — التفاصيل في سياسة الشحن عند التفعيل.",
      },
    ],
  },
  {
    id: "liver-wellness-tea",
    slug: "liver-wellness-tea",
    sku: "BAYT-LWT-004",
    nameAr: "شاي عشبي من بيت الصحة لمرافقة صحة الكبد في يومك",
    shortNameAr: "شاي مرافقة الكبد",
    headlineAr: "كوبٌ صباحيٌّ ينسّق يومك مع حركتك ومائك",
    subheadlineAr:
      "أعشابٌ تُتجرّب كنمطٍ هادئٍ بجانب نومك ومائك — بيت الصحة يقدّمها كعادةٍ بسيطة لا كبديل دوائي.",
    concernAr: "مرافقة عافية الكبد",
    painAwareAr:
      "الكبد يحتاج هدوءًا في الأكل والوقت، نحن نضيف له كوبًا دافئًا من دون أن نزعم أنه يعالج مرضًا.",
    imageTheme: "liver",
    images: ["/products/liver-wellness-tea/1.jpg", "/products/liver-wellness-tea/2.jpg", "/products/liver-wellness-tea/3.jpg"],
    upsellProductId: "weight-support-tea",
    crossSellProductIds: ["weight-support-tea", "colon-comfort-tea"],
    ritualAr:
      "كوبٌ قبل الإفطار أو بعد الغداء — بانتظامٍ مع ماءٍ كافٍ؛ راجع مختصّك إن كنت على أدوية كبد.",
    whyBaytsehaPoints: [
      "وضوحٌ بكلمة عربيةٍ فصيحةٍ وبليغة",
      "لا نلتف على «الاستخدام الموصى»",
      "طلبٌ واحد يكفي ليبدأ روتينك",
      "داخل المملكة — نخدمك حيثما وُجدت",
    ],
    faq: [
      {
        question: "هل يعالج أمراض الكبد؟",
        answer:
          "لا مطلقًا. شاي عشبي لدعم يومك ضمن نمط صحي؛ الفحص والعلامات المرضية للطبيب.",
      },
      {
        question: "مع الأدوية؟",
        answer: "لا تخلط دون استشارة — الأعشاب ليست معصومة من التفاعلات.",
      },
    ],
  },
  {
    id: "lung-smoking-support-tea",
    slug: "lung-smoking-support-tea",
    sku: "BAYT-LST-005",
    nameAr: "شاي عشبي من بيت الصحة لمرافقة الصدر والنفس في أيام التقليل عن التدخين",
    shortNameAr: "شاي مرافقة الصدر",
    headlineAr: "خطوة عطريةٌ بجانب قرارٍ أكبر عن تدخينك",
    subheadlineAr:
      "كوبٌ دافئٌ يصحبك وأنت تقلّل السجائر — لا يُغني عن برامج الإقلاع الطبية، بل يرافق يومك بلينٍ.",
    concernAr: "مرافقة الصدر وآثار التدخين",
    painAwareAr:
      "كلُّ خطوةٍ كبيرةٍ تبدأ بخطوةٍ صغيرة — نمنحك جلسةً عشبيةً خفيفةً تذكّرك أنك بدأت تهتمّ بنفسك، من دون وعودٍ بإقلاعٍ سحري.",
    imageTheme: "lung",
    images: ["/products/lung-smoking-support-tea/1.jpg", "/products/lung-smoking-support-tea/2.jpg", "/products/lung-smoking-support-tea/3.jpg"],
    upsellProductId: "liver-wellness-tea",
    crossSellProductIds: ["liver-wellness-tea", "colon-comfort-tea"],
    ritualAr:
      "كوبٌ صباحيٌّ منتظم؛ الإقلاع الحقيقي قرارٌ مع طبيبٍ أو عيادة تدخين — هذا الكوب مرافقٌ فقط.",
    whyBaytsehaPoints: [
      "لسنا عيادة — نحن بيتٌ للروتين",
      "طعمٌ هادئٌ يسهّل الالتزام",
      "دفعٌ عند الاستلام يزيل حيرة السلة",
      "نجيب على أسئلتك بلا مبارزة",
    ],
    faq: [
      {
        question: "هل يخلّيني أبطل التدخين؟",
        answer:
          "لا. يرافق يومك عشبيًا؛ الإقلاع يحتاج خطة صحية، وليس إعلانًا.",
      },
      {
        question: "هل له أضرار؟",
        answer:
          "قد يتفاعل مع أدويتك؛ اسأل طبيبك إن كنت تعاني ضيقًا مزمنًا في الصدر.",
      },
    ],
  },
  {
    id: "prostate-wellness-tea",
    slug: "prostate-wellness-tea",
    sku: "BAYT-PWT-006",
    nameAr: "شاي عشبي من بيت الصحة لمرافقة رجلٍ يهتمّ بصحّته اليومية",
    shortNameAr: "شاي مرافقة البروستات",
    headlineAr: "هدوءُ روتينٍ يوميٍّ للرجل الذي يتابع نفسه",
    subheadlineAr:
      "مزيجٌ عشبيٌّ لمزاجٍ رتيبٍ في يومك — طلبٌ خاص، وتسليمٌ لباب بيتك، مع تذكيرٍ أنّ المتابعة الطبية خطٌ أحمر.",
    concernAr: "مرافقة عافية البروستات",
    painAwareAr:
      "العناية الذكية لا تُؤجّل. بيت الصحة يسّهل لك الخطوة العشبية، ويترك التشخيص لأهل الاختصاص.",
    imageTheme: "prostate",
    images: ["/products/prostate-wellness-tea/1.jpg", "/products/prostate-wellness-tea/2.jpg", "/products/prostate-wellness-tea/3.jpg"],
    upsellProductId: "liver-wellness-tea",
    crossSellProductIds: ["liver-wellness-tea", "lung-smoking-support-tea"],
    ritualAr:
      "كوبٌ يوميٌّ مع نشاطٍ معتدلٍ وماءٍ؛ أي ألمٍ أو تغيّرٍ في التبوّل يستدعي طبيبًا فورًا.",
    whyBaytsehaPoints: [
      "خصوصيةٌ في المعاملة والتغليف",
      "لغةٍ رجاليةٍ بلا تهويلٍ أخضر",
      "الدفع عند الاستلام — راحة قرار",
      "ندعمك أثناء الطلب كما بعده",
    ],
    faq: [
      {
        question: "هل يعالج التهاب البروستات؟",
        answer:
          "لا. شايٌ لدعم يومك؛ الألم والحرارة والخلل في التبوّل طبيٌّ بحت.",
      },
      {
        question: "كيف أطلب بسرعة؟",
        answer: "اسمٌ وجوالٌ وتأكيدٌ عبرنا — ثم يصلك الطرد باسم بيت الصحة.",
      },
    ],
  },
  {
    id: "fertility-tea",
    slug: "fertility-tea",
    sku: "BAYT-FTT-007",
    nameAr: "شاي Fertility من بيت الصحة لمرافقة صحة الأنثى",
    shortNameAr: "شاي Fertility",
    headlineAr: "دعم طبيعي لرحلة الخصوبة وصحة المرأة",
    subheadlineAr:
      "مزيج عشبي دافئ لمرافقة صحة المرأة ودعم الخصوبة، ضمن نمط حياة متوازن.",
    concernAr: "دعم صحة الأنثى والخصوبة",
    painAwareAr:
      "رحلة الخصوبة قد تكون مليئة بالضغوط. صممنا هذا المزيج ليكون لحظة هدوء وعناية يومية لكِ، بمكونات طبيعية تُلائم طبيعة جسمك.",
    imageTheme: "womens-health",
    images: ["/products/fertility-tea/1.jpg", "/products/fertility-tea/2.jpg", "/products/fertility-tea/3.jpg"],
    imageSection2: "/products/fertility-tea/section2-v2.jpg",
    imageSection4: "/products/fertility-tea/section4.jpg",
    imagePromisePackaging: "/products/fertility-tea/promise-pkg-fertility-v3.jpg",
    imagePromiseDelivery: "/products/fertility-tea/promise-del-fertility-v3.jpg",
    imagePromiseCod: "/products/fertility-tea/promise-cod-fertility-v3.jpg",
    imageRitual: "/products/fertility-tea/ritual.jpg",
    upsellProductId: "colon-comfort-tea",
    crossSellProductIds: ["colon-comfort-tea", "weight-support-tea"],
    ritualAr:
      "كوبٌ دافئ يومياً يرافق لحظات استرخائك. يُنصح باستشارة طبيبتك إذا كنتِ تتابعين خطة علاجية للخصوبة.",
    whyBaytsehaPoints: [
      "أعشاب طبيعية مختارة بعناية لدعم صحة المرأة",
      "تغليف يحفظ الخصوصية ويصلك لباب بيتك",
      "الدفع عند الاستلام بكل راحة وأمان",
      "فريق دعم للإجابة على استفساراتك"
    ],
    faq: [
      {
        question: "هل يساعد هذا الشاي على الحمل؟",
        answer:
          "هذا الشاي مُصمم لدعم صحة الأنثى والخصوبة بشكل طبيعي كجزء من نمط حياة صحي، ولا يُعتبر علاجاً طبياً أو بديلاً عن الاستشارة الطبية المتخصصة.",
      },
      {
        question: "هل يمكنني شربه أثناء الدورة الشهرية؟",
        answer: "نعم، مكوناته الطبيعية الدافئة قد تساعد في تخفيف الانزعاج المرافق للدورة الشهرية.",
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getUpsellProduct(mainProductId: string): Product | undefined {
  const main = PRODUCTS.find((p) => p.id === mainProductId);
  if (!main) return undefined;
  return PRODUCTS.find((p) => p.id === main.upsellProductId);
}

export function getCrossSellProducts(productId: string): Product[] {
  const main = PRODUCTS.find((p) => p.id === productId);
  if (!main) return [];
  return main.crossSellProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];
}

export const SAVINGS_MAP: Record<number, number> = {
  2: 199 * 2 - 279,
  3: 199 * 3 - 349,
};
