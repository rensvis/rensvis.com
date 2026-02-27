import { useEffect, useState, useCallback } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const STORAGE_KEY = 'theme';
const LIGHT = 'light';
const DARK = 'dark';
const SYSTEM = 'system';

type ThemeMode = typeof LIGHT | typeof DARK | typeof SYSTEM;

function getStoredMode(): ThemeMode {
  if (typeof window === 'undefined') return SYSTEM;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === LIGHT || stored === DARK || stored === SYSTEM) return stored;
  return SYSTEM;
}

function getEffectiveTheme(mode: ThemeMode): typeof LIGHT | typeof DARK {
  if (mode === LIGHT) return LIGHT;
  if (mode === DARK) return DARK;
  if (typeof window === 'undefined') return LIGHT;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
}

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle(DARK, isDark);
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(SYSTEM);

  const applyFromMode = useCallback((m: ThemeMode) => {
    const effective = m === SYSTEM ? getEffectiveTheme(SYSTEM) : m;
    applyTheme(effective === DARK);
  }, []);

  useEffect(() => {
    const stored = getStoredMode();
    setMode(stored);
    applyFromMode(stored);
  }, [applyFromMode]);

  useEffect(() => {
    if (mode !== SYSTEM) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyFromMode(SYSTEM);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode, applyFromMode]);

  const setModeAndPersist = (m: ThemeMode) => {
    setMode(m);
    applyFromMode(m);
    localStorage.setItem(STORAGE_KEY, m);
  };

  const effectiveTheme = getEffectiveTheme(mode);
  const label =
    mode === LIGHT
      ? 'Light mode'
      : mode === DARK
        ? 'Dark mode'
        : `System (${effectiveTheme})`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Theme: ${label}. Open theme menu`}
          aria-haspopup="listbox"
        >
          {/* Icon via CSS from html.dark (set before paint) – no flash */}
          <Sun className="h-5 w-5 block dark:hidden" />
          <Moon className="h-5 w-5 hidden dark:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={mode} onValueChange={(v) => setModeAndPersist(v as ThemeMode)}>
          <DropdownMenuRadioItem value={LIGHT}>
            <Sun className="size-4" />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={DARK}>
            <Moon className="size-4" />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={SYSTEM}>
            <Monitor className="size-4" />
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
