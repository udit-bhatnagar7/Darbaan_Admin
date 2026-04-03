import React from 'react';
import { 
  User, 
  Building2, 
  Bell, 
  ShieldCheck, 
  CreditCard, 
  Globe, 
  Mail, 
  Phone, 
  Camera, 
  Smartphone,
  Save,
  AlertCircle,
  CheckCircle2,
  Settings,
  Download,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Switch } from '@/src/components/ui/Switch';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'society', label: 'Society', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('profile');
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary rounded-full text-white shadow-lg shadow-primary/20">
            <Settings size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account and society preferences.</p>
          </div>
        </div>
        <Button onClick={handleSave} isLoading={isSaving} className="shadow-lg shadow-primary/20">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 shrink-0">
          <Card className="p-2 border-border/50 shadow-sm">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                    activeTab === tab.id 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <Card className="border-border/50 shadow-sm overflow-hidden">
                    <CardHeader className="bg-muted/30 border-b border-border/50">
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your personal details and public profile.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-8">
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative group">
                          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold border-4 border-background shadow-xl overflow-hidden">
                            UB
                          </div>
                          <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                            <Camera size={24} />
                          </button>
                        </div>
                        <div className="space-y-1 text-center sm:text-left">
                          <h3 className="text-lg font-bold">Udit Bhatnagar</h3>
                          <p className="text-sm text-muted-foreground">Admin • work.uditbhatnagar@gmail.com</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="outline" size="sm" className="h-8">Change Photo</Button>
                            <Button variant="ghost" size="sm" className="h-8 text-destructive hover:bg-destructive/10">Remove</Button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold ml-1">Full Name</label>
                          <Input defaultValue="Udit Bhatnagar" placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold ml-1">Email Address</label>
                          <Input defaultValue="work.uditbhatnagar@gmail.com" placeholder="Enter your email" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold ml-1">Phone Number</label>
                          <Input defaultValue="+91 98765 43210" placeholder="Enter your phone number" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold ml-1">Role</label>
                          <Input defaultValue="Super Admin" disabled className="bg-muted/50" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                      <CardTitle>Public Profile</CardTitle>
                      <CardDescription>This information will be visible to other society members.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1">Bio</label>
                        <textarea 
                          className="w-full min-h-[100px] rounded-xl bg-background border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                          placeholder="Tell us a bit about yourself..."
                          defaultValue="Passionate about building smarter communities and leveraging AI for better society management."
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'society' && (
                <div className="space-y-6">
                  <Card className="border-border/50 shadow-sm overflow-hidden">
                    <CardHeader className="bg-muted/30 border-b border-border/50">
                      <CardTitle>Society Details</CardTitle>
                      <CardDescription>Manage your society's identity and location.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold ml-1">Society Name</label>
                          <Input defaultValue="Darbaan Heights" placeholder="Enter society name" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold ml-1">Registration Number</label>
                          <Input defaultValue="REG-2026-SH-042" placeholder="Enter registration number" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold ml-1">Address</label>
                          <Input defaultValue="Sector 42, Golf Course Road, Gurugram, Haryana - 122002" placeholder="Enter full address" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold ml-1">City</label>
                          <Input defaultValue="Gurugram" placeholder="City" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold ml-1">State</label>
                          <Input defaultValue="Haryana" placeholder="State" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                      <CardTitle>Society Branding</CardTitle>
                      <CardDescription>Upload your society logo and cover image.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-sm font-semibold">Society Logo</label>
                        <div className="h-32 w-32 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-all cursor-pointer">
                          <Camera size={24} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Upload Logo</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-sm font-semibold">Cover Image</label>
                        <div className="h-32 w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-all cursor-pointer">
                          <Globe size={24} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Upload Cover</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Choose how you want to be notified about society activities.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">System Notifications</h3>
                        <div className="space-y-4">
                          {[
                            { title: 'New Visitor Alerts', desc: 'Get notified when a visitor arrives at the gate.', icon: Smartphone },
                            { title: 'Emergency Broadcasts', desc: 'Receive urgent alerts from the management.', icon: AlertCircle },
                            { title: 'Maintenance Updates', desc: 'Stay informed about scheduled maintenance.', icon: Clock },
                          ].map((item) => (
                            <div key={item.title} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-primary/10 text-primary rounded-lg mt-0.5">
                                  <item.icon size={18} />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold">{item.title}</p>
                                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Communication Channels</h3>
                        <div className="space-y-4">
                          {[
                            { title: 'Email Notifications', desc: 'Receive detailed reports and summaries via email.', icon: Mail },
                            { title: 'SMS Alerts', desc: 'Critical alerts sent directly to your phone.', icon: Phone },
                            { title: 'Push Notifications', desc: 'Real-time updates on your mobile device.', icon: Bell },
                          ].map((item) => (
                            <div key={item.title} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-primary/10 text-primary rounded-lg mt-0.5">
                                  <item.icon size={18} />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold">{item.title}</p>
                                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                              </div>
                              <Switch defaultChecked={item.title !== 'SMS Alerts'} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                      <CardTitle>Password & Authentication</CardTitle>
                      <CardDescription>Secure your account with a strong password and 2FA.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold ml-1">Current Password</label>
                          <Input type="password" placeholder="••••••••" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">New Password</label>
                            <Input type="password" placeholder="••••••••" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Confirm New Password</label>
                            <Input type="password" placeholder="••••••••" />
                          </div>
                        </div>
                        <Button variant="outline" className="h-9">Update Password</Button>
                      </div>

                      <div className="pt-6 border-t border-border/50">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg mt-0.5">
                              <ShieldCheck size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-bold">Two-Factor Authentication (2FA)</p>
                              <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                            </div>
                          </div>
                          <Button size="sm">Enable 2FA</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                      <CardTitle>Active Sessions</CardTitle>
                      <CardDescription>Manage your active login sessions across devices.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { device: 'MacBook Pro 16"', location: 'Gurugram, India', time: 'Active now', icon: Globe },
                        { device: 'iPhone 15 Pro', location: 'Gurugram, India', time: '2 hours ago', icon: Smartphone },
                      ].map((session) => (
                        <div key={session.device} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted text-muted-foreground rounded-lg">
                              <session.icon size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{session.device}</p>
                              <p className="text-xs text-muted-foreground">{session.location} • {session.time}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">Revoke</Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <Card className="border-border/50 shadow-sm bg-gradient-to-br from-primary/5 to-transparent">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Current Plan</CardTitle>
                          <CardDescription>Manage your subscription and billing details.</CardDescription>
                        </div>
                        <Badge className="bg-primary text-white px-3 py-1">Enterprise Plan</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <CreditCard size={120} />
                        </div>
                        <div className="space-y-1 relative z-10">
                          <p className="text-primary-100 text-sm font-medium">Monthly Subscription</p>
                          <h3 className="text-3xl font-bold">$299<span className="text-lg font-normal text-primary-100">/month</span></h3>
                          <p className="text-primary-100 text-xs mt-2 flex items-center gap-1">
                            <CheckCircle2 size={12} /> Next billing on May 01, 2026
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-4 sm:mt-0 relative z-10">
                          <Button className="bg-white text-primary hover:bg-primary-50">Upgrade Plan</Button>
                          <Button variant="ghost" className="text-white hover:bg-white/10">Cancel</Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Payment Method</h3>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-14 bg-white border border-border rounded-lg flex items-center justify-center font-bold text-primary italic">
                              VISA
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Visa ending in 4242</p>
                              <p className="text-xs text-muted-foreground">Expires 12/2028</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                      <CardTitle>Billing History</CardTitle>
                      <CardDescription>Download your past invoices and receipts.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-muted/50 text-muted-foreground font-medium border-y border-border">
                            <tr>
                              <th className="px-6 py-3">Invoice ID</th>
                              <th className="px-6 py-3">Date</th>
                              <th className="px-6 py-3">Amount</th>
                              <th className="px-6 py-3">Status</th>
                              <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {[
                              { id: 'INV-2026-001', date: 'Apr 01, 2026', amount: '$299.00', status: 'Paid' },
                              { id: 'INV-2026-002', date: 'Mar 01, 2026', amount: '$299.00', status: 'Paid' },
                              { id: 'INV-2026-003', date: 'Feb 01, 2026', amount: '$299.00', status: 'Paid' },
                            ].map((invoice) => (
                              <tr key={invoice.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-4 font-medium">{invoice.id}</td>
                                <td className="px-6 py-4 text-muted-foreground">{invoice.date}</td>
                                <td className="px-6 py-4 font-semibold">{invoice.amount}</td>
                                <td className="px-6 py-4">
                                  <Badge variant="success" className="text-[10px] uppercase tracking-wider">{invoice.status}</Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                                    <Download size={16} />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

