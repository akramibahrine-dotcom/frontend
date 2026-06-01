export type CurrencyCode = string;
export type CurrencyRates = Record<CurrencyCode, number>;

export const CURRENCY_CONFIG: Record<
  string,
  { labelAr: string; labelEn: string; symbol: string; locale: string; fractionDigits: number }
> = {
  SAR: { labelAr: "ريال سعودي", labelEn: "Saudi Riyal", symbol: "ر.س", locale: "ar-SA", fractionDigits: 2 },
  USD: { labelAr: "دولار أمريكي", labelEn: "US Dollar", symbol: "$", locale: "en-US", fractionDigits: 2 },
  EUR: { labelAr: "يورو", labelEn: "Euro", symbol: "€", locale: "de-DE", fractionDigits: 2 },
  GBP: { labelAr: "جنيه إسترليني", labelEn: "British Pound", symbol: "£", locale: "en-GB", fractionDigits: 2 },
  AED: { labelAr: "درهم إماراتي", labelEn: "UAE Dirham", symbol: "د.إ", locale: "ar-AE", fractionDigits: 2 },
  KWD: { labelAr: "دينار كويتي", labelEn: "Kuwaiti Dinar", symbol: "د.ك", locale: "ar-KW", fractionDigits: 2 },
  BHD: { labelAr: "دينار بحريني", labelEn: "Bahraini Dinar", symbol: "د.ب", locale: "ar-BH", fractionDigits: 2 },
  OMR: { labelAr: "ريال عماني", labelEn: "Omani Rial", symbol: "ر.ع", locale: "ar-OM", fractionDigits: 2 },
  QAR: { labelAr: "ريال قطري", labelEn: "Qatari Riyal", symbol: "ر.ق", locale: "ar-QA", fractionDigits: 2 },
  EGP: { labelAr: "جنيه مصري", labelEn: "Egyptian Pound", symbol: "ج.م", locale: "ar-EG", fractionDigits: 2 },
  JOD: { labelAr: "دينار أردني", labelEn: "Jordanian Dinar", symbol: "د.أ", locale: "ar-JO", fractionDigits: 2 },
  LBP: { labelAr: "ليرة لبنانية", labelEn: "Lebanese Pound", symbol: "ل.ل", locale: "ar-LB", fractionDigits: 0 },
  MAD: { labelAr: "درهم مغربي", labelEn: "Moroccan Dirham", symbol: "د.م", locale: "ar-MA", fractionDigits: 2 },
  TND: { labelAr: "دينار تونسي", labelEn: "Tunisian Dinar", symbol: "د.ت", locale: "ar-TN", fractionDigits: 2 },
  TRY: { labelAr: "ليرة تركية", labelEn: "Turkish Lira", symbol: "₺", locale: "tr-TR", fractionDigits: 2 },
  PKR: { labelAr: "روبية باكستانية", labelEn: "Pakistani Rupee", symbol: "₨", locale: "ur-PK", fractionDigits: 2 },
  INR: { labelAr: "روبية هندية", labelEn: "Indian Rupee", symbol: "₹", locale: "hi-IN", fractionDigits: 2 },
  CAD: { labelAr: "دولار كندي", labelEn: "Canadian Dollar", symbol: "CA$", locale: "en-CA", fractionDigits: 2 },
  AUD: { labelAr: "دولار أسترالي", labelEn: "Australian Dollar", symbol: "A$", locale: "en-AU", fractionDigits: 2 },
  JPY: { labelAr: "ين ياباني", labelEn: "Japanese Yen", symbol: "¥", locale: "ja-JP", fractionDigits: 0 },
  CNY: { labelAr: "يوان صيني", labelEn: "Chinese Yuan", symbol: "¥", locale: "zh-CN", fractionDigits: 2 },
  IQD: { labelAr: "دينار عراقي", labelEn: "Iraqi Dinar", symbol: "ع.د", locale: "ar-IQ", fractionDigits: 0 },
  SDG: { labelAr: "جنيه سوداني", labelEn: "Sudanese Pound", symbol: "ج.س", locale: "ar-SD", fractionDigits: 0 },
  LYD: { labelAr: "دينار ليبي", labelEn: "Libyan Dinar", symbol: "د.ل", locale: "ar-LY", fractionDigits: 2 },
  YER: { labelAr: "ريال يمني", labelEn: "Yemeni Rial", symbol: "ر.ي", locale: "ar-YE", fractionDigits: 0 },
  SYP: { labelAr: "ليرة سورية", labelEn: "Syrian Pound", symbol: "ل.س", locale: "ar-SY", fractionDigits: 0 },
  DZD: { labelAr: "دينار جزائري", labelEn: "Algerian Dinar", symbol: "د.ج", locale: "ar-DZ", fractionDigits: 2 },
  MYR: { labelAr: "رينغيت ماليزي", labelEn: "Malaysian Ringgit", symbol: "RM", locale: "ms-MY", fractionDigits: 2 },
  IDR: { labelAr: "روبية إندونيسية", labelEn: "Indonesian Rupiah", symbol: "Rp", locale: "id-ID", fractionDigits: 0 },
  NGN: { labelAr: "نيرة نيجيرية", labelEn: "Nigerian Naira", symbol: "₦", locale: "en-NG", fractionDigits: 2 },
};

const TIMEZONE_CURRENCY_MAP: Record<string, CurrencyCode> = {
  "Asia/Riyadh": "SAR",
  "Asia/Dubai": "AED",
  "Asia/Kuwait": "KWD",
  "Asia/Bahrain": "BHD",
  "Asia/Muscat": "OMR",
  "Asia/Qatar": "QAR",
  "Africa/Cairo": "EGP",
  "Asia/Amman": "JOD",
  "Asia/Beirut": "LBP",
  "Africa/Casablanca": "MAD",
  "Africa/Tunis": "TND",
  "Europe/Istanbul": "TRY",
  "Asia/Karachi": "PKR",
  "Asia/Kolkata": "INR",
  "Asia/Calcutta": "INR",
  "America/Toronto": "CAD",
  "America/Vancouver": "CAD",
  "Australia/Sydney": "AUD",
  "Australia/Melbourne": "AUD",
  "Asia/Tokyo": "JPY",
  "Asia/Shanghai": "CNY",
  "Asia/Baghdad": "IQD",
  "Africa/Khartoum": "SDG",
  "Africa/Tripoli": "LYD",
  "Asia/Aden": "YER",
  "Asia/Damascus": "SYP",
  "Africa/Algiers": "DZD",
  "Asia/Kuala_Lumpur": "MYR",
  "Asia/Jakarta": "IDR",
  "Africa/Lagos": "NGN",
  "Europe/London": "GBP",
  "Europe/Paris": "EUR",
  "Europe/Berlin": "EUR",
  "Europe/Rome": "EUR",
  "Europe/Madrid": "EUR",
  "Europe/Amsterdam": "EUR",
  "Europe/Brussels": "EUR",
  "Europe/Vienna": "EUR",
  "America/New_York": "USD",
  "America/Chicago": "USD",
  "America/Denver": "USD",
  "America/Los_Angeles": "USD",
};

export function detectCurrencyFromTimezone(): CurrencyCode {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIMEZONE_CURRENCY_MAP[tz] || "SAR";
  } catch {
    return "SAR";
  }
}

export function convertSarTo(amountSar: number, targetCurrency: CurrencyCode, rates: CurrencyRates): number {
  if (targetCurrency === "SAR") return amountSar;
  const rate = rates[targetCurrency];
  if (!rate) return amountSar;
  const converted = amountSar * rate;
  const config = CURRENCY_CONFIG[targetCurrency];
  const digits = config?.fractionDigits ?? 2;
  return digits === 0 ? Math.round(converted) : Math.round(converted * 100) / 100;
}

export function formatPrice(amount: number, currency: CurrencyCode): string {
  const config = CURRENCY_CONFIG[currency];
  if (!config) {
    return `${amount.toLocaleString("ar-SA")} ${currency}`;
  }

  const formatted = amount.toLocaleString(config.locale, {
    minimumFractionDigits: config.fractionDigits,
    maximumFractionDigits: config.fractionDigits,
  });

  return `${formatted} ${config.symbol}`;
}

export function formatSar(amount: number): string {
  return `${amount} ر.س`;
}

export function getAllCurrencyCodes(): CurrencyCode[] {
  return Object.keys(CURRENCY_CONFIG);
}
