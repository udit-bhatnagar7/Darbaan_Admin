import React from 'react';
import { cn } from '@/src/lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  className,
  status,
}: AvatarProps) {
  const [error, setError] = React.useState(false);

  const sizes = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-xl',
  };

  const statusColors = {
    online: 'bg-success-500',
    offline: 'bg-neutral-400',
    away: 'bg-warning-500',
    busy: 'bg-danger-500',
  };

  const statusSizes = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
  };

  return (
    <div className={cn('relative inline-flex flex-shrink-0', className)}>
      <div className={cn(
        'rounded-full overflow-hidden bg-muted flex items-center justify-center font-semibold text-muted-foreground border border-border',
        sizes[size]
      )}>
        {src && !error ? (
          <img
            src={src}
            alt={alt}
            onError={() => setError(true)}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span>{fallback || (alt ? alt.charAt(0).toUpperCase() : '?')}</span>
        )}
      </div>
      {status && (
        <span className={cn(
          'absolute bottom-0 right-0 rounded-full border-2 border-background',
          statusColors[status],
          statusSizes[size]
        )} />
      )}
    </div>
  );
}
