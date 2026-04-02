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
  AlertCircle, 
  DollarSign, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  Download, 
  Share2, 
  QrCode, 
  Eye, 
  Trash2, 
  Edit2, 
  Ban, 
  ChevronRight, 
  CreditCard, 
  Wallet, 
  Banknote, 
  Receipt, 
  FileText, 
  Files, 
  Folder, 
  FolderPlus, 
  Image, 
  Video, 
  Music, 
  Mic, 
  Camera, 
  Navigation, 
  Compass, 
  Flag, 
  Bookmark, 
  Link, 
  Paperclip, 
  Send, 
  Inbox, 
  Archive, 
  Trash, 
  Lock, 
  Unlock, 
  EyeOff, 
  UserMinus, 
  UserX, 
  Settings2, 
  Sliders, 
  ToggleLeft, 
  ToggleRight, 
  CheckSquare, 
  Square, 
  Circle, 
  Play, 
  Pause, 
  StopCircle, 
  FastForward, 
  Rewind, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Wifi, 
  WifiOff, 
  Bluetooth, 
  Battery, 
  BatteryCharging, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Wind, 
  Thermometer, 
  Droplets, 
  Umbrella, 
  Coffee, 
  Utensils, 
  ShoppingBag, 
  ShoppingCart, 
  Package, 
  Truck, 
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
  Tag, 
  Gift, 
  Star, 
  Heart, 
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
import { PaymentLink } from '@/src/types/v3';

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payment Links</h1>
          <p className="text-muted-foreground">Create and manage shareable payment links for societies.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Link
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
              placeholder="Search by title, society or description..." 
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
                <th className="pb-3 pl-4">Link Details</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Performance</th>
                <th className="pb-3">Expiry</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredLinks.map((link) => (
                <tr key={link.id} className="group hover:bg-muted/50 transition-colors">
                  <td className="py-4 pl-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-primary flex items-center gap-1.5">
                        {link.title}
                        <Copy className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                      </span>
                      <span className="text-xs text-muted-foreground mt-0.5">{link.societyName}</span>
                      <span className="text-[10px] text-muted-foreground truncate max-w-[200px]">{link.description}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-lg">
                        {link.currency} {link.amount.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase">{link.type.replace(/_/g, ' ')}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium">{link.totalPayments} payments</span>
                      <span className="text-[10px] text-muted-foreground">Collected: {link.currency} {link.totalCollected?.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(link.expiresAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "capitalize text-[10px] px-2 py-0",
                        link.status === 'active' && "bg-green-100 text-green-700 hover:bg-green-100",
                        link.status === 'expired' && "bg-red-100 text-red-700 hover:bg-red-100",
                        link.status === 'paid' && "bg-blue-100 text-blue-700 hover:bg-blue-100",
                        link.status === 'pending' && "bg-orange-100 text-orange-700 hover:bg-orange-100"
                      )}
                    >
                      {link.status}
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
                          <QrCode className="mr-2 h-4 w-4" /> Get QR Code
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" /> Share Link
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
