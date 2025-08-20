import type { CustomPokemon } from '../../types/pokemon';
import styles from './PokemonsList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { toggleItem } from '../../store/selectedItemsSlice';
import { useRouter, useSearchParams } from 'next/navigation';

interface PokemonsListItemProp {
  pokemon: CustomPokemon;
}

export const PokemonsListItem = ({ pokemon }: PokemonsListItemProp) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const dispatch = useDispatch();
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedItems.selectedPokemons
  );
  const isSelected = selectedPokemons.some((item) => item.id === pokemon.id);

  const handleClick = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('details', String(pokemon.id));
    router.push(`?${params.toString()}`);
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
          dispatch(
            toggleItem({
              id: pokemon.id,
              name: pokemon.name,
              sprite: pokemon.sprite,
            })
          );
        }}
      />
    </li>
  );
};
