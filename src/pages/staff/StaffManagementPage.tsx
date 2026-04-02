import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Shield, 
  MoreVertical, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle2,
  XCircle,
  Lock,
  ChevronRight,
  Filter,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Card } from '@/src/components/ui/Card';
import { cn } from '@/src/lib/utils';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'Sales' | 'Billing' | 'Community' | 'System';
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
  joinedDate: string;
  permissions: string[];
}

const PERMISSIONS: Permission[] = [
  { id: 'view_leads', name: 'View Leads', description: 'Can view lead pipeline', category: 'Sales' },
  { id: 'edit_leads', name: 'Edit Leads', description: 'Can manage lead status and details', category: 'Sales' },
  { id: 'view_billing', name: 'View Billing', description: 'Can view payment status and history', category: 'Billing' },
  { id: 'manage_payments', name: 'Manage Payments', description: 'Can create payment links and record payments', category: 'Billing' },
  { id: 'manage_society', name: 'Manage Society', description: 'Can edit society and home details', category: 'Community' },
  { id: 'manage_users', name: 'Manage Users', description: 'Can manage community residents and staff', category: 'Community' },
  { id: 'system_settings', name: 'System Settings', description: 'Can modify global system configurations', category: 'System' },
  { id: 'manage_staff', name: 'Manage Staff', description: 'Can create and manage admin accounts', category: 'System' },
];

const ROLES: Role[] = [
  { id: 'admin', name: 'Super Admin', permissions: PERMISSIONS.map(p => p.id) },
  { id: 'manager', name: 'Manager', permissions: ['view_leads', 'edit_leads', 'view_billing', 'manage_society'] },
  { id: 'support', name: 'Support', permissions: ['view_leads', 'view_billing', 'manage_users'] },
];

const MOCK_STAFF: StaffMember[] = [
  {
    id: '1',
    name: 'Udit Bhatnagar',
    email: 'work.uditbhatnagar@gmail.com',
    phone: '+91 98765 43210',
    role: 'Super Admin',
    status: 'active',
    joinedDate: '2024-01-15',
    permissions: PERMISSIONS.map(p => p.id)
  },
  {
    id: '2',
    name: 'Rahul Sharma',
    email: 'rahul.s@darbaan.com',
    phone: '+91 99887 76655',
    role: 'Manager',
    status: 'active',
    joinedDate: '2024-02-10',
    permissions: ['view_leads', 'edit_leads', 'view_billing', 'manage_society']
  }
];

export default function StaffManagementPage() {
  const [staff, setStaff] = useState<StaffMember[]>(MOCK_STAFF);
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Staff & Permissions</h1>
          <p className="text-slate-500 mt-1">Create admin accounts and manage granular access controls.</p>
        </div>
        <Button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => setIsAddingStaff(true)}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Staff List */}
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="p-4 border-b bg-slate-50/50 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search staff by name or email..." 
                className="pl-9 h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-10">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="h-10">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b text-slate-500 font-medium bg-slate-50/30">
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Joined</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredStaff.map((member) => (
                  <tr 
                    key={member.id} 
                    className={cn(
                      "group cursor-pointer transition-colors",
                      selectedStaff?.id === member.id ? "bg-indigo-50/50" : "hover:bg-slate-50"
                    )}
                    onClick={() => setSelectedStaff(member)}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{member.name}</div>
                          <div className="text-xs text-slate-500">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">
                        {member.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          member.status === 'active' ? "bg-green-500" : "bg-slate-300"
                        )} />
                        <span className="capitalize text-slate-600">{member.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      {new Date(member.joinedDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Permissions Detail / Add Form */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {isAddingStaff ? (
              <motion.div
                key="add-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card className="p-6 border-indigo-200 shadow-lg shadow-indigo-100/50">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900">New Staff Account</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsAddingStaff(false)}>
                      <XCircle className="h-5 w-5 text-slate-400" />
                    </Button>
                  </div>

                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Full Name</label>
                      <Input placeholder="Enter staff name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email Address</label>
                      <Input type="email" placeholder="staff@darbaan.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Role</label>
                      <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option value="">Select a role</option>
                        {ROLES.map(role => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Permissions</h3>
                      <div className="space-y-2">
                        {PERMISSIONS.slice(0, 4).map(p => (
                          <label key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100 transition-all">
                            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                            <div>
                              <div className="text-sm font-medium text-slate-900">{p.name}</div>
                              <div className="text-[10px] text-slate-500">{p.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button variant="outline" className="flex-1" onClick={() => setIsAddingStaff(false)}>Cancel</Button>
                      <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">Create Account</Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            ) : selectedStaff ? (
              <motion.div
                key="detail-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-200">
                      {selectedStaff.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{selectedStaff.name}</h2>
                      <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 mt-1">
                        {selectedStaff.role}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{selectedStaff.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{selectedStaff.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Joined {new Date(selectedStaff.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-indigo-600" />
                        Active Permissions
                      </h3>
                      <Button variant="ghost" size="sm" className="text-indigo-600 h-8">Edit</Button>
                    </div>
                    
                    <div className="space-y-6">
                      {['Sales', 'Billing', 'Community', 'System'].map(category => {
                        const catPermissions = PERMISSIONS.filter(p => p.category === category);
                        const hasAny = catPermissions.some(p => selectedStaff.permissions.includes(p.id));
                        
                        if (!hasAny) return null;

                        return (
                          <div key={category} className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{category}</h4>
                            <div className="grid gap-2">
                              {catPermissions.map(p => {
                                const isActive = selectedStaff.permissions.includes(p.id);
                                if (!isActive) return null;
                                return (
                                  <div key={p.id} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                    <span className="text-xs font-medium text-slate-700">{p.name}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t flex gap-3">
                    <Button variant="outline" className="flex-1 text-slate-600">
                      <Lock className="mr-2 h-4 w-4" />
                      Reset Password
                    </Button>
                    <Button variant="outline" className="flex-1 text-destructive hover:bg-destructive/5 border-destructive/20">
                      Deactivate
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center p-8 text-center border-2 border-dashed border-slate-200 rounded-3xl"
              >
                <div className="space-y-4">
                  <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-slate-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">No Staff Selected</h3>
                    <p className="text-sm text-slate-500 max-w-[200px] mx-auto mt-1">
                      Select a staff member from the list to view and manage their permissions.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
