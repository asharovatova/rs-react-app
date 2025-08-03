import { renderWithProviders } from '../utils/test-utils';
import { Flyout } from './Flyout';
import { screen, fireEvent } from '@testing-library/react';
import saveAs from 'file-saver';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

vi.mock('file-saver', () => ({
  default: vi.fn(),
}));

describe('Flyout Component', () => {
  const mockSelectedItems = [
    { id: 1, name: 'Pikachu', sprite: 'pikachu.png' },
    { id: 2, name: 'Charizard', sprite: 'charizard.png' },
  ];

  it('should not render when no items selected', () => {
    renderWithProviders(<Flyout />, {
      preloadedState: { selectedItems: { selectedPokemons: [] } },
    });

    expect(screen.queryByText(/items selected/)).not.toBeInTheDocument();
  });

  it('should render with correct item count', () => {
    renderWithProviders(<Flyout />, {
      preloadedState: {
        selectedItems: { selectedPokemons: mockSelectedItems },
      },
    });

    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  it('should dispatch clearSelectedItems when "Unselect all" clicked', () => {
    const { store } = renderWithProviders(<Flyout />, {
      preloadedState: {
        selectedItems: { selectedPokemons: mockSelectedItems },
      },
    });

    fireEvent.click(screen.getByText('Unselect all'));
    expect(store.getState().selectedItems.selectedPokemons).toEqual([]);
  });

  it('should call saveAs with correct CSV when "Download" clicked', () => {
    renderWithProviders(<Flyout />, {
      preloadedState: {
        selectedItems: { selectedPokemons: mockSelectedItems },
      },
    });

    fireEvent.click(screen.getByText('Download'));

    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), '2_pokemons.csv');

    [
      ['ID', 'Name', 'Sprite'],
      ['1', 'Pikachu', 'pikachu.png'],
      ['2', 'Charizard', 'charizard.png'],
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = vi.mocked(saveAs).mock.calls[0][0] as Blob;
    expect(blob.type).toBe('text/csv;charset=utf-8;');
  });

  it('should match snapshot when visible', () => {
    const { container } = renderWithProviders(<Flyout />, {
      preloadedState: {
        selectedItems: { selectedPokemons: mockSelectedItems },
      },
    });

    expect(container).toMatchSnapshot();
  });
});
