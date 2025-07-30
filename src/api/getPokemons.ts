import { requestGetAllPokemons, requestGetPokemon } from './requestGetPokemons';
import type {
  CustomPokemon,
  PokemonDetails,
  PokemonListItem,
} from '../types/pokemon';
import { SPRITE_URL } from '../utils/constants';

export const getPokemons = async (name: string, page: number) => {
  let pokemons: CustomPokemon[] = [];
  let count = 1;

  if (!name) {
    const data = await requestGetAllPokemons(page);

    pokemons = data.results.map((pokemon: PokemonListItem) =>
      transformPokemonsListData(pokemon)
    );

    count = data.count;
  } else {
    const data = await requestGetPokemon(name);

    if ('id' in data) {
      pokemons = [transformPokemonData(data)];
    }
  }

  return { pokemons, count };
};

export const getPokemonDetails = async (id: string) => {
  const data = await requestGetPokemon(id);

  return data;
};

export function transformPokemonsListData(
  pokemon: PokemonListItem
): CustomPokemon {
  const id = Number(pokemon.url.split('/').filter(Boolean).pop());

  return {
    name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
    id,
    sprite: `${SPRITE_URL}${id}.png`,
  };
}

export function transformPokemonData(pokemon: PokemonDetails): CustomPokemon {
  return {
    name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
    id: pokemon.id,
    sprite: pokemon.sprites['front_default'],
  };
}
