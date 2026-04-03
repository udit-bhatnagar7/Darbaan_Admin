import React from 'react';
import { Card } from '@/src/components/ui/Card';
import { Wrench } from 'lucide-react';

export default function ServiceRequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Service Requests</h1>
        <p className="text-muted-foreground mt-1">Manage and track all resident service and maintenance requests.</p>
      </div>
      <Card className="p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed">
        <div className="p-4 bg-primary/10 rounded-full text-primary">
          <Wrench size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Service Desk</h2>
          <p className="text-muted-foreground max-w-md">
            Track and resolve resident service requests efficiently.
          </p>
        </div>
      </Card>
    </div>
  );
}
