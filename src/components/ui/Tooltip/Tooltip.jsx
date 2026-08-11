import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Tooltip.module.css';

/**
 * Tooltip
 * ------------------------------------------------------------------
 * Implémenté à 100% en CSS (::before/::after) via un attribut
 * data-tooltip : zéro re-render, zéro portail, zéro librairie.
 * Le contenu doit rester court (attr() ne supporte pas le HTML riche) —
 * pour un contenu riche, prévoir un Popover dédié plus tard.
 */
export function Tooltip({ children, label, placement = 'top', className }) {
  return (
    <span
      className={clsx(styles.wrapper, className)}
      data-tooltip={label}
      data-placement={placement}
      tabIndex={0}
    >
      {children}
    </span>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(['top', 'bottom']),
  className: PropTypes.string,
};
