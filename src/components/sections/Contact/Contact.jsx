import { Input } from '../../ui/Input/index.js';
import { Button } from '../../ui/Button/index.js';
import { Reveal } from '../../ui/Reveal/index.js';
import { MailIcon } from '../../ui/icons.jsx';
import { useContactForm } from '../../../hooks/useContactForm.js';
import { profile } from '../../../data/profile.js';
import styles from './Contact.module.css';

/**
 * Contact
 * ------------------------------------------------------------------
 * Composant de présentation pur : toute la logique (état, validation,
 * soumission) vit dans useContactForm. Contact se contente de relier
 * les valeurs/erreurs du hook aux composants Input/Button (SRP).
 */
export function Contact() {
  const { values, errors, status, handleChange, handleSubmit, STATUS } = useContactForm();

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        <div className={styles.grid}>
          <Reveal variant="left">
            <h2 className={styles.heading}>Discutons de votre projet</h2>
            <p className={styles.text}>
              Une idée, un besoin technique précis ou simplement envie d&apos;échanger ? Envoyez-moi
              un message, je réponds généralement sous 24h.
            </p>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <MailIcon />
                </span>
                <span>{profile.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📍</span>
                <span>{profile.location}</span>
              </div>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <Input
                label="Votre nom"
                required
                value={values.name}
                onChange={handleChange('name')}
                error={errors.name}
              />
              <Input
                label="Votre email"
                type="email"
                required
                value={values.email}
                onChange={handleChange('email')}
                error={errors.email}
              />
              <div>
                <textarea
                  className={styles.textarea}
                  placeholder="Votre message..."
                  required
                  value={values.message}
                  onChange={handleChange('message')}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && (
                  <span role="alert" style={{ color: 'var(--state-danger)', fontSize: 'var(--fs-xs)' }}>
                    {errors.message}
                  </span>
                )}
              </div>

              <Button type="submit" variant="primary" isLoading={status === STATUS.SUBMITTING}>
                Envoyer le message
              </Button>

              {status === STATUS.SUCCESS && (
                <p className={`${styles.feedback} ${styles.success}`} role="status">
                  Message envoyé avec succès ! Je reviens vers vous rapidement.
                </p>
              )}
              {status === STATUS.ERROR && (
                <p className={`${styles.feedback} ${styles.error}`} role="alert">
                  Une erreur est survenue. Merci de réessayer.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
