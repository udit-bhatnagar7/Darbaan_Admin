import React from 'react';
import { cn } from '@/src/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary text-secondary-foreground border-border',
    destructive: 'bg-destructive/10 text-destructive border-destructive/20',
    outline: 'text-muted-foreground border border-border',
    success: 'bg-success-500/10 text-success-600 dark:text-success-400 border-success-500/20',
    warning: 'bg-warning-500/10 text-warning-600 dark:text-warning-400 border-warning-500/20',
    info: 'bg-info-500/10 text-info-600 dark:text-info-400 border-info-500/20',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
