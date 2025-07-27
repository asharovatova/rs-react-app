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
}

interface PokemonSprites {
  front_default: string;
}
