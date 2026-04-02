import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, LayoutDashboard, LogOut, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthStore } from '@/src/stores/authStore';
import { useUIStore } from '@/src/stores/uiStore';
import { cn } from '@/src/lib/utils';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { ThemeToggle } from './ThemeToggle';

export function TopBar() {
  const { user, logout } = useAuthStore();
  const { toggleMobileMenu } = useUIStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, title: 'New User Registered', time: '2 mins ago', type: 'user' },
    { id: 2, title: 'System Update Completed', time: '1 hour ago', type: 'system' },
    { id: 3, title: 'New Order Received', time: '3 hours ago', type: 'order' },
    { id: 4, title: 'Server Load High', time: '5 hours ago', type: 'alert' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/70 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex flex-1 items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMobileMenu}
          className="lg:hidden"
        >
          <Menu size={18} />
        </Button>

        <div className={cn(
          "relative w-full max-w-md transition-all duration-300",
          isSearchVisible ? "flex" : "hidden sm:flex"
        )}>
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search anything..." className="pl-10 bg-muted/50 border-border focus:ring-primary/40" />
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          className="sm:hidden"
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        >
          <Search size={18} />
        </Button>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="hidden xs:block">
          <ThemeToggle />
        </div>
        
        <div className="relative" ref={notificationRef}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
          </Button>

          <AnimatePresence>
            {isNotificationOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-3 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-popover border border-border rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-50 backdrop-blur-md"
              >
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                  <span className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">4 New</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                  {notifications.map((notif) => (
                    <button 
                      key={notif.id}
                      className="w-full px-4 py-3 flex items-start gap-3 hover:bg-muted transition-colors text-left border-b border-border/50 last:border-0"
                    >
                      <div className="mt-0.5 h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <Bell size={12} className="text-muted-foreground" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-medium text-foreground">{notif.title}</p>
                        <p className="text-xs text-muted-foreground">{notif.time}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-2 border-t border-border">
                  <Button variant="ghost" className="w-full text-xs h-8 text-primary hover:text-primary hover:bg-primary/5">
                    View all notifications
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 sm:space-x-3 border-l border-border pl-2 sm:pl-4 transition-opacity hover:opacity-80"
          >
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium leading-none text-foreground">{user?.name}</span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-1">{user?.role}</span>
            </div>
            <div className="flex h-10 w-10 sm:h-8 w-8 items-center justify-center rounded-full bg-primary/10 border border-primary/20 overflow-hidden">
              <User size={14} className="text-primary sm:size-16" />
            </div>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-3 w-[calc(100vw-2rem)] sm:w-56 max-w-xs bg-popover border border-border rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-50 py-2 backdrop-blur-md"
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
