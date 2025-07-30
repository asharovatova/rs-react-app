import {
  getPokemons,
  getPokemonDetails,
  transformPokemonsListData,
  transformPokemonData,
} from './getPokemons';
import { requestGetAllPokemons, requestGetPokemon } from './requestGetPokemons';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { PokemonDetails, PokemonListItem } from '../types/pokemon';

vi.mock('./requestGetPokemons');

describe('getPokemons module', () => {
  const mockPokemonListItem: PokemonListItem = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  };

  const mockPokemonDetails: PokemonDetails = {
    id: 1,
    name: 'bulbasaur',
    sprites: { front_default: 'bulbasaur.png' },
    height: 7,
    weight: 69,
    stats: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPokemons', () => {
    it('fetches all pokemons when no name provided', async () => {
      vi.mocked(requestGetAllPokemons).mockResolvedValue({
        results: [mockPokemonListItem],
        count: 100,
      });

      const result = await getPokemons('', 1);

      expect(requestGetAllPokemons).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        pokemons: [
          {
            name: 'Bulbasaur',
            id: 1,
            sprite:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
          },
        ],
        count: 100,
      });
    });

    it('fetches single pokemon when name provided', async () => {
      vi.mocked(requestGetPokemon).mockResolvedValue(mockPokemonDetails);

      const result = await getPokemons('bulbasaur', 1);

      expect(requestGetPokemon).toHaveBeenCalledWith('bulbasaur');
      expect(result).toEqual({
        pokemons: [
          {
            name: 'Bulbasaur',
            id: 1,
            sprite: 'bulbasaur.png',
          },
        ],
        count: 1,
      });
    });
  });

  describe('getPokemonDetails', () => {
    it('fetches pokemon details by id', async () => {
      vi.mocked(requestGetPokemon).mockResolvedValue(mockPokemonDetails);

      const result = await getPokemonDetails('1');

      expect(requestGetPokemon).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockPokemonDetails);
    });

    it('throws error when fetch fails', async () => {
      vi.mocked(requestGetPokemon).mockRejectedValue(new Error('API Error'));

      await expect(getPokemonDetails('999')).rejects.toThrow('API Error');
    });
  });

  describe('transformPokemonsListData', () => {
    it('transforms pokemon list item correctly', () => {
      const result = transformPokemonsListData(mockPokemonListItem);

      expect(result).toEqual({
        name: 'Bulbasaur',
        id: 1,
        sprite:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      });
    });
  });

  describe('transformPokemonData', () => {
    it('transforms pokemon details correctly', () => {
      const result = transformPokemonData(mockPokemonDetails);

      expect(result).toEqual({
        name: 'Bulbasaur',
        id: 1,
        sprite: 'bulbasaur.png',
      });
    });
  });
});
