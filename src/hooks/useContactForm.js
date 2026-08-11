import { useCallback, useState } from 'react';
import { contactValidationSchema, runValidators } from '../utils/validation.js';

const INITIAL_VALUES = { name: '', email: '', message: '' };
const STATUS = { IDLE: 'idle', SUBMITTING: 'submitting', SUCCESS: 'success', ERROR: 'error' };

/**
 * useContactForm
 * ------------------------------------------------------------------
 * Isole toute la logique métier du formulaire (SRP) : le composant
 * Contact ne fait que "brancher" les valeurs retournées sur des
 * <Input/>. La validation utilise le schéma de utils/validation.js
 * (pattern Strategy), remplaçable sans toucher à ce hook.
 */
export function useContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(STATUS.IDLE);

  const handleChange = useCallback(
    (field) => (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    },
    []
  );

  const validate = useCallback(() => {
    const nextErrors = {};
    for (const field of Object.keys(contactValidationSchema)) {
      const error = runValidators(values[field], contactValidationSchema[field]);
      if (error) nextErrors[field] = error;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [values]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!validate()) return;

      setStatus(STATUS.SUBMITTING);
      try {
        // Point d'extension : brancher un vrai endpoint (API, EmailJS, etc.)
        await new Promise((resolve) => setTimeout(resolve, 900));
        setStatus(STATUS.SUCCESS);
        setValues(INITIAL_VALUES);
      } catch {
        setStatus(STATUS.ERROR);
      }
    },
    [validate]
  );

  return { values, errors, status, handleChange, handleSubmit, STATUS };
}
