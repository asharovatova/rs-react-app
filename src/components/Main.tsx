import styles from '../pages/Main/MainPage.module.scss';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { CustomPokemon } from '../types/pokemon';
import { getPokemons } from '../api/getPokemons';
import { Search } from './Search';
import { Results } from './Results/Results';
import { LS_KEY } from '../utils/constants';

export const Main = () => {
  const { searchStr, setSearchStr } = useLocalStorage(LS_KEY, '');

  const [pokemons, setPokemons] = useState<CustomPokemon[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const loadPokemons = async (name: string) => {
    try {
      setLoadingError(null);
      setIsLoading(true);
      const pokemonsArr = await getPokemons(name);

      setPokemons(pokemonsArr);
    } catch (error) {
      if (error instanceof Error) {
        setLoadingError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons(searchStr);
  }, [searchStr]);

  const handleSearch = (searchStr: string) => {
    const trimmedStr = searchStr.trim();

    setSearchStr(trimmedStr);
  };

  return (
    <main className={styles.mainContainer}>
      <h1>Pokedex</h1>
      <Search initialValue={searchStr} onSearch={handleSearch} />

      {!loadingError && <Results pokemons={pokemons} isLoading={isLoading} />}

      {loadingError && <div>Something went wrong, please try later.</div>}
    </main>
  );
};
