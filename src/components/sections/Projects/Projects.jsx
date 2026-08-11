import { useMemo, useState } from 'react';
import { Card } from '../../ui/Card/index.js';
import { Badge } from '../../ui/Badge/index.js';
import { Button } from '../../ui/Button/index.js';
import { Modal } from '../../ui/Modal/index.js';
import { Reveal } from '../../ui/Reveal/index.js';
import { projects, projectCategories } from '../../../data/profile.js';
import styles from './Projects.module.css';

/**
 * Projects
 * ------------------------------------------------------------------
 * Le filtrage est une fonction pure dérivée de l'état (`activeFilter`)
 * via useMemo — pas de state dupliqué pour la liste filtrée, une
 * seule source de vérité (le tableau `projects` importé de data/).
 */
export function Projects() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Tous') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className={`section section--alt ${styles.projects}`}>
      <div className="container">
        <Reveal className={styles.header}>
          <h2 className={styles.heading}>Projets réalisés</h2>
          <p className={styles.subheading}>
            Une sélection d&apos;applications web, desktop et mobiles livrées récemment.
          </p>
        </Reveal>

        <div className={styles.filters} role="tablist" aria-label="Filtrer les projets par catégorie">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeFilter === category}
              className={`${styles.filterBtn} ${activeFilter === category ? styles.filterActive : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} variant="zoom" delay={index * 80}>
              <Card>
                <Card.Media>
                  <div className={styles.thumb}>{project.title.slice(0, 2).toUpperCase()}</div>
                </Card.Media>
                <Card.Body>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardSummary}>{project.summary}</p>
                  <div className={styles.tagRow}>
                    {project.tags.map((tag) => (
                      <Badge key={tag} tone="neutral">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
                <Card.Footer>
                  <Button variant="outline" size="sm" onClick={() => setSelectedProject(project)}>
                    Voir le détail
                  </Button>
                </Card.Footer>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title ?? ''}
      >
        {selectedProject && (
          <>
            <div className={styles.modalTags}>
              {selectedProject.tags.map((tag) => (
                <Badge key={tag} tone="primary">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className={styles.modalDescription}>{selectedProject.description}</p>
          </>
        )}
      </Modal>
    </section>
  );
}
