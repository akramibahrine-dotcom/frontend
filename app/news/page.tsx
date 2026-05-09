import type { Metadata } from "next";
import Link from "next/link";
import { TrustStrip } from "@/components/ui/TrustBadge";
import { NEWS_ARTICLES } from "@/content/news-articles";
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
      <div className="bg-[#F5F3EE] py-16 min-h-screen">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[#155235] mb-3">
              مدونة بيت الصحة
            </p>
            <h1 className="text-4xl font-extrabold text-[#0F1A14] mb-4">
              الأخبار والمقالات
            </h1>
            <p className="text-[#567063] text-lg max-w-2xl mx-auto leading-relaxed">
              محتوى يهمّ البحث عن الأعشاب والعافية: نصائح عملية، وضوح بالمكونات، وتوجيهات للاستخدام الآمن — بدون وعود طبية مبالغ فيها.
            </p>
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
                <h2 className="text-xl font-extrabold text-[#0F1A14] mb-4 line-clamp-2">
                  {article.title}
                </h2>
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

          <div className="mt-16 text-center">
            <p className="text-[#567063] text-sm bg-white inline-block px-6 py-3 rounded-full border border-[#E8D8C3] max-w-xl mx-auto leading-relaxed">
              نحدّث الصفحة بمقالات جديدة عن الأعشاب والعافية والاستخدام الآمن — تابعونا.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
