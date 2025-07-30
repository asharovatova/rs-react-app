import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { LS_KEY, PAGE_LIMIT } from '../../../utils/constants';
import { useEffect, useState } from 'react';
import type { CustomPokemon } from '../../../types/pokemon';
import { getPokemons } from '../../../api/getPokemons';

export const useMain = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { searchStr, setSearchStr } = useLocalStorage(LS_KEY, '');

  const [pokemons, setPokemons] = useState<CustomPokemon[]>([]);
  const [total, setTotal] = useState(0);
  const page = Number(searchParams.get('page') || '1');
  const detailsId = searchParams.get('details');

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

  return {
    pokemons,
    total,
    searchStr,
    page,
    detailsId,
    isLoading,
    loadingError,
    handleSearch,
    handlePageChange,
  };
};
