import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { LS_KEY, PAGE_LIMIT } from '../../../utils/constants';
import {
  useGetAllPokemonsQuery,
  useGetPokemonByNameOrIdQuery,
} from '../../../api/pokemonApi';
import { usePokemonData } from '../../../api/getPokemons';
import type { CustomPokemon } from '../../../types/pokemon';

export const useMain = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { searchStr, setSearchStr } = useLocalStorage(LS_KEY, '');

  const page = Number(searchParams.get('page') || '1');
  const detailsId = searchParams.get('details');

  const {
    data: listData,
    isLoading: isListLoading,
    isError: isListError,
    refetch: refetchList,
  } = useGetAllPokemonsQuery(page, { skip: !!searchStr });

  const {
    data: singleData,
    isLoading: isSingleLoading,
    isError: isSingleError,
    refetch: refetchSingle,
  } = useGetPokemonByNameOrIdQuery(searchStr, { skip: !searchStr });

  const { transformPokemonList, transformPokemonDetails } = usePokemonData();

  const refetchAll = () => {
    if (searchStr) {
      refetchSingle();
    } else {
      refetchList();
    }
  };

  const pokemons: CustomPokemon[] = searchStr
    ? singleData
      ? [transformPokemonDetails(singleData)]
      : []
    : listData?.results.map((pokemon) => transformPokemonList(pokemon)) || [];

  const totalPages = searchStr
    ? 1
    : Math.ceil((listData?.count || 0) / PAGE_LIMIT);

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
    totalPages,
    searchStr,
    page,
    detailsId,
    isLoading: isListLoading || isSingleLoading,
    loadingError: isListError || isSingleError,
    handleSearch,
    handlePageChange,
    refetch: refetchAll,
  };
};
