'use client';

import styles from '../app/[locale]/page.module.scss';
import { useGetAllPokemonsQuery } from '../api/pokemonApi';
import { useMain } from './Main/lib/useMain';
import { useTranslations } from 'next-intl';

export const RefreshButton = () => {
  const t = useTranslations('header');

  const { page } = useMain();
  const { refetch } = useGetAllPokemonsQuery(page);

  return (
    <button onClick={() => refetch()} className={styles.refreshButton}>
      {t('refresh')}
    </button>
  );
};
