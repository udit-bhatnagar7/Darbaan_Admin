import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/src/components/ui/Card';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { Alert } from '@/src/components/ui/Alert';
import { Textarea } from '@/src/components/ui/Textarea';
import { Checkbox } from '@/src/components/ui/Checkbox';
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/RadioGroup';
import { Label } from '@/src/components/ui/Label';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/src/components/ui/Table';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/src/components/ui/Dialog';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/src/components/ui/Sheet';
import { toast } from 'sonner';
import { Switch } from '@/src/components/ui/Switch';
import { Accordion } from '@/src/components/ui/Accordion';
import { Tabs } from '@/src/components/ui/Tabs';
import { Progress } from '@/src/components/ui/Progress';
import { Avatar } from '@/src/components/ui/Avatar';
import { cn } from '@/src/lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  Layout, 
  Palette, 
  Type, 
  Box, 
  Layers, 
  AlertCircle, 
  MessageSquare, 
  Table as TableIcon, 
  CheckSquare, 
  Radio, 
  Bell,
  Code,
  Zap,
  Shield,
  Smartphone,
  ToggleLeft,
  Search,
  Mail,
  Lock,
  Eye,
  EyeOff,
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Plus,
  Trash2,
  FileQuestion,
  Loader2,
  CheckCircle2,
  XCircle,
  Info,
  Clock,
  User,
  CreditCard,
  FileText,
  Activity,
  Check,
  Calendar,
  MapPin,
  Mail as MailIcon,
  Phone,
  Globe,
  Settings,
  LogOut,
  HelpCircle,
  Share2,
  Heart,
  Star,
  MessageCircle,
  Send,
  Printer,
  FileDown,
  History,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp
} from 'lucide-react';

const chartData = [
  { name: 'Jan', value: 400, revenue: 2400 },
  { name: 'Feb', value: 300, revenue: 1398 },
  { name: 'Mar', value: 200, revenue: 9800 },
  { name: 'Apr', value: 278, revenue: 3908 },
  { name: 'May', value: 189, revenue: 4800 },
  { name: 'Jun', value: 239, revenue: 3800 },
  { name: 'Jul', value: 349, revenue: 4300 },
];

const pieData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Referral', value: 300 },
  { name: 'Organic', value: 200 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100
    }
  }
};

export default function ComponentShowcasePage() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <motion.div 
      className="space-y-12 pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gradient">System Utilities</h1>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
            A comprehensive library of premium UI components and design tokens for the Darbaan Admin Panel.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border">
          <Code className="h-3 w-3" /> v1.0.4-stable
        </div>
      </motion.div>

      {/* Design Tokens Section */}
      <motion.section variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h2 className="text-xl font-semibold tracking-tight">Design Tokens</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Typography */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Type className="h-4 w-4" /> Typography
              </CardTitle>
              <CardDescription>System font scales and weights.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Display Large</p>
                <p className="text-3xl font-bold tracking-tight">The quick brown fox</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Heading Medium</p>
                <p className="text-xl font-semibold">Jumps over the lazy dog</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Body Text</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Monospace</p>
                <p className="text-xs font-mono bg-muted p-2 rounded">const nexus = "premium";</p>
              </div>
            </CardContent>
          </Card>

          {/* Color Palette */}
          <Card className="border-border md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Palette className="h-4 w-4" /> Color Palette
              </CardTitle>
              <CardDescription>Primary and semantic color scales.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Resident</p>
                  <div className="flex gap-1 h-12 rounded-lg overflow-hidden border border-border">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(w => (
                      <div key={w} className={`flex-1 bg-resident-${w}`} title={`Resident ${w}`} />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Security</p>
                  <div className="flex gap-1 h-12 rounded-lg overflow-hidden border border-border">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(w => (
                      <div key={w} className={`flex-1 bg-security-${w}`} title={`Security ${w}`} />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Admin</p>
                  <div className="flex gap-1 h-12 rounded-lg overflow-hidden border border-border">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(w => (
                      <div key={w} className={`flex-1 bg-admin-${w}`} title={`Admin ${w}`} />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Success</p>
                  <div className="flex gap-1 h-12 rounded-lg overflow-hidden border border-border">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(w => (
                      <div key={w} className={`flex-1 bg-success-${w}`} title={`Success ${w}`} />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Danger</p>
                  <div className="flex gap-1 h-12 rounded-lg overflow-hidden border border-border">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(w => (
                      <div key={w} className={`flex-1 bg-danger-${w}`} title={`Danger ${w}`} />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Info</p>
                  <div className="flex gap-1 h-12 rounded-lg overflow-hidden border border-border">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(w => (
                      <div key={w} className={`flex-1 bg-info-${w}`} title={`Info ${w}`} />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Warning</p>
                  <div className="flex gap-1 h-12 rounded-lg overflow-hidden border border-border">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(w => (
                      <div key={w} className={`flex-1 bg-warning-${w}`} title={`Warning ${w}`} />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Neutral</p>
                  <div className="flex gap-1 h-12 rounded-lg overflow-hidden border border-border">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(w => (
                      <div key={w} className={`flex-1 bg-gray-${w}`} title={`Neutral ${w}`} />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Role-Based Theming Section */}
      <motion.section variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h2 className="text-xl font-semibold tracking-tight">Role-Based Theming</h2>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Shield className="h-4 w-4" /> Role Primary Colors
            </CardTitle>
            <CardDescription>
              The system automatically adjusts the primary brand color based on the user's role.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-4 p-4 rounded-xl border border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Resident</span>
                  <div className="h-6 w-6 rounded-full bg-[var(--primary-resident)]" />
                </div>
                <p className="text-xs text-muted-foreground">Primary color for residents and homeowners.</p>
                <div className="h-2 w-full rounded-full bg-[var(--primary-resident)] opacity-20" />
                <Button variant="outline" size="sm" className="w-full border-[var(--primary-resident)] text-[var(--primary-resident)] hover:bg-[var(--primary-resident)] hover:text-white">
                  Preview Color
                </Button>
              </div>

              <div className="space-y-4 p-4 rounded-xl border border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Security</span>
                  <div className="h-6 w-6 rounded-full bg-[var(--primary-security)]" />
                </div>
                <p className="text-xs text-muted-foreground">High-visibility color for security personnel.</p>
                <div className="h-2 w-full rounded-full bg-[var(--primary-security)] opacity-20" />
                <Button variant="outline" size="sm" className="w-full border-[var(--primary-security)] text-[var(--primary-security)] hover:bg-[var(--primary-security)] hover:text-white">
                  Preview Color
                </Button>
              </div>

              <div className="space-y-4 p-4 rounded-xl border border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Admin / Council</span>
                  <div className="h-6 w-6 rounded-full bg-[var(--primary-admin)]" />
                </div>
                <p className="text-xs text-muted-foreground">Professional teal for management and committee.</p>
                <div className="h-2 w-full rounded-full bg-[var(--primary-admin)] opacity-20" />
                <Button variant="outline" size="sm" className="w-full border-[var(--primary-admin)] text-[var(--primary-admin)] hover:bg-[var(--primary-admin)] hover:text-white">
                  Preview Color
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 border-t border-border py-3">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Zap className="h-3 w-3 text-primary" /> These colors are defined in the design system tokens
            </p>
          </CardFooter>
        </Card>
      </motion.section>

      {/* Interactive Components Section */}
      <motion.section variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h2 className="text-xl font-semibold tracking-tight">Interactive Components</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Buttons */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Box className="h-4 w-4" /> Buttons
              </CardTitle>
              <CardDescription>Various button variants and sizes.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button variant="gradient">Gradient</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="info">Info</Button>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" size="icon"><Plus className="h-4 w-4" /></Button>
              <Button variant="primary" isLoading>Loading</Button>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Palette className="h-4 w-4" /> Badges
              </CardTitle>
              <CardDescription>Status indicators and labels.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Badge variant="default">Default</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="info">Info</Badge>
            </CardContent>
          </Card>

          {/* Feedback & Alerts */}
          <Card className="border-border md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <AlertCircle className="h-4 w-4" /> Feedback & Alerts
              </CardTitle>
              <CardDescription>System notifications and status alerts.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Alert variant="info" title="Information">
                A new system update is available for your account.
              </Alert>
              <Alert variant="success" title="Success">
                Your profile has been updated successfully.
              </Alert>
              <Alert variant="warning" title="Warning">
                Your subscription will expire in 3 days.
              </Alert>
              <Alert variant="destructive" title="Error">
                There was a problem connecting to the server.
              </Alert>
              <Alert title="Default Alert">
                This is a standard notification message.
              </Alert>
              <Alert variant="info" onClose={() => toast.info("Alert closed")}>
                This alert can be dismissed by clicking the X.
              </Alert>
            </CardContent>
          </Card>

          {/* Form Fields */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Layers className="h-4 w-4" /> Form Fields
              </CardTitle>
              <CardDescription>Inputs, switches, and selections.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Standard Input</Label>
                <Input placeholder="Type something..." />
              </div>
              <div className="space-y-4">
                <Label>Input with Icons</Label>
                <Input 
                  leftIcon={<Mail className="h-4 w-4" />} 
                  placeholder="Email address" 
                />
                <Input 
                  leftIcon={<Lock className="h-4 w-4" />} 
                  rightIcon={<Eye className="h-4 w-4 cursor-pointer" />} 
                  type="password"
                  placeholder="Password" 
                />
              </div>
              <div className="space-y-4">
                <Label>Input with Error</Label>
                <Input error="This field is required" placeholder="Error state" />
              </div>
              <div className="pt-4 border-t border-border">
                <Label className="mb-4 block">Toggle Buttons (Switches)</Label>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notifications</span>
                    <Switch 
                      checked={notifications} 
                      onCheckedChange={setNotifications} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dark Mode</span>
                    <Switch 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode} 
                    />
                  </div>
                  <div className="flex items-center justify-between opacity-50">
                    <span className="text-sm">Disabled Toggle</span>
                    <Switch disabled />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overlays */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <MessageSquare className="h-4 w-4" /> Overlays
              </CardTitle>
              <CardDescription>Modals, sheets, and toasters.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              {/* Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Delete Account</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue="john@example.com" />
                    </div>
                  </div>
                  <SheetFooter>
                    <Button variant="gradient" className="w-full">Save Changes</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              {/* Toasts */}
              <Button 
                variant="outline" 
                onClick={() => toast.success('Success Toast', { description: 'Your action was completed successfully.' })}
              >
                Success Toast
              </Button>
              <Button 
                variant="outline" 
                onClick={() => toast.error('Error Toast', { description: 'An unexpected error occurred.' })}
              >
                Error Toast
              </Button>
            </CardContent>
          </Card>

          {/* Advanced Data Display */}
          <Card className="border-border md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <TableIcon className="h-4 w-4" /> Data Management
                </CardTitle>
                <CardDescription>Advanced table with sorting and actions.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="mr-2 h-3 w-3" /> Filter
                </Button>
                <Button variant="primary" size="sm" className="h-8">
                  <Plus className="mr-2 h-3 w-3" /> Add New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                        User <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 'USR-001', name: 'Alex Rivera', status: 'Active', role: 'Admin', color: 'success' },
                    { id: 'USR-002', name: 'Sarah Chen', status: 'Pending', role: 'Editor', color: 'warning' },
                    { id: 'USR-003', name: 'Mike Johnson', status: 'Inactive', role: 'Viewer', color: 'destructive' },
                  ].map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-mono text-xs">{user.id}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <Badge variant={user.color as any}>{user.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.role}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between px-4 py-4 border-t border-border bg-muted/30">
                <p className="text-xs text-muted-foreground">Showing 3 of 128 users</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Empty & Loading States */}
          <div className="space-y-6">
            <Card className="border-border border-dashed bg-muted/20">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <FileQuestion className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg">No records found</h3>
                <p className="text-sm text-muted-foreground max-w-[200px] mt-1">
                  Try adjusting your filters or search criteria.
                </p>
                <Button variant="outline" size="sm" className="mt-6">
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" /> Loading State
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
                <Skeleton className="h-[100px] w-full rounded-lg" />
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Data Visualization Section */}
      <motion.section variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h2 className="text-xl font-semibold tracking-tight">Data Visualization</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Area Chart */}
          <Card className="border-border overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-primary">
                <TrendingUp className="h-4 w-4" /> Revenue Overview
              </CardTitle>
              <CardDescription>Monthly revenue growth and projections.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      borderRadius: '8px', 
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card className="border-border overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-primary">
                <BarChart3 className="h-4 w-4" /> User Activity
              </CardTitle>
              <CardDescription>Weekly active users across platforms.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      borderRadius: '8px', 
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]} 
                    barSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="border-border overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-primary">
                <PieChartIcon className="h-4 w-4" /> Traffic Sources
              </CardTitle>
              <CardDescription>Distribution of incoming traffic by channel.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="w-full h-full flex flex-col sm:flex-row items-center justify-center gap-8">
                <div className="w-full h-[200px] sm:w-1/2 sm:h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-2">
                  {pieData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="text-sm font-medium">{entry.name}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Chart */}
          <Card className="border-border overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Activity className="h-4 w-4" /> System Performance
              </CardTitle>
              <CardDescription>Real-time server response times and latency.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      borderRadius: '8px', 
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6 }}
                    name="Response Time"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6 }}
                    name="Throughput"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Advanced Utilities Section */}
      <motion.section variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h2 className="text-xl font-semibold tracking-tight">Advanced Utilities</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Accordion & Tabs */}
          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Layers className="h-4 w-4" /> Accordion
                </CardTitle>
                <CardDescription>Collapsible content panels.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion 
                  items={[
                    {
                      id: 'item-1',
                      title: 'Is it accessible?',
                      content: 'Yes. It adheres to the WAI-ARIA design pattern.'
                    },
                    {
                      id: 'item-2',
                      title: 'Is it styled?',
                      content: 'Yes. It comes with default styles that matches the other components\' aesthetic.'
                    },
                    {
                      id: 'item-3',
                      title: 'Is it animated?',
                      content: 'Yes. It uses Framer Motion for smooth opening and closing animations.'
                    }
                  ]}
                />
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Box className="h-4 w-4" /> Tabs
                </CardTitle>
                <CardDescription>Organize content into multiple views.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs 
                  variant="pills"
                  tabs={[
                    {
                      id: 'account',
                      label: 'Account',
                      icon: <User className="h-4 w-4" />,
                      content: (
                        <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
                          <h4 className="font-medium">Account Settings</h4>
                          <p className="text-sm text-muted-foreground">Manage your account details and preferences.</p>
                          <div className="grid gap-4">
                            <Input placeholder="Username" defaultValue="johndoe" />
                            <Input placeholder="Email" defaultValue="john@example.com" />
                          </div>
                        </div>
                      )
                    },
                    {
                      id: 'password',
                      label: 'Password',
                      icon: <Lock className="h-4 w-4" />,
                      content: (
                        <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
                          <h4 className="font-medium">Security</h4>
                          <p className="text-sm text-muted-foreground">Change your password and secure your account.</p>
                          <div className="grid gap-4">
                            <Input type="password" placeholder="Current Password" />
                            <Input type="password" placeholder="New Password" />
                          </div>
                        </div>
                      )
                    },
                    {
                      id: 'settings',
                      label: 'Settings',
                      icon: <Settings className="h-4 w-4" />,
                      content: (
                        <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
                          <h4 className="font-medium">General Preferences</h4>
                          <p className="text-sm text-muted-foreground">Configure system-wide settings.</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Auto-save changes</span>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      )
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>

          {/* Creative Form Elements */}
          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Zap className="h-4 w-4" /> Creative Form Elements
                </CardTitle>
                <CardDescription>Modern, interactive selection components.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Creative Checkboxes */}
                <div className="space-y-4">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground">Creative Checkboxes</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="relative flex flex-col items-center justify-center p-4 rounded-xl border-2 border-border hover:border-primary/50 cursor-pointer transition-all group has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center mb-2 group-hover:scale-110 transition-transform peer-checked:bg-primary peer-checked:text-white">
                        <Palette className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">Design</span>
                      <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </label>
                    <label className="relative flex flex-col items-center justify-center p-4 rounded-xl border-2 border-border hover:border-primary/50 cursor-pointer transition-all group has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center mb-2 group-hover:scale-110 transition-transform peer-checked:bg-primary peer-checked:text-white">
                        <Code className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">Coding</span>
                      <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </label>
                  </div>
                </div>

                {/* Creative Radios */}
                <div className="space-y-4">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground">Creative Radio Buttons</Label>
                  <div className="space-y-3">
                    {['Starter', 'Professional', 'Enterprise'].map((plan) => (
                      <label key={plan} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 cursor-pointer transition-all has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="plan" className="h-4 w-4 text-primary border-border focus:ring-primary" />
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{plan} Plan</span>
                            <span className="text-xs text-muted-foreground">Best for {plan === 'Starter' ? 'individuals' : plan === 'Professional' ? 'small teams' : 'large organizations'}</span>
                          </div>
                        </div>
                        <span className="font-bold text-sm">{plan === 'Starter' ? 'Free' : plan === 'Professional' ? '$29/mo' : '$99/mo'}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Activity className="h-4 w-4" /> Progress & Activity
                </CardTitle>
                <CardDescription>Visualizing task completion and system health.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Progress value={75} label="Server Capacity" showLabel variant="gradient" />
                  <Progress value={45} label="Project Completion" showLabel variant="success" size="sm" />
                  <Progress value={90} label="Storage Limit" showLabel variant="danger" size="xs" />
                </div>
                
                <div className="pt-4 border-t border-border">
                  <Label className="mb-4 block text-xs uppercase tracking-widest text-muted-foreground">Recent Activity</Label>
                  <div className="space-y-4">
                    {[
                      { icon: Check, color: 'bg-success-500', text: 'Backup completed successfully', time: '2 mins ago' },
                      { icon: AlertCircle, color: 'bg-warning-500', text: 'CPU usage exceeded 80%', time: '15 mins ago' },
                      { icon: User, color: 'bg-info-500', text: 'New user registered: Sarah Chen', time: '1 hour ago' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={cn('mt-0.5 h-4 w-4 rounded-full flex items-center justify-center text-white', item.color)}>
                          <item.icon className="h-3 w-3" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.text}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Timeline & Invoice Section */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Timeline */}
          <Card className="border-border lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Clock className="h-4 w-4" /> Timeline
              </CardTitle>
              <CardDescription>Sequential event tracking.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-border before:to-transparent">
                {[
                  { title: 'Project Initiated', desc: 'Initial requirements gathering and team setup.', date: 'Oct 12, 2023', icon: Zap },
                  { title: 'Design Phase', desc: 'UI/UX wireframing and high-fidelity mockups.', date: 'Oct 25, 2023', icon: Palette },
                  { title: 'Development', desc: 'Frontend and backend implementation started.', date: 'Nov 05, 2023', icon: Code },
                  { title: 'Beta Release', desc: 'Internal testing and bug fixing.', date: 'Dec 01, 2023', icon: Shield },
                ].map((item, i) => (
                  <div key={i} className="relative flex items-start gap-6 pl-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background border-2 border-primary z-10 shadow-sm">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col gap-1 pt-1">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">{item.date}</span>
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Invoice Preview */}
          <Card className="border-border lg:col-span-2 overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <CreditCard className="h-4 w-4" /> Invoice Preview
                  </CardTitle>
                  <CardDescription>Professional billing document template.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Printer className="h-4 w-4 mr-2" /> Print</Button>
                  <Button variant="primary" size="sm"><FileDown className="h-4 w-4 mr-2" /> Download</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="flex justify-between">
                <div className="space-y-1">
                  <div className="h-9 w-9 bg-primary rounded-lg flex items-center justify-center text-white mb-4">
                    <Zap className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-xl">Darbaan Admin</h3>
                  <p className="text-sm text-muted-foreground">123 Business Ave, Suite 100<br />San Francisco, CA 94107</p>
                </div>
                <div className="text-right space-y-1">
                  <h2 className="text-3xl font-bold text-primary">INVOICE</h2>
                  <p className="text-sm font-mono">#INV-2023-0042</p>
                  <div className="pt-4">
                    <p className="text-xs text-muted-foreground uppercase">Date Issued</p>
                    <p className="text-sm font-medium">April 01, 2026</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-border">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Bill To</p>
                  <h4 className="font-bold">Acme Corporation</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Attn: Finance Department<br />
                    456 Corporate Way<br />
                    New York, NY 10001
                  </p>
                </div>
                <div className="space-y-2 text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Payment Details</p>
                  <p className="text-sm font-medium">Bank Transfer (ACH)</p>
                  <p className="text-sm text-muted-foreground">Account: **** 8829</p>
                  <p className="text-sm text-muted-foreground">Due Date: April 15, 2026</p>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { desc: 'Premium Admin Dashboard Template', qty: 1, price: 199.00 },
                    { desc: 'Extended Support (12 Months)', qty: 1, price: 49.00 },
                    { desc: 'Custom Integration Services', qty: 5, price: 120.00 },
                  ].map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{item.desc}</TableCell>
                      <TableCell className="text-center">{item.qty}</TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-bold">${(item.qty * item.price).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-end">
                <div className="w-64 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>$848.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>$67.84</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-border">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl text-primary">$915.84</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Avatars & Panels Section */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Avatars */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <User className="h-4 w-4" /> Profile Avatars
              </CardTitle>
              <CardDescription>User representation with status indicators.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-wrap items-end gap-6">
                <Avatar size="xs" fallback="JD" status="online" />
                <Avatar size="sm" fallback="SC" status="away" />
                <Avatar size="md" fallback="MJ" status="busy" />
                <Avatar size="lg" fallback="AR" status="offline" />
                <Avatar size="xl" src="https://picsum.photos/seed/avatar1/200/200" status="online" />
              </div>
              
              <div className="pt-4 border-t border-border">
                <Label className="mb-4 block text-xs uppercase tracking-widest text-muted-foreground">Avatar Groups</Label>
                <div className="flex -space-x-3 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Avatar 
                      key={i} 
                      size="md" 
                      src={`https://picsum.photos/seed/user${i}/100/100`} 
                      className="ring-2 ring-background"
                    />
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted border-2 border-background text-xs font-bold text-muted-foreground ring-2 ring-background">
                    +12
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Panels & Containers */}
          <Card className="border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Layers className="h-4 w-4" /> Panels & Layouts
              </CardTitle>
              <CardDescription>Versatile container patterns for complex UIs.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              {/* Sidebar Panel */}
              <div className="border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="bg-muted/50 p-3 border-b border-border flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">Navigation Panel</span>
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-danger-500" />
                    <div className="h-2 w-2 rounded-full bg-warning-500" />
                    <div className="h-2 w-2 rounded-full bg-success-500" />
                  </div>
                </div>
                <div className="p-2 space-y-1">
                  {[
                    { icon: Layout, label: 'Dashboard', active: true },
                    { icon: User, label: 'Profile', active: false },
                    { icon: Bell, label: 'Notifications', active: false },
                    { icon: Settings, label: 'Settings', active: false },
                  ].map((item, i) => (
                    <div key={i} className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer',
                      item.active ? 'bg-primary text-white' : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    )}>
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Panel */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-primary mb-2">Pro Feature Unlocked</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You now have access to advanced analytics and unlimited cloud storage. Start exploring your new capabilities.
                  </p>
                </div>
                <Button variant="primary" size="sm" className="mt-6 w-fit">Upgrade Plan</Button>
              </div>

              {/* Stats Panel */}
              <div className="sm:col-span-2 grid grid-cols-3 gap-4">
                {[
                  { label: 'Total Sales', value: '$12,482', change: '+12%', icon: CreditCard },
                  { label: 'Active Users', value: '1,284', change: '+5%', icon: User },
                  { label: 'Conversion', value: '3.2%', change: '-2%', icon: Activity },
                ].map((stat, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <stat.icon className="h-4 w-4" />
                      </div>
                      <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-full', stat.change.startsWith('+') ? 'bg-success-100 text-success-700' : 'bg-danger-100 text-danger-700')}>
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-lg font-bold tracking-tight">{stat.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Iconography Section */}
      <motion.section variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h2 className="text-xl font-semibold tracking-tight">Iconography & Visuals</h2>
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-6">
              {[
                { icon: Layout, label: 'Layout' },
                { icon: Palette, label: 'Palette' },
                { icon: Type, label: 'Type' },
                { icon: Box, label: 'Box' },
                { icon: Layers, label: 'Layers' },
                { icon: AlertCircle, label: 'Alert' },
                { icon: MessageSquare, label: 'Chat' },
                { icon: Bell, label: 'Bell' },
                { icon: Zap, label: 'Zap' },
                { icon: Shield, label: 'Shield' },
                { icon: Smartphone, label: 'Mobile' },
                { icon: Search, label: 'Search' },
                { icon: Mail, label: 'Mail' },
                { icon: Lock, label: 'Lock' },
                { icon: Eye, label: 'Eye' },
                { icon: Download, label: 'Download' },
                { icon: Trash2, label: 'Trash' },
                { icon: CheckCircle2, label: 'Success' },
                { icon: XCircle, label: 'Error' },
                { icon: Info, label: 'Info' },
                { icon: ToggleLeft, label: 'Toggle' },
                { icon: Filter, label: 'Filter' },
                { icon: Plus, label: 'Plus' },
                { icon: MoreHorizontal, label: 'More' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group cursor-help">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all duration-200">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">{item.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Full Width Card Example */}
      <motion.div variants={itemVariants}>
        <Card className="card-highlight border-primary/20 bg-gradient-to-r from-primary/5 via-card to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Layout className="h-4 w-4" /> Layout Architecture
            </CardTitle>
            <CardDescription>A full-width card with header, content, and footer.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
              The Darbaan Admin Panel utilizes a modular, component-based architecture designed for maximum flexibility and performance. 
              Every component is built with accessibility and responsiveness in mind, ensuring a seamless experience across all devices.
            </p>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="outline">Documentation</Button>
            <Button variant="gradient">Get Started</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
