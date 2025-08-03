import { screen } from '@testing-library/react';
import { PokemonsListItem } from './PokemonsListItem';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';
import '@testing-library/jest-dom/vitest';

describe('PokemonsListItem', () => {
  const mockPokemon = {
    id: 25,
    name: 'pikachu',
    sprite: 'pikachu.png',
  };

  it('displays pokemon name and ID correctly', () => {
    renderWithProviders(<PokemonsListItem pokemon={mockPokemon} />, {
      route: '/?page=1',
    });

    expect(screen.getByText('#25')).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'pikachu.png');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'pikachu');
  });
});
