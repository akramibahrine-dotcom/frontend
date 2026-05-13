import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { PRODUCTS } from "@/content/products";
import { CATEGORIES } from "@/content/categories";
import { COPY } from "@/content/copy";
import { ReviewsMarquee } from "@/components/home/ReviewsMarquee";
import { BrandGalleryMarquee } from "@/components/home/BrandGalleryMarquee";

export const metadata: Metadata = {
  title: "بيت الصحة — أعشاب تليق ببيتك، والدفع عند بابك",
  description:
    "بيت الصحة يقدّم لك أعشابًا مختارة لروتين يومي هادئ داخل السعودية: وضوح بالمكوّنات، طلب بسيط، والدفع عند الاستلام.",
};

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO — light background, dark green text ═══ */}
      <section className="bg-[#F5F3EE] leaf-pattern relative overflow-hidden py-20 md:py-32">
        {/* decorative corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #C99A45 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 w-[350px] h-[350px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C99A45 0%, transparent 70%)" }}
        />

        <div className="relative max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="text-right animate-float-up">
              <span className="inline-block bg-[#071C12]/5 border border-[#071C12]/10 text-[#071C12] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest">
                🌿 {COPY.brand.taglineAr}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#071C12] leading-tight mb-5">
                {COPY.hero.headlineAr}
              </h1>
              <p className="text-[#071C12]/80 text-lg leading-relaxed mb-8">
                {COPY.hero.subheadlineAr}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/collections"
                  className="btn-luxury inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold transition-all text-white"
                >
                  {COPY.hero.ctaAr} ←
                </Link>
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#071C12]/20 text-[#071C12] font-semibold text-base hover:bg-[#071C12]/5 transition-colors"
                >
                  {COPY.hero.ctaSecondaryAr}
                </Link>
              </div>
              <div className="flex items-center gap-4 mt-5">
                <span className="text-[#071C12]/70 text-xs font-bold">✓ دفع عند الاستلام</span>
                <span className="w-1 h-1 rounded-full bg-[#071C12]/30" />
                <span className="text-[#071C12]/70 text-xs font-bold">✓ بدون بطاقة</span>
                <span className="w-1 h-1 rounded-full bg-[#071C12]/30" />
                <span className="text-[#071C12]/70 text-xs font-bold">✓ توصيل السعودية</span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="flex flex-col items-center justify-center relative">
              <div className="w-full max-w-md relative rounded-3xl overflow-hidden shadow-2xl shadow-[#071C12]/40 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product-galery/hero-main.jpg"
                  alt="منتجات بيت الصحة — أعشاب طبيعية فاخرة"
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071C12]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6 text-center">
                  <p className="font-extrabold text-[#C99A45] text-xl mb-2">بيت الصحة</p>
                  <div className="flex justify-center gap-2">
                    {["💳 الدفع عند الاستلام", "🚚 توصيل الخليج", "🌿 طبيعي ١٠٠٪"].map((b) => (
                      <span
                        key={b}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] py-1 px-2 rounded-full font-medium"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HEALTH PROBLEMS / CATEGORIES STRIP ═══ */}
      <section className="bg-white border-y border-[#E8E2D8] py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-5">
            <span className="inline-block text-[#155235] text-xs font-semibold tracking-widest uppercase mb-2">
              تصفّح حسب الحاجة
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#0F1A14]">
              ما المشكلة الصحية التي تبحث عنها؟
            </h2>
            <p className="text-[#567063] text-sm mt-2">
              اضغط على الحاجة الأقرب لك لتنتقل إلى تصنيف المنتجات المناسب.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="bg-[#F5F3EE] border border-[#E8E2D8] rounded-full px-4 py-2 text-sm font-medium text-[#0F1A14] hover:border-[#155235] hover:text-[#155235] hover:bg-white transition-colors"
              >
                {category.nameAr}
              </Link>
            ))}
            <Link
              href="/categories"
              className="bg-[#155235] text-white rounded-full px-4 py-2 text-sm font-bold hover:bg-[#0A3622] transition-colors"
            >
              كل التصنيفات ←
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE BANNER ═══ */}
      <div className="bg-[#071C12] border-y border-[#C99A45]/30 overflow-hidden py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {[0, 1].map((dup) => (
            <div
              key={dup}
              className="flex gap-16 px-8 text-[#C99A45] font-extrabold text-base md:text-lg items-center"
            >
              {COPY.homeMarquee.map((line) => (
                <span key={`${dup}-${line}`}>{line}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <ReviewsMarquee />

      <BrandGalleryMarquee />

      {/* ═══ PRODUCTS GRID ═══ */}
      <section className="py-20 bg-[#F5F3EE]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-[#155235] text-xs font-semibold tracking-widest uppercase mb-3">
              المجموعة
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F1A14] mb-3">
              {COPY.collection.headlineAr}
            </h2>
            <div className="divider-mint w-24 mx-auto mt-4 mb-4" />
            <p className="text-[#567063] max-w-xl mx-auto text-sm leading-relaxed">
              {COPY.collection.subheadlineAr}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY BAYTSEHA — dark green cards ═══ */}
      <section className="py-20 bg-[#0D2B1D]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              ليش بيت الصحة؟
            </h2>
            <div className="divider-mint w-24 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "🌿",
                titleAr: "أعشابٌ كما للبيت",
                textAr: "نختار المزيج ونوضح المكوّنات وكيفية الشرب — بلا غموضٍ يضيّق عليك.",
              },
              {
                icon: "💳",
                titleAr: "ثقتك قبل مالك",
                textAr: "تتأكد من الطلب، ثم تدفع عندما يصلك المندوب — بلا بطاقةٍ ولا ترتيباتٍ جانبية.",
              },
              {
                icon: "🚚",
                titleAr: "من مخازننا إلى رحاب بيتك",
                textAr: "نوصل داخل حدود المملكة؛ عنوانك يُؤكَّد مع فريق بيت الصحة قبل التجهيز.",
              },
              {
                icon: "💬",
                titleAr: "صوتٌ يسمَعك",
                textAr: "قبل أن تضغط «اشترِ» وبعد أن يصل الطرد — نجيبك كما يجب أن يُجاب الزائر على باب بيتٍ كريمٍ.",
              },
            ].map((item) => (
              <div
                key={item.titleAr}
                className="glass-card rounded-2xl p-6 text-center hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#155235] flex items-center justify-center text-2xl mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#C99A45] mb-2 text-sm">{item.titleAr}</h3>
                <p className="text-xs text-white/80 leading-relaxed">{item.textAr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EMOTIONAL — masculine tone ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-right">
              <span className="inline-block text-[#155235] text-xs font-semibold tracking-widest mb-3">
                روتينك اليومي
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F1A14] mb-4 leading-tight">
                بيت الصحة: كوبٌ في يومك يذكّرك أنك تستحق هدوءًا
              </h2>
              <p className="text-[#567063] leading-relaxed mb-4">
                لا حاجة لانتظار «الوقت المناسب». أحيانًا يكفي أن تجلس دقيقتين مع بخارٍ يعبق بالأعشاب،
                فتعود إلى نهضك وأنت أهدأ قليلًا.
              </p>
              <p className="text-[#567063] leading-relaxed mb-6">
                اختر الباقة التي تلائم بيتك — لك ولمن تحب — ودع عتبة بيت الصحة تقرّب لك الممارسة اليومية.
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#155235] text-white font-bold hover:bg-[#0A3622] transition-colors"
              >
                تصفَّح المجموعة
              </Link>
            </div>
            <div className="flex items-center justify-center order-first md:order-last">
              <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl shadow-[#155235]/20 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product-galery/gallery-lifestyle.jpg"
                  alt="لحظات العناية اليومية مع بيت الصحة"
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BUNDLE VALUE — dark luxury ═══ */}
      <section className="py-20 bg-[#071C12] text-white relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#C99A45 0px,#C99A45 1px,transparent 1px,transparent 60px)" }}
        />
        <div className="relative max-w-[1200px] mx-auto px-4 text-center">
          <span className="inline-block text-[#C99A45] text-xs font-semibold tracking-widest mb-3">
            باقات التوفير
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
            كلما زادت الباقة، زاد التوفير
          </h2>
          <p className="text-white/70 mb-12 text-sm">اختر ما يليق ببيتك وبميزانيتك</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl mx-auto">
            {[
              { qty: 3, price: 349, savings: 248, badge: "الأكثر توفيرًا", highlight: true },
              { qty: 2, price: 279, savings: 119, badge: "الأكثر طلبًا", highlight: false },
              { qty: 1, price: 199, savings: 0, badge: "للتجربة", highlight: false },
            ].map((offer) => (
              <div
                key={offer.qty}
                className={`rounded-2xl p-6 border transition-all ${
                  offer.highlight
                    ? "border-[#C99A45] bg-gradient-to-b from-[#C99A45]/15 to-[#C99A45]/5 shadow-[0_0_30px_rgba(201,154,69,0.2)]"
                    : "border-white/10 glass-card hover:border-white/20"
                }`}
              >
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                    offer.highlight ? "bg-[#C99A45] text-[#071C12]" : "bg-white/10 text-white"
                  }`}
                >
                  {offer.badge}
                </span>
                <p className="text-4xl font-extrabold text-white">{offer.price}</p>
                <p className="text-white/60 text-sm">ريال</p>
                <p className="text-xs text-white/60 mt-2">
                  {offer.qty} {offer.qty === 1 ? "عبوة" : "عبوات"}
                </p>
                {offer.savings > 0 && (
                  <p className="text-[#C99A45] text-xs font-bold mt-2">وفّر {offer.savings} ريال</p>
                )}
              </div>
            ))}
          </div>

          <Link
            href="/collections"
            className="btn-luxury animate-pulse-glow inline-flex items-center justify-center mt-12 px-10 py-4 rounded-full font-bold text-base transition-all"
          >
            ادخل المجموعة ←
          </Link>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-[#0F1A14] text-center mb-2">
            ما الذي يدور في بالك؟
          </h2>
          <div className="divider-mint w-24 mx-auto mb-10" />
          <div className="max-w-2xl mx-auto">
            <FAQAccordion items={COPY.faqGlobal} />
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA — luxury dark green ═══ */}
      <section className="py-20 hero-gradient text-white text-center relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(201,154,69,0.12) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-[1200px] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            بابٌ عشبيٌّ في بيتك… نفتحه لك اليوم
          </h2>
          <p className="text-white/90 mb-10 text-lg max-w-lg mx-auto leading-relaxed">
            بيت الصحة يلخّص لك الأعشاب في عبوّاتٍ واضحةٍ وطلبٍ بلا تعقيد — والدفع عندما يقرّب المندوب الطرد منك.
          </p>
          <Link
            href="/collections"
            className="btn-luxury inline-flex items-center justify-center px-10 py-5 rounded-full font-extrabold text-lg"
          >
            ادخل المجموعة ←
          </Link>
        </div>
      </section>

    </>
  );
}