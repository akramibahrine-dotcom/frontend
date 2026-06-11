import type { Metadata } from "next";
import Link from "next/link";
import { TrustStrip } from "@/components/ui/TrustBadge";
import { NEWS_ARTICLES } from "@/content/news-articles";
import { BeforeAfterCarousel } from "@/components/product/BeforeAfterCarousel";
import { getSiteOrigin } from "@/lib/site-url";

const siteUrl = getSiteOrigin();

export const metadata: Metadata = {
  title: "أخبار ومقالات الصحة والأعشاب",
  description:
    "مقالات موجهة لمحركات البحث حول الأعشاب الطبيعية، العافية اليومية، ونصائح العناية الصحية — تحديثات منتظمة من بيت الصحة.",
  keywords: [
    "مقالات صحية",
    "أعشاب طبيعية",
    "شاي عشبي",
    "عافية",
    "السعودية",
    "بيت الصحة",
  ],
  openGraph: {
    title: "أخبار ومقالات | بيت الصحة",
    description: "مقالات عن الحلول العشبية والعافية اليومية.",
    url: `${siteUrl}/news`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/news`,
  },
};

/* ─── Data ─── */

const CATEGORIES = [
  { label: "الوزن الزائد", icon: "⚖️", color: "#155235" },
  { label: "القولون والهضم", icon: "🫁", color: "#2D7A4F" },
  { label: "البواسير", icon: "🩺", color: "#8B5E3C" },
  { label: "الكبد", icon: "🫀", color: "#A0522D" },
  { label: "التدخين والرئة", icon: "🚭", color: "#4A6741" },
  { label: "البروستات", icon: "🏥", color: "#6B4423" },
];

const WEEKS = [
  {
    num: "1",
    title: "أسبوع التأسيس والتنظيف",
    color: "#155235",
    routine: "كوب شاي التخسيس صباحًا على الريق + كوب قبل النوم بساعة",
    meals: [
      "الإفطار: بيض مسلوق + خبز بر + خيار وطماطم",
      "الغداء: صدر دجاج مشوي + أرز بني (نص كوب) + سلطة خضراء",
      "العشاء: زبادي يوناني + تمرتين + حفنة مكسرات نيئة",
    ],
    exercise: "مشي 20 دقيقة يوميًا بعد العشاء",
    tips: [
      "اشرب ٨ أكواب ماء يوميًا على الأقل",
      "تجنّب المشروبات الغازية والعصائر المحلّاة",
      "سجّل وزنك أول يوم كنقطة بداية",
    ],
  },
  {
    num: "٢",
    title: "أسبوع تسريع الحرق",
    color: "#2D7A4F",
    routine: "كوب شاي صباحًا + كوب بعد الغداء بساعة + كوب قبل النوم",
    meals: [
      "الإفطار: شوفان بالحليب قليل الدسم + موزة + قرفة",
      "الغداء: سمك مشوي + خضار سوتيه + سلطة تبّولة",
      "العشاء: شوربة عدس + خبز بر + سلطة",
    ],
    exercise: "مشي ٣٠ دقيقة + تمارين بطن خفيفة (١٠ دقائق)",
    tips: [
      "قلّل الأرز الأبيض واستبدله بالبر أو البرغل",
      "تناول وجبة خفيفة صحية بين الوجبات (فاكهة أو مكسرات)",
      "نام ٧-٨ ساعات يوميًا لتحسين معدل الحرق",
    ],
  },
  {
    num: "٣",
    title: "أسبوع التثبيت والانتظام",
    color: "#C99A45",
    routine: "كوب شاي صباحًا + كوب بعد الغداء + كوب مسائي",
    meals: [
      "الإفطار: فول مدمّس بزيت زيتون + خبز بر + جرجير",
      "الغداء: كبسة دجاج بأرز بني (حصة معتدلة) + سلطة",
      "العشاء: تونة بالليمون + خس + خبز توست أسمر",
    ],
    exercise: "مشي ٤٠ دقيقة + تمارين مقاومة خفيفة",
    tips: [
      "ابدأ بتقليل حصة الأرز تدريجيًا",
      "استبدل القلي بالشوي أو الطبخ بالبخار",
      "راقب قياساتك (الخصر) بجانب الميزان",
    ],
  },
  {
    num: "٤",
    title: "أسبوع الحصاد والنتائج",
    color: "#071C12",
    routine: "استمر على ٣ أكواب يوميًا مع شرب ماء كافي",
    meals: [
      "الإفطار: سموذي أخضر (سبانخ + موز + حليب لوز + ملعقة عسل)",
      "الغداء: لحم مشوي قليل الدهن + خضار مشوية + سلطة يونانية",
      "العشاء: بيض أومليت بالخضار + خبز بر",
    ],
    exercise: "مشي ٤٥ دقيقة + تمارين HIIT خفيفة (١٥ دقيقة)",
    tips: [
      "قارن وزنك وقياساتك بأول يوم — ستُفاجأ بالنتيجة!",
      "التزم بالنظام حتى بعد الـ ٣٠ يوم للحفاظ على النتائج",
      "شارك نتيجتك مع بيت الصحة واحصل على خصم للطلب القادم",
    ],
  },
];

/* ─── Page ─── */

export default function NewsPage() {
  const sorted = [...NEWS_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sorted.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/news/${article.slug}`,
      name: article.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrustStrip />

      {/* ════════════════ Hero Header ════════════════ */}
      <div className="bg-gradient-to-b from-[#071C12] to-[#155235] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C99A45] mb-3">
            مدونة بيت الصحة
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            الأخبار والمقالات
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            محتوى يهمّ البحث عن الأعشاب والعافية: نصائح عملية، وضوح بالمكونات، وتوجيهات للاستخدام الآمن.
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C99A45] to-transparent mx-auto mt-6" />
        </div>
      </div>

      {/* ════════════════ Categories Section ════════════════ */}
      <section className="bg-[#F8F1E7] py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F1A14] mb-3">
              تصفّح حسب المشكلة الصحية
            </h2>
            <p className="text-[#567063] max-w-xl mx-auto">
              اختر المشكلة التي تهمّك واكتشف الحلول العشبية الطبيعية المناسبة
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href="/categories"
                className="group flex flex-col items-center gap-3 bg-white rounded-2xl p-5 border border-[#E8D8C3] hover:border-[#C99A45] hover:shadow-lg transition-all duration-300"
              >
                <span
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${cat.color}15` }}
                >
                  {cat.icon}
                </span>
                <span className="text-sm font-bold text-[#0F1A14] text-center group-hover:text-[#155235] transition-colors">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ Existing Articles Grid ════════════════ */}
      <section className="bg-[#F5F3EE] py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F1A14] mb-3">
              أحدث المقالات
            </h2>
            <p className="text-[#567063]">اقرأ مقالاتنا المتجددة عن الأعشاب والعافية</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sorted.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8D8C3] hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-[#155235] bg-[#155235]/10 px-2.5 py-0.5 rounded-full">
                    {article.categoryAr}
                  </span>
                  <time
                    dateTime={article.publishedAt}
                    className="text-xs text-[#C99A45] font-bold"
                  >
                    {new Date(article.publishedAt).toLocaleDateString("ar-SA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h3 className="text-xl font-extrabold text-[#0F1A14] mb-4 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-[#567063] leading-relaxed mb-6 line-clamp-3 flex-1">
                  {article.excerpt}
                </p>
                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center gap-2 text-[#155235] font-bold hover:text-[#C99A45] transition-colors mt-auto"
                >
                  <span>اقرأ المقال</span>
                  <span aria-hidden="true">←</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ 30-Day Weight Loss Program ════════════════ */}
      <section className="bg-gradient-to-b from-[#F8F1E7] to-[#F5F3EE] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#155235]/10 rounded-full mb-4 border border-[#155235]/20">
              <span className="text-[#155235]">🍵</span>
              <span className="text-sm font-bold text-[#155235]">برنامج حصري</span>
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F1A14] mb-4">
              برنامج ٣٠ يوم لخسارة الوزن مع شاي بيت الصحة
            </h2>
            <p className="text-[#567063] max-w-2xl mx-auto leading-relaxed">
              نظام متكامل يجمع بين شاي الأعشاب الطبيعية والتغذية الصحية والحركة اليومية — مصمّم خصيصًا للمجتمع السعودي والخليجي بوجبات مألوفة وسهلة التطبيق.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="hidden md:block absolute right-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#155235] via-[#C99A45] to-[#071C12]" />

            <div className="space-y-8 md:space-y-12">
              {WEEKS.map((week, idx) => (
                <div
                  key={week.num}
                  className={`relative md:grid md:grid-cols-2 md:gap-8 ${
                    idx % 2 === 0 ? "" : "md:direction-ltr"
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className="hidden md:flex absolute right-1/2 -translate-x-1/2 w-10 h-10 rounded-full items-center justify-center text-white font-extrabold text-sm z-10 border-4 border-[#F8F1E7]"
                    style={{ backgroundColor: week.color }}
                  >
                    {week.num}
                  </div>

                  {/* Card */}
                  <div
                    className={`bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8D8C3] hover:shadow-md transition-shadow ${
                      idx % 2 === 0 ? "md:col-start-1 md:ml-8" : "md:col-start-2 md:mr-8"
                    }`}
                  >
                    {/* Mobile week number */}
                    <div className="md:hidden flex items-center gap-3 mb-4">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-extrabold text-sm"
                        style={{ backgroundColor: week.color }}
                      >
                        {week.num}
                      </span>
                      <span className="font-extrabold text-[#0F1A14]">الأسبوع {week.num}</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[#0F1A14] mb-2">
                      الأسبوع {week.num}: {week.title}
                    </h3>

                    {/* Tea routine */}
                    <div className="bg-[#155235]/5 rounded-xl p-4 mb-4">
                      <p className="text-sm font-bold text-[#155235] mb-1">🍵 روتين الشاي</p>
                      <p className="text-[#567063] text-sm">{week.routine}</p>
                    </div>

                    {/* Meals */}
                    <div className="mb-4">
                      <p className="text-sm font-bold text-[#0F1A14] mb-2">🍽️ الوجبات المقترحة</p>
                      <ul className="space-y-1.5">
                        {week.meals.map((meal) => (
                          <li key={meal} className="text-sm text-[#567063] flex items-start gap-2">
                            <span className="text-[#C99A45] mt-0.5 shrink-0">●</span>
                            {meal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exercise */}
                    <div className="bg-[#C99A45]/10 rounded-xl p-4 mb-4">
                      <p className="text-sm font-bold text-[#8B6914] mb-1">🏃 التمارين</p>
                      <p className="text-[#567063] text-sm">{week.exercise}</p>
                    </div>

                    {/* Tips */}
                    <div>
                      <p className="text-sm font-bold text-[#0F1A14] mb-2">💡 نصائح الأسبوع</p>
                      <ul className="space-y-1.5">
                        {week.tips.map((tip) => (
                          <li key={tip} className="text-sm text-[#567063] flex items-start gap-2">
                            <span className="text-[#C99A45] mt-0.5 shrink-0">✓</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Spacer for grid alignment */}
                  <div className="hidden md:block" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA after program */}
          <div className="text-center mt-12">
            <div className="inline-block bg-gradient-to-l from-[#155235] to-[#071C12] rounded-2xl p-8 md:p-10 max-w-2xl">
              <p className="text-white text-lg md:text-xl font-extrabold mb-3">
                جاهز تبدأ رحلتك؟
              </p>
              <p className="text-gray-300 text-sm mb-6">
                اطلب شاي بيت الصحة الآن وابدأ برنامج الـ ٣٠ يوم — النتائج تبدأ من الأسبوع الأول!
              </p>
              <Link
                href="/products/weight-support-tea"
                className="inline-flex items-center gap-2 bg-[#C99A45] hover:bg-[#B8893A] text-white font-bold px-8 py-3.5 rounded-full transition-colors"
              >
                <span>اطلب الآن</span>
                <span aria-hidden="true">←</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ نظام الطيبات Article ════════════════ */}
      <section className="bg-[#071C12] py-16 md:py-20">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4 border border-white/20">
              <span>🌿</span>
              <span className="text-sm font-bold text-[#C99A45]">فلسفة غذائية</span>
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
              نظام الطيبات — فلسفة الغذاء الطبيعي
            </h2>
            <p className="text-[#C99A45] text-sm font-bold mb-6">
              رحمه الله الدكتور عبدالله المطلق صاحب هذا النظام الغذائي المبارك
            </p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C99A45] to-transparent mx-auto" />
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10">
              <h3 className="text-xl font-extrabold text-white mb-4">ما هو نظام الطيبات؟</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                نظام الطيبات هو فلسفة غذائية أسّسها الدكتور عبدالله المطلق رحمه الله، تقوم على مبدأ بسيط وعميق: أن نأكل مما وصفه الله تعالى بـ «الطيبات» في القرآن الكريم. قال تعالى: ﴿يَا أَيُّهَا الرُّسُلُ كُلُوا مِنَ الطَّيِّبَاتِ وَاعْمَلُوا صَالِحًا﴾ — فالطيبات هي كل ما هو طبيعي، نقي، وغير محوّر أو مصنّع.
              </p>
              <p className="text-gray-300 leading-relaxed">
                يُركّز هذا النظام على العودة إلى الغذاء كما خلقه الله: الفواكه والخضروات الطازجة، الحبوب الكاملة، العسل الطبيعي، التمر، اللحوم الطبيعية، والأعشاب — مع الابتعاد عن الأغذية المصنّعة والمحفوظة والمليئة بالمواد الكيميائية.
              </p>
            </div>

            {/* Core Principles */}
            <div className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10">
              <h3 className="text-xl font-extrabold text-white mb-6">أركان نظام الطيبات</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "الأصالة والطبيعية",
                    desc: "تناول الأطعمة بحالتها الطبيعية قدر الإمكان — بدون إضافات صناعية أو مواد حافظة أو ألوان مصنّعة.",
                    icon: "🌱",
                  },
                  {
                    title: "القصد والاعتدال",
                    desc: "﴿وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا﴾ — الاعتدال في الأكل وعدم الإسراف من أهم مبادئ الطيبات.",
                    icon: "⚖️",
                  },
                  {
                    title: "الموسمية والمحلية",
                    desc: "تفضيل المنتجات المحلية والموسمية التي تنمو في بيئتنا لأنها أنسب لأجسامنا وأكثر بركة.",
                    icon: "🌾",
                  },
                  {
                    title: "الابتعاد عن المصنّع",
                    desc: "تجنّب الأغذية فائقة التصنيع والوجبات السريعة والمشروبات الغازية والسكر المكرر قدر الإمكان.",
                    icon: "🚫",
                  },
                ].map((p) => (
                  <div key={p.title} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <span className="text-2xl block mb-2">{p.icon}</span>
                    <h4 className="font-bold text-white mb-2">{p.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Connection to herbal tea */}
            <div className="bg-gradient-to-l from-[#155235]/30 to-[#155235]/10 rounded-3xl p-6 md:p-8 border border-[#155235]/30">
              <h3 className="text-xl font-extrabold text-white mb-4">
                الشاي العشبي في فلسفة الطيبات
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                الأعشاب الطبيعية هي من أنقى صور الطيبات — فهي نباتات خلقها الله بفوائدها دون تدخّل بشري. استخدم أجدادنا الأعشاب كالسنا والشمر والزنجبيل والنعناع لقرون طويلة كجزء أساسي من نظامهم الغذائي اليومي.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                في بيت الصحة، نلتزم بهذه الفلسفة: أعشاب طبيعية ١٠٠٪ بدون إضافات كيميائية أو نكهات صناعية. كل كوب شاي هو عودة إلى الطبيعة التي أوجدها الله لنا.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {["أعشاب طبيعية ١٠٠٪", "بدون مواد حافظة", "بدون إضافات صناعية", "مكونات نقية"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold text-[#C99A45] bg-[#C99A45]/10 px-3 py-1.5 rounded-full border border-[#C99A45]/20"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Tribute */}
            <div className="text-center py-6">
              <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
                نسأل الله أن يرحم الدكتور عبدالله المطلق ويجعل ما قدّمه من علم نافع في ميزان حسناته. لقد ترك لنا إرثًا غذائيًا مباركًا ينتفع به الملايين.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ Before & After ════════════════ */}
      <BeforeAfterCarousel />
    </>
  );
}
