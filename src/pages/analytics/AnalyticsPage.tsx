import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  IndianRupee, 
  Users, 
  ClipboardCheck, 
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Calendar,
  Wrench
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell
} from 'recharts';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

// Mock Data
const revenueTrendData = [
  { month: 'Jan', revenue: 450000 },
  { month: 'Feb', revenue: 520000 },
  { month: 'Mar', revenue: 480000 },
  { month: 'Apr', revenue: 610000 },
  { month: 'May', revenue: 590000 },
  { month: 'Jun', revenue: 650000 },
];

const collectionVsPendingData = [
  { month: 'Jan', collected: 400000, pending: 50000 },
  { month: 'Feb', collected: 475000, pending: 45000 },
  { month: 'Mar', collected: 420000, pending: 60000 },
  { month: 'Apr', collected: 575000, pending: 35000 },
  { month: 'May', collected: 550000, pending: 40000 },
  { month: 'Jun', collected: 620000, pending: 30000 },
];

const complaintTrendsData = [
  { month: 'Jan', count: 24 },
  { month: 'Feb', count: 18 },
  { month: 'Mar', count: 35 },
  { month: 'Apr', count: 28 },
  { month: 'May', count: 42 },
  { month: 'Jun', count: 38 },
];

const topDefaulters = [
  { name: 'Rajesh Kumar', unit: 'B-402', amount: '₹45,000', status: 'Critical' },
  { name: 'Anita Sharma', unit: 'A-105', amount: '₹32,500', status: 'Warning' },
  { name: 'Vikram Singh', unit: 'C-701', amount: '₹28,000', status: 'Warning' },
  { name: 'Sanjay Gupta', unit: 'D-203', amount: '₹15,000', status: 'Pending' },
];

const topVendors = [
  { name: 'CleanPro Services', rating: 4.8, jobs: 124, trend: 'up' },
  { name: 'SecureGuard Ltd', rating: 4.6, jobs: 89, trend: 'up' },
  { name: 'ElectroFix', rating: 4.5, jobs: 56, trend: 'down' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">Decision-making insights and society performance trends.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Calendar className="mr-2 h-4 w-4" />
            Last 6 Months
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button size="sm" className="h-9 bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Total Revenue" 
          value="₹32.4L" 
          trend="+12.5%" 
          trendType="up"
          icon={IndianRupee}
          description="vs last period"
        />
        <MetricCard 
          title="Collection Rate" 
          value="94.2%" 
          trend="+2.1%" 
          trendType="up"
          icon={ClipboardCheck}
          description="Target: 98%"
        />
        <MetricCard 
          title="Pending Dues" 
          value="₹4.8L" 
          trend="+12%" 
          trendType="down"
          icon={AlertTriangle}
          description="18 units overdue"
          isNegativeTrend
        />
        <MetricCard 
          title="Occupancy Rate" 
          value="88.5%" 
          trend="-0.5%" 
          trendType="down"
          icon={Building2}
          description="420/475 units"
        />
      </div>

      {/* Insight Cards - Prominent Anomalies */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5 bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h4 className="font-bold text-rose-900 dark:text-rose-400 text-lg">“⚠️ 12% dues increase this month”</h4>
            <p className="text-sm text-rose-700 dark:text-rose-500/80">
              Collection efficiency dropped in Block B. Immediate follow-up recommended.
            </p>
          </div>
        </Card>
        <Card className="p-5 bg-primary/5 border-primary/10 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0">
            <Wrench size={24} />
          </div>
          <div>
            <h4 className="font-bold text-primary text-lg">“Top complaint category: Plumbing”</h4>
            <p className="text-sm text-primary/80">
              45 new tickets this month. Consider preventive maintenance for main lines.
            </p>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Trend (Line Chart) */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Revenue Trend</h3>
            <div className="text-xs font-medium text-emerald-500 bg-emerald-50 px-2 py-1 rounded">+15% growth</div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: 'var(--color-primary)', strokeWidth: 2, stroke: 'white' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Monthly Collections vs Pending (Grouped Bar) */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Monthly Collections vs Pending</h3>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Collected</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-rose-500" />
                <span>Pending</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collectionVsPendingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted) / 0.4)' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="collected" fill="var(--color-primary)" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="pending" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Complaint Trends (Bar Chart) */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Complaint Trends</h3>
            <p className="text-sm text-muted-foreground">Volume of tickets raised per month</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complaintTrendsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted) / 0.4)' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Lists Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Defaulters */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Top Defaulters</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {topDefaulters.map((defaulter, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold text-muted-foreground">
                    {defaulter.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{defaulter.name}</p>
                    <p className="text-xs text-muted-foreground">Unit {defaulter.unit}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-rose-500">{defaulter.amount}</p>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                    defaulter.status === 'Critical' ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
                  )}>
                    {defaulter.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Vendors */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Vendor Performance</h3>
            <Button variant="outline" size="sm">Manage Vendors</Button>
          </div>
          <div className="space-y-4">
            {topVendors.map((vendor, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{vendor.name}</p>
                    <p className="text-xs text-muted-foreground">{vendor.jobs} jobs completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <span className="font-bold">{vendor.rating}</span>
                    <div className="flex text-amber-400">★</div>
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-xs font-medium justify-end",
                    vendor.trend === 'up' ? "text-emerald-500" : "text-rose-500"
                  )}>
                    {vendor.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {vendor.trend === 'up' ? 'Improving' : 'Declining'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, trendType, icon: Icon, description, isNegativeTrend }: any) {
  const isUp = trendType === 'up';
  
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-muted rounded-lg text-muted-foreground">
          <Icon size={20} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
          isUp 
            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" 
            : "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
          isNegativeTrend && isUp ? "bg-rose-50 text-rose-600" : "" // Handle specific cases
        )}>
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </Card>
  );
}
