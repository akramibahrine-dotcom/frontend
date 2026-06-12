import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "سياسة الإرجاع والتوصيل",
};

export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-[#1D1D1B] mb-8">سياسة الإرجاع والتوصيل</h1>

      <div className="space-y-6 text-[#6E675F] leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">التوصيل</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>التوصيل داخل المملكة العربية السعودية فقط.</li>
            <li>سيتواصل فريقنا لتأكيد الطلب قبل التجهيز.</li>
            <li>قد تختلف مدد التوصيل حسب المنطقة.</li>
            <li>الدفع عند الاستلام - بدون بطاقة.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">الإرجاع</h2>
          <p className="mb-2">
            يمكنك إرجاع المنتجات غير المفتوحة مجانًا خلال 7 أيام من تاريخ الاستلام، بشرط أن تكون بحالتها الأصلية.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>المنتجات غير المفتوحة يمكن إرجاعها خلال المدة المحددة.</li>
            <li>المنتجات المفتوحة أو المستخدمة غير مؤهلة للإرجاع كونها منتجات استهلاكية.</li>
            <li>في حالة التلف أو الخطأ في التوصيل، تواصلي معنا فورًا.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">رفض الطلب عند التوصيل</h2>
          <p>
            في حالة رفض الطلب عند التوصيل، قد تُطبق رسوم توصيل معادة. يُرجى التأكد من الرد على رسالة أو اتصال تأكيد الطلب لضمان سرعة التوصيل.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">التواصل لمشاكل الطلبات</h2>
          <p>
            للتواصل بشأن طلبك، استخدمي صفحة{" "}
            <Link href="/contact" className="text-[#1F6B4E] underline">
              التواصل معنا
            </Link>
            .
          </p>
        </section>

        <div className="bg-[#F8F1E7] border border-[#E8D8C3] rounded-xl p-4 text-sm">
          <p>
            منتجات بيت الصحة — أعشاب وعناية طبيعية يومية — ليست أدوية. للاستفسارات، تواصلي معنا.
          </p>
        </div>
      </div>
    </div>
  );
}
