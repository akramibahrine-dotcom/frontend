import type { Metadata } from "next";
import Link from "next/link";
import { COPY } from "@/content/copy";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرّف على قصة بيت الصحة: أعشابٌ تُختار بذوق البيت، ووعدٌ بالوضوح قبل الإبهار في أي إعلان.",
};

export default function AboutPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1B] mb-4">
          {COPY.about.headlineAr}
        </h1>
        <p className="text-[#6E675F] text-lg max-w-xl mx-auto leading-relaxed">
          {COPY.about.storyAr}
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="text-right">
          <h2 className="text-2xl font-extrabold text-[#1D1D1B] mb-4">قصتنا</h2>
          <p className="text-[#6E675F] leading-relaxed mb-4">
            {COPY.about.storyAr}
          </p>
          <p className="text-[#6E675F] leading-relaxed">
            التجربة مو مجرد شاي. هي وضوح بالمكونات، شرح للاستخدام، تغليف مرتب، ودعم قبل وبعد الطلب.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm bg-gradient-to-br from-green-100 to-emerald-50 rounded-3xl aspect-square flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-3">🌿</div>
              <p className="text-sm text-[#6E675F] px-4">صورة توضيحية</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F1E7] rounded-3xl p-8 md:p-12 mb-16">
        <h2 className="text-2xl font-extrabold text-[#1D1D1B] mb-8 text-center">
          {COPY.about.promiseTitle}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COPY.about.beliefPoints.map((point, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 text-center border border-[#E8D8C3]"
            >
              <div className="w-10 h-10 rounded-full bg-[#1F6B4E] text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
                ✓
              </div>
              <p className="text-sm font-bold text-[#1D1D1B]">{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-3xl border border-[#E8D8C3] p-8 mb-16">
        <h2 className="text-xl font-extrabold text-[#1D1D1B] mb-4 text-center">وعدنا بالجودة</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-[#6E675F] leading-relaxed">
          <p>✅ نتحقق من الموردين قبل تبنّي أي منتج.</p>
          <p>✅ نراجع التغليف والمواصفات بشكل دوري.</p>
          <p>✅ نستمع لملاحظات العملاء ونُحسّن المنتجات باستمرار.</p>
          <p>✅ لا ندّعي تأثيرات طبية غير مؤكدة أو غير موثقة.</p>
        </div>
        <div className="mt-6 p-4 bg-[#F8F1E7] rounded-xl">
          <p className="text-xs text-[#6E675F] text-center">
            {COPY.disclaimer}
          </p>
        </div>
      </section>

      <div className="text-center">
        <Link
          href="/collections"
          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#1F6B4E] text-white font-bold text-lg hover:bg-[#124332] transition-colors"
        >
          اكتشف المجموعة
        </Link>
      </div>
    </div>
  );
}
