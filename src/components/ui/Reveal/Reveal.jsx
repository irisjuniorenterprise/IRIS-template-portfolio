import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useScrollReveal } from '../../../hooks/useScrollReveal.js';
import styles from './Reveal.module.css';

const VARIANT_CLASS = {
  up: '',
  left: 'fromLeft',
  right: 'fromRight',
  zoom: 'zoom',
};

/**
 * Reveal
 * ------------------------------------------------------------------
 * Wrapper déclaratif : <Reveal><h2>...</h2></Reveal>. Sépare la
 * logique de détection (useScrollReveal) de la présentation (CSS
 * transitions), conformément au SRP. `delay` permet un effet de
 * cascade sans re-render supplémentaire (variable CSS uniquement).
 */
export function Reveal({ children, as: Component = 'div', variant = 'up', delay = 0, className }) {
  const [ref, isVisible] = useScrollReveal();
  const variantClass = VARIANT_CLASS[variant] ? styles[VARIANT_CLASS[variant]] : null;

  return (
    <Component
      ref={ref}
      className={clsx(styles.reveal, variantClass, isVisible && styles.visible, className)}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Component>
  );
}

Reveal.propTypes = {
  children: PropTypes.node,
  as: PropTypes.elementType,
  variant: PropTypes.oneOf(['up', 'left', 'right', 'zoom']),
  delay: PropTypes.number,
  className: PropTypes.string,
};
