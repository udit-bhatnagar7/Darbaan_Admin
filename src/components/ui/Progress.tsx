import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gradient';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

export function Progress({
  value,
  max = 100,
  className,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  label,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variants = {
    primary: 'bg-primary',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
    info: 'bg-info-500',
    gradient: 'bg-gradient-to-r from-primary to-secondary',
  };

  const sizes = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between text-xs font-medium text-muted-foreground">
          <span>{label}</span>
          {showLabel && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-muted rounded-full overflow-hidden', sizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn('h-full rounded-full', variants[variant])}
        />
      </div>
    </div>
  );
}
