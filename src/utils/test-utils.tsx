import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import selectedItemsReducer from '../store/selectedItemsSlice';

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    route = '/',
    // ...renderOptions
  } = {}
) => {
  const store = configureStore({
    reducer: { selectedItems: selectedItemsReducer },
    preloadedState,
  });

  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>
    ),
    store,
  };
};
