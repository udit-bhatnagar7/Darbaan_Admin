import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  ArrowUpDown,
  ShoppingCart,
  Truck,
  IndianRupee,
  Calendar,
  CheckCircle2,
  Clock,
  Package,
  Eye,
  Edit,
  Trash2,
  FileText
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { SlideOver } from '@/src/components/ui/SlideOver';
import { cn } from '@/src/lib/utils';

// --- Types & Mock Data ---
interface Procurement {
  id: string;
  poNumber: string;
  product: string;
  supplier: string;
  quantity: number;
  unit: string;
  cost: number;
  date: string;
  status: 'Ordered' | 'Received' | 'Pending';
}

const MOCK_PROCUREMENTS: Procurement[] = [
  {
    id: 'po_1',
    poNumber: 'PO-2026-001',
    product: 'Aashirvaad Whole Wheat Atta',
    supplier: 'ITC Wholesale Distributors',
    quantity: 50,
    unit: '5kg',
    cost: 18500,
    date: '02 Apr 2026',
    status: 'Pending'
  },
  {
    id: 'po_2',
    poNumber: 'PO-2026-002',
    product: 'Amul Taaza Toned Milk',
    supplier: 'Gujarat Co-operative Milk',
    quantity: 100,
    unit: '1L',
    cost: 6200,
    date: '01 Apr 2026',
    status: 'Ordered'
  },
  {
    id: 'po_3',
    poNumber: 'PO-2026-003',
    product: 'Tata Salt',
    supplier: 'Tata Consumer Products',
    quantity: 200,
    unit: '1kg',
    cost: 4000,
    date: '28 Mar 2026',
    status: 'Received'
  },
  {
    id: 'po_4',
    poNumber: 'PO-2026-004',
    product: 'Fortune Sunlite Refined Oil',
    supplier: 'Adani Wilmar Ltd.',
    quantity: 40,
    unit: '1L',
    cost: 5600,
    date: '02 Apr 2026',
    status: 'Pending'
  },
  {
    id: 'po_5',
    poNumber: 'PO-2026-005',
    product: 'Maggi 2-Minute Noodles',
    supplier: 'Nestle India',
    quantity: 150,
    unit: '70g',
    cost: 1800,
    date: '25 Mar 2026',
    status: 'Received'
  }
];

export default function ProcurementPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredProcurements = MOCK_PROCUREMENTS.filter(item => {
    const matchesSearch = item.product.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.poNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Received': return 'success';
      case 'Ordered': return 'info';
      case 'Pending': return 'warning';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Received': return <CheckCircle2 className="h-3 w-3 mr-1" />;
      case 'Ordered': return <Truck className="h-3 w-3 mr-1" />;
      case 'Pending': return <Clock className="h-3 w-3 mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Procurement</h1>
          <Badge variant="secondary" className="text-sm px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border-transparent">
            {MOCK_PROCUREMENTS.length} Orders
          </Badge>
        </div>
        <Button className="w-full sm:w-auto shadow-sm" onClick={() => setIsAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create PO
        </Button>
      </div>

      {/* Top Bar: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by product, supplier, or PO number..." 
            className="pl-10 bg-muted/50 border-transparent focus:bg-background transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[160px]">
            <select
              className="w-full h-10 pl-3 pr-8 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="ordered">Ordered</option>
              <option value="received">Received</option>
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
          <div className="col-span-3">Product</div>
          <div className="col-span-3">Supplier</div>
          <div className="col-span-2">Qty & Cost</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="divide-y divide-border/50">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center h-[76px]">
                <div className="col-span-3 flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-md shrink-0" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <div className="col-span-1 flex justify-center">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="col-span-1 flex justify-end gap-1">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProcurements.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No purchase orders found</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              {searchQuery || statusFilter !== 'all'
                ? "We couldn't find any orders matching your current filters. Try adjusting them."
                : "Get started by creating your first purchase order."}
            </p>
            {(searchQuery || statusFilter !== 'all') ? (
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}>
                Clear Filters
              </Button>
            ) : (
              <Button onClick={() => setIsAddOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create PO
              </Button>
            )}
          </div>
        ) : (
          /* Data Rows */
          <div className="flex flex-col">
            <AnimatePresence>
              {filteredProcurements.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={cn(
                    "grid grid-cols-12 gap-4 p-4 items-center h-[76px] transition-colors group relative",
                    item.status === 'Pending' ? "bg-warning-50/30 dark:bg-warning-500/5 hover:bg-warning-50/50 dark:hover:bg-warning-500/10" : "even:bg-muted/20 odd:bg-transparent hover:bg-muted/40"
                  )}
                >
                  {/* Highlight pending orders with a left border */}
                  {item.status === 'Pending' && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-warning-500 rounded-r" />
                  )}

                  {/* Product Info */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-md flex items-center justify-center shrink-0 border",
                      item.status === 'Pending' ? "bg-warning-100 border-warning-200 text-warning-600 dark:bg-warning-500/20 dark:border-warning-500/30 dark:text-warning-400" : "bg-muted border-border text-muted-foreground"
                    )}>
                      <Package className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col items-start gap-1 truncate">
                      <span className="font-semibold text-sm text-foreground truncate">{item.product}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{item.poNumber}</span>
                    </div>
                  </div>

                  {/* Supplier */}
                  <div className="col-span-3 flex items-center gap-2 truncate">
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Truck className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-medium text-foreground truncate">{item.supplier}</span>
                  </div>

                  {/* Quantity & Cost */}
                  <div className="col-span-2 flex flex-col items-start gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-foreground">{item.quantity}</span>
                      <span className="text-xs text-muted-foreground">{item.unit}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <IndianRupee className="h-3 w-3 mr-0.5" />
                      {item.cost.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="col-span-2 flex flex-col items-start gap-1">
                    <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> {item.date}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-1 flex justify-center">
                    <Badge 
                      variant={getStatusColor(item.status) as any}
                      className="px-2.5 py-0.5 h-6 text-[10px] uppercase tracking-wider flex items-center"
                    >
                      {getStatusIcon(item.status)}
                      {item.status}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="View PO">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Edit">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-danger-500" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Add Procurement SlideOver */}
      <SlideOver
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Create Purchase Order"
        description="Record a new procurement or restock request."
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddOpen(false)}>Create PO</Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground border-b border-border pb-2">Order Details</h3>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Product</label>
              <div className="relative">
                <select className="w-full h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                  <option value="">Select a product...</option>
                  <option value="1">Aashirvaad Whole Wheat Atta</option>
                  <option value="2">Amul Taaza Toned Milk</option>
                  <option value="3">Tata Salt</option>
                  <option value="4">Fortune Sunlite Refined Oil</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Supplier</label>
              <Input placeholder="e.g. ITC Wholesale Distributors" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground border-b border-border pb-2">Quantity & Cost</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Quantity</label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Unit</label>
                <Input placeholder="e.g. pcs, kg, L" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Total Cost (₹)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input type="number" placeholder="0.00" className="pl-9" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground border-b border-border pb-2">Tracking</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Expected Date</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Initial Status</label>
                <div className="relative">
                  <select className="w-full h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                    <option value="pending">Pending</option>
                    <option value="ordered">Ordered</option>
                    <option value="received">Received</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SlideOver>
    </div>
  );
}
