import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Package,
  UserPlus,
  Building2,
  Home,
  Contact2,
  Truck,
  ShieldCheck,
  ClipboardList,
  Box,
  ShoppingCart,
  List,
  PlusCircle,
  Database
} from 'lucide-react';
import { useUIStore } from '@/src/stores/uiStore';
import { useAuthStore } from '@/src/stores/authStore';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/Button';

const navigation = [
  {
    group: 'DASHBOARD',
    color: 'text-primary-500 dark:text-primary-400',
    items: [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    ]
  },
  {
    group: 'COMMUNITY MANAGEMENT',
    color: 'text-info-500 dark:text-info-400',
    items: [
      { name: 'New Registration', href: '/registration', icon: UserPlus },
      { name: 'Society', href: '/society', icon: Building2 },
      { name: 'Homes', href: '/homes', icon: Home },
      { name: 'Users', href: '/users', icon: Users },
      { name: 'Staff', href: '/staff', icon: Contact2 },
      { name: 'Vendors', href: '/vendors', icon: Truck },
    ]
  },
  {
    group: 'VENDOR MANAGEMENT',
    color: 'text-success-500 dark:text-success-400',
    items: [
      { name: 'Vendor Master', href: '/vendor-master', icon: ShieldCheck },
    ]
  },
  {
    group: 'HOME SHOPPING',
    color: 'text-warning-500 dark:text-warning-400',
    items: [
      { name: 'Inventory', href: '/inventory', icon: ClipboardList },
      { name: 'Product Stock', href: '/stock', icon: Box },
      { name: 'Procurement', href: '/procurement', icon: ShoppingCart },
      { name: 'Product List', href: '/products', icon: List },
      { name: 'Add Product', href: '/add-product', icon: PlusCircle },
    ]
  },
  {
    group: 'LOOKUP',
    color: 'text-rose-500 dark:text-rose-400',
    items: [
      { name: 'Lookup Data', href: '/lookup', icon: Database },
    ]
  },
  {
    group: 'SYSTEM',
    color: 'text-neutral-500 dark:text-neutral-400',
    items: [
      { name: 'Utilities', href: '/utilities', icon: Package },
      { name: 'Settings', href: '/settings', icon: Settings },
    ]
  }
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { logout } = useAuthStore();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300',
        sidebarCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!sidebarCollapsed && (
            <span className="text-xl font-bold tracking-tight text-gradient">Darbaan Admin</span>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-6 px-2 py-4 scrollbar-hide">
          {navigation.map((group) => (
            <div key={group.group} className="space-y-1">
              {!sidebarCollapsed && (
                <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {group.group}
                </h3>
              )}
              {sidebarCollapsed && (
                <div className="h-px bg-border mx-2 my-4" />
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'group relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-150 ease-in-out',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <div className="absolute left-0 h-6 w-1 rounded-r-full bg-primary" />
                        )}
                        <item.icon
                          className={cn(
                            'h-5 w-5 shrink-0 transition-colors',
                            !sidebarCollapsed && 'mr-3',
                            isActive
                              ? 'text-primary'
                              : cn('text-muted-foreground group-hover:opacity-80', group.color)
                          )}
                          aria-hidden="true"
                        />
                        {!sidebarCollapsed && <span>{item.name}</span>}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <Button
            variant="ghost"
            className={cn('w-full justify-start text-muted-foreground hover:bg-destructive/10 hover:text-destructive', sidebarCollapsed && 'px-0 justify-center')}
            onClick={logout}
          >
            <LogOut className={cn('h-5 w-5', !sidebarCollapsed && 'mr-3')} />
            {!sidebarCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
