import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrustStrip } from "@/components/ui/TrustBadge";
import {
  NEWS_ARTICLES,
  getNewsArticleBySlug,
  getAllNewsSlugs,
  type NewsArticle,
} from "@/content/news-articles";
import { getSiteOrigin } from "@/lib/site-url";

const siteUrl = getSiteOrigin();

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

function buildJsonLd(article: NewsArticle, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Organization",
      name: "بيت الصحة",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "بيت الصحة",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: article.keywords.join(", "),
    inLanguage: "ar-SA",
    articleSection: article.categoryAr,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);
  if (!article) return { title: "المقال غير موجود" };

  const url = `${siteUrl}/news/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.keywords,
    openGraph: {
      title: `${article.title} | بيت الصحة`,
      description: article.excerpt,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);
  if (!article) notFound();

  const url = `${siteUrl}/news/${article.slug}`;
  const jsonLd = buildJsonLd(article, url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrustStrip />
      <article className="bg-[#F5F3EE] min-h-screen pb-20">
        <div className="max-w-[760px] mx-auto px-4 pt-10 pb-6">
          <nav className="text-sm text-[#567063] mb-8" aria-label="مسار التصفح">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#155235] transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/news" className="hover:text-[#155235] transition-colors">
                  الأخبار والمقالات
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#0F1A14] font-medium line-clamp-1">{article.title}</li>
            </ol>
          </nav>

          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
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
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F1A14] leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-[#567063] leading-relaxed">{article.excerpt}</p>
          </header>

          <div className="prose-news bg-white rounded-3xl border border-[#E8D8C3] p-8 md:p-10 shadow-sm">
            {article.sections.map((section, i) => (
              <section key={i} className={i > 0 ? "mt-10" : ""}>
                {section.heading ? (
                  <h2 className="text-xl font-extrabold text-[#0F1A14] mb-4">
                    {section.heading}
                  </h2>
                ) : null}
                <div className="space-y-4 text-[#567063] leading-relaxed text-base">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <aside className="mt-10 pt-8 border-t border-[#E8D8C3]">
              <p className="text-xs text-[#567063] leading-relaxed">
                المعلومات في هذا المقال للتوعية العامة ولا تُعد تشخيصًا أو علاجًا طبيًا. استشر مختصًا عند الحاجة، خاصة مع الحمل أو الرضاعة أو الأدوية المزمنة.
              </p>
            </aside>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[#155235] font-bold hover:text-[#C99A45] transition-colors"
            >
              <span aria-hidden="true">→</span>
              <span>جميع المقالات</span>
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#1F6B4E] text-white font-bold hover:bg-[#124332] transition-colors"
            >
              تصفّح المنتجات
            </Link>
          </div>

          {NEWS_ARTICLES.filter((a) => a.slug !== article.slug).length > 0 ? (
            <section className="mt-16">
              <h2 className="text-lg font-extrabold text-[#0F1A14] mb-6">مقالات قد تعجبك</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {NEWS_ARTICLES.filter((a) => a.slug !== article.slug)
                  .slice(0, 2)
                  .map((related) => (
                    <li key={related.slug}>
                      <Link
                        href={`/news/${related.slug}`}
                        className="block bg-white rounded-2xl border border-[#E8D8C3] p-5 hover:shadow-md transition-shadow"
                      >
                        <span className="text-xs text-[#C99A45] font-bold">
                          {new Date(related.publishedAt).toLocaleDateString("ar-SA", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <p className="font-bold text-[#0F1A14] mt-2 line-clamp-2">{related.title}</p>
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          ) : null}
        </div>
      </article>
    </>
  );
}
