import React from 'react';
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar, 
  Search, 
  Plus, 
  FilePieChart, 
  ShieldCheck, 
  Users, 
  Receipt,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Printer,
  Share2,
  Trash2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { toast } from 'sonner';

const reportCategories = [
  { name: 'Financial', icon: Receipt, color: 'text-emerald-600', bg: 'bg-emerald-50', count: 24 },
  { name: 'Operational', icon: FilePieChart, color: 'text-blue-600', bg: 'bg-blue-50', count: 18 },
  { name: 'Security', icon: ShieldCheck, color: 'text-orange-600', bg: 'bg-orange-50', count: 12 },
  { name: 'Community', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50', count: 32 },
];

const recentReports = [
  {
    id: '1',
    name: 'Monthly Revenue Report - March 2026',
    type: 'Financial',
    format: 'PDF',
    size: '2.4 MB',
    date: 'Apr 01, 2026',
    status: 'Ready',
  },
  {
    id: '2',
    name: 'Visitor Traffic Analysis (Q1)',
    type: 'Security',
    format: 'XLSX',
    size: '1.8 MB',
    date: 'Mar 31, 2026',
    status: 'Ready',
  },
  {
    id: '3',
    name: 'Maintenance Expense Audit',
    type: 'Financial',
    format: 'PDF',
    size: '4.1 MB',
    date: 'Mar 28, 2026',
    status: 'Processing',
  },
  {
    id: '4',
    name: 'Resident Feedback Summary',
    type: 'Community',
    format: 'PDF',
    size: '1.2 MB',
    date: 'Mar 25, 2026',
    status: 'Ready',
  },
  {
    id: '5',
    name: 'Inventory Audit Log',
    type: 'Operational',
    format: 'CSV',
    size: '850 KB',
    date: 'Mar 22, 2026',
    status: 'Ready',
  }
];

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Report generation started. You will be notified when it is ready.');
    }, 1500);
  };

  const handleDownload = (name: string) => {
    toast.success(`Downloading ${name}...`);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary rounded-full text-white shadow-lg shadow-primary/20">
            <FileText size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">Generate and download detailed society reports.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> Schedule Report
          </Button>
          <Button onClick={handleGenerateReport} isLoading={isGenerating}>
            <Plus className="mr-2 h-4 w-4" /> New Report
          </Button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportCategories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5 border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className={cn("p-3 rounded-full transition-colors", cat.bg, cat.color, "group-hover:bg-primary group-hover:text-white")}>
                  <cat.icon size={24} />
                </div>
                <Badge variant="secondary" className="bg-muted/50">{cat.count} Files</Badge>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold tracking-tight">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">View all {cat.name.toLowerCase()} reports</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Reports Table */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border/50 shadow-sm overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>A list of your recently generated reports.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      className="pl-9 h-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 mt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground font-medium border-y border-border">
                    <tr>
                      <th className="px-6 py-3">Report Name</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentReports.map((report) => (
                      <tr key={report.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "p-2 rounded-lg",
                              report.format === 'PDF' ? "bg-rose-50 text-rose-600" : 
                              report.format === 'XLSX' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                            )}>
                              <FileText size={16} />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{report.name}</p>
                              <p className="text-xs text-muted-foreground">{report.format} • {report.size}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="font-normal">{report.type}</Badge>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {report.date}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            {report.status === 'Ready' ? (
                              <>
                                <div className="h-1.5 w-1.5 rounded-full bg-success-500" />
                                <span className="text-success-600 font-medium">{report.status}</span>
                              </>
                            ) : (
                              <>
                                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                                <span className="text-amber-600 font-medium">{report.status}</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground hover:text-primary"
                              onClick={() => handleDownload(report.name)}
                              disabled={report.status !== 'Ready'}
                            >
                              <Download size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                              <Share2 size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t border-border/50 py-3 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Showing 5 of 86 reports</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Quick Generate & Insights */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Quick Generate</CardTitle>
              <CardDescription>Generate common reports with one click.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-between group h-12">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Receipt size={16} />
                  </div>
                  <span>Daily Collection</span>
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="w-full justify-between group h-12">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Users size={16} />
                  </div>
                  <span>Visitor Log (Today)</span>
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="w-full justify-between group h-12">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <AlertCircle size={16} />
                  </div>
                  <span>Incident Summary</span>
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-primary text-white border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FilePieChart size={120} />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">Custom Report Builder</CardTitle>
              <CardDescription className="text-primary-100">
                Need something specific? Use our advanced report builder to create custom data views.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white/20 text-white border-none">Drag & Drop</Badge>
                <Badge className="bg-white/20 text-white border-none">Multi-format</Badge>
                <Badge className="bg-white/20 text-white border-none">Auto-Schedule</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-white text-primary hover:bg-primary-50">
                Open Builder
              </Button>
            </CardFooter>
          </Card>

          <div className="p-4 rounded-xl bg-muted/50 border border-border/50 flex items-start gap-3">
            <div className="p-2 bg-info-50 text-info-600 rounded-full">
              <Printer size={16} />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Print Settings</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Configure default headers, footers, and society logos for all PDF reports.
              </p>
              <Button variant="link" className="h-auto p-0 text-xs text-primary mt-2">
                Configure Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
