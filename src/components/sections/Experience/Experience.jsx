import { Reveal } from '../../ui/Reveal/index.js';
import { experiences } from '../../../data/profile.js';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <section id="experience" className={`section ${styles.experience}`}>
      <div className="container">
        <Reveal className={styles.header}>
          <h2 className={styles.heading}>Parcours</h2>
          <p className={styles.subheading}>Les grandes étapes de mon expérience.</p>
        </Reveal>

        <ol className={styles.timeline}>
          {experiences.map((exp, index) => (
            <Reveal as="li" key={exp.id} variant="left" delay={index * 100} className={styles.item}>
              <span className={styles.period}>{exp.period}</span>
              <h3 className={styles.title}>{exp.title}</h3>
              <p className={styles.org}>{exp.org}</p>
              <p className={styles.description}>{exp.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
