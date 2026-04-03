import React from 'react';
import { Card } from '@/src/components/ui/Card';
import { Settings } from 'lucide-react';

export default function AIAutomationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Automation</h1>
        <p className="text-muted-foreground mt-1">Configure automated workflows and AI-driven tasks.</p>
      </div>
      <Card className="p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed">
        <div className="p-4 bg-primary/10 rounded-full text-primary">
          <Settings size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Automation Engine</h2>
          <p className="text-muted-foreground max-w-md">
            Set up rules and triggers for automated society management tasks.
          </p>
        </div>
      </Card>
    </div>
  );
}
