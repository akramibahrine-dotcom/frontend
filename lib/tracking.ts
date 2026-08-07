"use client";

import { getApiBase } from "@/lib/api-base";
import { getTrackingData } from "@/lib/events";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, props?: object, options?: { event_id?: string }) => void;
      page?: () => void;
      identify?: (data: object) => void;
    };
    snaptr?: (action: string, event?: string, data?: object) => void;
  }
}

const DEBUG = process.env.NEXT_PUBLIC_ENABLE_PIXEL_DEBUG === "true";

function log(...args: unknown[]) {
  if (DEBUG) console.log("[pixel]", ...args);
}

/**
 * Pixel scripts load after paint. Product ViewContent / AddToCart often fire first.
 * Queue browser events until each SDK stub exists, then flush — otherwise they are dropped.
 */
type QueuedPixelCall =
  | { kind: "meta"; eventName: string; data: object; eventId?: string }
  | { kind: "tiktok"; eventName: string; data: object; eventId?: string }
  | { kind: "tiktok-page" }
  | { kind: "snap"; eventName: string; data: object; eventId?: string };

const pixelQueue: QueuedPixelCall[] = [];
const MAX_QUEUE = 40;

function enqueue(call: QueuedPixelCall) {
  if (pixelQueue.length >= MAX_QUEUE) {
    pixelQueue.shift();
  }
  pixelQueue.push(call);
  log("queued", call);
}

function dispatchMeta(eventName: string, data: object, eventId?: string) {
  if (!window.fbq) return false;
  if (eventId) {
    window.fbq("track", eventName, data, { eventID: eventId });
  } else {
    window.fbq("track", eventName, data);
  }
  log("meta", eventName, eventId, data);
  return true;
}

function dispatchTikTok(eventName: string, data: object, eventId?: string) {
  if (!window.ttq?.track) return false;
  const options = eventId ? { event_id: eventId } : undefined;
  window.ttq.track(eventName, data, options);
  log("tiktok", eventName, eventId, data);
  return true;
}

function dispatchTikTokPage() {
  if (window.ttq?.page) {
    window.ttq.page();
    log("tiktok", "page");
    return true;
  }
  if (window.ttq?.track) {
    window.ttq.track("Pageview");
    log("tiktok", "Pageview");
    return true;
  }
  return false;
}

function dispatchSnap(eventName: string, data: object, eventId?: string) {
  if (!window.snaptr) return false;
  const payload = eventId ? { ...data, client_deduplication_id: eventId } : data;
  window.snaptr("track", eventName, payload);
  log("snap", eventName, eventId, payload);
  return true;
}

/** Flush any events that were fired before the pixel SDKs finished loading. */
export function flushPixelQueue() {
  if (typeof window === "undefined" || pixelQueue.length === 0) return;
  const pending = pixelQueue.splice(0, pixelQueue.length);
  for (const call of pending) {
    let sent = false;
    if (call.kind === "meta") {
      sent = dispatchMeta(call.eventName, call.data, call.eventId);
    } else if (call.kind === "tiktok") {
      sent = dispatchTikTok(call.eventName, call.data, call.eventId);
    } else if (call.kind === "tiktok-page") {
      sent = dispatchTikTokPage();
    } else if (call.kind === "snap") {
      sent = dispatchSnap(call.eventName, call.data, call.eventId);
    }
    if (!sent) enqueue(call);
  }
}

export function fireMetaEvent(eventName: string, data: object = {}, eventId?: string) {
  if (typeof window === "undefined") return;
  if (!dispatchMeta(eventName, data, eventId)) {
    enqueue({ kind: "meta", eventName, data, eventId });
  }
}

export function fireTikTokEvent(eventName: string, data: object = {}, eventId?: string) {
  if (typeof window === "undefined") return;
  if (!dispatchTikTok(eventName, data, eventId)) {
    enqueue({ kind: "tiktok", eventName, data, eventId });
  }
}

export function fireSnapEvent(eventName: string, data: object = {}, eventId?: string) {
  if (typeof window === "undefined") return;
  if (!dispatchSnap(eventName, data, eventId)) {
    enqueue({ kind: "snap", eventName, data, eventId });
  }
}

export function trackPageView() {
  fireMetaEvent("PageView");
  if (typeof window !== "undefined" && !dispatchTikTokPage()) {
    enqueue({ kind: "tiktok-page" });
  }
  fireSnapEvent("PAGE_VIEW");
  void sendServerAnalyticsEvent("page_view");
}

export function trackViewContent(productId: string, productName: string, eventId: string) {
  fireMetaEvent(
    "ViewContent",
    {
      content_ids: [productId],
      content_name: productName,
      currency: "SAR",
    },
    eventId
  );
  fireTikTokEvent(
    "ViewContent",
    {
      content_id: productId,
      content_name: productName,
      currency: "SAR",
    },
    eventId
  );
  fireSnapEvent(
    "VIEW_CONTENT",
    {
      item_ids: [productId],
      item_category: "herbal_tea",
    },
    eventId
  );
  void sendServerAnalyticsEvent("view_content", { productId, source: "product_page" });
}

export function trackAddToCart(
  productId: string,
  productName: string,
  priceSar: number,
  quantity: number,
  eventId: string
) {
  fireMetaEvent(
    "AddToCart",
    {
      content_ids: [productId],
      content_name: productName,
      value: priceSar,
      currency: "SAR",
      num_items: quantity,
    },
    eventId
  );
  fireTikTokEvent(
    "AddToCart",
    {
      content_id: productId,
      content_name: productName,
      value: priceSar,
      currency: "SAR",
      quantity,
    },
    eventId
  );
  fireSnapEvent(
    "ADD_CART",
    {
      item_ids: [productId],
      price: priceSar,
      currency: "SAR",
      number_items: quantity,
    },
    eventId
  );
  void sendServerAnalyticsEvent("add_to_cart", { productId, source: "product_page" });
}

export function trackInitiateCheckout(totalSar: number, eventId: string) {
  fireMetaEvent(
    "InitiateCheckout",
    {
      value: totalSar,
      currency: "SAR",
    },
    eventId
  );
  fireTikTokEvent(
    "InitiateCheckout",
    {
      value: totalSar,
      currency: "SAR",
    },
    eventId
  );
  fireSnapEvent(
    "START_CHECKOUT",
    {
      price: totalSar,
      currency: "SAR",
    },
    eventId
  );
  void sendServerAnalyticsEvent("initiate_checkout", { source: "checkout" });
}

export function trackHeartbeat() {
  void sendServerAnalyticsEvent("heartbeat");
}

/** Give Meta Pixel time to send the event before navigating away. */
export function waitForPixelFlush(ms = 450): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function trackPurchase(
  orderId: string,
  totalSar: number,
  contents: Array<{ id: string; quantity: number; item_price: number }>,
  eventId: string
) {
  if (typeof window !== "undefined") {
    try {
      const dedupKey = `baytseha_purchase_fired_${eventId}`;
      if (sessionStorage.getItem(dedupKey)) {
        log("purchase skipped duplicate browser fire", eventId);
        return;
      }
      sessionStorage.setItem(dedupKey, "1");
    } catch {
      // Storage may be blocked in private/restricted browsers — continue safely
    }
  }

  const metaContents = contents.map((c) => ({
    id: c.id,
    quantity: c.quantity,
    item_price: c.item_price,
  }));

  fireMetaEvent(
    "Purchase",
    {
      value: totalSar,
      currency: "SAR",
      order_id: orderId,
      content_ids: contents.map((c) => c.id),
      contents: metaContents,
      content_type: "product",
      num_items: contents.reduce((sum, c) => sum + c.quantity, 0),
    },
    eventId
  );
  fireTikTokEvent(
    "CompletePayment",
    {
      order_id: orderId,
      value: totalSar,
      currency: "SAR",
      contents: contents.map((c) => ({
        content_id: c.id,
        quantity: c.quantity,
        price: String(c.item_price),
      })),
    },
    eventId
  );
  fireSnapEvent(
    "PURCHASE",
    {
      transaction_id: eventId,
      price: totalSar,
      currency: "SAR",
      number_items: contents.reduce((sum, c) => sum + c.quantity, 0),
      content_ids: contents.map((c) => c.id),
    },
    eventId
  );
}

async function sendServerAnalyticsEvent(
  eventName: string,
  extra: { productId?: string; source?: string } = {}
) {
  if (typeof window === "undefined") return;
  const tracking = getTrackingData();
  try {
    await fetch(`${getApiBase()}/api/v1/analytics/clicks`, {
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
  try {
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
    const next =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(key, next);
    return next;
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}
