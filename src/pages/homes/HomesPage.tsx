import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Home, 
  User, 
  Eye, 
  MessageSquare, 
  Edit, 
  Trash2, 
  Plus,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { SlideOver } from '@/src/components/ui/SlideOver';
import { cn } from '@/src/lib/utils';

// --- Types & Mock Data ---
interface Resident {
  id: string;
  name: string;
  initials: string;
  role: 'President' | 'Resident' | 'Secretary';
  userType: 'Owner' | 'Tenant';
  flatNumber: string;
  societyName: string;
  residentialStatus: 'Living' | 'Vacant';
  approvalStatus: 'Approved' | 'Pending' | 'Rejected';
  createdAt: string;
  lastActive: string;
}

const MOCK_RESIDENTS: Resident[] = [
  {
    id: 'res_1',
    name: 'Rahul Sharma',
    initials: 'RS',
    role: 'President',
    userType: 'Owner',
    flatNumber: 'A-101',
    societyName: 'Darbaan Heights',
    residentialStatus: 'Living',
    approvalStatus: 'Approved',
    createdAt: '12 Jan 2024',
    lastActive: '2 hours ago'
  },
  {
    id: 'res_2',
    name: 'Priya Patel',
    initials: 'PP',
    role: 'Resident',
    userType: 'Tenant',
    flatNumber: 'B-405',
    societyName: 'Darbaan Heights',
    residentialStatus: 'Living',
    approvalStatus: 'Approved',
    createdAt: '05 Mar 2024',
    lastActive: '1 day ago'
  },
  {
    id: 'res_3',
    name: 'Amit Kumar',
    initials: 'AK',
    role: 'Resident',
    userType: 'Owner',
    flatNumber: 'C-202',
    societyName: 'Sunshine Apartments',
    residentialStatus: 'Vacant',
    approvalStatus: 'Pending',
    createdAt: '28 Mar 2024',
    lastActive: 'Just now'
  },
  {
    id: 'res_4',
    name: 'Sneha Gupta',
    initials: 'SG',
    role: 'Secretary',
    userType: 'Owner',
    flatNumber: 'A-804',
    societyName: 'Darbaan Heights',
    residentialStatus: 'Living',
    approvalStatus: 'Approved',
    createdAt: '15 Nov 2023',
    lastActive: '5 mins ago'
  },
  {
    id: 'res_5',
    name: 'Vikram Singh',
    initials: 'VS',
    role: 'Resident',
    userType: 'Tenant',
    flatNumber: 'D-105',
    societyName: 'Green Valley Complex',
    residentialStatus: 'Living',
    approvalStatus: 'Rejected',
    createdAt: '01 Apr 2024',
    lastActive: '3 days ago'
  }
];

export default function HomesPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddResidentOpen, setIsAddResidentOpen] = useState(false);

  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredResidents = MOCK_RESIDENTS.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.flatNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || res.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesUserType = userTypeFilter === 'all' || res.userType.toLowerCase() === userTypeFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || res.approvalStatus.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesRole && matchesUserType && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Homes</h1>
          <Badge variant="secondary" className="text-sm px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border-transparent">
            {MOCK_RESIDENTS.length} Residents
          </Badge>
        </div>
        <Button className="w-full sm:w-auto shadow-sm" onClick={() => setIsAddResidentOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Resident
        </Button>
      </div>

      {/* Top Bar: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or flat number..." 
            className="pl-10 bg-muted/50 border-transparent focus:bg-background transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Role Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[120px]">
            <select
              className="w-full h-10 pl-3 pr-8 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="president">President</option>
              <option value="secretary">Secretary</option>
              <option value="resident">Resident</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              <ArrowUpDown className="h-3 w-3" />
            </div>
          </div>

          {/* User Type Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[120px]">
            <select
              className="w-full h-10 pl-3 pr-8 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              value={userTypeFilter}
              onChange={(e) => setUserTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="owner">Owner</option>
              <option value="tenant">Tenant</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              <ArrowUpDown className="h-3 w-3" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[120px]">
            <select
              className="w-full h-10 pl-3 pr-8 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
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
          <div className="col-span-4">User</div>
          <div className="col-span-3">Unit Info</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Activity</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="divide-y divide-border/50">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center h-[72px]">
                <div className="col-span-4 flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
                <div className="col-span-3 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="col-span-1 flex justify-end gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredResidents.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Home className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No residents found</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              {searchQuery || roleFilter !== 'all' || userTypeFilter !== 'all' || statusFilter !== 'all'
                ? "We couldn't find any residents matching your current filters. Try adjusting them."
                : "Get started by adding your first resident to the platform."}
            </p>
            {(searchQuery || roleFilter !== 'all' || userTypeFilter !== 'all' || statusFilter !== 'all') ? (
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setRoleFilter('all');
                setUserTypeFilter('all');
                setStatusFilter('all');
              }}>
                Clear Filters
              </Button>
            ) : (
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Resident
              </Button>
            )}
          </div>
        ) : (
          /* Data Rows */
          <div className="flex flex-col">
            <AnimatePresence>
              {filteredResidents.map((resident, index) => (
                <motion.div
                  key={resident.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={cn(
                    "grid grid-cols-12 gap-4 p-4 items-center h-[72px] transition-colors group",
                    "even:bg-muted/20 odd:bg-transparent hover:bg-muted/40"
                  )}
                >
                  {/* User Info */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20 font-semibold text-sm">
                      {resident.initials}
                    </div>
                    <div className="flex flex-col truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-foreground truncate">{resident.name}</span>
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 uppercase tracking-wider text-muted-foreground">
                          {resident.userType}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground mt-0.5">
                        {resident.role}
                      </span>
                    </div>
                  </div>

                  {/* Unit Info */}
                  <div className="col-span-3 flex flex-col">
                    <span className="text-sm font-bold text-foreground">{resident.flatNumber}</span>
                    <span className="text-xs text-muted-foreground mt-0.5 truncate pr-4">{resident.societyName}</span>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex flex-col items-start gap-1.5">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className={cn("h-1.5 w-1.5 rounded-full", resident.residentialStatus === 'Living' ? "bg-success-500" : "bg-muted-foreground")} />
                      {resident.residentialStatus}
                    </span>
                    <Badge 
                      variant={
                        resident.approvalStatus === 'Approved' ? 'success' : 
                        resident.approvalStatus === 'Pending' ? 'warning' : 'destructive'
                      }
                      className="px-2 py-0 h-5 text-[10px]"
                    >
                      {resident.approvalStatus === 'Approved' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                      {resident.approvalStatus === 'Pending' && <Clock className="mr-1 h-3 w-3" />}
                      {resident.approvalStatus === 'Rejected' && <XCircle className="mr-1 h-3 w-3" />}
                      {resident.approvalStatus}
                    </Badge>
                  </div>

                  {/* Activity */}
                  <div className="col-span-2 flex flex-col">
                    <span className="text-xs text-muted-foreground">Added: {resident.createdAt}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">Active: {resident.lastActive}</span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="View Profile">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Send Message">
                      <MessageSquare className="h-4 w-4" />
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

      {/* Add Resident SlideOver */}
      <SlideOver
        isOpen={isAddResidentOpen}
        onClose={() => setIsAddResidentOpen(false)}
        title="Add New Resident"
        description="Enter the resident and unit details below."
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddResidentOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddResidentOpen(false)}>Add Resident</Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground border-b border-border pb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">First Name</label>
                <Input placeholder="e.g. John" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Last Name</label>
                <Input placeholder="e.g. Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Email Address</label>
              <Input type="email" placeholder="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Phone Number</label>
              <Input type="tel" placeholder="+91 98765 43210" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground border-b border-border pb-2">Unit Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Flat Number</label>
                <Input placeholder="e.g. A-101" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">User Type</label>
                <div className="relative">
                  <select className="w-full h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                    <option value="owner">Owner</option>
                    <option value="tenant">Tenant</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Role</label>
                <div className="relative">
                  <select className="w-full h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                    <option value="resident">Resident</option>
                    <option value="president">President</option>
                    <option value="secretary">Secretary</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Status</label>
                <div className="relative">
                  <select className="w-full h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                    <option value="living">Living</option>
                    <option value="vacant">Vacant</option>
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
