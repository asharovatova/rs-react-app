import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectedItemsState {
  selectedPokemons: { id: number; name: string; sprite: string }[];
}

const initialState: SelectedItemsState = {
  selectedPokemons: [],
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (
      state,
      action: PayloadAction<{ id: number; name: string; sprite: string }>
    ) => {
      const { id, name, sprite } = action.payload;
      if (state.selectedPokemons.some((item) => item.id === id)) {
        state.selectedPokemons = state.selectedPokemons.filter(
          (item) => item.id !== id
        );
      } else {
        state.selectedPokemons.push({ id, name, sprite });
      }
    },
    clearSelectedItems: (state) => {
      state.selectedPokemons = [];
    },
  },
});

export const { toggleItem, clearSelectedItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
