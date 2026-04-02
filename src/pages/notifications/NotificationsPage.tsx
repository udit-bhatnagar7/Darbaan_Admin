import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Info, 
  Trash2, 
  Check, 
  Settings, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Globe, 
  Shield, 
  User, 
  CreditCard, 
  Tag, 
  Calendar, 
  ChevronRight, 
  Eye, 
  Archive, 
  Star, 
  Flag, 
  Bookmark, 
  Link, 
  ExternalLink, 
  Share2, 
  Download, 
  RefreshCw, 
  Plus, 
  Minus, 
  X, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  Maximize, 
  Minimize, 
  ZoomIn, 
  ZoomOut, 
  Layout, 
  Grid, 
  List, 
  Kanban, 
  Table, 
  PieChart, 
  BarChart3, 
  LineChart, 
  Activity, 
  Users, 
  UserPlus, 
  UserMinus, 
  UserX, 
  UserCheck, 
  LogOut, 
  LogIn, 
  Key, 
  Lock, 
  Unlock, 
  EyeOff, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldOff, 
  Globe2, 
  Languages, 
  Cpu, 
  HardDrive, 
  Database, 
  Server, 
  Code, 
  Terminal, 
  Smartphone as SmartphoneIcon, 
  Tablet, 
  Laptop, 
  Monitor, 
  Tv, 
  Headphones, 
  Speaker, 
  Camera, 
  Video, 
  Mic, 
  Music, 
  Image, 
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
  Nfc, 
  Battery, 
  BatteryCharging, 
  Power, 
  Plug, 
  Sun, 
  Moon, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Wind, 
  Droplets, 
  Umbrella, 
  Flame, 
  Zap, 
  Thermometer, 
  Map, 
  Compass, 
  Navigation, 
  MapPin, 
  Flag as FlagIcon, 
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
  Bug, 
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
  Rocket, 
  Space, 
  Gem, 
  Crown, 
  Trophy, 
  Medal, 
  Award, 
  PartyPopper, 
  Cake, 
  IceCream, 
  Pizza, 
  Coffee, 
  Beer, 
  Wine, 
  GlassWater, 
  Utensils, 
  ChefHat, 
  ShoppingBag, 
  ShoppingCart, 
  Ticket, 
  Wallet, 
  Banknote, 
  Coins, 
  Briefcase, 
  Building, 
  Building2, 
  Home, 
  Warehouse, 
  Factory, 
  School, 
  University, 
  Library, 
  Church, 
  Hotel, 
  Hospital, 
  Store, 
  ShoppingBasket, 
  MessageCircle, 
  Send, 
  Paperclip, 
  FileText, 
  Files, 
  Folder, 
  FolderPlus, 
  Settings2, 
  Sliders, 
  ToggleLeft, 
  ToggleRight, 
  HelpCircle, 
  AlertTriangle, 
  BellOff, 
  SortAsc, 
  SortDesc, 
  History, 
  Sparkles
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
import { Notification } from '@/src/types/v3';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'New Payment Received',
    body: 'Society "Green Valley" has paid their monthly maintenance fee of ₹2,500.',
    message: 'Society "Green Valley" has paid their monthly maintenance fee of ₹2,500.',
    type: 'payment_received',
    priority: 'high',
    isRead: false,
    status: 'unread',
    createdAt: new Date().toISOString(),
    channel: ['in_app'],
    metadata: { amount: 2500, societyId: 'gv-1' }
  },
  {
    id: '2',
    title: 'Offer Expiring Soon',
    body: 'The "WELCOME50" discount code for "Skyline Heights" will expire in 2 days.',
    message: 'The "WELCOME50" discount code for "Skyline Heights" will expire in 2 days.',
    type: 'offer_expiring',
    priority: 'normal',
    isRead: true,
    status: 'read',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    channel: ['email'],
    metadata: { offerCode: 'WELCOME50' }
  },
  {
    id: '3',
    title: 'System Maintenance',
    body: 'Scheduled maintenance on April 5th, 2024 from 02:00 AM to 04:00 AM IST.',
    message: 'Scheduled maintenance on April 5th, 2024 from 02:00 AM to 04:00 AM IST.',
    type: 'system_alert',
    priority: 'low',
    isRead: false,
    status: 'unread',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    channel: ['in_app'],
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'read'>('all');

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notif.body?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || 
                       (filterType === 'unread' && !notif.isRead) || 
                       (filterType === 'read' && notif.isRead);
    return matchesSearch && matchesType;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true, status: 'read' } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment_received': return <CreditCard className="h-4 w-4 text-green-600" />;
      case 'offer_expiring': return <Tag className="h-4 w-4 text-orange-600" />;
      case 'system_alert': return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive" className="text-[10px] px-1.5 py-0">High</Badge>;
      case 'medium': return <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-[10px] px-1.5 py-0">Medium</Badge>;
      case 'low': return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-[10px] px-1.5 py-0">Low</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with the latest activities and alerts.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true, status: 'read' })))}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search notifications..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={filterType === 'all' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => setFilterType('all')}
            >
              All
            </Button>
            <Button 
              variant={filterType === 'unread' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => setFilterType('unread')}
            >
              Unread
            </Button>
            <Button 
              variant={filterType === 'read' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => setFilterType('read')}
            >
              Read
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={cn(
                    "group relative flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-md",
                    !notification.isRead ? "bg-primary/5 border-primary/20" : "bg-card border-border"
                  )}
                >
                  <div className={cn(
                    "mt-1 p-2 rounded-lg",
                    !notification.isRead ? "bg-primary/10" : "bg-muted"
                  )}>
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={cn(
                        "text-sm font-semibold truncate",
                        !notification.isRead ? "text-primary" : "text-foreground"
                      )}>
                        {notification.title}
                      </h3>
                      {getPriorityBadge(notification.priority || 'low')}
                      {!notification.isRead && (
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {notification.body || notification.message}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 capitalize">
                        {notification.channel?.includes('in_app') ? <Globe className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                        {notification.channel?.join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notification.isRead && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-primary"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" /> Archive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <BellOff className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No notifications found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
