import React, { useState } from 'react';
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
  GripVertical
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';
import { Lead, LeadStage } from '@/src/types/v3';

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
    referredBy: { type: 'existing_society', name: 'Green Valley', societyId: 'gv-1' },
    source: 'referral_form',
    stage: 'new',
    assignedTo: { id: 'admin-1', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    notes: [],
    activities: [],
    tags: ['High Priority', 'Referral'],
    createdAt: '2024-03-25T10:00:00Z',
    updatedAt: '2024-03-25T10:00:00Z'
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
    referredBy: { type: 'self', name: 'Anjali Gupta' },
    source: 'website',
    stage: 'contacted',
    assignedTo: { id: 'admin-2', name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?u=james' },
    notes: [],
    activities: [],
    tags: ['Mumbai', 'Website'],
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
    referredBy: { type: 'agent', name: 'Agent X', agentCode: 'AX-001' },
    source: 'cold_outreach',
    stage: 'demo_scheduled',
    assignedTo: { id: 'admin-1', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    notes: [],
    activities: [],
    tags: ['Large Society', 'Outreach'],
    createdAt: '2024-03-15T11:00:00Z',
    updatedAt: '2024-03-24T16:00:00Z',
    demoScheduledAt: '2024-04-05T14:00:00Z'
  }
];

const STAGES: { id: LeadStage; label: string; color: string }[] = [
  { id: 'new', label: 'New', color: 'bg-primary' },
  { id: 'contacted', label: 'Contacted', color: 'bg-info-500' },
  { id: 'demo_scheduled', label: 'Demo', color: 'bg-warning-500' },
  { id: 'proposal_sent', label: 'Proposal', color: 'bg-indigo-500' },
  { id: 'negotiating', label: 'Negotiating', color: 'bg-orange-500' },
  { id: 'won', label: 'Won', color: 'bg-success-500' },
  { id: 'lost', label: 'Lost', color: 'bg-destructive' }
];

export default function LeadsPage() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredLeads = leads.filter(lead => 
    lead.societyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Leads Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your society sales pipeline from referral to conversion.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-muted p-1 rounded-lg border border-border">
            <Button 
              variant={view === 'kanban' ? 'secondary' : 'ghost'} 
              size="sm" 
              className="h-8 text-[10px] uppercase font-bold"
              onClick={() => setView('kanban')}
            >
              <Kanban size={14} className="mr-2" /> Kanban
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
          <Button className="btn-primary">
            <Plus size={18} className="mr-2" /> Add Lead
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search leads by society or contact..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="icon" className="border border-border">
          <Filter size={18} />
        </Button>
        <div className="flex-1" />
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-primary" /> 12 Leads
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={14} className="text-success-500" /> $45,000 MRR
          </div>
        </div>
      </div>

      {view === 'kanban' ? (
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {STAGES.map((stage) => (
            <div key={stage.id} className="flex-shrink-0 w-80 space-y-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", stage.color)} />
                  <h3 className="text-xs font-bold uppercase tracking-wider">{stage.label}</h3>
                  <Badge variant="secondary" className="text-[10px] h-5 px-1.5 min-w-[20px] justify-center">
                    {filteredLeads.filter(l => l.stage === stage.id).length}
                  </Badge>
                </div>
                <div className="text-[10px] font-bold text-muted-foreground">
                  ${filteredLeads.filter(l => l.stage === stage.id).reduce((acc, l) => acc + l.estimatedMRR, 0).toLocaleString()}
                </div>
              </div>

              <div className="space-y-3 min-h-[500px] p-2 bg-muted/30 rounded-xl border border-border/50 border-dashed">
                {filteredLeads.filter(l => l.stage === stage.id).map((lead) => (
                  <LeadCard key={lead.id} lead={lead} onClick={() => navigate(`/leads/${lead.id}`)} />
                ))}
                <Button variant="ghost" className="w-full h-10 border border-dashed border-border text-[10px] text-muted-foreground hover:border-primary/50 hover:text-primary">
                  <Plus size={14} className="mr-2" /> Add Card
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden border-border p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Society</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Contact</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Stage</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Units</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Est. MRR</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Assigned To</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id}
                    className="group border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => navigate(`/leads/${lead.id}`)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">{lead.societyName}</span>
                        <span className="text-[10px] text-muted-foreground">{lead.city}, {lead.state}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">{lead.contactName}</span>
                        <span className="text-[10px] text-muted-foreground">{lead.contactEmail}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="capitalize text-[10px]">
                        {lead.stage.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium">{lead.totalUnits}</td>
                    <td className="px-4 py-3 text-xs font-bold text-success-500">${lead.estimatedMRR.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={lead.assignedTo.avatar} className="h-5 w-5 rounded-full" alt="" />
                        <span className="text-xs">{lead.assignedTo.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
    </div>
  );
}

function LeadCard({ lead, onClick }: { lead: Lead; onClick: () => void }) {
  return (
    <motion.div
      layoutId={lead.id}
      onClick={onClick}
      className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="text-xs font-bold leading-tight group-hover:text-primary transition-colors">{lead.societyName}</h4>
          <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical size={12} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {lead.tags.map((tag) => (
            <span key={tag} className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-muted text-muted-foreground rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <MapPin size={10} /> {lead.city}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <Users size={10} /> {lead.totalUnits} Units
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-success-500">${lead.estimatedMRR.toLocaleString()}</div>
            <div className="flex -space-x-1.5">
              <img src={lead.assignedTo.avatar} className="h-5 w-5 rounded-full border-2 border-card" alt="" />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-border flex items-center justify-between text-[8px] font-bold uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={10} /> {new Date(lead.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1 group-hover:text-primary transition-colors">
            Details <ArrowRight size={10} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
