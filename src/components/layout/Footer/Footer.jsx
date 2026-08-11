import { useEffect, useState } from 'react';
import { ICONS } from '../../ui/icons.registry.js';
import { profile } from '../../../data/profile.js';
import styles from './Footer.module.css';

/**
 * BackToTop
 * ------------------------------------------------------------------
 * Composant isolé avec sa propre logique de visibilité (SRP) : le
 * Footer n'a pas à savoir comment/quand ce bouton apparaît.
 */
function BackToTop() {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 480);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="#top"
      className={`${styles.backToTop} ${isVisible ? styles.visible : ''}`}
      aria-label="Retour en haut de page"
    >
      ↑
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className={styles.footer}>
        <div className={`container ${styles.inner}`}>
          <div>
            <div className={styles.brand}>{profile.name.split(' ')[0]}</div>
            <p className={styles.tagline}>{profile.role}</p>
          </div>

          <div className={styles.socials}>
            {profile.social.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={styles.socialLink}
                  aria-label={item.label}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {Icon && <Icon />}
                </a>
              );
            })}
          </div>
        </div>

        <div className={styles.bottom}>
          © {year} {profile.name}. Construit avec React &amp; passion.
        </div>
      </footer>

      <BackToTop />
    </>
  );
}
