import { describe, expect, it } from 'vitest';
import { required, minLength, isEmail, runValidators, contactValidationSchema } from '../utils/validation.js';

describe('validation strategies', () => {
  it('required refuse une valeur vide ou faite uniquement d\'espaces', () => {
    const validate = required('Le nom');
    expect(validate('')).toMatch(/requis/);
    expect(validate('   ')).toMatch(/requis/);
    expect(validate('Yassine')).toBeNull();
  });

  it('minLength refuse une valeur trop courte', () => {
    const validate = minLength(3, 'Le message');
    expect(validate('ab')).toMatch(/au moins 3/);
    expect(validate('abc')).toBeNull();
  });

  it('isEmail valide uniquement un format email correct', () => {
    expect(isEmail('pas-un-email')).toMatch(/invalide/);
    expect(isEmail('test@example.com')).toBeNull();
  });

  it('runValidators retourne la première erreur rencontrée', () => {
    const error = runValidators('', [required('Champ'), minLength(5, 'Champ')]);
    expect(error).toMatch(/requis/);
  });

  it('runValidators retourne null si toutes les règles passent', () => {
    const error = runValidators('valeur-valide', [required('Champ'), minLength(3, 'Champ')]);
    expect(error).toBeNull();
  });

  it('le schéma de contact valide un jeu de données correct', () => {
    const validData = { name: 'Yassine', email: 'yassine@iris.dev', message: 'Bonjour, ceci est un test.' };
    for (const field of Object.keys(contactValidationSchema)) {
      expect(runValidators(validData[field], contactValidationSchema[field])).toBeNull();
    }
  });
});
