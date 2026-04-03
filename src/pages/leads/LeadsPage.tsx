import React, { useState, useMemo } from 'react';
import { 
  Kanban, 
  List, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowRight, 
  Clock, 
  Users, 
  DollarSign, 
  MapPin, 
  Tag, 
  Calendar, 
  Phone, 
  Mail, 
  MessageCircle, 
  ChevronRight, 
  TrendingUp, 
  UserPlus, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  X, 
  LayoutGrid, 
  GripVertical,
  PhoneCall,
  Video,
  FileText,
  History,
  Send,
  ArrowUpRight,
  Target,
  BarChart3,
  ExternalLink,
  Copy,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { SlideOver } from '@/src/components/ui/SlideOver';
import { Textarea } from '@/src/components/ui/Textarea';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/src/components/ui/DropdownMenu';
import { cn } from '@/src/lib/utils';
import { Lead, LeadStage } from '@/src/types/v3';
import { toast } from 'sonner';

const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    societyName: 'Emerald Heights',
    contactName: 'Rahul Sharma',
    contactEmail: 'rahul@emerald.com',
    contactPhone: '+91 98765 43210',
    address: 'Sector 45, Gurgaon',
    city: 'Gurgaon',
    state: 'Haryana',
    pincode: '122001',
    totalUnits: 450,
    estimatedMRR: 12500,
    expectedValue: 150000,
    planSelected: 'Premium',
    referredBy: { type: 'existing_society', name: 'Green Valley', societyId: 'gv-1' },
    source: 'referral',
    stage: 'new',
    assignedTo: { id: 'admin-1', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    notes: [
      { id: 'n1', text: 'Interested in automated billing features.', author: 'Sarah Chen', createdAt: '2024-03-25T10:30:00Z' }
    ],
    activities: [
      { id: 'a1', type: 'call', description: 'Initial inquiry call', createdAt: '2024-03-25T10:00:00Z' }
    ],
    tags: ['High Priority', 'Referral'],
    nextAction: 'Call tomorrow at 10 AM',
    lastActivityAt: '2024-03-25T10:30:00Z',
    createdAt: '2024-03-25T10:00:00Z',
    updatedAt: '2024-03-25T10:30:00Z'
  },
  {
    id: '2',
    societyName: 'Skyline Residency',
    contactName: 'Anjali Gupta',
    contactEmail: 'anjali@skyline.com',
    contactPhone: '+91 98765 43211',
    address: 'Bandra West, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    totalUnits: 200,
    estimatedMRR: 6000,
    expectedValue: 72000,
    planSelected: 'Standard',
    referredBy: { type: 'self', name: 'Anjali Gupta' },
    source: 'website',
    stage: 'contacted',
    assignedTo: { id: 'admin-2', name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?u=james' },
    notes: [],
    activities: [],
    tags: ['Mumbai', 'Website'],
    nextAction: 'Send proposal by Friday',
    lastActivityAt: '2024-03-22T09:00:00Z',
    createdAt: '2024-03-20T14:30:00Z',
    updatedAt: '2024-03-22T09:00:00Z'
  },
  {
    id: '3',
    societyName: 'Palm Grove Society',
    contactName: 'Vikram Singh',
    contactEmail: 'vikram@palmgrove.com',
    contactPhone: '+91 98765 43212',
    address: 'Whitefield, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560066',
    totalUnits: 800,
    estimatedMRR: 24000,
    expectedValue: 288000,
    planSelected: 'Enterprise',
    referredBy: { type: 'agent', name: 'Agent X', agentCode: 'AX-001' },
    source: 'ad',
    stage: 'demo_scheduled',
    assignedTo: { id: 'admin-1', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    notes: [],
    activities: [],
    tags: ['Large Society', 'Ad'],
    nextAction: 'Demo on April 5th',
    lastActivityAt: '2024-03-24T16:00:00Z',
    createdAt: '2024-03-15T11:00:00Z',
    updatedAt: '2024-03-24T16:00:00Z',
    demoScheduledAt: '2024-04-05T14:00:00Z'
  }
];

const STAGES: { id: LeadStage; label: string; color: string }[] = [
  { id: 'new', label: 'New Lead', color: 'bg-primary' },
  { id: 'contacted', label: 'Contacted', color: 'bg-info-500' },
  { id: 'demo_scheduled', label: 'Demo Scheduled', color: 'bg-warning-500' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-orange-500' },
  { id: 'converted', label: 'Converted', color: 'bg-success-500' }
];

export default function LeadsPage() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [cityFilter, setCityFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = lead.societyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           lead.contactName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = cityFilter === 'all' || lead.city === cityFilter;
      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
      return matchesSearch && matchesCity && matchesSource;
    });
  }, [leads, searchQuery, cityFilter, sourceFilter]);

  const stats = [
    { label: 'Total Leads', value: leads.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Conversion Rate', value: '18.5%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'This Month', value: '12', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Lost Leads', value: '4', icon: AlertCircle, color: 'text-danger-600', bg: 'bg-danger-50' },
  ];

  const cities = Array.from(new Set(leads.map(l => l.city)));
  const sources = Array.from(new Set(leads.map(l => l.source)));

  const handleCardClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Leads Pipeline</h1>
          <p className="text-muted-foreground mt-1">Track and convert society prospects through your sales funnel.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-muted p-1 rounded-lg border border-border">
            <Button 
              variant={view === 'kanban' ? 'secondary' : 'ghost'} 
              size="sm" 
              className="h-8 text-[10px] uppercase font-bold"
              onClick={() => setView('kanban')}
            >
              <Kanban size={14} className="mr-2" /> Pipeline
            </Button>
            <Button 
              variant={view === 'list' ? 'secondary' : 'ghost'} 
              size="sm" 
              className="h-8 text-[10px] uppercase font-bold"
              onClick={() => setView('list')}
            >
              <List size={14} className="mr-2" /> List
            </Button>
          </div>
          <Button className="shadow-sm" onClick={() => setIsAddLeadOpen(true)}>
            <Plus size={18} className="mr-2" /> Add Lead
          </Button>
        </div>
      </div>

      {/* Add Lead SlideOver */}
      <SlideOver
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
        title="Add New Lead"
        description="Enter the details of the new society prospect."
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Society Name</label>
              <Input placeholder="e.g. Emerald Heights" className="text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Person</label>
                <Input placeholder="John Doe" className="text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                <Input placeholder="+91 98765 43210" className="text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
              <Input placeholder="john@society.com" className="text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">City</label>
                <Input placeholder="Mumbai" className="text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">State</label>
                <Input placeholder="Maharashtra" className="text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lead Source</label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="referral">Referral</option>
                  <option value="website">Website</option>
                  <option value="ad">Advertisement</option>
                  <option value="direct">Direct Outreach</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Plan Selected</label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Expected Value (₹)</label>
              <Input type="number" placeholder="150000" className="text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Initial Notes</label>
              <Textarea placeholder="Any specific requirements or context..." className="min-h-[100px] text-sm resize-none" />
            </div>
          </div>

          <div className="pt-6 border-t border-border flex flex-col gap-3">
            <Button className="w-full btn-primary" onClick={() => {
              toast.success('Lead added successfully!');
              setIsAddLeadOpen(false);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Create Lead
            </Button>
            <Button variant="ghost" className="w-full border border-border" onClick={() => setIsAddLeadOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </SlideOver>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 border-border shadow-sm">
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg", stat.bg)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by society or contact..." 
            className="pl-9 bg-muted/50 border-transparent focus:bg-background transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <select 
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[120px]"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <option value="all">All Cities</option>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
          <select 
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[120px]"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="all">All Sources</option>
            {sources.map(source => <option key={source} value={source} className="capitalize">{source}</option>)}
          </select>
          <Button variant="outline" size="sm" className="h-10">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      {view === 'kanban' ? (
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {STAGES.map((stage) => (
            <div key={stage.id} className="flex-shrink-0 w-80 space-y-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", stage.color)} />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stage.label}</h3>
                  <Badge variant="secondary" className="text-[10px] h-5 px-1.5 min-w-[20px] justify-center bg-muted text-muted-foreground">
                    {filteredLeads.filter(l => l.stage === stage.id).length}
                  </Badge>
                </div>
                <div className="text-[10px] font-bold text-muted-foreground">
                  ₹{filteredLeads.filter(l => l.stage === stage.id).reduce((acc, l) => acc + (l.expectedValue || 0), 0).toLocaleString()}
                </div>
              </div>

              <div className="space-y-3 min-h-[600px] p-2 bg-muted/20 rounded-2xl border border-border/50 border-dashed">
                {filteredLeads.filter(l => l.stage === stage.id).map((lead) => (
                  <LeadCard key={lead.id} lead={lead} onClick={() => handleCardClick(lead)} />
                ))}
                <Button variant="ghost" className="w-full h-12 border border-dashed border-border/60 text-[10px] text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                  <Plus size={14} className="mr-2" /> Add Lead
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden border-border p-0 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Society</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Contact</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">Status</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Source</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">City</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id}
                    className="group hover:bg-muted/30 transition-colors cursor-pointer bg-card"
                    onClick={() => handleCardClick(lead)}
                  >
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground">{lead.societyName}</span>
                        <span className="text-xs text-muted-foreground">{lead.planSelected} Plan</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{lead.contactName}</span>
                        <span className="text-xs text-muted-foreground">{lead.contactPhone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Badge variant="secondary" className="capitalize text-[10px] font-semibold">
                        {lead.stage.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className="capitalize text-[10px] border-border text-muted-foreground">
                        {lead.source}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-xs text-muted-foreground font-medium">{lead.city}</td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <MoreVertical size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Lead Detail SlideOver */}
      <SlideOver
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Lead Details"
        description="Full context and activity for this prospect."
        footer={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-danger-600 hover:text-danger-700 hover:bg-danger-50">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close</Button>
              <Button className="bg-primary hover:bg-primary/90">
                <CheckCircle2 className="h-4 w-4 mr-2" /> Mark Converted
              </Button>
            </div>
          </div>
        }
      >
        {selectedLead && (
          <div className="space-y-8">
            {/* Basic Info */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Basic Information</h3>
                <Button variant="ghost" size="sm" className="h-7 text-[10px] text-primary">Edit</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-muted/30 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Society Name</p>
                  <p className="text-sm font-bold text-foreground">{selectedLead.societyName}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Contact Person</p>
                  <p className="text-sm font-bold text-foreground">{selectedLead.contactName}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Phone Number</p>
                  <p className="text-sm font-bold text-foreground">{selectedLead.contactPhone}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Email</p>
                  <p className="text-sm font-bold text-foreground">{selectedLead.contactEmail}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border border-border col-span-2">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">City</p>
                  <p className="text-sm font-bold text-foreground">{selectedLead.city}, {selectedLead.state}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button className="flex-1 bg-success-600 hover:bg-success-700 text-white">
                  <PhoneCall className="h-4 w-4 mr-2" /> Call Now
                </Button>
                <Button className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white">
                  <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                </Button>
              </div>
            </section>

            {/* Deal Info */}
            <section className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Deal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-[10px] text-primary uppercase font-bold tracking-wider mb-1">Expected Value</p>
                  <p className="text-lg font-bold text-primary">₹{selectedLead.expectedValue?.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-xl bg-info-50 border border-info-100">
                  <p className="text-[10px] text-info-600 uppercase font-bold tracking-wider mb-1">Plan Selected</p>
                  <p className="text-lg font-bold text-info-700">{selectedLead.planSelected}</p>
                </div>
              </div>
            </section>

            {/* Next Actions */}
            <section className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Next Actions</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-foreground">Schedule Follow-up Call</p>
                    <p className="text-[10px] text-muted-foreground">Set a reminder for the next touchpoint.</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="p-2 bg-info-100 text-info-600 rounded-lg">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-foreground">Add Meeting Note</p>
                    <p className="text-[10px] text-muted-foreground">Record details from the last conversation.</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </section>

            {/* Activity Timeline */}
            <section className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Activity Timeline</h3>
              <div className="relative space-y-6 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-px before:bg-border">
                {selectedLead.activities.length > 0 ? selectedLead.activities.map((activity, idx) => (
                  <div key={activity.id} className="relative flex gap-4 pl-10">
                    <div className="absolute left-0 p-2 bg-background border border-border rounded-full z-10">
                      {activity.type === 'call' ? <PhoneCall className="h-3.5 w-3.5 text-success-600" /> : <Mail className="h-3.5 w-3.5 text-info-600" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">{activity.description}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{new Date(activity.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <History className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-20" />
                    <p className="text-xs text-muted-foreground">No activity recorded yet.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </SlideOver>
    </div>
  );
}

function LeadCard({ lead, onClick }: { lead: Lead; onClick: () => void }) {
  return (
    <motion.div
      layoutId={lead.id}
      onClick={onClick}
      className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden"
    >
      {/* Quick Actions Hover Overlay */}
      <div className="absolute inset-0 bg-primary/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 z-10">
        <Button size="icon" className="h-10 w-10 rounded-full bg-white text-primary hover:bg-white/90 shadow-lg">
          <PhoneCall size={18} />
        </Button>
        <Button size="icon" className="h-10 w-10 rounded-full bg-white text-[#25D366] hover:bg-white/90 shadow-lg">
          <MessageCircle size={18} />
        </Button>
        <Button size="icon" className="h-10 w-10 rounded-full bg-white text-warning-600 hover:bg-white/90 shadow-lg">
          <Video size={18} />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-bold leading-tight text-foreground">{lead.societyName}</h4>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
              <MapPin size={10} /> {lead.city}
            </div>
          </div>
          <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-wider border-border text-muted-foreground bg-muted/30">
            {lead.source}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
              {lead.contactName.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-foreground">{lead.contactName}</span>
              <span className="text-[9px] text-muted-foreground">{lead.contactPhone}</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-border space-y-3">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">Next Action</span>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-primary">
              <Calendar size={10} /> {lead.nextAction || 'No action set'}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
              <Clock size={10} /> {lead.lastActivityAt ? 'Active 2h ago' : 'New'}
            </div>
            <div className="flex -space-x-1.5">
              <img src={lead.assignedTo.avatar} className="h-5 w-5 rounded-full border-2 border-card" alt="" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
