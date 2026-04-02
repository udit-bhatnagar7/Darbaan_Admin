import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Building2, 
  MapPin, 
  Users, 
  AlertCircle, 
  Eye, 
  Edit, 
  Plus,
  ArrowUpDown,
  MoreHorizontal,
  IndianRupee,
  Activity
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { cn } from '@/src/lib/utils';

// --- Types & Mock Data ---
interface Society {
  id: string;
  name: string;
  city: string;
  totalFlats: number;
  occupiedFlats: number;
  pendingDues: number;
  monthlyCollection: number;
  complaints: { open: number; closed: number };
  visitorsToday: number;
  staffCount: number;
  status: 'active' | 'trial' | 'expired';
}

const MOCK_SOCIETIES: Society[] = [
  {
    id: 'soc_1',
    name: 'Darbaan Heights',
    city: 'Mumbai',
    totalFlats: 150,
    occupiedFlats: 142,
    pendingDues: 12500,
    monthlyCollection: 450000,
    complaints: { open: 2, closed: 45 },
    visitorsToday: 124,
    staffCount: 18,
    status: 'active'
  },
  {
    id: 'soc_2',
    name: 'Sunshine Apartments',
    city: 'Pune',
    totalFlats: 80,
    occupiedFlats: 45,
    pendingDues: 85000, // High dues
    monthlyCollection: 120000,
    complaints: { open: 12, closed: 10 },
    visitorsToday: 45,
    staffCount: 8,
    status: 'trial'
  },
  {
    id: 'soc_3',
    name: 'Green Valley Complex',
    city: 'Bangalore',
    totalFlats: 300,
    occupiedFlats: 290,
    pendingDues: 5000,
    monthlyCollection: 950000,
    complaints: { open: 0, closed: 120 },
    visitorsToday: 312,
    staffCount: 45,
    status: 'active'
  },
  {
    id: 'soc_4',
    name: 'Royal Palms',
    city: 'Delhi',
    totalFlats: 120,
    occupiedFlats: 110,
    pendingDues: 120000, // Very high dues
    monthlyCollection: 250000,
    complaints: { open: 8, closed: 34 },
    visitorsToday: 89,
    staffCount: 12,
    status: 'expired'
  },
  {
    id: 'soc_5',
    name: 'Lakeview Residency',
    city: 'Mumbai',
    totalFlats: 200,
    occupiedFlats: 185,
    pendingDues: 35000,
    monthlyCollection: 600000,
    complaints: { open: 4, closed: 88 },
    visitorsToday: 156,
    staffCount: 24,
    status: 'active'
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function SocietyPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and Sort Logic
  const filteredSocieties = MOCK_SOCIETIES.filter(soc => {
    const matchesSearch = soc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          soc.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || soc.status === statusFilter;
    const matchesCity = cityFilter === 'all' || soc.city.toLowerCase() === cityFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesCity;
  }).sort((a, b) => {
    if (sortBy === 'dues') return b.pendingDues - a.pendingDues;
    if (sortBy === 'activity') return (b.complaints.open + b.visitorsToday) - (a.complaints.open + a.visitorsToday);
    return a.name.localeCompare(b.name);
  });

  // Extract unique cities for filter
  const uniqueCities = Array.from(new Set(MOCK_SOCIETIES.map(s => s.city)));

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Societies</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all registered societies across regions.</p>
        </div>
        <Button onClick={() => navigate('/registration')} className="w-full sm:w-auto shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Add Society
        </Button>
      </div>

      {/* Top Bar: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by society name or city..." 
            className="pl-10 bg-muted/50 border-transparent focus:bg-background transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[120px]">
            <select
              className="w-full h-10 pl-3 pr-8 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="expired">Expired</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              <ArrowUpDown className="h-3 w-3" />
            </div>
          </div>

          {/* City Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[120px]">
            <select
              className="w-full h-10 pl-3 pr-8 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              <option value="all">All Cities</option>
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              <MapPin className="h-3 w-3" />
            </div>
          </div>

          {/* Sort */}
          <div className="relative flex-1 sm:flex-none min-w-[140px]">
            <select
              className="w-full h-10 pl-3 pr-8 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="dues">Sort by High Dues</option>
              <option value="activity">Sort by Activity</option>
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
          <div className="col-span-3">Society</div>
          <div className="col-span-2">Units</div>
          <div className="col-span-2">Finance</div>
          <div className="col-span-2">Activity</div>
          <div className="col-span-1 text-center">Staff</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="divide-y divide-border/50">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center h-[76px]">
                <div className="col-span-3 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="col-span-2 flex gap-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="col-span-1 flex justify-center">
                  <Skeleton className="h-4 w-8" />
                </div>
                <div className="col-span-1 flex justify-center">
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="col-span-1 flex justify-end gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredSocieties.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No societies found</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              {searchQuery || statusFilter !== 'all' || cityFilter !== 'all' 
                ? "We couldn't find any societies matching your current filters. Try adjusting them."
                : "Get started by adding your first society to the platform."}
            </p>
            {(searchQuery || statusFilter !== 'all' || cityFilter !== 'all') ? (
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setCityFilter('all');
              }}>
                Clear Filters
              </Button>
            ) : (
              <Button onClick={() => navigate('/registration')}>
                <Plus className="mr-2 h-4 w-4" /> Add Society
              </Button>
            )}
          </div>
        ) : (
          /* Data Rows */
          <div className="flex flex-col">
            <AnimatePresence>
              {filteredSocieties.map((society, index) => (
                <motion.div
                  key={society.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={cn(
                    "grid grid-cols-12 gap-4 p-4 items-center h-[76px] transition-colors group",
                    "even:bg-muted/20 odd:bg-transparent hover:bg-muted/40"
                  )}
                >
                  {/* Society Info */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="font-semibold text-sm text-foreground truncate">{society.name}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" /> {society.city}
                      </span>
                    </div>
                  </div>

                  {/* Units */}
                  <div className="col-span-2 flex flex-col">
                    <span className="text-sm font-medium text-foreground">{society.totalFlats} Flats</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{society.occupiedFlats} Occupied</span>
                  </div>

                  {/* Finance */}
                  <div className="col-span-2 flex flex-col">
                    <span className={cn(
                      "text-sm font-bold flex items-center gap-1",
                      society.pendingDues > 50000 ? "text-danger-600 dark:text-danger-400" : "text-foreground"
                    )}>
                      {society.pendingDues > 50000 && <AlertCircle className="h-3 w-3" />}
                      {formatCurrency(society.pendingDues)}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                      Col: {formatCurrency(society.monthlyCollection)}
                    </span>
                  </div>

                  {/* Activity */}
                  <div className="col-span-2 flex flex-wrap gap-2 items-center">
                    <Badge 
                      variant={society.complaints.open > 5 ? 'destructive' : society.complaints.open > 0 ? 'warning' : 'success'} 
                      className="px-2 py-0.5 h-6 text-[10px] flex items-center gap-1"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {society.complaints.open} Open
                    </Badge>
                    <Badge variant="info" className="px-2 py-0.5 h-6 text-[10px] flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {society.visitorsToday} Vis.
                    </Badge>
                  </div>

                  {/* Staff */}
                  <div className="col-span-1 flex justify-center">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md border border-border">
                      <Users className="h-3.5 w-3.5" />
                      {society.staffCount}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-1 flex justify-center">
                    <Badge 
                      variant={society.status === 'active' ? 'success' : society.status === 'trial' ? 'warning' : 'destructive'}
                      className="uppercase text-[10px] tracking-wider"
                    >
                      {society.status}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Edit className="h-4 w-4" />
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
