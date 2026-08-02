import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug, getCrossSellProducts } from "@/content/products";
import { ProductPageClient } from "./ProductPageClient";

type Props = { params: Promise<{ slug: string }> };

// Allow on-demand rendering for any product slug
export const dynamicParams = true;

export async function generateStaticParams() {
  // Skip heavy product pre-render in Docker/standalone builds (avoids OOM on small VPS)
  if (process.env.NEXT_OUTPUT_STANDALONE === "true") return [];
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "المنتج غير موجود" };
  return {
    title: product.nameAr,
    description: product.subheadlineAr,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const crossSells = getCrossSellProducts(product.id).slice(0, 2);

  return <ProductPageClient product={product} crossSells={crossSells} />;
}
