import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  AlertTriangle, 
  XCircle, 
  IndianRupee, 
  Plus, 
  RefreshCw, 
  ShoppingCart, 
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { cn } from '@/src/lib/utils';

const MOCK_LOW_STOCK = [
  { id: '1', name: 'Aashirvaad Whole Wheat Atta 5kg', currentStock: 12, threshold: 20, status: 'low' },
  { id: '2', name: 'Amul Taaza Toned Milk 1L', currentStock: 0, threshold: 50, status: 'out' },
  { id: '3', name: 'Tata Salt 1kg', currentStock: 8, threshold: 30, status: 'low' },
  { id: '4', name: 'Maggi 2-Minute Noodles 70g', currentStock: 15, threshold: 40, status: 'low' },
  { id: '5', name: 'Fortune Sunlite Refined Oil 1L', currentStock: 0, threshold: 20, status: 'out' },
];

const MOCK_ACTIVITY = [
  { id: '1', action: 'Stock Updated', item: 'Aashirvaad Whole Wheat Atta 5kg', time: '10 mins ago', type: 'update' },
  { id: '2', action: 'New Product Added', item: 'Britannia Good Day Cashew 600g', time: '2 hours ago', type: 'add' },
  { id: '3', action: 'Procurement Created', item: 'PO-2026-04-01 for Dairy Products', time: '5 hours ago', type: 'procurement' },
  { id: '4', action: 'Stock Updated', item: 'Surf Excel Easy Wash 1.5kg', time: '1 day ago', type: 'update' },
  { id: '5', action: 'Out of Stock Alert', item: 'Amul Taaza Toned Milk 1L', time: '1 day ago', type: 'alert' },
];

export default function InventoryDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Inventory</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your society shopping stock and procurements.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="shadow-sm bg-background">
            <RefreshCw className="mr-2 h-4 w-4" /> Update Stock
          </Button>
          <Button variant="outline" className="shadow-sm bg-background">
            <ShoppingCart className="mr-2 h-4 w-4" /> Create Procurement
          </Button>
          <Button className="shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Total Products</span>
            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Package className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            {isLoading ? <Skeleton className="h-8 w-20" /> : <span className="text-3xl font-bold text-foreground">1,248</span>}
          </div>
          <div className="mt-1 flex items-center text-xs text-success-600">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            <span>+12 this week</span>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-card p-6 rounded-xl border border-warning-200 dark:border-warning-500/30 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-warning-50/50 dark:bg-warning-500/5 pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <span className="text-sm font-medium text-warning-700 dark:text-warning-400">Low Stock Items</span>
            <div className="h-8 w-8 rounded-full bg-warning-100 text-warning-600 dark:bg-warning-500/20 dark:text-warning-400 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 relative z-10">
            {isLoading ? <Skeleton className="h-8 w-20" /> : <span className="text-3xl font-bold text-warning-700 dark:text-warning-400">42</span>}
          </div>
          <div className="mt-1 flex items-center text-xs text-warning-600 dark:text-warning-500 relative z-10">
            <span>Requires attention</span>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-card p-6 rounded-xl border border-danger-200 dark:border-danger-500/30 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-danger-50/50 dark:bg-danger-500/5 pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <span className="text-sm font-medium text-danger-700 dark:text-danger-400">Out of Stock</span>
            <div className="h-8 w-8 rounded-full bg-danger-100 text-danger-600 dark:bg-danger-500/20 dark:text-danger-400 flex items-center justify-center">
              <XCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 relative z-10">
            {isLoading ? <Skeleton className="h-8 w-20" /> : <span className="text-3xl font-bold text-danger-700 dark:text-danger-400">15</span>}
          </div>
          <div className="mt-1 flex items-center text-xs text-danger-600 dark:text-danger-500 relative z-10">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            <span>+3 since yesterday</span>
          </div>
        </div>

        {/* Total Inventory Value */}
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Total Inventory Value</span>
            <div className="h-8 w-8 rounded-full bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400 flex items-center justify-center">
              <IndianRupee className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            {isLoading ? <Skeleton className="h-8 w-32" /> : <span className="text-3xl font-bold text-foreground">₹2.4L</span>}
          </div>
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <span>Across all categories</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Low Stock Alerts */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-border flex items-center justify-between bg-muted/10">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning-500" />
              <h2 className="text-lg font-semibold text-foreground">Low Stock Alerts</h2>
            </div>
            <Button variant="ghost" size="sm" className="text-primary h-8">View All</Button>
          </div>
          
          <div className="flex-1 overflow-auto">
            {isLoading ? (
              <div className="divide-y divide-border/50">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-md" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-20 rounded-md" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                <AnimatePresence>
                  {MOCK_LOW_STOCK.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center shrink-0 border border-border">
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm text-foreground">{item.name}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">Stock: <strong className={cn(item.status === 'out' ? 'text-danger-500' : 'text-warning-500')}>{item.currentStock}</strong> / {item.threshold}</span>
                            <Badge variant={item.status === 'out' ? 'destructive' : 'warning'} className="text-[9px] px-1.5 py-0 h-4 uppercase tracking-wider">
                              {item.status === 'out' ? 'Out of Stock' : 'Low Stock'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="shrink-0">
                        Restock
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-border flex items-center justify-between bg-muted/10">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            </div>
          </div>
          
          <div className="p-5 flex-1 overflow-auto">
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                <AnimatePresence>
                  {MOCK_ACTIVITY.map((activity, index) => {
                    let Icon = Activity;
                    let iconColor = "text-muted-foreground";
                    let bgColor = "bg-muted";
                    
                    if (activity.type === 'add') {
                      Icon = Plus;
                      iconColor = "text-success-600 dark:text-success-400";
                      bgColor = "bg-success-50 dark:bg-success-500/10 border-success-200 dark:border-success-500/20";
                    } else if (activity.type === 'update') {
                      Icon = RefreshCw;
                      iconColor = "text-info-600 dark:text-info-400";
                      bgColor = "bg-info-50 dark:bg-info-500/10 border-info-200 dark:border-info-500/20";
                    } else if (activity.type === 'procurement') {
                      Icon = ShoppingCart;
                      iconColor = "text-primary-600 dark:text-primary-400";
                      bgColor = "bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/20";
                    } else if (activity.type === 'alert') {
                      Icon = AlertTriangle;
                      iconColor = "text-danger-600 dark:text-danger-400";
                      bgColor = "bg-danger-50 dark:bg-danger-500/10 border-danger-200 dark:border-danger-500/20";
                    }

                    return (
                      <motion.div 
                        key={activity.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex items-start gap-3"
                      >
                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center shrink-0 border z-10", bgColor)}>
                          <Icon className={cn("h-3.5 w-3.5", iconColor)} />
                        </div>
                        <div className="flex flex-col pt-1">
                          <span className="text-sm font-medium text-foreground">{activity.action}</span>
                          <span className="text-xs text-muted-foreground mt-0.5">{activity.item}</span>
                          <span className="text-[10px] text-muted-foreground/70 mt-1">{activity.time}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
