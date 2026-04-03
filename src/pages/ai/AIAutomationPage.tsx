import React from 'react';
import { 
  Settings, 
  Plus, 
  Play, 
  Pause, 
  Trash2, 
  Zap, 
  Bot, 
  MessageSquare, 
  ShieldCheck, 
  Receipt,
  ArrowRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  BrainCircuit
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Switch } from '@/src/components/ui/Switch';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const stats = [
  { label: 'Total Workflows', value: '12', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Tasks', value: '8', icon: Play, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Tasks Executed (24h)', value: '1,284', icon: Bot, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Success Rate', value: '99.8%', icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const workflows = [
  {
    id: '1',
    name: 'Auto-Approve Verified Staff',
    description: 'Automatically approve entry for staff members with valid background checks.',
    icon: ShieldCheck,
    status: 'active',
    lastRun: '2 mins ago',
    category: 'Security',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'Smart Expense Categorization',
    description: 'AI-driven categorization of society expenses based on invoice content.',
    icon: Receipt,
    status: 'active',
    lastRun: '1 hour ago',
    category: 'Finance',
    color: 'bg-emerald-500'
  },
  {
    id: '3',
    name: 'Auto-Reply to Common Queries',
    description: 'AI chatbot handles routine resident queries about amenities and rules.',
    icon: MessageSquare,
    status: 'paused',
    lastRun: 'Yesterday',
    category: 'Communication',
    color: 'bg-purple-500'
  },
  {
    id: '4',
    name: 'Anomalous Activity Detection',
    description: 'Identify and alert security for unusual visitor patterns or gate activity.',
    icon: AlertCircle,
    status: 'active',
    lastRun: 'Just now',
    category: 'Security',
    color: 'bg-rose-500'
  }
];

const templates = [
  { name: 'Visitor Pre-screening', description: 'AI-based risk assessment for visitors.', icon: ShieldCheck },
  { name: 'Maintenance Scheduler', description: 'Predictive maintenance based on usage.', icon: Clock },
  { name: 'Energy Optimizer', description: 'Smart lighting and AC control.', icon: Zap },
];

export default function AIAutomationPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-600 rounded-full text-white shadow-lg shadow-purple-500/20">
            <BrainCircuit size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Automation</h1>
            <p className="text-muted-foreground mt-1">Configure automated workflows and AI-driven tasks.</p>
          </div>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/20">
          <Plus className="mr-2 h-4 w-4" /> Create Workflow
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5 border-border/50 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-full", stat.bg, stat.color)}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Workflows */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Active Workflows</h2>
            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {workflows.map((workflow, i) => (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Card className="group hover:shadow-md transition-all border-border/50 overflow-hidden">
                  <div className="p-5 flex items-start gap-4">
                    <div className={cn("p-3 rounded-full text-white shrink-0 shadow-lg", workflow.color)}>
                      <workflow.icon size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg truncate">{workflow.name}</h3>
                          <Badge variant={workflow.status === 'active' ? 'success' : 'secondary'} className="text-[10px] uppercase tracking-wider">
                            {workflow.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={workflow.status === 'active'} />
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical size={16} />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {workflow.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> Last run: {workflow.lastRun}
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap size={12} className="text-amber-500" /> {workflow.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Templates & Quick Actions */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">AI Templates</h2>
            <div className="space-y-3">
              {templates.map((template, i) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <Card className="p-4 hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <template.icon size={18} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">{template.name}</h4>
                        <p className="text-xs text-muted-foreground">{template.description}</p>
                      </div>
                      <ArrowRight size={14} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            <Button variant="outline" className="w-full border-dashed border-purple-200 text-purple-600 hover:bg-purple-50">
              Browse Template Library
            </Button>
          </div>

          <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap size={120} />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <CardDescription className="text-purple-100">
                Let Darbaan AI suggest new automations based on your society's activity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-sm border border-white/20">
                "I noticed high visitor traffic on weekends. Should I enable 'Smart Weekend Gate Management'?"
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-white text-purple-700 hover:bg-purple-50">
                Analyze Activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
