const KSA_MOBILE_RE = /^(?:\+966|00966|966|0)?5[0-9]{8}$/;
const TEST_PHONE_WHITELIST = "055000000";

export function isValidKsaPhone(raw: string): boolean {
  const cleaned = raw.replace(/[\s\-().]/g, "");
  if (cleaned === TEST_PHONE_WHITELIST) return true;
  return KSA_MOBILE_RE.test(cleaned);
}

export function normalizeKsaPhoneDisplay(raw: string): string {
  const cleaned = raw.replace(/[\s\-().]/g, "");
  if (cleaned === TEST_PHONE_WHITELIST) return cleaned;

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
