import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from 'recharts';

const AdminDashboard = () => {
  // Enhanced data
  const stats = {
    users: { count: 1250, change: 12.5 },
    revenue: { total: 24560, change: 8.2 },
    requests: { pending: 42, resolved: 128 },
    services: { active: 1089, inactive: 215 }
  };

  const revenueData = [
    { month: "Jan", revenue: 4200, projected: 3800 },
    { month: "Feb", revenue: 3800, projected: 4000 },
    { month: "Mar", revenue: 5350, projected: 4500 },
    { month: "Apr", revenue: 3100, projected: 3500 },
    { month: "May", revenue: 2100, projected: 3000 },
    { month: "Jun", revenue: 2650, projected: 3200 },
    { month: "Jul", revenue: 3890, projected: 3700 },
  ];

  const serviceData = [
    { name: "Content Strategy", value: 35 },
    { name: "Media Buying", value: 25 },
    { name: "Analytics", value: 20 },
    { name: "Creative Production", value: 15 },
    { name: "Consulting", value: 5 }
  ];

  const audienceData = [
    { name: "18-24", value: 22 },
    { name: "25-34", value: 45 },
    { name: "35-44", value: 18 },
    { name: "45+", value: 15 }
  ];

  const COLORS = ['#7B5AFF', '#5A8BFF', '#5AC8FF', '#5AFFD3', '#B15AFF'];
  const AUDIENCE_COLORS = ['#FF5A8B', '#FFB15A', '#5AFF8B', '#8B5AFF'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1E2747] p-4 rounded-lg shadow-xl border border-[#7B5AFF]/30">
          <p className="font-bold text-[#7B5AFF]">{label}</p>
          {payload.map((item, index) => (
            <p key={index} className="flex items-center">
              <span 
                className="inline-block w-3 h-3 mr-2 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></span>
              {item.name}: <span className="font-semibold ml-1">${item.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6 mx-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#7B5AFF]">Strategemedia Dashboard</h1>
        <div className="text-sm text-gray-400">Last updated: {new Date().toLocaleString()}</div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gradient-to-br from-[#131B31] to-[#1E2747] p-4 shadow-lg border border-[#7B5AFF]/20">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-400 text-sm">Total Users</h3>
              <p className="text-2xl font-bold text-white mt-1">{stats.users.count.toLocaleString()}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${stats.users.change > 0 ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
              {stats.users.change > 0 ? '↑' : '↓'} {Math.abs(stats.users.change)}%
            </span>
          </div>
        </div>
        
        <div className="rounded-xl bg-gradient-to-br from-[#131B31] to-[#1E2747] p-4 shadow-lg border border-[#7B5AFF]/20">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-400 text-sm">Total Revenue</h3>
              <p className="text-2xl font-bold text-white mt-1">${stats.revenue.total.toLocaleString()}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${stats.revenue.change > 0 ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
              {stats.revenue.change > 0 ? '↑' : '↓'} {Math.abs(stats.revenue.change)}%
            </span>
          </div>
        </div>
        
        <div className="rounded-xl bg-gradient-to-br from-[#131B31] to-[#1E2747] p-4 shadow-lg border border-[#7B5AFF]/20">
          <div>
            <h3 className="text-gray-400 text-sm">Requests</h3>
            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="text-xl font-bold text-yellow-400">{stats.requests.pending}</p>
                <p className="text-xs text-gray-400">Pending</p>
              </div>
              <div className="h-8 w-px bg-gray-700 mx-2"></div>
              <div>
                <p className="text-xl font-bold text-green-400">{stats.requests.resolved}</p>
                <p className="text-xs text-gray-400">Resolved</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl bg-gradient-to-br from-[#131B31] to-[#1E2747] p-4 shadow-lg border border-[#7B5AFF]/20">
          <div>
            <h3 className="text-gray-400 text-sm">Services</h3>
            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="text-xl font-bold text-purple-400">{stats.services.active}</p>
                <p className="text-xs text-gray-400">Active</p>
              </div>
              <div className="h-8 w-px bg-gray-700 mx-2"></div>
              <div>
                <p className="text-xl font-bold text-blue-400">{stats.services.inactive}</p>
                <p className="text-xs text-gray-400">Inactive</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Revenue Trend Chart */}
        <div className="rounded-xl bg-gradient-to-br from-[#131B31] to-[#1E2747] p-4 shadow-lg border border-[#7B5AFF]/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Revenue Trend</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-[#7B5AFF]/10 text-[#7B5AFF] rounded-full">2023</button>
              <button className="px-3 py-1 text-xs bg-[#1E2747] text-gray-400 rounded-full">2024</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7B5AFF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7B5AFF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5AC8FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#5AC8FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3A5A" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8' }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#7B5AFF" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  strokeWidth={2}
                  activeDot={{ r: 6, stroke: '#7B5AFF', strokeWidth: 2, fill: '#131B31' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#5AC8FF" 
                  fillOpacity={1} 
                  fill="url(#colorProjected)" 
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  activeDot={{ r: 6, stroke: '#5AC8FF', strokeWidth: 2, fill: '#131B31' }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  formatter={(value) => (
                    <span className="text-gray-400 text-sm">{value}</span>
                  )}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Distribution */}
        <div className="rounded-xl bg-gradient-to-br from-[#131B31] to-[#1E2747] p-4 shadow-lg border border-[#7B5AFF]/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Service Distribution</h2>
            <button className="px-3 py-1 text-xs bg-[#7B5AFF]/10 text-[#7B5AFF] rounded-full">View All</button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#1E2747] p-3 rounded-lg shadow-lg border border-[#7B5AFF]/30">
                          <p className="font-bold text-[#7B5AFF]">{payload[0].name}</p>
                          <p className="text-white">{payload[0].value}% of total</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  layout="vertical" 
                  align="right" 
                  verticalAlign="middle"
                  formatter={(value) => (
                    <span className="text-gray-400 text-sm">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Audience Demographics */}
        <div className="rounded-xl bg-gradient-to-br from-[#131B31] to-[#1E2747] p-4 shadow-lg border border-[#7B5AFF]/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Audience Age Groups</h2>
            <button className="px-3 py-1 text-xs bg-[#7B5AFF]/10 text-[#7B5AFF] rounded-full">Details</button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={audienceData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid horizontal={true} vertical={false} stroke="#2D3A5A" />
                <XAxis 
                  type="number" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8' }}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#1E2747] p-3 rounded-lg shadow-lg border border-[#7B5AFF]/30">
                          <p className="font-bold text-[#7B5AFF]">{payload[0].payload.name}</p>
                          <p className="text-white">{payload[0].value}% of audience</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[0, 4, 4, 0]}
                  background={{ fill: '#1E2747' }}
                >
                  {audienceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={AUDIENCE_COLORS[index % AUDIENCE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="rounded-xl bg-gradient-to-br from-[#131B31] to-[#1E2747] p-4 shadow-lg border border-[#7B5AFF]/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Campaign Completion</h2>
            <button className="px-3 py-1 text-xs bg-[#7B5AFF]/10 text-[#7B5AFF] rounded-full">View All</button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="20%"
                outerRadius="90%"
                data={[
                  { name: 'Q1 Campaign', value: 85, fill: '#7B5AFF' },
                  { name: 'Q2 Campaign', value: 72, fill: '#5A8BFF' },
                  { name: 'Summer Push', value: 64, fill: '#5AC8FF' },
                  { name: 'Year End', value: 50, fill: '#5AFFD3' }
                ]}
                startAngle={180}
                endAngle={-180}
              >
                <PolarAngleAxis 
                  type="number" 
                  domain={[0, 100]} 
                  angleAxisId={0} 
                  tick={false}
                />
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={10}
                  label={{ 
                    position: 'insideStart', 
                    formatter: (value) => `${value}%`,
                    fill: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ right: -20 }}
                  formatter={(value) => (
                    <span className="text-gray-400 text-xs">{value}</span>
                  )}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#1E2747] p-3 rounded-lg shadow-lg border border-[#7B5AFF]/30">
                          <p className="font-bold text-[#7B5AFF]">{payload[0].payload.name}</p>
                          <p className="text-white">{payload[0].value}% completed</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;