import styles from '../../pages/Main/MainPage.module.scss';
import { Search } from '../Search';
import { Results } from '../Results';
import { Pagination } from '../Pagination';
import { Link } from 'react-router-dom';
import { DetailsPanel } from '../DetailsPanel';
import { useMain } from './lib/useMain';

export const Main = () => {
  const {
    pokemons,
    total,
    searchStr,
    page,
    detailsId,
    isLoading,
    loadingError,
    handleSearch,
    handlePageChange,
  } = useMain();

  return (
    <main className={styles.mainContainer}>
      <div className={styles.top}>
        <h1>Pokedex</h1>
        <Link to="about">About</Link>
      </div>

      <div className={styles.mainContentWrapper}>
        <div className={styles.listWrapper}>
          <Search initialValue={searchStr} onSearch={handleSearch} />

          <Pagination
            total={total}
            currentPage={page}
            onPageChange={handlePageChange}
          />

          {!loadingError && (
            <Results pokemons={pokemons} isLoading={isLoading} />
          )}
        </div>

        {detailsId && <DetailsPanel id={detailsId} />}
      </div>

      {loadingError && <div>Something went wrong, please try later.</div>}
    </main>
  );
};
