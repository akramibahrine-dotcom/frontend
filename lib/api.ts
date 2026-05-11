const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.Baytseha.shop";

export type OrderTracking = {
  purchaseEventId: string | null;
  initiateCheckoutEventId: string | null;
  fbp: string | null;
  fbc: string | null;
  ttp: string | null;
  ttclid: string | null;
  scClickId: string | null;
  scCookie1: string | null;
  landingPageUrl: string | null;
  pageUrl: string | null;
  utm: {
    source: string | null;
    medium: string | null;
    campaign: string | null;
    content: string | null;
    term: string | null;
  };
};

export type UpsellInput = {
  accepted: boolean;
  productId: string | null;
  priceSar: number | null;
};

export type CreateOrderPayload = {
  customer: { name: string; phone: string; address: string };
  promo_code?: string | null;
  items: Array<{
    productId: string;
    quantity: 1 | 2 | 3;
    bundlePriceSar: number;
    source: string;
  }>;
  upsell: UpsellInput | null;
  pricing: {
    subtotalSar: number;
    shippingSar: number;
    totalSar: number;
    currency: string;
  };
  tracking: OrderTracking;
  idempotencyKey: string | null;
};

export type CreateOrderResponse = {
  order_id: string;
  public_order_number: string;
  status: string;
  total_sar: number;
  is_test_order: boolean;
  thank_you_url: string;
};

export type ApiError = {
  error: string;
  message: string;
};

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let detail: ApiError = { error: "unknown_error", message: "صار خطأ مؤقت. حاولي مرة ثانية." };
    try {
      const data = await response.json();
      if (data.detail) {
        detail = typeof data.detail === "string"
          ? { error: "server_error", message: data.detail }
          : data.detail;
      }
    } catch {
      // ignore parse errors
    }
    const err = new Error(detail.message);
    (err as Error & { code?: string }).code = detail.error;
    throw err;
  }

  return response.json() as Promise<T>;
}

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  return apiPost<CreateOrderResponse>("/api/v1/orders", {
    customer: {
      name: payload.customer.name,
      phone: payload.customer.phone,
      address: payload.customer.address,
    },
    promo_code: payload.promo_code ?? null,
    items: payload.items.map((item) => ({
      product_id: item.productId,
      quantity: item.quantity,
      bundle_price_sar: item.bundlePriceSar,
      source: item.source,
    })),
    upsell: payload.upsell
      ? {
          accepted: payload.upsell.accepted,
          product_id: payload.upsell.productId,
          price_sar: payload.upsell.priceSar,
        }
      : null,
    pricing: {
      subtotal_sar: payload.pricing.subtotalSar,
      shipping_sar: payload.pricing.shippingSar,
      total_sar: payload.pricing.totalSar,
      currency: payload.pricing.currency,
    },
    tracking: {
      purchase_event_id: payload.tracking.purchaseEventId,
      initiate_checkout_event_id: payload.tracking.initiateCheckoutEventId,
      fbp: payload.tracking.fbp,
      fbc: payload.tracking.fbc,
      ttp: payload.tracking.ttp,
      ttclid: payload.tracking.ttclid,
      sc_click_id: payload.tracking.scClickId,
      sc_cookie1: payload.tracking.scCookie1,
      landing_page_url: payload.tracking.landingPageUrl,
      page_url: payload.tracking.pageUrl,
      utm: {
        source: payload.tracking.utm.source,
        medium: payload.tracking.utm.medium,
        campaign: payload.tracking.utm.campaign,
        content: payload.tracking.utm.content,
        term: payload.tracking.utm.term,
      },
    },
    idempotency_key: payload.idempotencyKey,
  });
}

export async function getCurrencyRates(): Promise<{ base: string; rates: Record<string, number> }> {
  // Must stay compatible with browser fetch (Client Components). Do not pass `next.revalidate` here —
  // that option is only for Server Components and can break client-side usage (currency store init).
  const res = await fetch(`${API_BASE}/api/v1/currency/rates`, { cache: "no-store" });
  if (!res.ok) return { base: "SAR", rates: { SAR: 1 } };
  return res.json();
}
