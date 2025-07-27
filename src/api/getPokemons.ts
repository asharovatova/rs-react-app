import { requestGetPokemons } from './requestGetPokemons';
import type { CustomPokemon, PokemonListItem } from '../types/pokemon';

export const getPokemons = async () => {
  const data = await requestGetPokemons();
  // console.log('data', data);

  // const detailedData: CustomPokemon[] = await Promise.all(
  //   data.results.map((pokemon) => axios.get(pokemon.url))
  // );

  const pokemons = data.map((pokemon: PokemonListItem) =>
    transformPokemonData(pokemon)
  );

  // console.log('pokemons', pokemons);
  return pokemons;
};

function transformPokemonData(pokemon: PokemonListItem): CustomPokemon {
  const id = Number(pokemon.url.split('/').filter(Boolean).pop());

  return {
    name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
    id,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  };
}
