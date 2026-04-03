import React, { useState, useEffect } from 'react';
import { 
  Receipt, 
  Search, 
  Filter, 
  MoreVertical, 
  MessageCircle, 
  Smartphone, 
  Link as LinkIcon, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  TrendingUp, 
  Clock, 
  Users, 
  DollarSign,
  Plus,
  Calendar,
  ShieldAlert,
  Send,
  ArrowUpRight,
  ChevronRight,
  Bell,
  Mail,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/src/components/ui/DropdownMenu';
import { cn } from '@/src/lib/utils';
import { toast } from 'sonner';

// --- Types & Mock Data ---
interface ResidentDue {
  id: string;
  name: string;
  avatar: string;
  flat: string;
  amountDue: number;
  dueDate: string;
  status: 'Pending' | 'Overdue' | 'Paid';
  lastReminder: string;
  isHighAmount: boolean;
}

const MOCK_RESIDENT_DUES: ResidentDue[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    avatar: 'https://i.pravatar.cc/150?u=rahul',
    flat: 'A-402, Green Valley',
    amountDue: 12500,
    dueDate: '2026-03-25',
    status: 'Overdue',
    lastReminder: '2 days ago',
    isHighAmount: true
  },
  {
    id: '2',
    name: 'Priya Patel',
    avatar: 'https://i.pravatar.cc/150?u=priya',
    flat: 'B-105, Skyline Heights',
    amountDue: 4500,
    dueDate: '2026-04-05',
    status: 'Pending',
    lastReminder: 'Never',
    isHighAmount: false
  },
  {
    id: '3',
    name: 'Amit Verma',
    avatar: 'https://i.pravatar.cc/150?u=amit',
    flat: 'C-701, Ocean View',
    amountDue: 8200,
    dueDate: '2026-03-10',
    status: 'Overdue',
    lastReminder: '5 days ago',
    isHighAmount: false
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    avatar: 'https://i.pravatar.cc/150?u=sneha',
    flat: 'D-203, Royal Enclave',
    amountDue: 15000,
    dueDate: '2026-04-02',
    status: 'Paid',
    lastReminder: '1 week ago',
    isHighAmount: true
  },
  {
    id: '5',
    name: 'Vikram Singh',
    avatar: 'https://i.pravatar.cc/150?u=vikram',
    flat: 'E-504, Palm Grove',
    amountDue: 3800,
    dueDate: '2026-04-10',
    status: 'Pending',
    lastReminder: 'Never',
    isHighAmount: false
  },
  {
    id: '6',
    name: 'Anjali Gupta',
    avatar: 'https://i.pravatar.cc/150?u=anjali',
    flat: 'A-102, Green Valley',
    amountDue: 22000,
    dueDate: '2026-03-15',
    status: 'Overdue',
    lastReminder: '1 day ago',
    isHighAmount: true
  }
];

export default function DuePaymentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sendingReminders, setSendingReminders] = useState<Record<string, boolean>>({});

  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSendReminder = (id: string, type: 'whatsapp' | 'sms') => {
    setSendingReminders(prev => ({ ...prev, [id]: true }));
    
    // Simulate API call
    setTimeout(() => {
      setSendingReminders(prev => ({ ...prev, [id]: false }));
      toast.success(`Reminder sent via ${type.toUpperCase()}!`, {
        description: "The resident has been notified of their pending dues.",
        icon: type === 'whatsapp' ? <MessageCircle className="h-4 w-4 text-success-500" /> : <Smartphone className="h-4 w-4 text-info-500" />
      });
    }, 1200);
  };

  const handleSendAllReminders = () => {
    const overdueCount = MOCK_RESIDENT_DUES.filter(d => d.status === 'Overdue').length;
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: `Sending reminders to ${overdueCount} overdue residents...`,
        success: `Successfully sent ${overdueCount} reminders!`,
        error: 'Failed to send bulk reminders.',
      }
    );
  };

  const filteredDues = MOCK_RESIDENT_DUES.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.flat.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string, dueDate: string) => {
    if (status === 'Paid') return 'bg-success-100 text-success-700 dark:bg-success-500/20 dark:text-success-400';
    if (status === 'Overdue') return 'bg-danger-100 text-danger-700 dark:bg-danger-500/20 dark:text-danger-400';
    
    // Near due logic (within 3 days)
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 3) return 'bg-warning-100 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400';
    return 'bg-info-100 text-info-700 dark:bg-info-500/20 dark:text-info-400';
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Due Payments</h1>
          <p className="text-muted-foreground mt-1">Recovery Engine: Track and collect pending dues from residents.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="shadow-sm" onClick={handleSendAllReminders}>
            <Bell className="mr-2 h-4 w-4" /> Send Reminders to All
          </Button>
          <Button className="shadow-sm bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Create Invoice
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-border shadow-sm bg-danger-50/30 dark:bg-danger-500/5 border-danger-100 dark:border-danger-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-danger-600 dark:text-danger-400">Total Due Amount</span>
            <div className="p-2 bg-danger-100 dark:bg-danger-500/20 rounded-lg text-danger-600 dark:text-danger-400">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-danger-700 dark:text-danger-400">₹1,42,500</div>
          <p className="text-[10px] text-danger-600/70 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +12% from last month
          </p>
        </Card>

        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Overdue Amount</span>
            <div className="p-2 bg-warning-100 dark:bg-warning-500/20 rounded-lg text-warning-600 dark:text-warning-400">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground">₹84,200</div>
          <p className="text-[10px] text-muted-foreground mt-1">Across 18 residents</p>
        </Card>

        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Paid This Month</span>
            <div className="p-2 bg-success-100 dark:bg-success-500/20 rounded-lg text-success-600 dark:text-success-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground">₹2,15,000</div>
          <p className="text-[10px] text-success-600 mt-1 flex items-center gap-1">
            <ArrowUpRight className="h-3 w-3" /> 92% target achieved
          </p>
        </Card>

        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Collection Rate</span>
            <div className="p-2 bg-info-100 dark:bg-info-500/20 rounded-lg text-info-600 dark:text-info-400">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground">74.2%</div>
          <div className="w-full bg-muted h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-info-500 h-full rounded-full" style={{ width: '74.2%' }} />
          </div>
        </Card>
      </div>

      {/* Table Section */}
      <Card className="p-0 overflow-hidden border-border shadow-sm">
        <div className="p-4 border-b border-border bg-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by resident name or flat..." 
              className="pl-9 bg-muted/50 border-transparent focus:bg-background transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                className="h-10 pl-3 pr-8 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none min-w-[140px]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="paid">Paid</option>
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 rotate-90 pointer-events-none text-muted-foreground" />
            </div>
            <Button variant="outline" size="sm" className="h-10">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 pl-4">Resident</th>
                <th className="py-3">Amount Due</th>
                <th className="py-3">Due Date</th>
                <th className="py-3 text-right pr-4">Status</th>
                <th className="py-3">Last Reminder</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 pl-4"><div className="h-10 w-40 bg-muted rounded" /></td>
                    <td className="py-4"><div className="h-6 w-20 bg-muted rounded" /></td>
                    <td className="py-4"><div className="h-6 w-24 bg-muted rounded" /></td>
                    <td className="py-4"><div className="h-6 w-16 bg-muted rounded" /></td>
                    <td className="py-4"><div className="h-6 w-24 bg-muted rounded" /></td>
                    <td className="py-4 pr-4"><div className="h-8 w-24 bg-muted rounded ml-auto" /></td>
                  </tr>
                ))
              ) : filteredDues.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    No matching due payments found.
                  </td>
                </tr>
              ) : (
                filteredDues.map((item) => (
                  <tr key={item.id} className="group hover:bg-muted/40 transition-colors bg-card relative">
                    <td className="py-4 pl-4">
                      <div className="flex items-center gap-3">
                        <img src={item.avatar} alt="" className="h-10 w-10 rounded-full border border-border shrink-0" />
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">{item.name}</span>
                          <span className="text-xs text-muted-foreground">{item.flat}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className={cn(
                          "font-bold text-lg",
                          item.isHighAmount ? "text-danger-600 dark:text-danger-400" : "text-foreground"
                        )}>
                          ₹{item.amountDue.toLocaleString('en-IN')}
                        </span>
                        {item.isHighAmount && (
                          <span className="text-[10px] text-danger-500 font-medium uppercase tracking-tight">High Amount</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="font-medium">{new Date(item.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right pr-4">
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "capitalize text-[10px] px-2 py-0.5 font-semibold tracking-wide border-transparent",
                          getStatusColor(item.status, item.dueDate)
                        )}
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {item.lastReminder}
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={cn(
                            "h-8 w-8 text-muted-foreground hover:text-success-600",
                            sendingReminders[item.id] && "animate-pulse"
                          )}
                          title="WhatsApp Reminder"
                          onClick={() => handleSendReminder(item.id, 'whatsapp')}
                          disabled={sendingReminders[item.id] || item.status === 'Paid'}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={cn(
                            "h-8 w-8 text-muted-foreground hover:text-info-600",
                            sendingReminders[item.id] && "animate-pulse"
                          )}
                          title="SMS Reminder"
                          onClick={() => handleSendReminder(item.id, 'sms')}
                          disabled={sendingReminders[item.id] || item.status === 'Paid'}
                        >
                          <Smartphone className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-primary" 
                          title="Payment Link"
                          disabled={item.status === 'Paid'}
                        >
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem>
                              <Receipt className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" /> Email Invoice
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-success-600 focus:text-success-600">
                              <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Paid
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recovery Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2 border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" />
              Recovery Automation
            </h3>
            <Button variant="ghost" size="sm" className="text-primary h-8">Configure</Button>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border flex items-start gap-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                <Send className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">Auto-Reminders Active</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  System is automatically sending reminders for dues older than 7 days.
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-success-500" />
                    <span className="text-[10px] font-medium text-muted-foreground">Email: Active</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-success-500" />
                    <span className="text-[10px] font-medium text-muted-foreground">WhatsApp: Active</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-danger-500" />
                    <span className="text-[10px] font-medium text-muted-foreground">SMS: Paused</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-card">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Reminders Sent (Today)</span>
                <div className="text-2xl font-bold mt-1">42</div>
                <div className="text-[10px] text-success-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> 85% delivery rate
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Payments via Reminders</span>
                <div className="text-2xl font-bold mt-1">₹32,500</div>
                <div className="text-[10px] text-info-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> 12.4% conversion
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border shadow-sm">
          <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success-500" />
            Aging Analysis
          </h3>
          <div className="space-y-5">
            {[
              { label: 'Current (0-7 days)', amount: '₹45,000', percent: 35, color: 'bg-info-500' },
              { label: 'Overdue (8-30 days)', amount: '₹62,000', percent: 45, color: 'bg-warning-500' },
              { label: 'Critical (31-60 days)', amount: '₹28,000', percent: 15, color: 'bg-danger-500' },
              { label: 'Write-off (60+ days)', amount: '₹7,500', percent: 5, color: 'bg-danger-700' },
            ].map((bucket) => (
              <div key={bucket.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-muted-foreground">{bucket.label}</span>
                  <span className="font-bold text-foreground">{bucket.amount}</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all", bucket.color)} style={{ width: `${bucket.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-border">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground">Insight:</span> Most payments are recovered within the 8-30 day window after the second WhatsApp reminder.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

// --- End of Page ---
