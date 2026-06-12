const DEFAULT_WHATSAPP_NUMBER = "212648015267";
const DEFAULT_MESSAGE = "مرحباً، أود الاستفسار عن منتجات بيت الصحة.";

export function getWhatsAppNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  return (raw || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, "");
}

export function getWhatsAppDisplayPhone(): string {
  const digits = getWhatsAppNumber();
  if (digits.startsWith("966") && digits.length >= 12) {
    return `+966 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`.trim();
  }
  if (digits.startsWith("212") && digits.length >= 12) {
    return `+212 ${digits.slice(3, 6)} ${digits.slice(6)}`.trim();
  }
  return `+${digits}`;
}

export function buildWhatsAppUrl(
  message: string = DEFAULT_MESSAGE,
  phone?: string
): string {
  const number = (phone ?? getWhatsAppNumber()).replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE = DEFAULT_MESSAGE;
