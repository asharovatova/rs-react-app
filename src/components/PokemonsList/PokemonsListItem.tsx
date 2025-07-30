import { useSearchParams } from 'react-router-dom';
import type { CustomPokemon } from '../../types/pokemon';
import styles from './PokemonsList.module.scss';

interface PokemonsListItemProp {
  pokemon: CustomPokemon;
}

export const PokemonsListItem = ({ pokemon }: PokemonsListItemProp) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  const handleClick = () => {
    setSearchParams({ page: currentPage, details: String(pokemon.id) });
  };

  return (
    <li className={styles.pokemonsListItem} onClick={handleClick}>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <div className={styles.info}>
        <p>#{pokemon.id}</p>
        <h3 className={styles.pokemonName}>{pokemon.name}</h3>
      </div>
    </li>
  );
};
