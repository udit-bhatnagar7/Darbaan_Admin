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
  Database,
  Link as LinkIcon,
  CreditCard,
  Receipt,
  Tag,
  Kanban,
  UserCheck,
  Bell,
  Palette,
  ChevronDown
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
      { name: 'Quick Links', href: '/quick-links', icon: LinkIcon },
    ]
  },
  {
    group: 'SALES & LEADS',
    color: 'text-indigo-500 dark:text-indigo-400',
    items: [
      { name: 'Leads Pipeline', href: '/leads', icon: Kanban },
      { name: 'Referrals', href: '/leads/referrals', icon: UserCheck },
    ]
  },
  {
    group: 'BILLING & REVENUE',
    color: 'text-emerald-500 dark:text-emerald-400',
    items: [
      { name: 'Payment Links', href: '/billing/payment-links', icon: CreditCard },
      { name: 'Due Payments', href: '/billing/due-payments', icon: Receipt },
      { name: 'Offers & Codes', href: '/billing/offers', icon: Tag },
    ]
  },
  {
    group: 'COMMUNITY MANAGEMENT',
    color: 'text-info-500 dark:text-info-400',
    items: [
      { 
        name: 'New Registration', 
        icon: UserPlus,
        subItems: [
          { name: 'Register Society', href: '/registration' },
          { name: 'Add Amenities', href: '/registration/add-amenity' }
        ]
      },
      { name: 'Society', href: '/society', icon: Building2 },
      { name: 'Homes', href: '/homes', icon: Home },
      { name: 'Users', href: '/users', icon: Users },
      { name: 'Community Staff', href: '/community-staff', icon: Contact2 },
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
      { name: 'Staff & Permissions', href: '/staff', icon: ShieldCheck },
      { name: 'Notifications', href: '/notifications', icon: Bell },
      { name: 'Utilities', href: '/utilities', icon: Package },
      { name: 'Design System', href: '/settings/design-system', icon: Palette },
      { name: 'Settings', href: '/settings', icon: Settings },
    ]
  }
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, mobileMenuOpen, setMobileMenu } = useUIStore();
  const { logout } = useAuthStore();
  const [expandedMenus, setExpandedMenus] = React.useState<Record<string, boolean>>({
    'New Registration': true
  });

  const toggleMenu = (name: string) => {
    if (sidebarCollapsed && !mobileMenuOpen) {
      toggleSidebar();
    }
    setExpandedMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300',
        'lg:translate-x-0', // Always show on desktop
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full', // Toggle on mobile
        'w-64', // Default width for mobile
        sidebarCollapsed ? 'lg:w-20' : 'lg:w-64' // Responsive width for desktop
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {(!sidebarCollapsed || mobileMenuOpen) && (
            <span className="text-xl font-bold tracking-tight text-gradient">Darbaan Admin</span>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden lg:flex">
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenu(false)} className="lg:hidden">
            <ChevronLeft size={18} />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-6 px-2 py-4 scrollbar-hide">
          {navigation.map((group) => (
            <div key={group.group} className="space-y-1">
              {(!sidebarCollapsed || mobileMenuOpen) && (
                <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {group.group}
                </h3>
              )}
              {(sidebarCollapsed && !mobileMenuOpen) && (
                <div className="h-px bg-border mx-2 my-4" />
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const hasSubItems = item.subItems && item.subItems.length > 0;
                  const isExpanded = expandedMenus[item.name];

                  return (
                    <div key={item.name} className="space-y-1">
                      {hasSubItems ? (
                        <button
                          onClick={() => toggleMenu(item.name)}
                          className={cn(
                            'w-full group relative flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all duration-150 ease-in-out text-muted-foreground hover:bg-muted hover:text-foreground'
                          )}
                        >
                          <div className="flex items-center">
                            <item.icon
                              className={cn(
                                'h-3.5 w-3.5 shrink-0 transition-colors',
                                (!sidebarCollapsed || mobileMenuOpen) && 'mr-3',
                                cn('text-muted-foreground group-hover:opacity-80', group.color)
                              )}
                              aria-hidden="true"
                            />
                            {(!sidebarCollapsed || mobileMenuOpen) && <span>{item.name}</span>}
                          </div>
                          {(!sidebarCollapsed || mobileMenuOpen) && (
                            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", isExpanded ? "rotate-180" : "")} />
                          )}
                        </button>
                      ) : (
                        <NavLink
                          to={item.href!}
                          end
                          onClick={() => setMobileMenu(false)}
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
                                  'h-3.5 w-3.5 shrink-0 transition-colors',
                                  (!sidebarCollapsed || mobileMenuOpen) && 'mr-3',
                                  isActive
                                    ? 'text-primary'
                                    : cn('text-muted-foreground group-hover:opacity-80', group.color)
                                )}
                                aria-hidden="true"
                              />
                              {(!sidebarCollapsed || mobileMenuOpen) && <span>{item.name}</span>}
                            </>
                          )}
                        </NavLink>
                      )}

                      {/* Sub Items */}
                      {hasSubItems && isExpanded && (!sidebarCollapsed || mobileMenuOpen) && (
                        <div className="ml-6 mt-1 space-y-1 border-l border-border pl-2">
                          {item.subItems!.map((subItem) => (
                            <NavLink
                              key={subItem.name}
                              to={subItem.href}
                              end
                              onClick={() => setMobileMenu(false)}
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
                                    <div className="absolute -left-[9px] h-1.5 w-1.5 rounded-full bg-primary" />
                                  )}
                                  <span>{subItem.name}</span>
                                </>
                              )}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <Button
            variant="ghost"
            className={cn('w-full justify-start text-muted-foreground hover:bg-destructive/10 hover:text-destructive', (sidebarCollapsed && !mobileMenuOpen) && 'px-0 justify-center')}
            onClick={() => {
              logout();
              setMobileMenu(false);
            }}
          >
            <LogOut className={cn('h-3.5 w-3.5', (!sidebarCollapsed || mobileMenuOpen) && 'mr-3')} />
            {(!sidebarCollapsed || mobileMenuOpen) && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
