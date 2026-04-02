import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  ArrowUpDown,
  Phone,
  Star,
  Briefcase,
  Eye,
  Edit,
  Trash2,
  Truck,
  AlertCircle,
  CheckCircle2,
  Clock,
  Wrench,
  Zap,
  Droplet,
  Hammer
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { SlideOver } from '@/src/components/ui/SlideOver';
import { cn } from '@/src/lib/utils';

// --- Types & Mock Data ---
interface Vendor {
  id: string;
  name: string;
  initials: string;
  category: 'Plumber' | 'Electrician' | 'Carpenter' | 'Pest Control' | 'Cleaning';
  phone: string;
  rating: number;
  jobsCompleted: number;
  lastJobDate: string;
  recentWork: string;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
}

const MOCK_VENDORS: Vendor[] = [
  {
    id: 'vnd_1',
    name: 'Rajesh Plumbing Works',
    initials: 'RP',
    category: 'Plumber',
    phone: '+91 98765 43210',
    rating: 4.8,
    jobsCompleted: 142,
    lastJobDate: '2 days ago',
    recentWork: 'Pipe Leakage Fix',
    paymentStatus: 'Paid'
  },
  {
    id: 'vnd_2',
    name: 'ElectroSafe Solutions',
    initials: 'ES',
    category: 'Electrician',
    phone: '+91 99887 76655',
    rating: 3.2,
    jobsCompleted: 18,
    lastJobDate: '1 week ago',
    recentWork: 'Main Panel Wiring',
    paymentStatus: 'Overdue'
  },
  {
    id: 'vnd_3',
    name: 'Woodcraft Masters',
    initials: 'WM',
    category: 'Carpenter',
    phone: '+91 91234 56789',
    rating: 4.5,
    jobsCompleted: 85,
    lastJobDate: '3 days ago',
    recentWork: 'Door Hinge Repair',
    paymentStatus: 'Pending'
  },
  {
    id: 'vnd_4',
    name: 'Terminator Pest Control',
    initials: 'TP',
    category: 'Pest Control',
    phone: '+91 98765 12345',
    rating: 4.9,
    jobsCompleted: 320,
    lastJobDate: 'Today',
    recentWork: 'Termite Treatment',
    paymentStatus: 'Paid'
  },
  {
    id: 'vnd_5',
    name: 'Sparkle Cleaners',
    initials: 'SC',
    category: 'Cleaning',
    phone: '+91 99988 77766',
    rating: 3.8,
    jobsCompleted: 45,
    lastJobDate: '5 days ago',
    recentWork: 'Deep Cleaning A-101',
    paymentStatus: 'Pending'
  }
];

export default function VendorsPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);

  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredVendors = MOCK_VENDORS.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          vendor.phone.includes(searchQuery);
    const matchesCategory = categoryFilter === 'all' || vendor.category.toLowerCase() === categoryFilter.toLowerCase();
    
    let matchesRating = true;
    if (ratingFilter === 'high') matchesRating = vendor.rating >= 4.0;
    if (ratingFilter === 'low') matchesRating = vendor.rating < 4.0;

    const matchesPayment = paymentFilter === 'all' || vendor.paymentStatus.toLowerCase() === paymentFilter.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesRating && matchesPayment;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Plumber': return <Droplet className="h-3.5 w-3.5" />;
      case 'Electrician': return <Zap className="h-3.5 w-3.5" />;
      case 'Carpenter': return <Hammer className="h-3.5 w-3.5" />;
      case 'Pest Control': return <AlertCircle className="h-3.5 w-3.5" />;
      default: return <Wrench className="h-3.5 w-3.5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Plumber': return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
      case 'Electrician': return 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
      case 'Carpenter': return 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20';
      case 'Pest Control': return 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Vendors</h1>
          <Badge variant="secondary" className="text-sm px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border-transparent">
            {MOCK_VENDORS.length} Total
          </Badge>
        </div>
        <Button className="w-full sm:w-auto shadow-sm" onClick={() => setIsAddVendorOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Vendor
        </Button>
      </div>

      {/* Top Bar: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by vendor name or phone..." 
            className="pl-10 bg-muted/50 border-transparent focus:bg-background transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[130px]">
            <select
              className="w-full h-10 pl-3 pr-8 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="plumber">Plumber</option>
              <option value="electrician">Electrician</option>
              <option value="carpenter">Carpenter</option>
              <option value="pest control">Pest Control</option>
              <option value="cleaning">Cleaning</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              <ArrowUpDown className="h-3 w-3" />
            </div>
          </div>

          {/* Rating Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[120px]">
            <select
              className="w-full h-10 pl-3 pr-8 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="high">High (4.0+)</option>
              <option value="low">Low (&lt;4.0)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              <Star className="h-3 w-3" />
            </div>
          </div>

          {/* Payment Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[130px]">
            <select
              className="w-full h-10 pl-3 pr-8 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
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
          <div className="col-span-3">Vendor</div>
          <div className="col-span-2">Contact</div>
          <div className="col-span-2">Performance</div>
          <div className="col-span-2">Activity</div>
          <div className="col-span-2">Payments</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="divide-y divide-border/50">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center h-[76px]">
                <div className="col-span-3 flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32 rounded-md" />
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="col-span-1 flex justify-end gap-1">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredVendors.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Truck className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No vendors added yet</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              {searchQuery || categoryFilter !== 'all' || ratingFilter !== 'all' || paymentFilter !== 'all'
                ? "We couldn't find any vendors matching your current filters. Try adjusting them."
                : "Get started by adding your first vendor to the platform."}
            </p>
            {(searchQuery || categoryFilter !== 'all' || ratingFilter !== 'all' || paymentFilter !== 'all') ? (
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setRatingFilter('all');
                setPaymentFilter('all');
              }}>
                Clear Filters
              </Button>
            ) : (
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Vendor
              </Button>
            )}
          </div>
        ) : (
          /* Data Rows */
          <div className="flex flex-col">
            <AnimatePresence>
              {filteredVendors.map((vendor, index) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={cn(
                    "grid grid-cols-12 gap-4 p-4 items-center h-[76px] transition-colors group",
                    "even:bg-muted/20 odd:bg-transparent hover:bg-muted/40"
                  )}
                >
                  {/* Vendor Info */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20 font-semibold text-sm">
                      {vendor.initials}
                    </div>
                    <div className="flex flex-col items-start gap-1 truncate">
                      <span className="font-semibold text-sm text-foreground truncate">{vendor.name}</span>
                      <div className={cn(
                        "flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-medium uppercase tracking-wider",
                        getCategoryColor(vendor.category)
                      )}>
                        {getCategoryIcon(vendor.category)}
                        {vendor.category}
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="col-span-2 flex items-center gap-2">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="h-8 w-8 rounded-full shrink-0 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      title={`Call ${vendor.name}`}
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </Button>
                    <span className="text-sm font-medium text-foreground truncate">{vendor.phone}</span>
                  </div>

                  {/* Performance */}
                  <div className="col-span-2 flex flex-col items-start gap-0.5">
                    <div className="flex items-center gap-1">
                      <Star className={cn(
                        "h-3.5 w-3.5 fill-current", 
                        vendor.rating >= 4.0 ? "text-success-500" : "text-danger-500"
                      )} />
                      <span className={cn(
                        "font-bold text-sm", 
                        vendor.rating >= 4.0 ? "text-success-600 dark:text-success-400" : "text-danger-600 dark:text-danger-400"
                      )}>
                        {vendor.rating}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{vendor.jobsCompleted} jobs completed</span>
                  </div>

                  {/* Activity */}
                  <div className="col-span-2 flex flex-col items-start gap-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {vendor.lastJobDate}
                    </span>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 font-normal bg-muted/50 text-muted-foreground truncate max-w-full">
                      {vendor.recentWork}
                    </Badge>
                  </div>

                  {/* Payments */}
                  <div className="col-span-2 flex items-center">
                    <Badge 
                      variant={
                        vendor.paymentStatus === 'Paid' ? 'success' : 
                        vendor.paymentStatus === 'Overdue' ? 'destructive' : 'warning'
                      }
                      className="px-2.5 py-0.5 h-6 text-[10px] uppercase tracking-wider flex items-center gap-1"
                    >
                      {vendor.paymentStatus === 'Paid' && <CheckCircle2 className="h-3 w-3" />}
                      {vendor.paymentStatus === 'Overdue' && <AlertCircle className="h-3 w-3" />}
                      {vendor.paymentStatus === 'Pending' && <Clock className="h-3 w-3" />}
                      {vendor.paymentStatus}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Assign Job">
                      <Briefcase className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Edit Vendor">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-danger-500" title="Remove Vendor">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Add Vendor SlideOver */}
      <SlideOver
        isOpen={isAddVendorOpen}
        onClose={() => setIsAddVendorOpen(false)}
        title="Add New Vendor"
        description="Register a new vendor or service provider."
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddVendorOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddVendorOpen(false)}>Add Vendor</Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground border-b border-border pb-2">Business Information</h3>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Vendor/Company Name</label>
              <Input placeholder="e.g. QuickFix Plumbing" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Category</label>
              <div className="relative">
                <select className="w-full h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="hvac">HVAC</option>
                  <option value="pest_control">Pest Control</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground border-b border-border pb-2">Contact Details</h3>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Contact Person</label>
              <Input placeholder="e.g. John Smith" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Phone Number</label>
                <Input type="tel" placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Email Address</label>
                <Input type="email" placeholder="contact@vendor.com" />
              </div>
            </div>
          </div>
        </div>
      </SlideOver>
    </div>
  );
}
