import React from 'react';
import { 
  Truck, 
  Car, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowRightLeft, 
  Clock, 
  User, 
  Phone,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const vehicleLogs = [
  {
    id: 'L-1001',
    vehicle: 'MH-04-AB-1234',
    type: 'Resident',
    owner: 'Rajesh Kumar',
    unit: 'B-402',
    slot: 'A-101',
    entryTime: '08:30 AM',
    exitTime: '--',
    status: 'Inside'
  },
  {
    id: 'L-1002',
    vehicle: 'MH-02-CC-4321',
    type: 'Visitor',
    owner: 'Amit Shah',
    unit: 'B-402',
    slot: 'V-001',
    entryTime: '09:15 AM',
    exitTime: '10:45 AM',
    status: 'Exited'
  },
  {
    id: 'L-1003',
    vehicle: 'MH-01-DD-1111',
    type: 'Resident',
    owner: 'Suresh Raina',
    unit: 'C-701',
    slot: 'B-201',
    entryTime: '07:45 AM',
    exitTime: '09:30 AM',
    status: 'Exited'
  },
  {
    id: 'L-1004',
    vehicle: 'MH-03-EE-2222',
    type: 'Delivery',
    owner: 'Amazon Logistics',
    unit: 'A-105',
    slot: 'Temp-01',
    entryTime: '10:00 AM',
    exitTime: '--',
    status: 'Inside'
  },
  {
    id: 'L-1005',
    vehicle: 'MH-05-FF-3333',
    type: 'Resident',
    owner: 'Hardik Pandya',
    unit: 'D-203',
    slot: 'C-301',
    entryTime: '06:30 AM',
    exitTime: '--',
    status: 'Inside'
  }
];

export default function VehicleLogsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-500/20">
            <Truck size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Vehicle Logs</h1>
            <p className="text-muted-foreground mt-1">Detailed history of all vehicle movements in the society.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Calendar className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
          <Button size="sm" className="h-9 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <ArrowRightLeft size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Entries Today</p>
            <h3 className="text-xl font-bold">156</h3>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-slate-50 text-slate-600">
            <ArrowRightLeft size={20} className="rotate-180" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Exits Today</p>
            <h3 className="text-xl font-bold">142</h3>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <Car size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Active Visitors</p>
            <h3 className="text-xl font-bold">14</h3>
          </div>
        </Card>
      </div>

      {/* Logs Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="text-emerald-500" size={18} />
            Movement History
          </h3>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search vehicle or owner..." 
              className="pl-9 h-9 text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                <tr>
                  <th className="px-4 py-3">Vehicle</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Owner / Unit</th>
                  <th className="px-4 py-3">Slot</th>
                  <th className="px-4 py-3">Entry</th>
                  <th className="px-4 py-3">Exit</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {vehicleLogs.map((log, idx) => (
                  <motion.tr 
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                          <Car size={16} />
                        </div>
                        <span className="font-bold">{log.vehicle}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={cn(
                        "text-[10px] font-bold",
                        log.type === 'Resident' ? "bg-blue-50 text-blue-600 border-blue-100" :
                        log.type === 'Visitor' ? "bg-purple-50 text-purple-600 border-purple-100" :
                        "bg-amber-50 text-amber-600 border-amber-100"
                      )}>
                        {log.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        <p className="font-medium">{log.owner}</p>
                        <p className="text-[10px] text-muted-foreground">{log.unit}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="text-[10px] font-bold">{log.slot}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{log.entryTime}</td>
                    <td className="px-4 py-3 text-muted-foreground">{log.exitTime}</td>
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
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Phone size={14} className="text-blue-600" />
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
    </div>
  );
}
