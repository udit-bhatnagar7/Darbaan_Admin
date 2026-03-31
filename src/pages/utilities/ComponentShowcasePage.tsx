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
  Info
} from 'lucide-react';

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
                <Type className="h-5 w-5" /> Typography
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
                <Palette className="h-5 w-5" /> Color Palette
              </CardTitle>
              <CardDescription>Primary and semantic color scales.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Primary</p>
                  <div className="flex gap-1 h-12 rounded-lg overflow-hidden border border-border">
                    <div className="flex-1 bg-primary-100" />
                    <div className="flex-1 bg-primary-300" />
                    <div className="flex-1 bg-primary-500" />
                    <div className="flex-1 bg-primary-700" />
                    <div className="flex-1 bg-primary-900" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Success</p>
                  <div className="flex gap-1 h-12 rounded-lg overflow-hidden border border-border">
                    <div className="flex-1 bg-success-100" />
                    <div className="flex-1 bg-success-500" />
                    <div className="flex-1 bg-success-700" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Danger</p>
                  <div className="flex gap-1 h-12 rounded-lg overflow-hidden border border-border">
                    <div className="flex-1 bg-danger-100" />
                    <div className="flex-1 bg-danger-500" />
                    <div className="flex-1 bg-danger-700" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Info</p>
                  <div className="flex gap-1 h-12 rounded-lg overflow-hidden border border-border">
                    <div className="flex-1 bg-info-100" />
                    <div className="flex-1 bg-info-500" />
                    <div className="flex-1 bg-info-700" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Warning</p>
                  <div className="flex gap-1 h-12 rounded-lg overflow-hidden border border-border">
                    <div className="flex-1 bg-warning-100" />
                    <div className="flex-1 bg-warning-500" />
                    <div className="flex-1 bg-warning-700" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Neutral</p>
                  <div className="flex gap-1 h-12 rounded-lg overflow-hidden border border-border">
                    <div className="flex-1 bg-neutral-200" />
                    <div className="flex-1 bg-neutral-500" />
                    <div className="flex-1 bg-neutral-800" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
                <Box className="h-5 w-5" /> Buttons
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
                <Palette className="h-5 w-5" /> Badges
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
                <AlertCircle className="h-5 w-5" /> Feedback & Alerts
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
                <Layers className="h-5 w-5" /> Form Fields
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
                <MessageSquare className="h-5 w-5" /> Overlays
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
                  <TableIcon className="h-5 w-5" /> Data Management
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
                    <item.icon className="h-5 w-5" />
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
              <Layout className="h-5 w-5" /> Layout Architecture
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
