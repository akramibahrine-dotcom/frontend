import re

with open('app/admin/AdminDashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_filter_bar = """        {/* Filter Bar */}
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
        )}"""

new_filter_bar = """        {/* Global Date Filter */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-white/50 uppercase mb-1">Date Range</span>
            <select 
              className="rounded-lg border border-white/10 bg-[#252525] px-3 py-2 text-sm text-white focus:border-[#1473ff] focus:outline-none min-w-[200px]" 
              value={globalPeriod} 
              onChange={(e) => {
                const val = e.target.value;
                setGlobalPeriod(val);
                const d = new Date();
                let newStart = "";
                if (val === "Today") {
                  newStart = d.toISOString().slice(0, 10);
                } else if (val === "Yesterday") {
                  d.setDate(d.getDate() - 1);
                  newStart = d.toISOString().slice(0, 10);
                } else if (val === "Last 7 days") {
                  d.setDate(d.getDate() - 7);
                  newStart = d.toISOString().slice(0, 10);
                } else if (val === "Last 30 days") {
                  d.setDate(d.getDate() - 30);
                  newStart = d.toISOString().slice(0, 10);
                } else if (val === "This month") {
                  newStart = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
                } else if (val === "This year") {
                  newStart = `${d.getFullYear()}-01-01`;
                } else if (val === "All time") {
                  newStart = "2020-01-01";
                }
                setStart(newStart);
                setEnd(new Date().toISOString().slice(0, 10));
              }}
            >
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
              <option value="This month">This month</option>
              <option value="This year">This year</option>
              <option value="All time">All time</option>
            </select>
          </div>
          <div className="flex items-end h-full pt-5">
             <button onClick={() => void loadData()} disabled={loading} className="flex items-center gap-2 rounded-lg bg-[#1473ff] px-4 py-2 text-sm font-medium text-white hover:bg-[#1473ff]/90 disabled:opacity-50">
               <Filter size={14} /> {loading ? "Loading..." : "Apply Filter"}
             </button>
          </div>
        </div>"""

content = content.replace(old_filter_bar, new_filter_bar)

# Remove unused state variables to fix ESLint
content = re.sub(r'  const \[marketFilter, setMarketFilter\] = useState\(""\);\n', '', content)
content = re.sub(r'  const \[productFilter, setProductFilter\] = useState\(""\);\n', '', content)
content = re.sub(r'  const \[dateFilter, setDateFilter\] = useState\("This month"\);\n', '', content)

with open('app/admin/AdminDashboardClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
