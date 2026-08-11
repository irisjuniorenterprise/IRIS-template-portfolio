import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal.jsx';

describe('Modal', () => {
  it("n'affiche rien quand isOpen est false", () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Titre">
        Contenu
      </Modal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('affiche le titre et le contenu quand isOpen est true', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Détail du projet">
        <p>Description du projet</p>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Détail du projet')).toBeInTheDocument();
    expect(screen.getByText('Description du projet')).toBeInTheDocument();
  });

  it('appelle onClose au clic sur le bouton de fermeture', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(
      <Modal isOpen onClose={handleClose} title="Titre">
        Contenu
      </Modal>
    );

    await user.click(screen.getByRole('button', { name: /fermer/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('appelle onClose à la touche Échap', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(
      <Modal isOpen onClose={handleClose} title="Titre">
        Contenu
      </Modal>
    );

    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
