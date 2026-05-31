"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Eye, ShoppingBag, DollarSign, Percent, Package, Users, Activity, Filter, Check } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.baytseha.shop";

const ALL_COUNTRIES: Array<{ code: string; name: string }> = [
  { code: "AF", name: "Afghanistan" }, { code: "AL", name: "Albania" }, { code: "DZ", name: "Algeria" },
  { code: "AD", name: "Andorra" }, { code: "AO", name: "Angola" }, { code: "AG", name: "Antigua & Barbuda" },
  { code: "AR", name: "Argentina" }, { code: "AM", name: "Armenia" }, { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" }, { code: "AZ", name: "Azerbaijan" }, { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" }, { code: "BD", name: "Bangladesh" }, { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" }, { code: "BE", name: "Belgium" }, { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" }, { code: "BT", name: "Bhutan" }, { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia & Herzegovina" }, { code: "BW", name: "Botswana" }, { code: "BR", name: "Brazil" },
  { code: "BN", name: "Brunei" }, { code: "BG", name: "Bulgaria" }, { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" }, { code: "KH", name: "Cambodia" }, { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" }, { code: "CV", name: "Cape Verde" }, { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" }, { code: "CL", name: "Chile" }, { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" }, { code: "KM", name: "Comoros" }, { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo (DRC)" }, { code: "CR", name: "Costa Rica" }, { code: "CI", name: "Côte d'Ivoire" },
  { code: "HR", name: "Croatia" }, { code: "CU", name: "Cuba" }, { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" }, { code: "DK", name: "Denmark" }, { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" }, { code: "DO", name: "Dominican Republic" }, { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" }, { code: "SV", name: "El Salvador" }, { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" }, { code: "EE", name: "Estonia" }, { code: "SZ", name: "Eswatini" },
  { code: "ET", name: "Ethiopia" }, { code: "FJ", name: "Fiji" }, { code: "FI", name: "Finland" },
  { code: "FR", name: "France" }, { code: "GA", name: "Gabon" }, { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" }, { code: "DE", name: "Germany" }, { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" }, { code: "GD", name: "Grenada" }, { code: "GT", name: "Guatemala" },
  { code: "GN", name: "Guinea" }, { code: "GW", name: "Guinea-Bissau" }, { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" }, { code: "HN", name: "Honduras" }, { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" }, { code: "IN", name: "India" }, { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" }, { code: "IQ", name: "Iraq" }, { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" }, { code: "IT", name: "Italy" }, { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" }, { code: "JO", name: "Jordan" }, { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" }, { code: "KI", name: "Kiribati" }, { code: "KP", name: "North Korea" },
  { code: "KR", name: "South Korea" }, { code: "KW", name: "Kuwait" }, { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Laos" }, { code: "LV", name: "Latvia" }, { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" }, { code: "LR", name: "Liberia" }, { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" }, { code: "LT", name: "Lithuania" }, { code: "LU", name: "Luxembourg" },
  { code: "MG", name: "Madagascar" }, { code: "MW", name: "Malawi" }, { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" }, { code: "ML", name: "Mali" }, { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" }, { code: "MR", name: "Mauritania" }, { code: "MU", name: "Mauritius" },
  { code: "MX", name: "Mexico" }, { code: "FM", name: "Micronesia" }, { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" }, { code: "MN", name: "Mongolia" }, { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" }, { code: "MZ", name: "Mozambique" }, { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" }, { code: "NR", name: "Nauru" }, { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" }, { code: "NZ", name: "New Zealand" }, { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" }, { code: "NG", name: "Nigeria" }, { code: "MK", name: "North Macedonia" },
  { code: "NO", name: "Norway" }, { code: "OM", name: "Oman" }, { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" }, { code: "PS", name: "Palestine" }, { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" }, { code: "PY", name: "Paraguay" }, { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" }, { code: "PL", name: "Poland" }, { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" }, { code: "RO", name: "Romania" }, { code: "RU", name: "Russia" },
  { code: "RW", name: "Rwanda" }, { code: "KN", name: "Saint Kitts & Nevis" }, { code: "LC", name: "Saint Lucia" },
  { code: "VC", name: "Saint Vincent" }, { code: "WS", name: "Samoa" }, { code: "SM", name: "San Marino" },
  { code: "ST", name: "São Tomé & Príncipe" }, { code: "SA", name: "Saudi Arabia" }, { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" }, { code: "SC", name: "Seychelles" }, { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" }, { code: "SK", name: "Slovakia" }, { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" }, { code: "SO", name: "Somalia" }, { code: "ZA", name: "South Africa" },
  { code: "SS", name: "South Sudan" }, { code: "ES", name: "Spain" }, { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" }, { code: "SR", name: "Suriname" }, { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" }, { code: "SY", name: "Syria" }, { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" }, { code: "TZ", name: "Tanzania" }, { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" }, { code: "TG", name: "Togo" }, { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad & Tobago" }, { code: "TN", name: "Tunisia" }, { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" }, { code: "TV", name: "Tuvalu" }, { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" }, { code: "AE", name: "United Arab Emirates" }, { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" }, { code: "UY", name: "Uruguay" }, { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" }, { code: "VA", name: "Vatican City" }, { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" }, { code: "YE", name: "Yemen" }, { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

const DEVICE_OPTIONS = ["mobile", "desktop", "tablet", "tv"] as const;

type MetricBlock = { visitors: number; clicks: number; orders: number; revenue_sar: number; average_order_value_sar: number; conversion_rate: number };

type Metrics = {
  clicks: number; unique_sessions: number; orders: number; revenue_sar: number;
  average_order_value_sar: number; conversion_rate: number; rejected_attempts: number;
  today: MetricBlock; all_time: MetricBlock; live_visitors: number; new_customers: number;
  cross_sell_rate: number; upsell_rate: number; products: ProductMetric[];
  daily: Array<{ date: string; clicks: number; orders: number; revenue_sar: number }>;
  campaign_breakdown: Array<{ campaign: string; orders: number; revenue_sar: number }>;
  traffic_sources: Array<{ source: string; clicks: number }>;
  device_breakdown: Array<{ device: string; visitors: number; clicks: number }>;
  country_breakdown: Array<{ country: string; visitors: number; clicks: number }>;
  order_status_breakdown: Array<{ status: string; orders: number; revenue_sar: number }>;
  funnel: Array<{ step: string; count: number }>;
  utm_source_breakdown: Array<{ source: string; orders: number; revenue_sar: number }>;
  risk_breakdown: Array<{ reason: string; attempts: number }>;
};

type ProductMetric = {
  id: string; slug: string; sku: string; name_ar: string; concern_ar: string;
  bundle_prices_sar: Record<string, number>; upsell_price_sar: number;
  upsell_product_id: string; cross_sell_product_ids: string[];
  views: number; add_to_cart: number; orders: number; units: number;
  revenue_sar: number; conversion_rate: number; cross_sell_units: number; upsell_units: number;
};

type OrderListItem = {
  id: string; public_order_number: string; status: string; customer_name: string;
  customer_phone_local: string; total_sar: number; is_test_order: boolean; created_at: string;
  utm_source: string | null; utm_campaign: string | null;
  country_iso_code: string | null; fraud_reason: string | null;
  fraud_decision: string | null; risk_score: number | null; ip_risk: number | null;
};

type OrderDetail = OrderListItem & {
  customer_phone_e164: string; subtotal_sar: number; shipping_sar: number;
  display_currency: string | null; display_total: number | null;
  landing_page_url: string | null; page_url: string | null; ip_address: string | null;
  user_agent: string | null; utm_medium: string | null; utm_content: string | null; utm_term: string | null;
  is_anonymous_proxy: boolean | null; is_anonymous_vpn: boolean | null; is_hosting_provider: boolean | null;
  is_public_proxy: boolean | null; is_residential_proxy: boolean | null; is_tor_exit_node: boolean | null;
  items: Array<{ product_id: string; product_name_ar: string; quantity: number; bundle_price_sar: number; source: string }>;
  tracking_events: Array<{ platform: string; event_name: string; status: string; error: string | null; created_at: string }>;
  webhook_deliveries: Array<{ destination: string; status: string; attempts: number; last_error: string | null }>;
};

type LoginEvent = {
  id: string; username: string; ip_address: string | null; country_iso_code: string | null;
  device_type: string | null; browser: string | null; os: string | null;
  created_at: string; last_seen_at: string;
};

type AccessRule = {
  id: string; name: string; rule_type: "country" | "device" | "ip";
  value: string; action: "allow" | "block"; enabled: boolean;
  notes: string | null; created_at: string; updated_at: string;
};

type TranslationOverride = {
  id: string; locale: string; translation_key: string; value: string;
  enabled: boolean; created_at: string; updated_at: string;
};

type Tab = "command" | "products" | "orders" | "visitors" | "controls" | "translations" | "logins";

function dateDaysAgo(days: number) { const d = new Date(); d.setDate(d.getDate() - days); return d.toISOString().slice(0, 10); }
function sar(v: number) { return new Intl.NumberFormat("ar-SA", { style: "currency", currency: "SAR", maximumFractionDigits: 0 }).format(v); }
function shortDate(v: string) { return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(v)); }
function pct(v: number) { return `${v.toFixed(1)}%`; }
function countryName(code: string) { return ALL_COUNTRIES.find((c) => c.code === code)?.name ?? code; }
function compact(v: number) { return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(v); }
function statusLabel(status: string) { return status.replaceAll("_", " "); }
function riskFlags(order: OrderDetail): string[] {
  const flags: string[] = [];
  if (order.is_anonymous_vpn) flags.push("VPN");
  if (order.is_anonymous_proxy || order.is_public_proxy || order.is_residential_proxy) flags.push("Proxy");
  if (order.is_hosting_provider) flags.push("Hosting");
  if (order.is_tor_exit_node) flags.push("Tor");
  return flags;
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
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [logins, setLogins] = useState<LoginEvent[]>([]);
  const [liveLogins, setLiveLogins] = useState<LoginEvent[]>([]);
  const [rules, setRules] = useState<AccessRule[]>([]);
  const [translations, setTranslations] = useState<TranslationOverride[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderPreviewLoading, setOrderPreviewLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [marketFilter, setMarketFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("This month");

  const headers = useMemo(() => (auth ? { Authorization: `Basic ${auth}`, "Content-Type": "application/json" } : undefined), [auth]);

  const adminFetch = useCallback(async function adminFetch<T>(path: string, init: RequestInit = {}, token = auth): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, { ...init, headers: { ...(init.headers || {}), Authorization: `Basic ${token}`, "Content-Type": "application/json" }, cache: "no-store" });
    if (res.status === 401) throw new Error("Invalid credentials.");
    if (!res.ok) throw new Error("Failed to load dashboard data.");
    return res.json() as Promise<T>;
  }, [auth]);

  const loadData = useCallback(async (token = auth) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({ start: `${start}T00:00:00.000Z`, end: `${end}T23:59:59.999Z` });
    try {
      const [m, o, l, r, t] = await Promise.all([
        adminFetch<Metrics>(`/api/v1/admin/metrics?${params}`, {}, token),
        adminFetch<{ orders: OrderListItem[] }>(`/api/v1/admin/orders?${params}&limit=200`, {}, token),
        adminFetch<{ logins: LoginEvent[]; live: LoginEvent[] }>("/api/v1/admin/logins", {}, token),
        adminFetch<{ rules: AccessRule[] }>("/api/v1/admin/access-rules", {}, token),
        adminFetch<{ translations: TranslationOverride[] }>("/api/v1/admin/translations", {}, token),
      ]);
      setMetrics(m); setOrders(o.orders); setLogins(l.logins); setLiveLogins(l.live); setRules(r.rules); setTranslations(t.translations);
    } catch (err) { setError(err instanceof Error ? err.message : "Unexpected error."); }
    finally { setLoading(false); }
  }, [adminFetch, auth, end, start]);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = btoa(`${username}:${password}`);
    setAuth(token);
    try { await adminFetch("/api/v1/admin/session", { method: "POST" }, token); } catch { /* loadData handles it */ }
    void loadData(token);
  }

  useEffect(() => { if (auth) void loadData(); }, [auth, loadData]);

  async function previewOrder(orderId: string) {
    setOrderPreviewLoading(true);
    setError(null);
    try {
      setSelectedOrder(await adminFetch<OrderDetail>(`/api/v1/admin/orders/${orderId}`));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load order preview.");
    } finally {
      setOrderPreviewLoading(false);
    }
  }

  if (!auth) {
    return (
      <section dir="ltr" className="min-h-screen bg-[#1c1c1c] px-4 py-16 text-white flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#252525] p-8 shadow-2xl">
          <h1 className="mb-6 text-2xl font-bold">Admin Login</h1>
          <form onSubmit={login} className="space-y-4">
            <input className="w-full rounded-lg border border-white/10 bg-[#1c1c1c] px-4 py-3 text-white focus:border-[#1473ff] focus:outline-none" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="w-full rounded-lg border border-white/10 bg-[#1c1c1c] px-4 py-3 text-white focus:border-[#1473ff] focus:outline-none" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="w-full rounded-lg bg-[#1473ff] py-3 font-bold text-white hover:bg-[#1473ff]/90" type="submit">Login</button>
          </form>
          {error && <p className="mt-4 rounded-xl bg-red-500/15 p-3 text-sm text-red-100">{error}</p>}
        </div>
      </section>
    );
  }

  return (
    <section dir="ltr" className="min-h-screen bg-[#1c1c1c] text-white">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between border-b border-white/10 bg-[#252525] px-6 py-4">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <nav className="hidden md:flex gap-4">
            {([["command", "Statistics"], ["products", "Products"], ["orders", "Orders"], ["visitors", "Visitors"], ["controls", "Access Control"], ["translations", "Translation"], ["logins", "Logins"]] as const).map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} className={`text-sm font-medium transition ${tab === id ? "text-white" : "text-white/50 hover:text-white"}`}>{label}</button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => void loadData()} className="text-sm font-medium text-white/50 hover:text-white">{loading ? "Loading..." : "Refresh"}</button>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] p-6">
        {error && <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">{error}</div>}
        
        {/* Filter Bar */}
        {tab === "command" && (
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-white/50 uppercase mb-1">Market</span>
              <select className="rounded-lg border border-white/10 bg-[#252525] px-3 py-2 text-sm text-white focus:border-[#1473ff] focus:outline-none min-w-[160px]" value={marketFilter} onChange={(e) => setMarketFilter(e.target.value)}>
                <option value="">Filter by market</option>
                <option value="SA">Saudi Arabia</option>
              </select>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-white/50 uppercase mb-1">Product</span>
              <select className="rounded-lg border border-white/10 bg-[#252525] px-3 py-2 text-sm text-white focus:border-[#1473ff] focus:outline-none min-w-[160px]" value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
                <option value="">Filter by product</option>
                {metrics?.products.map((p) => <option key={p.id} value={p.id}>{p.name_ar}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-white/50 uppercase mb-1">Date</span>
              <select className="rounded-lg border border-white/10 bg-[#252525] px-3 py-2 text-sm text-white focus:border-[#1473ff] focus:outline-none min-w-[160px]" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                <option value="This month">This month</option>
                <option value="Last 30 days">Last 30 days</option>
              </select>
            </div>
            <div className="flex items-end h-full pt-5">
               <button className="flex items-center gap-2 rounded-lg bg-[#1473ff] px-4 py-2 text-sm font-medium text-white hover:bg-[#1473ff]/90">
                 <Filter size={14} /> Filter
               </button>
            </div>
          </div>
        )}

        {metrics && tab === "command" && <CommandTab metrics={metrics} />}
        {metrics && tab === "products" && <ProductsTab products={metrics.products} />}
        {tab === "orders" && metrics && <OrdersTab orders={orders} products={metrics.products} onPreview={previewOrder} loadingPreview={orderPreviewLoading} />}
        {metrics && tab === "visitors" && <VisitorsTab metrics={metrics} />}
        {tab === "controls" && headers && <AccessControlTab headers={headers} rules={rules} reload={() => void loadData()} />}
        {tab === "translations" && headers && <TranslationsTab headers={headers} translations={translations} reload={() => void loadData()} />}
        {tab === "logins" && <LoginsTab logins={logins} live={liveLogins} />}
      </div>
      {selectedOrder && <OrderPreview order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </section>
  );
}

/* ─── Dashboard / Command ─── */
function CommandTab({ metrics: m }: { metrics: Metrics }) {
  const chartData = m.daily.map(d => ({
    name: d.date.slice(-2), // just the day
    views: d.clicks,
    orders: d.orders,
    sales: d.revenue_sar,
    conversion: d.clicks > 0 ? (d.orders / d.clicks) * 100 : 0
  }));

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Charts Area */}
      <div className="flex-1 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard title="TOTAL VIEWS" value={m.clicks} trend="+19.3%" data={chartData} dataKey="views" color="#1473ff" />
          <ChartCard title="TOTAL ORDERS" value={m.orders} trend="+130.6%" data={chartData} dataKey="orders" color="#1473ff" />
          <ChartCard title="TOTAL SALES" value={`${compact(m.revenue_sar)} MAD`} trend="+144.2%" data={chartData} dataKey="sales" color="#1473ff" />
          <ChartCard title="CONVERSION RATE" value={`${m.conversion_rate.toFixed(2)} %`} trend="+93.3%" data={chartData} dataKey="conversion" color="#1473ff" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-[#252525] p-5">
            <h3 className="text-[10px] font-bold text-white/50 uppercase mb-4 tracking-wider">AVERAGE ORDER VALUE</h3>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold">{m.average_order_value_sar.toFixed(2)} MAD</span>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">↑ 5.9%</span>
            </div>
            <div className="h-[140px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAov" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1473ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1473ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="sales" stroke="#1473ff" strokeWidth={2} fillOpacity={1} fill="url(#colorAov)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-[#252525] p-5">
              <h3 className="text-[10px] font-bold text-white/50 uppercase mb-4 tracking-wider">ORDERS Tracking orders</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg border border-white/10 text-[#1473ff]"><Package size={20} /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">19</span>
                      <span className="text-[10px] text-[#1473ff] bg-[#1473ff]/10 px-1.5 rounded">11.3%</span>
                    </div>
                    <span className="text-[10px] text-white/50 uppercase">ABANDONED ORDERS</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg border border-white/10 text-[#1473ff]"><Check size={20} /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">10</span>
                      <span className="text-[10px] text-[#1473ff] bg-[#1473ff]/10 px-1.5 rounded">5.9%</span>
                    </div>
                    <span className="text-[10px] text-white/50 uppercase">DUPLICATED ORDERS</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg border border-white/10 text-[#1473ff]"><Activity size={20} /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">0</span>
                      <span className="text-[10px] text-[#1473ff] bg-[#1473ff]/10 px-1.5 rounded">0%</span>
                    </div>
                    <span className="text-[10px] text-white/50 uppercase">RETURNING ORDERS</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg border border-white/10 text-[#1473ff]"><ShoppingBag size={20} /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">139</span>
                      <span className="text-[10px] text-[#1473ff] bg-[#1473ff]/10 px-1.5 rounded">82.7%</span>
                    </div>
                    <span className="text-[10px] text-white/50 uppercase">NORMAL ORDERS</span>
                  </div>
              </div>
            </div>
            
            <div className="rounded-xl border border-white/10 bg-[#252525] p-5">
              <h3 className="text-[10px] font-bold text-white/50 uppercase mb-4 tracking-wider">ORDERS By status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg border border-white/10 text-[#1473ff]"><Activity size={20} /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">153</span>
                      <span className="text-[10px] text-[#1473ff] bg-[#1473ff]/10 px-1.5 rounded">92.1%</span>
                    </div>
                    <span className="text-[10px] text-white/50 uppercase">PENDING ORDERS</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg border border-white/10 text-[#1473ff]"><Package size={20} /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">13</span>
                      <span className="text-[10px] text-[#1473ff] bg-[#1473ff]/10 px-1.5 rounded">7.8%</span>
                    </div>
                    <span className="text-[10px] text-white/50 uppercase">ABANDONED ORDERS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-[320px] xl:w-[380px] space-y-6 shrink-0">
        <div className="rounded-xl border border-white/10 bg-[#252525] p-5">
          <h3 className="text-[10px] font-bold text-white/50 uppercase mb-4 tracking-wider">DEVICES</h3>
          <div className="text-3xl font-bold mb-6">{m.clicks}</div>
          <div className="flex justify-between">
            {m.device_breakdown.map(d => (
              <div key={d.device} className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[#1473ff]"><Eye size={16} /></span>
                  <span className="text-[10px] text-[#1473ff] bg-[#1473ff]/10 px-1.5 rounded">{((d.clicks / m.clicks) * 100).toFixed(1)}%</span>
                </div>
                <span className="text-[10px] text-white/50 uppercase">{d.device} VIEWS</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#252525] p-5">
          <h3 className="text-[10px] font-bold text-white/50 uppercase mb-4 tracking-wider">COUNTRIES Most ordered</h3>
          <div className="space-y-4">
            {m.country_breakdown.slice(0, 3).map(c => (
              <div key={c.country} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">{c.country}</div>
                <div>
                  <div className="font-bold">{c.clicks}</div>
                  <div className="text-[10px] text-white/50 uppercase">ORDERS</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#252525] p-5">
          <h3 className="text-[10px] font-bold text-white/50 uppercase mb-4 tracking-wider">PRODUCTS Top selling</h3>
          <div className="space-y-4">
            {m.products.sort((a,b) => b.orders - a.orders).slice(0, 6).map(p => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <span className="text-[#1473ff] truncate pr-4">{p.name_ar}</span>
                <div className="flex gap-4 shrink-0 text-white/70">
                  <span><strong className="text-white">{p.orders}</strong> ORDERS</span>
                  <span><strong className="text-white">{p.units}</strong> SALES</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-xl border border-white/10 bg-[#252525] p-5">
          <h3 className="text-[10px] font-bold text-white/50 uppercase mb-4 tracking-wider">TRAFFIC SOURCES Most visits</h3>
          <div className="space-y-3">
            {m.traffic_sources.map(s => (
              <div key={s.source} className="flex items-center justify-between text-sm">
                <span>{s.source}</span>
                <span className="font-bold">{compact(s.clicks)} MAD</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Products Tab ─── */
function ProductsTab({ products }: { products: ProductMetric[] }) {
  return (
    <div className="space-y-4">
      <Card title="All Products Overview">
        <div className="overflow-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-[#E8E2D8] text-left text-xs font-bold uppercase text-[#567063]">
                <th className="px-3 py-3">Product</th>
                <th className="px-3 py-3">SKU</th>
                <th className="px-3 py-3 text-center">1 pc</th>
                <th className="px-3 py-3 text-center">2 pcs</th>
                <th className="px-3 py-3 text-center">3 pcs</th>
                <th className="px-3 py-3 text-center">Views</th>
                <th className="px-3 py-3 text-center">Cart</th>
                <th className="px-3 py-3 text-center">Orders</th>
                <th className="px-3 py-3 text-center">Units</th>
                <th className="px-3 py-3 text-right">Revenue</th>
                <th className="px-3 py-3 text-center">Conv.</th>
                <th className="px-3 py-3 text-center">Cross</th>
                <th className="px-3 py-3 text-center">Upsell</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-[#E8E2D8] hover:bg-[#F5F3EE]/60">
                  <td className="px-3 py-3">
                    <p className="font-bold">{p.name_ar}</p>
                    <p className="text-xs text-[#567063]">{p.concern_ar}</p>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs">{p.sku}</td>
                  <td className="px-3 py-3 text-center">{p.bundle_prices_sar[1]} SAR</td>
                  <td className="px-3 py-3 text-center">{p.bundle_prices_sar[2]} SAR</td>
                  <td className="px-3 py-3 text-center">{p.bundle_prices_sar[3]} SAR</td>
                  <td className="px-3 py-3 text-center">{p.views}</td>
                  <td className="px-3 py-3 text-center">{p.add_to_cart}</td>
                  <td className="px-3 py-3 text-center font-bold">{p.orders}</td>
                  <td className="px-3 py-3 text-center">{p.units}</td>
                  <td className="px-3 py-3 text-right font-bold text-[#155235]">{sar(p.revenue_sar)}</td>
                  <td className="px-3 py-3 text-center"><Badge value={pct(p.conversion_rate)} good={p.conversion_rate > 2} /></td>
                  <td className="px-3 py-3 text-center">{p.cross_sell_units}</td>
                  <td className="px-3 py-3 text-center">{p.upsell_units}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ─── Orders Tab ─── */
function OrdersTab({ orders, products, onPreview, loadingPreview }: { orders: OrderListItem[]; products: ProductMetric[]; onPreview: (orderId: string) => void; loadingPreview: boolean }) {
  const [period, setPeriod] = useState<"all" | "month" | "today">("all");

  const filteredOrders = useMemo(() => {
    if (period === "all") return orders;
    const now = new Date();
    const cutoff = new Date();
    if (period === "today") cutoff.setHours(0, 0, 0, 0);
    else { cutoff.setDate(1); cutoff.setHours(0, 0, 0, 0); }
    return orders.filter((o) => { const d = new Date(o.created_at); return d >= cutoff && d <= now; });
  }, [orders, period]);

  const totals = useMemo(() => ({
    orders: filteredOrders.length,
    revenue: filteredOrders.reduce((sum, order) => sum + order.total_sar, 0),
    pending: filteredOrders.filter((order) => order.status.includes("pending")).length,
    rejectedRisk: filteredOrders.filter((order) => order.fraud_decision && !["allowed", "allowed_test", "error_allow"].includes(order.fraud_decision)).length,
  }), [filteredOrders]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["all", "month", "today"] as const).map((p) => (
          <button key={p} onClick={() => setPeriod(p)} className={`rounded-full px-4 py-1.5 text-xs font-bold ${period === p ? "bg-[#1473ff] text-white" : "border border-white/10 bg-[#252525] text-white/70 hover:bg-[#2a2a2a]"}`}>
            {p === "all" ? "All Time" : p === "month" ? "This Month" : "Today"}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Orders in view" value={totals.orders} accent />
        <Kpi label="Revenue in view" value={sar(totals.revenue)} />
        <Kpi label="Pending confirmation" value={totals.pending} />
        <Kpi label="Risk flagged" value={totals.rejectedRisk} />
      </div>

      <Card title={`Orders by Product (${period === "all" ? "All Time" : period === "month" ? "This Month" : "Today"})`}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="rounded-xl border border-white/10 bg-[#252525] p-4">
              <p className="font-bold text-white">{p.name_ar}</p>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-3xl font-black text-[#60a5fa]">{p.orders}</span>
                <span className="text-sm text-white/45">orders</span>
                <span className="ml-auto text-sm font-bold text-white">{sar(p.revenue_sar)}</span>
              </div>
              <div className="mt-1 text-xs text-white/45">{p.units} units sold &middot; {pct(p.conversion_rate)} conv.</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title={`Order List (${filteredOrders.length})`}>
        {!filteredOrders.length ? <p className="text-sm text-white/45">No orders yet.</p> : (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <button key={order.id} onClick={() => onPreview(order.id)} disabled={loadingPreview} className="grid w-full gap-3 rounded-xl border border-white/10 bg-[#252525] p-4 text-left transition hover:border-[#1473ff]/60 md:grid-cols-[1.1fr_1fr_0.8fr_0.8fr_0.8fr] md:items-center">
                <div>
                  <p className="font-bold text-white">{order.public_order_number}</p>
                  <p className="text-xs text-white/45">{shortDate(order.created_at)}</p>
                </div>
                <div>
                  <p className="font-medium text-white">{order.customer_name}</p>
                  <p className="text-xs text-white/45">{order.customer_phone_local}</p>
                </div>
                <div><Badge value={statusLabel(order.status)} good={!order.status.includes("abandoned")} /></div>
                <div>
                  <p className="font-bold text-white">{sar(order.total_sar)}</p>
                  <p className="text-xs text-white/45">{order.utm_campaign || order.utm_source || "Direct"}</p>
                </div>
                <div className="text-sm text-white/65 flex justify-between items-center">
                  <div>
                    <p>{order.country_iso_code || "Unknown"} · {order.fraud_reason || "passed"}</p>
                    <p className="text-xs text-white/40">Preview details</p>
                  </div>
                  <div className="text-[#1473ff]"><Eye size={18} /></div>
                </div>
              </button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ─── Visitors Tab ─── */
function VisitorsTab({ metrics: m }: { metrics: Metrics }) {
  const thisMonthVisitors = useMemo(() => {
    const now = new Date();
    const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
    return m.daily.filter((d) => d.date >= monthStart).reduce((sum, d) => sum + d.clicks, 0);
  }, [m.daily]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Live Now" value={m.live_visitors} accent />
        <Kpi label="Today" value={m.today.visitors} />
        <Kpi label="This Month" value={thisMonthVisitors} />
        <Kpi label="All Time" value={m.all_time.visitors} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Daily Visitors">
          <DataTable rows={m.daily} cols={[["date", "Day"], ["clicks", "Visits"]]} />
        </Card>
        <Card title="By Device">
          <DataTable rows={m.device_breakdown} cols={[["device", "Device"], ["visitors", "Visitors"], ["clicks", "Page Views"]]} />
        </Card>
        <Card title="By Country">
          <DataTable rows={m.country_breakdown} cols={[["country", "Country"], ["visitors", "Visitors"], ["clicks", "Page Views"]]} />
        </Card>
      </div>
    </div>
  );
}

/* ─── Access Control Tab ─── */
function AccessControlTab({ headers, rules, reload }: { headers: Record<string, string>; rules: AccessRule[]; reload: () => void }) {
  const [ruleType, setRuleType] = useState<"device" | "country">("device");
  const [action, setAction] = useState<"block" | "allow">("block");
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const filteredCountries = useMemo(() => {
    const q = countrySearch.toLowerCase();
    if (!q) return ALL_COUNTRIES;
    return ALL_COUNTRIES.filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [countrySearch]);

  function toggleDevice(d: string) {
    setSelectedDevices((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  }

  function toggleCountry(code: string) {
    setSelectedCountries((prev) => prev.includes(code) ? prev.filter((x) => x !== code) : [...prev, code]);
  }

  const [feedback, setFeedback] = useState<string | null>(null);

  async function saveRules() {
    setSaving(true);
    setFeedback(null);
    const items = ruleType === "device" ? selectedDevices : selectedCountries;
    let saved = 0;
    try {
      for (const val of items) {
        const name = ruleType === "device"
          ? `${action === "block" ? "Block" : "Allow"} ${val}`
          : `${action === "block" ? "Block" : "Allow"} ${countryName(val)}`;
        const res = await fetch(`${API_BASE}/api/v1/admin/access-rules`, {
          method: "POST", headers,
          body: JSON.stringify({ name, rule_type: ruleType, value: val, action, enabled: true }),
        });
        if (!res.ok) {
          const errBody = await res.text().catch(() => "Unknown error");
          setFeedback(`Failed to save rule for ${val}: ${errBody}`);
          break;
        }
        saved++;
      }
      if (saved > 0) {
        setSelectedDevices([]); setSelectedCountries([]); setCountrySearch("");
        setFeedback(`${saved} rule(s) saved successfully.`);
        reload();
      }
    } catch (err) {
      setFeedback(`Network error: ${err instanceof Error ? err.message : "could not reach server"}`);
    } finally { setSaving(false); }
  }

  async function deleteRule(id: string) {
    setDeleting(id);
    setFeedback(null);
    try {
      const res = await fetch(`${API_BASE}/api/v1/admin/access-rules/${id}`, {
        method: "DELETE", headers,
      });
      if (!res.ok) {
        const res2 = await fetch(`${API_BASE}/api/v1/admin/access-rules/${id}`, {
          method: "PUT", headers,
          body: JSON.stringify({ name: "disabled", rule_type: "ip", value: "0.0.0.0", action: "block", enabled: false }),
        });
        if (!res2.ok) { setFeedback("Failed to disable rule."); return; }
      }
      setFeedback("Rule removed.");
      reload();
    } catch (err) {
      setFeedback(`Network error: ${err instanceof Error ? err.message : "could not reach server"}`);
    } finally { setDeleting(null); }
  }

  return (
    <div className="space-y-6">
      <Card title="Add Access Rule">
        <div className="space-y-4">
          <div className="flex gap-2">
            <button onClick={() => setRuleType("device")} className={`rounded-full px-4 py-2 text-sm font-black ${ruleType === "device" ? "bg-[#155235] text-white" : "bg-[#F5F3EE] text-[#155235]"}`}>Devices</button>
            <button onClick={() => setRuleType("country")} className={`rounded-full px-4 py-2 text-sm font-black ${ruleType === "country" ? "bg-[#155235] text-white" : "bg-[#F5F3EE] text-[#155235]"}`}>Countries</button>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setAction("block")} className={`rounded-full px-4 py-2 text-sm font-black ${action === "block" ? "bg-red-600 text-white" : "bg-[#F5F3EE] text-red-600"}`}>Block</button>
            <button onClick={() => setAction("allow")} className={`rounded-full px-4 py-2 text-sm font-black ${action === "allow" ? "bg-emerald-600 text-white" : "bg-[#F5F3EE] text-emerald-600"}`}>Allow (Whitelist)</button>
          </div>

          {ruleType === "device" && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {DEVICE_OPTIONS.map((d) => (
                <button key={d} onClick={() => toggleDevice(d)} className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition ${selectedDevices.includes(d) ? "border-[#155235] bg-[#155235]/5" : "border-[#E8E2D8] hover:border-[#155235]/30"}`}>
                  <span className="text-2xl">{d === "mobile" ? "📱" : d === "desktop" ? "💻" : d === "tablet" ? "📋" : "📺"}</span>
                  <span className="text-sm font-bold capitalize">{d}</span>
                </button>
              ))}
            </div>
          )}

          {ruleType === "country" && (
            <div>
              <input className="mb-3 w-full rounded-xl border border-[#E8E2D8] px-4 py-2.5 text-sm" placeholder="Search countries..." value={countrySearch} onChange={(e) => setCountrySearch(e.target.value)} />
              {selectedCountries.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {selectedCountries.map((code) => (
                    <span key={code} className="inline-flex items-center gap-1 rounded-full bg-[#155235] px-3 py-1 text-xs font-bold text-white">
                      {countryName(code)}
                      <button onClick={() => toggleCountry(code)} className="ml-1 text-white/70 hover:text-white">&times;</button>
                    </span>
                  ))}
                </div>
              )}
              <div className="max-h-[280px] overflow-auto rounded-xl border border-[#E8E2D8]">
                {filteredCountries.map((c) => (
                  <button key={c.code} onClick={() => toggleCountry(c.code)} className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-[#F5F3EE] ${selectedCountries.includes(c.code) ? "bg-[#155235]/5 font-bold" : ""}`}>
                    <span className={`inline-flex h-5 w-5 items-center justify-center rounded border text-xs ${selectedCountries.includes(c.code) ? "border-[#155235] bg-[#155235] text-white" : "border-[#E8E2D8]"}`}>
                      {selectedCountries.includes(c.code) ? "✓" : ""}
                    </span>
                    <span className="font-mono text-xs text-[#567063]">{c.code}</span>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="button" onClick={() => void saveRules()} disabled={saving || (ruleType === "device" ? !selectedDevices.length : !selectedCountries.length)} className="rounded-xl bg-[#155235] px-6 py-3 font-black text-white disabled:opacity-40">
            {saving ? "Saving..." : `${action === "block" ? "Block" : "Whitelist"} ${ruleType === "device" ? selectedDevices.length : selectedCountries.length} selected`}
          </button>
          {feedback && <p className={`mt-2 rounded-xl p-3 text-sm font-bold ${feedback.includes("error") || feedback.includes("Failed") ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>{feedback}</p>}
        </div>
      </Card>

      <Card title="Active Rules">
        {rules.filter((r) => r.enabled).length === 0 ? (
          <p className="text-sm text-[#567063]">No active rules. All visitors can access the store.</p>
        ) : (
          <div className="space-y-2">
            {rules.filter((r) => r.enabled).map((r) => (
              <div key={r.id} className={`flex items-center justify-between rounded-2xl border p-4 ${r.action === "block" ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"}`}>
                <div>
                  <span className={`mr-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-black ${r.action === "block" ? "bg-red-600 text-white" : "bg-emerald-600 text-white"}`}>{r.action.toUpperCase()}</span>
                  <span className="mr-2 rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-[#567063]">{r.rule_type}</span>
                  <span className="font-bold">{r.rule_type === "country" ? countryName(r.value) : r.value}</span>
                </div>
                <button onClick={() => deleteRule(r.id)} disabled={deleting === r.id} className="rounded-lg px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 disabled:opacity-40">
                  {deleting === r.id ? "..." : "Disable"}
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ─── Translations Tab ─── */
function TranslationsTab({ headers, translations, reload }: { headers: Record<string, string>; translations: TranslationOverride[]; reload: () => void }) {
  const [locale, setLocale] = useState<"ar" | "en">("ar");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!key.trim() || !value.trim()) return;
    setSaving(true);
    try {
      await fetch(`${API_BASE}/api/v1/admin/translations`, {
        method: "POST", headers,
        body: JSON.stringify({ locale, translation_key: key.trim(), value: value.trim(), enabled: true }),
      });
      setKey(""); setValue(""); reload();
    } finally { setSaving(false); }
  }

  const arTranslations = translations.filter((t) => t.locale === "ar" && t.enabled);
  const enTranslations = translations.filter((t) => t.locale === "en" && t.enabled);

  return (
    <div className="space-y-6">
      <Card title="Site Translation">
        <p className="mb-4 text-sm text-[#567063]">
          Change any visible text on the store. Use the exact current text as the &quot;Original text&quot; key, and write the replacement in &quot;New text&quot;. Choose the language you want to modify.
        </p>

        <div className="mb-4 flex gap-2">
          <button onClick={() => setLocale("ar")} className={`rounded-full px-5 py-2 text-sm font-black ${locale === "ar" ? "bg-[#155235] text-white" : "bg-[#F5F3EE] text-[#155235]"}`}>🇸🇦 Arabic</button>
          <button onClick={() => setLocale("en")} className={`rounded-full px-5 py-2 text-sm font-black ${locale === "en" ? "bg-[#155235] text-white" : "bg-[#F5F3EE] text-[#155235]"}`}>🇬🇧 English</button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-bold text-[#567063]">Original text (find on website)</label>
            <input className="w-full rounded-xl border border-[#E8E2D8] px-4 py-2.5 text-sm" placeholder={locale === "ar" ? "الدفع عند الاستلام" : "Cash on Delivery"} value={key} onChange={(e) => setKey(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-[#567063]">Replace with</label>
            <textarea className="min-h-[80px] w-full rounded-xl border border-[#E8E2D8] px-4 py-2.5 text-sm" placeholder="New text..." value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <button onClick={save} disabled={saving || !key.trim() || !value.trim()} className="rounded-xl bg-[#155235] px-6 py-3 font-black text-white disabled:opacity-40">
            {saving ? "Saving..." : "Save Translation"}
          </button>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title={`Arabic Overrides (${arTranslations.length})`}>
          {arTranslations.length === 0 ? <p className="text-sm text-[#567063]">No Arabic overrides yet.</p> : (
            <div className="space-y-2">{arTranslations.map((t) => (
              <div key={t.id} className="rounded-xl border border-[#E8E2D8] p-3">
                <p className="text-xs text-[#567063]">Original:</p>
                <p className="mb-1 font-bold">{t.translation_key}</p>
                <p className="text-xs text-[#567063]">Replaced with:</p>
                <p className="text-[#155235]">{t.value}</p>
              </div>
            ))}</div>
          )}
        </Card>
        <Card title={`English Overrides (${enTranslations.length})`}>
          {enTranslations.length === 0 ? <p className="text-sm text-[#567063]">No English overrides yet.</p> : (
            <div className="space-y-2">{enTranslations.map((t) => (
              <div key={t.id} className="rounded-xl border border-[#E8E2D8] p-3">
                <p className="text-xs text-[#567063]">Original:</p>
                <p className="mb-1 font-bold">{t.translation_key}</p>
                <p className="text-xs text-[#567063]">Replaced with:</p>
                <p className="text-[#155235]">{t.value}</p>
              </div>
            ))}</div>
          )}
        </Card>
      </div>
    </div>
  );
}

/* ─── Logins Tab ─── */
function LoginsTab({ logins, live }: { logins: LoginEvent[]; live: LoginEvent[] }) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card title={`Live Sessions (${live.length})`}>
        <DataTable rows={live} cols={[["username", "User"], ["ip_address", "IP"], ["country_iso_code", "Country"], ["device_type", "Device"], ["browser", "Browser"], ["last_seen_at", "Last Seen"]]} dates={["last_seen_at"]} />
      </Card>
      <Card title="Login History">
        <DataTable rows={logins} cols={[["username", "User"], ["ip_address", "IP"], ["country_iso_code", "Country"], ["device_type", "Device"], ["browser", "Browser"], ["os", "OS"], ["created_at", "Time"]]} dates={["created_at"]} />
      </Card>
    </div>
  );
}

function TrendBars({ rows }: { rows: Metrics["daily"] }) {
  const max = Math.max(1, ...rows.map((row) => Math.max(row.clicks, row.revenue_sar / 100, row.orders * 10)));
  return (
    <div className="mb-5 flex h-44 items-end gap-1 rounded-2xl border border-white/10 bg-[#252525] p-4">
      {rows.slice(-24).map((row) => {
        const height = Math.max(4, (Math.max(row.clicks, row.revenue_sar / 100, row.orders * 10) / max) * 100);
        return (
          <div key={row.date} className="group relative flex flex-1 items-end">
            <div className="w-full rounded-t bg-[#1473ff]" style={{ height: `${height}%` }} />
            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-black px-2 py-1 text-xs text-white group-hover:block">
              {row.date}: {row.clicks} clicks, {row.orders} orders, {sar(row.revenue_sar)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FunnelList({ rows }: { rows: Metrics["funnel"] }) {
  const max = Math.max(1, ...rows.map((row) => row.count));
  return (
    <div className="space-y-3">
      {rows.map((row, index) => (
        <div key={row.step}>
          <div className="mb-1 flex justify-between text-sm">
            <span className="font-bold text-white">{index + 1}. {row.step}</span>
            <span className="text-white/65">{compact(row.count)}</span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-[#1473ff]" style={{ width: `${Math.max(2, (row.count / max) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function OrderPreview({ order, onClose }: { order: OrderDetail; onClose: () => void }) {
  const flags = riskFlags(order);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-4 backdrop-blur-sm sm:items-center">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-2xl border border-white/10 bg-[#1c1c1c] text-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-[#252525] p-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Order Preview</p>
            <h2 className="mt-1 text-2xl font-bold">{order.public_order_number}</h2>
            <p className="text-sm text-white/50">{shortDate(order.created_at)} · {order.country_iso_code || "Unknown country"}</p>
          </div>
          <button onClick={onClose} className="rounded-lg border border-white/10 bg-[#1c1c1c] px-4 py-2 text-sm font-bold text-white hover:bg-white/5">Close</button>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <Kpi label="Total" value={sar(order.total_sar)} accent />
              <Kpi label="Subtotal" value={sar(order.subtotal_sar)} />
              <Kpi label="Shipping" value={sar(order.shipping_sar)} />
            </div>

            <Card title="Items">
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={`${item.product_id}-${item.source}`} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#252525] p-4">
                    <div>
                      <p className="font-bold text-white">{item.product_name_ar}</p>
                      <p className="text-xs text-white/50">{item.product_id} · {item.source}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">{sar(item.bundle_price_sar)}</p>
                      <p className="text-xs text-white/50">Qty {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Tracking & Delivery">
              <div className="grid gap-4 md:grid-cols-2">
                <StackList items={order.tracking_events.map((event) => ({
                  label: `${event.platform} · ${event.event_name}`,
                  sub: event.error || shortDate(event.created_at),
                  value: event.status,
                }))} />
                <StackList items={order.webhook_deliveries.map((delivery) => ({
                  label: delivery.destination,
                  sub: delivery.last_error || `${delivery.attempts} attempt(s)`,
                  value: delivery.status,
                }))} />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Customer">
              <div className="space-y-4 text-sm">
                <InfoRow label="Name" value={order.customer_name} />
                <InfoRow label="Phone" value={`${order.customer_phone_local} / ${order.customer_phone_e164}`} />
                <InfoRow label="Status" value={statusLabel(order.status)} />
                <InfoRow label="Test order" value={order.is_test_order ? "Yes" : "No"} />
              </div>
            </Card>

            <Card title="Fraud & IP Quality">
              <div className="space-y-4 text-sm">
                <InfoRow label="Decision" value={order.fraud_decision || "unknown"} />
                <InfoRow label="Reason" value={order.fraud_reason || "passed"} />
                <InfoRow label="IP" value={order.ip_address || "unknown"} />
                <InfoRow label="Risk score" value={order.risk_score == null ? "n/a" : String(order.risk_score)} />
                <InfoRow label="IP risk" value={order.ip_risk == null ? "n/a" : String(order.ip_risk)} />
                <div className="flex flex-wrap gap-2 pt-2">
                  {flags.length ? flags.map((flag) => <Badge key={flag} value={flag} good={false} />) : <Badge value="Clean IP" good />}
                </div>
              </div>
            </Card>

            <Card title="Attribution">
              <div className="space-y-4 text-sm">
                <InfoRow label="Source" value={order.utm_source || "Direct / unknown"} />
                <InfoRow label="Medium" value={order.utm_medium || "n/a"} />
                <InfoRow label="Campaign" value={order.utm_campaign || "n/a"} />
                <InfoRow label="Content" value={order.utm_content || "n/a"} />
                <InfoRow label="Term" value={order.utm_term || "n/a"} />
              </div>
            </Card>

            <Card title="URLs">
              <div className="space-y-4 text-xs">
                <InfoRow label="Landing" value={order.landing_page_url || "n/a"} />
                <InfoRow label="Page" value={order.page_url || "n/a"} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 pb-2 last:border-0">
      <span className="shrink-0 text-white/45">{label}</span>
      <span className="break-all text-right font-bold text-white">{value}</span>
    </div>
  );
}

function ChartCard({ title, value, trend, data, dataKey, color }: { title: string; value: string | number; trend: string; data: any[]; dataKey: string; color: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#252525] p-5 flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{title}</h3>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">{trend}</span>
      </div>
      <div className="h-[120px] w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666' }} dy={10} />
            <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fillOpacity={1} fill={`url(#color${dataKey})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ─── Shared Components ─── */
function Kpi({ label, value, accent = false }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-5 shadow-sm ${accent ? "border-[#1473ff]/40 bg-[#1473ff]/10 text-white" : "border-white/10 bg-[#252525] text-white"}`}>
      <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${accent ? "text-[#1473ff]" : "text-white/50"}`}>{label}</p>
      <p className="mt-2 text-2xl font-bold">{typeof value === "number" ? value.toLocaleString() : value}</p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="overflow-hidden rounded-xl border border-white/10 bg-[#252525] p-5 shadow-sm"><h2 className="mb-4 border-b border-white/10 pb-3 text-[10px] uppercase tracking-wider font-bold text-white/50">{title}</h2>{children}</div>;
}

function Badge({ value, good }: { value: string; good: boolean }) {
  return <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold ${good ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" : "border-amber-500/50 bg-amber-500/10 text-amber-300"}`}>{value}</span>;
}

function StackList({ items }: { items: Array<{ label: string; sub: string; value: string }> }) {
  if (!items.length) return <p className="text-sm text-white/45">No data yet.</p>;
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={`${item.label}-${i}`} className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-[#1c1c1c] p-3">
          <div><p className="font-medium text-sm text-white">{item.label}</p><p className="text-xs text-white/45">{item.sub}</p></div>
          <p className="font-black text-white">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function DataTable({ rows, cols, money = [], dates = [] }: { rows: Array<Record<string, unknown>>; cols: Array<[string, string]>; money?: string[]; dates?: string[] }) {
  if (!rows.length) return <p className="text-sm text-white/45">No data yet.</p>;
  return (
    <div className="max-h-[560px] overflow-auto">
      <table className="w-full min-w-[500px] text-sm">
        <thead><tr className="text-left text-xs font-bold uppercase text-white/45">{cols.map(([, l]) => <th key={l} className="whitespace-nowrap px-3 py-2">{l}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => (
          <tr key={String(row.id ?? i)} className="border-t border-white/10 text-white/80">
            {cols.map(([k]) => <td key={k} className="max-w-[260px] truncate px-3 py-3">{fmtCell(row[k], k, money, dates)}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function fmtCell(v: unknown, key: string, money: string[], dates: string[]) {
  if (v === null || v === undefined || v === "") return "—";
  if (money.includes(key) && typeof v === "number") return sar(v);
  if (dates.includes(key) && typeof v === "string") return shortDate(v);
  if (typeof v === "boolean") return v ? "Yes" : "No";
  return String(v);
}
