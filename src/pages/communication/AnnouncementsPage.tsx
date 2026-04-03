import React from 'react';
import { 
  Bell, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  Users, 
  Eye, 
  Edit2, 
  Trash2, 
  Megaphone, 
  Send,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Info,
  ArrowRight,
  Pin
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { toast } from 'sonner';

const stats = [
  { label: 'Total Sent', value: '142', icon: Send, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Now', value: '3', icon: Megaphone, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Scheduled', value: '5', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Read Rate', value: '84%', icon: Eye, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const announcements = [
  {
    id: '1',
    title: 'Annual General Meeting 2026',
    content: 'The Annual General Meeting for the year 2026 is scheduled for April 15th at the Community Hall.',
    type: 'Critical',
    audience: 'All Residents',
    date: 'Apr 02, 2026',
    status: 'Published',
    views: 428,
    isPinned: true,
  },
  {
    id: '2',
    title: 'Water Supply Maintenance',
    content: 'There will be a scheduled water supply maintenance on Sunday, April 5th from 10 AM to 4 PM.',
    type: 'Warning',
    audience: 'Block A & B',
    date: 'Apr 01, 2026',
    status: 'Published',
    views: 312,
    isPinned: false,
  },
  {
    id: '3',
    title: 'New Security Protocol',
    content: 'Starting next week, all visitors must provide a digital invite code for entry.',
    type: 'Info',
    audience: 'All Residents',
    date: 'Mar 30, 2026',
    status: 'Scheduled',
    views: 0,
    isPinned: false,
  },
  {
    id: '4',
    title: 'Community Yoga Session',
    content: 'Join us for a relaxing yoga session every Saturday morning at the Central Park.',
    type: 'Event',
    audience: 'All Residents',
    date: 'Mar 28, 2026',
    status: 'Published',
    views: 156,
    isPinned: false,
  },
  {
    id: '5',
    title: 'Lift Maintenance - Block C',
    content: 'Lift #2 in Block C will be under maintenance for the next 48 hours.',
    type: 'Warning',
    audience: 'Block C Residents',
    date: 'Mar 25, 2026',
    status: 'Expired',
    views: 89,
    isPinned: false,
  }
];

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'Critical': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Warning': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Event': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Info': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Critical': return <AlertTriangle size={14} />;
      case 'Warning': return <Clock size={14} />;
      case 'Event': return <Calendar size={14} />;
      case 'Info': return <Info size={14} />;
      default: return <Bell size={14} />;
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-600 rounded-full text-white shadow-lg shadow-cyan-500/20">
            <Bell size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Announcements</h1>
            <p className="text-muted-foreground mt-1">Manage and track all society announcements.</p>
          </div>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700 shadow-lg shadow-cyan-500/20">
          <Plus className="mr-2 h-4 w-4" /> Create Announcement
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5 border-border/50 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-full", stat.bg, stat.color)}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Announcements List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-bold tracking-tight">Recent Announcements</h2>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search announcements..."
                  className="pl-9 h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {announcements.map((announcement, i) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Card className={cn(
                  "group hover:shadow-md transition-all border-border/50 overflow-hidden relative",
                  announcement.isPinned && "border-l-4 border-l-cyan-500"
                )}>
                  {announcement.isPinned && (
                    <div className="absolute top-2 right-2 text-cyan-500">
                      <Pin size={14} className="fill-current" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={cn("flex items-center gap-1.5 px-2 py-0.5 font-medium border", getTypeStyles(announcement.type))}>
                          {getTypeIcon(announcement.type)}
                          {announcement.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users size={12} /> {announcement.audience}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant={
                          announcement.status === 'Published' ? 'success' : 
                          announcement.status === 'Scheduled' ? 'info' : 'secondary'
                        } className="text-[10px] uppercase tracking-wider">
                          {announcement.status}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-1 group-hover:text-cyan-600 transition-colors">{announcement.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {announcement.content}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {announcement.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} /> {announcement.views} views
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          <Edit2 size={12} className="mr-1.5" /> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 size={12} className="mr-1.5" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full h-10 text-muted-foreground border-dashed">
            Load More Announcements
          </Button>
        </div>

        {/* Quick Actions & Templates */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Quick Broadcast</CardTitle>
              <CardDescription>Send urgent alerts to all residents immediately.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-between group h-12 border-rose-100 hover:bg-rose-50 hover:text-rose-600">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-50 text-rose-600 rounded-lg group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    <AlertTriangle size={16} />
                  </div>
                  <span>Emergency Alert</span>
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="w-full justify-between group h-12 border-amber-100 hover:bg-amber-50 hover:text-amber-600">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Clock size={16} />
                  </div>
                  <span>Maintenance Update</span>
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="w-full justify-between group h-12 border-blue-100 hover:bg-blue-50 hover:text-blue-600">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Info size={16} />
                  </div>
                  <span>General Notice</span>
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-600 to-blue-700 text-white border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Megaphone size={120} />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">Smart Scheduling</CardTitle>
              <CardDescription className="text-cyan-100">
                Schedule your announcements for optimal engagement times.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span>Engagement Score</span>
                  <span className="font-bold">High</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[85%]" />
                </div>
                <p className="text-xs text-cyan-50">Recommended time: Today, 7:00 PM</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-white text-cyan-700 hover:bg-cyan-50">
                View Schedule
              </Button>
            </CardFooter>
          </Card>

          <div className="p-4 rounded-xl bg-muted/50 border border-border/50 flex items-start gap-3">
            <div className="p-2 bg-success-50 text-success-600 rounded-full">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Delivery Logs</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Track SMS, Email, and Push notification delivery status for each announcement.
              </p>
              <Button variant="link" className="h-auto p-0 text-xs text-cyan-600 mt-2">
                View Logs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
