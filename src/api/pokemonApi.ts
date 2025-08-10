import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokemonDetails, PokemonListItem } from '../types/pokemon';
import { API_URL, PAGE_LIMIT } from '../utils/constants';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  // tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    getAllPokemons: builder.query<
      { results: PokemonListItem[]; count: number },
      number
    >({
      query: (page) => `?limit=${PAGE_LIMIT}&offset=${(page - 1) * PAGE_LIMIT}`,
      // providesTags: ['Pokemon'],
    }),
    getPokemonByNameOrId: builder.query<PokemonDetails, string>({
      query: (name) => `/${name}`,
      // providesTags: (result) => [{ type: 'Pokemon', id: result?.id }],
    }),
  }),
});

export const { useGetAllPokemonsQuery, useGetPokemonByNameOrIdQuery } =
  pokemonApi;
