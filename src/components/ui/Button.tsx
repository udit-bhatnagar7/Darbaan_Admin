import React from 'react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'gradient' | 'link' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all duration-150',
      gradient: 'bg-gradient-to-r from-primary-600 to-secondary-500 text-white hover:opacity-90 shadow-md transition-all duration-150',
      secondary: 'bg-secondary text-secondary-foreground border border-border hover:bg-muted shadow-sm',
      outline: 'border border-border bg-transparent hover:bg-muted text-foreground',
      ghost: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      destructive: 'bg-danger-500 text-white hover:bg-danger-600 shadow-sm',
      success: 'bg-success-500 text-white hover:bg-success-600 shadow-sm',
      warning: 'bg-warning-500 text-white hover:bg-warning-600 shadow-sm',
      info: 'bg-info-500 text-white hover:bg-info-600 shadow-sm',
      link: 'text-primary underline-offset-4 hover:underline p-0 h-auto font-normal',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-8',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
