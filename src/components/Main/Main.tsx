import styles from '../../app/[locale]/page.module.scss';
import { Search } from '../Search';
import { Results } from '../Results';
import { Pagination } from '../Pagination';
import { DetailsPanel } from '../DetailsPanel';
import { useMain } from './lib/useMain';
import { useTranslations } from 'next-intl';

export const Main = () => {
  const {
    pokemons,
    totalPages,
    searchStr,
    page,
    detailsId,
    isLoading,
    loadingError,
    handleSearch,
    handlePageChange,
  } = useMain();
  const t = useTranslations('main');

  return (
    <main className={styles.mainContainer}>
      <div className={styles.mainContentWrapper}>
        <div className={styles.listWrapper}>
          <Search initialValue={searchStr} onSearch={handleSearch} />

          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />

          {!loadingError && (
            <Results pokemons={pokemons} isLoading={isLoading} />
          )}
        </div>

        {detailsId && <DetailsPanel id={detailsId} />}
      </div>

      {loadingError && <div>{t('error')}</div>}
    </main>
  );
};
