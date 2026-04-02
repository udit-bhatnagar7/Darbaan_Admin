import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  variant?: 'pills' | 'underline' | 'ghost';
}

export function Tabs({ tabs, defaultTab, className, variant = 'underline' }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id);

  return (
    <div className={cn('space-y-4 w-full', className)}>
      <div className={cn(
        'flex items-center gap-1 p-1 rounded-lg',
        variant === 'pills' ? 'bg-muted/50 border border-border' : 'border-b border-border'
      )}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none flex items-center gap-2',
              activeTab === tab.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
            {tab.label}
            {activeTab === tab.id && variant === 'underline' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            {activeTab === tab.id && variant === 'pills' && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-background rounded-md shadow-sm -z-10"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
