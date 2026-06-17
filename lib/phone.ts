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

/** GCC prefixes that use a leading 0 in national display form. */
const GCC_LOCAL_PREFIX: Record<string, string> = {
  "966": "0",
  "971": "0",
};

function stripSeparators(raw: string): string {
  return raw.replace(/[\s\-().]/g, "");
}

function toLocalDisplay(cleaned: string, countryCode: string): string {
  const prefix = GCC_LOCAL_PREFIX[countryCode] ?? "";
  let local = cleaned;

  if (cleaned.startsWith(`+${countryCode}`)) {
    local = cleaned.slice(countryCode.length + 1);
  } else if (cleaned.startsWith(`00${countryCode}`)) {
    local = cleaned.slice(countryCode.length + 2);
  } else if (cleaned.startsWith(countryCode)) {
    local = cleaned.slice(countryCode.length);
  } else if (cleaned.startsWith("0")) {
    local = cleaned.slice(1);
  }

  return prefix ? `${prefix}${local}` : local;
}

export function isValidPhone(raw: string): boolean {
  const cleaned = stripSeparators(raw);
  if (cleaned === TEST_PHONE_WHITELIST) return true;
  return PHONE_PATTERNS.some(({ re }) => re.test(cleaned));
}

/** @deprecated Use isValidPhone instead */
export const isValidKsaPhone = isValidPhone;

export function normalizePhoneDisplay(raw: string): string {
  const cleaned = stripSeparators(raw);
  if (cleaned === TEST_PHONE_WHITELIST) return cleaned;

  for (const { code, re } of PHONE_PATTERNS) {
    if (re.test(cleaned)) {
      return toLocalDisplay(cleaned, code);
    }
  }

  return cleaned;
}

/** @deprecated Use normalizePhoneDisplay instead */
export const normalizeKsaPhoneDisplay = normalizePhoneDisplay;
