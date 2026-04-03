import React, { useState } from 'react';
import { 
  Link2, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Download, 
  Share2, 
  QrCode, 
  Eye, 
  Ban, 
  MessageCircle
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
import { PaymentLink } from '@/src/types/v3';
import { toast } from 'sonner';

const MOCK_LINKS: PaymentLink[] = [
  {
    id: '1',
    title: 'Maintenance Fee - April 2024',
    societyName: 'Green Valley Residency',
    amount: 2500,
    currency: 'INR',
    type: 'one_time',
    description: 'Monthly maintenance charges for April 2024.',
    expiresAt: '2024-04-30T23:59:59Z',
    status: 'active' as const,
    paymentGateway: 'razorpay',
    gatewayLinkUrl: 'https://rzp.io/l/maint-apr',
    url: 'https://rzp.io/l/maint-apr',
    totalCollected: 125000,
    totalPayments: 50,
    reminderSchedule: [
      { daysBefore: 3, type: 'email' },
      { daysBefore: 1, type: 'whatsapp' }
    ]
  },
  {
    id: '2',
    title: 'Clubhouse Membership',
    societyName: 'Skyline Heights',
    amount: 5000,
    currency: 'INR',
    type: 'subscription',
    description: 'Annual clubhouse membership fee.',
    expiresAt: '2024-12-31T23:59:59Z',
    status: 'active' as const,
    paymentGateway: 'stripe',
    gatewayLinkUrl: 'https://buy.stripe.com/clubhouse',
    url: 'https://buy.stripe.com/clubhouse',
    totalCollected: 25000,
    totalPayments: 5,
    reminderSchedule: [
      { daysBefore: 7, type: 'email' }
    ]
  },
  {
    id: '3',
    title: 'Emergency Repair Fund',
    societyName: 'Ocean Breeze Apartments',
    amount: 1000,
    currency: 'INR',
    type: 'one_time',
    description: 'One-time contribution for elevator repairs.',
    expiresAt: '2024-03-15T23:59:59Z',
    status: 'expired' as const,
    paymentGateway: 'manual',
    gatewayLinkUrl: '',
    url: '',
    totalCollected: 45000,
    totalPayments: 45,
    reminderSchedule: []
  }
];

export default function PaymentLinksPage() {
  const [links] = useState<PaymentLink[]>(MOCK_LINKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paid' | 'expired'>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         link.societyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         link.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || link.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Links', value: links.length, icon: Link2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Now', value: links.filter(l => l.status === 'active').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Collected', value: '₹1.95L', icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Conversion Rate', value: '68%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const handleCopyLink = (url: string) => {
    if (!url) {
      toast.error('No URL available to copy');
      return;
    }
    navigator.clipboard.writeText(url);
    toast.success('Payment link copied to clipboard');
  };

  const handleWhatsAppShare = (link: PaymentLink) => {
    if (!link.url) {
      toast.error('No URL available to share');
      return;
    }
    const text = `Please pay ${link.currency} ${link.amount} for ${link.title}. Link: ${link.url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Payment Links</h1>
          <p className="text-muted-foreground mt-1">Create and manage shareable payment links for instant collection.</p>
        </div>
        <Button className="w-full sm:w-auto shadow-sm" onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Payment Link
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
              placeholder="Search by title, society or description..." 
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
                <th className="py-3 pl-4">Link Name</th>
                <th className="py-3">Amount</th>
                <th className="py-3 text-right pr-4">Status</th>
                <th className="py-3">Usage</th>
                <th className="py-3">Created Date</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredLinks.map((link) => (
                <tr key={link.id} className="group hover:bg-muted/40 transition-colors bg-card">
                  <td className="py-4 pl-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground flex items-center gap-2">
                        {link.title}
                        {link.url && (
                          <button 
                            onClick={() => handleCopyLink(link.url)}
                            className="text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                            title="Copy Link"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground mt-0.5">{link.societyName}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">
                        ₹{link.amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "capitalize text-[10px] px-2 py-0.5 font-semibold tracking-wide",
                        link.status === 'active' && "bg-success-100 text-success-700 dark:bg-success-500/20 dark:text-success-400",
                        link.status === 'expired' && "bg-danger-100 text-danger-700 dark:bg-danger-500/20 dark:text-danger-400",
                        link.status === 'paid' && "bg-info-100 text-info-700 dark:bg-info-500/20 dark:text-info-400",
                        link.status === 'pending' && "bg-warning-100 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400"
                      )}
                    >
                      {link.status}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{link.totalPayments} paid</span>
                      <span className="text-[10px] text-muted-foreground">/ ∞ shared</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col text-xs">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(link.expiresAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {link.url && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-success-600" 
                            title="Share on WhatsApp"
                            onClick={() => handleWhatsAppShare(link)}
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-primary" 
                            title="Copy Link"
                            onClick={() => handleCopyLink(link.url)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <QrCode className="mr-2 h-4 w-4" /> Get QR Code
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-danger-600 focus:text-danger-600">
                            <Ban className="mr-2 h-4 w-4" /> Deactivate
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

      {/* Create Payment Link SlideOver */}
      <SlideOver
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Payment Link"
        description="Generate a secure link to collect payments instantly."
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success('Payment link generated successfully!');
              setIsCreateOpen(false);
            }}>Generate Link</Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input placeholder="e.g. Maintenance March 2024" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Amount (₹)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-muted-foreground font-medium">₹</span>
                </div>
                <Input type="number" placeholder="0.00" className="pl-8" inputMode="decimal" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Expiry Date</label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description <span className="text-muted-foreground font-normal">(Optional)</span></label>
              <textarea 
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                placeholder="Add any details about this payment..."
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Advanced Settings</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Attach to Specific Users/Flats <span className="text-muted-foreground font-normal">(Optional)</span></label>
              <Input placeholder="Search users or flat numbers..." />
              <p className="text-xs text-muted-foreground mt-1">If left blank, anyone with the link can pay.</p>
            </div>
          </div>
        </div>
      </SlideOver>
    </div>
  );
}
