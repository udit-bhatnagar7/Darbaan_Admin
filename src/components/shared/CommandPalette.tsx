import React from 'react';
import { Search, Command as CommandIcon, LayoutDashboard, Users, Settings, BarChart3, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export function CommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const actions = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Users', icon: Users, href: '/users' },
    { name: 'Analytics', icon: BarChart3, href: '/analytics' },
    { name: 'Utilities', icon: Package, href: '/utilities' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ].filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 pt-[15vh] backdrop-blur-sm px-4">
      <div className="w-full max-w-xl overflow-hidden rounded-xl border bg-card shadow-2xl">
        <div className="flex items-center border-b px-4">
          <Search className="mr-2 h-5 w-5 text-muted-foreground" />
          <input
            autoFocus
            className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-center space-x-1 rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">ESC</span>
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto p-2">
          {actions.length > 0 ? (
            <div className="space-y-1">
              {actions.map((action) => (
                <button
                  key={action.name}
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  onClick={() => {
                    navigate(action.href);
                    setIsOpen(false);
                  }}
                >
                  <action.icon className="mr-3 h-4 w-4 text-muted-foreground" />
                  {action.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-muted-foreground">No results found.</div>
          )}
        </div>

        <div className="flex items-center justify-between border-t bg-muted/50 px-4 py-3 text-[10px] text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <kbd className="mr-1 rounded border bg-background px-1">↵</kbd> to select
            </span>
            <span className="flex items-center">
              <kbd className="mr-1 rounded border bg-background px-1">↑↓</kbd> to navigate
            </span>
          </div>
          <span>Darbaan Command Palette</span>
        </div>
      </div>
    </div>
  );
}
