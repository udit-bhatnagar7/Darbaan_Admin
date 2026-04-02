import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface AccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
    id: string;
  }[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIds, setOpenIds] = React.useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('divide-y divide-border border rounded-lg overflow-hidden', className)}>
      {items.map((item) => (
        <div key={item.id} className="bg-card">
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors focus:outline-none"
          >
            <span className="font-medium text-sm">{item.title}</span>
            <motion.div
              animate={{ rotate: openIds.includes(item.id) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {openIds.includes(item.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-sm text-muted-foreground leading-relaxed">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
