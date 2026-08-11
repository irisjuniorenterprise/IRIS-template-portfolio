import clsx from 'clsx';
import { useTheme } from '../../../hooks/useTheme.js';
import { SunIcon, MoonIcon } from '../icons.jsx';
import styles from './ThemeToggle.module.css';

/**
 * ThemeToggle
 * ------------------------------------------------------------------
 * Consommateur "pur" du ThemeContext : toute la logique vit dans
 * ThemeProvider (Observer). Ce composant ne fait que refléter et
 * déclencher un changement d'état (SRP).
 */
export function ThemeToggle({ className }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={clsx(styles.toggle, className)}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      <SunIcon className={clsx(styles.icon, isDark && styles.hidden)} />
      <MoonIcon className={clsx(styles.icon, !isDark && styles.hidden)} />
    </button>
  );
}
