import { useEffect, useState } from 'react';
import { getPokemons } from '../../api/getPokemons';
import type { CustomPokemon } from '../../types/pokemon';
import { PokemonsListItem } from './PokemonsListItem';
import styles from './PokemonsList.module.scss';

export const PokemonsList = () => {
  const [pokemons, setPokemons] = useState<CustomPokemon[]>([]);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const pokemonsArr = await getPokemons();

        setPokemons(pokemonsArr);
      } catch (error) {
        console.log('ERROR', error);
      }
    };

    loadPokemons();
  }, []);

  return (
    <ul className={styles.pokemonsList}>
      {pokemons.map((pokemon) => (
        <PokemonsListItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </ul>
  );
};
