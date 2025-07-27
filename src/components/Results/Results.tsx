import type { pokemonsListProps } from '../../types/pokemon';
import { PokemonsList } from '../PokemonsList/PokemonsList';

export const Results = ({ pokemons, isLoading }: pokemonsListProps) => {
  return (
    <section>
      <h2>Results</h2>
      <PokemonsList pokemons={pokemons} isLoading={isLoading} />
    </section>
  );
};
