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
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { 
  Eye, 
  ShoppingBag, 
  Package, 
  Activity, 
  Filter, 
  Check, 
  AlertTriangle,
  TrendingUp,
  MapPin,
  Smartphone,
  Globe,
  LogOut,
  ChevronRight,
  Search,
  X
} from "lucide-react";

import { getApiBase } from "@/lib/api-base";

const API_BASE = getApiBase();

// Add typical COD countries
const ALL_COUNTRIES: Record<string, string> = {
  "SA": "Saudi Arabia", "AE": "UAE", "KW": "Kuwait", "QA": "Qatar", 
  "BH": "Bahrain", "OM": "Oman", "IQ": "Iraq", "LB": "Lebanon", "LY": "Libya",
};

function countryName(code: string) { return ALL_COUNTRIES[code] || code; }
function sar(v: number) { return new Intl.NumberFormat("ar-SA", { style: "currency", currency: "SAR", maximumFractionDigits: 0 }).format(v); }
function shortDate(v: string) { return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(v)); }
function pct(v: number) { return `${v.toFixed(1)}%`; }
function compact(v: number) { return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(v); }
function statusColor(status: string) {
  if (status.includes("pending")) return "bg-amber-100 text-amber-700 border-amber-200";
  if (status.includes("confirmed")) return "bg-blue-100 text-blue-700 border-blue-200";
  if (status.includes("shipped") || status.includes("delivered")) return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (status.includes("cancelled") || status.includes("rejected")) return "bg-red-100 text-red-700 border-red-200";
  return "bg-gray-100 text-gray-700 border-gray-200";
}

// Types based on the existing backend response
type Metrics = any;
type OrderListItem = any;
type OrderDetail = any;
type Tab = "overview" | "orders" | "products" | "traffic";

export function AdminDashboardClient() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  
  // Date filtering
  const [globalPeriod, setGlobalPeriod] = useState("Last 7 days");
  const [start, setStart] = useState(() => { const d = new Date(); d.setDate(d.getDate() - 7); return d.toISOString().slice(0, 10); });
  const [end, setEnd] = useState(() => new Date().toISOString().slice(0, 10));
  
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [orderPreviewLoading, setOrderPreviewLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const adminFetch = useCallback(async function adminFetch<T>(path: string, init: RequestInit = {}, token = auth): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, { 
      ...init, 
      headers: { ...(init.headers || {}), Authorization: `Basic ${token}`, "Content-Type": "application/json" }, 
      cache: "no-store" 
    });
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
      const [m, o] = await Promise.all([
        adminFetch<Metrics>(`/api/v1/admin/metrics?${params}`, {}, token),
        adminFetch<{ orders: OrderListItem[] }>(`/api/v1/admin/orders?${params}&limit=500`, {}, token),
      ]);
      setMetrics(m); 
      setOrders(o.orders);
    } catch (err) { 
      setError(err instanceof Error ? err.message : "Unexpected error."); 
    } finally { 
      setLoading(false); 
    }
  }, [adminFetch, auth, end, start]);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = btoa(`${username}:${password}`);
    setAuth(token);
    try { await adminFetch("/api/v1/admin/session", { method: "POST" }, token); } catch { }
    void loadData(token);
  }

  useEffect(() => { if (auth) void loadData(); }, [auth, loadData]);

  async function previewOrder(orderId: string) {
    setOrderPreviewLoading(true);
    try {
      setSelectedOrder(await adminFetch<OrderDetail>(`/api/v1/admin/orders/${orderId}`));
    } catch (err) {
      alert("Could not load order preview.");
    } finally {
      setOrderPreviewLoading(false);
    }
  }

  function handleDateChange(val: string) {
    setGlobalPeriod(val);
    const d = new Date();
    let newStart = "";
    if (val === "Today") { newStart = d.toISOString().slice(0, 10); } 
    else if (val === "Yesterday") { d.setDate(d.getDate() - 1); newStart = d.toISOString().slice(0, 10); } 
    else if (val === "Last 7 days") { d.setDate(d.getDate() - 7); newStart = d.toISOString().slice(0, 10); } 
    else if (val === "Last 30 days") { d.setDate(d.getDate() - 30); newStart = d.toISOString().slice(0, 10); } 
    else if (val === "This month") { newStart = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`; } 
    else if (val === "All time") { newStart = "2020-01-01"; }
    setStart(newStart);
    setEnd(new Date().toISOString().slice(0, 10));
  }

  if (!auth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans" dir="ltr">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">B</div>
            <h1 className="text-2xl font-bold text-gray-900">Baytseha Admin</h1>
            <p className="text-sm text-gray-500 mt-2">Enter your credentials to access the COD Dashboard</p>
          </div>
          <form onSubmit={login} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-black focus:border-black outline-none transition" placeholder="admin" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-black focus:border-black outline-none transition" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="w-full rounded-lg bg-black text-white py-3 font-semibold hover:bg-gray-800 transition" type="submit">Sign In</button>
          </form>
          {error && <p className="mt-4 text-center text-sm text-red-600 bg-red-50 py-2 rounded-lg">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col md:flex-row" dir="ltr">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 sticky top-0 md:h-screen z-10">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold">B</div>
          <span className="font-bold text-lg tracking-tight">Baytseha</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarItem icon={<Activity size={18} />} label="Overview" active={tab === "overview"} onClick={() => setTab("overview")} />
          <SidebarItem icon={<Package size={18} />} label="Orders" active={tab === "orders"} onClick={() => setTab("orders")} />
          <SidebarItem icon={<ShoppingBag size={18} />} label="Products" active={tab === "products"} onClick={() => setTab("products")} />
          <SidebarItem icon={<Globe size={18} />} label="Traffic & Sources" active={tab === "traffic"} onClick={() => setTab("traffic")} />
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={() => setAuth(null)} className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-10">
          <h2 className="text-xl font-bold capitalize">{tab} Dashboard</h2>
          <div className="flex items-center gap-3">
            <select 
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-black outline-none" 
              value={globalPeriod} 
              onChange={(e) => handleDateChange(e.target.value)}
            >
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
              <option value="This month">This month</option>
              <option value="All time">All time</option>
            </select>
            <button onClick={() => void loadData()} disabled={loading} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition disabled:opacity-50">
              <Filter size={18} />
            </button>
          </div>
        </header>

        <div className="p-6 flex-1 overflow-y-auto">
          {error && <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600 text-sm font-medium flex items-center gap-2"><AlertTriangle size={16} /> {error}</div>}
          
          {loading && !metrics ? (
            <div className="flex items-center justify-center h-64 text-gray-400">Loading dashboard data...</div>
          ) : metrics ? (
            <div className="max-w-7xl mx-auto space-y-6">
              {tab === "overview" && <OverviewTab metrics={metrics} />}
              {tab === "orders" && <OrdersTab orders={orders} onPreview={previewOrder} />}
              {tab === "products" && <ProductsTab products={metrics.products} />}
              {tab === "traffic" && <TrafficTab metrics={metrics} />}
            </div>
          ) : null}
        </div>
      </main>

      {selectedOrder && <OrderPreviewModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick} 
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-black text-white shadow-md" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
    >
      {icon} {label}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                               OVERVIEW TAB                                 */
/* -------------------------------------------------------------------------- */
function OverviewTab({ metrics: m }: { metrics: Metrics }) {
  const chartData = m.daily.map((d: any) => ({
    name: d.date.slice(5).replace("-", "/"), // MM/DD
    Clicks: d.clicks,
    Orders: d.orders,
    Revenue: d.revenue_sar,
  }));

  const metricsCards = [
    { title: "Total Revenue", value: sar(m.revenue_sar), subtitle: `${m.orders} total orders`, icon: <TrendingUp size={20} className="text-emerald-500" />, color: "border-emerald-200 bg-emerald-50" },
    { title: "Valid GCC Visitors", value: m.clicks.toLocaleString(), subtitle: `${m.unique_sessions} unique sessions`, icon: <Eye size={20} className="text-blue-500" />, color: "border-blue-200 bg-blue-50" },
    { title: "Conversion Rate", value: `${m.conversion_rate.toFixed(2)}%`, subtitle: "Orders per valid click", icon: <Activity size={20} className="text-purple-500" />, color: "border-purple-200 bg-purple-50" },
    { title: "Average Order Value", value: sar(m.average_order_value_sar), subtitle: "Revenue per order", icon: <ShoppingBag size={20} className="text-amber-500" />, color: "border-amber-200 bg-amber-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsCards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-semibold text-gray-500">{card.title}</h3>
              <div className={`p-2 rounded-lg border ${card.color}`}>{card.icon}</div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500 mt-1 font-medium">{card.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">Revenue & Orders Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(val) => `SAR ${compact(val)}`} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area yAxisId="left" type="monotone" dataKey="Revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area yAxisId="right" type="monotone" dataKey="Orders" stroke="#3b82f6" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">Store Funnel</h3>
          <div className="flex-1 flex flex-col justify-center space-y-4">
            {m.funnel.map((step: any, i: number) => {
              const max = Math.max(...m.funnel.map((s: any) => s.count));
              const pctOfMax = max > 0 ? (step.count / max) * 100 : 0;
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{step.step}</span>
                    <span className="font-bold text-gray-900">{step.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-black h-2 rounded-full" style={{ width: `${pctOfMax}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               ORDERS TAB                                   */
/* -------------------------------------------------------------------------- */
function OrdersTab({ orders, onPreview }: { orders: OrderListItem[]; onPreview: (id: string) => void }) {
  const [search, setSearch] = useState("");
  
  const filtered = useMemo(() => {
    if (!search) return orders;
    const q = search.toLowerCase();
    return orders.filter(o => 
      o.public_order_number.toLowerCase().includes(q) || 
      o.customer_name.toLowerCase().includes(q) || 
      o.customer_phone_local.includes(q)
    );
  }, [orders, search]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50 shrink-0">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Order ID, Name, Phone..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="text-sm font-medium text-gray-500">{filtered.length} Orders</div>
      </div>
      
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Order ID & Date</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Customer</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Status</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Total</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Source</th>
              <th className="py-3 px-4 border-b border-gray-200"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="py-8 text-center text-gray-500">No orders found.</td></tr>
            ) : (
              filtered.map(o => (
                <tr key={o.id} className="hover:bg-gray-50 transition group cursor-pointer" onClick={() => onPreview(o.id)}>
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">{o.public_order_number}</div>
                    <div className="text-xs text-gray-500">{shortDate(o.created_at)}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{o.customer_name}</div>
                    <div className="text-xs text-gray-500" dir="ltr">{o.customer_phone_local}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColor(o.status)}`}>
                      {o.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">{sar(o.total_sar)}</div>
                    {o.country_iso_code && <div className="text-[10px] font-medium text-gray-500 uppercase">{countryName(o.country_iso_code)}</div>}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-700 capitalize">{o.utm_source || "Direct"}</div>
                    <div className="text-xs text-gray-400 truncate max-w-[120px]">{o.utm_campaign || "-"}</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-gray-400 hover:text-black opacity-0 group-hover:opacity-100 transition p-1">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               PRODUCTS TAB                                 */
/* -------------------------------------------------------------------------- */
function ProductsTab({ products }: { products: any[] }) {
  const sorted = [...products].sort((a, b) => b.orders - a.orders);
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Product Performance</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Views</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">ATC</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Orders</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Units Sold</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Revenue</th>
              <th className="py-3 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Conversion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-5">
                  <div className="font-bold text-gray-900">{p.name_ar}</div>
                  <div className="text-xs text-gray-500 font-mono mt-0.5">{p.sku}</div>
                </td>
                <td className="py-4 px-4 text-center font-medium text-gray-600">{p.views.toLocaleString()}</td>
                <td className="py-4 px-4 text-center font-medium text-gray-600">{p.add_to_cart.toLocaleString()}</td>
                <td className="py-4 px-4 text-center font-bold text-gray-900 bg-gray-50/50">{p.orders.toLocaleString()}</td>
                <td className="py-4 px-4 text-center font-medium text-gray-600">{p.units.toLocaleString()}</td>
                <td className="py-4 px-4 text-right font-bold text-emerald-600">{sar(p.revenue_sar)}</td>
                <td className="py-4 px-5 text-right">
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-bold ${p.conversion_rate > 2 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                    {p.conversion_rate.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               TRAFFIC TAB                                  */
/* -------------------------------------------------------------------------- */
function TrafficTab({ metrics: m }: { metrics: Metrics }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 lg:col-span-2">
        <h3 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">Top UTM Sources</h3>
        <div className="space-y-4">
          {m.utm_source_breakdown.map((s: any, i: number) => {
            const max = Math.max(...m.utm_source_breakdown.map((x: any) => x.revenue_sar));
            const pct = max > 0 ? (s.revenue_sar / max) * 100 : 0;
            return (
              <div key={i} className="relative">
                <div className="flex justify-between text-sm mb-1 z-10 relative px-2 pt-1">
                  <span className="font-semibold text-gray-800 capitalize">{s.source}</span>
                  <span className="font-bold text-gray-900">{sar(s.revenue_sar)} <span className="text-gray-400 font-normal ml-1">({s.orders} orders)</span></span>
                </div>
                <div className="w-full bg-gray-50 rounded-lg h-8 absolute top-0 left-0 overflow-hidden border border-gray-100">
                  <div className="bg-blue-100 h-full rounded-lg" style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
          {m.utm_source_breakdown.length === 0 && <p className="text-gray-400 text-sm">No UTM source data recorded yet.</p>}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2"><MapPin size={16}/> GCC Visitors</h3>
          <div className="space-y-3">
            {m.country_breakdown.map((c: any) => (
              <div key={c.country} className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{countryName(c.country)}</span>
                <span className="font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-900">{c.visitors.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2"><Smartphone size={16}/> Device Split</h3>
          <div className="space-y-3">
            {m.device_breakdown.map((d: any) => (
              <div key={d.device} className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700 capitalize">{d.device}</span>
                <span className="font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-900">{d.visitors.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               ORDER PREVIEW MODAL                          */
/* -------------------------------------------------------------------------- */
function OrderPreviewModal({ order, onClose }: { order: OrderDetail; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir="ltr">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div>
            <h2 className="text-xl font-black text-gray-900">{order.public_order_number}</h2>
            <p className="text-sm text-gray-500 font-medium">{shortDate(order.created_at)}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Column - Order Items & Totals */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-bold text-sm text-gray-700 uppercase tracking-wider">
                  Order Items
                </div>
                <div className="divide-y divide-gray-100">
                  {order.items.map((item: any) => (
                    <div key={`${item.product_id}-${item.source}`} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">{item.product_name_ar}</p>
                        <p className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded mt-1 font-mono">{item.product_id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{sar(item.bundle_price_sar)}</p>
                        <p className="text-sm text-gray-500 font-medium">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 p-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 font-medium">
                    <span>Subtotal</span><span>{sar(order.subtotal_sar)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 font-medium">
                    <span>Shipping</span><span>{sar(order.shipping_sar)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span><span>{sar(order.total_sar)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-bold text-sm text-gray-700 uppercase tracking-wider">
                  Post-Purchase Events (Pixels & Sheets)
                </div>
                <div className="p-4 space-y-3">
                  {order.tracking_events.map((e: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-bold capitalize text-gray-900">{e.platform}</span>
                        <span className="text-gray-500 ml-2">/ {e.event_name}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${e.status === 'success' || e.status === 'processed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {e.status}
                      </span>
                    </div>
                  ))}
                  {order.webhook_deliveries.map((w: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-bold capitalize text-gray-900">Google Sheets</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${w.status === 'success' || w.status === 'sent' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {w.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Customer & Fraud Info */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-bold text-sm text-gray-700 uppercase tracking-wider">
                  Customer
                </div>
                <div className="p-4 space-y-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Name</p>
                    <p className="font-medium text-gray-900">{order.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Phone</p>
                    <p className="font-medium text-gray-900 font-mono" dir="ltr">{order.customer_phone_e164}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Status</p>
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-bold mt-1 ${statusColor(order.status)}`}>
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-bold text-sm text-gray-700 uppercase tracking-wider">
                  Marketing Attribution
                </div>
                <div className="p-4 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500 font-medium">Source</span>
                    <span className="font-bold capitalize text-gray-900">{order.utm_source || "Direct"}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500 font-medium">Medium</span>
                    <span className="font-bold text-gray-900">{order.utm_medium || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500 font-medium">Campaign</span>
                    <span className="font-bold text-gray-900 truncate max-w-[150px]" title={order.utm_campaign || ""}>{order.utm_campaign || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-bold text-sm text-gray-700 uppercase tracking-wider">
                  Fraud Analysis
                </div>
                <div className="p-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Decision</span>
                    <span className={`font-bold ${order.fraud_decision === 'rejected' ? 'text-red-600' : 'text-emerald-600'}`}>{order.fraud_decision || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Country</span>
                    <span className="font-bold text-gray-900">{countryName(order.country_iso_code)} ({order.country_iso_code})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">IP Address</span>
                    <span className="font-mono text-xs text-gray-900">{order.ip_address}</span>
                  </div>
                  {order.is_anonymous_vpn || order.is_anonymous_proxy ? (
                    <div className="mt-2 bg-red-50 text-red-700 p-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2">
                      <AlertTriangle size={14} /> VPN / Proxy Detected
                    </div>
                  ) : (
                    <div className="mt-2 bg-emerald-50 text-emerald-700 p-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2">
                      <Check size={14} /> Clean IP Address
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
