import React, { useState, useEffect } from 'react';
import { 
  Tag, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Copy, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Download, 
  Share2, 
  Eye, 
  Ban, 
  Edit2, 
  Ticket, 
  Zap,
  Percent,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  Gift,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { SlideOver } from '@/src/components/ui/SlideOver';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/src/components/ui/DropdownMenu';
import { cn } from '@/src/lib/utils';
import { Offer } from '@/src/types/v3';
import { toast } from 'sonner';

const MOCK_OFFERS: Offer[] = [
  {
    id: '1',
    code: 'EARLY10',
    description: '10% off for early maintenance payments.',
    societyName: 'Green Valley Residency',
    type: 'percent_off',
    discountType: 'percentage',
    discountValue: 10,
    value: 10,
    applicablePlans: ['maintenance'],
    applicableUserSegments: ['all'],
    maxRedemptions: 500,
    redeemedCount: 124,
    usageLimit: 500,
    usageCount: 124,
    perUserLimit: 1,
    validFrom: '2024-01-01T00:00:00Z',
    validUntil: '2024-12-31T23:59:59Z',
    expiresAt: '2024-12-31T23:59:59Z',
    stackable: false,
    autoApply: false,
    isActive: true,
    status: 'active',
    createdBy: 'admin-1'
  },
  {
    id: '2',
    code: 'WELCOME500',
    description: 'Flat ₹500 off on first clubhouse booking.',
    societyName: 'Skyline Heights',
    type: 'fixed_off',
    discountType: 'fixed',
    discountValue: 500,
    value: 500,
    applicablePlans: ['clubhouse'],
    applicableUserSegments: ['new_residents'],
    maxRedemptions: 100,
    redeemedCount: 45,
    usageLimit: 100,
    usageCount: 45,
    perUserLimit: 1,
    validFrom: '2024-03-01T00:00:00Z',
    validUntil: '2024-06-30T23:59:59Z',
    expiresAt: '2024-06-30T23:59:59Z',
    stackable: true,
    autoApply: false,
    isActive: true,
    status: 'active',
    createdBy: 'admin-2'
  },
  {
    id: '3',
    code: 'SUMMER24',
    description: 'Summer special 15% off on all amenities.',
    societyName: 'Ocean Breeze Apartments',
    type: 'percent_off',
    discountType: 'percentage',
    discountValue: 15,
    value: 15,
    applicablePlans: ['amenities'],
    applicableUserSegments: ['all'],
    maxRedemptions: 200,
    redeemedCount: 200,
    usageLimit: 200,
    usageCount: 200,
    perUserLimit: null,
    validFrom: '2024-06-01T00:00:00Z',
    validUntil: '2024-08-31T23:59:59Z',
    expiresAt: '2024-08-31T23:59:59Z',
    stackable: false,
    autoApply: true,
    isActive: false,
    status: 'expired',
    createdBy: 'admin-1'
  }
];

export default function OffersPage() {
  const [offers] = useState<Offer[]>(MOCK_OFFERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired'>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  // Form State for Preview
  const [formCode, setFormCode] = useState('');
  const [formType, setFormType] = useState<'percentage' | 'fixed'>('percentage');
  const [formValue, setFormValue] = useState<number>(0);

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || offer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Offers', value: offers.length, icon: Ticket, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Now', value: offers.filter(o => o.status === 'active').length, icon: Zap, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Redemptions', value: offers.reduce((acc, o) => acc + o.redeemedCount, 0), icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Avg. Conversion', value: '24.5%', icon: ArrowUpRight, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Promo code ${code} copied!`);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Offers & Codes</h1>
          <p className="text-muted-foreground mt-1">Growth Engine: Boost conversions and encourage early payments.</p>
        </div>
        <Button className="w-full sm:w-auto shadow-sm" onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Offer
        </Button>
      </div>

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

      <Card className="p-0 overflow-hidden border-border shadow-sm">
        <div className="p-4 border-b border-border bg-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by code or description..." 
              className="pl-9 bg-muted/50 border-transparent focus:bg-background transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 pl-4">Code</th>
                <th className="py-3">Discount</th>
                <th className="py-3">Validity</th>
                <th className="py-3">Usage</th>
                <th className="py-3 text-right pr-4">Status</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredOffers.map((offer) => (
                <tr key={offer.id} className="group hover:bg-muted/40 transition-colors bg-card">
                  <td className="py-4 pl-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-primary flex items-center gap-2">
                        {offer.code}
                        <button 
                          onClick={() => handleCopyCode(offer.code)}
                          className="text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                          title="Copy Code"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </span>
                      <span className="text-xs text-muted-foreground mt-0.5 truncate max-w-[200px]">{offer.description}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">
                        {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `₹${offer.discountValue}`}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-tight">OFF</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col text-xs">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {offer.validUntil ? new Date(offer.validUntil).toLocaleDateString() : 'Forever'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 pr-8">
                    <div className="flex flex-col gap-1.5 min-w-[140px] max-w-[180px]">
                      <div className="flex items-center justify-between text-[10px] font-medium">
                        <span className="text-foreground">{offer.usageCount} / {offer.usageLimit || '∞'}</span>
                        <span className="text-muted-foreground">{offer.usageLimit ? Math.round((offer.usageCount! / offer.usageLimit) * 100) : 0}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all duration-500",
                            offer.usageLimit && (offer.usageCount! / offer.usageLimit) > 0.8 ? "bg-orange-500" : "bg-primary"
                          )}
                          style={{ width: `${offer.usageLimit ? Math.min((offer.usageCount! / offer.usageLimit) * 100, 100) : 0}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "capitalize text-[10px] px-2 py-0.5 font-semibold tracking-wide",
                        offer.status === 'active' && "bg-success-100 text-success-700 dark:bg-success-500/20 dark:text-success-400",
                        offer.status === 'expired' && "bg-danger-100 text-danger-700 dark:bg-danger-500/20 dark:text-danger-400",
                        offer.status === 'scheduled' && "bg-info-100 text-info-700 dark:bg-info-500/20 dark:text-info-400"
                      )}
                    >
                      {offer.status}
                    </Badge>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Edit">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> View Performance
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" /> Share with Residents
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-danger-600 focus:text-danger-600">
                            <Ban className="mr-2 h-4 w-4" /> Disable Code
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Offer SlideOver */}
      <SlideOver
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Offer"
        description="Encourage payments with discount codes and special offers."
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success('Offer created successfully!');
              setIsCreateOpen(false);
            }}>Create Offer</Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Code Name</label>
              <Input 
                placeholder="e.g. EARLY10" 
                className="uppercase font-bold tracking-widest"
                value={formCode}
                onChange={(e) => setFormCode(e.target.value.toUpperCase())}
              />
              <p className="text-[10px] text-muted-foreground italic">Users will enter this code at checkout.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Discount Type</label>
                <select 
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as any)}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Flat Amount (₹)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Value</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-muted-foreground font-medium">{formType === 'percentage' ? '%' : '₹'}</span>
                  </div>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    className="pl-8"
                    value={formValue || ''}
                    onChange={(e) => setFormValue(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Preview Box */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Zap className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Live Preview</span>
              </div>
              <p className="text-sm text-foreground">
                On a ₹2,000 maintenance bill, <span className="font-bold">user saves {formType === 'percentage' ? `₹${(2000 * formValue / 100).toLocaleString()}` : `₹${formValue.toLocaleString()}`}</span>.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Valid Till</label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Apply On</label>
              <div className="grid grid-cols-2 gap-2">
                {['Maintenance', 'Clubhouse', 'Amenities', 'Parking', 'All Services'].map((item) => (
                  <label key={item} className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-muted cursor-pointer transition-colors">
                    <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                    <span className="text-xs font-medium">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <label className="text-sm font-medium text-foreground">Description</label>
              <textarea 
                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                placeholder="e.g. Get 10% off if you pay before the 5th of the month."
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-foreground">Auto-Apply</h3>
                <p className="text-[10px] text-muted-foreground">Apply this offer automatically at checkout.</p>
              </div>
              <div className="h-6 w-10 bg-muted rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 h-4 w-4 bg-background rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </SlideOver>
    </div>
  );
}
