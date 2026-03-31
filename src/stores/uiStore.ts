import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';
type Density = 'compact' | 'comfortable';

interface UIState {
  sidebarCollapsed: boolean;
  theme: Theme;
  density: Density;
  toggleSidebar: () => void;
  setSidebar: (collapsed: boolean) => void;
  setTheme: (theme: Theme) => void;
  setDensity: (density: Density) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      theme: 'system',
      density: 'comfortable',
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebar: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setTheme: (theme) => set({ theme }),
      setDensity: (density) => set({ density }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
