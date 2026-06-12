import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-[#1D1D1B] mb-8">الشروط والأحكام</h1>

      <div className="space-y-6 text-[#6E675F] leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">طبيعة المنتجات</h2>
          <p>
            منتجات بيت الصحة — أعشاب وعناية طبيعية يومية — ليست أدوية ولا بديلًا عن الاستشارة الطبية. لا تُستخدم لتشخيص أو علاج أو الوقاية من أي مرض.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">شروط الطلب</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>تقبل الطلبات من داخل المملكة العربية السعودية فقط.</li>
            <li>يجب إدخال رقم جوال سعودي صالح.</li>
            <li>نحتفظ بالحق في رفض الطلبات المشبوهة أو غير المؤهلة.</li>
            <li>الدفع عند الاستلام للطلبات المقبولة داخل المملكة.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">التوصيل</h2>
          <p>
            نوصل داخل جميع مناطق المملكة العربية السعودية. قد تختلف مدد التوصيل حسب المنطقة. سيتواصل فريقنا لتأكيد الطلب قبل التجهيز والشحن.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">إخلاء المسؤولية</h2>
          <p>
            بيت الصحة ليست مسؤولة عن أي نتائج صحية متوقعة أو غير متوقعة ناتجة عن استخدام المنتجات. يُنصح دائمًا باستشارة متخصص صحي قبل استخدام المنتجات العشبية في حالات الحمل والرضاعة والأمراض المزمنة واستخدام الأدوية.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">تعديل الشروط</h2>
          <p>
            نحتفظ بالحق في تعديل هذه الشروط في أي وقت. يُعدّ استمرار استخدام الموقع موافقةً على الشروط المحدّثة.
          </p>
        </section>

        <div className="bg-[#F8F1E7] border border-[#E8D8C3] rounded-xl p-4 text-sm">
          <p>
            للاستفسارات، تواصلي معنا عبر صفحة التواصل.
          </p>
        </div>
      </div>
    </div>
  );
}
