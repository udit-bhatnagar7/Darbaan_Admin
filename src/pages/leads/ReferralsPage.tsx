import React, { useState } from 'react';
import { 
  Gift, 
  Users, 
  TrendingUp, 
  Award, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  Building2, 
  UserCheck, 
  UserPlus,
  ChevronRight, 
  Download, 
  Share2, 
  ExternalLink, 
  Copy, 
  Eye, 
  Trash2, 
  Plus, 
  X, 
  Smartphone, 
  User, 
  Building, 
  MapPin, 
  Tag, 
  Calendar, 
  Link2, 
  Send, 
  Mail,
  MessageCircle,
  Trophy,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Textarea } from '@/src/components/ui/Textarea';
import { SlideOver } from '@/src/components/ui/SlideOver';
import { cn } from '@/src/lib/utils';
import { Referral } from '@/src/types/v3';
import { toast } from 'sonner';

const MOCK_REFERRALS: Referral[] = [
  {
    id: '1',
    referrerId: 'u1',
    referrerName: 'Rahul Sharma',
    referredName: 'Green Valley Residency',
    status: 'converted',
    rewardAmount: 500,
    rewardDescription: '₹500 Referral Bonus',
    rewardStatus: 'paid',
    createdAt: '2024-01-15T10:30:00Z',
    convertedAt: '2024-02-01T15:45:00Z'
  },
  {
    id: '2',
    referrerId: 'u1',
    referrerName: 'Rahul Sharma',
    referredName: 'Skyline Heights',
    status: 'pending',
    rewardAmount: 500,
    rewardDescription: '₹500 Referral Bonus',
    rewardStatus: 'pending',
    createdAt: '2024-03-10T09:15:00Z'
  },
  {
    id: '3',
    referrerId: 'u2',
    referrerName: 'Anjali Gupta',
    referredName: 'Ocean Breeze Apartments',
    status: 'converted',
    rewardAmount: 500,
    rewardDescription: '₹500 Referral Bonus',
    rewardStatus: 'pending',
    createdAt: '2024-03-20T14:20:00Z'
  }
];

export default function ReferralsPage() {
  const [referrals] = useState<Referral[]>(MOCK_REFERRALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const filteredReferrals = referrals.filter(ref => 
    ref.referredName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.referrerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Total Referrals', value: referrals.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Successful', value: referrals.filter(r => r.status === 'converted').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Rewards Earned', value: '₹1,500', icon: Trophy, color: 'text-warning-600', bg: 'bg-warning-50' },
  ];

  const referralLink = "https://app.society.com/ref/RAHUL123";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied to clipboard!');
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Referrals</h1>
          <p className="text-muted-foreground mt-1">Grow the community and earn rewards for every successful conversion.</p>
        </div>
        <Button className="shadow-sm" onClick={() => setIsInviteOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Society
        </Button>
      </div>

      <SlideOver
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite a Society"
        description="Fill in the details below to send a referral invitation."
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Society Name</label>
              <Input placeholder="e.g. Green Valley Residency" className="text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Person</label>
              <Input placeholder="e.g. John Doe" className="text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                <Input placeholder="+91 98765 43210" className="text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                <Input placeholder="john@society.com" className="text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">City</label>
              <Input placeholder="e.g. Mumbai" className="text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Personal Message (Optional)</label>
              <Textarea 
                placeholder="Hi, I think our society management platform would be a great fit for your society..." 
                className="min-h-[120px] text-sm resize-none"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-border flex flex-col gap-3">
            <Button className="w-full btn-primary" onClick={() => {
              toast.success('Invitation sent successfully!');
              setIsInviteOpen(false);
            }}>
              <Send className="mr-2 h-4 w-4" />
              Send Invitation
            </Button>
            <Button variant="ghost" className="w-full border border-border" onClick={() => setIsInviteOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </SlideOver>

      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 border-border shadow-sm">
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-2xl", stat.bg)}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Referral Link Card */}
        <Card className="lg:col-span-1 p-6 border-primary/20 bg-primary/5 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="h-24 w-24 text-primary" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Your Referral Link
              </h3>
              <p className="text-sm text-muted-foreground">Share this link with society admins to earn ₹500 per conversion.</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-background border border-primary/20 shadow-inner">
                <code className="text-xs font-mono text-primary flex-1 truncate">{referralLink}</code>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10" onClick={copyToClipboard}>
                  <Copy size={14} />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white shadow-sm">
                  <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                </Button>
                <Button variant="outline" className="flex-1 border-border shadow-sm">
                  <Mail className="h-4 w-4 mr-2" /> Email
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-primary/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Progress to Bonus</span>
                <span className="text-[10px] font-bold text-primary">2/5 Referrals</span>
              </div>
              <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[40%] rounded-full" />
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 italic">3 more successful referrals to earn a ₹1,000 bonus!</p>
            </div>
          </div>
        </Card>

        {/* Referral List */}
        <Card className="lg:col-span-2 border-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold text-foreground">Referral History</h3>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search history..." 
                className="pl-9 bg-muted/50 border-transparent focus:bg-background transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Society Name</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Referred By</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">Status</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">Reward</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredReferrals.length > 0 ? filteredReferrals.map((referral) => (
                  <tr key={referral.id} className="group hover:bg-muted/30 transition-colors bg-card">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground">{referral.referredName}</span>
                        <span className="text-[10px] text-muted-foreground">{new Date(referral.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                          {referral.referrerName.charAt(0)}
                        </div>
                        <span className="text-xs font-medium text-foreground">{referral.referrerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "capitalize text-[10px] font-semibold px-2 py-0.5",
                          referral.status === 'converted' ? "bg-success-50 text-success-700 border-success-100" : "bg-warning-50 text-warning-700 border-warning-100"
                        )}
                      >
                        {referral.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-foreground">₹{referral.rewardAmount.toLocaleString()}</span>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-[8px] font-bold uppercase tracking-wider mt-1",
                            referral.rewardStatus === 'paid' ? "text-success-600 border-success-200 bg-success-50/50" : "text-muted-foreground border-border bg-muted/30"
                          )}
                        >
                          {referral.rewardStatus}
                        </Badge>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Users className="h-8 w-8 opacity-20" />
                        <p className="text-sm">No referrals found matching your search.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
