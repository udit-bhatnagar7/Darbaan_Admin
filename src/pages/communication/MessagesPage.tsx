import React from 'react';
import { Card } from '@/src/components/ui/Card';
import { MessageSquareText } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">Manage and track all society messages.</p>
      </div>
      <Card className="p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed">
        <div className="p-4 bg-primary/10 rounded-full text-primary">
          <MessageSquareText size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Message Center</h2>
          <p className="text-muted-foreground max-w-md">
            All your society's messages in one place.
          </p>
        </div>
      </Card>
    </div>
  );
}
