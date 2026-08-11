import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useContactForm } from './useContactForm.js';

describe('useContactForm', () => {
  it("bloque la soumission et remplit `errors` si les champs sont invalides", () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} });
    });

    expect(result.current.errors.name).toBeDefined();
    expect(result.current.errors.email).toBeDefined();
    expect(result.current.errors.message).toBeDefined();
    expect(result.current.status).toBe(result.current.STATUS.IDLE);
  });

  it('met à jour les valeurs via handleChange', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleChange('name')({ target: { value: 'Yassine' } });
    });

    expect(result.current.values.name).toBe('Yassine');
  });

  it('passe en statut SUCCESS après une soumission valide', async () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleChange('name')({ target: { value: 'Yassine' } });
      result.current.handleChange('email')({ target: { value: 'yassine@iris.dev' } });
      result.current.handleChange('message')({ target: { value: 'Un message valide et assez long.' } });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} });
    });

    expect(result.current.status).toBe(result.current.STATUS.SUCCESS);
    expect(result.current.values.name).toBe('');
  });
});
