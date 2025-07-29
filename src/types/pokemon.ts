export interface PokemonListItem {
  name: string;
  url: string;
}

export interface CustomPokemon {
  name: string;
  // url: string;
  id: number;
  sprite: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: PokemonSprites;
  weight: number;
  height: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

interface PokemonSprites {
  front_default: string;
}

export interface pokemonsListProps {
  pokemons: CustomPokemon[];
  isLoading: boolean;
}
