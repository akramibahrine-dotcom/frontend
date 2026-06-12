import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-[#1D1D1B] mb-8">سياسة الخصوصية</h1>

      <div className="prose prose-sm max-w-none text-[#6E675F] leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">البيانات التي نجمعها</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>الاسم ورقم الجوال لتأكيد الطلب والتوصيل.</li>
            <li>عنوان IP ومعرّف المتصفح لأغراض الأمان ومنع الاحتيال.</li>
            <li>معرّفات الإعلانات (مثل fbclid، ttclid، ScCid) لقياس أداء الحملات.</li>
            <li>محتوى الطلب وبياناته لإدارة العمليات.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">لماذا نجمع هذه البيانات</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>تأكيد الطلبات والتواصل مع العملاء قبل التجهيز.</li>
            <li>تنظيم التوصيل وخدمة ما بعد البيع.</li>
            <li>منع الطلبات الاحتيالية باستخدام خدمة MaxMind.</li>
            <li>قياس أداء الإعلانات عبر Meta وTikTok وSnapchat (Pixel وCAPI).</li>
            <li>تحسين تجربة الموقع وخدماتنا.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">التتبع من جهة الخادم</h2>
          <p>
            نستخدم Conversions API (CAPI) لإرسال بيانات التحويل مباشرة من خوادمنا إلى منصات الإعلانات (Meta، TikTok، Snapchat) بغرض قياس الأداء فقط. لا نشارك بيانات شخصية خاصة مع أطراف ثالثة لأغراض تجارية.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">ملفات تعريف الارتباط (Cookies)</h2>
          <p>
            يستخدم الموقع ملفات الارتباط لتذكر معرّفات الجلسة وقياس الإعلانات. يمكنك إدارة هذه الملفات من إعدادات متصفحك.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">حفظ البيانات وأمانها</h2>
          <p>
            نحتفظ ببيانات الطلبات لفترة ضرورية لأغراض التشغيل. نطبق معايير أمنية مناسبة لحماية بياناتك من الوصول غير المصرح به.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1D1D1B] mb-2">حقوقك</h2>
          <p>
            يحق لك طلب الاطلاع على بياناتك أو تعديلها أو حذفها. تواصلي معنا عبر صفحة التواصل.
          </p>
        </section>

        <div className="bg-[#F8F1E7] border border-[#E8D8C3] rounded-xl p-4 text-sm">
          <p>
            منتجات بيت الصحة — أعشاب وعناية طبيعية يومية — ليست أدوية. للاستفسارات، تواصلي معنا عبر صفحة التواصل.
          </p>
        </div>
      </div>
    </div>
  );
}
