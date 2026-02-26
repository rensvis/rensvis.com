import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'theme';
const DARK = 'dark';
const LIGHT = 'light';

function getInitialTheme(): string {
  if (typeof window === 'undefined') return LIGHT;
  return (
    localStorage.getItem(STORAGE_KEY) ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT)
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(LIGHT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getInitialTheme();
    setTheme(stored);
    document.documentElement.classList.toggle(DARK, stored === DARK);
  }, []);

  const toggle = () => {
    const next = theme === DARK ? LIGHT : DARK;
    setTheme(next);
    document.documentElement.classList.toggle(DARK, next === DARK);
    localStorage.setItem(STORAGE_KEY, next);
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={`Switch to ${theme === DARK ? 'light' : 'dark'} mode`}
    >
      {theme === DARK ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
