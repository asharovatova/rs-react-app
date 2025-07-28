import styles from '../pages/Main/MainPage.module.scss';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { CustomPokemon } from '../types/pokemon';
import { getPokemons } from '../api/getPokemons';
import { Search } from './Search';
import { Results } from './Results/Results';
import { LS_KEY, PAGE_LIMIT } from '../utils/constants';
import { Pagination } from './Pagination';
import { Link, useSearchParams } from 'react-router-dom';

export const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { searchStr, setSearchStr } = useLocalStorage(LS_KEY, '');

  const [pokemons, setPokemons] = useState<CustomPokemon[]>([]);
  const [total, setTotal] = useState(0);
  const page = parseInt(searchParams.get('page') || '1');

  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const loadPokemons = async (name: string, page: number) => {
    try {
      setLoadingError(null);
      setIsLoading(true);
      const { pokemons: pokemonsArr, count } = await getPokemons(name, page);

      setPokemons(pokemonsArr);
      setTotal(Math.ceil(count / PAGE_LIMIT));
    } catch (error) {
      if (error instanceof Error) {
        setLoadingError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons(searchStr, page);
  }, [searchStr, page]);

  const handleSearch = (searchStr: string) => {
    const trimmedStr = searchStr.trim();

    setSearchStr(trimmedStr);
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      page: String(newPage),
    });
  };

  return (
    <main className={styles.mainContainer}>
      <Link to="about">About</Link>

      <h1>Pokedex</h1>
      <Search initialValue={searchStr} onSearch={handleSearch} />

      <Pagination
        total={total}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      {!loadingError && <Results pokemons={pokemons} isLoading={isLoading} />}

      {loadingError && <div>Something went wrong, please try later.</div>}
    </main>
  );
};
