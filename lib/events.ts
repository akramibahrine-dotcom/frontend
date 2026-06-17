"use client";

export function generateEventId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export function getUrlParam(name: string): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
}

export function getTrackingData() {
  return {
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc") || buildFbc(),
    ttp: getCookie("_ttp"),
    ttclid: getFromStorage("ttclid"),
    scClickId: getCookie("_scid") || getFromStorage("ScCid"),
    scCookie1: getCookie("_sc_click_id"),
    landingPageUrl: getFromStorage("landingPageUrl"),
    pageUrl: typeof window !== "undefined" ? window.location.href : null,
    utm: {
      source: getFromStorage("utm_source"),
      medium: getFromStorage("utm_medium"),
      campaign: getFromStorage("utm_campaign"),
      content: getFromStorage("utm_content"),
      term: getFromStorage("utm_term"),
    },
  };
}

function buildFbc(): string | null {
  const existing = getCookie("_fbc");
  if (existing) return existing;

  const fbclid = getUrlParam("fbclid") || getFromStorage("fbclid");
  if (!fbclid) return null;

  const ts = getFromStorage("fbclid_ts") ?? String(Date.now());
  return `fb.1.${ts}.${fbclid}`;
}

export function captureUtmAndClickIds(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const keys: Record<string, string> = {
    utm_source: "utm_source",
    utm_medium: "utm_medium",
    utm_campaign: "utm_campaign",
    utm_content: "utm_content",
    utm_term: "utm_term",
    ttclid: "ttclid",
    ScCid: "ScCid",
    fbclid: "fbclid",
  };
  for (const [param, storageKey] of Object.entries(keys)) {
    const val = params.get(param);
    if (val) {
      sessionStorage.setItem(storageKey, val);
      if (param === "fbclid" && !sessionStorage.getItem("fbclid_ts")) {
        sessionStorage.setItem("fbclid_ts", String(Date.now()));
      }
    }
  }

  // Infer platform when ads send click IDs but no UTMs
  if (!sessionStorage.getItem("utm_source")) {
    if (params.get("ttclid") || sessionStorage.getItem("ttclid")) {
      sessionStorage.setItem("utm_source", "tiktok");
      sessionStorage.setItem("utm_medium", "paid_social");
    } else if (params.get("fbclid") || sessionStorage.getItem("fbclid") || getCookie("_fbc")) {
      sessionStorage.setItem("utm_source", "facebook");
      sessionStorage.setItem("utm_medium", "paid_social");
    } else if (params.get("ScCid") || sessionStorage.getItem("ScCid") || getCookie("_scid")) {
      sessionStorage.setItem("utm_source", "snapchat");
      sessionStorage.setItem("utm_medium", "paid_social");
    }
  }

  if (!sessionStorage.getItem("landingPageUrl")) {
    sessionStorage.setItem("landingPageUrl", window.location.href);
  }
}

function getFromStorage(key: string): string | null {
  if (typeof sessionStorage === "undefined") return null;
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}
