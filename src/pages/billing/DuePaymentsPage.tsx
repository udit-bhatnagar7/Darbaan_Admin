import React, { useState } from 'react';
import { 
  Receipt, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  MessageCircle, 
  Smartphone, 
  Link as LinkIcon, 
  CheckCircle2, 
  AlertCircle, 
  Skull, 
  FileText, 
  Ban, 
  Download, 
  Upload, 
  ChevronRight, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Users, 
  DollarSign,
  Plus,
  X,
  Settings2,
  Calendar,
  History,
  ShieldAlert,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';

const MOCK_DUE_PAYMENTS = [
  { id: '1', name: 'Green Valley Society', avatar: 'https://i.pravatar.cc/150?u=gv', plan: 'Enterprise', amount: 12500, daysOverdue: 5, lastReminder: '2 days ago', status: 'pending', method: 'Stripe' },
  { id: '2', name: 'Skyline Apartments', avatar: 'https://i.pravatar.cc/150?u=sa', plan: 'Pro', amount: 4500, daysOverdue: 15, lastReminder: '5 days ago', status: 'pending', method: 'Razorpay' },
  { id: '3', name: 'Ocean View Residency', avatar: 'https://i.pravatar.cc/150?u=ov', plan: 'Starter', amount: 1200, daysOverdue: 45, lastReminder: '1 week ago', status: 'disputed', method: 'Manual' },
  { id: '4', name: 'Royal Enclave', avatar: 'https://i.pravatar.cc/150?u=re', plan: 'Enterprise', amount: 15000, daysOverdue: 75, lastReminder: '2 weeks ago', status: 'pending', method: 'Stripe' },
  { id: '5', name: 'Palm Grove', avatar: 'https://i.pravatar.cc/150?u=pg', plan: 'Pro', amount: 3800, daysOverdue: 2, lastReminder: 'Never', status: 'pending', method: 'Razorpay' },
];

export default function DuePaymentsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'disputed' | 'write-off'>('all');
  const [isAutomationOpen, setIsAutomationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getRowColor = (days: number) => {
    if (days >= 60) return 'bg-red-100/50 dark:bg-red-900/20 text-red-700 dark:text-red-400 font-bold';
    if (days >= 31) return 'bg-red-50/50 dark:bg-red-900/10 text-red-600 dark:text-red-400';
    if (days >= 8) return 'bg-orange-50/50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400';
    if (days >= 1) return 'bg-amber-50/50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-400';
    return '';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Due Payments</h1>
          <p className="text-sm text-muted-foreground mt-1">Revenue recovery command center. Track and collect overdue payments.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="border border-border">
            <Upload size={18} className="mr-2" /> Import CSV
          </Button>
          <Button onClick={() => setIsAutomationOpen(true)} className="btn-primary">
            <Settings2 size={18} className="mr-2" /> Automation Rules
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Overdue', value: '$37,000', icon: DollarSign, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Overdue Accounts', value: '12', icon: Users, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Avg. Days Overdue', value: '28d', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Recovery Rate', value: '84%', icon: TrendingUp, color: 'text-success-500', bg: 'bg-success-50' },
        ].map((kpi) => (
          <Card key={kpi.label} className="p-4 flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </div>
            <div className={cn("p-2 rounded-lg", kpi.bg, kpi.color)}>
              <kpi.icon size={20} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-4 border-b border-border">
            {['all', 'disputed', 'write-off'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors relative",
                  activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.replace('-', ' ')}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by society name..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="icon" className="border border-border">
              <Filter size={18} />
            </Button>
            <div className="flex-1" />
            <Button variant="secondary" size="sm" className="text-[10px]">
              <Download size={14} className="mr-2" /> Export CSV
            </Button>
          </div>

          <Card className="overflow-hidden border-border p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Society</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Plan</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Amount Due</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-center">Days Overdue</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Last Reminder</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Method</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_DUE_PAYMENTS.map((payment) => (
                    <tr 
                      key={payment.id}
                      className={cn(
                        "group border-b border-border/50 hover:bg-muted/30 transition-colors",
                        getRowColor(payment.daysOverdue)
                      )}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={payment.avatar} className="h-8 w-8 rounded-full border border-border" alt="" />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold">{payment.name}</span>
                            <span className="text-[10px] opacity-70">ID: {payment.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="text-[10px]">{payment.plan}</Badge>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">${payment.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-xs font-bold">{payment.daysOverdue}d</span>
                          {payment.daysOverdue >= 60 && <Skull size={12} className="text-red-700" />}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[10px] opacity-70">{payment.lastReminder}</td>
                      <td className="px-4 py-3 text-[10px] font-medium">{payment.method}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                            <Mail size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-success-500/10 hover:text-success-500">
                            <MessageCircle size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Aging Buckets</h3>
            <div className="space-y-4">
              {[
                { label: 'Current', amount: '$125k', percent: 65, color: 'bg-primary' },
                { label: '1–7 Days', amount: '$12k', percent: 12, color: 'bg-amber-500' },
                { label: '8–30 Days', amount: '$8.5k', percent: 8, color: 'bg-orange-500' },
                { label: '31–60 Days', amount: '$4.2k', percent: 5, color: 'bg-red-500' },
                { label: '60+ Days', amount: '$12.3k', percent: 10, color: 'bg-red-700' },
              ].map((bucket) => (
                <div key={bucket.label} className="space-y-1.5 cursor-pointer group">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-medium group-hover:text-primary transition-colors">{bucket.label}</span>
                    <span className="font-bold">{bucket.amount}</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all", bucket.color)} style={{ width: `${bucket.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 space-y-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-2 text-primary">
              <ShieldAlert size={18} />
              <h3 className="text-xs font-bold uppercase tracking-wider">Auto-Reminders</h3>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Automation is currently <span className="text-success-500 font-bold uppercase">Active</span>. 
              Next batch of 14 reminders will be sent at 09:00 AM tomorrow.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span>Email Reminders</span>
                <Badge variant="secondary" className="text-[8px]">ON</Badge>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span>WhatsApp Alerts</span>
                <Badge variant="secondary" className="text-[8px]">ON</Badge>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span>SMS Notifications</span>
                <Badge variant="secondary" className="text-[8px]">OFF</Badge>
              </div>
            </div>
            <Button variant="secondary" className="w-full text-[10px] h-8">
              Manage Automation
            </Button>
          </Card>

          <Card className="p-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { type: 'payment', text: 'Royal Enclave paid $15k', time: '2h ago', icon: CheckCircle2, color: 'text-success-500' },
                { type: 'dispute', text: 'Ocean View flagged dispute', time: '5h ago', icon: AlertCircle, color: 'text-warning-500' },
                { type: 'reminder', text: 'Bulk email sent to 8 accounts', time: '1d ago', icon: Mail, color: 'text-primary' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={cn("mt-0.5 shrink-0", activity.color)}>
                    <activity.icon size={14} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-medium leading-tight">{activity.text}</p>
                    <p className="text-[8px] text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Automation Rules Modal */}
      <AnimatePresence>
        {isAutomationOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <Settings2 size={20} />
                  </div>
                  <h3 className="font-bold">Reminder Automation Rules</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsAutomationOpen(false)}>
                  <X size={20} />
                </Button>
              </div>
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
                {[
                  { day: 1, type: 'Email', template: 'Soft Reminder', active: true },
                  { day: 3, type: 'Email + WhatsApp', template: 'Standard Reminder', active: true },
                  { day: 7, type: 'Email + WhatsApp + SMS', template: 'Urgent Reminder', active: true },
                  { day: 14, type: 'Email', template: 'Escalation Notice', active: true },
                  { day: 30, type: 'Email', template: 'Final Notice', active: false },
                ].map((rule) => (
                  <div key={rule.day} className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      D{rule.day}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold">Day {rule.day} Reminder</div>
                      <div className="text-[10px] text-muted-foreground">{rule.type} • Template: {rule.template}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><FileText size={14} /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 size={14} /></Button>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full border-2 border-dashed border-border h-12 text-xs text-muted-foreground hover:border-primary/50 hover:text-primary">
                  <Plus size={16} className="mr-2" /> Add New Rule
                </Button>
              </div>
              <div className="p-6 bg-muted/30 border-t border-border flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setIsAutomationOpen(false)}>Cancel</Button>
                <Button className="btn-primary">Save Changes</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
