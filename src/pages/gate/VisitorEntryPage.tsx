import React from 'react';
import { 
  UserPlus, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Truck, 
  UserCheck, 
  ShieldAlert, 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  MapPin,
  QrCode,
  ShieldCheck,
  AlertCircle,
  Activity
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const pendingApprovals = [
  {
    id: 'V-101',
    name: 'Amit Sharma',
    purpose: 'Guest',
    unit: 'B-402',
    host: 'Rajesh Kumar',
    time: '2 mins ago',
    type: 'Unknown',
    otpStatus: 'Unverified',
    image: 'https://i.pravatar.cc/150?u=amit'
  },
  {
    id: 'V-102',
    name: 'Zomato Delivery',
    purpose: 'Delivery',
    unit: 'A-105',
    host: 'Anita Sharma',
    time: 'Just now',
    type: 'Delivery',
    otpStatus: 'Verified',
    image: 'https://i.pravatar.cc/150?u=zomato'
  }
];

const visitorLog = [
  {
    id: 'V-098',
    name: 'Suresh Raina',
    purpose: 'Guest',
    unit: 'C-701',
    entryTime: '10:15 AM',
    status: 'Inside',
    type: 'Pre-approved',
    otpStatus: 'Verified'
  },
  {
    id: 'V-097',
    name: 'Urban Company',
    purpose: 'Service',
    unit: 'D-203',
    entryTime: '09:45 AM',
    status: 'Inside',
    type: 'Pre-approved',
    otpStatus: 'Verified'
  },
  {
    id: 'V-096',
    name: 'Amazon Logistics',
    purpose: 'Delivery',
    unit: 'B-201',
    entryTime: '09:30 AM',
    status: 'Exited',
    exitTime: '09:50 AM',
    type: 'Unknown',
    otpStatus: 'Verified'
  },
  {
    id: 'V-095',
    name: 'Maid - Sunita',
    purpose: 'Daily Help',
    unit: 'A-404',
    entryTime: '08:00 AM',
    status: 'Inside',
    type: 'Staff',
    otpStatus: 'Verified'
  }
];

export default function VisitorEntryPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-600 rounded-xl text-white shadow-lg shadow-orange-500/20">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Gate Management</h1>
            <p className="text-muted-foreground mt-1">Live security monitoring and visitor control.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <QrCode className="mr-2 h-4 w-4" />
            Scan Invite
          </Button>
          <Button size="sm" className="h-9 bg-orange-600 hover:bg-orange-700 text-white">
            <UserPlus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Security Alert Banner */}
      <Card className="p-4 bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-500 rounded-full text-white animate-pulse">
            <ShieldAlert size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-rose-900 dark:text-rose-400">Security Alert: Unknown Visitor at Gate 2</p>
            <p className="text-xs text-rose-700 dark:text-rose-500/80">Vehicle MH-04-AB-1234 attempting entry without pre-approval.</p>
          </div>
        </div>
        <Button size="sm" variant="destructive" className="h-8">Intervene</Button>
      </Card>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Inside" value="24" icon={UserCheck} color="text-blue-500" />
        <StatCard title="Pending Approval" value="02" icon={Clock} color="text-amber-500" />
        <StatCard title="Deliveries Today" value="18" icon={Truck} color="text-purple-500" />
        <StatCard title="Security Incidents" value="0" icon={ShieldCheck} color="text-emerald-500" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pending Approvals */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="text-amber-500" size={18} />
            Pending Approvals
          </h3>
          <div className="space-y-4">
            <AnimatePresence>
              {pendingApprovals.map((visitor) => (
                <motion.div
                  key={visitor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="p-4 overflow-hidden relative group">
                    {visitor.type === 'Unknown' && (
                      <div className="absolute top-0 right-0 px-2 py-0.5 bg-rose-500 text-[10px] font-bold text-white rounded-bl-lg">
                        UNKNOWN
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <img 
                        src={visitor.image} 
                        alt={visitor.name} 
                        className="h-12 w-12 rounded-full object-cover border-2 border-border"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold truncate">{visitor.name}</h4>
                          <span className="text-[10px] text-muted-foreground">{visitor.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Visiting <span className="font-semibold text-foreground">{visitor.unit}</span> ({visitor.host})
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-[10px] h-5">
                            {visitor.purpose}
                          </Badge>
                          <Badge className={cn(
                            "text-[10px] h-5",
                            visitor.otpStatus === 'Verified' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                          )}>
                            {visitor.otpStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-8">
                        <CheckCircle2 className="mr-2 h-3.5 w-3.5" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-rose-600 hover:bg-rose-50 border-rose-200 h-8">
                        <XCircle className="mr-2 h-3.5 w-3.5" />
                        Reject
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Visitor Log */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="text-orange-500" size={18} />
              Recent Visitor Log
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search visitors..." 
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
                    <th className="px-4 py-3">Visitor</th>
                    <th className="px-4 py-3">Unit</th>
                    <th className="px-4 py-3">Entry Time</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {visitorLog.map((log) => (
                    <tr key={log.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center text-white",
                            log.purpose === 'Delivery' ? "bg-purple-500" : "bg-blue-500"
                          )}>
                            {log.purpose === 'Delivery' ? <Truck size={14} /> : <UserCheck size={14} />}
                          </div>
                          <div>
                            <p className="font-medium">{log.name}</p>
                            <p className="text-[10px] text-muted-foreground">{log.purpose}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium">{log.unit}</td>
                      <td className="px-4 py-3 text-muted-foreground">{log.entryTime}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={cn(
                          "text-[10px] font-bold",
                          log.type === 'Pre-approved' ? "border-emerald-200 text-emerald-600 bg-emerald-50" : "border-slate-200 text-slate-600 bg-slate-50"
                        )}>
                          {log.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            log.status === 'Inside' ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                          )} />
                          <span className={cn(
                            "text-xs font-medium",
                            log.status === 'Inside' ? "text-emerald-600" : "text-slate-500"
                          )}>{log.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="p-4 flex items-center gap-4">
      <div className={cn("p-2 rounded-lg bg-muted", color)}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </Card>
  );
}
