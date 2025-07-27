import { requestGetAllPokemons, requestGetPokemon } from './requestGetPokemons';
import type {
  CustomPokemon,
  PokemonDetails,
  PokemonListItem,
} from '../types/pokemon';
import { SPRITE_URL } from '../utils/constants';

export const getPokemons = async (name: string) => {
  let data: PokemonListItem[] | PokemonDetails;
  let pokemons: CustomPokemon[] = [];

  if (!name) {
    data = await requestGetAllPokemons();

    pokemons = data.map((pokemon: PokemonListItem) =>
      transformPokemonsListData(pokemon)
    );
  } else {
    data = await requestGetPokemon(name);

    if ('id' in data) {
      pokemons = [transformPokemonData(data)];
    }
  }
  // console.log('data', data);

  // const detailedData: CustomPokemon[] = await Promise.all(
  //   data.results.map((pokemon) => axios.get(pokemon.url))
  // );

  // console.log('pokemons', pokemons);
  return pokemons;
};

function transformPokemonsListData(pokemon: PokemonListItem): CustomPokemon {
  const id = Number(pokemon.url.split('/').filter(Boolean).pop());

  return {
    name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
    id,
    sprite: `${SPRITE_URL}${id}.png`,
  };
}

function transformPokemonData(pokemon: PokemonDetails): CustomPokemon {
  return {
    name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
    id: pokemon.id,
    sprite: pokemon.sprites['front_default'],
  };
}
