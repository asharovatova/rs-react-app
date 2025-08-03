import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Main } from './Main';
import '@testing-library/jest-dom/vitest';
import { useMain } from './lib/useMain';
import { renderWithProviders } from '../../utils/test-utils';

vi.mock('./lib/useMain', () => ({
  useMain: vi.fn(() => ({
    pokemons: Array(10).fill({ id: 1, name: 'pokemon' }),
    total: 100,
    searchStr: '',
    page: 1,
    detailsId: null,
    isLoading: false,
    loadingError: null,
    handleSearch: vi.fn(),
    handlePageChange: vi.fn(),
  })),
}));

describe('Main Component', () => {
  it('renders correctly', () => {
    renderWithProviders(<Main />);

    expect(screen.getByText('Pokedex')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders pagination when total > 0', () => {
    renderWithProviders(<Main />);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders DetailsPanel when detailsId exists', () => {
    vi.mocked(useMain).mockReturnValueOnce({
      pokemons: [],
      total: 0,
      searchStr: '',
      page: 1,
      detailsId: '25',
      isLoading: false,
      loadingError: null,
      handleSearch: vi.fn(),
      handlePageChange: vi.fn(),
    });

    renderWithProviders(<Main />);

    expect(screen.getByTestId('details-panel')).toBeInTheDocument();
  });

  it('shows error message when loadingError exists', () => {
    const testError = new Error('API Error');

    vi.mocked(useMain).mockReturnValueOnce({
      pokemons: [],
      total: 0,
      searchStr: '',
      page: 1,
      detailsId: null,
      isLoading: false,
      loadingError: testError,
      handleSearch: vi.fn(),
      handlePageChange: vi.fn(),
    });

    renderWithProviders(<Main />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
