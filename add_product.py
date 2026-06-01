import re

with open('content/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

new_product = """  {
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
];"""

content = content.replace("];\n\nexport function getProductBySlug", new_product + "\n\nexport function getProductBySlug")

with open('content/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)
