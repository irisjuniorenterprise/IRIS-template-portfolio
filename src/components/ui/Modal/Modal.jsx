import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Modal
 * ------------------------------------------------------------------
 * Responsabilités isolées (SRP) :
 *  - createPortal : sortir du flux DOM parent (évite les problèmes de
 *    z-index / overflow hidden des sections).
 *  - useEffect #1 : verrouille le scroll du body pendant l'ouverture.
 *  - useEffect #2 : piège le focus (a11y clavier) + fermeture Échap.
 * Le contenu métier est toujours fourni en `children` — Modal ignore
 * tout du domaine qu'il affiche (Dependency Inversion).
 */
export function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const previouslyFocused = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    previouslyFocused.current = document.activeElement;
    const node = modalRef.current;
    const focusables = node.querySelectorAll(FOCUSABLE_SELECTOR);
    (focusables[0] ?? node).focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className={styles.header}>
          <h3 id={titleId} className={styles.title}>
            {title}
          </h3>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fermer la fenêtre"
          />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
