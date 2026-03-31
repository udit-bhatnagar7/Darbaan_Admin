import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useUIStore } from '@/src/stores/uiStore';
import { Button } from '@/src/components/ui/Button';

export function ThemeToggle() {
  const { theme, setTheme } = useUIStore();
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const root = window.document.documentElement;
    setIsDark(root.classList.contains('dark'));
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
