import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Users, 
  UserPlus, 
  Eye, 
  Edit, 
  Trash2, 
  ArrowUpDown,
  Shield,
  ShieldAlert,
  ShieldCheck,
  User,
  Mail,
  Clock
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { SlideOver } from '@/src/components/ui/SlideOver';
import { cn } from '@/src/lib/utils';

// --- Types & Mock Data ---
interface UserData {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: 'Admin' | 'Manager' | 'Support' | 'User';
  status: 'Active' | 'Inactive' | 'Pending';
  joinedAt: string;
  lastLogin: string;
}

const MOCK_USERS: UserData[] = [
  {
    id: 'usr_1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    initials: 'AJ',
    role: 'Admin',
    status: 'Active',
    joinedAt: '12 Jan 2024',
    lastLogin: '2 mins ago'
  },
  {
    id: 'usr_2',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    initials: 'SW',
    role: 'Manager',
    status: 'Active',
    joinedAt: '05 Mar 2024',
    lastLogin: '1 hour ago'
  },
  {
    id: 'usr_3',
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    initials: 'MC',
    role: 'Support',
    status: 'Pending',
    joinedAt: '28 Mar 2024',
    lastLogin: 'Never'
  },
  {
    id: 'usr_4',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    initials: 'ED',
    role: 'User',
    status: 'Inactive',
    joinedAt: '15 Nov 2023',
    lastLogin: '2 months ago'
  },
  {
    id: 'usr_5',
    name: 'David Wilson',
    email: 'david.w@example.com',
    initials: 'DW',
    role: 'Manager',
    status: 'Active',
    joinedAt: '01 Apr 2024',
    lastLogin: 'Yesterday'
  }
];

export default function UsersPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredUsers = MOCK_USERS.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <ShieldAlert className="h-3.5 w-3.5 text-danger-500" />;
      case 'Manager': return <ShieldCheck className="h-3.5 w-3.5 text-warning-500" />;
      case 'Support': return <Shield className="h-3.5 w-3.5 text-info-500" />;
      default: return <User className="h-3.5 w-3.5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Users</h1>
          <Badge variant="secondary" className="text-sm px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border-transparent">
            {MOCK_USERS.length} Total
          </Badge>
        </div>
        <Button className="w-full sm:w-auto shadow-sm" onClick={() => setIsAddMemberOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      {/* Top Bar: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or email..." 
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
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="support">Support</option>
              <option value="user">User</option>
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
              <option value="pending">Pending</option>
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
          <div className="col-span-4">User Details</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Activity</div>
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
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <div className="col-span-3 space-y-2">
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
        ) : filteredUsers.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No users found</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              {searchQuery || roleFilter !== 'all' || statusFilter !== 'all'
                ? "We couldn't find any users matching your current filters. Try adjusting them."
                : "Get started by adding your first user to the platform."}
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
                <UserPlus className="mr-2 h-4 w-4" /> Add User
              </Button>
            )}
          </div>
        ) : (
          /* Data Rows */
          <div className="flex flex-col">
            <AnimatePresence>
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
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
                      {user.initials}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="font-semibold text-sm text-foreground truncate">{user.name}</span>
                      <span className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 truncate">
                        <Mail className="h-3 w-3 shrink-0" />
                        <span className="truncate">{user.email}</span>
                      </span>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/50 border border-border text-xs font-medium text-foreground">
                      {getRoleIcon(user.role)}
                      {user.role}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex items-center">
                    <Badge 
                      variant={
                        user.status === 'Active' ? 'success' : 
                        user.status === 'Pending' ? 'warning' : 'secondary'
                      }
                      className="px-2 py-0.5 h-6 text-[10px] uppercase tracking-wider"
                    >
                      {user.status}
                    </Badge>
                  </div>

                  {/* Activity */}
                  <div className="col-span-3 flex flex-col">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Last login: {user.lastLogin}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 ml-4">
                      Joined {user.joinedAt}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="View Profile">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Edit User">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-danger-500" title="Delete User">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Add Member SlideOver */}
      <SlideOver
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        title="Add New Member"
        description="Fill in the details below to add a new member to the platform."
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddMemberOpen(false)}>Add Member</Button>
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
            <h3 className="text-sm font-medium text-foreground border-b border-border pb-2">Role & Access</h3>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Assign Role</label>
              <div className="relative">
                <select className="w-full h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                  <option value="support">Support</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Initial Status</label>
              <div className="relative">
                <select className="w-full h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SlideOver>
    </div>
  );
}
