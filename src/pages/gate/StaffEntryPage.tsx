import React from 'react';
import { 
  UserCheck, 
  Users, 
  Clock, 
  Search, 
  Filter, 
  MoreVertical, 
  Star, 
  ShieldAlert, 
  QrCode, 
  Calendar,
  ArrowRightLeft,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const staffStats = [
  { title: 'Present Today', value: '42', icon: UserCheck, color: 'text-emerald-500' },
  { title: 'On Leave', value: '05', icon: Calendar, color: 'text-amber-500' },
  { title: 'Late Entries', value: '03', icon: Clock, color: 'text-rose-500' },
  { title: 'Total Staff', value: '58', icon: Users, color: 'text-blue-500' }
];

const staffLogs = [
  {
    id: 'S-001',
    name: 'Sunita Devi',
    role: 'Maid',
    unit: 'A-404',
    checkIn: '08:00 AM',
    checkOut: '--',
    status: 'Inside',
    rating: 4.8,
    image: 'https://i.pravatar.cc/150?u=sunita'
  },
  {
    id: 'S-002',
    name: 'Ramesh Kumar',
    role: 'Driver',
    unit: 'B-201',
    checkIn: '07:30 AM',
    checkOut: '09:15 AM',
    status: 'Exited',
    rating: 4.5,
    image: 'https://i.pravatar.cc/150?u=ramesh'
  },
  {
    id: 'S-003',
    name: 'Vikram Singh',
    role: 'Security',
    unit: 'Main Gate',
    checkIn: '06:00 AM',
    checkOut: '--',
    status: 'Inside',
    rating: 4.9,
    image: 'https://i.pravatar.cc/150?u=vikram'
  },
  {
    id: 'S-004',
    name: 'Pooja Sharma',
    role: 'Cook',
    unit: 'C-102',
    checkIn: '08:30 AM',
    checkOut: '--',
    status: 'Inside',
    rating: 4.2,
    image: 'https://i.pravatar.cc/150?u=pooja'
  }
];

export default function StaffEntryPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
            <UserCheck size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Staff Management</h1>
            <p className="text-muted-foreground mt-1">Monitor staff attendance, ratings, and gate logs.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <QrCode className="mr-2 h-4 w-4" />
            Staff ID Scan
          </Button>
          <Button size="sm" className="h-9 bg-blue-600 hover:bg-blue-700 text-white">
            <Users className="mr-2 h-4 w-4" />
            Add New Staff
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        {staffStats.map((stat, i) => (
          <Card key={i} className="p-4 flex items-center gap-4">
            <div className={cn("p-2 rounded-lg bg-muted", stat.color)}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
              <h3 className="text-xl font-bold">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ArrowRightLeft className="text-blue-500" size={18} />
            Daily Attendance Log
          </h3>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search staff by name or role..." 
                className="pl-9 h-9 text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                <tr>
                  <th className="px-4 py-3">Staff Member</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Assigned Unit</th>
                  <th className="px-4 py-3">Check In</th>
                  <th className="px-4 py-3">Check Out</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {staffLogs.map((staff, idx) => (
                  <motion.tr 
                    key={staff.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={staff.image} 
                          alt={staff.name} 
                          className="h-8 w-8 rounded-full object-cover border border-border"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-medium">{staff.name}</p>
                          <p className="text-[10px] text-muted-foreground">ID: {staff.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-[10px] font-bold">
                        {staff.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground font-medium">{staff.unit}</td>
                    <td className="px-4 py-3 text-muted-foreground">{staff.checkIn}</td>
                    <td className="px-4 py-3 text-muted-foreground">{staff.checkOut}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="font-bold">{staff.rating}</span>
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          staff.status === 'Inside' ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                        )} />
                        <span className={cn(
                          "text-xs font-medium",
                          staff.status === 'Inside' ? "text-emerald-600" : "text-slate-500"
                        )}>{staff.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                          <CheckCircle2 size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600">
                          <XCircle size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={14} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Blocked Staff Alert */}
      <Card className="p-4 border-l-4 border-l-rose-500 bg-rose-50 dark:bg-rose-950/20">
        <div className="flex items-start gap-3">
          <ShieldAlert className="text-rose-500 shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="text-sm font-bold text-rose-900 dark:text-rose-400">Security Watchlist</h4>
            <p className="text-xs text-rose-700 dark:text-rose-500/80 mt-1">
              3 staff members have been blocked by residents this week. Please verify IDs before allowing entry.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
