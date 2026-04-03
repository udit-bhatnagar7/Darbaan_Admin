import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  PieChart as PieChartIcon,
  Activity,
  ChevronDown,
  Info,
  FileText
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  Legend,
  AreaChart,
  Area
} from 'recharts';

const revenueData = [
  { month: 'Oct', revenue: 450000, expense: 320000 },
  { month: 'Nov', revenue: 480000, expense: 350000 },
  { month: 'Dec', revenue: 520000, expense: 410000 },
  { month: 'Jan', revenue: 490000, expense: 380000 },
  { month: 'Feb', revenue: 510000, expense: 390000 },
  { month: 'Mar', revenue: 550000, expense: 420000 },
];

const categoryData = [
  { name: 'Utilities', value: 45000, color: '#3b82f6' },
  { name: 'Staff', value: 120000, color: '#8b5cf6' },
  { name: 'Maintenance', value: 85000, color: '#f59e0b' },
  { name: 'Legal', value: 25000, color: '#f43f5e' },
  { name: 'Admin', value: 15000, color: '#64748b' },
];

const collectionData = [
  { day: '1', collected: 120000 },
  { day: '5', collected: 250000 },
  { day: '10', collected: 380000 },
  { day: '15', collected: 420000 },
  { day: '20', collected: 480000 },
  { day: '25', collected: 510000 },
  { day: '30', collected: 550000 },
];

export default function FinancialReportsPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
            <BarChart3 size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Financial Reports</h1>
            <p className="text-muted-foreground mt-1">Comprehensive analysis of society income and expenses.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex p-1 bg-muted rounded-lg mr-2">
            <Button variant="ghost" size="sm" className="h-7 text-[10px] px-3 bg-card shadow-sm">Monthly</Button>
            <Button variant="ghost" size="sm" className="h-7 text-[10px] px-3">Quarterly</Button>
            <Button variant="ghost" size="sm" className="h-7 text-[10px] px-3">Annual</Button>
          </div>
          <Button variant="outline" size="sm" className="h-9">
            <Calendar className="mr-2 h-4 w-4" />
            Mar 2024
            <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
          <Button size="sm" className="h-9 bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Net Surplus</p>
            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md">
              <TrendingUp size={14} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">₹1,30,000</h3>
            <p className="text-[10px] text-emerald-600 font-medium">+8.2% vs last month</p>
          </div>
        </Card>
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Collection Rate</p>
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
              <Activity size={14} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">94.5%</h3>
            <p className="text-[10px] text-blue-600 font-medium">Target: 95%</p>
          </div>
        </Card>
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Outstanding Dues</p>
            <div className="p-1.5 bg-rose-50 text-rose-600 rounded-md">
              <TrendingDown size={14} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">₹85,400</h3>
            <p className="text-[10px] text-rose-600 font-medium">-15% improvement</p>
          </div>
        </Card>
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Operating Margin</p>
            <div className="p-1.5 bg-purple-50 text-purple-600 rounded-md">
              <PieChartIcon size={14} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">23.6%</h3>
            <p className="text-[10px] text-muted-foreground">Healthy range: 20-25%</p>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue vs Expense Chart */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Revenue vs Expense</h3>
              <p className="text-xs text-muted-foreground">Comparison of monthly income and expenditures.</p>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">6 Month Trend</Badge>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                />
                <Legend iconType="circle" />
                <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="expense" name="Expense" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Expense Breakdown */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Expense Breakdown</h3>
              <p className="text-xs text-muted-foreground">Distribution of expenses by category for March.</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Info size={16} className="text-muted-foreground" />
            </Button>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="h-[250px] w-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `₹${value.toLocaleString()}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 flex-1">
              {categoryData.map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">₹{item.value.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">{((item.value / 290000) * 100).toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Collection Trend */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Collection Velocity</h3>
              <p className="text-xs text-muted-foreground">Cumulative collection progress throughout the month.</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600">
              <TrendingUp size={14} />
              <span className="text-xs font-bold">On Track</span>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={collectionData}>
                <defs>
                  <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  label={{ value: 'Day of Month', position: 'insideBottom', offset: -5, fontSize: 10 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Collected']}
                />
                <Area type="monotone" dataKey="collected" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCollected)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Monthly P&L Summary */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Monthly P&L Summary</h3>
            <Button variant="ghost" size="sm" className="text-xs h-8">
              View All Months
            </Button>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-dashed space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Gross Income</span>
                <span className="font-bold text-emerald-600">₹5,50,000</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Expenses</span>
                <span className="font-bold text-rose-600">- ₹4,20,000</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="font-bold">Net Profit</span>
                <span className="text-xl font-bold text-blue-600">₹1,30,000</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase">Key Insights</h4>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                <div className="p-1.5 bg-blue-100 rounded-md text-blue-600">
                  <TrendingUp size={14} />
                </div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Revenue is up by 8% due to high collection of pending dues from previous quarters.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/50 border border-amber-100">
                <div className="p-1.5 bg-amber-100 rounded-md text-amber-600">
                  <ArrowUpRight size={14} />
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Utility costs are 12% higher than projected. Recommend checking for water leakages.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
