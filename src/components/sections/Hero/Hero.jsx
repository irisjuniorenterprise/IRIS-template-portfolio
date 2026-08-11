import { Button } from '../../ui/Button/index.js';
import { Reveal } from '../../ui/Reveal/index.js';
import { ArrowRightIcon } from '../../ui/icons.jsx';
import { ICONS } from '../../ui/icons.registry.js';
import { profile } from '../../../data/profile.js';
import styles from './Hero.module.css';

/**
 * Hero
 * ------------------------------------------------------------------
 * Consomme `profile` (data/profile.js) — aucun texte en dur. Pour
 * changer le nom, le rôle ou les liens sociaux, on édite uniquement
 * la couche data, jamais ce composant (séparation des préoccupations).
 */
export function Hero() {
  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    <section id="top" className={styles.hero}>
      <span className={`${styles.orb} ${styles.orbAccent}`} aria-hidden="true" />
      <span className={`${styles.orb} ${styles.orbSecondary}`} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div>
          <Reveal variant="left">
            <span className={styles.eyebrow}>Disponible pour de nouveaux projets</span>
            <h1 className={styles.title}>
              {profile.name} —<br />
              <span className={styles.titleAccent}>{profile.role}</span>
            </h1>
            <p className={styles.tagline}>{profile.tagline}</p>
          </Reveal>

          <Reveal variant="left" delay={120}>
            <div className={styles.actions}>
              <Button as="a" href="#projects" variant="secondary" icon={<ArrowRightIcon />} iconPosition="right">
                Voir mes projets
              </Button>
              <Button as="a" href="#contact" variant="outline">
                Me contacter
              </Button>
            </div>
          </Reveal>

          <Reveal variant="left" delay={220}>
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
          </Reveal>
        </div>

        <Reveal variant="zoom" delay={160} className={styles.visualWrap}>
          <div className={styles.avatarRing}>
            <div className={styles.avatarInner}>{initials}</div>
          </div>
        </Reveal>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>Scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
