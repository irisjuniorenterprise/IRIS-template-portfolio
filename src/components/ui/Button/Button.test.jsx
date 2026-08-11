import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button.jsx';

describe('Button', () => {
  it('affiche son contenu', () => {
    render(<Button>Cliquez ici</Button>);
    expect(screen.getByRole('button', { name: 'Cliquez ici' })).toBeInTheDocument();
  });

  it('déclenche onClick au clic', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Envoyer</Button>);

    await user.click(screen.getByRole('button', { name: 'Envoyer' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('est désactivé pendant isLoading et empêche le clic', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} isLoading>
        Envoyer
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('peut être rendu comme un lien via la prop "as"', () => {
    render(
      <Button as="a" href="#contact">
        Me contacter
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Me contacter' });
    expect(link).toHaveAttribute('href', '#contact');
  });
});
