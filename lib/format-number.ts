/** Western digits (0-9) for GCC storefront readability. */
export const WESTERN_DIGITS: Intl.NumberFormatOptions = {
  numberingSystem: "latn",
};

export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions & { locale?: string }
): string {
  const { locale = "en-US", ...rest } = options ?? {};
  return value.toLocaleString(locale, { ...WESTERN_DIGITS, ...rest });
}

export function formatDateAr(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleDateString("ar-SA", {
    ...WESTERN_DIGITS,
    ...options,
  });
}

/** Convert Eastern Arabic numerals in text to Western digits. */
export function toWesternDigits(text: string): string {
  const eastern = "٠١٢٣٤٥٦٧٨٩";
  return text.replace(/[٠-٩]/g, (digit) => String(eastern.indexOf(digit)));
}
