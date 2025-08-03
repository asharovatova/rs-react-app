import { render, screen } from '@testing-library/react';
import { PokemonsList } from './PokemonsList';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../../utils/test-utils';

const mockPokemons = [
  { id: 1, name: 'bulbasaur', sprite: 'bulbasaur.png' },
  { id: 2, name: 'ivysaur', sprite: 'ivysaur.png' },
];

describe('PokemonsList', () => {
  it('renders correct number of items', () => {
    renderWithProviders(
      <PokemonsList pokemons={mockPokemons} isLoading={false} />
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('displays "no results" when empty array', () => {
    render(<PokemonsList pokemons={[]} isLoading={false} />);
    expect(screen.getByText('No pokemons found')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<PokemonsList pokemons={[]} isLoading={true} />);
    expect(screen.getByText('Loading pokemons...')).toBeInTheDocument();
  });
});
