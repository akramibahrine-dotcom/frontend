import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug, getCrossSellProducts } from "@/content/products";
import { ProductPageClient } from "./ProductPageClient";

type Props = { params: Promise<{ slug: string }> };

// Allow on-demand rendering for any product slug
export const dynamicParams = true;
// Cache product HTML after first render — big TTFB/LCP win vs force-dynamic.
export const revalidate = 3600;

export async function generateStaticParams() {
  // Skip heavy product pre-render in Docker/standalone builds (avoids OOM on small VPS)
  if (process.env.NEXT_OUTPUT_STANDALONE === "true") return [];
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "المنتج غير موجود" };
  const hero = product.heroImages?.[0] ?? product.images[0];
  return {
    title: product.nameAr,
    description: product.subheadlineAr,
    openGraph: hero
      ? {
          images: [{ url: hero }],
        }
      : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const crossSells = getCrossSellProducts(product.id).slice(0, 2);

  // LCP preload comes from next/image `priority` on the hero (optimized WebP/AVIF URL).
  return <ProductPageClient product={product} crossSells={crossSells} />;
}
