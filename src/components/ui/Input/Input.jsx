import { useId, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

/**
 * Input
 * ------------------------------------------------------------------
 * Composant contrôlé (SRP : affichage + accessibilité uniquement).
 * La validation métier (règles, messages) est injectée depuis
 * l'extérieur via `error` — Input ne connaît aucune règle de
 * validation, il ne fait qu'afficher un état (Inversion de
 * dépendance vers les stratégies de validation du formulaire parent).
 */
export function Input({
  label,
  value,
  onChange,
  type = 'text',
  hint,
  error,
  required = false,
  className,
  ...rest
}) {
  const [touched, setTouched] = useState(false);
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const filled = Boolean(value);

  return (
    <div className={clsx(styles.field, error && touched && styles.hasError, className)}>
      <div className={styles.inputWrap}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
          required={required}
          aria-invalid={Boolean(error && touched)}
          aria-describedby={clsx(hint && hintId, error && touched && errorId)}
          className={clsx(styles.input, filled && styles.filled)}
          placeholder=" "
          {...rest}
        />
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && ' *'}
        </label>
      </div>
      {hint && !error && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
      {error && touched && (
        <span id={errorId} role="alert" className={styles.errorText}>
          {error}
        </span>
      )}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  hint: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};
