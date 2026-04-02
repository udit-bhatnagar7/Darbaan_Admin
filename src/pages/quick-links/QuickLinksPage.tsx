import React, { useState } from 'react';
import { 
  Link as LinkIcon, 
  Copy, 
  ExternalLink, 
  MoreVertical, 
  Plus, 
  Search, 
  Filter, 
  QrCode, 
  BarChart3, 
  Trash2, 
  Check,
  X,
  Share2,
  Download,
  Calendar,
  Lock,
  ArrowRight,
  Globe,
  Mail,
  MessageCircle,
  Smartphone,
  Monitor,
  Tablet,
  MousePointer2,
  Clock,
  CreditCard,
  Receipt,
  UserPlus,
  Building2,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Switch } from '@/src/components/ui/Switch';
import { cn } from '@/src/lib/utils';
import { QuickLink, QuickLinkType } from '@/src/types/v3';

const MOCK_LINKS: QuickLink[] = [
  {
    id: '1',
    type: 'subscription',
    label: 'Pro Plan Annual Offer',
    slug: 'pro-annual-2024',
    destination: '/billing/plans/pro',
    usedCount: 45,
    maxUses: 100,
    isActive: true,
    createdBy: { id: 'admin-1', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    createdAt: '2024-03-15T10:00:00Z',
    expiresAt: '2024-12-31T23:59:59Z',
    metadata: {}
  },
  {
    id: '2',
    type: 'onboarding',
    label: 'Society Welcome Kit',
    slug: 'welcome-society-alpha',
    destination: '/onboarding/welcome',
    usedCount: 12,
    isActive: true,
    createdBy: { id: 'admin-2', name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?u=james' },
    createdAt: '2024-03-20T14:30:00Z',
    metadata: {}
  },
  {
    id: '3',
    type: 'payment',
    label: 'Maintenance Fee Link',
    slug: 'pay-maint-apr',
    destination: 'https://checkout.stripe.com/pay/abc',
    usedCount: 89,
    isActive: false,
    createdBy: { id: 'admin-1', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    createdAt: '2024-03-01T09:00:00Z',
    expiresAt: '2024-04-30T23:59:59Z',
    metadata: {}
  }
];

export default function QuickLinksPage() {
  const [links, setLinks] = useState<QuickLink[]>(MOCK_LINKS);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<QuickLink | null>(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredLinks = links.filter(link => 
    link.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Quick Links</h1>
          <p className="text-sm text-muted-foreground mt-1">Generate and manage shareable links for your ecosystem.</p>
        </div>
        <Button onClick={() => setIsWizardOpen(true)} className="btn-primary">
          <Plus size={18} className="mr-2" />
          Generate Link
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search links by label or slug..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="icon" className="border border-border">
          <Filter size={18} />
        </Button>
      </div>

      <Card className="overflow-hidden border-border p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Type</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Label</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Slug</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Uses</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expires</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Created By</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLinks.map((link) => (
                <React.Fragment key={link.id}>
                  <tr 
                    className={cn(
                      "group border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer",
                      expandedRow === link.id && "bg-muted/50"
                    )}
                    onClick={() => setExpandedRow(expandedRow === link.id ? null : link.id)}
                  >
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="capitalize text-[10px]">
                        {link.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-medium">{link.label}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 group/slug">
                        <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-primary">
                          /{link.slug}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 opacity-0 group-hover/slug:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(`nexus.run/l/${link.slug}`);
                          }}
                        >
                          <Copy size={12} />
                        </Button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium">
                        {link.usedCount} <span className="text-muted-foreground">/ {link.maxUses || '∞'}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {link.expiresAt ? new Date(link.expiresAt).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-4 py-3">
                      <Switch 
                        checked={link.isActive} 
                        onCheckedChange={(checked) => {
                          setLinks(prev => prev.map(l => l.id === link.id ? { ...l, isActive: checked } : l));
                        }} 
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={link.createdBy.avatar} className="h-5 w-5 rounded-full" alt="" />
                        <span className="text-xs">{link.createdBy.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLink(link);
                            setIsAnalyticsOpen(true);
                          }}
                        >
                          <BarChart3 size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <AnimatePresence>
                    {expandedRow === link.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <td colSpan={8} className="px-4 py-4 bg-muted/20 border-b border-border">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                              <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Link Details</h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Full URL:</span>
                                  <span className="font-mono text-primary">nexus.run/l/{link.slug}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Destination:</span>
                                  <span className="truncate max-w-[150px]">{link.destination}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Created:</span>
                                  <span>{new Date(link.createdAt).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">QR Code</h4>
                              <div className="flex items-center gap-4">
                                <div className="p-2 bg-white rounded-lg border border-border">
                                  <QRCodeSVG value={`https://nexus.run/l/${link.slug}`} size={80} />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <Button variant="ghost" size="sm" className="h-8 text-[10px]">
                                    <Download size={12} className="mr-1" /> PNG
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 text-[10px]">
                                    <Download size={12} className="mr-1" /> SVG
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Quick Actions</h4>
                              <div className="flex flex-wrap gap-2">
                                <Button variant="secondary" size="sm" className="h-8 text-[10px]">
                                  <Share2 size={12} className="mr-1" /> Share
                                </Button>
                                <Button variant="secondary" size="sm" className="h-8 text-[10px]">
                                  <MessageCircle size={12} className="mr-1" /> WhatsApp
                                </Button>
                                <Button variant="secondary" size="sm" className="h-8 text-[10px]">
                                  <Mail size={12} className="mr-1" /> Email
                                </Button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Wizard Modal */}
      <AnimatePresence>
        {isWizardOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            >
              <QuickLinkWizard onClose={() => setIsWizardOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Analytics Slide Panel */}
      <AnimatePresence>
        {isAnalyticsOpen && selectedLink && (
          <div className="fixed inset-0 z-50 flex justify-end bg-background/20 backdrop-blur-[2px]">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-xl bg-card border-l border-border shadow-2xl h-full overflow-y-auto"
            >
              <LinkAnalyticsPanel link={selectedLink} onClose={() => setIsAnalyticsOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuickLinkWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'custom' as QuickLinkType,
    label: '',
    slug: '',
    destination: '',
    expiry: 'never',
    expiryDate: '',
    maxUses: '',
    password: '',
    utmSource: '',
    utmCampaign: ''
  });

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">Choose Link Type</h2>
              <p className="text-sm text-muted-foreground">Select the purpose of your new shareable link.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'subscription', label: 'Subscription', icon: CreditCard, desc: 'Direct plan signup' },
                { id: 'payment', label: 'Payment', icon: Receipt, desc: 'One-time checkout' },
                { id: 'onboarding', label: 'Onboarding', icon: UserPlus, desc: 'New society setup' },
                { id: 'society', label: 'Society', icon: Building2, desc: 'Community portal' },
                { id: 'offer', label: 'Offer', icon: Tag, desc: 'Discounted signup' },
                { id: 'custom', label: 'Custom', icon: Globe, desc: 'Any destination URL' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setFormData({ ...formData, type: type.id as QuickLinkType });
                    setStep(2);
                  }}
                  className={cn(
                    "flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all",
                    formData.type === type.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg mb-3",
                    formData.type === type.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  )}>
                    <type.icon size={20} />
                  </div>
                  <span className="font-bold text-sm">{type.label}</span>
                  <span className="text-[10px] text-muted-foreground">{type.desc}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="label-text">Link Label</label>
                <Input 
                  placeholder="e.g. Summer Sale 2024" 
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="label-text">Slug</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">/</span>
                    <Input 
                      className="pl-6 font-mono text-xs" 
                      placeholder="auto-generated"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="label-text">Destination</label>
                  <Input 
                    placeholder="Internal route or URL" 
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="label-text">Expiry</label>
                  <select 
                    className="input-base text-xs"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                  >
                    <option value="never">Never Expires</option>
                    <option value="date">Specific Date</option>
                    <option value="uses">After N Uses</option>
                  </select>
                </div>
                {formData.expiry === 'date' && (
                  <div className="space-y-2">
                    <label className="label-text">Expiry Date</label>
                    <Input type="date" className="text-xs" />
                  </div>
                )}
                {formData.expiry === 'uses' && (
                  <div className="space-y-2">
                    <label className="label-text">Max Uses</label>
                    <Input type="number" placeholder="100" className="text-xs" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="label-text">Password Protection</label>
                  <Switch />
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-4 border-t border-border">
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} className="btn-primary">Continue</Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 py-4">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-success-50 text-success-500 rounded-full flex items-center justify-center mb-4">
                <Check size={24} />
              </div>
              <h2 className="text-xl font-bold">Link Ready to Share!</h2>
              <p className="text-sm text-muted-foreground">Your link has been generated and is now active.</p>
            </div>

            <div className="bg-muted/30 p-4 rounded-xl border border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Shareable URL</span>
                <Badge variant="secondary" className="text-[10px]">Active</Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-card border border-border px-3 py-2 rounded-lg font-mono text-xs text-primary truncate">
                  nexus.run/l/{formData.slug || 'pro-annual-2024'}
                </div>
                <Button size="icon" className="shrink-0">
                  <Copy size={16} />
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-2xl border border-border shadow-sm">
                <QRCodeSVG value={`https://nexus.run/l/${formData.slug || 'pro-annual-2024'}`} size={160} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button variant="secondary" className="text-xs">
                <MessageCircle size={14} className="mr-2" /> WhatsApp
              </Button>
              <Button variant="secondary" className="text-xs">
                <Mail size={14} className="mr-2" /> Email
              </Button>
              <Button variant="secondary" className="text-xs">
                <Download size={14} className="mr-2" /> QR Code
              </Button>
            </div>

            <Button onClick={onClose} className="w-full btn-primary">Done</Button>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <LinkIcon size={20} />
          </div>
          <h3 className="font-bold">Link Wizard</h3>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={cn(
                "h-1.5 w-8 rounded-full transition-all",
                s === step ? "bg-primary" : s < step ? "bg-primary/40" : "bg-muted"
              )} 
            />
          ))}
        </div>
      </div>
      {renderStep()}
    </div>
  );
}

function LinkAnalyticsPanel({ link, onClose }: { link: QuickLink, onClose: () => void }) {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <BarChart3 size={20} />
          </div>
          <div>
            <h3 className="font-bold">Link Analytics</h3>
            <p className="text-xs text-muted-foreground">{link.label}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Clicks</span>
          <div className="text-2xl font-bold">{link.usedCount}</div>
          <div className="text-[10px] text-success-500 flex items-center gap-1">
            <ArrowRight size={10} className="-rotate-45" /> +12% from last week
          </div>
        </Card>
        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Unique Users</span>
          <div className="text-2xl font-bold">{Math.floor(link.usedCount * 0.8)}</div>
          <div className="text-[10px] text-muted-foreground">80% conversion rate</div>
        </Card>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Traffic Sources</h4>
        <div className="space-y-3">
          {[
            { label: 'Direct', value: 45, color: 'bg-primary' },
            { label: 'Email', value: 25, color: 'bg-info-500' },
            { label: 'WhatsApp', value: 20, color: 'bg-success-500' },
            { label: 'Social', value: 10, color: 'bg-warning-500' }
          ].map((source) => (
            <div key={source.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-medium">{source.label}</span>
                <span className="text-muted-foreground">{source.value}%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full", source.color)} style={{ width: `${source.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Device Breakdown</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-xl">
            <Smartphone size={16} className="text-muted-foreground" />
            <span className="text-[10px] font-bold">65%</span>
            <span className="text-[8px] uppercase text-muted-foreground">Mobile</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-xl">
            <Monitor size={16} className="text-muted-foreground" />
            <span className="text-[10px] font-bold">28%</span>
            <span className="text-[8px] uppercase text-muted-foreground">Desktop</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-xl">
            <Tablet size={16} className="text-muted-foreground" />
            <span className="text-[10px] font-bold">7%</span>
            <span className="text-[8px] uppercase text-muted-foreground">Tablet</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recent Activity</h4>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
              <div className="space-y-0.5">
                <p className="text-xs font-medium">Click from Mumbai, India</p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Smartphone size={10} /> Chrome / Android</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {i * 5} mins ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button variant="ghost" className="w-full text-xs text-primary">
        View Full Report <ArrowRight size={14} className="ml-2" />
      </Button>
    </div>
  );
}
