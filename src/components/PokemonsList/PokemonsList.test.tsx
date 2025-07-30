import { render, screen } from '@testing-library/react';
import { PokemonsList } from './PokemonsList';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

const mockPokemons = [
  { id: 1, name: 'bulbasaur', sprite: 'bulbasaur.png' },
  { id: 2, name: 'ivysaur', sprite: 'ivysaur.png' },
];

describe('PokemonsList', () => {
  it('renders correct number of items', () => {
    render(
      <MemoryRouter>
        <PokemonsList pokemons={mockPokemons} isLoading={false} />
      </MemoryRouter>
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
