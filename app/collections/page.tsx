import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { TrustStrip } from "@/components/ui/TrustBadge";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { PRODUCTS } from "@/content/products";
import { CATEGORIES } from "@/content/categories";
import { COPY } from "@/content/copy";

export const metadata: Metadata = {
  title: "جميع المنتجات",
  description: "اختر الخلطة الأقرب لاحتياجك اليومي من مجموعة بيت الصحة من الشاي العشبي.",
};

export default function CollectionsPage() {
  return (
    <>
      <TrustStrip />

      <section className="hero-gradient py-14">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            {COPY.collection.headlineAr}
          </h1>
          <div className="divider-mint w-24 mx-auto my-4" />
          <p className="text-[#FFFFFF]/80 text-lg max-w-xl mx-auto">
            {COPY.collection.subheadlineAr}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Help choosing */}
      <section className="py-12 bg-[#F8F1E7]">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-xl font-extrabold text-[#0F1A14] text-center mb-2">
            تصفّح حسب الحاجة الصحية
          </h2>
          <p className="text-[#567063] text-center text-sm mb-8">
            اختر التصنيف الأقرب لاحتياجك، ثم تصفح المنتجات داخل كل تصنيف.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="bg-white border border-[#E8E2D8] rounded-xl p-3 text-center text-sm font-medium text-[#0F1A14] hover:border-[#155235] hover:text-[#155235] hover:bg-[#F5F3EE] transition-colors"
              >
                {category.nameAr}
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#155235] text-white text-sm font-bold hover:bg-[#0A3622] transition-colors"
            >
              عرض كل التصنيفات ←
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-xl font-extrabold text-center text-[#1D1D1B] mb-6">أسئلة شائعة</h2>
          <div className="max-w-2xl mx-auto">
            <FAQAccordion items={COPY.faqGlobal} />
          </div>
        </div>
      </section>

      <div className="bg-[#F8F1E7] border-t border-[#E8D8C3] py-4 px-4 text-center">
        <p className="text-xs text-[#6E675F] max-w-2xl mx-auto">{COPY.disclaimer}</p>
      </div>
    </>
  );
}
