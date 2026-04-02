import React from 'react';
import { 
  Palette, 
  Type, 
  Box, 
  Layers, 
  Sparkles, 
  Layout, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Ban, 
  ChevronRight, 
  Plus, 
  Search, 
  MoreVertical, 
  ArrowRight, 
  Clock, 
  Users, 
  DollarSign, 
  MapPin, 
  Tag, 
  Calendar, 
  Phone, 
  Mail, 
  MessageCircle, 
  ChevronRight as ChevronRightIcon, 
  TrendingUp, 
  UserPlus, 
  Building2, 
  CheckCircle2 as CheckCircle2Icon, 
  AlertCircle as AlertCircleIcon, 
  Trash2, 
  X, 
  LayoutGrid, 
  GripVertical
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Switch } from '@/src/components/ui/Switch';
import { cn } from '@/src/lib/utils';

export default function DesignSystemPage() {
  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest">
          <Sparkles size={12} /> Design System V3
        </div>
        <h1 className="text-4xl font-black tracking-tight uppercase leading-none">
          Strict Standards<br />
          <span className="text-primary">Visual Language.</span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
          A comprehensive guide to the application's visual identity, typography, and component library. Adhering to premium SaaS aesthetics with high-contrast elements and precise geometry.
        </p>
      </div>

      {/* Typography Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Type className="text-primary" size={20} />
          <h2 className="text-xs font-bold uppercase tracking-widest">Typography & Scale</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Type Scale</p>
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-4xl font-black uppercase tracking-tight leading-none">Display Large</p>
                  <p className="text-[10px] text-muted-foreground font-mono">4xl / Black / Tracking Tight / Leading None</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold tracking-tight">Heading Medium</p>
                  <p className="text-[10px] text-muted-foreground font-mono">2xl / Bold / Tracking Tight</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Body Standard</p>
                  <p className="text-[10px] text-muted-foreground font-mono">sm / Medium / Leading Relaxed</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest">Micro Label</p>
                  <p className="text-[10px] text-muted-foreground font-mono">xs / Bold / Uppercase / Tracking Widest</p>
                </div>
              </div>
            </div>
          </div>
          <Card className="p-6 bg-muted/30 border-border/50 space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sample Content</p>
            <div className="space-y-4">
              <h3 className="text-xl font-bold leading-tight">The quick brown fox jumps over the lazy dog.</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Design is not just what it looks like and feels like. Design is how it works. Innovation distinguishes between a leader and a follower. Stay hungry, stay foolish.
              </p>
              <div className="pt-4 flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">Secondary</Badge>
                <Badge className="bg-primary text-white text-[10px] uppercase font-bold tracking-wider">Primary</Badge>
                <Badge className="bg-success-500 text-white text-[10px] uppercase font-bold tracking-wider">Success</Badge>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Colors Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Palette className="text-primary" size={20} />
          <h2 className="text-xs font-bold uppercase tracking-widest">Color Palette</h2>
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Resident Scale</p>
            <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => (
                <div key={weight} className="space-y-2">
                  <div className={cn("h-12 rounded-lg border border-border", `bg-resident-${weight}`)} />
                  <p className="text-[10px] font-mono text-center">{weight}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Security Scale</p>
            <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => (
                <div key={weight} className="space-y-2">
                  <div className={cn("h-12 rounded-lg border border-border", `bg-security-${weight}`)} />
                  <p className="text-[10px] font-mono text-center">{weight}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Admin Scale</p>
            <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => (
                <div key={weight} className="space-y-2">
                  <div className={cn("h-12 rounded-lg border border-border", `bg-admin-${weight}`)} />
                  <p className="text-[10px] font-mono text-center">{weight}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Neutral Scale (Gray)</p>
            <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => (
                <div key={weight} className="space-y-2">
                  <div className={cn("h-12 rounded-lg border border-border", `bg-gray-${weight}`)} />
                  <p className="text-[10px] font-mono text-center">{weight}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Success Scale</p>
              <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => (
                  <div key={weight} className="space-y-2">
                    <div className={cn("h-12 rounded-lg border border-border", `bg-success-${weight}`)} />
                    <p className="text-[10px] font-mono text-center">{weight}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Danger Scale</p>
              <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => (
                  <div key={weight} className="space-y-2">
                    <div className={cn("h-12 rounded-lg border border-border", `bg-danger-${weight}`)} />
                    <p className="text-[10px] font-mono text-center">{weight}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Info Scale</p>
              <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => (
                  <div key={weight} className="space-y-2">
                    <div className={cn("h-12 rounded-lg border border-border", `bg-info-${weight}`)} />
                    <p className="text-[10px] font-mono text-center">{weight}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Warning Scale</p>
              <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => (
                  <div key={weight} className="space-y-2">
                    <div className={cn("h-12 rounded-lg border border-border", `bg-warning-${weight}`)} />
                    <p className="text-[10px] font-mono text-center">{weight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Box className="text-primary" size={20} />
          <h2 className="text-xs font-bold uppercase tracking-widest">UI Components</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Buttons & Actions</p>
            <div className="flex flex-wrap gap-4">
              <Button className="btn-primary">Primary Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost" className="border border-border">Ghost Border</Button>
              <Button variant="ghost" size="icon" className="border border-border"><Plus size={18} /></Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button className="btn-primary h-12 px-8 text-[10px] uppercase tracking-widest font-bold">Large Action</Button>
              <Button variant="ghost" className="h-8 px-4 text-[10px] uppercase tracking-widest font-bold border border-border">Small Ghost</Button>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Inputs & Controls</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="label-text">Standard Input</label>
                <Input placeholder="Enter something..." />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold">Feature Toggle</p>
                  <p className="text-[10px] text-muted-foreground">Enable advanced analytics</p>
                </div>
                <Switch checked={true} />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Badges & Status</p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">Default</Badge>
              <Badge className="bg-primary text-white text-[10px] uppercase font-bold tracking-wider">Active</Badge>
              <Badge className="bg-success-500/10 text-success-500 border-success-500/20 text-[10px] uppercase font-bold tracking-wider">Completed</Badge>
              <Badge className="bg-warning-500/10 text-warning-500 border-warning-500/20 text-[10px] uppercase font-bold tracking-wider">Pending</Badge>
              <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[10px] uppercase font-bold tracking-wider">Critical</Badge>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Cards & Containers</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
                <p className="text-[10px] font-bold uppercase text-primary mb-1">Standard</p>
                <p className="text-xs font-medium">Interactive Card</p>
              </div>
              <div className="p-4 bg-muted/30 border border-border border-dashed rounded-xl flex items-center justify-center">
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Dashed Placeholder</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Effects Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Layers className="text-primary" size={20} />
          <h2 className="text-xs font-bold uppercase tracking-widest">Effects & Gradients</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 rounded-2xl bg-gradient-brand flex items-center justify-center text-white font-black uppercase tracking-widest text-sm">
            Brand Gradient
          </div>
          <div className="h-40 rounded-2xl bg-gradient-surface border border-border flex items-center justify-center text-xs font-bold uppercase tracking-widest">
            Surface Gradient
          </div>
          <div className="h-40 rounded-2xl bg-card border border-border shadow-2xl flex items-center justify-center text-xs font-bold uppercase tracking-widest">
            Deep Shadow
          </div>
        </div>
      </section>
    </div>
  );
}
