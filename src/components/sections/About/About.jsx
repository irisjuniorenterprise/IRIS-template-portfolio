import { Reveal } from '../../ui/Reveal/index.js';
import { profile } from '../../../data/profile.js';
import styles from './About.module.css';

const STATS = [
  { value: '10+', label: 'Applications livrées' },
  { value: '5', label: 'Domaines maîtrisés' },
  { value: '100%', label: 'Projets fonctionnels' },
];

const FOCUS_AREAS = [
  'Sites web performantes (React)',
  'Chatbots avec Python et FastAPI',
  'Applications mobiles Flutter',
];

export function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <div className={styles.grid}>
          <Reveal variant="left">
            <span className={styles.kicker}>À propos</span>
            <h2 className={styles.heading}>Construire des produits, pas seulement du code</h2>
            <p className={styles.text}>
              Basé à {profile.location}, je développe des applications complètes — du backend à
              l&apos;interface — avec une attention particulière portée à la qualité, la
              maintenabilité et l&apos;expérience utilisateur finale.
            </p>
            <p className={styles.text}>
              Mon approche : découper les problèmes complexes en composants réutilisables,
              documenter mes choix techniques, et livrer un logiciel qui fonctionne réellement en
              production — pas seulement en démo.
            </p>

            <div className={styles.statGrid}>
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Ce que je fais</h3>
              <ul className={styles.cardList}>
                {FOCUS_AREAS.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
