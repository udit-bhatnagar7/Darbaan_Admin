import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/src/lib/utils';

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function SlideOver({ isOpen, onClose, title, description, children, footer }: SlideOverProps) {
  // Prevent body scroll when the slide-over is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />
          
          {/* SlideOver Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[100] w-full max-w-md border-l border-border bg-card shadow-2xl sm:max-w-lg flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-border bg-muted/20">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
