import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext, THEMES } from './theme-context.js';

/**
 * ThemeProvider
 * ------------------------------------------------------------------
 * Pattern Observer : ce Provider est le "sujet", tous les composants
 * consommateurs (useTheme) sont des observateurs notifiés à chaque
 * changement. Responsabilité unique (SRP) : gérer l'état du thème et
 * sa persistance — il ne connaît rien de l'UI qui l'affiche (le
 * bouton de bascule vit dans components/ui/ThemeToggle).
 */
const STORAGE_KEY = 'portfolio:theme';

function getPreferredTheme() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === THEMES.LIGHT || stored === THEMES.DARK) return stored;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? THEMES.DARK : THEMES.LIGHT;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
  }, []);

  const value = useMemo(
    () => ({ theme, isDark: theme === THEMES.DARK, toggleTheme, setTheme }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
