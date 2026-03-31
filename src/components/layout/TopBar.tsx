import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuthStore } from '@/src/stores/authStore';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { ThemeToggle } from './ThemeToggle';

export function TopBar() {
  const { user, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/70 px-6 backdrop-blur-md">
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search anything..." className="pl-10 bg-muted/50 border-border focus:ring-primary/40" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
        </Button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-3 border-l border-border pl-4 transition-opacity hover:opacity-80"
          >
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium leading-none text-foreground">{user?.name}</span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-1">{user?.role}</span>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 border border-primary/20 overflow-hidden">
              <User size={20} className="text-primary" />
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-3 w-56 bg-popover border border-border rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-50 py-2 backdrop-blur-md">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-xs text-muted-foreground">Signed in as <small className="font-medium">Agent</small></p>
                <p className="text-sm font-medium text-foreground truncate">{user?.email || 'uditbhatnagar@gmail.com'}</p>
              </div>
              <div className="py-1">
                <button type="button" className="w-full px-4 py-2.5 text-sm flex items-center gap-3 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <LayoutDashboard className="w-4 h-4 opacity-70" />
                  Listings
                </button>
                <button type="button" className="w-full px-4 py-2.5 text-sm flex items-center gap-3 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <User className="w-4 h-4 opacity-70" />
                  Profile
                </button>
              </div>
              <div className="h-px bg-border my-1"></div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-2.5 text-sm flex items-center gap-3 text-danger-600 hover:bg-danger-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
