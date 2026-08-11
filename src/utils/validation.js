/**
 * Chaque règle est une fonction pure (valeur) -> message d'erreur | null.
 * Le formulaire compose les règles nécessaires par champ (Strategy) sans
 * que Input ou Contact n'aient à connaître les détails d'implémentation.
 * Ajouter une règle = ajouter une fonction ici, zéro modification ailleurs
 * (Open/Closed Principle).
 */
export const required = (label) => (value) => (value?.trim() ? null : `${label} est requis.`);

export const minLength = (min, label) => (value) =>
  value && value.trim().length < min ? `${label} doit contenir au moins ${min} caractères.` : null;

export const isEmail = (value) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return value && !pattern.test(value) ? 'Adresse email invalide.' : null;
};

/**
 * Compose plusieurs stratégies et retourne la première erreur trouvée.
 */
export function runValidators(value, validators) {
  for (const validate of validators) {
    const error = validate(value);
    if (error) return error;
  }
  return null;
}

export const contactValidationSchema = {
  name: [required('Le nom'), minLength(2, 'Le nom')],
  email: [required('L\'email'), isEmail],
  message: [required('Le message'), minLength(10, 'Le message')],
};
