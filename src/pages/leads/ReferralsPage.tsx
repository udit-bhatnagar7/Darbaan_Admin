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
  ChevronRight, 
  Download, 
  Share2, 
  ExternalLink, 
  Copy, 
  Eye, 
  Trash2, 
  Edit2, 
  Save, 
  Undo, 
  Redo, 
  Maximize2, 
  Minimize2, 
  LayoutGrid, 
  List, 
  Kanban, 
  GripVertical, 
  MessageSquare, 
  PieChart, 
  BarChart3, 
  Activity, 
  Settings, 
  Bell, 
  LogOut, 
  Menu, 
  Sun, 
  Moon, 
  Monitor, 
  Laptop, 
  Tablet, 
  Phone, 
  Plus, 
  Ban, 
  Check, 
  X, 
  Smartphone, 
  User, 
  Building, 
  Map, 
  Hash, 
  MapPin, 
  Tag, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  MoreHorizontal, 
  HelpCircle, 
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
  Link2, 
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
  Flame, 
  Zap, 
  History, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
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
  ShoppingBasket
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';
import { Referral } from '@/src/types/v3';

const MOCK_REFERRALS: Referral[] = [
  {
    id: '1',
    referrerId: 'u1',
    referredId: 's1',
    referredName: 'Green Valley Residency',
    status: 'converted',
    rewardAmount: 5000,
    rewardStatus: 'paid',
    createdAt: '2024-01-15T10:30:00Z',
    convertedAt: '2024-02-01T15:45:00Z'
  },
  {
    id: '2',
    referrerId: 'u1',
    referredId: 's2',
    referredName: 'Skyline Heights',
    status: 'pending',
    rewardAmount: 5000,
    rewardStatus: 'pending',
    createdAt: '2024-03-10T09:15:00Z'
  },
  {
    id: '3',
    referrerId: 'u2',
    referredId: 's3',
    referredName: 'Ocean Breeze Apartments',
    status: 'contacted',
    rewardAmount: 5000,
    rewardStatus: 'pending',
    createdAt: '2024-03-20T14:20:00Z'
  }
];

export default function ReferralsPage() {
  const [referrals] = useState<Referral[]>(MOCK_REFERRALS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReferrals = referrals.filter(ref => 
    ref.referredName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Total Referrals', value: referrals.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Converted', value: referrals.filter(r => r.status === 'converted').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Rewards Paid', value: '₹15,000', icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Success Rate', value: '33%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Referral Program</h1>
          <p className="text-muted-foreground">Track and manage society referrals and rewards.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Gift className="mr-2 h-4 w-4" />
          New Referral
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
              placeholder="Search referrals..." 
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
                <th className="pb-3 pl-4">Referred Society</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Reward</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredReferrals.map((referral) => (
                <tr key={referral.id} className="group hover:bg-muted/50 transition-colors">
                  <td className="py-4 pl-4 font-medium">{referral.referredName}</td>
                  <td className="py-4">
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "capitalize",
                        referral.status === 'converted' && "bg-green-100 text-green-700 hover:bg-green-100",
                        referral.status === 'pending' && "bg-orange-100 text-orange-700 hover:bg-orange-100",
                        referral.status === 'contacted' && "bg-blue-100 text-blue-700 hover:bg-blue-100"
                      )}
                    >
                      {referral.status}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium">₹{referral.rewardAmount.toLocaleString()}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{referral.rewardStatus}</span>
                    </div>
                  </td>
                  <td className="py-4 text-muted-foreground">
                    {new Date(referral.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
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
