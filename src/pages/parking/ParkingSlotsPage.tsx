import React from 'react';
import { 
  ParkingCircle, 
  Car, 
  ShieldAlert, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  User, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Info,
  ArrowRightLeft
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const parkingStats = [
  { title: 'Total Slots', value: '120', icon: ParkingCircle, color: 'text-blue-500' },
  { title: 'Occupied', value: '84', icon: Car, color: 'text-emerald-500' },
  { title: 'Free Slots', value: '36', icon: CheckCircle2, color: 'text-slate-500' },
  { title: 'Visitor Slots', value: '12', icon: User, color: 'text-purple-500' }
];

const parkingSlots = [
  { id: 'A-101', status: 'occupied', type: 'resident', vehicle: 'MH-04-AB-1234', owner: 'Rajesh Kumar' },
  { id: 'A-102', status: 'free', type: 'resident', vehicle: null, owner: 'Anita Sharma' },
  { id: 'A-103', status: 'occupied', type: 'resident', vehicle: 'MH-04-XY-5678', owner: 'Vikram Singh' },
  { id: 'A-104', status: 'misuse', type: 'resident', vehicle: 'DL-01-ZZ-9999', owner: 'Pooja Sharma', alert: 'Unauthorized Vehicle' },
  { id: 'V-001', status: 'occupied', type: 'visitor', vehicle: 'MH-02-CC-4321', visitor: 'Amit Shah', host: 'B-402' },
  { id: 'V-002', status: 'free', type: 'visitor', vehicle: null },
  { id: 'B-201', status: 'occupied', type: 'resident', vehicle: 'MH-01-DD-1111', owner: 'Suresh Raina' },
  { id: 'B-202', status: 'occupied', type: 'resident', vehicle: 'MH-03-EE-2222', owner: 'Mahendra Singh' },
  { id: 'B-203', status: 'free', type: 'resident', vehicle: null, owner: 'Virat Kohli' },
  { id: 'B-204', status: 'free', type: 'resident', vehicle: null, owner: 'Rohit Sharma' },
  { id: 'C-301', status: 'occupied', type: 'resident', vehicle: 'MH-05-FF-3333', owner: 'Hardik Pandya' },
  { id: 'C-302', status: 'occupied', type: 'resident', vehicle: 'MH-06-GG-4444', owner: 'KL Rahul' },
  { id: 'C-303', status: 'free', type: 'resident', vehicle: null, owner: 'Jasprit Bumrah' },
  { id: 'C-304', status: 'occupied', type: 'resident', vehicle: 'MH-07-HH-5555', owner: 'Rishabh Pant' },
  { id: 'V-003', status: 'occupied', type: 'visitor', vehicle: 'MH-08-II-6666', visitor: 'Shubman Gill', host: 'C-701' },
  { id: 'V-004', status: 'free', type: 'visitor', vehicle: null }
];

const misuseAlerts = [
  { id: 1, slot: 'A-104', vehicle: 'DL-01-ZZ-9999', type: 'Unauthorized Entry', time: '15 mins ago' },
  { id: 2, slot: 'B-205', vehicle: 'MH-04-KK-7777', type: 'Overstayed Visitor', time: '2 hours ago' }
];

export default function ParkingSlotsPage() {
  const [activeTab, setActiveTab] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredSlots = parkingSlots.filter(slot => {
    const matchesSearch = slot.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (slot.vehicle && slot.vehicle.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'resident') return matchesSearch && slot.type === 'resident';
    if (activeTab === 'visitor') return matchesSearch && slot.type === 'visitor';
    if (activeTab === 'alerts') return matchesSearch && slot.status === 'misuse';
    return matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
            <ParkingCircle size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Parking Management</h1>
            <p className="text-muted-foreground mt-1">Real-time parking allocation and security monitoring.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Reallocate Slots
          </Button>
          <Button size="sm" className="h-9 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Assign Vehicle
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        {parkingStats.map((stat, i) => (
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Parking Grid View */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex p-1 bg-muted rounded-lg w-fit">
              <button 
                onClick={() => setActiveTab('all')}
                className={cn("px-4 py-1.5 text-xs font-bold rounded-md transition-all", activeTab === 'all' ? "bg-card shadow-sm" : "text-muted-foreground")}
              >
                All Slots
              </button>
              <button 
                onClick={() => setActiveTab('resident')}
                className={cn("px-4 py-1.5 text-xs font-bold rounded-md transition-all", activeTab === 'resident' ? "bg-card shadow-sm" : "text-muted-foreground")}
              >
                Resident
              </button>
              <button 
                onClick={() => setActiveTab('visitor')}
                className={cn("px-4 py-1.5 text-xs font-bold rounded-md transition-all", activeTab === 'visitor' ? "bg-card shadow-sm" : "text-muted-foreground")}
              >
                Visitor
              </button>
              <button 
                onClick={() => setActiveTab('alerts')}
                className={cn("px-4 py-1.5 text-xs font-bold rounded-md transition-all", activeTab === 'alerts' ? "bg-card shadow-sm text-rose-600" : "text-muted-foreground")}
              >
                Alerts
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search slot or vehicle..." 
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

          <Card className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {filteredSlots.map((slot, idx) => (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.02 }}
                >
                  <button className={cn(
                    "w-full aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all relative group",
                    slot.status === 'free' ? "border-emerald-100 bg-emerald-50/30 hover:border-emerald-300" :
                    slot.status === 'occupied' ? (slot.type === 'resident' ? "border-blue-100 bg-blue-50/30 hover:border-blue-300" : "border-purple-100 bg-purple-50/30 hover:border-purple-300") :
                    "border-rose-100 bg-rose-50/30 hover:border-rose-300 animate-pulse"
                  )}>
                    <span className="text-[10px] font-bold text-muted-foreground">{slot.id}</span>
                    {slot.status === 'free' ? (
                      <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <Plus size={14} />
                      </div>
                    ) : (
                      <Car size={20} className={cn(
                        slot.status === 'misuse' ? "text-rose-500" : 
                        slot.type === 'resident' ? "text-blue-500" : "text-purple-500"
                      )} />
                    )}
                    {slot.status === 'misuse' && (
                      <div className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 rounded-full flex items-center justify-center text-white">
                        <AlertCircle size={10} />
                      </div>
                    )}
                    
                    {/* Tooltip-like hover info */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-2 bg-popover border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity">
                      <p className="text-[10px] font-bold">{slot.id}</p>
                      <p className="text-[10px] text-muted-foreground">{slot.status === 'free' ? 'Available' : slot.vehicle}</p>
                      {slot.owner && <p className="text-[10px] text-muted-foreground truncate">{slot.owner}</p>}
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold uppercase tracking-wider text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-md bg-emerald-100 border border-emerald-200" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-md bg-blue-100 border border-blue-200" />
              <span>Resident Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-md bg-purple-100 border border-purple-200" />
              <span>Visitor Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-md bg-rose-100 border border-rose-200" />
              <span>Misuse / Alert</span>
            </div>
          </div>
        </div>

        {/* Alerts & Recent Activity */}
        <div className="space-y-6">
          {/* Misuse Alerts */}
          <Card className="p-6 border-rose-100 dark:border-rose-900/30 bg-rose-50/30 dark:bg-rose-950/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold flex items-center gap-2 text-rose-600">
                <ShieldAlert size={18} />
                Misuse Alerts
              </h3>
              <Badge className="bg-rose-500 text-white">{misuseAlerts.length}</Badge>
            </div>
            <div className="space-y-4">
              {misuseAlerts.map((alert) => (
                <div key={alert.id} className="p-3 bg-card border border-rose-100 dark:border-rose-900/30 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 bg-rose-100 text-rose-600 rounded-md">Slot {alert.slot}</span>
                    <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold">{alert.type}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Car size={12} />
                      {alert.vehicle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Button size="sm" className="flex-1 h-7 text-[10px] bg-rose-600 hover:bg-rose-700 text-white">Issue Fine</Button>
                    <Button size="sm" variant="outline" className="flex-1 h-7 text-[10px]">Dismiss</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Vehicle Logs */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold flex items-center gap-2">
                <Clock size={18} className="text-muted-foreground" />
                Recent Logs
              </h3>
              <Button variant="ghost" size="sm" className="text-xs h-8">View All</Button>
            </div>
            <div className="space-y-6">
              {[
                { action: 'Entry', vehicle: 'MH-04-AB-1234', slot: 'A-101', time: '10:45 AM' },
                { action: 'Exit', vehicle: 'MH-01-DD-1111', slot: 'B-201', time: '10:30 AM' },
                { action: 'Entry', vehicle: 'MH-02-CC-4321', slot: 'V-001', time: '10:15 AM' }
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-lg shrink-0",
                    log.action === 'Entry' ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-600"
                  )}>
                    <ArrowRightLeft size={14} className={cn(log.action === 'Exit' && "rotate-180")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold">{log.action}: {log.vehicle}</p>
                      <span className="text-[10px] text-muted-foreground">{log.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Slot {log.slot}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Info */}
          <Card className="p-5 bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30">
            <div className="flex gap-3">
              <Info className="text-blue-500 shrink-0" size={20} />
              <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
                Visitor parking is limited to 4 hours. Overstaying will trigger an automatic alert to security.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
