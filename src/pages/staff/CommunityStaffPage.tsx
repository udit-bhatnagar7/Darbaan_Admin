import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  UserPlus, 
  Eye, 
  Edit, 
  Trash2, 
  ArrowUpDown,
  Phone,
  Shield,
  Wrench,
  Sparkles,
  Contact2,
  Clock
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { SlideOver } from '@/src/components/ui/SlideOver';
import { cn } from '@/src/lib/utils';

// --- Types & Mock Data ---
interface StaffMember {
  id: string;
  name: string;
  initials: string;
  role: 'Security' | 'Maintenance' | 'Cleaning';
  phone: string;
  shiftTiming: string;
  dutyStatus: 'On Duty' | 'Off Duty';
  status: 'Active' | 'Inactive';
}

const MOCK_STAFF: StaffMember[] = [
  {
    id: 'stf_1',
    name: 'Ramesh Kumar',
    initials: 'RK',
    role: 'Security',
    phone: '+91 98765 43210',
    shiftTiming: '08:00 AM - 08:00 PM',
    dutyStatus: 'On Duty',
    status: 'Active'
  },
  {
    id: 'stf_2',
    name: 'Suresh Singh',
    initials: 'SS',
    role: 'Maintenance',
    phone: '+91 99887 76655',
    shiftTiming: '09:00 AM - 06:00 PM',
    dutyStatus: 'On Duty',
    status: 'Active'
  },
  {
    id: 'stf_3',
    name: 'Anita Devi',
    initials: 'AD',
    role: 'Cleaning',
    phone: '+91 91234 56789',
    shiftTiming: '06:00 AM - 02:00 PM',
    dutyStatus: 'Off Duty',
    status: 'Active'
  },
  {
    id: 'stf_4',
    name: 'Vikram Patel',
    initials: 'VP',
    role: 'Security',
    phone: '+91 98765 12345',
    shiftTiming: '08:00 PM - 08:00 AM',
    dutyStatus: 'Off Duty',
    status: 'Inactive'
  }
];

export default function StaffManagementPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);

  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredStaff = MOCK_STAFF.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          staff.phone.includes(searchQuery);
    const matchesRole = roleFilter === 'all' || staff.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || staff.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Security': return <Shield className="h-3.5 w-3.5" />;
      case 'Maintenance': return <Wrench className="h-3.5 w-3.5" />;
      case 'Cleaning': return <Sparkles className="h-3.5 w-3.5" />;
      default: return <Contact2 className="h-3.5 w-3.5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Security': return 'text-info-600 bg-info-50 border-info-200 dark:bg-info-500/10 dark:text-info-400 dark:border-info-500/20';
      case 'Maintenance': return 'text-warning-600 bg-warning-50 border-warning-200 dark:bg-warning-500/10 dark:text-warning-400 dark:border-warning-500/20';
      case 'Cleaning': return 'text-success-600 bg-success-50 border-success-200 dark:bg-success-500/10 dark:text-success-400 dark:border-success-500/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Staff Management</h1>
          <Badge variant="secondary" className="text-sm px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border-transparent">
            {MOCK_STAFF.length} Staff
          </Badge>
        </div>
        <Button className="w-full sm:w-auto shadow-sm" onClick={() => setIsAddStaffOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" /> Add Staff
        </Button>
      </div>

      {/* Top Bar: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or phone..." 
            className="pl-10 bg-muted/50 border-transparent focus:bg-background transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Role Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[140px]">
            <select
              className="w-full h-10 pl-3 pr-8 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="security">Security</option>
              <option value="maintenance">Maintenance</option>
              <option value="cleaning">Cleaning</option>
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
          <div className="col-span-4">Staff</div>
          <div className="col-span-3">Contact</div>
          <div className="col-span-3">Availability</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="divide-y divide-border/50">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center h-[72px]">
                <div className="col-span-4 flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                  </div>
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="col-span-3 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
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
        ) : filteredStaff.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Contact2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No staff added</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              {searchQuery || roleFilter !== 'all' || statusFilter !== 'all'
                ? "We couldn't find any staff matching your current filters. Try adjusting them."
                : "Get started by adding your first staff member to the platform."}
            </p>
            {(searchQuery || roleFilter !== 'all' || statusFilter !== 'all') ? (
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setRoleFilter('all');
                setStatusFilter('all');
              }}>
                Clear Filters
              </Button>
            ) : (
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Add Staff
              </Button>
            )}
          </div>
        ) : (
          /* Data Rows */
          <div className="flex flex-col">
            <AnimatePresence>
              {filteredStaff.map((staff, index) => (
                <motion.div
                  key={staff.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={cn(
                    "grid grid-cols-12 gap-4 p-4 items-center h-[72px] transition-colors group",
                    "even:bg-muted/20 odd:bg-transparent hover:bg-muted/40"
                  )}
                >
                  {/* Staff Info */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20 font-semibold text-sm">
                      {staff.initials}
                    </div>
                    <div className="flex flex-col items-start gap-1 truncate">
                      <span className="font-semibold text-sm text-foreground truncate">{staff.name}</span>
                      <div className={cn(
                        "flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-medium uppercase tracking-wider",
                        getRoleColor(staff.role)
                      )}>
                        {getRoleIcon(staff.role)}
                        {staff.role}
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="col-span-3 flex items-center gap-3">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="h-8 w-8 rounded-full shrink-0 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      title={`Call ${staff.name}`}
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </Button>
                    <span className="text-sm font-medium text-foreground">{staff.phone}</span>
                  </div>

                  {/* Availability */}
                  <div className="col-span-3 flex flex-col items-start gap-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {staff.shiftTiming}
                    </span>
                    <span className="text-[10px] flex items-center gap-1 font-medium">
                      <span className={cn(
                        "h-1.5 w-1.5 rounded-full", 
                        staff.dutyStatus === 'On Duty' ? "bg-success-500" : "bg-muted-foreground"
                      )} />
                      <span className={staff.dutyStatus === 'On Duty' ? "text-success-600 dark:text-success-400" : "text-muted-foreground"}>
                        {staff.dutyStatus}
                      </span>
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-1 flex justify-center">
                    <Badge 
                      variant={staff.status === 'Active' ? 'success' : 'secondary'}
                      className="px-2 py-0.5 h-6 text-[10px] uppercase tracking-wider"
                    >
                      {staff.status}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Edit Staff">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-danger-500" title="Remove Staff">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Add Staff SlideOver */}
      <SlideOver
        isOpen={isAddStaffOpen}
        onClose={() => setIsAddStaffOpen(false)}
        title="Add Staff Member"
        description="Register a new staff member for the society."
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddStaffOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddStaffOpen(false)}>Add Staff</Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground border-b border-border pb-2">Personal Information</h3>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Full Name</label>
              <Input placeholder="e.g. Ramesh Kumar" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Phone Number</label>
              <Input type="tel" placeholder="+91 98765 43210" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground border-b border-border pb-2">Work Details</h3>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Role</label>
              <div className="relative">
                <select className="w-full h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                  <option value="security">Security</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="cleaning">Cleaning</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Shift Timing</label>
              <Input placeholder="e.g. 08:00 AM - 08:00 PM" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Duty Status</label>
                <div className="relative">
                  <select className="w-full h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                    <option value="on_duty">On Duty</option>
                    <option value="off_duty">Off Duty</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Account Status</label>
                <div className="relative">
                  <select className="w-full h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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
