import styles from '../app/page.module.scss';
import type { pokemonsListProps } from '../types/pokemon';
import { PokemonsList } from './PokemonsList/PokemonsList';

export const Results = ({ pokemons, isLoading }: pokemonsListProps) => {
  return (
    <section className={styles.resultsWrapper}>
      <h2 className={styles.headingResults}>Results</h2>
      <PokemonsList pokemons={pokemons} isLoading={isLoading} />
    </section>
  );
};
