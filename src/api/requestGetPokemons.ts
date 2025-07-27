import axios from 'axios';
import type { PokemonListItem } from '../types/pokemon';

export const requestGetPokemons = async () => {
  const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=20';

  const response: { data: { results: PokemonListItem[] } } =
    await axios.get(apiURL);
  return response.data.results;
};
