import styles from '../../app/page.module.scss';
import { Search } from '../Search';
import { Results } from '../Results';
import { Pagination } from '../Pagination';
// import { Link } from 'react-router-dom';
import { DetailsPanel } from '../DetailsPanel';
import { useMain } from './lib/useMain';
// import { ThemeToggle } from '../ThemeToggle';

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
    // refetch,
  } = useMain();

  return (
    <main className={styles.mainContainer}>
      {/* <div className={styles.top}>
        <h1>Pokedex</h1>

        <div className={styles.flexRow}>
          <Link to="about">About</Link>
          <ThemeToggle />
          <button onClick={() => refetch()} className={styles.refreshButton}>
            ↻ Refresh
          </button>
        </div>
      </div> */}

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

      {loadingError && <div>Something went wrong, please try later.</div>}
    </main>
  );
};
