import React from 'react';
import { 
  Building2, 
  Dumbbell, 
  Waves, 
  Music, 
  Trophy, 
  Plus, 
  MoreVertical, 
  Users, 
  Clock, 
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';

const facilities = [
  {
    id: 1,
    name: 'Elite Fitness Gym',
    category: 'Fitness',
    location: 'Clubhouse, 1st Floor',
    capacity: 15,
    status: 'Operational',
    icon: Dumbbell,
    color: 'text-blue-500 bg-blue-50',
    description: 'State-of-the-art gym equipment and personal training sessions.'
  },
  {
    id: 2,
    name: 'Infinity Pool',
    category: 'Recreation',
    location: 'Rooftop, Block C',
    capacity: 20,
    status: 'Operational',
    icon: Waves,
    color: 'text-cyan-500 bg-cyan-50',
    description: 'Temperature-controlled infinity pool with a panoramic city view.'
  },
  {
    id: 3,
    name: 'Grand Clubhouse',
    category: 'Community',
    location: 'Central Plaza',
    capacity: 50,
    status: 'Operational',
    icon: Music,
    color: 'text-purple-500 bg-purple-50',
    description: 'Spacious hall for events, parties, and community gatherings.'
  },
  {
    id: 4,
    name: 'Tennis Court',
    category: 'Sports',
    location: 'Sports Arena',
    capacity: 4,
    status: 'Maintenance',
    icon: Trophy,
    color: 'text-emerald-500 bg-emerald-50',
    description: 'Professional-grade synthetic tennis court with floodlights.'
  }
];

export default function FacilitiesPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary rounded-xl text-primary-foreground shadow-lg shadow-primary/20">
            <Building2 size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Society Facilities</h1>
            <p className="text-muted-foreground mt-1">Manage and monitor all shared amenities.</p>
          </div>
        </div>
        <Button size="sm" className="h-9">
          <Plus className="mr-2 h-4 w-4" />
          Add Facility
        </Button>
      </div>

      {/* Facilities Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {facilities.map((facility) => (
          <Card key={facility.id} className="p-6 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={cn("p-4 rounded-2xl shrink-0 transition-transform group-hover:scale-110", facility.color)}>
                  <facility.icon size={32} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{facility.name}</h3>
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">
                      {facility.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                    {facility.description}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Location</p>
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <MapPin size={14} className="text-muted-foreground" />
                  {facility.location}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Capacity</p>
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <Users size={14} className="text-muted-foreground" />
                  {facility.capacity} People
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</p>
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  {facility.status === 'Operational' ? (
                    <CheckCircle2 size={14} className="text-emerald-500" />
                  ) : (
                    <AlertCircle size={14} className="text-amber-500" />
                  )}
                  <span className={cn(
                    facility.status === 'Operational' ? "text-emerald-600" : "text-amber-600"
                  )}>
                    {facility.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button variant="outline" className="flex-1 h-10">View Schedule</Button>
              <Button className="flex-1 h-10 bg-primary text-primary-foreground">Manage Access</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
