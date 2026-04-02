import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useUIStore } from '@/src/stores/uiStore';
import { useAuthStore } from '@/src/stores/authStore';
import { cn } from '@/src/lib/utils';
import { CommandPalette } from '@/src/components/shared/CommandPalette';

export function AppShell() {
  const { sidebarCollapsed, mobileMenuOpen, setMobileMenu } = useUIStore();
  const { user } = useAuthStore();

  const roleColor = React.useMemo(() => {
    if (!user) return undefined;
    switch (user.role) {
      case 'resident': return 'var(--color-resident)';
      case 'security': return 'var(--color-security)';
      case 'admin':
      case 'sc_member':
      case 'president': return 'var(--color-admin)';
      default: return undefined;
    }
  }, [user]);

  return (
    <div 
      className="min-h-screen bg-background" 
      style={roleColor ? { '--color-primary': roleColor, '--color-ring': roleColor } as React.CSSProperties : {}}
    >
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenu(false)}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <Sidebar />
      <div
        className={cn(
          'flex flex-col transition-all duration-300 min-h-screen',
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64',
          'pl-0' // No padding on mobile by default
        )}
      >
        <TopBar />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
        <footer className="py-4 px-4 sm:px-6 border-t border-border bg-card/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
            <div className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-rose-500/50 animate-pulse" />
              MADTIN Confidential - Internal Use Only
            </div>
            <div>
              © {new Date().getFullYear()} MADTIN. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
      <CommandPalette />
    </div>
  );
}
