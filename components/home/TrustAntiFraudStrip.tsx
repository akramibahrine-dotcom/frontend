/**
 * Copy reflects backend behaviour: MaxMind minFraud + bundle price validation + idempotency.
 * We cannot read env from the browser; this is an accurate high-level notice for shoppers.
 */
export function TrustAntiFraudStrip() {
  return (
    <div
      className="bg-[#F8F1E7] border-y border-[#E8D8C3] py-3 px-4 text-center"
      role="status"
    >
      <p className="text-xs md:text-sm text-[#567063] max-w-3xl mx-auto leading-relaxed">
        <span className="font-bold text-[#155235]">أمانُ الطلب عند بيت الصحة:</span>{" "}
        نراجع بعض الطلبات آلياً عبر محرّك تقييم مخاطر (MaxMind عند تفعيل المفاتيح في الخادم)، ونثبّت أسعار
        الباقات من جهة الخادم كي لا يُعبث بالسلّة. إن كنت داخل السعودية وظهر لك رفضٌ بالخطأ، راسلنا على
        واتساب — نفرّغ لك حقّك في الردّ كما نفرّغ كوبَ الأعشاب في يديك.
      </p>
    </div>
  );
}
