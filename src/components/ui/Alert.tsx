import React from 'react';
import { cn } from '@/src/lib/utils';
import { AlertCircle, CheckCircle2, Info, XCircle, X } from 'lucide-react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'info';
  title?: string;
  onClose?: () => void;
}

export function Alert({ className, variant = 'default', title, children, onClose, ...props }: AlertProps) {
  const icons = {
    default: Info,
    info: Info,
    success: CheckCircle2,
    warning: AlertCircle,
    destructive: XCircle,
  };

  const variants = {
    default: 'bg-muted/50 text-foreground border-border',
    info: 'bg-info-50 text-info-800 border-info-200 dark:bg-info-900/20 dark:text-info-300 dark:border-info-800',
    success: 'bg-success-50 text-success-800 border-success-200 dark:bg-success-900/20 dark:text-success-300 dark:border-success-800',
    warning: 'bg-warning-50 text-warning-800 border-warning-200 dark:bg-warning-900/20 dark:text-warning-300 dark:border-warning-800',
    destructive: 'bg-danger-50 text-danger-800 border-danger-200 dark:bg-danger-900/20 dark:text-danger-300 dark:border-danger-800',
  };

  const Icon = icons[variant];

  return (
    <div
      role="alert"
      className={cn(
        'relative w-full rounded-lg border p-4 flex gap-3 transition-all duration-200',
        variants[variant],
        className
      )}
      {...props}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <div className="flex-1">
        {title && <h5 className="mb-1 font-semibold leading-none tracking-tight">{title}</h5>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
