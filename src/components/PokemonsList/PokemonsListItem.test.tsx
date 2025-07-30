import { render, screen } from '@testing-library/react';
import { PokemonsListItem } from './PokemonsListItem';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';

describe('PokemonsListItem', () => {
  const mockPokemon = {
    id: 25,
    name: 'pikachu',
    sprite: 'pikachu.png',
  };

  it('displays pokemon name and ID correctly', () => {
    render(
      <MemoryRouter>
        <PokemonsListItem pokemon={mockPokemon} />
      </MemoryRouter>
    );

    expect(screen.getByText('#25')).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'pikachu.png');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'pikachu');
  });
});
