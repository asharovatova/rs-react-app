'use server';

import { CustomPokemon } from '../types/pokemon';

export async function exportToCSV(selectedPokemons: CustomPokemon[]) {
  const csvContent = [
    ['ID', 'Name', 'Sprite'],
    ...selectedPokemons.map((item: CustomPokemon) => [
      item.id,
      item.name,
      item.sprite,
    ]),
  ]
    .map((row) => row.join(','))
    .join('\n');

  return {
    csvContent,
    filename: `${selectedPokemons.length}_pokemons.csv`,
  };
}
