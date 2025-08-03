import { useSearchParams } from 'react-router-dom';
import type { CustomPokemon } from '../../types/pokemon';
import styles from './PokemonsList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { toggleItem } from '../../store/selectedItemsSlice';

interface PokemonsListItemProp {
  pokemon: CustomPokemon;
}

export const PokemonsListItem = ({ pokemon }: PokemonsListItemProp) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  const dispatch = useDispatch();
  const selectedIds = useSelector(
    (state: RootState) => state.selectedItems.selectedIds
  );
  const isSelected = selectedIds.includes(pokemon.id);

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

      <input
        type="checkbox"
        checked={isSelected}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          e.stopPropagation();
          dispatch(toggleItem(pokemon.id));
        }}
      />
    </li>
  );
};
