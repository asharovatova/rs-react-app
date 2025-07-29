import styles from '../../pages/Main/MainPage.module.scss';
import type { pokemonsListProps } from '../../types/pokemon';
import { PokemonsList } from '../PokemonsList/PokemonsList';

export const Results = ({ pokemons, isLoading }: pokemonsListProps) => {
  return (
    <section className={styles.resultsWrapper}>
      <h2 className={styles.headingResults}>Results</h2>
      <PokemonsList pokemons={pokemons} isLoading={isLoading} />
    </section>
  );
};
