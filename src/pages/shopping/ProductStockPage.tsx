import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ArrowUpDown,
  Package,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Edit2,
  Eye,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { cn } from '@/src/lib/utils';

// --- Types & Mock Data ---
interface ProductStock {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
}

const MOCK_STOCK: ProductStock[] = [
  {
    id: 'prod_1',
    name: 'Aashirvaad Whole Wheat Atta',
    category: 'Groceries',
    quantity: 12,
    unit: '5kg',
    status: 'Low Stock',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'prod_2',
    name: 'Amul Taaza Toned Milk',
    category: 'Dairy',
    quantity: 0,
    unit: '1L',
    status: 'Out of Stock',
    lastUpdated: '1 day ago'
  },
  {
    id: 'prod_3',
    name: 'Tata Salt',
    category: 'Groceries',
    quantity: 45,
    unit: '1kg',
    status: 'In Stock',
    lastUpdated: '3 days ago'
  },
  {
    id: 'prod_4',
    name: 'Maggi 2-Minute Noodles',
    category: 'Snacks',
    quantity: 15,
    unit: '70g',
    status: 'Low Stock',
    lastUpdated: '5 hours ago'
  },
  {
    id: 'prod_5',
    name: 'Surf Excel Easy Wash',
    category: 'Household',
    quantity: 28,
    unit: '1.5kg',
    status: 'In Stock',
    lastUpdated: 'Today'
  }
];

export default function ProductStockPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Inline editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [stockData, setStockData] = useState<ProductStock[]>(MOCK_STOCK);

  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredStock = stockData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category.toLowerCase() === categoryFilter.toLowerCase();
    
    let matchesStatus = true;
    if (statusFilter === 'in_stock') matchesStatus = item.status === 'In Stock';
    if (statusFilter === 'low_stock') matchesStatus = item.status === 'Low Stock';
    if (statusFilter === 'out_of_stock') matchesStatus = item.status === 'Out of Stock';
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleEditClick = (item: ProductStock) => {
    setEditingId(item.id);
    setEditValue(item.quantity);
  };

  const handleSaveEdit = (id: string) => {
    setStockData(prev => prev.map(item => {
      if (item.id === id) {
        let newStatus: ProductStock['status'] = 'In Stock';
        if (editValue === 0) newStatus = 'Out of Stock';
        else if (editValue < 20) newStatus = 'Low Stock'; // arbitrary threshold for demo
        
        return {
          ...item,
          quantity: editValue,
          status: newStatus,
          lastUpdated: 'Just now'
        };
      }
      return item;
    }));
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Product Stock</h1>
          <Badge variant="secondary" className="text-sm px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border-transparent">
            {stockData.length} Items
          </Badge>
        </div>
      </div>

      {/* Top Bar: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            className="pl-10 bg-muted/50 border-transparent focus:bg-background transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[140px]">
            <select
              className="w-full h-10 pl-3 pr-8 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="groceries">Groceries</option>
              <option value="dairy">Dairy</option>
              <option value="snacks">Snacks</option>
              <option value="household">Household</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              <ArrowUpDown className="h-3 w-3" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[140px]">
            <select
              className="w-full h-10 pl-3 pr-8 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              <ArrowUpDown className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-4">Product</div>
          <div className="col-span-2">Stock</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-2">Last Updated</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="divide-y divide-border/50">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center h-[72px]">
                <div className="col-span-4 flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-md shrink-0" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-5 w-16 rounded-md" />
                </div>
                <div className="col-span-3">
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="col-span-1 flex justify-end gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredStock.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No products found</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              We couldn't find any products matching your current filters. Try adjusting them.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setStatusFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          /* Data Rows */
          <div className="flex flex-col">
            <AnimatePresence>
              {filteredStock.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={cn(
                    "grid grid-cols-12 gap-4 p-4 items-center h-[72px] transition-colors group",
                    "even:bg-muted/20 odd:bg-transparent hover:bg-muted/40"
                  )}
                >
                  {/* Product Info */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center shrink-0 border border-border">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col items-start gap-1 truncate">
                      <span className="font-semibold text-sm text-foreground truncate">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.category}</span>
                    </div>
                  </div>

                  {/* Stock (Inline Edit) */}
                  <div className="col-span-2 flex items-center">
                    {editingId === item.id ? (
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number" 
                          className="w-20 h-8 text-sm px-2" 
                          value={editValue}
                          onChange={(e) => setEditValue(parseInt(e.target.value) || 0)}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(item.id);
                            if (e.key === 'Escape') handleCancelEdit();
                          }}
                        />
                        <span className="text-xs text-muted-foreground">{item.unit}</span>
                        <div className="flex flex-col gap-0.5 ml-1">
                          <button onClick={() => handleSaveEdit(item.id)} className="text-success-600 hover:text-success-700 bg-success-50 rounded p-0.5">
                            <Check className="h-3 w-3" />
                          </button>
                          <button onClick={handleCancelEdit} className="text-danger-600 hover:text-danger-700 bg-danger-50 rounded p-0.5">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className={cn(
                          "font-bold text-base",
                          item.status === 'Out of Stock' ? "text-danger-600 dark:text-danger-400" :
                          item.status === 'Low Stock' ? "text-warning-600 dark:text-warning-400" :
                          "text-foreground"
                        )}>
                          {item.quantity}
                        </span>
                        <span className="text-xs text-muted-foreground">{item.unit}</span>
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="col-span-3 flex items-center">
                    <Badge 
                      variant={
                        item.status === 'In Stock' ? 'success' : 
                        item.status === 'Out of Stock' ? 'destructive' : 'warning'
                      }
                      className="px-2.5 py-0.5 h-6 text-[10px] uppercase tracking-wider flex items-center gap-1"
                    >
                      {item.status === 'In Stock' && <CheckCircle2 className="h-3 w-3" />}
                      {item.status === 'Out of Stock' && <XCircle className="h-3 w-3" />}
                      {item.status === 'Low Stock' && <AlertTriangle className="h-3 w-3" />}
                      {item.status}
                    </Badge>
                  </div>

                  {/* Last Updated */}
                  <div className="col-span-2 flex items-center">
                    <span className="text-xs text-muted-foreground">{item.lastUpdated}</span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {editingId !== item.id && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-primary" 
                        title="Update Stock"
                        onClick={() => handleEditClick(item)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="View Product">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
