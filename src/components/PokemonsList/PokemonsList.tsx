import { useEffect, useState } from 'react';
import { getPokemons } from '../../api/getPokemons';
import type { CustomPokemon } from '../../types/pokemon';
import { PokemonsListItem } from './PokemonsListItem';
import styles from './PokemonsList.module.scss';

export const PokemonsList = () => {
  const [pokemons, setPokemons] = useState<CustomPokemon[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        setIsLoading(true);
        const pokemonsArr = await getPokemons();

        setPokemons(pokemonsArr);
      } catch (error) {
        console.log('ERROR', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemons();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading pokemons...</div>
      ) : pokemons.length === 0 ? (
        <div>No pokemons found</div>
      ) : (
        <ul className={styles.pokemonsList}>
          {pokemons.map((pokemon) => (
            <PokemonsListItem key={pokemon.id} pokemon={pokemon} />
          ))}
        </ul>
      )}
    </>
  );
};
