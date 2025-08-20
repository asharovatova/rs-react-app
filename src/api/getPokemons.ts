import type {
  CustomPokemon,
  PokemonDetails,
  PokemonListItem,
} from '../types/pokemon';
import { NO_IMAGE_AVAILABLE, SPRITE_URL } from '../utils/constants';

export const usePokemonData = () => {
  const transformPokemonList = (pokemon: PokemonListItem): CustomPokemon => {
    const id = Number(pokemon.url.split('/').filter(Boolean).pop());
    return {
      name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
      id,
      sprite: `${SPRITE_URL}${id}.png`,
    };
  };

  const transformPokemonDetails = (pokemon: PokemonDetails): CustomPokemon => ({
    name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
    id: pokemon.id,
    sprite: pokemon.sprites.front_default || NO_IMAGE_AVAILABLE,
  });

  return { transformPokemonList, transformPokemonDetails };
};
