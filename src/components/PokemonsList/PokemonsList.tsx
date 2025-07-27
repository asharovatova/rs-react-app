import type { pokemonsListProps } from '../../types/pokemon';
import { PokemonsListItem } from './PokemonsListItem';
import styles from './PokemonsList.module.scss';

export const PokemonsList = ({ pokemons, isLoading }: pokemonsListProps) => {
  return (
    <>
      {isLoading ? (
        <div>Loading pokemons...</div>
      ) : pokemons.length === 0 ? (
        <div>No pokemons found</div>
      ) : (
        <ul className={styles.pokemonsList}>
          {pokemons.map((pokemon) => (
            <PokemonsListItem key={pokemon.id} pokemon={pokemon} />
          ))}
        </ul>
      )}
    </>
  );
};
