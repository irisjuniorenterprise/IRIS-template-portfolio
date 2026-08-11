import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

/**
 * Card
 * ------------------------------------------------------------------
 * Pattern "Compound Component" : Card.Media / Card.Body / Card.Footer
 * partagent un contrat visuel commun sans que le parent n'impose leur
 * ordre ou leur présence — chaque consommateur compose librement,
 * comme <select><option/></select> en HTML natif.
 *
 * Le tracking de la position de la souris (variables CSS --mx/--my)
 * alimente l'effet "spotlight" défini dans Card.module.css (::after),
 * sans jamais manipuler le DOM directement (pas de ref requise).
 */
function handleSpotlight(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

export function Card({ children, interactive = true, className, ...rest }) {
  return (
    <div
      className={clsx(styles.card, interactive && styles.interactive, className)}
      onMouseMove={interactive ? handleSpotlight : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}

function Media({ src, alt = '', children }) {
  return <div className={styles.media}>{src ? <img src={src} alt={alt} loading="lazy" /> : children}</div>;
}

function Body({ children, className }) {
  return <div className={clsx(styles.body, className)}>{children}</div>;
}

function Footer({ children, className }) {
  return <div className={clsx(styles.footer, className)}>{children}</div>;
}

Card.Media = Media;
Card.Body = Body;
Card.Footer = Footer;

Card.propTypes = {
  children: PropTypes.node,
  interactive: PropTypes.bool,
  className: PropTypes.string,
};

Media.propTypes = { src: PropTypes.string, alt: PropTypes.string, children: PropTypes.node };
Body.propTypes = { children: PropTypes.node, className: PropTypes.string };
Footer.propTypes = { children: PropTypes.node, className: PropTypes.string };
