import { useScrollReveal } from '../../../hooks/useScrollReveal.js';
import { Reveal } from '../../ui/Reveal/index.js';
import { skills } from '../../../data/profile.js';
import styles from './Skills.module.css';

/**
 * SkillBar
 * ------------------------------------------------------------------
 * Isole sa propre détection de visibilité (useScrollReveal) pour que
 * chaque barre anime son remplissage indépendamment au moment précis
 * où elle entre dans le viewport, plutôt qu'une seule fois pour toute
 * la section.
 */
function SkillBar({ name, level, category }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.4 });

  return (
    <div ref={ref} className={styles.item}>
      <div className={styles.itemHead}>
        <span className={styles.itemName}>{name}</span>
        <span className={styles.itemCategory}>{category}</span>
      </div>
      <div className={styles.track} role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100} aria-label={name}>
        <div className={styles.fill} style={{ '--fill': isVisible ? `${level}%` : '0%' }} />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className={`section section--alt ${styles.skills}`}>
      <div className="container">
        <Reveal className={styles.header}>
          <h2 className={styles.heading}>Compétences techniques</h2>
          <p className={styles.subheading}>
            Un socle full-stack complété par des compétences desktop, mobile et IoT.
          </p>
        </Reveal>

        <div className={styles.grid}>
          {skills.map((skill) => (
            <SkillBar key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
