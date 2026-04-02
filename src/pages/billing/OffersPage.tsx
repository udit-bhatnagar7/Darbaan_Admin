import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  Download, 
  Share2, 
  Eye, 
  Trash2, 
  Edit2, 
  Ban, 
  ChevronRight, 
  Gift, 
  Ticket, 
  Trophy, 
  Medal, 
  Target, 
  Briefcase, 
  GraduationCap, 
  Book, 
  BookOpen, 
  Library, 
  Languages, 
  Cpu, 
  HardDrive, 
  Database, 
  Server, 
  Code, 
  Terminal, 
  AtSign, 
  Percent, 
  Divide, 
  Minus, 
  Equal, 
  Infinity, 
  Sigma, 
  Pi, 
  Calculator, 
  Watch, 
  Timer, 
  AlarmClock, 
  RefreshCw, 
  RefreshCcw, 
  RotateCw, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown, 
  ArrowUpLeft, 
  ArrowDownLeft, 
  ArrowDownRight, 
  ChevronsUp, 
  ChevronsDown, 
  ChevronsLeft, 
  ChevronsRight, 
  Move, 
  Maximize, 
  Minimize, 
  ZoomIn, 
  ZoomOut, 
  Layout, 
  Columns, 
  Rows, 
  Grid, 
  Sidebar, 
  PanelLeft, 
  PanelRight, 
  PanelTop, 
  PanelBottom, 
  AppWindow, 
  MousePointer2, 
  Hand, 
  Fingerprint, 
  Shield, 
  ShieldAlert, 
  ShieldOff, 
  Bug, 
  LifeBuoy, 
  Smile, 
  Frown, 
  Meh, 
  Ghost, 
  Skull, 
  Flame, 
  Lightbulb, 
  Palette, 
  Brush, 
  Eraser, 
  Pencil, 
  PenTool, 
  Scissors, 
  Sticker, 
  Shapes, 
  Component, 
  Box, 
  Layers, 
  Dribbble, 
  Github, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Slack, 
  Figma, 
  Chrome, 
  Framer, 
  Twitch, 
  Trello, 
  Cast, 
  Airplay, 
  Nfc, 
  Rss, 
  Radio, 
  Tv, 
  Headphones, 
  Speaker, 
  Projector, 
  Printer, 
  Mouse, 
  Keyboard, 
  Joystick, 
  Gamepad2, 
  Disc, 
  Usb, 
  Power, 
  Plug, 
  Microchip, 
  CircuitBoard, 
  Binary, 
  GitBranch, 
  GitCommit, 
  GitMerge, 
  GitPullRequest, 
  Webhook, 
  Plane, 
  Train, 
  Bus, 
  Car, 
  Ship, 
  Anchor, 
  Sunrise, 
  Sunset, 
  Mountain, 
  Waves, 
  Trees, 
  Flower2, 
  Leaf, 
  Bird, 
  Cat, 
  Dog, 
  Fish, 
  Rabbit, 
  Turtle, 
  Snail, 
  Worm, 
  Shell, 
  Bone, 
  PawPrint, 
  Footprints, 
  Brain, 
  HeartPulse, 
  Stethoscope, 
  Syringe, 
  Pill, 
  Bandage, 
  Microscope, 
  Dna, 
  TestTube2, 
  FlaskConical, 
  Atom, 
  Orbit, 
  Telescope, 
  Satellite, 
  Space, 
  Gem, 
  Crown, 
  PartyPopper, 
  Cake, 
  IceCream, 
  Pizza, 
  Beer, 
  Wine, 
  GlassWater, 
  ChefHat, 
  Coins, 
  Warehouse, 
  Factory, 
  School, 
  University, 
  Church, 
  Hotel, 
  Hospital, 
  Store, 
  ShoppingBasket, 
  User, 
  UserCheck, 
  UserPlus, 
  MapPin, 
  Sparkles, 
  Zap, 
  Rocket, 
  History, 
  ArrowLeft, 
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/src/components/ui/DropdownMenu';
import { cn } from '@/src/lib/utils';
import { Offer } from '@/src/types/v3';

const MOCK_OFFERS: Offer[] = [
  {
    id: '1',
    code: 'WELCOME50',
    description: '50% off on first month maintenance.',
    societyName: 'Green Valley Residency',
    type: 'percent_off',
    discountType: 'percentage',
    discountValue: 50,
    value: 50,
    applicablePlans: ['basic', 'pro'],
    applicableUserSegments: ['new_societies'],
    maxRedemptions: 100,
    redeemedCount: 45,
    usageCount: 45,
    usageLimit: 100,
    perUserLimit: 1,
    validFrom: '2024-01-01T00:00:00Z',
    validUntil: '2024-12-31T23:59:59Z',
    expiresAt: '2024-12-31T23:59:59Z',
    stackable: false,
    autoApply: false,
    isActive: true,
    status: 'active' as const,
    createdBy: 'admin-1'
  },
  {
    id: '2',
    code: 'EARLYBIRD10',
    description: 'Flat $10 off for early payments.',
    societyName: 'Skyline Heights',
    type: 'fixed_off',
    discountType: 'fixed',
    discountValue: 10,
    value: 10,
    applicablePlans: ['pro', 'enterprise'],
    applicableUserSegments: ['all'],
    maxRedemptions: null,
    redeemedCount: 128,
    usageCount: 128,
    usageLimit: 500,
    perUserLimit: null,
    validFrom: '2024-03-01T00:00:00Z',
    validUntil: null,
    expiresAt: '2024-12-31T23:59:59Z',
    stackable: true,
    autoApply: true,
    isActive: true,
    status: 'active' as const,
    createdBy: 'admin-2'
  },
  {
    id: '3',
    code: 'SUMMER24',
    description: 'Summer special discount on clubhouse fees.',
    societyName: 'Ocean Breeze Apartments',
    type: 'percent_off',
    discountType: 'percentage',
    discountValue: 15,
    value: 15,
    applicablePlans: ['basic'],
    applicableUserSegments: ['existing_societies'],
    maxRedemptions: 50,
    redeemedCount: 50,
    usageCount: 50,
    usageLimit: 50,
    perUserLimit: 1,
    validFrom: '2024-06-01T00:00:00Z',
    validUntil: '2024-08-31T23:59:59Z',
    expiresAt: '2024-08-31T23:59:59Z',
    stackable: false,
    autoApply: false,
    isActive: false,
    status: 'expired',
    createdBy: 'admin-1'
  }
];

export default function OffersPage() {
  const [offers] = useState<Offer[]>(MOCK_OFFERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired' | 'scheduled'>('all');

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.societyName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || offer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Offers', value: offers.length, icon: Tag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Now', value: offers.filter(o => o.isActive).length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Redemptions', value: offers.reduce((acc, o) => acc + o.redeemedCount, 0), icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Avg. Value', value: '25%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Offers & Discounts</h1>
          <p className="text-muted-foreground">Manage promotional codes and special offers for societies.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Offer
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg", stat.bg)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by code, description or society..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b text-muted-foreground font-medium">
                <th className="pb-3 pl-4">Offer Details</th>
                <th className="pb-3">Value</th>
                <th className="pb-3">Usage</th>
                <th className="pb-3">Validity</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOffers.map((offer) => (
                <tr key={offer.id} className="group hover:bg-muted/50 transition-colors">
                  <td className="py-4 pl-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-primary flex items-center gap-1.5">
                        {offer.code}
                        <Copy className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                      </span>
                      <span className="text-xs text-muted-foreground mt-0.5">{offer.societyName}</span>
                      <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">{offer.description}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `$${offer.discountValue}`}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase">{offer.type.replace(/_/g, ' ')}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col gap-1.5 min-w-[100px]">
                      <div className="flex items-center justify-between text-[10px]">
                        <span>{offer.usageCount} / {offer.usageLimit || '∞'}</span>
                        <span>{offer.usageLimit ? Math.round((offer.usageCount! / offer.usageLimit) * 100) : 0}%</span>
                      </div>
                      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
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
                  <td className="py-4">
                    <div className="flex flex-col text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Expires {offer.expiresAt ? new Date(offer.expiresAt).toLocaleDateString() : 'Never'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "capitalize text-[10px] px-2 py-0",
                        offer.status === 'active' && "bg-green-100 text-green-700 hover:bg-green-100",
                        offer.status === 'expired' && "bg-red-100 text-red-700 hover:bg-red-100",
                        offer.status === 'scheduled' && "bg-blue-100 text-blue-700 hover:bg-blue-100"
                      )}
                    >
                      {offer.status}
                    </Badge>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit2 className="mr-2 h-4 w-4" /> Edit Offer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" /> Share Code
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Ban className="mr-2 h-4 w-4" /> Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
