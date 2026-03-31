import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, DollarSign, UserPlus, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
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
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Skeleton } from '@/src/components/ui/Skeleton';
import axiosInstance from '@/src/lib/axios';

import { useUIStore } from '@/src/stores/uiStore';

const data = [
  { name: 'Jan', revenue: 4000, users: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 2000, users: 9800 },
  { name: 'Apr', revenue: 2780, users: 3908 },
  { name: 'May', revenue: 1890, users: 4800 },
  { name: 'Jun', revenue: 2390, users: 3800 },
  { name: 'Jul', revenue: 3490, users: 4300 },
];

export default function DashboardPage() {
  const { theme } = useUIStore();
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await axiosInstance.get('/dashboard/stats');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, here's what's happening today.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift border-primary/20 bg-gradient-to-br from-primary/5 to-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-primary">Total Revenue</CardTitle>
            <div className="rounded-lg p-2 bg-primary/10 text-primary border border-primary/20">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">{stats.totalRevenue}</div>
            <div className="flex items-center mt-2 space-x-2">
              <Badge variant="success" className="px-1.5 py-0 text-[10px]">
                +20.1% <ArrowUpRight className="ml-0.5 h-3 w-3" />
              </Badge>
              <span className="text-[11px] text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="hover-lift border-info-500/20 bg-gradient-to-br from-info-500/5 to-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-info-600 dark:text-info-400">Active Users</CardTitle>
            <div className="rounded-lg p-2 bg-info-500/10 text-info-600 dark:text-info-400 border border-info-500/20">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">+{stats.activeUsers}</div>
            <div className="flex items-center mt-2 space-x-2">
              <Badge variant="success" className="px-1.5 py-0 text-[10px]">
                +180.1% <ArrowUpRight className="ml-0.5 h-3 w-3" />
              </Badge>
              <span className="text-[11px] text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="hover-lift border-success-500/20 bg-gradient-to-br from-success-500/5 to-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-success-600 dark:text-success-400">New Subscriptions</CardTitle>
            <div className="rounded-lg p-2 bg-success-500/10 text-success-600 dark:text-success-400 border border-success-500/20">
              <UserPlus className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">+{stats.newSubscriptions}</div>
            <div className="flex items-center mt-2 space-x-2">
              <Badge variant="success" className="px-1.5 py-0 text-[10px]">
                +19% <ArrowUpRight className="ml-0.5 h-3 w-3" />
              </Badge>
              <span className="text-[11px] text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="hover-lift border-danger-500/20 bg-gradient-to-br from-danger-500/5 to-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-danger-600 dark:text-danger-400">Churn Rate</CardTitle>
            <div className="rounded-lg p-2 bg-danger-500/10 text-danger-600 dark:text-danger-400 border border-danger-500/20">
              <TrendingDown className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">{stats.churnRate}</div>
            <div className="flex items-center mt-2 space-x-2">
              <Badge variant="destructive" className="px-1.5 py-0 text-[10px]">
                -4.1% <ArrowDownRight className="ml-0.5 h-3 w-3" />
              </Badge>
              <span className="text-[11px] text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary-500)" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="var(--color-primary-500)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-success-500)" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="var(--color-success-500)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis
                    dataKey="name"
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      borderColor: 'var(--color-border)',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)',
                      fontSize: '12px',
                      color: 'var(--color-foreground)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-primary-500)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="var(--color-success-500)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 border-border">
          <CardHeader>
            <CardTitle className="text-foreground">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary-500)" />
                      <stop offset="100%" stopColor="var(--color-secondary-500)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis
                    dataKey="name"
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'var(--color-muted)', opacity: 0.4 }}
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      borderColor: 'var(--color-border)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: 'var(--color-foreground)'
                    }}
                  />
                  <Bar dataKey="users" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
