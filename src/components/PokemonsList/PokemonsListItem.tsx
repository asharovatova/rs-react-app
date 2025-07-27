import type { CustomPokemon } from '../../types/pokemon';
import styles from './PokemonsList.module.scss';

interface PokemonsListItemProp {
  pokemon: CustomPokemon;
}

export const PokemonsListItem = ({ pokemon }: PokemonsListItemProp) => {
  return (
    <li className={styles.pokemonsListItem}>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <span>#{pokemon.id}</span>{' '}
      <h3 className={styles.pokemonName}>{pokemon.name}</h3>
    </li>
  );
};
