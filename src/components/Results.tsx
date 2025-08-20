import { useTranslations } from 'next-intl';
import styles from '../app/[locale]/page.module.scss';
import type { pokemonsListProps } from '../types/pokemon';
import { PokemonsList } from './PokemonsList/PokemonsList';

export const Results = ({ pokemons, isLoading }: pokemonsListProps) => {
  const t = useTranslations('main');

  return (
    <section className={styles.resultsWrapper}>
      <h2 className={styles.headingResults}>{t('results')}</h2>
      <PokemonsList pokemons={pokemons} isLoading={isLoading} />
    </section>
  );
};
