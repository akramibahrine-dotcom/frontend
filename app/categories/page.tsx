import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/content/categories";
import { TrustStrip } from "@/components/ui/TrustBadge";

export const metadata: Metadata = {
  title: "حسب الحاجة الصحية — التصنيفات",
  description:
    "اختر التصنيف الأقرب لاحتياجك من بيت الصحة: دعم الوزن، راحة القولون، صحة الكبد، الرئة، البروستات، والمزيد.",
};

export default function CategoriesPage() {
  return (
    <>
      <TrustStrip />

      <section className="hero-gradient py-14">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            اختر حسب حاجتك الصحية
          </h1>
          <div className="divider-mint w-24 mx-auto my-4" />
          <p className="text-[#FFFFFF]/80 text-lg max-w-xl mx-auto">
            تصنيفات بيت الصحة مرتبة حسب الاحتياج اليومي — اختر التصنيف الأقرب لك،
            ثم تصفح المنتجات المتوفرة فيه.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#FAFAF8]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-2xl border border-[#E8E0D4] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="aspect-square overflow-hidden rounded-b-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={category.image}
                    alt={category.nameAr}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h2 className="font-extrabold text-[#1C1C1E] text-lg group-hover:text-[#1C1C1E] transition-colors">
                    {category.nameAr}
                  </h2>
                  <p className="text-sm text-[#3D3D3D] leading-relaxed line-clamp-3">
                    {category.descriptionAr}
                  </p>
                  <span className="mt-auto text-[#1C1C1E] text-sm font-bold pt-2">
                    تصفح التصنيف ←
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
