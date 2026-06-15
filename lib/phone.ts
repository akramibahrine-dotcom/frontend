const PHONE_PATTERNS: Array<{ code: string; re: RegExp }> = [
  { code: "966", re: /^(?:\+966|00966|966|0)?5[0-9]{8}$/ },
  { code: "971", re: /^(?:\+971|00971|971|0)?5[0-9]{8}$/ },
  { code: "974", re: /^(?:\+974|00974|974)?[0-9]{8}$/ },
  { code: "973", re: /^(?:\+973|00973|973)?[0-9]{8}$/ },
  { code: "968", re: /^(?:\+968|00968|968)?[0-9]{8}$/ },
  { code: "965", re: /^(?:\+965|00965|965)?[0-9]{8}$/ },
  { code: "964", re: /^(?:\+964|00964|964|0)?7[0-9]{9}$/ },
  { code: "961", re: /^(?:\+961|00961|961|0)?[0-9]{7,8}$/ },
  { code: "218", re: /^(?:\+218|00218|218|0)?9[0-9]{8}$/ },
];

const TEST_PHONE_WHITELIST = "0501234987";

export function isValidPhone(raw: string): boolean {
  const cleaned = raw.replace(/[\s\-().]/g, "");
  if (cleaned === TEST_PHONE_WHITELIST) return true;
  return PHONE_PATTERNS.some(({ re }) => re.test(cleaned));
}

/** @deprecated Use isValidPhone instead */
export const isValidKsaPhone = isValidPhone;

export function normalizePhoneDisplay(raw: string): string {
  const cleaned = raw.replace(/[\s\-().]/g, "");
  if (cleaned === TEST_PHONE_WHITELIST) return cleaned;

  const KSA_RE = /^(?:\+966|00966|966|0)?5[0-9]{8}$/;
  if (KSA_RE.test(cleaned)) {
    let local: string;
    if (cleaned.startsWith("+966")) {
      local = cleaned.slice(4);
    } else if (cleaned.startsWith("00966")) {
      local = cleaned.slice(5);
    } else if (cleaned.startsWith("966")) {
      local = cleaned.slice(3);
    } else if (cleaned.startsWith("0")) {
      local = cleaned.slice(1);
    } else {
      local = cleaned;
    }
    return `0${local}`;
  }

  return cleaned;
}

/** @deprecated Use normalizePhoneDisplay instead */
export const normalizeKsaPhoneDisplay = normalizePhoneDisplay;
