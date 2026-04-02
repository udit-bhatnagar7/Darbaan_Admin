import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';
type Density = 'compact' | 'comfortable';

interface UIState {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  theme: Theme;
  density: Density;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  setMobileMenu: (open: boolean) => void;
  setSidebar: (collapsed: boolean) => void;
  setTheme: (theme: Theme) => void;
  setDensity: (density: Density) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileMenuOpen: false,
      theme: 'system',
      density: 'comfortable',
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      setMobileMenu: (open) => set({ mobileMenuOpen: open }),
      setSidebar: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setTheme: (theme) => set({ theme }),
      setDensity: (density) => set({ density }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
