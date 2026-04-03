import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Briefcase, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  ShieldCheck, 
  Zap, 
  FileText, 
  MessageSquare, 
  Ban,
  ChevronRight,
  ArrowLeft,
  X,
  Upload,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { SlideOver } from '@/src/components/ui/SlideOver';
import { cn } from '@/src/lib/utils';
import { Vendor, VendorCategory, VendorStatus } from '@/src/types/v3';
import { toast } from 'sonner';

const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'QuickFix Plumbing Solutions',
    category: 'plumbing',
    phone: '+91 98765 43210',
    email: 'contact@quickfix.com',
    address: '123, Service Lane, Sector 45, Gurgaon',
    rating: 4.8,
    jobsCompleted: 156,
    successRate: 98,
    lastJobDate: '2024-03-28',
    responseTime: '45m',
    totalEarned: 45000,
    pendingAmount: 0,
    status: 'active',
    isVerified: true,
    isTopPerformer: true,
    isRecommended: true,
    hasFastResponse: true,
    hasHighComplaintRate: false,
    documents: [
      { id: 'd1', name: 'Identity Proof', type: 'PDF', url: '#', uploadedAt: '2023-10-15' },
      { id: 'd2', name: 'Trade License', type: 'PDF', url: '#', uploadedAt: '2023-10-15' }
    ],
    recentJobs: [
      { id: 'j1', title: 'Main Pipe Leakage', date: '2024-03-28', status: 'completed', amount: 1200 },
      { id: 'j2', title: 'Bathroom Fitting', date: '2024-03-25', status: 'completed', amount: 3500 }
    ],
    complaintHistory: [
      { id: 'c1', title: 'Delayed Arrival', date: '2024-01-10', description: 'Arrived 30 mins late without notice.', status: 'resolved' }
    ],
    createdAt: '2023-10-15T10:00:00Z',
    updatedAt: '2024-03-28T14:30:00Z'
  },
  {
    id: 'v2',
    name: 'ElectroSafe Services',
    category: 'electrical',
    phone: '+91 99887 76655',
    email: 'service@electrosafe.in',
    address: 'B-45, Industrial Area, Noida',
    rating: 3.2,
    jobsCompleted: 42,
    successRate: 85,
    lastJobDate: '2024-03-20',
    responseTime: '4h',
    totalEarned: 12500,
    pendingAmount: 2500,
    status: 'active',
    isVerified: true,
    isTopPerformer: false,
    isRecommended: false,
    hasFastResponse: false,
    hasHighComplaintRate: true,
    documents: [
      { id: 'd3', name: 'ID Proof', type: 'JPG', url: '#', uploadedAt: '2024-01-05' }
    ],
    recentJobs: [
      { id: 'j3', title: 'Short Circuit Repair', date: '2024-03-20', status: 'completed', amount: 800 }
    ],
    complaintHistory: [
      { id: 'c2', title: 'Poor Workmanship', date: '2024-03-15', description: 'Wiring was left messy.', status: 'pending' }
    ],
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-03-20T16:00:00Z'
  }
];

export default function VendorMasterPage() {
  const [vendors, setVendors] = useState<Vendor[]>(MOCK_VENDORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const filteredVendors = useMemo(() => {
    return vendors.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            v.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || v.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [vendors, searchQuery, categoryFilter, statusFilter]);

  const getStatusBadge = (status: VendorStatus) => {
    switch (status) {
      case 'active': return <Badge className="bg-success-50 text-success-700 border-success-100">Active</Badge>;
      case 'inactive': return <Badge className="bg-muted text-muted-foreground border-border">Inactive</Badge>;
      case 'blocked': return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Blocked</Badge>;
    }
  };

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Vendor added successfully!');
    setIsAddOpen(false);
    setFormStep(1);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Vendor Master</h1>
          <p className="text-muted-foreground mt-1">Manage, track, and assign vendors with intelligence.</p>
        </div>
        <Button className="btn-primary shadow-sm" onClick={() => setIsAddOpen(true)}>
          <Plus size={18} className="mr-2" /> Add Vendor
        </Button>
      </div>

      {/* Top Bar: Search & Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or category..." 
            className="pl-9 bg-muted/50 border-transparent focus:bg-background transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          <select 
            className="h-10 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="cleaning">Cleaning</option>
            <option value="security">Security</option>
          </select>
          <select 
            className="h-10 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
          <Button variant="outline" size="sm" className="h-10 border-border">
            <Filter size={16} className="mr-2" /> More Filters
          </Button>
        </div>
      </div>

      {/* Vendor List Table */}
      <Card className="overflow-hidden border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Vendor</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Contact</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Performance</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Activity</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Payments</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredVendors.map((vendor) => (
                <tr 
                  key={vendor.id} 
                  className="hover:bg-muted/20 transition-colors cursor-pointer group"
                  onClick={() => {
                    setSelectedVendor(vendor);
                    setIsDetailOpen(true);
                  }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 border border-primary/20">
                        {vendor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{vendor.name}</span>
                          <div className="flex gap-1">
                            {vendor.isTopPerformer && (
                              <Badge className="bg-warning-50 text-warning-700 border-warning-100 text-[8px] h-4 px-1">Top Performer</Badge>
                            )}
                            {vendor.isRecommended && (
                              <Badge className="bg-primary/10 text-primary border-primary/20 text-[8px] h-4 px-1">Recommended</Badge>
                            )}
                            {vendor.isVerified && (
                              <Badge className="bg-success-50 text-success-700 border-success-100 text-[8px] h-4 px-1 flex items-center gap-0.5">
                                <ShieldCheck size={8} /> Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-medium bg-muted/50">{vendor.category}</Badge>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all">
                        <Phone size={14} />
                      </Button>
                      <span className="text-xs font-medium text-muted-foreground">{vendor.phone}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Star size={14} className={cn("fill-current", vendor.rating >= 4 ? "text-warning-500" : "text-destructive")} />
                        <span className="text-sm font-bold">{vendor.rating}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{vendor.jobsCompleted} jobs completed</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock size={12} /> {vendor.lastJobDate ? new Date(vendor.lastJobDate).toLocaleDateString() : 'No jobs'}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <div className="flex items-center gap-1 text-[10px] font-medium text-info-600">
                          <Zap size={10} /> {vendor.responseTime} response
                        </div>
                        {vendor.hasHighComplaintRate && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-destructive">
                            <AlertCircle size={10} /> High Complaints
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-foreground">₹{vendor.totalEarned.toLocaleString()}</p>
                      {vendor.pendingAmount > 0 && (
                        <p className="text-[10px] font-bold text-destructive flex items-center gap-1">
                          <AlertCircle size={10} /> ₹{vendor.pendingAmount.toLocaleString()} pending
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(vendor.status)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Briefcase size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit size={16} />
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
      </Card>

      {/* Vendor Detail SlideOver */}
      <SlideOver
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Vendor Intelligence"
        description="Detailed performance and management view."
      >
        {selectedVendor && (
          <div className="space-y-8 pb-20">
            {/* Basic Info */}
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl border border-primary/20">
                {selectedVendor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">{selectedVendor.name}</h2>
                  {getStatusBadge(selectedVendor.status)}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-muted/50">{selectedVendor.category}</Badge>
                  {selectedVendor.isVerified && (
                    <Badge className="bg-success-50 text-success-700 border-success-100 flex items-center gap-1">
                      <ShieldCheck size={10} /> Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="grid grid-cols-2 gap-3">
              {selectedVendor.isRecommended && (
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-2xl flex items-center gap-2">
                  <div className="p-1.5 bg-primary text-white rounded-lg">
                    <TrendingUp size={14} />
                  </div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Recommended</span>
                </div>
              )}
              {selectedVendor.hasFastResponse && (
                <div className="p-3 bg-info-50 border border-info-200 rounded-2xl flex items-center gap-2">
                  <div className="p-1.5 bg-info-500 text-white rounded-lg">
                    <Zap size={14} />
                  </div>
                  <span className="text-[10px] font-bold text-info-700 uppercase tracking-wider">Fast Response</span>
                </div>
              )}
              {selectedVendor.hasHighComplaintRate && (
                <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-2xl flex items-center gap-2 col-span-2">
                  <div className="p-1.5 bg-destructive text-white rounded-lg">
                    <AlertCircle size={14} />
                  </div>
                  <span className="text-[10px] font-bold text-destructive uppercase tracking-wider">High Complaint Rate Warning</span>
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Rating</p>
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-warning-500 text-warning-500" />
                  <span className="text-lg font-bold">{selectedVendor.rating}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Jobs</p>
                <p className="text-lg font-bold">{selectedVendor.jobsCompleted}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Success</p>
                <p className="text-lg font-bold text-success-600">{selectedVendor.successRate}%</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Contact & Location</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-muted rounded-lg text-muted-foreground"><Phone size={14} /></div>
                  {selectedVendor.phone}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-muted rounded-lg text-muted-foreground"><Mail size={14} /></div>
                  {selectedVendor.email}
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="p-2 bg-muted rounded-lg text-muted-foreground mt-0.5"><MapPin size={14} /></div>
                  {selectedVendor.address}
                </div>
              </div>
            </div>

            {/* Payments */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Financial Summary</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Earned</p>
                  <p className="text-xl font-bold">₹{selectedVendor.totalEarned.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Pending</p>
                  <p className={cn("text-xl font-bold", selectedVendor.pendingAmount > 0 ? "text-destructive" : "text-foreground")}>
                    ₹{selectedVendor.pendingAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Recent Jobs</h4>
              <div className="space-y-3">
                {selectedVendor.recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-xl border border-border/50">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold">{job.title}</p>
                      <p className="text-[10px] text-muted-foreground">{new Date(job.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold">₹{job.amount}</p>
                      <Badge variant="success" className="text-[8px] h-4 px-1 uppercase">Completed</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Documents</h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedVendor.documents.map((doc) => (
                  <div key={doc.id} className="p-3 bg-muted/20 rounded-xl border border-border/50 flex items-center gap-3 group cursor-pointer hover:border-primary/50 transition-all">
                    <div className="p-2 bg-background rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <FileText size={16} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-bold truncate">{doc.name}</p>
                      <p className="text-[8px] text-muted-foreground uppercase">{doc.type} • {doc.uploadedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border flex gap-3">
              <Button className="flex-1 btn-primary">
                <Briefcase size={16} className="mr-2" /> Assign Job
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 border-border">
                <Phone size={18} className="text-primary" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 border-border">
                <MessageSquare size={18} className="text-info-500" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 border-border text-destructive hover:bg-destructive/10">
                <Ban size={18} />
              </Button>
            </div>
          </div>
        )}
      </SlideOver>

      {/* Add Vendor SlideOver */}
      <SlideOver
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          setFormStep(1);
        }}
        title={formStep === 1 ? "Basic Information" : formStep === 2 ? "Business Info" : "Verification"}
        description={`Step ${formStep} of 3: ${formStep === 1 ? 'Personal and contact details' : formStep === 2 ? 'Service and pricing details' : 'Documents and verification'}`}
      >
        <div className="flex flex-col h-full">
          {/* Progress Bar */}
          <div className="flex gap-1 mb-8">
            {[1, 2, 3].map((step) => (
              <div 
                key={step} 
                className={cn(
                  "h-1 flex-1 rounded-full transition-all duration-300",
                  step <= formStep ? "bg-primary" : "bg-muted"
                )} 
              />
            ))}
          </div>

          <form onSubmit={handleAddVendor} className="flex-1 space-y-6">
            <AnimatePresence mode="wait">
              {formStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Vendor Name</label>
                    <Input placeholder="Full name or company name" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Category</label>
                    <select className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="cleaning">Cleaning</option>
                      <option value="security">Security</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Phone</label>
                      <Input placeholder="+91 00000 00000" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email</label>
                      <Input type="email" placeholder="vendor@example.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Address</label>
                    <Input placeholder="Full business address" required />
                  </div>
                </motion.div>
              )}

              {formStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Service Type</label>
                    <Input placeholder="e.g. Residential Plumbing, Industrial Electrical" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Availability</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['24/7', 'Weekdays', 'Weekends', 'On-call'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className="p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-xs font-medium"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Base Pricing (Optional)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                      <Input placeholder="0.00" className="pl-7" />
                    </div>
                    <p className="text-[10px] text-muted-foreground italic">Starting price for standard service calls.</p>
                  </div>
                </motion.div>
              )}

              {formStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Document Upload</label>
                    <div className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                      <div className="p-3 bg-primary/10 text-primary rounded-full">
                        <Upload size={24} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold">Click to upload documents</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">ID Proof, License, Certifications (PDF, JPG)</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-success-50 border border-success-200 rounded-2xl flex items-start gap-3">
                    <div className="p-1.5 bg-success-500 text-white rounded-lg shrink-0">
                      <Check size={14} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-success-700">Mark as Verified</p>
                      <p className="text-[10px] text-success-600 leading-relaxed">
                        By checking this, you confirm that you have manually verified the vendor's documents and background.
                      </p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 rounded border-success-300 text-success-600 focus:ring-success-500 mt-1" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-8 border-t border-border flex items-center justify-between">
              {formStep > 1 ? (
                <Button type="button" variant="ghost" onClick={() => setFormStep(prev => prev - 1)}>
                  <ArrowLeft size={16} className="mr-2" /> Back
                </Button>
              ) : (
                <Button type="button" variant="ghost" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
              )}
              
              {formStep < 3 ? (
                <Button type="button" className="btn-primary" onClick={() => setFormStep(prev => prev + 1)}>
                  Next Step <ChevronRight size={16} className="ml-2" />
                </Button>
              ) : (
                <Button type="submit" className="btn-primary">
                  Generate Vendor <Check size={16} className="ml-2" />
                </Button>
              )}
            </div>
          </form>
        </div>
      </SlideOver>
    </div>
  );
}
