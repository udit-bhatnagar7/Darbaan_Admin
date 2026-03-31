import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useUIStore } from '@/src/stores/uiStore';
import { cn } from '@/src/lib/utils';
import { CommandPalette } from '@/src/components/shared/CommandPalette';

export function AppShell() {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div
        className={cn(
          'flex flex-col transition-all duration-300',
          sidebarCollapsed ? 'pl-20' : 'pl-64'
        )}
      >
        <TopBar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
