"use client";

import { getTrackingData } from "@/lib/events";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.baytseha.shop";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, props?: object) => void; identify?: (data: object) => void };
    snaptr?: (action: string, event?: string, data?: object) => void;
    _baytsehaPixelsLoaded?: boolean;
  }
}

const DEBUG = process.env.NEXT_PUBLIC_ENABLE_PIXEL_DEBUG === "true";

function log(...args: unknown[]) {
  if (DEBUG) console.log("[pixel]", ...args);
}

export function fireMetaEvent(eventName: string, data: object = {}, eventId?: string) {
  if (typeof window === "undefined" || !window.fbq) return;
  const opts = eventId ? { eventID: eventId } : {};
  window.fbq("track", eventName, data, opts);
  log("meta", eventName, eventId, data);
}

export function fireTikTokEvent(eventName: string, data: object = {}) {
  if (typeof window === "undefined" || !window.ttq) return;
  window.ttq.track(eventName, data);
  log("tiktok", eventName, data);
}

export function fireSnapEvent(eventName: string, data: object = {}) {
  if (typeof window === "undefined" || !window.snaptr) return;
  window.snaptr("track", eventName, data);
  log("snap", eventName, data);
}

export function trackPageView() {
  fireMetaEvent("PageView");
  fireTikTokEvent("Browse");
  fireSnapEvent("PAGE_VIEW");
  void sendServerAnalyticsEvent("page_view");
}

export function trackViewContent(productId: string, productName: string, eventId: string) {
  fireMetaEvent("ViewContent", {
    content_ids: [productId],
    content_name: productName,
    currency: "SAR",
  }, eventId);
  fireTikTokEvent("ViewContent", {
    content_id: productId,
    content_name: productName,
    currency: "SAR",
  });
  fireSnapEvent("VIEW_CONTENT", {
    item_ids: [productId],
    item_category: "herbal_tea",
  });
  void sendServerAnalyticsEvent("view_content", { productId, source: "product_page" });
}

export function trackAddToCart(
  productId: string,
  productName: string,
  priceSar: number,
  quantity: number,
  eventId: string
) {
  fireMetaEvent("AddToCart", {
    content_ids: [productId],
    content_name: productName,
    value: priceSar,
    currency: "SAR",
    num_items: quantity,
  }, eventId);
  fireTikTokEvent("AddToCart", {
    content_id: productId,
    content_name: productName,
    value: priceSar,
    currency: "SAR",
    quantity,
  });
  fireSnapEvent("ADD_CART", {
    item_ids: [productId],
    price: priceSar,
    currency: "SAR",
    number_items: quantity,
  });
  void sendServerAnalyticsEvent("add_to_cart", { productId, source: "product_page" });
}

export function trackInitiateCheckout(totalSar: number, eventId: string) {
  fireMetaEvent("InitiateCheckout", {
    value: totalSar,
    currency: "SAR",
  }, eventId);
  fireTikTokEvent("InitiateCheckout", {
    value: totalSar,
    currency: "SAR",
  });
  fireSnapEvent("START_CHECKOUT", {
    price: totalSar,
    currency: "SAR",
  });
  void sendServerAnalyticsEvent("initiate_checkout", { source: "checkout" });
}

export function trackHeartbeat() {
  void sendServerAnalyticsEvent("heartbeat");
}

export function trackPurchase(
  orderId: string,
  totalSar: number,
  contents: Array<{ id: string; quantity: number; item_price: number }>,
  eventId: string
) {
  fireMetaEvent("Purchase", {
    order_id: orderId,
    value: totalSar,
    currency: "SAR",
    contents,
    content_type: "product",
  }, eventId);
  fireTikTokEvent("CompletePayment", {
    order_id: orderId,
    value: totalSar,
    currency: "SAR",
    contents: contents.map((c) => ({
      content_id: c.id,
      quantity: c.quantity,
      price: String(c.item_price),
    })),
  });
  fireSnapEvent("PURCHASE", {
    transaction_id: eventId,
    price: totalSar,
    currency: "SAR",
    number_items: contents.reduce((sum, c) => sum + c.quantity, 0),
    content_ids: contents.map((c) => c.id),
  });
}

async function sendServerAnalyticsEvent(
  eventName: string,
  extra: { productId?: string; source?: string } = {}
) {
  if (typeof window === "undefined") return;
  const tracking = getTrackingData();
  try {
    await fetch(`${API_BASE}/api/v1/analytics/clicks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        session_id: getAnalyticsSessionId(),
        page_url: window.location.href,
        referrer: document.referrer || null,
        product_id: extra.productId ?? null,
        source: extra.source ?? null,
        utm: tracking.utm,
      }),
      keepalive: true,
    });
  } catch (err) {
    log("server analytics skipped", err);
  }
}

function getAnalyticsSessionId(): string {
  const key = "baytseha_admin_analytics_session";
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const next =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  sessionStorage.setItem(key, next);
  return next;
}
