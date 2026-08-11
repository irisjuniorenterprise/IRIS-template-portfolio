import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ThemeToggle } from '../../ui/ThemeToggle/index.js';
import { Button } from '../../ui/Button/index.js';
import { MenuIcon, CloseIcon } from '../../ui/icons.jsx';
import { profile } from '../../../data/profile.js';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Projets', href: '#projects' },
  { label: 'Parcours', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Header
 * ------------------------------------------------------------------
 * Deux responsabilités isolées via deux effets :
 *  - Détection du scroll pour l'ombre "is-scrolled" (présentation)
 *  - Verrouillage du scroll body quand le menu mobile est ouvert
 * Le contenu de navigation (NAV_LINKS) est injectable/éditable en un
 * seul endroit — le composant ne connaît que la structure.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isMenuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [isMenuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={clsx(styles.header, isScrolled && styles.scrolled)}>
      <div className={clsx('container', styles.inner)}>
        <a href="#top" className={styles.logo}>
          {profile.name.split(' ')[0]}
        </a>

        <nav className={styles.nav} aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <Button as="a" href="#contact" variant="primary" size="sm" className={styles.ctaDesktop}>
            Me contacter
          </Button>
          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className={styles.mobileMenu} aria-label="Navigation mobile">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <Button as="a" href="#contact" variant="primary" onClick={closeMenu}>
            Me contacter
          </Button>
        </nav>
      )}
    </header>
  );
}
