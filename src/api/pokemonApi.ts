import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokemonDetails, PokemonListItem } from '../types/pokemon';
import { API_URL, PAGE_LIMIT } from '../utils/constants';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllPokemons: builder.query<
      { results: PokemonListItem[]; count: number },
      number
    >({
      query: (page) => `?limit=${PAGE_LIMIT}&offset=${(page - 1) * PAGE_LIMIT}`,
    }),
    getPokemonByNameOrId: builder.query<PokemonDetails, string>({
      query: (name) => `/${name}`,
    }),
  }),
});

export const { useGetAllPokemonsQuery, useGetPokemonByNameOrIdQuery } =
  pokemonApi;
