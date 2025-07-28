import { useEffect, useState } from 'react';
import './App.scss';
import { Results } from './components/Results/Results';
import { Search } from './components/Search';
import { LS_KEY } from './utils/constants';
import { getPokemons } from './api/getPokemons';
import type { CustomPokemon } from './types/pokemon';
import { useLocalStorage } from './hooks/useLocalStorage';

export function App() {
  const { searchStr, setSearchStr } = useLocalStorage(LS_KEY, '');

  const [pokemons, setPokemons] = useState<CustomPokemon[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const loadPokemons = async (name: string) => {
    try {
      setLoadingError(null);
      setIsLoading(true);
      const pokemonsArr = await getPokemons(name);

      // console.log('pokemonsArr', pokemonsArr);
      setPokemons(pokemonsArr);
    } catch (error) {
      // console.log('ERROR', error);
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
    <main>
      <h1>Pokedex</h1>
      <Search initialValue={searchStr} onSearch={handleSearch} />

      {!loadingError && <Results pokemons={pokemons} isLoading={isLoading} />}

      {loadingError && <div>Something went wrong, please try later.</div>}
      {/* {loadingError && <div>{loadingError.message}</div>} */}
    </main>
  );
}
