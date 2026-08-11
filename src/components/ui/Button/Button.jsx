import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { BUTTON_VARIANTS, BUTTON_SIZES } from './Button.strategies.js';
import styles from './Button.module.css';

/**
 * Button
 * ------------------------------------------------------------------
 * Composant "dumb" (SRP) : ne connaît que sa présentation. La logique
 * métier déclenchée au clic est toujours injectée via `onClick`
 * (Dependency Inversion — Button dépend d'une abstraction `onClick`,
 * jamais d'une implémentation concrète).
 *
 * `forwardRef` : permet aux composants parents (ex: Tooltip, formulaires)
 * d'accéder au nœud DOM sans que Button n'ait à le savoir.
 */
export const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    as: Component = 'button',
    icon = null,
    iconPosition = 'left',
    isLoading = false,
    className,
    ...rest
  },
  ref
) {
  const content = isLoading ? (
    <span className={styles.spinner} aria-hidden="true" />
  ) : (
    <>
      {icon && iconPosition === 'left' && (
        <span className={styles.icon}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={styles.icon}>{icon}</span>
      )}
    </>
  );

  return (
    <Component
      ref={ref}
      className={clsx(styles.btn, styles[variant], styles[size], className)}
      aria-busy={isLoading || undefined}
      disabled={Component === 'button' ? rest.disabled || isLoading : undefined}
      {...rest}
    >
      {content}
    </Component>
  );
});

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(BUTTON_VARIANTS),
  size: PropTypes.oneOf(BUTTON_SIZES),
  as: PropTypes.elementType,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};
