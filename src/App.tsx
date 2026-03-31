import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from './lib/queryClient';
import { AppRouter } from './app/router';
import { useUIStore } from './stores/uiStore';

export default function App() {
  const { theme } = useUIStore();
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    let timer: NodeJS.Timeout;

    const applyTheme = (currentTheme: string) => {
      // Add transition class
      root.classList.add('theme-transition');
      
      root.classList.remove('light', 'dark');
      
      let effectiveTheme = currentTheme;
      if (currentTheme === 'system') {
        effectiveTheme = mediaQuery.matches ? 'dark' : 'light';
      }
      
      root.classList.add(effectiveTheme);
      setIsDark(effectiveTheme === 'dark');

      // Remove transition class after transition completes
      clearTimeout(timer);
      timer = setTimeout(() => {
        root.classList.remove('theme-transition');
      }, 1000); // Slightly longer than transition duration
    };

    applyTheme(theme);

    const listener = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => {
      mediaQuery.removeEventListener('change', listener);
      clearTimeout(timer);
    };
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster position="bottom-right" closeButton richColors theme={isDark ? 'dark' : 'light'} />
    </QueryClientProvider>
  );
}
