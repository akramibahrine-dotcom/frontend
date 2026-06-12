const DEFAULT_API_BASE = "https://api.baytseha.shop";

/** Single source of truth for backend API origin (no trailing slash). */
export function getApiBase(): string {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  return (raw || DEFAULT_API_BASE).replace(/\/$/, "");
}
