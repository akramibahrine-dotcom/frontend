import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryBySlug } from "@/content/categories";
import { getProductBySlug } from "@/content/products";
import { ProductCard } from "@/components/product/ProductCard";
import { TrustStrip } from "@/components/ui/TrustBadge";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "التصنيف غير موجود" };
  return {
    title: category.nameAr,
    description: category.descriptionAr,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = category.productSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <TrustStrip />

      <section className="hero-gradient py-14">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <p className="text-[#C99A45] text-xs font-semibold tracking-widest mb-3">
            <Link href="/categories" className="hover:underline">
              التصنيفات
            </Link>{" "}
            / {category.shortNameAr}
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            {category.nameAr}
          </h1>
          <div className="divider-mint w-24 mx-auto my-4" />
          <p className="text-[#FFFFFF]/80 text-base max-w-xl mx-auto leading-relaxed">
            {category.descriptionAr}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          {products.length === 0 ? (
            <div className="max-w-xl mx-auto text-center py-16">
              <p className="text-5xl mb-4">🌿</p>
              <h2 className="text-xl font-extrabold text-[#0F1A14] mb-2">
                منتجات هذا التصنيف قريبًا
              </h2>
              <p className="text-[#567063] text-sm leading-relaxed mb-6">
                نعمل على إضافة المنتجات إلى تصنيف &quot;{category.nameAr}&quot;.
                تابعنا قريبًا، أو تصفّح بقية تصنيفات بيت الصحة.
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#155235] text-white font-bold hover:bg-[#0A3622] transition-colors"
              >
                تصفّح كل التصنيفات
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-10 bg-[#F8F1E7]">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h3 className="text-lg font-extrabold text-[#0F1A14] mb-4">
            تصفح تصنيفات أخرى
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="bg-white border border-[#E8E2D8] rounded-full px-4 py-2 text-sm font-medium text-[#0F1A14] hover:border-[#155235] hover:text-[#155235] transition-colors"
              >
                {c.nameAr}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
