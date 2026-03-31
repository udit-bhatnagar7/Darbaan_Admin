import React from 'react';
import { useLocation } from 'react-router-dom';
import { Construction } from 'lucide-react';

export default function PlaceholderPage() {
  const location = useLocation();
  const path = location.pathname.split('/').filter(Boolean).pop() || 'Dashboard';
  const title = path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
      <div className="p-4 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
        <Construction size={48} />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-gradient">{title}</h1>
      <p className="text-muted-foreground max-w-md">
        The <span className="font-semibold text-foreground">{title}</span> page is currently under development. 
        Check back soon for updates!
      </p>
    </div>
  );
}
