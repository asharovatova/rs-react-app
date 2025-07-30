import { render, screen, waitFor } from '@testing-library/react';
import { DetailsPanel } from './DetailsPanel';
import { MemoryRouter, useNavigate, useSearchParams } from 'react-router-dom';
import { getPokemonDetails } from '../api/getPokemons';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

vi.mock('../api/getPokemons');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(),
    useNavigate: vi.fn(() => vi.fn()),
  };
});

describe('DetailsPanel Component', () => {
  const mockPokemon = {
    id: 25,
    name: 'pikachu',
    sprites: { front_default: 'pikachu.png' },
    height: 4,
    weight: 60,
    stats: [
      { stat: { name: 'hp' }, base_stat: 35 },
      { stat: { name: 'attack' }, base_stat: 55 },
    ],
  };

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('?page=1'),
      vi.fn(),
    ]);
  });

  it('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <DetailsPanel id="25" />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays pokemon details after loading', async () => {
    vi.mocked(getPokemonDetails).mockResolvedValue(mockPokemon);

    render(
      <MemoryRouter>
        <DetailsPanel id="25" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('#25')).toBeInTheDocument();
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.getByText('Height: 4')).toBeInTheDocument();
      expect(screen.getByText('Weight: 60')).toBeInTheDocument();
      expect(screen.getByText('hp: 35')).toBeInTheDocument();
      expect(screen.getByText('attack: 55')).toBeInTheDocument();
    });
  });

  it('displays error message when fetch fails', async () => {
    vi.mocked(getPokemonDetails).mockRejectedValue(new Error('API Error'));

    render(
      <MemoryRouter>
        <DetailsPanel id="25" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });

  it('closes panel when button is clicked', async () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <DetailsPanel id="25" />
      </MemoryRouter>
    );

    screen.getByText('×').click();
    expect(mockNavigate).toHaveBeenCalledWith('?page=1');
  });
});
