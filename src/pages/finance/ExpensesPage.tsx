import React from 'react';
import { 
  Receipt, 
  Plus, 
  Download, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  CreditCard, 
  Banknote,
  Calendar,
  Tag,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const expenses = [
  { id: 'EXP-101', date: '2024-03-28', description: 'Electricity Bill - Common Area', category: 'Utilities', amount: 45000, status: 'Paid', method: 'Bank Transfer' },
  { id: 'EXP-102', date: '2024-03-25', description: 'Security Staff Salary - March', category: 'Staff', amount: 120000, status: 'Paid', method: 'NEFT' },
  { id: 'EXP-103', date: '2024-03-22', description: 'Elevator Maintenance AMC', category: 'Maintenance', amount: 15000, status: 'Pending', method: 'Cheque' },
  { id: 'EXP-104', date: '2024-03-20', description: 'Garden Landscaping Supplies', category: 'Maintenance', amount: 8500, status: 'Paid', method: 'Cash' },
  { id: 'EXP-105', date: '2024-03-18', description: 'Legal Consultation Fee', category: 'Legal', amount: 25000, status: 'Paid', method: 'Bank Transfer' },
  { id: 'EXP-106', date: '2024-03-15', description: 'Water Tank Cleaning', category: 'Utilities', amount: 12000, status: 'Pending', method: 'Cheque' }
];

const categories = [
  { name: 'Utilities', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { name: 'Staff', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { name: 'Maintenance', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { name: 'Legal', color: 'bg-rose-50 text-rose-600 border-rose-100' },
  { name: 'Admin', color: 'bg-slate-50 text-slate-600 border-slate-100' }
];

export default function ExpensesPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-600 rounded-xl text-white shadow-lg shadow-rose-500/20">
            <Receipt size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Expense Management</h1>
            <p className="text-muted-foreground mt-1">Track and manage all society expenditures and bills.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button size="sm" className="h-9 bg-rose-600 hover:bg-rose-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Expenses (MTD)</p>
            <div className="p-1.5 bg-rose-50 text-rose-600 rounded-md">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">₹2,45,500</h3>
            <p className="text-[10px] text-rose-600 font-medium">+12.5% from last month</p>
          </div>
        </Card>
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pending Bills</p>
            <div className="p-1.5 bg-amber-50 text-amber-600 rounded-md">
              <Clock size={14} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">₹27,000</h3>
            <p className="text-[10px] text-muted-foreground">2 bills awaiting payment</p>
          </div>
        </Card>
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Budget Utilization</p>
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
              <Wallet size={14} />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">68%</h3>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[68%]" />
            </div>
          </div>
        </Card>
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cash on Hand</p>
            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md">
              <Banknote size={14} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">₹1,15,000</h3>
            <p className="text-[10px] text-emerald-600 font-medium">Safe liquidity level</p>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4 space-y-4">
            <h4 className="font-bold text-sm flex items-center gap-2">
              <Filter size={16} className="text-muted-foreground" />
              Quick Filters
            </h4>
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Categories</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, i) => (
                  <button key={i} className={cn("px-2 py-1 rounded-md text-[10px] font-bold border transition-all hover:opacity-80", cat.color)}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 pt-2 border-t">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Status</p>
              <div className="space-y-1">
                {['Paid', 'Pending', 'Overdue'].map((status, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer group">
                    <div className="h-4 w-4 rounded border border-muted-foreground/30 group-hover:border-rose-500 transition-colors" />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-slate-900 text-white overflow-hidden relative">
            <div className="relative z-10 space-y-4">
              <div className="p-2 bg-white/10 rounded-lg w-fit">
                <AlertCircle size={20} className="text-rose-400" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Budget Alert</h4>
                <p className="text-xs text-slate-400">Utilities expense has exceeded the monthly budget by 15%.</p>
              </div>
              <Button size="sm" variant="secondary" className="w-full text-xs h-8">
                Review Budget
              </Button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Receipt size={120} />
            </div>
          </Card>
        </div>

        {/* Expense List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="text-rose-500" size={18} />
              Recent Expenditures
            </h3>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search description or ID..." 
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
                    <th className="px-4 py-3">Date / ID</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {expenses.map((exp, idx) => (
                    <motion.tr 
                      key={exp.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-muted/30 transition-colors group"
                    >
                      <td className="px-4 py-3">
                        <div className="space-y-0.5">
                          <p className="font-medium">{exp.date}</p>
                          <p className="text-[10px] text-muted-foreground">{exp.id}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-0.5">
                          <p className="font-medium truncate max-w-[200px]">{exp.description}</p>
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <CreditCard size={10} />
                            {exp.method}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={cn(
                          "text-[10px] font-bold",
                          categories.find(c => c.name === exp.category)?.color
                        )}>
                          {exp.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-bold text-rose-600">
                        ₹{exp.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {exp.status === 'Paid' ? (
                            <CheckCircle2 size={14} className="text-emerald-500" />
                          ) : (
                            <Clock size={14} className="text-amber-500" />
                          )}
                          <span className={cn(
                            "text-xs font-medium",
                            exp.status === 'Paid' ? "text-emerald-600" : "text-amber-600"
                          )}>{exp.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye size={14} className="text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download size={14} className="text-emerald-600" />
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
    </div>
  );
}

function Eye({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
