import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Badge.module.css';

const TONES = ['neutral', 'primary', 'secondary', 'success', 'info'];

/**
 * Badge — composant pur, aucune logique interne. Idéal pour illustrer
 * le principe "Composant = fonction pure de ses props".
 */
export function Badge({ children, tone = 'primary', dot = false, className, ...rest }) {
  return (
    <span className={clsx(styles.badge, styles[tone], dot && styles.dot, className)} {...rest}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node,
  tone: PropTypes.oneOf(TONES),
  dot: PropTypes.bool,
  className: PropTypes.string,
};
