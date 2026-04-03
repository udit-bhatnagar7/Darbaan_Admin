import React from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  Zap, 
  Clock, 
  History, 
  Settings2, 
  CheckCircle2, 
  Play, 
  Bell, 
  Truck,
  ArrowRight,
  MoreVertical,
  Activity
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Switch } from '@/src/components/ui/Switch';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const suggestions = [
  {
    id: 1,
    title: 'Send payment reminders to 12 users',
    description: '12 residents in Block B have pending dues for over 15 days. AI recommends sending a gentle reminder.',
    type: 'Billing',
    icon: Bell,
    impact: 'High',
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
  },
  {
    id: 2,
    title: 'Assign vendor for plumbing complaint #452',
    description: 'New high-priority plumbing issue reported. AI recommends "CleanPro Services" based on availability and rating.',
    type: 'Maintenance',
    icon: Truck,
    impact: 'Medium',
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30'
  },
  {
    id: 3,
    title: 'Optimize security shift schedule',
    description: 'AI detected overlap in morning shifts. Suggested optimization could save 4 hours of redundant staffing.',
    type: 'Operations',
    icon: BrainCircuit,
    impact: 'Medium',
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/30'
  }
];

const activityLog = [
  {
    id: 1,
    action: 'Auto-assigned vendor',
    target: 'Electrical Complaint #448',
    time: '12 mins ago',
    status: 'Completed'
  },
  {
    id: 2,
    action: 'Sent 24 reminders',
    target: 'Monthly Maintenance Dues',
    time: '2 hours ago',
    status: 'Completed'
  },
  {
    id: 3,
    action: 'Generated report',
    target: 'Q1 Financial Summary',
    time: '5 hours ago',
    status: 'Completed'
  },
  {
    id: 4,
    action: 'Blocked entry',
    target: 'Unauthorized Vehicle MH-04-1234',
    time: 'Yesterday',
    status: 'Flagged'
  }
];

export default function AIInsightsPage() {
  const [automationRules, setAutomationRules] = React.useState({
    reminders: true,
    vendorAssignment: false,
    securityAlerts: true,
    visitorPreCheck: true
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-600 rounded-xl text-white shadow-lg shadow-purple-500/20">
            <BrainCircuit size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Control Center</h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AI Engine is active and monitoring society operations.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 border-purple-200 dark:border-purple-900/30 text-purple-600 dark:text-purple-400">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Chat Assistant
          </Button>
          <Button size="sm" className="h-9 bg-purple-600 hover:bg-purple-700 text-white">
            <Zap className="mr-2 h-4 w-4" />
            Run Full Audit
          </Button>
        </div>
      </div>

      {/* AI Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 border-purple-100 dark:border-purple-900/20 bg-gradient-to-br from-white to-purple-50/30 dark:from-card dark:to-purple-950/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
              <Zap size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tasks Automated Today</p>
              <h2 className="text-3xl font-bold">42</h2>
            </div>
          </div>
        </Card>
        <Card className="p-6 border-emerald-100 dark:border-emerald-900/20 bg-gradient-to-br from-white to-emerald-50/30 dark:from-card dark:to-emerald-950/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Time Saved (Est.)</p>
              <h2 className="text-3xl font-bold">12.5 hrs</h2>
            </div>
          </div>
        </Card>
        <Card className="p-6 border-amber-100 dark:border-amber-900/20 bg-gradient-to-br from-white to-amber-50/30 dark:from-card dark:to-amber-950/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
              <Sparkles size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Suggestions Pending</p>
              <h2 className="text-3xl font-bold">8</h2>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* AI Suggestions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="text-purple-500" size={18} />
              AI Recommendations
            </h3>
            <Button variant="ghost" size="sm" className="text-muted-foreground">Dismiss All</Button>
          </div>
          
          <div className="space-y-4">
            {suggestions.map((suggestion, idx) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-5 hover:shadow-md transition-all border-l-4 border-l-purple-500 group">
                  <div className="flex items-start gap-4">
                    <div className={cn("p-3 rounded-xl shrink-0", suggestion.color)}>
                      <suggestion.icon size={24} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">
                          {suggestion.type}
                        </Badge>
                        <Badge className={cn(
                          "text-[10px] font-bold uppercase tracking-wider",
                          suggestion.impact === 'High' ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
                        )}>
                          {suggestion.impact} Impact
                        </Badge>
                      </div>
                      <h4 className="font-bold text-lg">{suggestion.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {suggestion.description}
                      </p>
                      <div className="pt-4 flex items-center gap-3">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white h-8 px-4">
                          <Play className="mr-2 h-3.5 w-3.5 fill-current" />
                          Execute Action
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-4">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Automation Rules & Log */}
        <div className="space-y-6">
          {/* Automation Rules */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold flex items-center gap-2">
                <Settings2 size={18} className="text-muted-foreground" />
                Automation Rules
              </h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Auto Reminders</p>
                  <p className="text-xs text-muted-foreground">Send dues reminders automatically</p>
                </div>
                <Switch 
                  checked={automationRules.reminders} 
                  onCheckedChange={(val) => setAutomationRules(prev => ({ ...prev, reminders: val }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Auto Vendor Assignment</p>
                  <p className="text-xs text-muted-foreground">Assign vendors to complaints</p>
                </div>
                <Switch 
                  checked={automationRules.vendorAssignment} 
                  onCheckedChange={(val) => setAutomationRules(prev => ({ ...prev, vendorAssignment: val }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Security Alerts</p>
                  <p className="text-xs text-muted-foreground">Flag unauthorized entries</p>
                </div>
                <Switch 
                  checked={automationRules.securityAlerts} 
                  onCheckedChange={(val) => setAutomationRules(prev => ({ ...prev, securityAlerts: val }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Visitor Pre-Check</p>
                  <p className="text-xs text-muted-foreground">Verify visitor IDs via AI</p>
                </div>
                <Switch 
                  checked={automationRules.visitorPreCheck} 
                  onCheckedChange={(val) => setAutomationRules(prev => ({ ...prev, visitorPreCheck: val }))}
                />
              </div>
            </div>
          </Card>

          {/* AI Activity Log */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold flex items-center gap-2">
                <History size={18} className="text-muted-foreground" />
                AI Activity Log
              </h3>
              <Activity size={16} className="text-purple-500 animate-pulse" />
            </div>
            <div className="space-y-6">
              {activityLog.map((log) => (
                <div key={log.id} className="relative pl-6 pb-6 last:pb-0">
                  {/* Timeline Line */}
                  <div className="absolute left-[7px] top-2 bottom-0 w-[2px] bg-border last:hidden" />
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-purple-500 bg-card" />
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold">{log.action}</p>
                      <span className="text-[10px] text-muted-foreground">{log.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{log.target}</p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                      <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">{log.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-xs h-8">View Full Audit Log</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
