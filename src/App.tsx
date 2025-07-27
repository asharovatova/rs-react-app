import { useEffect, useState } from 'react';
import './App.scss';
import { Results } from './components/Results/Results';
import { Search } from './components/Search';
import { LS_KEY } from './utils/constants';
import { getPokemons } from './api/getPokemons';
import type { CustomPokemon } from './types/pokemon';

export function App() {
  const [searchStr, setSearchStr] = useState(
    localStorage.getItem(LS_KEY) || ''
  );
  const [pokemons, setPokemons] = useState<CustomPokemon[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const loadPokemons = async (name: string) => {
    try {
      setIsLoading(true);
      const pokemonsArr = await getPokemons(name);

      console.log('pokemonsArr', pokemonsArr);
      setPokemons(pokemonsArr);
    } catch (error) {
      console.log('ERROR', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons(searchStr);
  }, [searchStr]);

  const handleSearch = (searchStr: string) => {
    const trimmedStr = searchStr.trim();
    localStorage.setItem(LS_KEY, trimmedStr);
    setSearchStr(trimmedStr);
    loadPokemons(trimmedStr);
    console.log('trimmedStr', trimmedStr);
  };

  return (
    <main>
      <h1>Pokedex</h1>
      <Search initialValue={searchStr} onSearch={handleSearch} />
      <Results pokemons={pokemons} isLoading={isLoading} />
    </main>
  );
}
