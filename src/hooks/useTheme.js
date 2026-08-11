import { useContext } from 'react';
import { ThemeContext } from '../context/theme-context.js';

/**
 * useTheme
 * Fail-fast : lève une erreur explicite si utilisé hors du Provider,
 * plutôt que de retourner un état invalide silencieusement.
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme doit être utilisé à l\'intérieur de <ThemeProvider>');
  }
  return ctx;
}
