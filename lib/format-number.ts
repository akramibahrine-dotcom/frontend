/** Western digits (0-9) for GCC storefront readability. */
export const WESTERN_DIGITS: Intl.NumberFormatOptions = {
  numberingSystem: "latn",
};

export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions & { locale?: string }
): string {
  const { locale = "en-US", ...rest } = options ?? {};
  const localeWithLatn = locale.replace(/-u-.*$/, "") + "-u-nu-latn";
  const formatted = value.toLocaleString(localeWithLatn, { ...WESTERN_DIGITS, ...rest });
  return toWesternDigits(formatted);
}

export function formatInteger(value: number, locale = "en-US"): string {
  return formatNumber(value, { locale, maximumFractionDigits: 0 });
}

export function formatDateAr(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = date instanceof Date ? date : new Date(date);
  const formatted = d.toLocaleDateString("ar-SA-u-nu-latn", {
    ...WESTERN_DIGITS,
    ...options,
  });
  return toWesternDigits(formatted);
}

/** Convert Eastern Arabic numerals in text to Western digits. */
export function toWesternDigits(text: string): string {
  const eastern = "٠١٢٣٤٥٦٧٨٩";
  return text.replace(/[٠-٩]/g, (digit) => String(eastern.indexOf(digit)));
}
