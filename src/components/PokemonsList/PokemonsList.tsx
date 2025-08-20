import type { pokemonsListProps } from '../../types/pokemon';
import { PokemonsListItem } from './PokemonsListItem';
import styles from './PokemonsList.module.scss';
import { useTranslations } from 'next-intl';

export const PokemonsList = ({ pokemons, isLoading }: pokemonsListProps) => {
  const t = useTranslations('main');

  return (
    <>
      {isLoading ? (
        <div>{t('loading')}</div>
      ) : pokemons.length === 0 ? (
        <div>{t('nothingFound')}</div>
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
