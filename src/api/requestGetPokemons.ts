import axios from 'axios';
import type { PokemonDetails, PokemonListItem } from '../types/pokemon';
import { API_URL, PAGE_LIMIT } from '../utils/constants';

export const requestGetAllPokemons = async (page: number) => {
  const url = `${API_URL}?limit=${PAGE_LIMIT}&offset=${(page - 1) * PAGE_LIMIT}`;

  const response: { data: { results: PokemonListItem[]; count: number } } =
    await axios.get(url);

  return { results: response.data.results, count: response.data.count };
};

export const requestGetPokemon = async (name: string) => {
  const url = `${API_URL}/${name}/?limit=${PAGE_LIMIT}`;

  const response: { data: PokemonDetails } = await axios.get(url);
  return response.data;
};
