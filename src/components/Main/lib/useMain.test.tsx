import { renderHook, act } from '@testing-library/react';
import { useMain } from './useMain';
import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { getPokemons } from '../../../api/getPokemons';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('react-router-dom');
vi.mock('../../../hooks/useLocalStorage');
vi.mock('../../../api/getPokemons');

describe('useMain hook', () => {
  const mockSetSearchParams = vi.fn();
  const mockSetSearchStr = vi.fn();

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('?page=1'),
      mockSetSearchParams,
    ]);

    vi.mocked(useLocalStorage).mockReturnValue({
      searchStr: '',
      setSearchStr: mockSetSearchStr,
    });

    vi.mocked(getPokemons).mockResolvedValue({
      pokemons: [{ id: 1, name: 'bulbasaur', sprite: '' }],
      count: 100,
    });
  });

  it('should load pokemons on mount', async () => {
    const { result } = renderHook(() => useMain());

    expect(result.current.isLoading).toBe(true);
    expect(getPokemons).toHaveBeenCalledWith('', 1);

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.pokemons).toEqual([
      { id: 1, name: 'bulbasaur', sprite: '' },
    ]);
    expect(result.current.total).toBe(10);
  });
});
