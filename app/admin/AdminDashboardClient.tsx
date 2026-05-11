"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.baytseha.shop";

type MetricBlock = {
  visitors: number;
  clicks: number;
  orders: number;
  revenue_sar: number;
  average_order_value_sar: number;
  conversion_rate: number;
};

type Metrics = {
  clicks: number;
  unique_sessions: number;
  orders: number;
  revenue_sar: number;
  average_order_value_sar: number;
  conversion_rate: number;
  rejected_attempts: number;
  today: MetricBlock;
  all_time: MetricBlock;
  live_visitors: number;
  new_customers: number;
  cross_sell_rate: number;
  upsell_rate: number;
  products: ProductMetric[];
  daily: Array<{ date: string; clicks: number; orders: number; revenue_sar: number }>;
  campaign_breakdown: Array<{ campaign: string; orders: number; revenue_sar: number }>;
  traffic_sources: Array<{ source: string; clicks: number }>;
  device_breakdown: Array<{ device: string; visitors: number; clicks: number }>;
  country_breakdown: Array<{ country: string; visitors: number; clicks: number }>;
};

type ProductMetric = {
  id: string;
  slug: string;
  sku: string;
  name_ar: string;
  concern_ar: string;
  bundle_prices_sar: Record<string, number>;
  upsell_price_sar: number;
  upsell_product_id: string;
  cross_sell_product_ids: string[];
  views: number;
  add_to_cart: number;
  orders: number;
  units: number;
  revenue_sar: number;
  conversion_rate: number;
  cross_sell_units: number;
  upsell_units: number;
};

type OrderListItem = {
  id: string;
  public_order_number: string;
  status: string;
  customer_name: string;
  customer_phone_local: string;
  total_sar: number;
  created_at: string;
  utm_source: string | null;
  utm_campaign: string | null;
  country_iso_code: string | null;
  fraud_reason: string | null;
};

type LoginEvent = {
  id: string;
  username: string;
  ip_address: string | null;
  country_iso_code: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  created_at: string;
  last_seen_at: string;
};

type AccessRule = {
  id: string;
  name: string;
  rule_type: "country" | "device" | "ip";
  value: string;
  action: "allow" | "block";
  enabled: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type TranslationOverride = {
  id: string;
  locale: string;
  translation_key: string;
  value: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
};

type Tab = "command" | "products" | "orders" | "visitors" | "controls" | "translations" | "logins";

function dateDaysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
}

function sar(value: number) {
  return new Intl.NumberFormat("ar-SA", { style: "currency", currency: "SAR", maximumFractionDigits: 0 }).format(value);
}

function shortDate(value: string) {
  return new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function percent(value: number) {
  return `${value.toFixed(2)}%`;
}

export function AdminDashboardClient() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("command");
  const [start, setStart] = useState(dateDaysAgo(30));
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [logins, setLogins] = useState<LoginEvent[]>([]);
  const [liveLogins, setLiveLogins] = useState<LoginEvent[]>([]);
  const [rules, setRules] = useState<AccessRule[]>([]);
  const [translations, setTranslations] = useState<TranslationOverride[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const headers = useMemo(() => (auth ? { Authorization: `Basic ${auth}`, "Content-Type": "application/json" } : undefined), [auth]);

  const adminFetch = useCallback(async function adminFetch<T>(path: string, init: RequestInit = {}, token = auth): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (res.status === 401) throw new Error("بيانات الدخول غير صحيحة.");
    if (!res.ok) throw new Error("تعذر تحميل بيانات لوحة التحكم.");
    return res.json() as Promise<T>;
  }, [auth]);

  async function loadData(token = auth) {
    if (!token) return;
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({ start: `${start}T00:00:00.000Z`, end: `${end}T23:59:59.999Z` });
    try {
      const [metricsData, ordersData, loginsData, rulesData, translationsData] = await Promise.all([
        adminFetch<Metrics>(`/api/v1/admin/metrics?${params.toString()}`, {}, token),
        adminFetch<{ orders: OrderListItem[] }>(`/api/v1/admin/orders?${params.toString()}&limit=200`, {}, token),
        adminFetch<{ logins: LoginEvent[]; live: LoginEvent[] }>("/api/v1/admin/logins", {}, token),
        adminFetch<{ rules: AccessRule[] }>("/api/v1/admin/access-rules", {}, token),
        adminFetch<{ translations: TranslationOverride[] }>("/api/v1/admin/translations", {}, token),
      ]);
      setMetrics(metricsData);
      setOrders(ordersData.orders);
      setLogins(loginsData.logins);
      setLiveLogins(loginsData.live);
      setRules(rulesData.rules);
      setTranslations(translationsData.translations);
    } catch (err) {
      setError(err instanceof Error ? err.message : "صار خطأ غير متوقع.");
    } finally {
      setLoading(false);
    }
  }

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = btoa(`${username}:${password}`);
    setAuth(token);
    try {
      await adminFetch("/api/v1/admin/session", { method: "POST" }, token);
    } catch {
      // loadData will surface the auth error in the UI.
    }
    void loadData(token);
  }

  useEffect(() => {
    if (!auth) return;
    const params = new URLSearchParams({ start: `${start}T00:00:00.000Z`, end: `${end}T23:59:59.999Z` });
    setLoading(true);
    setError(null);
    Promise.all([
      adminFetch<Metrics>(`/api/v1/admin/metrics?${params.toString()}`, {}, auth),
      adminFetch<{ orders: OrderListItem[] }>(`/api/v1/admin/orders?${params.toString()}&limit=200`, {}, auth),
      adminFetch<{ logins: LoginEvent[]; live: LoginEvent[] }>("/api/v1/admin/logins", {}, auth),
      adminFetch<{ rules: AccessRule[] }>("/api/v1/admin/access-rules", {}, auth),
      adminFetch<{ translations: TranslationOverride[] }>("/api/v1/admin/translations", {}, auth),
    ])
      .then(([metricsData, ordersData, loginsData, rulesData, translationsData]) => {
        setMetrics(metricsData);
        setOrders(ordersData.orders);
        setLogins(loginsData.logins);
        setLiveLogins(loginsData.live);
        setRules(rulesData.rules);
        setTranslations(translationsData.translations);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "صار خطأ غير متوقع."))
      .finally(() => setLoading(false));
  }, [adminFetch, auth, end, start]);

  if (!auth) {
    return (
      <section className="min-h-[70vh] bg-[#071C12] px-4 py-16 text-white">
        <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#C99A45]">Baytseha Admin</p>
          <h1 className="mb-6 text-3xl font-black">دخول مركز التحكم</h1>
          <form onSubmit={login} className="space-y-4">
            <input className="w-full rounded-2xl bg-white px-4 py-3 text-[#071C12]" placeholder="اسم المستخدم" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="w-full rounded-2xl bg-white px-4 py-3 text-[#071C12]" placeholder="كلمة المرور" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="w-full rounded-2xl bg-[#C99A45] py-3 font-black text-[#071C12]" type="submit">دخول</button>
          </form>
          {error && <p className="mt-4 rounded-xl bg-red-500/15 p-3 text-sm text-red-100">{error}</p>}
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F5F3EE] px-4 py-8 text-[#0F1A14]">
      <div className="mx-auto max-w-7xl">
        <Hero start={start} end={end} setStart={setStart} setEnd={setEnd} refresh={() => void loadData()} loading={loading} />
        {error && <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}
        <nav className="mb-6 flex flex-wrap gap-2">
          {[
            ["command", "Command"],
            ["products", "Products"],
            ["orders", "Orders"],
            ["visitors", "Visitors"],
            ["controls", "Access Control"],
            ["translations", "Translation"],
            ["logins", "Logins"],
          ].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id as Tab)} className={`rounded-full px-4 py-2 text-sm font-black ${tab === id ? "bg-[#155235] text-white" : "bg-white text-[#155235]"}`}>
              {label}
            </button>
          ))}
        </nav>

        {metrics && tab === "command" && <Command metrics={metrics} />}
        {metrics && tab === "products" && <Products products={metrics.products} />}
        {tab === "orders" && <Orders orders={orders} />}
        {metrics && tab === "visitors" && <Visitors metrics={metrics} />}
        {tab === "controls" && headers && <AccessControls headers={headers} rules={rules} reload={() => void loadData()} />}
        {tab === "translations" && headers && <Translations headers={headers} translations={translations} reload={() => void loadData()} />}
        {tab === "logins" && <Logins logins={logins} live={liveLogins} />}
      </div>
    </section>
  );
}

function Hero(props: { start: string; end: string; setStart: (v: string) => void; setEnd: (v: string) => void; refresh: () => void; loading: boolean }) {
  return (
    <div className="mb-6 rounded-[2rem] bg-[#071C12] p-6 text-white shadow-xl">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#C99A45]">Baytseha command center</p>
          <h1 className="text-3xl font-black">كل بيانات المتجر في مكان واحد</h1>
          <p className="mt-2 text-sm text-white/70">زوار مباشرون، مبيعات، منتجات، تحكم بالدخول، ترجمة، وسجل دخول الأدمن.</p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-sm text-white/80">من<input className="mt-1 block rounded-xl px-3 py-2 text-[#071C12]" type="date" value={props.start} onChange={(e) => props.setStart(e.target.value)} /></label>
          <label className="text-sm text-white/80">إلى<input className="mt-1 block rounded-xl px-3 py-2 text-[#071C12]" type="date" value={props.end} onChange={(e) => props.setEnd(e.target.value)} /></label>
          <button onClick={props.refresh} className="rounded-xl bg-[#C99A45] px-5 py-2.5 font-black text-[#071C12]">{props.loading ? "..." : "تحديث"}</button>
        </div>
      </div>
    </div>
  );
}

function Command({ metrics }: { metrics: Metrics }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <Kpi title="Live visitors" value={String(metrics.live_visitors)} dark />
        <Kpi title="Visitors today" value={String(metrics.today.visitors)} />
        <Kpi title="All visitors" value={String(metrics.all_time.visitors)} />
        <Kpi title="Orders" value={String(metrics.orders)} />
        <Kpi title="Revenue" value={sar(metrics.revenue_sar)} dark />
        <Kpi title="AOV" value={sar(metrics.average_order_value_sar)} />
        <Kpi title="Conversion" value={percent(metrics.conversion_rate)} />
        <Kpi title="Cross-sell rate" value={percent(metrics.cross_sell_rate)} />
        <Kpi title="Upsell rate" value={percent(metrics.upsell_rate)} />
        <Kpi title="New customers" value={String(metrics.new_customers)} />
        <Kpi title="Rejected attempts" value={String(metrics.rejected_attempts)} />
        <Kpi title="Today revenue" value={sar(metrics.today.revenue_sar)} />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Orders by Day">
          <Table rows={metrics.daily} cols={[["date", "Day"], ["clicks", "Clicks"], ["orders", "Orders"], ["revenue_sar", "Revenue"]]} moneyCols={["revenue_sar"]} />
        </Panel>
        <Panel title="Campaigns">
          <Stack items={metrics.campaign_breakdown.map((c) => ({ label: c.campaign, meta: `${c.orders} orders`, value: sar(c.revenue_sar) }))} />
        </Panel>
        <Panel title="Traffic Sources">
          <Stack items={metrics.traffic_sources.map((s) => ({ label: s.source, meta: "clicks", value: String(s.clicks) }))} />
        </Panel>
      </div>
    </div>
  );
}

function Products({ products }: { products: ProductMetric[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {products.map((p) => (
        <Panel key={p.id} title={p.name_ar}>
          <div className="grid gap-3 text-sm md:grid-cols-2">
            <Info label="SKU" value={p.sku} />
            <Info label="Slug" value={p.slug} />
            <Info label="Concern" value={p.concern_ar} />
            <Info label="Prices" value={`1=${p.bundle_prices_sar[1]} / 2=${p.bundle_prices_sar[2]} / 3=${p.bundle_prices_sar[3]} SAR`} />
            <Info label="Upsell" value={`${p.upsell_product_id} (${p.upsell_price_sar} SAR)`} />
            <Info label="Cross sells" value={p.cross_sell_product_ids.join(", ")} />
            <Info label="Views" value={String(p.views)} />
            <Info label="Add to cart" value={String(p.add_to_cart)} />
            <Info label="Orders" value={String(p.orders)} />
            <Info label="Units" value={String(p.units)} />
            <Info label="Revenue" value={sar(p.revenue_sar)} />
            <Info label="Conversion" value={percent(p.conversion_rate)} />
            <Info label="Cross-sell units" value={String(p.cross_sell_units)} />
            <Info label="Upsell units" value={String(p.upsell_units)} />
          </div>
        </Panel>
      ))}
    </div>
  );
}

function Orders({ orders }: { orders: OrderListItem[] }) {
  return (
    <Panel title="All Orders">
      <Table rows={orders} cols={[["public_order_number", "Order"], ["customer_name", "Customer"], ["customer_phone_local", "Phone"], ["total_sar", "Total"], ["created_at", "Date"], ["utm_campaign", "Campaign"], ["country_iso_code", "Country"], ["fraud_reason", "Fraud"]]} moneyCols={["total_sar"]} dateCols={["created_at"]} />
    </Panel>
  );
}

function Visitors({ metrics }: { metrics: Metrics }) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Panel title="By Device">
        <Table rows={metrics.device_breakdown} cols={[["device", "Device"], ["visitors", "Visitors"], ["clicks", "Clicks"]]} />
      </Panel>
      <Panel title="By Country">
        <Table rows={metrics.country_breakdown} cols={[["country", "Country"], ["visitors", "Visitors"], ["clicks", "Clicks"]]} />
      </Panel>
    </div>
  );
}

function AccessControls({ headers, rules, reload }: { headers: Record<string, string>; rules: AccessRule[]; reload: () => void }) {
  const [form, setForm] = useState({ name: "", rule_type: "country", value: "SA", action: "allow", enabled: true, notes: "" });
  async function save() {
    await fetch(`${API_BASE}/api/v1/admin/access-rules`, { method: "POST", headers, body: JSON.stringify(form) });
    setForm({ name: "", rule_type: "country", value: "SA", action: "allow", enabled: true, notes: "" });
    reload();
  }
  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <Panel title="New Access Rule">
        <div className="space-y-3">
          <Input label="Rule name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Select label="Type" value={form.rule_type} values={["country", "device", "ip"]} onChange={(v) => setForm({ ...form, rule_type: v })} />
          <Input label="Value" value={form.value} onChange={(v) => setForm({ ...form, value: v })} />
          <Select label="Action" value={form.action} values={["allow", "block"]} onChange={(v) => setForm({ ...form, action: v })} />
          <Input label="Notes" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} />
          <button onClick={save} className="rounded-xl bg-[#155235] px-5 py-3 font-black text-white">Save rule</button>
        </div>
      </Panel>
      <Panel title="Rules">
        <Table rows={rules} cols={[["name", "Name"], ["rule_type", "Type"], ["value", "Value"], ["action", "Action"], ["enabled", "Enabled"], ["notes", "Notes"]]} />
      </Panel>
    </div>
  );
}

function Translations({ headers, translations, reload }: { headers: Record<string, string>; translations: TranslationOverride[]; reload: () => void }) {
  const [form, setForm] = useState({ locale: "ar", translation_key: "", value: "", enabled: true });
  async function save() {
    await fetch(`${API_BASE}/api/v1/admin/translations`, { method: "POST", headers, body: JSON.stringify(form) });
    setForm({ locale: "ar", translation_key: "", value: "", enabled: true });
    reload();
  }
  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <Panel title="Store Translation Override">
        <p className="mb-4 text-sm text-[#567063]">To change live store copy, use the exact current visible text as the key, then put the replacement in value. Example key: <span className="font-mono">الدفع عند الاستلام</span>.</p>
        <div className="space-y-3">
          <Input label="Locale" value={form.locale} onChange={(v) => setForm({ ...form, locale: v })} />
          <Input label="Translation key" value={form.translation_key} onChange={(v) => setForm({ ...form, translation_key: v })} />
          <textarea className="min-h-28 w-full rounded-xl border border-[#E8E2D8] p-3" placeholder="New copy" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
          <button onClick={save} className="rounded-xl bg-[#155235] px-5 py-3 font-black text-white">Save translation</button>
        </div>
      </Panel>
      <Panel title="Translation Overrides">
        <Table rows={translations} cols={[["locale", "Locale"], ["translation_key", "Key"], ["value", "Value"], ["enabled", "Enabled"]]} />
      </Panel>
    </div>
  );
}

function Logins({ logins, live }: { logins: LoginEvent[]; live: LoginEvent[] }) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Panel title="Live Admin Logins">
        <Table rows={live} cols={[["username", "User"], ["ip_address", "IP"], ["country_iso_code", "Country"], ["device_type", "Device"], ["browser", "Browser"], ["last_seen_at", "Last seen"]]} dateCols={["last_seen_at"]} />
      </Panel>
      <Panel title="Login History">
        <Table rows={logins} cols={[["username", "User"], ["ip_address", "IP"], ["country_iso_code", "Country"], ["device_type", "Device"], ["browser", "Browser"], ["os", "OS"], ["created_at", "Time"]]} dateCols={["created_at"]} />
      </Panel>
    </div>
  );
}

function Kpi({ title, value, dark = false }: { title: string; value: string; dark?: boolean }) {
  return <div className={`rounded-[1.5rem] p-5 shadow-sm ${dark ? "bg-[#071C12] text-white" : "bg-white"}`}><p className="text-sm text-[#8BA898]">{title}</p><p className="mt-2 text-2xl font-black">{value}</p></div>;
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="overflow-hidden rounded-[1.75rem] bg-white p-5 shadow-sm"><h2 className="mb-4 text-xl font-black">{title}</h2>{children}</div>;
}

function Stack({ items }: { items: Array<{ label: string; meta: string; value: string }> }) {
  if (!items.length) return <p className="text-sm text-[#567063]">No data yet.</p>;
  return <div className="space-y-3">{items.map((item) => <div key={`${item.label}-${item.value}`} className="flex items-center justify-between gap-4 rounded-2xl bg-[#F5F3EE] p-3"><div><p className="font-bold">{item.label}</p><p className="text-xs text-[#567063]">{item.meta}</p></div><p className="font-black text-[#155235]">{item.value}</p></div>)}</div>;
}

function Table({ rows, cols, moneyCols = [], dateCols = [] }: { rows: Array<Record<string, unknown>>; cols: Array<[string, string]>; moneyCols?: string[]; dateCols?: string[] }) {
  if (!rows.length) return <p className="text-sm text-[#567063]">No data yet.</p>;
  return (
    <div className="max-h-[560px] overflow-auto">
      <table className="w-full min-w-[680px] text-sm">
        <thead><tr className="text-right text-[#567063]">{cols.map(([, label]) => <th key={label} className="whitespace-nowrap px-3 py-2">{label}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={String(row.id ?? index)} className="border-t border-[#E8E2D8]">{cols.map(([key]) => <td key={key} className="max-w-[260px] truncate px-3 py-3">{formatCell(row[key], key, moneyCols, dateCols)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function formatCell(value: unknown, key: string, moneyCols: string[], dateCols: string[]) {
  if (value === null || value === undefined || value === "") return "—";
  if (moneyCols.includes(key) && typeof value === "number") return sar(value);
  if (dateCols.includes(key) && typeof value === "string") return shortDate(value);
  if (typeof value === "boolean") return value ? "yes" : "no";
  return String(value);
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-[#E8E2D8] px-3 py-2"><p className="text-xs text-[#567063]">{label}</p><p className="truncate font-bold" dir="ltr">{value}</p></div>;
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block text-sm font-bold text-[#567063]">{label}<input className="mt-1 w-full rounded-xl border border-[#E8E2D8] px-3 py-2 text-[#0F1A14]" value={value} onChange={(e) => onChange(e.target.value)} /></label>;
}

function Select({ label, value, values, onChange }: { label: string; value: string; values: string[]; onChange: (value: string) => void }) {
  return <label className="block text-sm font-bold text-[#567063]">{label}<select className="mt-1 w-full rounded-xl border border-[#E8E2D8] px-3 py-2 text-[#0F1A14]" value={value} onChange={(e) => onChange(e.target.value)}>{values.map((v) => <option key={v} value={v}>{v}</option>)}</select></label>;
}
