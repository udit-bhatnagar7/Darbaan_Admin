import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MoreVertical, 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign, 
  Tag, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  History, 
  FileText, 
  Share2, 
  Building2, 
  UserCheck, 
  TrendingUp, 
  ChevronRight, 
  Save, 
  X,
  Smartphone,
  Monitor,
  Globe,
  GripVertical,
  Ban
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Textarea } from '@/src/components/ui/Textarea';
import { cn } from '@/src/lib/utils';
import { Lead, LeadStage } from '@/src/types/v3';

const MOCK_LEAD: Lead = {
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
    { id: 'n1', text: 'Interested in the Enterprise plan. Needs a demo for the committee.', author: 'Sarah Chen', createdAt: '2024-03-25T11:00:00Z' },
    { id: 'n2', text: 'Followed up via phone. Rahul is the primary contact.', author: 'Sarah Chen', createdAt: '2024-03-26T09:30:00Z' }
  ],
  activities: [
    { id: 'a1', type: 'call', description: 'Initial discovery call completed', createdAt: '2024-03-25T10:30:00Z' },
    { id: 'a2', type: 'email', description: 'Sent welcome kit and plan details', createdAt: '2024-03-25T11:15:00Z' },
    { id: 'a3', type: 'stage_change', description: 'Stage updated from New to Contacted', createdAt: '2024-03-26T09:00:00Z' }
  ],
  tags: ['High Priority', 'Referral'],
  nextAction: 'Call tomorrow at 10 AM',
  lastActivityAt: '2024-03-26T09:30:00Z',
  createdAt: '2024-03-25T10:00:00Z',
  updatedAt: '2024-03-26T09:30:00Z'
};

const STAGES: { id: LeadStage; label: string; color: string }[] = [
  { id: 'new', label: 'New Lead', color: 'bg-primary' },
  { id: 'contacted', label: 'Contacted', color: 'bg-info-500' },
  { id: 'demo_scheduled', label: 'Demo Scheduled', color: 'bg-warning-500' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-orange-500' },
  { id: 'converted', label: 'Converted', color: 'bg-success-500' },
  { id: 'lost', label: 'Lost', color: 'bg-destructive' }
];

export default function LeadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead>(MOCK_LEAD);
  const [activeTab, setActiveTab] = useState<'activity' | 'notes' | 'demo'>('activity');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/leads')}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{lead.societyName}</h1>
              <Badge variant="secondary" className="capitalize text-[10px]">
                {lead.stage.replace('_', ' ')}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><MapPin size={12} /> {lead.city}, {lead.state}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> Created {new Date(lead.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="border border-border">
            <Share2 size={18} className="mr-2" /> Share
          </Button>
          <Button className="btn-primary">
            Convert to Society
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical size={20} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - 60% (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Society Details</h3>
              <Button variant="ghost" size="sm" className="h-8 text-[10px]" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <Save size={14} className="mr-2" /> : <Plus size={14} className="mr-2" />}
                {isEditing ? 'Save Changes' : 'Edit Details'}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="label-text">Contact Person</label>
                  <p className="text-sm font-medium">{lead.contactName}</p>
                </div>
                <div className="space-y-1">
                  <label className="label-text">Email Address</label>
                  <p className="text-sm font-medium flex items-center gap-2">
                    {lead.contactEmail} <Mail size={12} className="text-muted-foreground" />
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="label-text">Phone Number</label>
                  <p className="text-sm font-medium flex items-center gap-2">
                    {lead.contactPhone} <Phone size={12} className="text-muted-foreground" />
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="label-text">Total Units</label>
                  <p className="text-sm font-medium">{lead.totalUnits} Units</p>
                </div>
                <div className="space-y-1">
                  <label className="label-text">Estimated MRR</label>
                  <p className="text-sm font-bold text-success-500">${lead.estimatedMRR.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <label className="label-text">Assigned To</label>
                  <div className="flex items-center gap-2">
                    <img src={lead.assignedTo.avatar} className="h-5 w-5 rounded-full" alt="" />
                    <span className="text-sm font-medium">{lead.assignedTo.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center gap-4 border-b border-border">
              {['activity', 'notes', 'demo'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={cn(
                    "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors relative",
                    activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {activeTab === 'activity' && (
                <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-border">
                  {lead.activities.map((activity) => (
                    <div key={activity.id} className="relative pl-10">
                      <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center z-10">
                        {activity.type === 'call' && <Phone size={14} className="text-primary" />}
                        {activity.type === 'email' && <Mail size={14} className="text-info-500" />}
                        {activity.type === 'stage_change' && <History size={14} className="text-warning-500" />}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-[10px] text-muted-foreground">{new Date(activity.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pl-10">
                    <Button variant="ghost" className="text-[10px] h-8 border border-dashed border-border w-full justify-start">
                      <Plus size={14} className="mr-2" /> Add activity...
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Textarea placeholder="Add an internal note..." className="min-h-[100px] text-xs" />
                    <div className="flex justify-end">
                      <Button className="btn-primary" size="sm">Add Note</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {lead.notes.map((note) => (
                      <Card key={note.id} className="p-4 bg-muted/30 border-border/50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold">{note.author}</span>
                            <span className="text-[10px] text-muted-foreground">• {new Date(note.createdAt).toLocaleDateString()}</span>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical size={12} />
                          </Button>
                        </div>
                        <p className="text-xs leading-relaxed">{note.text}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'demo' && (
                <Card className="p-6 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-warning-50 text-warning-500 rounded-full flex items-center justify-center mb-4">
                      <Calendar size={24} />
                    </div>
                    <h3 className="font-bold">Schedule a Demo</h3>
                    <p className="text-xs text-muted-foreground">Pick a time to showcase the platform to the committee.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="label-text">Date</label>
                      <Input type="date" className="text-xs" />
                    </div>
                    <div className="space-y-2">
                      <label className="label-text">Time</label>
                      <Input type="time" className="text-xs" />
                    </div>
                  </div>
                  <Button className="w-full btn-primary">Schedule & Send Invite</Button>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - 40% */}
        <div className="space-y-6">
          <Card className="p-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Referral Information</h3>
            <div className="p-3 bg-primary/5 rounded-xl border border-primary/20 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary text-white rounded-lg">
                  <UserCheck size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Referred By</p>
                  <p className="text-xs font-bold">{lead.referredBy.name}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground">Type:</span>
                <span className="capitalize">{lead.referredBy.type.replace('_', ' ')}</span>
              </div>
              {lead.referredBy.societyId && (
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">Society ID:</span>
                  <span className="font-mono">{lead.referredBy.societyId}</span>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-2">
              <Button variant="ghost" className="w-full justify-start text-xs h-10 border border-border">
                <FileText size={14} className="mr-3" /> Send Proposal
              </Button>
              <Button variant="ghost" className="w-full justify-start text-xs h-10 border border-border">
                <Globe size={14} className="mr-3" /> Generate Demo Link
              </Button>
              <Button variant="ghost" className="w-full justify-start text-xs h-10 border border-border text-destructive hover:bg-destructive/10">
                <Ban size={14} className="mr-3" /> Mark as Lost
              </Button>
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Similar Societies</h3>
            <div className="space-y-3">
              {[
                { name: 'Royal Residency', units: 420, city: 'Gurgaon' },
                { name: 'Skyview Apartments', units: 380, city: 'Gurgaon' },
                { name: 'Palm Heights', units: 500, city: 'Noida' }
              ].map((soc, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                      <Building2 size={14} className="text-muted-foreground" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold">{soc.name}</span>
                      <span className="text-[8px] text-muted-foreground">{soc.units} Units • {soc.city}</span>
                    </div>
                  </div>
                  <ChevronRight size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
