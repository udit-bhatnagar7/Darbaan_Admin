import React from 'react';
import { Card } from '@/src/components/ui/Card';
import { FileText } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-1">Generate and download detailed society reports.</p>
      </div>
      <Card className="p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed">
        <div className="p-4 bg-primary/10 rounded-full text-primary">
          <FileText size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Report Center</h2>
          <p className="text-muted-foreground max-w-md">
            All your society's operational and financial reports in one place.
          </p>
        </div>
      </Card>
    </div>
  );
}
